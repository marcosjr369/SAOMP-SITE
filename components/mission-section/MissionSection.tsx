"use client";

import { motion } from "framer-motion";
import { Globe, Users, Heart, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const missionItems = [
  {
    title: "Universalidade",
    description: "Presente em todos os continentes, levando a mensagem de Cristo.",
    icon: Globe,
  },
  {
    title: "Espiritualidade",
    description:
      "Unindo fiéis em oração e ação concreta de caridade.",
    icon: Users,
  },
  {
    title: "Caridade",
    description:
      "Apoio espiritual e material às igrejas mais necessitadas.",
    icon: Heart,
  },
  {
    title: "Formação",
    description:
      "Educação contínua para despertar a consciência missionária.",
    icon: BookOpen,
  },
];

export default function MissionSection() {
  return (
    <section className="py-20 md:py-28 bg-[#fbfbf8]">
      <div className="max-w-7xl mx-auto px-5">
        <SectionHeading
          eyebrow="Nossa Missão"
          title={
            <>
              Os pilares que guiam a nossa{" "}
              <span className="highlight">ação missionária</span>
            </>
          }
          description="Quatro dimensões que orientam o trabalho das Obras Missionárias Pontifícias na Arquidiocese de Luanda."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {missionItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-yellow-500 hover:shadow-[0_20px_40px_-20px_rgb(0_0_0/0.25)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="absolute right-6 top-5 font-display text-5xl font-semibold text-gray-100 transition-colors group-hover:text-yellow-500/40">
                  0{idx + 1}
                </span>
                <div className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-yellow-500/20 ring-1 ring-yellow-500/50 transition-all duration-300 group-hover:bg-yellow-500 group-hover:rotate-[-6deg]">
                  <Icon className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="relative text-lg font-semibold text-gray-950 mb-2">
                  {item.title}
                </h3>
                <p className="relative text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
