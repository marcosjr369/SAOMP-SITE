"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  UserCog,
  X,
} from "lucide-react";
import { backendProxyHeaders, backendProxyUrl } from "@/lib/proxy-client";
import { vigararias } from "@/lib/vigararias";
import {
  ApiError,
  errorMessage,
  readApiError,
  type StatusMessages,
} from "@/lib/api-errors";

type Coordinator = {
  _id?: string;
  id?: string;
  nome?: string;
  email?: string;
  vigararia?: string;
  role?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type FormState = {
  nome: string;
  email: string;
  password: string;
  vigararia: string;
};

const emptyForm: FormState = { nome: "", email: "", password: "", vigararia: "" };

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

function displayDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("pt-PT");
}

const coordinatorId =(coordinator: Coordinator) =>
  coordinator._id ?? coordinator.id;

function getCoordinatorList(data: unknown): Coordinator[] {
  if (Array.isArray(data)) return data as Coordinator[];
  if (!data || typeof data !== "object") return [];

  const body = data as {
    users?: unknown;
    coordinators?: unknown;
    coordenadores?: unknown;
    data?: unknown;
  };
  if (Array.isArray(body.users)) return body.users as Coordinator[];
  if (Array.isArray(body.coordinators)) return body.coordinators as Coordinator[];
  if (Array.isArray(body.coordenadores))
    return body.coordenadores as Coordinator[];
  if (Array.isArray(body.data)) return body.data as Coordinator[];
  return [];
}

function getCoordinator(data: unknown): Coordinator | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const body = data as Record<string, unknown>;
  for (const key of ["user", "coordinator", "coordenador", "data"]) {
    const nested = body[key];
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      return nested as Coordinator;
    }
  }
  return "_id" in body || "id" in body ? (body as Coordinator) : null;
}

class SessionExpiredError extends Error {}

async function adminRequest(
  path: string[],
  init: RequestInit,
  messages: StatusMessages,
) {
  const response = await fetch(backendProxyUrl(path), {
    cache: "no-store",
    ...init,
    headers: backendProxyHeaders("api", init.headers),
  });

  if (response.status === 401) {
    await fetch(backendProxyUrl(["admin", "login"]), {
      method: "DELETE",
      headers: backendProxyHeaders("api"),
    }).catch(() => null);
    window.location.replace("/admin/membros/acesso");
    throw new SessionExpiredError();
  }
  if (!response.ok) throw await readApiError(response, messages);
  return response.json().catch(() => null);
}

export default function AdminCoordinatorsPage() {
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Coordinator | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [toDelete, setToDelete] = useState<Coordinator | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function loadCoordinators(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const body = await adminRequest(
        ["admin", "coordinators"],
        { method: "GET" },
        { 403: "Esta conta não tem permissão para gerir coordenadores." },
      );
      setCoordinators(getCoordinatorList(body));
    } catch (loadError) {
      if (loadError instanceof SessionExpiredError) return;
      setError(
        errorMessage(loadError, "Ocorreu um erro ao carregar coordenadores."),
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    void loadCoordinators();
  }, []);

  const visibleCoordinators = useMemo(() => {
    const query = normalize(search.trim());
    if (!query) return coordinators;
    return coordinators.filter((coordinator) =>
      [coordinator.nome, coordinator.email, coordinator.vigararia].some(
        (value) => normalize(value ?? "").includes(query),
      ),
    );
  }, [coordinators, search]);

  const coveredVigararias = new Set(
    coordinators.map((coordinator) => coordinator.vigararia).filter(Boolean),
  ).size;

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(coordinator: Coordinator) {
    setEditing(coordinator);
    setForm({
      nome: coordinator.nome ?? "",
      email: coordinator.email ?? "",
      password: "",
      vigararia: coordinator.vigararia ?? "",
    });
    setFormError(null);
    setFormOpen(true);
  }

  function closeForm() {
    if (saving) return;
    setFormOpen(false);
    setEditing(null);
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nome = form.nome.trim();
    const email = form.email.trim();

    if (!nome || !email || !form.vigararia) {
      setFormError("Preencha o nome, o email e a vigararia.");
      return;
    }
    if (!editing && !form.password) {
      setFormError("Defina uma palavra-passe para o coordenador.");
      return;
    }
    if (form.password && form.password.length < 6) {
      setFormError("A palavra-passe deve ter pelo menos 6 caracteres.");
      return;
    }

    setSaving(true);
    setFormError(null);

    try {
      if (editing) {
        const id = coordinatorId(editing);
        if (!id) throw new Error("Este coordenador não tem um identificador válido.");

        const changes: Partial<FormState> = {};
        if (nome !== (editing.nome ?? "")) changes.nome = nome;
        if (email !== (editing.email ?? "")) changes.email = email;
        if (form.vigararia !== (editing.vigararia ?? ""))
          changes.vigararia = form.vigararia;
        if (form.password) changes.password = form.password;

        if (Object.keys(changes).length === 0) {
          setFormOpen(false);
          setEditing(null);
          return;
        }

        const body = await adminRequest(
          ["admin", "coordinators", id],
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(changes),
          },
          {
            403: "Esta conta não tem permissão para editar coordenadores.",
            404: "Este coordenador já não existe. Atualize a lista.",
            409: "Já existe uma conta com este email.",
          },
        );
        const updated = getCoordinator(body);
        const visibleChanges = { ...changes };
        delete visibleChanges.password;
        setCoordinators((current) =>
          current.map((item) =>
            coordinatorId(item) === id
              ? { ...item, ...visibleChanges, ...(updated ?? {}) }
              : item,
          ),
        );
        setNotice(`Coordenador ${nome} atualizado.`);
      } else {
        const body = await adminRequest(
          ["admin", "coordinators"],
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nome,
              email,
              password: form.password,
              vigararia: form.vigararia,
            }),
          },
          {
            403: "Esta conta não tem permissão para criar coordenadores.",
            409: "Já existe uma conta com este email.",
          },
        );
        const created = getCoordinator(body);
        if (created && coordinatorId(created)) {
          setCoordinators((current) => [
            ...current,
            { nome, email, vigararia: form.vigararia, ...created },
          ]);
        } else {
          void loadCoordinators(true);
        }
        setNotice(`Coordenador ${nome} criado.`);
      }

      setFormOpen(false);
      setEditing(null);
      setForm(emptyForm);
    } catch (saveError) {
      if (saveError instanceof SessionExpiredError) return;
      setFormError(
        errorMessage(saveError, "Ocorreu um erro ao guardar o coordenador."),
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteCoordinator(coordinator: Coordinator) {
    const id = coordinatorId(coordinator);
    if (!id) {
      setDeleteError("Este coordenador não tem um identificador válido.");
      return;
    }

    const removeFromList = () =>
      setCoordinators((current) =>
        current.filter((item) => coordinatorId(item) !== id),
      );

    setDeleting(true);
    setDeleteError(null);
    try {
      await adminRequest(
        ["admin", "coordinators", id],
        { method: "DELETE" },
        { 403: "Esta conta não tem permissão para apagar coordenadores." },
      );
      removeFromList();
      setToDelete(null);
      setNotice(
        coordinator.nome
          ? `Coordenador ${coordinator.nome} apagado.`
          : "Coordenador apagado.",
      );
    } catch (removeError) {
      if (removeError instanceof SessionExpiredError) return;
      if (removeError instanceof ApiError && removeError.status === 404) {
        removeFromList();
        setToDelete(null);
        setNotice("O coordenador já tinha sido removido.");
        return;
      }
      setDeleteError(
        errorMessage(removeError, "Ocorreu um erro ao apagar o coordenador."),
      );
    } finally {
      setDeleting(false);
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
                Coordenadores
              </h1>
              <p className="mt-2 text-sm text-white/60">
                Contas de coordenação por vigararia
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void loadCoordinators(true)}
                disabled={loading || refreshing}
                className="inline-flex h-11 items-center justify-center gap-2 border border-white/25 px-4 text-sm font-medium text-white transition hover:border-white disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={refreshing ? "animate-spin" : undefined}
                />
                Atualizar
              </button>
              <button
                type="button"
                onClick={openCreate}
                className="inline-flex h-11 items-center justify-center gap-2 bg-[#fef200] px-4 text-sm font-semibold text-gray-950 transition hover:bg-[#e2d800]"
              >
                <Plus size={16} />
                Novo coordenador
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 py-4 sm:grid-cols-2">
          <Summary
            icon={UserCog}
            label="Coordenadores"
            value={coordinators.length}
          />
          <Summary
            icon={MapPin}
            label="Vigararias cobertas"
            value={`${coveredVigararias} / ${vigararias.length}`}
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

        <div className="mt-3 flex border-y border-gray-300 bg-white px-4 py-3">
          <label className="flex h-11 w-full items-center gap-2 border border-gray-300 bg-[#fbfbf8] px-3 md:max-w-sm">
            <Search size={17} className="shrink-0 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar nome, email ou vigararia"
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
                  Não foi possível carregar os coordenadores
                </p>
                <p className="mt-1 text-sm text-red-800">{error}</p>
                <button
                  type="button"
                  onClick={() => void loadCoordinators()}
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
            coordenadores...
          </div>
        ) : visibleCoordinators.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center text-center">
            <span className="grid h-12 w-12 place-items-center border border-gray-300 bg-white text-gray-500">
              <UserCog size={20} />
            </span>
            <p className="mt-4 font-medium text-gray-900">
              {coordinators.length === 0
                ? "Ainda não há coordenadores"
                : "Nenhum coordenador encontrado"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {coordinators.length === 0
                ? "Crie o primeiro coordenador para uma vigararia."
                : "Altere a pesquisa."}
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {visibleCoordinators.map((coordinator, index) => (
              <article
                key={
                  coordinatorId(coordinator) ??
                  `${coordinator.email ?? coordinator.nome}-${index}`
                }
                className="grid gap-4 border border-gray-200 bg-white px-5 py-5 shadow-[0_8px_24px_-22px_rgb(0_0_0/0.45)] sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h2 className="font-display text-xl font-semibold text-gray-950">
                      {coordinator.nome || "Nome não informado"}
                    </h2>
                    {coordinator.active !== undefined && (
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                          coordinator.active
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {coordinator.active ? "Ativo" : "Inativo"}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 grid gap-x-6 gap-y-2 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-3">
                    <Detail label="Email" value={coordinator.email} />
                    <Detail label="Vigararia" value={coordinator.vigararia} />
                    <Detail
                      label="Criado em"
                      value={displayDate(coordinator.createdAt)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(coordinator)}
                    className="inline-flex h-11 items-center justify-center gap-2 border border-gray-300 px-4 text-sm font-semibold text-gray-800 transition hover:border-gray-950 hover:bg-gray-50"
                  >
                    <Pencil size={16} />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteError(null);
                      setToDelete(coordinator);
                    }}
                    disabled={deleting}
                    className="inline-flex h-11 items-center justify-center gap-2 border border-red-200 px-4 text-sm font-semibold text-red-700 transition hover:border-red-700 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                  >
                    <Trash2 size={16} />
                    Apagar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && visibleCoordinators.length > 0 && (
          <p className="py-4 text-xs text-gray-500">
            A mostrar {visibleCoordinators.length} de {coordinators.length}{" "}
            coordenadores
          </p>
        )}
      </div>

      {formOpen && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center overflow-y-auto bg-gray-950/65 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <form
            onSubmit={submitForm}
            role="dialog"
            aria-modal="true"
            aria-labelledby="coordinator-form-title"
            className="w-full max-w-md bg-white p-6 shadow-2xl"
            noValidate
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id="coordinator-form-title"
                className="font-display text-2xl font-semibold text-gray-950"
              >
                {editing ? "Editar coordenador" : "Novo coordenador"}
              </h2>
              <button
                type="button"
                aria-label="Fechar"
                onClick={closeForm}
                disabled={saving}
                className="grid h-10 w-10 shrink-0 place-items-center bg-gray-100 text-gray-800 transition hover:bg-gray-200 disabled:opacity-60"
              >
                <X size={18} />
              </button>
            </div>

            <FormField label="Nome" htmlFor="coordinator-nome">
              <input
                id="coordinator-nome"
                autoFocus
                required
                value={form.nome}
                onChange={(event) =>
                  setForm((f) => ({ ...f, nome: event.target.value }))
                }
                className={inputCls}
              />
            </FormField>

            <FormField label="Email" htmlFor="coordinator-email">
              <input
                id="coordinator-email"
                type="email"
                autoComplete="off"
                required
                value={form.email}
                onChange={(event) =>
                  setForm((f) => ({ ...f, email: event.target.value }))
                }
                className={inputCls}
              />
            </FormField>

            <FormField label="Vigararia" htmlFor="coordinator-vigararia">
              <select
                id="coordinator-vigararia"
                required
                value={form.vigararia}
                onChange={(event) =>
                  setForm((f) => ({ ...f, vigararia: event.target.value }))
                }
                className={inputCls}
              >
                <option value="">Escolha a vigararia</option>
                {vigararias.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
                {form.vigararia && !vigararias.includes(form.vigararia) && (
                  <option value={form.vigararia}>{form.vigararia}</option>
                )}
              </select>
            </FormField>

            <FormField
              label={editing ? "Nova palavra-passe" : "Palavra-passe"}
              htmlFor="coordinator-password"
              hint={
                editing ? "Deixe em branco para manter a atual." : undefined
              }
            >
              <input
                id="coordinator-password"
                type="password"
                autoComplete="new-password"
                required={!editing}
                value={form.password}
                onChange={(event) =>
                  setForm((f) => ({ ...f, password: event.target.value }))
                }
                className={inputCls}
              />
            </FormField>

            {formError && (
              <p
                role="alert"
                className="mt-4 border-l-2 border-red-600 bg-red-50 px-3 py-2 text-sm text-red-800"
              >
                {formError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="inline-flex h-11 items-center border border-gray-300 px-4 text-sm font-semibold text-gray-800 transition hover:border-gray-950 hover:bg-gray-50 disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-11 items-center gap-2 bg-gray-950 px-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-wait disabled:opacity-60"
              >
                {saving && <LoaderCircle size={16} className="animate-spin" />}
                {saving
                  ? "A guardar…"
                  : editing
                    ? "Guardar alterações"
                    : "Criar coordenador"}
              </button>
            </div>
          </form>
        </div>
      )}

      {toDelete && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-gray-950/65 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget && !deleting) {
              setToDelete(null);
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-coordinator-title"
            aria-describedby="delete-coordinator-description"
            className="w-full max-w-md bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center bg-red-100 text-red-700">
                <Trash2 size={18} />
              </span>
              <div>
                <h2
                  id="delete-coordinator-title"
                  className="font-display text-xl font-semibold text-gray-950"
                >
                  Apagar coordenador?
                </h2>
                <p
                  id="delete-coordinator-description"
                  className="mt-1 text-sm text-gray-600"
                >
                  A conta de{" "}
                  <strong className="text-gray-900">
                    {toDelete.nome || "este coordenador"}
                  </strong>{" "}
                  será removida permanentemente. Esta ação não pode ser
                  desfeita.
                </p>
              </div>
            </div>

            {deleteError && (
              <p className="mt-4 text-sm text-red-700" role="alert">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setToDelete(null)}
                disabled={deleting}
                className="inline-flex h-11 items-center border border-gray-300 px-4 text-sm font-semibold text-gray-800 transition hover:border-gray-950 hover:bg-gray-50 disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => void deleteCoordinator(toDelete)}
                disabled={deleting}
                className="inline-flex h-11 items-center gap-2 bg-red-700 px-4 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-wait disabled:opacity-60"
              >
                {deleting ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
                {deleting ? "A apagar…" : "Apagar coordenador"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const inputCls =
  "mt-2 h-12 w-full border border-gray-300 bg-white px-3 text-sm text-gray-950 outline-none transition focus:border-gray-950";

function FormField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-800"
      >
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function Summary({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserCog;
  label: string;
  value: number | string;
}) {
  return (
    <div className="flex items-center gap-4 border border-gray-200 bg-white px-4 py-4 sm:px-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center bg-[#f0f2ec] text-gray-700">
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

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <p className="min-w-0 truncate">
      <span className="text-gray-400">{label}: </span>
      <span className="text-gray-700">{value || "Não informado"}</span>
    </p>
  );
}
