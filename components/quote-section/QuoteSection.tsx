"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const quotes = [
  {
    text: "No coração da Igreja, minha Mãe, eu serei o amor.",
    author: "Santa Teresinha do Menino Jesus",
  },
  {
    text: "Muitos perdem a fé por falta de missionários.",
    author: "São Francisco Xavier",
  },
  {
    text: "A minha vocação é o amor.",
    author: "Santa Teresinha do Menino Jesus",
  },

  {
    text: "Ai de mim se não anunciar o Evangelho!",
    author: "São Francisco Xavier",
  },
  { text: "Tudo é graça.", author: "Santa Teresinha do Menino Jesus" },
  {
    text: "O amor de Deus impele-me a ir mais longe.",
    author: "São Francisco Xavier",
  },
  {
    text: "Quero passar o meu céu fazendo o bem sobre a terra.",
    author: "Santa Teresinha do Menino Jesus",
  },
  {
    text: "Senhor, dá-me almas, fica com o resto.",
    author: "São Francisco Xavier",
  },
  {
    text: "Não é suficiente atravessar os mares, é preciso atravessar os corações.",
    author: "São Francisco Xavier",
  },
  {
    text: "A santidade consiste em pequenas coisas feitas com grande amor.",
    author: "Santa Teresinha do Menino Jesus",
  },
  {
    text: "Quantas almas se perdem por falta de quem as anuncie Jesus Cristo.",
    author: "São Francisco Xavier",
  },
  {
    text: "A confiança e nada mais que a confiança deve conduzir-nos ao amor.",
    author: "Santa Teresinha do Menino Jesus",
  },
  {
    text: "Onde houver maior necessidade, aí deve estar o missionário.",
    author: "São Francisco Xavier",
  },
  {
    text: "Não posso crescer, tenho de suportar-me como sou, com todas as minhas imperfeições.",
    author: "Santa Teresinha do Menino Jesus",
  },
  {
    text: "A missão nasce do amor e conduz ao sacrifício.",
    author: "São Francisco Xavier",
  },
  {
    text: "A oração é um impulso do coração, um simples olhar lançado ao céu.",
    author: "Santa Teresinha do Menino Jesus",
  },
  {
    text: "Prefiro morrer no campo da missão do que viver sem anunciar Cristo.",
    author: "São Francisco Xavier",
  },
  {
    text: "Compreendi que o amor encerra todas as vocações.",
    author: "Santa Teresinha do Menino Jesus",
  },
    {
    text: "Quem ama verdadeiramente a Deus não teme o cansaço nem o sofrimento.",
    author: "São Francisco Xavier",
  },
  {
    text: "Mesmo no sofrimento, posso escolher amar.",
    author: "Santa Teresinha do Menino Jesus",
  },
];

export default function MissionQuoteSection() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setIndex((prev) => (prev + 1) % quotes.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + quotes.length) % quotes.length);

  useEffect(() => {
    timeoutRef.current = setTimeout(next, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return (
    <section className="relative py-16 px-4 bg-linear-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative">
        <Quote className="mx-auto w-12 h-12 text-yellow-400 mb-6 opacity-60" />

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-gray-800 leading-relaxed px-6"
          >
            “{quotes[index].text}”
          </motion.blockquote>
        </AnimatePresence>

        <motion.div
          key={quotes[index].author}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-700">
            {quotes[index].author}
          </h3>
        </motion.div>

        <div className="mt-10 flex justify-center gap-6">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-yellow-100 hover:bg-yellow-200 transition"
            aria-label="Frase anterior"
          >
            <ChevronLeft className="w-6 h-6 text-yellow-600" />
          </button>

          <button
            onClick={next}
            className="p-3 rounded-full bg-yellow-100 hover:bg-yellow-200 transition"
            aria-label="Próxima frase"
          >
            <ChevronRight className="w-6 h-6 text-yellow-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
