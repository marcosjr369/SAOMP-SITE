"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    description: "As Quatro Áreas Integradas Metodologias da Infância Missionária",
    pdf: "/documentos/As Quatro Áreas Integradas Metodologias da Infância Missionária.pdf",
    logoText: "Áreas Integradas Metodologias da Infância Missionária",
  }
];

export default function DocumentsPage() {
  const [activeDoc, setActiveDoc] = useState<any>(null);

  return (
    <section className="bg-gray-50">
      <div
        className="relative h-100 md:h-125 flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url('movimento11.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          className="relative z-10 text-white px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Documentos Oficiais da SAOMP
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Acesse planos trienais, regulamentos e programas oficiais com
            facilidade.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition cursor-pointer flex flex-col group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-center h-32 bg-linear-to-r from-yellow-400 to-yellow-500 text-white text-md md:text-xl px-5 font-bold shrink-0 transition-transform group-hover:scale-105">
                {doc.logoText}
              </div>
              <div className="p-6 flex flex-col grow justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition">
                    {doc.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{doc.description}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 mt-auto hover:bg-yellow-50 transition"
                  onClick={() => setActiveDoc(doc)}
                >
                  <Eye size={18} />
                  Visualizar
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeDoc && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-3xl rounded-2xl p-6 relative overflow-y-auto max-h-[90vh] shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setActiveDoc(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X size={22} />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {activeDoc.title}
              </h3>
              <p className="text-gray-600 mb-6">{activeDoc.description}</p>

              <div className="w-full h-[60vh] md:h-[70vh] mb-4">
                <iframe
                  src={activeDoc.pdf}
                  className="w-full h-full border rounded-md"
                  style={{ minHeight: "400px" }}
                ></iframe>
              </div>

              <a href={activeDoc.pdf} download>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center gap-2">
                  <Download size={18} />
                  Baixar PDF
                </Button>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
