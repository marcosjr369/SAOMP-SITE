"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { obras } from "@/lib/obras";

const ease = [0.22, 1, 0.36, 1] as const;

const panel: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease } },
};

type Ripple = { id: number; x: number; y: number };

export default function ObrasExplorer() {
  const params = useSearchParams();
  const initial = Math.max(
    0,
    obras.findIndex((o) => o.sigla === params.get("obra")),
  );
  const [active, setActive] = useState(initial);
  const [ripples, setRipples] = useState<Record<number, Ripple[]>>({});
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const rippleId = useRef(0);
  const obra = obras[active];
  const Icon = obra.icon;

  function select(i: number, e?: React.MouseEvent<HTMLButtonElement>) {
    setActive(i);
    if (!e) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = { id: ++rippleId.current, x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples((r) => ({ ...r, [i]: [...(r[i] ?? []), ripple] }));
    setTimeout(
      () => setRipples((r) => ({ ...r, [i]: (r[i] ?? []).filter((x) => x.id !== ripple.id) })),
      700,
    );
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const dir = ["ArrowDown", "ArrowRight"].includes(e.key)
      ? 1
      : ["ArrowUp", "ArrowLeft"].includes(e.key)
        ? -1
        : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + obras.length) % obras.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <div className="space-y-8">
      <div
        role="tablist"
        aria-label="Obras Missionárias"
        onKeyDown={onKeyDown}
        className="flex flex-wrap justify-center gap-3"
      >
        {obras.map((o, i) => {
          const selected = i === active;
          const TabIcon = o.icon;
          return (
            <motion.button
              key={o.sigla}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={(e) => select(i, e)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileTap={{ scale: 0.94 }}
              whileHover={selected ? undefined : { y: -3 }}
              className={cn(
                "relative isolate flex items-center gap-2.5 overflow-hidden rounded-full py-3 text-sm font-medium transition-colors duration-300",
                selected
                  ? "pl-2 pr-6 text-white shadow-[0_14px_30px_-14px_rgb(0_0_0/0.6)]"
                  : "bg-gray-100 px-6 text-gray-700 hover:bg-gray-200 hover:text-gray-950",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="obra-tab"
                  className="absolute inset-0 -z-10 rounded-full bg-gray-950"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}

              {/* Onda a partir do ponto do clique */}
              {(ripples[i] ?? []).map((r) => (
                <motion.span
                  key={r.id}
                  className="pointer-events-none absolute -z-[5] h-10 w-10 rounded-full bg-yellow-500/50"
                  style={{ left: r.x - 20, top: r.y - 20 }}
                  initial={{ scale: 0, opacity: 0.9 }}
                  animate={{ scale: 12, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              ))}

              <AnimatePresence initial={false}>
                {selected && (
                  <motion.span
                    initial={{ width: 0, opacity: 0, rotate: -90 }}
                    animate={{ width: 28, opacity: 1, rotate: 0 }}
                    exit={{ width: 0, opacity: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="grid h-7 shrink-0 place-items-center overflow-hidden rounded-full bg-yellow-500 text-gray-950"
                  >
                    <TabIcon className="h-3.5 w-3.5" />
                  </motion.span>
                )}
              </AnimatePresence>

              <span className="whitespace-nowrap">{o.nome}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="relative mx-auto min-h-[24rem] max-w-5xl overflow-hidden rounded-3xl border border-gray-200/80 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={obra.sigla}
            role="tabpanel"
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative h-full p-7 md:p-10"
          >
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease }}
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yellow-500/20 blur-3xl"
            />
            <motion.span
              aria-hidden
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
              className="pointer-events-none absolute right-6 top-6 select-none font-display text-7xl md:text-9xl font-semibold leading-none text-transparent [-webkit-text-stroke:2px_#fef200]"
            >
              {obra.sigla}
            </motion.span>

            <div className="relative">
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="grid h-14 w-14 place-items-center rounded-2xl bg-yellow-500"
              >
                <Icon className="h-6 w-6" />
              </motion.span>

              <motion.p
                variants={item}
                className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500"
              >
                {obra.pontificia}
              </motion.p>
              <motion.h3
                variants={item}
                className="mt-2 max-w-xl font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-gray-950"
              >
                {obra.nome}
              </motion.h3>

              <motion.span
                variants={item}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gray-950 px-3.5 py-1.5 text-xs font-semibold text-white"
              >
                <Users className="h-3.5 w-3.5 text-yellow-500" />
                {obra.publico}
              </motion.span>

              <motion.div variants={item} className="mt-6 h-1 w-16 origin-left rounded-full bg-yellow-500" />

              <motion.p
                variants={item}
                className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-gray-600"
              >
                {obra.description}
              </motion.p>

              <motion.div variants={item} className="mt-8 flex items-center gap-2">
                {obras.map((o, i) => (
                  <button
                    key={o.sigla}
                    onClick={() => setActive(i)}
                    aria-label={`Ver ${o.nome}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      i === active ? "w-8 bg-gray-950" : "w-2 bg-gray-200 hover:bg-gray-400",
                    )}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
