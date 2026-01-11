"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const activities = Array.from({ length: 20 }, (_, i) => {
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
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Actividades Missionárias
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl">
                Conheça algumas das acções que realizamos em favor da fé e da
                caridade.
              </p>
            </div>

            <Link
              href="/galeria"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 hover:gap-3 hover:shadow-lg group"
            >
              Ver Galeria Completa
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="min-w-[280px] md:min-w-[320px] lg:min-w-[340px] h-[420px] relative rounded-2xl overflow-hidden snap-start group cursor-pointer flex-shrink-0"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03, y: -5 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 768px) 280px, 340px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 2}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-300 group-hover:-translate-y-5">
                    <span className="inline-block mb-3 px-3 py-1 bg-yellow-500 text-xs font-semibold rounded-full">
                      Actividade Missionária
                    </span>

                    <h3 className="text-2xl font-bold mb-3">
                      {activity.title}
                    </h3>

                    <p className="text-gray-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <span className="animate-pulse">←</span>
              Arraste para ver mais
              <span className="animate-pulse">→</span>
            </p>
          </div>
        </div>

        <motion.div
          className="mt-12 text-center md:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-all duration-300 hover:gap-3 hover:shadow-lg group"
          >
            Explorar Galeria Completa
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #f59e0b;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #d97706;
        }
      `}</style>
    </section>
  );
}
