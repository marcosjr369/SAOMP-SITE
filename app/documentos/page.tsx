"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "@/components/ui/portal";
import { ArrowRight, Download, X, Eye, FileText, Search } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";

const documents = [
  {
    title: "Apresentação do Plano Trienal 2024-2026",
    description:
      "Visão geral do plano trienal da SAOMP para o período 2024-2026.",
    pdf: "/documentos/Apresentacão do plano trienal 2024-2026. SAOMP.pdf",
    logoText: "Plano 24-26",
  },
  {
    title: "Plano Trienal 2026-2028 - Consulta Pública nas Comunidades",
    description:
      "Consulta pública do plano trienal 2026-2028, envolvendo as comunidades locais.",
    pdf: "/documentos/PLANO TRIENAL 2026-2028 -CONSULTA PUBLICA NAS COMUNIDADES.pdf",
    logoText: "Plano 26-28",
  },
  {
    title: "Programa Assembleia Eleitiva COMPVSPA 2025",
    description:
      "Programa e agenda da Assembleia Eleitoral do COMPVSPA em 2025.",
    pdf: "/documentos/PROGRAMA ASSEMBLEIA ELEITIVA COMPVSPA_2025.pdf",
    logoText: "COMPVSPA 2025",
  },
  {
    title: "Regulamento do SAOMP - Revistos 2020",
    description: "Regulamento atualizado do SAOMP, revisado em 2020.",
    pdf: "/documentos/Regulamento do SAOMP - Revistos 2020.pdf",
    logoText: "Regulamento",
  },
  {
    title: "Conhecendo as OMP",
    description: "Todas as informações sobre as OMP e sua estrutura.",
    pdf: "/documentos/Conhecendo as OMP Manual.pdf",
    logoText: "Conhecendo as OMP",
  },

  {
    title: "Ritual de Compromisso",
    description: "Ritual de Compromisso Infância e Adolescência Missionária.",
    pdf: "/documentos/Ritual de Compromisso Infância e Adolescência Missionária.pdf",
    logoText: "Ritual de Compromisso",
  },
  {
    title: "Ritual de Oração de Caminhada LMJ",
    description: "Informações sobre o Ritual de Oração de Caminhada LMJ.",
    pdf: "/documentos/Ritual de Oração de Caminhada LMJ.pdf",
    logoText: "Ritual de Oração de Caminhada",
  },
  {
    title: "Ritual de Promessa e renovação",
    description: "Informações sobre o Ritual de Promessa e renovação LMJ",
    pdf: "/documentos/Ritual de Promessa e renovação LMJ.pdf",
    logoText: "Ritual de Promessa e renovação",
  },
  {
    title: "10 compromissos da Infância e Adolescência Missionária",
    description: "10 compromissos da Infância e Adolescência Missionária",
    pdf: "/documentos/Os 10 compromissos da Infância e Adolescência Missionária.pdf",
    logoText: "10 compromissos da Infância e Adolescência Missionária",
  },

  {
    title: "Símbolos Missionários",
    description: "Símbolos Missionários",
    pdf: "/documentos/Símbolos Missionários .pdf",
    logoText: "Símbolos Missionários",
  },
  {
    title: "Os Decálogos da IAM",
    description: "Os Decálogos da IAM",
    pdf: "/documentos/Os Decálogos da Infância e Adolescência Missionária.pdf",
    logoText: "Os Decálogos da IAM",
  },
  {
    title: "As Quatro Áreas Integradas Metodologias da Infância Missionária",
    description:
      "As Quatro Áreas Integradas Metodologias da Infância Missionária",
    pdf: "/documentos/As Quatro Áreas Integradas Metodologias da Infância Missionária.pdf",
    logoText: "Áreas Integradas Metodologias da Infância Missionária",
  },
];

type Doc = (typeof documents)[number];

export default function DocumentsPage() {
  const [activeDoc, setActiveDoc] = useState<Doc | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (!activeDoc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDoc(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeDoc]);

  return (
    <section className="bg-[#fbfbf8] min-h-screen">
      <PageHero
        image="/movimento20.jpeg"
        imagePosition="center 35%"
        eyebrow="Biblioteca"
        title="Documentos Oficiais da SAOMP"
        description="Aceda a planos trienais, regulamentos, rituais e programas oficiais com facilidade."
      />

      <div className="max-w-7xl mx-auto px-5 py-14 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-950">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1
              ? "documento disponível"
              : "documentos disponíveis"}
          </p>
          <label className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar documentos..."
              className="h-12 w-full rounded-full border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition-shadow focus:border-yellow-600 focus:ring-4 focus:ring-yellow-500/30"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc, idx) => (
            <motion.button
              key={doc.pdf}
              type="button"
              onClick={() => setActiveDoc(doc)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-[0_20px_40px_-20px_rgb(0_0_0/0.25)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
            >
              <div className="mb-6 flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-yellow-500/20 ring-1 ring-yellow-500/50 transition-colors group-hover:bg-yellow-500">
                  <FileText className="h-6 w-6 text-gray-900" />
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  PDF
                </span>
              </div>
              <p className="mb-1.5 line-clamp-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {doc.logoText}
              </p>
              <h3 className="text-lg font-semibold leading-snug text-gray-950">
                {doc.title}
              </h3>
              <p className="mb-6 mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                {doc.description}
              </p>
              <span className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-5 text-sm font-semibold text-gray-950">
                <Eye className="h-4 w-4" />
                Visualizar documento
                <span className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-gray-100 transition-all group-hover:bg-gray-950 group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500">
            Nenhum documento encontrado para “{query}”.
          </div>
        )}
      </div>

      <Portal>
        <AnimatePresence>
          {activeDoc && (
            <motion.div
              className="fixed inset-0 z-60 flex items-center justify-center bg-gray-950/70 px-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDoc(null)}
            >
              <motion.div
                className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
                initial={{ y: 30, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 30, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-4 border-b border-gray-100 p-5 md:p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-yellow-500">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-950">
                      {activeDoc.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {activeDoc.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveDoc(null)}
                    aria-label="Fechar"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 bg-gray-100 p-3">
                  <iframe
                    src={activeDoc.pdf}
                    title={activeDoc.title}
                    className="h-[60vh] md:h-[66vh] w-full rounded-xl border border-gray-200 bg-white"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 p-5 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setActiveDoc(null)}
                    className="rounded-full px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Fechar
                  </button>
                  <a
                    href={activeDoc.pdf}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold transition-colors hover:bg-yellow-400"
                  >
                    <Download size={18} />
                    Baixar PDF
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </section>
  );
}
