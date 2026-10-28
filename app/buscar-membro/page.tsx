"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "@/components/ui/portal";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  Layers,
  MapPin,
  Star,
  Search,
  RotateCcw,
  ArrowUpRight,
  X,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

type Membro = {
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
  genero: string;
  obra: string;
  vigararia: string;
  paroquia: string;
  anoAdmissao: string;
  tipoMembro: string;
};

type MembroApi = Omit<Membro, "telefone"> & { telefone: string | number };

const API_URL = "https://saomp-back.vercel.app/api";

/** Minúsculas e sem acentos, para comparar "União" com "uniao", etc. */
const normalize = (s: string) =>
  (s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// O cadastro grava, por exemplo, "Liga Missionária"; os filtros comparam por palavra-chave.
const obraFilters = [
  { label: "Todas", key: "" },
  { label: "IAM", key: "iam" },
  { label: "Liga", key: "liga" },
  { label: "Família", key: "familia" },
  { label: "União", key: "uniao" },
];

const tipoFilters = [
  { label: "Todos", key: "" },
  { label: "Oração", key: "oracao" },
  { label: "Promessa", key: "promessa" },
  { label: "Assessor", key: "assessor" },
  { label: "Director", key: "director" },
];

// Iniciais decorativas à volta da pesquisa (apenas visual)
const floatingPeople = [
  {
    initials: "IAM",
    pos: "left-[8%] top-[22%]",
    size: "h-16 w-16 text-lg",
    yellow: true,
  },
  {
    initials: "LMJ",
    pos: "left-[16%] top-[62%]",
    size: "h-14 w-14 text-base",
    yellow: false,
  },
  {
    initials: "FM",
    pos: "right-[9%] top-[20%]",
    size: "h-14 w-14 text-base",
    yellow: false,
  },
  {
    initials: "UM",
    pos: "right-[15%] top-[60%]",
    size: "h-16 w-16 text-lg",
    yellow: true,
  },
  {
    initials: "✝",
    pos: "right-[4%] top-[46%]",
    size: "h-10 w-10 text-sm",
    yellow: false,
  },
  {
    initials: "♥",
    pos: "right-[27%] top-[78%]",
    size: "h-10 w-10 text-sm",
    yellow: false,
  },
];

const tipoLabel = (tipo: string) =>
  tipoFilters.find((t) => t.key && normalize(tipo) === t.key)?.label ?? tipo;

export default function BuscaMembros() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [filterObra, setFilterObra] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [selectedMembro, setSelectedMembro] = useState<Membro | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMembros() {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(
            data?.message || `O servidor respondeu com o erro ${res.status}.`,
          );
        }

        const membrosFormatados: Membro[] = (data?.members ?? []).map(
          (m: MembroApi) => ({
            nome: m.nome,
            email: m.email,
            telefone: String(m.telefone),
            nascimento: new Date(m.nascimento).toLocaleDateString("pt-PT"),
            genero: m.genero,
            obra: m.obra,
            vigararia: m.vigararia,
            paroquia: m.paroquia,
            anoAdmissao: new Date(m.anoAdmissao).getFullYear().toString(),
            tipoMembro: m.tipoMembro,
          }),
        );

        setMembros(membrosFormatados);
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof TypeError
            ? "Não foi possível ligar ao servidor. Verifique a sua ligação à internet."
            : err instanceof Error
              ? err.message
              : "Erro inesperado ao carregar os membros.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchMembros();
    return () => controller.abort();
  }, [reloadKey]);

  function retry() {
    setLoading(true);
    setError(null);
    setReloadKey((k) => k + 1);
  }

  function clearAll() {
    setSearch("");
    setFilterObra("");
    setFilterTipo("");
  }

  const filteredMembros = useMemo(() => {
    const q = normalize(search.trim());
    return membros.filter((m) => {
      const matchSearch =
        !q ||
        [m.nome, m.paroquia, m.vigararia].some((v) => normalize(v).includes(q));
      const matchObra = !filterObra || normalize(m.obra).includes(filterObra);
      const matchTipo = !filterTipo || normalize(m.tipoMembro) === filterTipo;
      return matchSearch && matchObra && matchTipo;
    });
  }, [membros, search, filterObra, filterTipo]);

  const hasFilters = Boolean(search || filterObra || filterTipo);

  // "/" põe o cursor na pesquisa
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!selectedMembro) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMembro(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedMembro]);

  return (
    <section className="min-h-screen bg-[#fbfbf8]">
      {/* Topo com pesquisa */}
      <div className="px-3 pt-[76px]">
        <div className="relative overflow-hidden rounded-[2rem] bg-gray-950 text-white">
          {/* Grelha fina */}
          <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

          {/* Anéis concêntricos à volta da pesquisa */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10"
            />
            <div className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
          </div>

          {/* Círculo amarelo sólido a espreitar no canto */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 hidden h-64 w-64 rounded-full bg-yellow-500 md:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -left-10 hidden h-40 w-40 rounded-full border-[14px] border-gray-950 md:block"
          />

          {/* Comunidade a flutuar */}
          {floatingPeople.map((p, i) => (
            <motion.div
              key={p.initials}
              aria-hidden
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 0.5 + i * 0.1 },
                scale: {
                  delay: 0.5 + i * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                },
                y: {
                  duration: 4 + i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                },
              }}
              className={cn(
                "pointer-events-none absolute hidden lg:block",
                p.pos,
              )}
            >
              <span
                className={cn(
                  "grid place-items-center rounded-2xl font-display font-semibold shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)]",
                  p.size,
                  p.yellow
                    ? "bg-yellow-500 text-gray-950"
                    : "bg-white/10 text-white ring-1 ring-white/15 backdrop-blur",
                )}
              >
                {p.initials}
              </span>
            </motion.div>
          ))}

          <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-14 text-center md:pb-28 md:pt-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
            >
              Encontre um{" "}
              <span className="relative inline-block text-gray-950">
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-x-[-0.1em] inset-y-[0.08em] origin-left -rotate-1 rounded-lg bg-yellow-500"
                />
                <span className="relative">membro</span>
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mx-auto mt-5 max-w-xl text-base text-white/60 md:text-lg"
            >
              Pesquise a comunidade das Obras Missionárias Pontifícias por nome,
              paróquia ou vigararia.
            </motion.p>

            <motion.label
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative mx-auto mt-10 flex h-16 max-w-2xl cursor-text items-center rounded-full bg-white pl-6 pr-2 text-gray-950 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.8)] ring-4 ring-white/10 transition-shadow focus-within:ring-yellow-500/50"
            >
              <Search className="h-5 w-5 shrink-0 text-gray-400 transition-colors group-focus-within:text-gray-950" />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nome, paróquia ou vigararia…"
                aria-label="Pesquisar membros"
                className="h-full min-w-0 flex-1 bg-transparent px-4 text-base outline-none placeholder:text-gray-400"
              />
              <AnimatePresence mode="wait">
                {search ? (
                  <motion.button
                    key="clear"
                    type="button"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    onClick={() => {
                      setSearch("");
                      searchRef.current?.focus();
                    }}
                    aria-label="Limpar pesquisa"
                    className="grid h-12 w-12 place-items-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                ) : (
                  <motion.kbd
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mr-3 hidden rounded-lg border border-gray-200 px-2.5 py-1 font-sans text-xs text-gray-400 sm:block"
                  >
                    /
                  </motion.kbd>
                )}
              </AnimatePresence>
            </motion.label>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24">
        {/* Filtros */}
        <div className="-mt-8 relative rounded-3xl border border-gray-200/80 bg-white p-5 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.35)] md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <FilterGroup
                id="obra"
                label="Obra"
                options={obraFilters}
                value={filterObra}
                onChange={setFilterObra}
              />
              <FilterGroup
                id="tipo"
                label="Tipo"
                options={tipoFilters}
                value={filterTipo}
                onChange={setFilterTipo}
              />
            </div>

            <AnimatePresence>
              {hasFilters && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={clearAll}
                  className="group inline-flex w-fit shrink-0 items-center gap-2 self-start rounded-full px-4 py-2.5 text-sm font-semibold text-gray-700 ring-1 ring-gray-200 transition-colors hover:bg-gray-950 hover:text-white hover:ring-gray-950 md:self-center"
                >
                  <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
                  Limpar filtros
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Resultados */}
        {!loading && !error && (
          <p className="mb-5 mt-10 text-sm text-gray-500">
            <motion.span
              key={filteredMembros.length}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block font-display text-xl font-semibold text-gray-950"
            >
              {filteredMembros.length}
            </motion.span>{" "}
            {filteredMembros.length === 1
              ? "membro encontrado"
              : "membros encontrados"}
            {hasFilters && membros.length > 0 && (
              <span className="text-gray-400"> de {membros.length}</span>
            )}
          </p>
        )}

        <div
          className={cn(
            "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
            (loading || error) && "mt-10",
          )}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-200/80 bg-white p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-gray-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 animate-pulse rounded-full bg-gray-100" />
                    <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-100" />
                  </div>
                </div>
                <div className="mt-6 h-3 w-3/4 animate-pulse rounded-full bg-gray-100" />
              </div>
            ))
          ) : error ? (
            <div className="col-span-full flex flex-col items-center rounded-3xl border border-gray-200/80 bg-white px-6 py-16 text-center">
              <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-red-50 ring-1 ring-red-100">
                <AlertTriangle className="h-7 w-7 text-red-500" />
              </span>
              <h3 className="font-display text-2xl font-semibold text-gray-950">
                Não foi possível carregar os membros
              </h3>
              <p className="mt-2 max-w-md text-sm text-gray-500">{error}</p>
              <button
                type="button"
                onClick={retry}
                className="group mt-7 inline-flex h-12 items-center gap-3 rounded-full bg-gray-950 pl-1.5 pr-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-yellow-500 text-gray-950">
                  <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
                </span>
                Tentar novamente
              </button>
            </div>
          ) : filteredMembros.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {filteredMembros.map((membro, idx) => (
                <motion.button
                  layout
                  type="button"
                  key={`${membro.nome}-${membro.email}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedMembro(membro)}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 text-left transition-[border-color,box-shadow] duration-300 hover:border-gray-950 hover:shadow-[0_24px_50px_-28px_rgb(0_0_0/0.45)]"
                >
                  <div className="flex items-center gap-4">
                    <Avatar nome={membro.nome} />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-semibold text-gray-950">
                        {membro.nome}
                      </h3>
                      <p className="truncate text-sm text-gray-500">
                        {membro.obra}
                      </p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 group-hover:rotate-45 group-hover:bg-yellow-500 group-hover:text-gray-950">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-950 px-3 py-1 text-xs font-semibold text-white">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {tipoLabel(membro.tipoMembro)}
                    </span>
                    <span className="inline-flex min-w-0 items-center gap-1.5 truncate text-xs text-gray-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{membro.paroquia}</span>
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          ) : (
            <div className="col-span-full flex flex-col items-center rounded-3xl border border-dashed border-gray-300 px-6 py-16 text-center">
              <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-yellow-500/20 ring-1 ring-yellow-500/50">
                <Users className="h-7 w-7 text-gray-900" />
              </span>
              <h3 className="font-display text-2xl font-semibold text-gray-950">
                Nenhum membro encontrado
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Experimente outro nome ou remova alguns filtros.
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-6 rounded-full px-5 py-2.5 text-sm font-semibold ring-1 ring-gray-200 transition-colors hover:bg-gray-950 hover:text-white"
                >
                  Limpar pesquisa e filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <Portal>
        <AnimatePresence>
          {selectedMembro && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm"
              onClick={() => setSelectedMembro(null)}
            >
              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 40, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={selectedMembro.nome}
              >
                <div className="relative overflow-hidden bg-gray-950 px-6 pb-8 pt-6 text-white md:px-8">
                  <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-yellow-500/25 blur-3xl" />
                  <button
                    onClick={() => setSelectedMembro(null)}
                    aria-label="Fechar"
                    className="group absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-gray-950 transition-colors hover:bg-yellow-500"
                  >
                    <X
                      size={18}
                      className="transition-transform duration-300 group-hover:rotate-90"
                    />
                  </button>

                  <div className="relative flex items-center gap-5">
                    <Avatar nome={selectedMembro.nome} large />
                    <div className="min-w-0">
                      <h2 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                        {selectedMembro.nome}
                      </h2>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-gray-950">
                          {selectedMembro.obra}
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                          {tipoLabel(selectedMembro.tipoMembro)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6 flex flex-wrap gap-2">
                    <a
                      href={`tel:${selectedMembro.telefone}`}
                      className="group inline-flex h-11 items-center gap-3 rounded-full bg-white pl-1.5 pr-5 text-sm font-semibold text-gray-950 transition-transform hover:-translate-y-0.5"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-yellow-500">
                        <Phone className="h-4 w-4" />
                      </span>
                      Ligar
                    </a>
                    <a
                      href={`mailto:${selectedMembro.email}`}
                      className="group inline-flex h-11 items-center gap-3 rounded-full bg-white pl-1.5 pr-5 text-sm font-semibold text-gray-950 transition-transform hover:-translate-y-0.5"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-yellow-500">
                        <Mail className="h-4 w-4" />
                      </span>
                      Enviar email
                    </a>
                  </div>
                </div>

                <div className="grid gap-3 p-6 sm:grid-cols-2 md:p-8">
                  <Info icon={Mail} label="Email" text={selectedMembro.email} />
                  <Info
                    icon={Phone}
                    label="Telefone"
                    text={selectedMembro.telefone}
                  />
                  <Info
                    icon={Calendar}
                    label="Nascimento"
                    text={selectedMembro.nascimento}
                  />
                  <Info
                    icon={Users}
                    label="Género"
                    text={selectedMembro.genero}
                  />
                  <Info icon={Layers} label="Obra" text={selectedMembro.obra} />
                  <Info
                    icon={Star}
                    label="Tipo de membro"
                    text={tipoLabel(selectedMembro.tipoMembro)}
                  />
                  <Info
                    icon={MapPin}
                    label="Vigararia"
                    text={selectedMembro.vigararia}
                  />
                  <Info
                    icon={MapPin}
                    label="Paróquia"
                    text={selectedMembro.paroquia}
                  />
                  <Info
                    icon={Calendar}
                    label="Ano de admissão"
                    text={selectedMembro.anoAdmissao}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </section>
  );
}

function FilterGroup({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: { label: string; key: string }[];
  value: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-12 shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
        {label}
      </span>
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label={label}
      >
        {options.map((o) => {
          const selected = value === o.key;
          return (
            <motion.button
              key={o.key || "all"}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o.key)}
              whileTap={{ scale: 0.94 }}
              className={cn(
                "relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                selected
                  ? "text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-950",
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`filter-${id}`}
                  className="absolute inset-0 -z-10 rounded-full bg-gray-950"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {o.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function Avatar({ nome, large = false }: { nome: string; large?: boolean }) {
  const initials = nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center font-display font-semibold",
        large
          ? "h-20 w-20 rounded-3xl bg-yellow-500 text-3xl text-gray-950"
          : "h-14 w-14 rounded-2xl bg-yellow-500/20 text-lg text-gray-950 ring-1 ring-yellow-500/50 transition-colors duration-300 group-hover:bg-yellow-500",
      )}
    >
      {initials || <User className="h-5 w-5" />}
    </span>
  );
}

function Info({
  icon: Icon,
  label,
  text,
}: {
  icon: LucideIcon;
  label: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white ring-1 ring-gray-200">
        <Icon size={16} className="text-gray-900" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
          {label}
        </p>
        <p className="truncate text-sm font-medium text-gray-800">
          {text || "—"}
        </p>
      </div>
    </div>
  );
}
