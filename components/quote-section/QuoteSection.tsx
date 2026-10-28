"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/ui/section-heading";

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

const DURATION = 4500;

export default function MissionQuoteSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setIndex((prev) => (prev + 1) % quotes.length);

  useEffect(() => {
    if (paused) return;
    timeoutRef.current = setTimeout(next, DURATION);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, paused]);

  const isTeresinha = quotes[index].author.includes("Teresinha");

  return (
    <section
      id="frases"
      className="relative py-20 md:py-28 px-5 bg-[#fbfbf8] overflow-hidden scroll-mt-20"
    >
      <div className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div
        className="relative max-w-4xl mx-auto text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Eyebrow>Palavras dos nossos padroeiros</Eyebrow>

        <span
          aria-hidden
          className="block font-display text-[7rem] leading-none text-yellow-500 h-16 select-none"
        >
          “
        </span>

        <div className="min-h-[200px] md:min-h-[170px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-display text-2xl md:text-4xl italic text-gray-900 leading-snug">
                {quotes[index].text}
              </blockquote>
              <figcaption className="mt-8 inline-flex items-center gap-3">
                <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-yellow-500 ring-offset-2">
                  <Image
                    src={isTeresinha ? "/teresinha.jpeg" : "/xavier.jpeg"}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <span className="text-left">
                  <span className="block font-semibold text-gray-900">
                    {quotes[index].author}
                  </span>
                  <span className="block text-xs text-gray-500">
                    Padroeiro(a) das Missões
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
