"use client";

import { useEffect, useState } from "react";
import { Users, Church } from "lucide-react";
import Link from "next/link";

const images = Array.from({ length: 38 }, (_, i) => {
  const index = i + 1;
  return `/movimento${index === 1 ? "" : index}.jpeg`;
});

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-32 md:py-40 px-4 overflow-hidden mt-12">

      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url('${image}')` }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/40" />


      <div
        className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="text-center text-shadow mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6 text-white drop-shadow-sm">
            Ide e fazei{" "}
            <span className="text-yellow-500 drop-shadow-sm">
              discípulos
            </span>{" "}
            de todas as nações
          </h1>

          <p className="text-xl sm:text-2xl text-white font-light mb-4 drop-shadow-sm">
            A Igreja é{" "}
            <span className="font-semibold text-yellow-500">
              missionária
            </span>{" "}
            por natureza
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/cadastro" className="w-full sm:w-auto">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-4 rounded-xl shadow-lg flex items-center justify-center w-full sm:w-auto transition">
              <Users className="w-5 h-5 mr-2" />
              Juntar-se à Missão
            </button>
          </Link>

          <Link href="/sobre" className="w-full sm:w-auto">
            <button className="border-2 border-gray-500 text-gray-600 hover:bg-gray-700 hover:text-white px-6 py-4 rounded-xl shadow-lg bg-white/70 backdrop-blur-sm flex items-center justify-center w-full sm:w-auto transition">
              <Church className="w-5 h-5 mr-2" />
              Conhecer a Igreja
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
