"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  UserPlus,
  ArrowUpRight,
  Home,
  BookOpen,
  Images,
  FileText,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Início", href: "/", icon: Home },
  { label: "Sobre", href: "/sobre", icon: BookOpen },
  { label: "Galeria", href: "/galeria", icon: Images },
  { label: "Documentos", href: "/documentos", icon: FileText },
  { label: "Buscar Membro", href: "/buscar-membro", icon: Search },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled || open
            ? "bg-white/85 lg:bg-[#fbfbf8]/90 backdrop-blur-xl border-gray-200/80 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)] lg:shadow-none"
            : "bg-white/70 lg:bg-[#fbfbf8] backdrop-blur-md border-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-5 h-[76px] flex items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 lg:h-10 lg:w-10">
              <Image
                src="/logo.jpeg"
                alt="Logo do Movimento SAOMP"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-xl font-semibold leading-none tracking-tight text-gray-950">
                SAOMP
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 lg:hidden">
                Obras Missionárias · Luanda
              </span>
            </span>
          </Link>

          <div className="hidden h-full lg:flex items-center gap-6">
            <nav className="flex h-full items-center" aria-label="Principal">
              {navItems.map((item) => {
                const active = path === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex h-full items-center px-2.5 text-sm transition-colors duration-300",
                      active
                        ? "font-medium text-gray-950"
                        : "text-gray-500 hover:text-gray-950",
                    )}
                  >
                    <span className="relative flex items-center gap-1.5 py-1">
                      <Icon
                        size={15}
                        strokeWidth={1.6}
                        fill={active ? "#fef200" : "none"}
                        className={cn(
                          "shrink-0 transition-colors duration-300",
                          active
                            ? "text-gray-900"
                            : "text-gray-400 group-hover:text-gray-700",
                        )}
                      />
                      {item.label}

                      {/* Barra da página atual (desliza entre links) */}
                      {active ? (
                        <motion.span
                          layoutId="nav-bar"
                          className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-yellow-500"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          }}
                        />
                      ) : (
                        <span className="absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-gray-200 transition-transform duration-300 group-hover:scale-x-100" />
                      )}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/cadastro"
              aria-current={path === "/cadastro" ? "page" : undefined}
              className={cn(
                "group inline-flex h-10 items-center gap-2 rounded-full pl-1 pr-5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
                path === "/cadastro"
                  ? "bg-yellow-500 text-gray-950 ring-2 ring-gray-950"
                  : "bg-gray-950 text-white hover:bg-gray-800",
              )}
            >
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:scale-105",
                  path === "/cadastro"
                    ? "bg-gray-950 text-yellow-500"
                    : "bg-yellow-500 text-gray-950",
                )}
              >
                <UserPlus size={14} strokeWidth={1.8} />
              </span>
              Cadastro
            </Link>
          </div>

          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={cn(
              "lg:hidden grid place-items-center w-11 h-11 rounded-full transition-colors",
              open ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900",
            )}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-[76px] bg-gray-950/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden absolute top-[76px] left-0 w-full bg-white border-b border-gray-200 shadow-xl"
            >
              <nav className="px-5 py-5">
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item, i) => {
                    const active = path === item.href;
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * i }}
                        className={
                          i === navItems.length - 1 ? "col-span-2" : undefined
                        }
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex h-full flex-col gap-3 rounded-2xl p-4 font-medium transition-colors",
                            active
                              ? "bg-yellow-500 text-gray-950"
                              : "bg-gray-50 text-gray-800 hover:bg-gray-100",
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-9 w-9 place-items-center rounded-xl",
                              active
                                ? "bg-gray-950 text-yellow-500"
                                : "bg-white ring-1 ring-gray-200",
                            )}
                          >
                            <Icon size={17} />
                          </span>
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <Link
                  href="/cadastro"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex h-14 items-center justify-between rounded-full bg-gray-950 pl-6 pr-2 font-semibold text-white"
                >
                  Fazer cadastro
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow-500 text-gray-950">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
