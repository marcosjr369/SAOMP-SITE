"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const obras = [
  {
    title: "Infância e Adolescência Missionária (IAM)",
    description:
      "Forma crianças e adolescentes na espiritualidade missionária universal, ajudando-os a viver os quatro compromissos fundamentais: conhecer, amar, partilhar e anunciar a missão.",
    image: "/movimento10.jpeg",
  },
  {
    title: "Obra da Propagação da Fé",
    description:
      "Sustenta a evangelização dos povos por meio da oração, da animação missionária e da partilha solidária de recursos em favor das Igrejas mais necessitadas.",
    image: "/movimento12.jpeg",
  },
  {
    title: "Obra de São Pedro Apóstolo",
    description:
      "Apoia a formação do clero local, seminaristas e vocações sacerdotais nas terras de missão, garantindo a continuidade pastoral das jovens Igrejas.",
    image: "/movimento14.jpeg",
  },
  {
    title: "União Missionária",
    description:
      "Promove a formação missionária permanente de sacerdotes, religiosos e agentes pastorais, fortalecendo a consciência missionária da Igreja local.",
    image: "/movimento15.jpeg",
  },
];

const padroeiros = [
  {
    name: "São Francisco Xavier",
    description:
      "Modelo do missionário enviado aos povos, testemunha da missão ad gentes, marcada pela coragem, itinerância e anúncio explícito do Evangelho.",
  },
  {
    name: "Santa Teresinha do Menino Jesus",
    description:
      "Padroeira das missões pela via espiritual, ensina que a oração, o sacrifício e o amor sustentam a missão mesmo sem sair do claustro.",
  },
];

export default function SobrePage() {
  return (
    <section className="bg-gray-50">
      <div className="relative h-[60vh] w-full">
        <Image
          src="/movimento12.jpeg"
          alt="Obras Missionárias Pontifícias"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/65 flex items-center">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Obras Missionárias Pontifícias
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto"
            >
              No coração da Igreja, a serviço da missão universal de anunciar
              Cristo a todos os povos.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Identidade Missionária
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            As Obras Missionárias Pontifícias são o instrumento oficial da Igreja
            Católica para despertar, animar e sustentar a cooperação missionária
            universal, colocando todas as Igrejas locais em comunhão com a missão
            evangelizadora confiada por Cristo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-3">Origem e Reconhecimento</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Surgidas no século XIX a partir da fé viva de leigos comprometidos,
            especialmente com Pauline Jaricot, as Obras Missionárias foram
            reconhecidas como Pontifícias em 1922 pelo Papa Pio XI, tornando-se
            expressão direta da solicitude missionária do Santo Padre.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Espiritualidade e Padroeiros
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {padroeiros.map((p, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md"
              >
                <h4 className="text-xl font-bold mb-2">{p.name}</h4>
                <p className="text-gray-600">{p.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            As Quatro Obras Missionárias
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Unidas num único espírito missionário, as OMP atuam de forma
            complementar, garantindo formação, animação, espiritualidade e
            partilha solidária.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {obras.map((obra, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="relative h-56">
                <Image
                  src={obra.image}
                  alt={obra.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-full">
                  Obra Pontifícia
                </span>
                <h3 className="text-xl font-bold mb-3">
                  {obra.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {obra.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Estrutura e Organização
          </motion.h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
            As Obras Missionárias Pontifícias atuam em nível universal, nacional
            e diocesano. Na Arquidiocese de Luanda, o Secretariado Arquidiocesano
            coordena a animação missionária, promove a formação pastoral e
            fortalece a comunhão entre paróquias, movimentos e comunidades.
          </p>
        </div>
      </div>
    </section>
  );
}
