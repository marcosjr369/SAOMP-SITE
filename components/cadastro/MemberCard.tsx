"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { RotateCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type CardTheme = {
  sigla: string;
  nome: string;
  bg: string;
  text: string;
  muted: string;
  accent: string;
};

// Cores do cartão por obra
const themes: Record<string, CardTheme> = {
  iam: {
    sigla: "IAM",
    nome: "Infância e Adolescência Missionária",
    bg: "#fef200",
    text: "#14130a",
    muted: "rgb(20 19 10 / 0.6)",
    accent: "#14130a",
  },
  liga: {
    sigla: "LMJ",
    nome: "Liga Missionária Juvenil",
    bg: "#1d4ed8",
    text: "#ffffff",
    muted: "rgb(255 255 255 / 0.65)",
    accent: "#fef200",
  },
  uniao: {
    sigla: "UM",
    nome: "União Missionária",
    bg: "#c81e1e",
    text: "#ffffff",
    muted: "rgb(255 255 255 / 0.7)",
    accent: "#fef200",
  },
  familia: {
    sigla: "FM",
    nome: "Família Missionária",
    bg: "#15803d",
    text: "#ffffff",
    muted: "rgb(255 255 255 / 0.7)",
    accent: "#fef200",
  },
  vazio: {
    sigla: "OMP",
    nome: "Obras Missionárias Pontifícias",
    bg: "#030712",
    text: "#ffffff",
    muted: "rgb(255 255 255 / 0.55)",
    accent: "#fef200",
  },
};

const normalize = (s: string) =>
  (s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const commitment = [
  "A ser missionário em casa, na família, na paróquia, na escola e com os amigos, levando a todos a alegria de ser cristão.",
  "A rezar diariamente à invocação: “Virgem Santíssima, rogai por nós e por todas as crianças, adolescentes e jovens do mundo inteiro que não conhecem a Cristo”.",
  "A participar nas reuniões e formações.",
  "A cumprir com as responsabilidades que assumo no grupo.",
  "A participar nos retiros e na oração missionária.",
  "A ajudar com uma quota voluntária para o desenvolvimento da vida missionária da Igreja.",
];

const commitmentClosing =
  "Que Nossa Senhora Rainha das Missões me acompanhe em todos os trabalhos missionários; assim prometo cumprir e ser fiel. Amém.";

export function themeFor(obra: string): CardTheme {
  const o = normalize(obra);
  if (o.includes("iam")) return themes.iam;
  if (o.includes("liga")) return themes.liga;
  if (o.includes("uniao")) return themes.uniao;
  if (o.includes("familia")) return themes.familia;
  return themes.vazio;
}

export function memberNumber(obra: string, id: string, ano: number | string) {
  return `${themeFor(obra).sigla}-${ano}-${id.slice(-5).toUpperCase()}`;
}

export type MemberCardData = {
  nome: string;
  obra: string;
  tipo: string;
  paroquia: string;
  vigararia: string;
  anoAdmissao: string;
  numero?: string;
  pendente?: boolean;
};

export function MemberCard({
  data,
  interactive = true,
  className,
  id,
}: {
  data: MemberCardData;
  interactive?: boolean;
  className?: string;
  id?: string;
}) {
  const t = themeFor(data.obra);
  const [showBack, setShowBack] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 200,
    damping: 20,
  });
  const glare = useTransform(
    mx,
    (x) =>
      `radial-gradient(circle at ${(x + 0.5) * 100}% 30%, rgb(255 255 255 / 0.55), transparent 55%)`,
  );

  return (
    <div className={cn("[perspective:1200px]", className)} id={id}>
      <motion.div
        onMouseMove={(e) => {
          if (!interactive || showBack) return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{
          rotateX: interactive && !showBack ? rotateX : 0,
          rotateY: showBack ? 180 : interactive ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="member-card relative aspect-[1.586] w-full text-left transition-transform duration-700 [transform-style:preserve-3d]"
      >
        <div
          className="member-card absolute inset-0 overflow-hidden rounded-[1.4rem] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.55)] [backface-visibility:hidden]"
          style={{ backgroundColor: t.bg, color: t.text }}
        >
          <CardDecoration theme={t} />
          <div className="relative flex h-full flex-col justify-between p-[6%]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white shadow-sm">
                  <Image
                    src="/logo.jpeg"
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="leading-tight">
                  <span className="block font-display text-base font-semibold">
                    SAOMP
                  </span>
                  <span
                    className="block text-[9px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: t.muted }}
                  >
                    Cartão de Membro
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {data.pendente && (
                  <span className="rotate-[-4deg] rounded-md border-[1.5px] border-current px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest">
                    Aguarda aprovação
                  </span>
                )}
                <span
                  className="grid h-7 w-10 shrink-0 grid-cols-3 gap-px overflow-hidden rounded-md p-[3px] opacity-90"
                  style={{ backgroundColor: t.accent }}
                  aria-hidden
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span
                      key={i}
                      className="rounded-[2px]"
                      style={{ backgroundColor: t.bg, opacity: 0.35 }}
                    />
                  ))}
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <p
                className="text-[9px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: t.muted }}
              >
                {t.nome}
              </p>
              <p className="mt-1 truncate font-display text-[1.45rem] font-semibold leading-tight sm:text-2xl">
                {data.nome || "O seu nome"}
              </p>
            </div>

            <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-3 text-[10px]">
              <CardField
                label="Nº de membro"
                value={data.numero || "— — —"}
                mono
                muted={t.muted}
              />
              <CardField
                label="Tipo"
                value={data.tipo || "—"}
                muted={t.muted}
              />
              <CardField
                label="Desde"
                value={data.anoAdmissao || "—"}
                muted={t.muted}
              />
              <div className="col-span-3 -mt-1">
                <CardField
                  label="Paróquia · Vigararia"
                  value={
                    data.paroquia || data.vigararia
                      ? [data.paroquia, data.vigararia]
                          .filter(Boolean)
                          .join(" · ")
                      : "—"
                  }
                  muted={t.muted}
                />
              </div>
            </div>
          </div>
          {interactive && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 hover:opacity-100"
              style={{ background: glare }}
            />
          )}
        </div>

        <div
          className="member-card absolute inset-0 flex flex-col overflow-hidden rounded-[1.4rem] p-[5%] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.55)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ backgroundColor: t.bg, color: t.text }}
        >
          <CardDecoration theme={t} />
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="flex items-center justify-between gap-2 border-b border-current/20 pb-1.5">
              <span className="font-display text-[9px] font-semibold uppercase tracking-wider">
                Comprometo-me de modo consciente e responsável:
              </span>
              <span className="shrink-0 text-[8px] font-bold">{t.sigla}</span>
            </div>
            <ul className="mt-1.5 grid min-h-0 flex-1 content-start gap-y-1 overflow-hidden text-[7px] leading-[1.2] sm:text-[8px]">
              {commitment.map((item) => (
                <li key={item} className="flex gap-1">
                  <span aria-hidden>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="relative mt-1 border-t border-current/20 pt-1.5 text-[7px] font-semibold leading-[1.2] sm:text-[8px]">
              {commitmentClosing}
            </p>
          </div>
        </div>
      </motion.div>
      <div className="mt-2 flex justify-end print:hidden">
        <button
          type="button"
          aria-label={
            showBack ? "Mostrar frente do cartão" : "Mostrar verso do cartão"
          }
          onClick={() => setShowBack((current) => !current)}
          className="inline-flex h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold text-gray-700 ring-1 ring-gray-300 transition-colors hover:bg-gray-950 hover:text-white hover:ring-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950"
        >
          <RotateCw className="h-3.5 w-3.5" />
          {showBack ? "Ver frente" : "Ver verso"}
        </button>
      </div>
    </div>
  );
}

function CardDecoration({ theme }: { theme: CardTheme }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `radial-gradient(${theme.text} 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(115deg, transparent 35%, black 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-[18px] opacity-20"
        style={{ borderColor: theme.text }}
      />
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rounded-full border-[10px] opacity-15"
        style={{ borderColor: theme.text }}
      />
      <span
        className="pointer-events-none absolute -bottom-6 right-3 select-none font-display text-[6.5rem] font-semibold leading-none opacity-[0.13]"
        aria-hidden
      >
        {theme.sigla}
      </span>
    </>
  );
}

function CardField({
  label,
  value,
  muted,
  mono,
}: {
  label: string;
  value: string;
  muted: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p
        className="text-[8px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: muted }}
      >
        {label}
      </p>
      <p
        className={cn(
          "truncate text-[11px] font-semibold",
          mono && "font-mono tracking-wider",
        )}
      >
        {value}
      </p>
    </div>
  );
}
