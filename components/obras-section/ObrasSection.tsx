"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { obras } from "@/lib/obras";

export default function ObrasSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Unidas num só espírito"
          title={
            <>
              As <span className="highlight">quatro Obras</span> Missionárias
              Pontifícias
            </>
          }
          description="Cada obra acompanha uma etapa da vida cristã — da infância à vida consagrada."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {obras.map((obra, i) => {
            const Icon = obra.icon;
            return (
              <motion.div
                key={obra.sigla}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/sobre?obra=${obra.sigla}#obras`}
                  className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-[#fbfbf8] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gray-950 hover:bg-gray-950 hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]"
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-500/0 blur-2xl transition-colors duration-500 group-hover:bg-yellow-500/25" />

                  <div className="relative flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-500 text-gray-950 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-sm font-semibold text-gray-300 transition-colors group-hover:text-white/30">
                      0{i + 1}
                    </span>
                  </div>

                  <p className="relative mt-8 font-display text-6xl font-semibold leading-none tracking-tight text-gray-950 transition-colors duration-500 group-hover:text-yellow-500">
                    {obra.sigla}
                  </p>

                  <h3 className="relative mt-4 text-lg font-semibold leading-snug text-gray-950 transition-colors duration-500 group-hover:text-white">
                    {obra.nome}
                  </h3>
                  <span className="relative mt-3 inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200 transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white/80 group-hover:ring-white/15">
                    {obra.publico}
                  </span>

                  <div className="relative mt-auto flex items-end justify-between gap-3 pt-6">
                    <p className="text-xs leading-snug text-gray-500 transition-colors duration-500 group-hover:text-white/50">
                      {obra.pontificia}
                    </p>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-gray-950 ring-1 ring-gray-200 transition-all duration-500 group-hover:rotate-45 group-hover:bg-yellow-500 group-hover:ring-yellow-500">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
