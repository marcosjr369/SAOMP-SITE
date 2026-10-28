"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, UserPlus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export default function DocumentsSection() {
  return (
    <section className="px-5 py-20 md:py-24 bg-[#fbfbf8]">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-yellow-500 px-6 py-14 md:px-16 md:py-20">
        <div className="bg-dots absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
        <motion.div
          aria-hidden
          className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full border-[40px] border-white/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-950/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
              <FileText className="h-3.5 w-3.5" />
              Documentos Oficiais
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
              Planos, regulamentos e rituais num só lugar.
            </h2>
            <p className="mt-4 max-w-xl text-base md:text-lg text-gray-950/75">
              Aceda a todos os documentos oficiais e acompanhe o trabalho das
              Obras Missionárias Pontifícias na Arquidiocese.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch md:justify-self-end">
            <Link
              href="/documentos"
              className="group inline-flex h-14 items-center gap-4 rounded-full bg-gray-950 pl-2 pr-7 font-semibold text-white shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-900"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow-500 transition-transform duration-300 group-hover:scale-110">
                <FileText className="h-[18px] w-[18px]" />
              </span>
              Ver Documentos
            </Link>
            <Link
              href="/cadastro"
              className="group inline-flex h-14 items-center gap-4 rounded-full bg-white pl-2 pr-7 font-semibold text-gray-950 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow-500 transition-transform duration-300 group-hover:scale-110">
                <UserPlus className="h-[18px] w-[18px]" />
              </span>
              Tornar-se membro
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
