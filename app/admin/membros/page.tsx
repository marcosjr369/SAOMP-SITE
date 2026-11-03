"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  LoaderCircle,
  Printer,
  RefreshCw,
  Search,
  Users,
  X,
} from "lucide-react";
import { backendProxyHeaders, backendProxyUrl } from "@/lib/proxy-client";
import {
  MemberCard,
  type MemberCardData,
} from "@/components/cadastro/MemberCard";

type Member = {
  _id?: string;
  id?: string;
  nome?: string;
  email?: string;
  telefone?: string | number;
  nascimento?: string;
  genero?: string;
  obra?: string;
  vigararia?: string;
  paroquia?: string;
  anoAdmissao?: string;
  tipoMembro?: string;
  anoPromessa?: string | number;
  grupo?: string;
  card_ID?: string;
  estado?: string;
  status?: string;
  isVerified?: boolean;
  verified?: boolean;
};

type Filter = "todos" | "pendentes" | "aprovados";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function memberStatus(member: Member): "pendente" | "aprovado" {
  if (normalize(member.tipoMembro ?? "") !== "assessor") return "aprovado";

  const status = normalize(member.estado ?? member.status ?? "");
  const isVerified = member.isVerified ?? member.verified;
  return status.includes("pend") || isVerified === false
    ? "pendente"
    : "aprovado";
}

function displayDate(value?: string) {
  if (!value) return "Não informado";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("pt-PT");
}

function memberCardData(member: Member): MemberCardData {
  const admissionYear = member.anoAdmissao
    ? new Date(member.anoAdmissao).getUTCFullYear()
    : NaN;

  return {
    nome: member.nome ?? "",
    obra: member.obra ?? "",
    tipo: member.tipoMembro ?? "",
    paroquia: member.paroquia ?? "",
    vigararia: member.vigararia ?? "",
    anoAdmissao: Number.isNaN(admissionYear)
      ? (member.anoAdmissao ?? "")
      : String(admissionYear),
    numero: member.card_ID,
    pendente: memberStatus(member) === "pendente",
  };
}

function getMemberList(data: unknown): Member[] {
  if (Array.isArray(data)) return data as Member[];
  if (!data || typeof data !== "object") return [];

  const body = data as { members?: unknown; data?: unknown };
  if (Array.isArray(body.members)) return body.members as Member[];
  if (Array.isArray(body.data)) return body.data as Member[];
  return [];
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("todos");
  const [search, setSearch] = useState("");
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedCardMember, setSelectedCardMember] = useState<Member | null>(
    null,
  );
  const [downloadingCard, setDownloadingCard] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);

  async function loadMembers(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const response = await fetch(backendProxyUrl(["admin", "members"]), {
        cache: "no-store",
        headers: backendProxyHeaders("api"),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        if (response.status === 401) {
          await fetch(backendProxyUrl(["admin", "login"]), {
            method: "DELETE",
            headers: backendProxyHeaders("api"),
          }).catch(() => null);
          window.location.replace("/admin/membros/acesso");
          return;
        }
        if (response.status === 403) {
          throw new Error(
            "Esta conta não tem permissão para administrar membros.",
          );
        }
        throw new Error(
          body?.message || `Falha ao carregar contas (${response.status}).`,
        );
      }
      setMembers(getMemberList(body));
    } catch (loadError) {
      setError(
        loadError instanceof TypeError
          ? "Não foi possível ligar ao servidor. Verifique a sua ligação."
          : loadError instanceof Error
            ? loadError.message
            : "Ocorreu um erro ao carregar as contas.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    void loadMembers();
  }, []);

  const pendingCount = members.filter(
    (member) => memberStatus(member) === "pendente",
  ).length;
  const approvedCount = members.length - pendingCount;
  const visibleMembers = useMemo(() => {
    const query = normalize(search.trim());
    return members.filter((member) => {
      const status = memberStatus(member);
      const matchesFilter =
        filter === "todos" ||
        status === (filter === "pendentes" ? "pendente" : "aprovado");
      const matchesSearch =
        !query ||
        [
          member.nome,
          member.email,
          member.paroquia,
          member.vigararia,
          member.obra,
        ].some((value) => normalize(value ?? "").includes(query));
      return matchesFilter && matchesSearch;
    });
  }, [filter, members, search]);

  async function approveMember(member: Member) {
    const id = member._id ?? member.id;
    if (!id) {
      setNotice("Esta conta não tem um identificador válido para aprovação.");
      return;
    }

    setApprovingId(id);
    setNotice(null);
    try {
      const response = await fetch(
        backendProxyUrl(["admin", "members", id, "verify"]),
        { method: "PATCH", headers: backendProxyHeaders("api") },
      );
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        if (response.status === 401) {
          await fetch(backendProxyUrl(["admin", "login"]), {
            method: "DELETE",
            headers: backendProxyHeaders("api"),
          }).catch(() => null);
          window.location.replace("/admin/membros/acesso");
          return;
        }
        if (response.status === 403) {
          throw new Error("Esta conta não tem permissão para aprovar membros.");
        }
        throw new Error(
          body?.message ||
            `Não foi possível aprovar a conta (${response.status}).`,
        );
      }

      setMembers((current) =>
        current.map((item) =>
          (item._id ?? item.id) === id
            ? {
                ...item,
                estado: "aprovado",
                status: "aprovado",
                isVerified: true,
                verified: true,
              }
            : item,
        ),
      );
      setNotice(`Conta de ${member.nome || "membro"} aprovada.`);
    } catch (approvalError) {
      setNotice(
        approvalError instanceof TypeError
          ? "Não foi possível ligar ao servidor. Tente novamente."
          : approvalError instanceof Error
            ? approvalError.message
            : "Ocorreu um erro ao aprovar a conta.",
      );
    } finally {
      setApprovingId(null);
    }
  }

  async function downloadMemberCard() {
    if (!selectedCardMember || !frontCardRef.current || !backCardRef.current) {
      return;
    }

    setDownloadingCard(true);
    setCardError(null);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      await Promise.all(
        Array.from(
          document.querySelectorAll<HTMLImageElement>("#admin-card-print img"),
        ).map((image) => image.decode().catch(() => undefined)),
      );
      const [frontCanvas, backCanvas] = await Promise.all([
        html2canvas(frontCardRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: null,
        }),
        html2canvas(backCardRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: null,
        }),
      ]);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [86, 54],
      });

      pdf.addImage(frontCanvas.toDataURL("image/png"), "PNG", 0, 0, 86, 54);
      pdf.addPage([86, 54], "landscape");
      pdf.addImage(backCanvas.toDataURL("image/png"), "PNG", 0, 0, 86, 54);

      const filename = (selectedCardMember.nome || "membro")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
      pdf.save(`cartao-${filename || "membro"}.pdf`);
    } catch {
      setCardError("Não foi possível gerar o PDF. Tente imprimir o cartão.");
    } finally {
      setDownloadingCard(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#f0f2ec] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden bg-[#101915] px-6 py-7 text-white sm:px-9 sm:py-9">
          <div className="pointer-events-none absolute -right-20 -top-40 h-96 w-96 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute -right-4 -top-24 h-64 w-64 rounded-full border border-white/[0.08]" />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e2d800]">
                SAOMP · Administração
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Gestão de membros
              </h1>
              <p className="mt-2 text-sm text-white/60">
                Contas, validações e registos
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void loadMembers(true)}
                disabled={loading || refreshing}
                className="inline-flex h-11 items-center justify-center gap-2 border border-white/25 px-4 text-sm font-medium text-white transition hover:border-white disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={refreshing ? "animate-spin" : undefined}
                />
                Atualizar
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 py-4 sm:grid-cols-3">
          <Summary
            icon={Users}
            label="Total de contas"
            value={members.length}
          />
          <Summary
            icon={Clock3}
            label="Aguardam aprovação"
            value={pendingCount}
            accent
          />
          <Summary
            icon={CheckCircle2}
            label="Aprovadas"
            value={approvedCount}
          />
        </div>

        {notice && (
          <div
            role="status"
            className="mt-5 flex items-start gap-2 border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700"
          >
            <CheckCircle2
              size={17}
              className="mt-0.5 shrink-0 text-emerald-700"
            />
            <span>{notice}</span>
          </div>
        )}

        <div className="mt-3 flex flex-col gap-4 border-y border-gray-300 bg-white px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div
            className="flex gap-1 overflow-x-auto"
            role="group"
            aria-label="Filtrar contas"
          >
            {(
              [
                ["pendentes", `Pendentes ${pendingCount}`],
                ["todos", `Todas ${members.length}`],
                ["aprovados", `Aprovadas ${approvedCount}`],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
                className={`shrink-0 border-b-2 px-3 py-2 text-sm transition ${
                  filter === value
                    ? "border-gray-950 font-semibold text-gray-950"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="flex h-11 w-full items-center gap-2 border border-gray-300 bg-[#fbfbf8] px-3 md:max-w-sm">
            <Search size={17} className="shrink-0 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar membro, obra ou paróquia"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </label>
        </div>

        {error ? (
          <div
            className="mt-8 border border-red-200 bg-red-50 px-5 py-5"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <AlertCircle size={19} className="mt-0.5 shrink-0 text-red-700" />
              <div>
                <p className="font-medium text-red-950">
                  Não foi possível carregar as contas
                </p>
                <p className="mt-1 text-sm text-red-800">{error}</p>
                <button
                  type="button"
                  onClick={() => void loadMembers()}
                  className="mt-3 text-sm font-semibold text-red-950 underline underline-offset-4"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-gray-500">
            <LoaderCircle size={20} className="animate-spin" />A carregar
            contas...
          </div>
        ) : visibleMembers.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center text-center">
            <span className="grid h-12 w-12 place-items-center border border-gray-300 bg-white text-gray-500">
              <Users size={20} />
            </span>
            <p className="mt-4 font-medium text-gray-900">
              Nenhuma conta nesta lista
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Altere o filtro ou a pesquisa.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {visibleMembers.map((member, index) => {
              const id =
                member._id ??
                member.id ??
                `${member.email ?? member.nome}-${index}`;
              const pending = memberStatus(member) === "pendente";
              const isApproving = approvingId === (member._id ?? member.id);

              return (
                <article
                  key={id}
                  className="grid gap-4 border border-gray-200 bg-white px-5 py-5 shadow-[0_8px_24px_-22px_rgb(0_0_0/0.45)] md:grid-cols-[minmax(0,1fr)_auto] md:items-center sm:px-6"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h2 className="font-display text-xl font-semibold text-gray-950">
                        {member.nome || "Nome não informado"}
                      </h2>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium ${
                          pending
                            ? "bg-amber-100 text-amber-900"
                            : "bg-emerald-100 text-emerald-900"
                        }`}
                      >
                        {pending ? (
                          <Clock3 size={13} />
                        ) : (
                          <CheckCircle2 size={13} />
                        )}
                        {pending ? "Pendente" : "Aprovada"}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-x-6 gap-y-2 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-3">
                      <Detail label="Email" value={member.email} />
                      <Detail label="Telefone" value={member.telefone} />
                      <Detail
                        label="Data de nascimento"
                        value={displayDate(member.nascimento)}
                      />
                      <Detail
                        label="Obra / tipo"
                        value={[member.obra, member.tipoMembro]
                          .filter(Boolean)
                          .join(" · ")}
                      />
                      <Detail label="Paróquia" value={member.paroquia} />
                      <Detail label="Vigararia" value={member.vigararia} />
                      {member.grupo && (
                        <Detail label="Grupo" value={member.grupo} />
                      )}
                      {member.anoPromessa && (
                        <Detail
                          label="Ano da promessa"
                          value={member.anoPromessa}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCardError(null);
                        setSelectedCardMember(member);
                      }}
                      className="inline-flex h-11 items-center justify-center gap-2 border border-gray-300 px-4 text-sm font-semibold text-gray-800 transition hover:border-gray-950 hover:bg-gray-50"
                    >
                      <CreditCard size={16} />
                      Cartão
                    </button>
                    {pending && (
                      <button
                        type="button"
                        onClick={() => void approveMember(member)}
                        disabled={approvingId !== null}
                        className="inline-flex h-11 items-center justify-center gap-2 bg-gray-950 px-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-wait disabled:opacity-60"
                      >
                        {isApproving ? (
                          <LoaderCircle size={16} className="animate-spin" />
                        ) : (
                          <Check size={16} />
                        )}
                        Aprovar conta
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && !error && visibleMembers.length > 0 && (
          <p className="py-4 text-xs text-gray-500">
            A mostrar {visibleMembers.length} de {members.length} contas
          </p>
        )}
      </div>

      {selectedCardMember && (
        <div
          id="admin-card-print"
          className="admin-card-print-modal fixed inset-0 z-70 overflow-y-auto bg-gray-950/65 p-4 backdrop-blur-sm sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCardMember(null);
            }
          }}
        >
          <div className="admin-card-print-shell mx-auto my-6 w-full max-w-5xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="admin-card-print-chrome mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Cartão de membro
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-gray-950">
                  {selectedCardMember.nome || "Membro"}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Fechar cartão"
                onClick={() => setSelectedCardMember(null)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-800 transition hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-card-print-faces grid gap-6 lg:grid-cols-2">
              <section className="min-w-0">
                <h3 className="admin-card-print-chrome mb-2 text-sm font-semibold text-gray-600">
                  Frente
                </h3>
                <div ref={frontCardRef} className="admin-card-print-face">
                  <MemberCard
                    data={memberCardData(selectedCardMember)}
                    interactive={false}
                    side="front"
                  />
                </div>
              </section>
              <section className="min-w-0">
                <h3 className="admin-card-print-chrome mb-2 text-sm font-semibold text-gray-600">
                  Verso
                </h3>
                <div ref={backCardRef} className="admin-card-print-face">
                  <MemberCard
                    data={memberCardData(selectedCardMember)}
                    interactive={false}
                    side="back"
                  />
                </div>
              </section>
            </div>

            {cardError && (
              <p
                className="admin-card-print-chrome mt-4 text-sm text-red-700"
                role="alert"
              >
                {cardError}
              </p>
            )}

            <div className="admin-card-print-chrome mt-6 flex flex-wrap justify-end gap-2 border-t border-gray-200 pt-5">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex h-11 items-center gap-2 border border-gray-300 px-4 text-sm font-semibold text-gray-800 transition hover:border-gray-950 hover:bg-gray-50"
              >
                <Printer size={16} />
                Imprimir
              </button>
              <button
                type="button"
                onClick={() => void downloadMemberCard()}
                disabled={downloadingCard}
                className="inline-flex h-11 items-center gap-2 bg-gray-950 px-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-wait disabled:opacity-60"
              >
                {downloadingCard ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                {downloadingCard ? "A gerar PDF…" : "Descarregar PDF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Summary({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 border border-gray-200 bg-white px-4 py-4 sm:px-5">
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center ${accent ? "bg-amber-100 text-amber-900" : "bg-[#f0f2ec] text-gray-700"}`}
      >
        <Icon size={19} />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {label}
        </p>
        <p className="mt-0.5 font-display text-2xl font-semibold text-gray-950">
          {value}
        </p>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string | number }) {
  return (
    <p className="min-w-0 truncate">
      <span className="text-gray-400">{label}: </span>
      <span className="text-gray-700">{value || "Não informado"}</span>
    </p>
  );
}
