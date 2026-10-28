"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const activities = Array.from({ length: 15 }, (_, i) => {
  const index = i + 1;

  const types = [
    {
      title: "Evangelização",
      description:
        "Anúncio da Palavra de Deus através de missões, encontros e ações pastorais.",
    },
    {
      title: "Ação Social",
      description:
        "Apoio às comunidades mais vulneráveis com alimentos, saúde e solidariedade.",
    },
    {
      title: "Formação Missionária",
      description:
        "Capacitação espiritual e pastoral para leigos e missionários.",
    },
    {
      title: "Apoio às Igrejas",
      description:
        "Ajuda espiritual e material às igrejas em regiões mais necessitadas.",
    },
    {
      title: "Juventude Missionária",
      description:
        "Envolvimento dos jovens na vivência da fé e no serviço ao próximo.",
    },
  ];

  const activity = types[i % types.length];

  return {
    title: `${activity.title}`,
    description: activity.description,
    image: `/movimento${index === 1 ? "" : index}.jpeg`,
  };
});

export default function ActivitiesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <SectionHeading
            align="left"
            eyebrow="Em acção"
            title="Actividades Missionárias"
            description="Conheça algumas das acções que realizamos em favor da fé e da caridade."
          />

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="hidden md:grid h-12 w-12 place-items-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-gray-950 hover:bg-gray-950 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Seguinte"
              className="hidden md:grid h-12 w-12 place-items-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-gray-950 hover:bg-gray-950 hover:text-white"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/galeria"
              className="group inline-flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-3 font-semibold transition-all hover:bg-yellow-400 md:ml-2"
            >
              Ver Galeria Completa
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-5 px-5 pb-4 xl:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] xl:scroll-px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]"
      >
        {activities.map((activity, index) => (
          <motion.article
            key={index}
            className="group relative h-[440px] w-[280px] md:w-[340px] shrink-0 snap-start overflow-hidden rounded-3xl bg-gray-900"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: Math.min(index, 4) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={activity.image}
              alt={activity.title}
              fill
              sizes="(max-width: 768px) 280px, 340px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              priority={index < 2}
            />

            <div className="absolute inset-0 bg-linear-to-t from-gray-950/95 via-gray-950/30 to-transparent" />

            <div className="absolute top-5 left-5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/20">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <span className="mb-3 inline-block h-1 w-10 rounded-full bg-yellow-500 transition-all duration-500 group-hover:w-16" />
              <h3 className="text-2xl font-semibold">{activity.title}</h3>
              <p className="mt-2 max-h-32 overflow-hidden text-sm leading-relaxed text-gray-200 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-32 md:group-hover:opacity-100">
                {activity.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-gray-400 md:hidden">
        Deslize para ver mais →
      </p>
    </section>
  );
}
