"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const obras = [
  {
    title: "Infância e Adolescência Missionária (IAM)",
    description:
      "Desperta nas crianças e adolescentes a consciência missionária universal, ensinando desde cedo a rezar, partilhar e agir em favor das missões.",
    image: "/movimento10.jpeg",
  },
  {
    title: "Liga Missionária (Propagação da Fé)",
    description:
      "Promove a cooperação espiritual e material para a evangelização dos povos, fortalecendo a oração missionária e o apoio às Igrejas necessitadas.",
    image: "/movimento12.jpeg",
  },
  {
    title: "São Pedro Apóstolo (Clero)",
    description:
      "Apoia a formação do clero local e candidatos à vida consagrada nas terras de missão, garantindo líderes pastorais preparados para servir o povo de Deus.",
    image: "/movimento14.jpeg",
  },
  {
    title: "União Missionária (Sacerdotes e Religiosos)",
    description:
      "Promove a formação missionária permanente de sacerdotes, religiosos e agentes de pastoral, fortalecendo uma Igreja consciente de sua natureza missionária.",
    image: "/movimento15.jpeg",
  },
];

const padroeiros = [
  {
    name: "São Francisco Xavier",
    description:
      "O grande missionário jesuíta que levou o Evangelho ao Oriente (Índia, Japão), representando a missão 'ad gentes' — ir para fora.",
  },
  {
    name: "Santa Teresinha",
    description:
      "Carmelita que ofereceu sua vida e orações pelos missionários, representando a alma orante e oculta que sustenta a missão.",
  },
];

export default function SobrePage() {
  return (
    <section className="bg-gray-50">
      <div className="relative h-[60vh] w-full">
        <Image
          src="/movimento12.jpeg"
          alt="Sobre o Movimento Missionário"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Sobre o Movimento
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto"
            >
              As Obras Missionárias Pontifícias são o principal instrumento da
              Igreja Católica para animar, formar e sustentar a missão
              evangelizadora em todo o mundo.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Nossa História
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed text-center">
            As Obras Missionárias Pontifícias nasceram do zelo missionário de
            fiéis leigos e sacerdotes que, tocados pela graça, decidiram apoiar
            a evangelização dos povos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Origens</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            A Obra da Propagação da Fé foi fundada em Lyon, França, em 1822, por
            Pauline Jaricot. Sua intuição simples mas profunda foi criar redes
            de oração e coleta de pequenas ofertas para apoiar os missionários,
            espalhando-se rapidamente pelo mundo católico.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Padroeiros das Missões
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {padroeiros.map((pad, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {pad.name}
                </h4>
                <p className="text-gray-600">{pad.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-500 text-center">
            Em 1922, o Papa Pio XI elevou estas obras à categoria de
            Pontifícias, reconhecendo-as como instrumento oficial da Igreja para
            a cooperação missionária.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Obras Missionárias Pontifícias
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            As OMP promovem a evangelização, a solidariedade e o apoio às
            comunidades mais necessitadas, com espírito de fé, partilha e
            serviço.
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
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
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
                  Obra Missionária
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
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
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Estrutura Arquidiocesana
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
              Na Arquidiocese de Luanda, o Secretariado Arquidiocesano das Obras
              Missionárias Pontifícias coordena, anima e acompanha as atividades
              missionárias, garantindo a comunhão entre as obras, a unidade
              pastoral e a eficácia da animação missionária nas paróquias,
              vicariatos e comunidades.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
