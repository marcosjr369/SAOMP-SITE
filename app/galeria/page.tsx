"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "Todas",
  "Evangelização",
  "Ação Social",
  "Formação",
  "Juventude",
];

const images = Array.from({ length: 38 }, (_, i) => {
  const index = i + 1;

  const categoryMap = ["Evangelização", "Ação Social", "Formação", "Juventude"];

  const category = categoryMap[i % categoryMap.length];

  return {
    src: `/movimento${index === 1 ? "" : index}.jpeg`,
    title: `${category} ${index}`,
    category,
  };
});

export default function GaleriaPage() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [selectedImage, setSelectedImage] = useState<null | (typeof images)[0]>(
    null
  );

  const filteredImages =
    activeCategory === "Todas"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section className="bg-gray-50 min-h-screen">

      <div className="relative h-[50vh] flex items-center justify-center">
        <Image
          src="/movimento2.jpeg"
          alt="Galeria Missionária"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Galeria Missionária
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            Registos visuais das nossas acções, missões e momentos de fé e
            partilha.
          </p>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                activeCategory === cat
                  ? "bg-yellow-500 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative h-64">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-6 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-bold text-lg">{img.title}</h3>
                    <span className="text-xs text-gray-200">
                      {img.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition"
              >
                <X size={28} />
              </button>

              <div className="relative h-[70vh] rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-6 text-white">
                  <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                  <p className="text-sm text-gray-200">
                    {selectedImage.category}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
