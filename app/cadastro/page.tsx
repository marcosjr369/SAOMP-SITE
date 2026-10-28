"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  Crown,
  HandHeart,
  Hourglass,
  Loader2,
  PartyPopper,
  Pencil,
  Printer,
  Sparkles,
  User,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MemberCard, themeFor } from "@/components/cadastro/MemberCard";

const API_URL = "https://saomp-back.vercel.app/api";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  diaNasc: string;
  mesNasc: string;
  anoNasc: string;
  genero: string;
  obra: string;
  vigararia: string;
  paroquia: string;
  anoAdmissao: string;
  tipoMembro: string;
  anoPromessa: string;
  grupo: string;
};

const initialState: FormData = {
  nome: "",
  email: "",
  telefone: "",
  diaNasc: "",
  mesNasc: "",
  anoNasc: "",
  genero: "",
  obra: "",
  vigararia: "",
  paroquia: "",
  anoAdmissao: "",
  tipoMembro: "",
  anoPromessa: "",
  grupo: "",
};

type Errors = Partial<Record<keyof FormData, string>>;

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

// Valores iguais aos que a API já recebe
const obras = [
  { value: "IAM", label: "Infância e Adolescência Missionária", sigla: "IAM" },
  { value: "Liga Missionária", label: "Liga Missionária Juvenil", sigla: "LMJ" },
  { value: "Familia Missionária", label: "Família Missionária", sigla: "FM" },
  { value: "União Missionária", label: "União Missionária", sigla: "UM" },
];

const vigararias = [
  "São Pedro Apóstolo",
  "Santo António",
  "São João Baptista da Cazanga",
  "Nª Sª de Fátima",
  "Carlos Luanga",
  "São João Calabria",
  "Nª Sª da Conceição",
];

const tipos: { value: string; label: string; icon: LucideIcon; description: string }[] = [
  { value: "Oracao", label: "Oração", icon: HandHeart, description: "Apoia a missão com a oração diária." },
  { value: "Promessa", label: "Promessa", icon: BookOpen, description: "Fez a promessa e vive o compromisso missionário." },
  { value: "Assessor", label: "Assessor", icon: Sparkles, description: "Acompanha e orienta um grupo. Requer aprovação." },
  { value: "Director", label: "Director", icon: Crown, description: "Coordena a obra na sua comunidade." },
];

const steps = [
  { title: "Dados pessoais", hint: "Quem é você", icon: User },
  { title: "Dados missionários", hint: "Onde serve", icon: BookOpen },
  { title: "Tipo de membro", hint: "Como participa", icon: HandHeart },
  { title: "Revisão", hint: "Confirme tudo", icon: ClipboardCheck },
];

const currentYear = new Date().getFullYear();
const anos = (from: number) =>
  Array.from({ length: currentYear - from + 1 }, (_, i) => String(currentYear - i));

const tipoLabel = (v: string) => tipos.find((t) => t.value === v)?.label ?? "";

function validate(step: number, d: FormData): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (d.nome.trim().split(/\s+/).length < 2) e.nome = "Escreva o nome e o apelido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Email inválido.";
    if (!/^9\d{8}$/.test(d.telefone.replace(/\D/g, "").replace(/^244/, "")))
      e.telefone = "Número angolano com 9 dígitos, ex.: 923 456 789.";
    if (!d.diaNasc || !d.mesNasc || !d.anoNasc) e.anoNasc = "Escolha o dia, o mês e o ano.";
    if (!d.genero) e.genero = "Escolha uma opção.";
  }
  if (step === 1) {
    if (!d.obra) e.obra = "Escolha a sua obra.";
    if (!d.vigararia) e.vigararia = "Escolha a vigararia.";
    if (!d.paroquia.trim()) e.paroquia = "Indique a paróquia.";
    if (!d.anoAdmissao) e.anoAdmissao = "Escolha o ano de admissão.";
  }
  if (step === 2) {
    if (!d.tipoMembro) e.tipoMembro = "Escolha o tipo de membro.";
    if (d.tipoMembro === "Assessor") {
      if (!d.anoPromessa) e.anoPromessa = "Escolha o ano da promessa.";
      if (!d.grupo.trim()) e.grupo = "Indique o grupo a que pertence.";
    }
  }
  return e;
}

// Número de membro legível, ex.: IAM-2026-4F7K2
function memberNumber(d: FormData, id?: string) {
  const sigla = themeFor(d.obra).sigla;
  const base = id
    ? id.slice(-5)
    : Array.from(d.email + d.nome)
        .reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7)
        .toString(36)
        .slice(-5);
  return `${sigla}-${currentYear}-${base.toUpperCase()}`;
}

const slide: Variants = {
  enter: (dir: number) => ({ x: dir * 60, opacity: 0, filter: "blur(4px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0, filter: "blur(4px)" }),
};

export default function CadastroMembro() {
  const [data, setData] = useState<FormData>(initialState);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [shake, setShake] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState<{ numero: string; data: FormData } | null>(null);

  const isAssessor = data.tipoMembro === "Assessor";

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function goTo(target: number) {
    setDir(target > step ? 1 : -1);
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    const e = validate(step, data);
    setErrors(e);
    if (Object.keys(e).length) {
      setShake((s) => s + 1);
      return;
    }
    goTo(step + 1);
  }

  async function submit() {
    setSubmitError(null);
    setLoading(true);
    try {
      const nascimento = new Date(
        Date.UTC(Number(data.anoNasc), Number(data.mesNasc) - 1, Number(data.diaNasc)),
      );
      const payload = {
        nome: data.nome.trim(),
        email: data.email.trim(),
        telefone: Number(data.telefone.replace(/\D/g, "").replace(/^244/, "")),
        nascimento: nascimento.toISOString(),
        genero: data.genero,
        obra: data.obra,
        vigararia: data.vigararia,
        paroquia: data.paroquia.trim(),
        anoAdmissao: new Date(`${data.anoAdmissao}-01-01`).toISOString(),
        tipoMembro: data.tipoMembro,
        ...(isAssessor && {
          anoPromessa: Number(data.anoPromessa),
          grupo: data.grupo.trim(),
          estado: "pendente",
        }),
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.message || "Não foi possível concluir o cadastro.");

      const id: string | undefined = body?.member?._id ?? body?._id;
      setDone({ numero: memberNumber(data, id), data });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(
        err instanceof TypeError
          ? "Sem ligação ao servidor. Verifique a internet e tente novamente."
          : err instanceof Error
            ? err.message
            : "Erro inesperado.",
      );
    } finally {
      setLoading(false);
    }
  }

  const cardData = useMemo(
    () => ({
      nome: data.nome.trim(),
      obra: data.obra,
      tipo: tipoLabel(data.tipoMembro),
      paroquia: data.paroquia.trim(),
      vigararia: data.vigararia,
      anoAdmissao: data.anoAdmissao,
      pendente: isAssessor,
    }),
    [data, isAssessor],
  );

  if (done) {
    return (
      <Success
        numero={done.numero}
        data={done.data}
        onNew={() => {
          setDone(null);
          setData(initialState);
          setStep(0);
        }}
      />
    );
  }

  return (
    <section className="min-h-screen bg-[#fbfbf8] pt-[76px]">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 md:py-14 lg:grid-cols-[24rem_1fr] lg:gap-10">
        {/* Painel lateral: passos + cartão ao vivo */}
        <aside className="lg:sticky lg:top-[100px] lg:self-start">
          <div className="relative overflow-hidden rounded-[2rem] bg-gray-950 p-6 text-white md:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="relative">
              <h1 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                Junte-se à{" "}
                <span className="relative inline-block text-gray-950">
                  <span className="absolute inset-x-[-0.1em] inset-y-[0.08em] -rotate-1 rounded-lg bg-yellow-500" />
                  <span className="relative">missão</span>
                </span>
              </h1>
              <p className="mt-3 text-sm text-white/60">
                Quatro passos rápidos e recebe o seu cartão de membro.
              </p>

              {/* Passos (desktop) */}
              <ol className="mt-8 hidden space-y-2 lg:block">
                {steps.map((s, i) => {
                  const state = i < step ? "done" : i === step ? "current" : "todo";
                  const Icon = s.icon;
                  return (
                    <li key={s.title}>
                      <button
                        type="button"
                        disabled={i > step}
                        onClick={() => goTo(i)}
                        className={cn(
                          "relative isolate flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-colors",
                          state === "todo" ? "text-white/40" : "text-white",
                          i < step && "hover:bg-white/5",
                        )}
                      >
                        {state === "current" && (
                          <motion.span
                            layoutId="step-current"
                            className="absolute inset-0 -z-10 rounded-2xl bg-white/10 ring-1 ring-white/15"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span
                          className={cn(
                            "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300",
                            state === "done" && "bg-yellow-500 text-gray-950",
                            state === "current" && "bg-white text-gray-950",
                            state === "todo" && "bg-white/5 ring-1 ring-white/10",
                          )}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {state === "done" ? (
                              <motion.span
                                key="ok"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                              >
                                <Check className="h-4 w-4" strokeWidth={3} />
                              </motion.span>
                            ) : (
                              <motion.span key="icon" initial={{ scale: 0.6 }} animate={{ scale: 1 }}>
                                <Icon className="h-4 w-4" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{s.title}</span>
                          <span className="block text-xs text-white/50">{s.hint}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* Cartão ao vivo (desktop) */}
              <div className="mt-8 hidden lg:block">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  O seu cartão
                </p>
                <MemberCard data={cardData} />
              </div>
            </div>
          </div>
        </aside>

        {/* Formulário */}
        <div>
          {/* Progresso */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-950">
                Passo {step + 1} de {steps.length}
                <span className="font-normal text-gray-500"> · {steps[step].title}</span>
              </span>
              <span className="tabular-nums text-gray-400">
                {Math.round(((step + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="flex gap-1.5">
              {steps.map((s, i) => (
                <div key={s.title} className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    className="h-full rounded-full bg-gray-950"
                    initial={false}
                    animate={{ width: i <= step ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              ))}
            </div>
          </div>

          <motion.div
            key={shake}
            animate={shake ? { x: [0, -10, 10, -6, 6, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white p-6 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.3)] md:p-10"
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <StepHeader index={step} />

                {step === 0 && (
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Nome completo" error={errors.nome} className="md:col-span-2">
                      <input
                        value={data.nome}
                        onChange={(e) => set("nome", e.target.value)}
                        placeholder="Ex.: Ana Maria Manuel"
                        autoComplete="name"
                        className={inputCls(errors.nome)}
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="nome@exemplo.com"
                        autoComplete="email"
                        className={inputCls(errors.email)}
                      />
                    </Field>
                    <Field label="Telefone" error={errors.telefone}>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                          +244
                        </span>
                        <input
                          inputMode="numeric"
                          value={data.telefone}
                          onChange={(e) => set("telefone", e.target.value.replace(/[^\d ]/g, ""))}
                          placeholder="923 456 789"
                          autoComplete="tel-national"
                          className={cn(inputCls(errors.telefone), "pl-16")}
                        />
                      </div>
                    </Field>
                    <Field label="Data de nascimento" error={errors.anoNasc} className="md:col-span-2">
                      <div className="grid grid-cols-[1fr_1.4fr_1.15fr] gap-2 sm:gap-3">
                        <select
                          value={data.diaNasc}
                          onChange={(e) => set("diaNasc", e.target.value)}
                          className={cn(inputCls(errors.anoNasc && !data.diaNasc), "px-2.5 sm:px-4")}
                          aria-label="Dia"
                        >
                          <option value="">Dia</option>
                          {Array.from({ length: 31 }, (_, i) => String(i + 1)).map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <select
                          value={data.mesNasc}
                          onChange={(e) => set("mesNasc", e.target.value)}
                          className={cn(inputCls(errors.anoNasc && !data.mesNasc), "px-2.5 sm:px-4")}
                          aria-label="Mês"
                        >
                          <option value="">Mês</option>
                          {meses.map((m, i) => (
                            <option key={m} value={String(i + 1)}>
                              {m}
                            </option>
                          ))}
                        </select>
                        <select
                          value={data.anoNasc}
                          onChange={(e) => set("anoNasc", e.target.value)}
                          className={cn(inputCls(errors.anoNasc && !data.anoNasc), "px-2.5 sm:px-4")}
                          aria-label="Ano"
                        >
                          <option value="">Ano</option>
                          {anos(currentYear - 100).map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Field>
                    <Field label="Género" error={errors.genero} className="md:col-span-2">
                      <div className="grid grid-cols-2 gap-3">
                        {["Masculino", "Feminino"].map((g) => (
                          <ChoicePill key={g} selected={data.genero === g} onClick={() => set("genero", g)}>
                            {g}
                          </ChoicePill>
                        ))}
                      </div>
                    </Field>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Obra" error={errors.obra} className="md:col-span-2">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {obras.map((o) => {
                          const selected = data.obra === o.value;
                          const t = themeFor(o.value);
                          return (
                            <motion.button
                              key={o.value}
                              type="button"
                              whileTap={{ scale: 0.97 }}
                              onClick={() => set("obra", o.value)}
                              aria-pressed={selected}
                              className={cn(
                                "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                                selected
                                  ? "border-gray-950 bg-gray-950 text-white shadow-[0_14px_30px_-16px_rgb(0_0_0/0.6)]"
                                  : "border-gray-200 hover:border-gray-400",
                              )}
                            >
                              <span
                                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-semibold transition-transform duration-300"
                                style={{
                                  backgroundColor: t.bg,
                                  color: t.text,
                                  transform: selected ? "rotate(-6deg) scale(1.08)" : "none",
                                }}
                              >
                                {o.sigla}
                              </span>
                              <span className="text-sm font-semibold leading-snug">{o.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </Field>
                    <Field label="Vigararia" error={errors.vigararia}>
                      <select
                        value={data.vigararia}
                        onChange={(e) => set("vigararia", e.target.value)}
                        className={inputCls(errors.vigararia)}
                      >
                        <option value="">Escolha a vigararia</option>
                        {vigararias.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Paróquia" error={errors.paroquia}>
                      <input
                        value={data.paroquia}
                        onChange={(e) => set("paroquia", e.target.value)}
                        placeholder="Ex.: São Domingos"
                        className={inputCls(errors.paroquia)}
                      />
                    </Field>
                    <Field label="Ano de admissão" error={errors.anoAdmissao}>
                      <select
                        value={data.anoAdmissao}
                        onChange={(e) => set("anoAdmissao", e.target.value)}
                        className={inputCls(errors.anoAdmissao)}
                      >
                        <option value="">Escolha o ano</option>
                        {anos(1950).map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <Field label="Como participa na obra?" error={errors.tipoMembro}>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {tipos.map((t) => {
                          const selected = data.tipoMembro === t.value;
                          const Icon = t.icon;
                          return (
                            <motion.button
                              key={t.value}
                              type="button"
                              whileTap={{ scale: 0.97 }}
                              onClick={() => set("tipoMembro", t.value)}
                              aria-pressed={selected}
                              className={cn(
                                "group relative flex items-start gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
                                selected
                                  ? "border-gray-950 bg-gray-950 text-white shadow-[0_14px_30px_-16px_rgb(0_0_0/0.6)]"
                                  : "border-gray-200 hover:border-gray-400",
                              )}
                            >
                              <motion.span
                                animate={selected ? { rotate: [0, -12, 8, 0], scale: [1, 1.15, 1] } : {}}
                                transition={{ duration: 0.5 }}
                                className={cn(
                                  "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors",
                                  selected ? "bg-yellow-500 text-gray-950" : "bg-yellow-500/20 text-gray-900",
                                )}
                              >
                                <Icon className="h-5 w-5" />
                              </motion.span>
                              <span className="pr-6">
                                <span className="block font-semibold">{t.label}</span>
                                <span
                                  className={cn(
                                    "mt-0.5 block text-sm",
                                    selected ? "text-white/60" : "text-gray-500",
                                  )}
                                >
                                  {t.description}
                                </span>
                              </span>
                              {selected && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-yellow-500 text-gray-950"
                                >
                                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                </motion.span>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </Field>

                    <AnimatePresence initial={false}>
                      {isAssessor && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 rounded-2xl border border-yellow-500/60 bg-yellow-500/10 p-5">
                            <div className="flex gap-3">
                              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-yellow-500">
                                <Hourglass className="h-5 w-5" />
                              </span>
                              <div>
                                <p className="font-semibold text-gray-950">
                                  O registo de Assessor precisa de aprovação
                                </p>
                                <p className="mt-0.5 text-sm text-gray-600">
                                  Depois de enviar, o Secretariado vai validar os seus dados. O seu
                                  cartão fica com o estado «Aguarda aprovação» até ser confirmado.
                                </p>
                              </div>
                            </div>
                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                              <Field label="Ano da promessa" error={errors.anoPromessa}>
                                <select
                                  value={data.anoPromessa}
                                  onChange={(e) => set("anoPromessa", e.target.value)}
                                  className={inputCls(errors.anoPromessa)}
                                >
                                  <option value="">Escolha o ano</option>
                                  {anos(1950).map((a) => (
                                    <option key={a} value={a}>
                                      {a}
                                    </option>
                                  ))}
                                </select>
                              </Field>
                              <Field label="Grupo a que pertence" error={errors.grupo}>
                                <input
                                  value={data.grupo}
                                  onChange={(e) => set("grupo", e.target.value)}
                                  placeholder="Ex.: Grupo São Francisco Xavier"
                                  className={inputCls(errors.grupo)}
                                />
                              </Field>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="lg:hidden">
                      <MemberCard data={cardData} className="mx-auto max-w-sm" />
                    </div>
                    <Review
                      title="Dados pessoais"
                      onEdit={() => goTo(0)}
                      items={[
                        ["Nome", data.nome],
                        ["Email", data.email],
                        ["Telefone", `+244 ${data.telefone}`],
                        [
                          "Nascimento",
                          `${data.diaNasc} de ${meses[Number(data.mesNasc) - 1] ?? ""} de ${data.anoNasc}`,
                        ],
                        ["Género", data.genero],
                      ]}
                    />
                    <Review
                      title="Dados missionários"
                      onEdit={() => goTo(1)}
                      items={[
                        ["Obra", obras.find((o) => o.value === data.obra)?.label ?? data.obra],
                        ["Vigararia", data.vigararia],
                        ["Paróquia", data.paroquia],
                        ["Ano de admissão", data.anoAdmissao],
                      ]}
                    />
                    <Review
                      title="Tipo de membro"
                      onEdit={() => goTo(2)}
                      items={[
                        ["Tipo", tipoLabel(data.tipoMembro)],
                        ...(isAssessor
                          ? ([
                              ["Ano da promessa", data.anoPromessa],
                              ["Grupo", data.grupo],
                              ["Estado", "Aguarda aprovação"],
                            ] as [string, string][])
                          : []),
                      ]}
                    />

                    <AnimatePresence>
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
                        >
                          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                          <p className="text-sm font-medium text-red-700">{submitError}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navegação entre passos */}
            <div className="mt-10 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className={cn(
                  "inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100",
                  step === 0 && "invisible",
                )}
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-gray-950 pl-6 pr-1.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                >
                  Continuar
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-yellow-500 text-gray-950 transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={loading}
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-yellow-500 pl-6 pr-1.5 text-sm font-semibold text-gray-950 transition-all hover:-translate-y-0.5 hover:bg-yellow-400 disabled:opacity-70"
                >
                  {loading ? "A enviar…" : "Confirmar cadastro"}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gray-950 text-yellow-500">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StepHeader({ index }: { index: number }) {
  const s = steps[index];
  const Icon = s.icon;
  return (
    <div className="mb-8 flex items-center gap-4">
      <motion.span
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 16 }}
        className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-500"
      >
        <Icon className="h-5 w-5" />
      </motion.span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
          Passo {index + 1}
        </p>
        <h2 className="font-display text-2xl font-semibold text-gray-950 md:text-3xl">{s.title}</h2>
      </div>
    </div>
  );
}

function inputCls(error?: string | boolean) {
  return cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-base text-gray-950 outline-none transition-all placeholder:text-gray-400 md:text-sm",
    "focus:border-gray-950 focus:ring-4 focus:ring-yellow-500/30",
    error ? "border-red-400 bg-red-50/40" : "border-gray-200 hover:border-gray-300",
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="mb-2 text-sm font-semibold text-gray-800">{label}</p>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChoicePill({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-all duration-300",
        selected
          ? "border-gray-950 bg-gray-950 text-white"
          : "border-gray-200 text-gray-700 hover:border-gray-400",
      )}
    >
      {selected && (
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <Check className="h-4 w-4 text-yellow-500" strokeWidth={3} />
        </motion.span>
      )}
      {children}
    </motion.button>
  );
}

function Review({
  title,
  items,
  onEdit,
}: {
  title: string;
  items: [string, string][];
  onEdit: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-200/80 p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-gray-950">{title}</p>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 ring-1 ring-gray-200 transition-colors hover:bg-gray-950 hover:text-white hover:ring-gray-950"
        >
          <Pencil className="h-3 w-3" />
          Editar
        </button>
      </div>
      <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {items.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{k}</dt>
            <dd className="truncate text-sm font-medium text-gray-900">{v || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Success({
  numero,
  data,
  onNew,
}: {
  numero: string;
  data: FormData;
  onNew: () => void;
}) {
  const pendente = data.tipoMembro === "Assessor";
  const t = themeFor(data.obra);
  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        x: ((i * 37) % 100) - 50,
        delay: (i % 7) * 0.06,
        rotate: (i * 47) % 360,
        color: i % 3 === 0 ? "#fef200" : i % 3 === 1 ? t.bg : "#030712",
      })),
    [t.bg],
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fbfbf8] pt-[76px]">
      {/* Confetes */}
      <div className="pointer-events-none absolute inset-x-0 top-[76px] h-0 print:hidden">
        {confetti.map((c, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-0 h-3 w-1.5 rounded-sm"
            style={{ backgroundColor: c.color }}
            initial={{ x: 0, y: -20, opacity: 1, rotate: 0 }}
            animate={{ x: `${c.x}vw`, y: "90vh", opacity: 0, rotate: c.rotate + 360 }}
            transition={{ duration: 2.4, delay: c.delay, ease: [0.2, 0.6, 0.4, 1] }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl px-5 py-14 text-center md:py-20">
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-yellow-500 print:hidden"
        >
          <PartyPopper className="h-7 w-7" />
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 font-display text-4xl font-semibold tracking-tight text-gray-950 md:text-5xl print:hidden"
        >
          Bem-vindo(a) à missão, {data.nome.trim().split(" ")[0]}!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-3 max-w-xl text-gray-600 print:hidden"
        >
          O seu cadastro foi registado. Este é o seu cartão de membro das Obras Missionárias
          Pontifícias.
        </motion.p>

        {pendente && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-6 flex max-w-xl items-start gap-3 rounded-2xl border border-yellow-500/60 bg-yellow-500/10 p-4 text-left print:hidden"
          >
            <Hourglass className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-950">Aguarde a aprovação.</span> Como
              Assessor, o seu registo será validado pelo Secretariado antes de ficar ativo.
            </p>
          </motion.div>
        )}

        {/* Cartão a "virar" */}
        <motion.div
          initial={{ rotateY: 180, scale: 0.8, opacity: 0 }}
          animate={{ rotateY: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 max-w-md"
          style={{ perspective: 1200 }}
        >
          <MemberCard
            id="member-card"
            data={{
              nome: data.nome.trim(),
              obra: data.obra,
              tipo: tipoLabel(data.tipoMembro),
              paroquia: data.paroquia.trim(),
              vigararia: data.vigararia,
              anoAdmissao: data.anoAdmissao,
              numero,
              pendente,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row print:hidden"
        >
          <button
            type="button"
            onClick={() => window.print()}
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-gray-950 pl-1.5 pr-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-yellow-500 text-gray-950">
              <Printer className="h-4 w-4" />
            </span>
            Imprimir / guardar PDF
          </button>
          <button
            type="button"
            onClick={onNew}
            className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-gray-700 ring-1 ring-gray-200 transition-colors hover:bg-gray-100"
          >
            <UserPlus className="h-4 w-4" />
            Novo cadastro
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Voltar ao início
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
