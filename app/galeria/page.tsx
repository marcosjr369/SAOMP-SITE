"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "@/components/ui/portal";
import Image from "next/image";
import { Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/ui/page-hero";
import Lightbox from "@/components/gallery/Lightbox";

const categories = [
  "Todas",
  "Evangelização",
  "Ação Social",
  "Formação",
  "Juventude",
];

const images = Array.from({ length: 25 }, (_, i) => {
  const index = i + 1;

  const categoryMap = ["Evangelização", "Ação Social", "Formação", "Juventude"];

  const category = categoryMap[i % categoryMap.length];

  return {
    src: `/movimento${index === 1 ? "" : index}.jpeg`,
    title: category,
    category,
  };
});

export default function GaleriaPage() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "Todas"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  return (
    <section className="bg-[#fbfbf8] min-h-screen">
      <PageHero
        image="/movimento2.jpeg"
        eyebrow="Galeria"
        title="Galeria Missionária"
        description="Registos visuais das nossas acções, missões e momentos de fé e partilha."
      />

      <div className="max-w-7xl mx-auto px-5 py-14 md:py-20">
        <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:justify-center md:px-0">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "relative isolate shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors",
                  active
                    ? "text-gray-950"
                    : "bg-white text-gray-600 ring-1 ring-gray-200 hover:text-gray-950",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-yellow-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-flow-dense auto-rows-[10rem] md:auto-rows-[15rem] gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.button
                layout
                key={img.src}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                className={cn(
                  "relative group overflow-hidden rounded-2xl bg-gray-200 text-left",
                  i % 7 === 0 && "row-span-2",
                )}
                onClick={() => setSelectedIndex(i)}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-900 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-block rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold">
                    {img.category}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Portal>
        <AnimatePresence>
          {selectedIndex !== null && (
            <Lightbox
              photos={filteredImages}
              index={selectedIndex}
              onChange={setSelectedIndex}
              onClose={closeLightbox}
            />
          )}
        </AnimatePresence>
      </Portal>
    </section>
  );
}
