"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Church } from "lucide-react";

const images = Array.from({ length: 25 }, (_, i) => {
  const index = i + 1;
  return `/movimento${index === 1 ? "" : index}.jpeg`;
});

const stats = [
  { value: "4", label: "Obras Missionárias" },
  { value: "8", label: "Vigararias" },
  { value: "1922", label: "Pontifícias desde" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#fbfbf8] pt-[76px]">
      <div className="bg-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-yellow-500/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-28">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-[2.7rem] leading-[1.05] sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-950"
          >
            Ide e fazei{" "}
            <span className="relative inline-block">
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease }}
                className="absolute inset-x-[-0.08em] bottom-[0.08em] h-[0.32em] origin-left bg-yellow-500"
              />
              <span className="relative">discípulos</span>
            </span>{" "}
            de todas as nações
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-gray-600"
          >
            A Igreja é{" "}
            <span className="font-semibold text-gray-950">missionária</span>{" "}
            por natureza. Junte-se às Obras Missionárias Pontifícias e leve a
            Boa Nova a todos os povos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/cadastro"
              className="group relative inline-flex h-14 items-center justify-between gap-4 overflow-hidden rounded-full bg-yellow-500 pl-7 pr-2 font-semibold text-gray-950 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.45)] ring-1 ring-yellow-600/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400 sm:justify-start"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 opacity-0 blur-md transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
              />
              <span className="relative">Juntar-se à Missão</span>
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gray-950 text-yellow-500 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>

            <Link
              href="/sobre"
              className="group inline-flex h-14 items-center gap-4 rounded-full bg-gray-950 pl-2 pr-7 font-semibold text-white shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-900"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow-500 text-gray-950 transition-transform duration-300 group-hover:scale-110">
                <Church className="h-[18px] w-[18px]" />
              </span>
              Conhecer o Movimento
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <motion.div
            aria-hidden
            initial={{ rotate: 0 }}
            animate={{ rotate: 3 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="absolute -inset-3 rounded-[2.25rem] bg-yellow-500"
          />

          <div className="relative overflow-hidden rounded-[2rem] bg-gray-950 p-3 text-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-gray-900">
              <AnimatePresence initial={false}>
                <motion.div
                  key={images[currentImage]}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <Image
                    src={images[currentImage]}
                    alt="Actividades do movimento missionário"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={currentImage === 0}
                    className="object-cover animate-ken-burns"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Pré-carrega a próxima imagem para a transição ser suave */}
              <Image
                src={images[(currentImage + 1) % images.length]}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="pointer-events-none opacity-0"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 px-5 pb-4 pt-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease }}
                >
                  <p className="font-display text-3xl md:text-4xl font-semibold text-yellow-500">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
