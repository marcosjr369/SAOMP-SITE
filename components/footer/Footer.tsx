"use client";

import { Phone, Mail, Facebook, UserPlus, ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre o Movimento" },
  { href: "/galeria", label: "Galeria" },
  { href: "/documentos", label: "Documentos" },
  { href: "/buscar-membro", label: "Buscar Membro" },
  { href: "/cadastro", label: "Cadastro" },
];

const socials = [
  {
    href: "https://www.facebook.com/share/g/1F5eQGBjpA/?mibextid=wwXIfr",
    label: "Facebook",
    icon: Facebook,
    external: true,
  },
  { href: "tel:+244939103749", label: "Telefone: +244 934 883 685", icon: Phone },
  { href: "mailto:saomp@ompluanda.com", label: "Email: saomp@ompluanda.com", icon: Mail },
];

/* Cores das camadas da paisagem, do horizonte para a frente */
const GROUND = "#030712"; // igual ao bg-gray-950 do rodapé

function FooterScene() {
  return (
    <svg
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      className="block h-auto w-[180%] max-w-none -translate-x-[21%] md:h-[420px] md:w-full md:translate-x-0"
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfbf8" />
          <stop offset="0.75" stopColor="#fff8c4" />
        </linearGradient>
        <radialGradient id="sun-glow">
          <stop offset="0" stopColor="#fef200" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fef200" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="road" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#fef200" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fef200" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <rect width="1440" height="420" fill="url(#sky)" />

      {/* Sol */}
      <motion.g
        initial={{ y: 60 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        <circle cx="720" cy="235" r="220" fill="url(#sun-glow)" />
        <circle cx="720" cy="235" r="112" fill="#fef200" />
      </motion.g>

      {/* Nuvens */}
      <g className="animate-drift" fill="#ffffff" opacity="0.85">
        <ellipse cx="300" cy="110" rx="70" ry="16" />
        <ellipse cx="335" cy="98" rx="38" ry="18" />
        <ellipse cx="1120" cy="80" rx="80" ry="15" />
        <ellipse cx="1090" cy="70" rx="40" ry="17" />
      </g>

      {/* Pássaros */}
      <g
        className="animate-float-soft"
        fill="none"
        stroke="#3b3a1f"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M560 120 q8 -8 16 0 q8 -8 16 0" />
        <path d="M600 92 q6 -6 12 0 q6 -6 12 0" />
        <path d="M860 130 q7 -7 14 0 q7 -7 14 0" />
      </g>

      {/* Montanhas ao longe */}
      <path
        fill="#f1e48f"
        d="M0 260 L90 215 L170 240 L290 160 L400 230 L500 190 L610 245 L700 228 L820 250 L930 180 L1040 235 L1150 170 L1270 225 L1360 195 L1440 230 V420 H0 Z"
      />
      {/* Colinas */}
      <path
        fill="#cdbd3c"
        d="M0 300 C140 250 260 270 380 285 C520 300 600 255 760 270 C900 283 1010 240 1150 255 C1280 268 1360 250 1440 262 V420 H0 Z"
      />
      <path
        fill="#4a4720"
        d="M0 330 C160 300 300 320 430 330 C560 340 650 300 800 312 C940 323 1060 292 1220 305 C1330 314 1390 300 1440 306 V420 H0 Z"
      />

      {/* Casinhas na colina */}
      <g fill="#3a3818">
        <path d="M470 330 h22 v-14 l-11 -9 l-11 9 Z" />
        <path d="M500 333 h16 v-11 l-8 -7 l-8 7 Z" />
        <path d="M1180 309 h20 v-13 l-10 -8 l-10 8 Z" />
      </g>

      <path
        fill="#161a24"
        d="M0 360 C200 335 360 350 520 356 C700 362 820 330 1000 338 C1160 345 1300 330 1440 340 V420 H0 Z"
      />

      {/* Embondeiro */}
      <g fill="#161a24">
        <path d="M238 352 C242 332 240 318 234 306 L244 310 L249 296 L254 310 L265 304 C259 318 257 334 261 352 Z" />
        <circle cx="228" cy="300" r="11" />
        <circle cx="249" cy="290" r="14" />
        <circle cx="271" cy="299" r="11" />
        <circle cx="240" cy="286" r="8" />
        <circle cx="261" cy="286" r="8" />
      </g>

      {/* Igreja no alto da colina */}
      <g fill="#161a24">
        <rect x="985" y="312" width="52" height="30" />
        <path d="M980 314 L1011 292 L1042 314 Z" />
        <rect x="1036" y="294" width="16" height="48" />
        <path d="M1033 296 L1044 282 L1055 296 Z" />
        <rect x="1042.5" y="266" width="3" height="17" fill="#fef200" />
        <rect x="1037.5" y="271" width="13" height="3" fill="#fef200" />
      </g>
      <rect x="1006" y="322" width="10" height="14" rx="5" fill="#fef200" opacity="0.9" />

      {/* Caminho até à igreja */}
      <path
        d="M690 420 C740 404 850 398 880 382 C912 364 960 358 1004 344"
        fill="none"
        stroke="url(#road)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        fill={GROUND}
        d="M0 392 C240 378 480 388 720 390 C960 392 1200 378 1440 386 V420 H0 Z"
      />
    </svg>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-950 text-white">
      {/* No telemóvel mostra-se a zona central da paisagem (sol, caminho e igreja) */}
      <div className="overflow-hidden">
        <FooterScene />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="-mt-6 max-w-2xl font-display text-4xl md:-mt-10 md:text-6xl font-semibold leading-[1.05] tracking-tight"
        >
          A missão começa{" "}
          <span className="relative inline-block text-gray-950">
            <span className="absolute inset-x-[-0.1em] inset-y-[0.08em] -rotate-1 rounded-lg bg-yellow-500" />
            <span className="relative">em ti.</span>
          </span>
        </motion.h2>

        <div className="mt-16 grid gap-12 pb-10 md:mt-24 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <div className="order-last lg:order-first lg:self-end">
            <div className="flex items-center gap-3">
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white">
                <Image
                  src="/logo.jpeg"
                  alt="SAOMP Logo"
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </span>
              <span className="font-display text-2xl font-semibold leading-none">
                SAOMP
              </span>
            </div>
            <p className="mt-5 text-sm text-white/80">
              Copyright © {currentYear}
            </p>
            <p className="mt-1 text-xs text-white/50">
              Obras Missionárias Pontifícias · Arquidiocese de Luanda
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
              <nav aria-label="Rodapé">
                <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                  {navLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center gap-3 border-l-2 border-yellow-500 pl-3 text-white/85 transition-colors hover:text-yellow-500"
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <Link
                href="/cadastro"
                className="group inline-flex h-12 w-fit items-center gap-3 rounded-full bg-yellow-500 pl-1.5 pr-6 text-sm font-semibold uppercase tracking-wide text-gray-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gray-950 text-yellow-500 transition-transform duration-300 group-hover:scale-110">
                  <UserPlus className="h-4 w-4" />
                </span>
                Tornar-se membro
              </Link>
            </div>

            <div className="mt-10 flex flex-col-reverse items-center gap-6 border-t-2 border-white/80 pt-8 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-all group-hover:-translate-y-0.5 group-hover:bg-yellow-500 group-hover:text-gray-950">
                  <ArrowUp className="h-4 w-4" />
                </span>
                Voltar ao topo
              </button>

              <ul className="flex items-center gap-4">
                {socials.map(({ href, label, icon: Icon, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      aria-label={label}
                      title={label}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="grid h-10 w-10 place-items-center rounded-full text-yellow-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-500 hover:text-gray-950"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
