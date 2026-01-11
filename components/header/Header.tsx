"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, UserPlus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre o Movimento", href: "/sobre" },
  { label: "Galeria", href: "/galeria" },
  { label: "Documentos", href: "/documentos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div
        className={cn(
          "bg-white/90 backdrop-blur-md border-b transition-all",
          scrolled && "shadow-md"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/logo.jpeg"
                alt="Logo do Movimento SAOMP"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-bold text-gray-900">SAOMP</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-gray-700 font-medium transition
                hover:text-yellow-600 after:absolute after:left-0 after:-bottom-1
                after:h-0.5 after:w-0 after:bg-yellow-500 after:transition-all
                hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/cadastro"
              className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-xl flex items-center gap-2 shadow-sm transition"
            >
              <UserPlus size={18} />
              Cadastro
            </Link>

            <Link
              href="/buscar-membro"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-5 py-2 rounded-xl flex items-center gap-2 transition"
            >
              <Search size={18} />
              Buscar Membro
            </Link>
          </nav>

          <button
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="lg:hidden text-gray-800"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 lg:hidden"
        />
      )}

      <div
        className={cn(
          "lg:hidden fixed top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b transition-all duration-300",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <nav className="px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-gray-800 font-medium text-lg py-3 px-4 rounded-xl
              hover:bg-yellow-50 hover:text-yellow-600 transition"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/cadastro"
            onClick={() => setOpen(false)}
            className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <UserPlus size={18} />
            Cadastro
          </Link>

          <Link
            href="/buscar-membro"
            onClick={() => setOpen(false)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <Search size={18} />
            Buscar Membro
          </Link>
        </nav>
      </div>
    </header>
  );
}
