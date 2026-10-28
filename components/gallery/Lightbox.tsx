"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Photo = { src: string; title: string; category: string };

type LightboxProps = {
  photos: Photo[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

const SWIPE = 80;

export default function Lightbox({ photos, index, onChange, onClose }: LightboxProps) {
  const [dir, setDir] = useState<1 | -1>(1);
  const thumbsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const photo = photos[index];

  const go = (target: number) => {
    const next = (target + photos.length) % photos.length;
    setDir(target > index ? 1 : -1);
    onChange(next);
  };

  // Teclado: ← → para navegar, Esc para fechar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setDir(1);
        onChange((index + 1) % photos.length);
      }
      if (e.key === "ArrowLeft") {
        setDir(-1);
        onChange((index - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, photos.length, onChange, onClose]);

  // Mantém a miniatura ativa visível
  useEffect(() => {
    thumbsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE) go(index + 1);
    else if (info.offset.x > SWIPE) go(index - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-60 flex flex-col overflow-hidden bg-gray-950 text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`Fotografia: ${photo.category}`}
    >
      {/* Fundo ambiente com a própria foto desfocada */}
      <AnimatePresence initial={false}>
        <motion.div
          key={photo.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute inset-0"
        >
          <Image src={photo.src} alt="" fill sizes="10vw" className="scale-125 object-cover blur-3xl" />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-gray-950/70 via-gray-950/40 to-gray-950/90" />

      {/* Barra de topo */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={photo.category}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="rounded-full bg-yellow-500 px-3.5 py-1.5 text-sm font-semibold text-gray-950"
            >
              {photo.category}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm tabular-nums text-white/60">
            <span className="font-semibold text-white">{index + 1}</span> / {photos.length}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Fechar"
          className="group grid h-11 w-11 place-items-center rounded-full bg-white text-gray-950 shadow-lg transition-colors hover:bg-yellow-500"
        >
          <X size={20} className="transition-transform duration-300 group-hover:rotate-90" />
        </button>
      </div>

      {/* Foto */}
      <div
        className="relative z-0 flex min-h-0 flex-1 items-center justify-center px-4 md:px-24"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={photo.src}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d * 120, opacity: 0, scale: 0.96 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d: number) => ({ x: d * -120, opacity: 0, scale: 0.96 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={onDragEnd}
            className="relative h-full w-full max-w-6xl cursor-grab active:cursor-grabbing"
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              draggable={false}
              className="select-none object-contain drop-shadow-[0_30px_60px_rgb(0_0_0/0.5)]"
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => go(index - 1)}
          aria-label="Foto anterior"
          className="group absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-950 shadow-lg transition-all hover:-translate-x-0.5 hover:bg-yellow-500 sm:grid md:left-8"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => go(index + 1)}
          aria-label="Foto seguinte"
          className="group absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-950 shadow-lg transition-all hover:translate-x-0.5 hover:bg-yellow-500 sm:grid md:right-8"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Miniaturas */}
      <div className="relative z-10 py-4 md:py-5">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-[50vw] scroll-px-[50vw]">
          {photos.map((p, i) => {
            const active = i === index;
            return (
              <button
                key={p.src}
                ref={(el) => {
                  thumbsRef.current[i] = el;
                }}
                onClick={() => go(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={active}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-xl transition-all duration-300 md:h-16 md:w-24",
                  active
                    ? "scale-105 ring-2 ring-yellow-500 ring-offset-2 ring-offset-gray-950"
                    : "opacity-40 hover:opacity-90",
                )}
              >
                <Image src={p.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-white/40 sm:hidden">
          Deslize para o lado para mudar de foto
        </p>
      </div>
    </motion.div>
  );
}
