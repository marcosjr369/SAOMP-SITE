"use client";

import { motion } from "framer-motion";
import { Globe, Users, Heart, BookOpen } from "lucide-react";

const missionItems = [
  {
    title: "Universalidade",
    description: "Presente em todos os continentes, levando a mensagem de Cristo.",
    icon: Globe,
  },
  {
    title: "Comunidade",
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
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Título */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Nossa Missão
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          className="text-gray-600 text-lg mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Descubra os pilares que guiam nossa ação missionária.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missionItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow cursor-default flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                {/* Ícone */}
                <div className="bg-yellow-100 p-4 rounded-full mb-4">
                  <Icon className="text-yellow-500 w-8 h-8" />
                </div>
                {/* Título */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                {/* Descrição */}
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
