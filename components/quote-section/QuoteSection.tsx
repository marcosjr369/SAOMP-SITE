"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Cross, Globe, Quote } from "lucide-react";

const MissionQuoteSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 px-4 md:px-8 bg-linear-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-100 rounded-full opacity-20 -translate-x-16 -translate-y-8" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-100 rounded-full opacity-20 translate-x-20 translate-y-16" />

      <div className="max-w-6xl mx-auto">
        {/* Citação Principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="flex flex-col items-center text-center">
            <Quote className="w-12 h-12 text-yellow-400 mb-6 opacity-50" />

            <div className="relative max-w-3xl mx-auto">
              <div className="absolute -top-6 -left-6 text-6xl text-yellow-300 opacity-30">
                "
              </div>

              <motion.blockquote
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-gray-800 leading-relaxed mb-6 px-4"
              >
                Eu quisera percorrer a terra, pregar o teu nome e plantar no
                solo
                <span className="text-yellow-600 font-semibold">
                  {" "}
                  infiel a tua cruz gloriosa
                </span>
                .
              </motion.blockquote>

              <div className="absolute -bottom-6 -right-6 text-6xl text-yellow-300 opacity-30 rotate-180">
                "
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex flex-col items-center"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-yellow-500 rounded-full" />
                <h3 className="text-xl font-semibold text-gray-700">
                  Santa Teresinha do Menino Jesus
                </h3>
              </div>
              <p className="text-gray-500 font-medium bg-yellow-50 px-4 py-2 rounded-full">
                Padroeira das Missões
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionQuoteSection;
