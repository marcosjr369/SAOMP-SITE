"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Images,
  Search,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

type QuickLink = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  variant: "photo" | "yellow" | "dark" | "light";
};

const links: QuickLink[] = [
  {
    href: "/galeria",
    title: "Galeria",
    description: "Reviva as missões, encontros e celebrações do movimento.",
    icon: Images,
    variant: "photo",
    className: "sm:col-span-2 lg:row-span-2",
  },
  {
    href: "/sobre",
    title: "Sobre o Movimento",
    description: "História, padroeiros, fundadores, orações e hinos.",
    icon: BookOpen,
    variant: "dark",
    className: "sm:col-span-2",
  },
  {
    href: "/documentos",
    title: "Documentos",
    description: "Planos, regulamentos e rituais.",
    icon: FileText,
    variant: "light",
  },
  {
    href: "/buscar-membro",
    title: "Buscar Membro",
    description: "Encontre membros por obra ou tipo.",
    icon: Search,
    variant: "light",
  },
];

const variants = {
  photo: "text-white",
  dark: "bg-gray-950 text-white",
  yellow: "bg-yellow-500 text-gray-950",
  light: "bg-white text-gray-950 border border-gray-200/80 hover:border-yellow-500",
};

export default function QuickLinksSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Acesso rápido"
            title="Tudo o que procura, num só lugar"
          />
          <Link
            href="/cadastro"
            className="group inline-flex h-14 w-fit shrink-0 items-center gap-4 rounded-full bg-yellow-500 pl-2 pr-7 font-semibold text-gray-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gray-950 text-yellow-500 transition-transform duration-300 group-hover:scale-110">
              <UserPlus className="h-[18px] w-[18px]" />
            </span>
            Fazer cadastro
          </Link>
        </div>

        <div className="mt-12 grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={link.className}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-25px_rgb(0_0_0/0.35)]",
                    variants[link.variant],
                  )}
                >
                  {link.variant === "photo" && (
                    <>
                      <Image
                        src="/movimento5.jpeg"
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-gray-950/90 via-gray-950/30 to-transparent" />
                    </>
                  )}
                  {link.variant === "dark" && (
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-500/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
                  )}

                  <div className="relative flex items-start justify-between">
                    <span
                      className={cn(
                        "grid h-12 w-12 place-items-center rounded-2xl",
                        link.variant === "light"
                          ? "bg-yellow-500/20 ring-1 ring-yellow-500/50 transition-colors group-hover:bg-yellow-500"
                          : "bg-yellow-500 text-gray-950",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={cn(
                        "grid h-10 w-10 place-items-center rounded-full transition-all duration-300 group-hover:rotate-45",
                        link.variant === "light"
                          ? "bg-gray-100 group-hover:bg-gray-950 group-hover:text-white"
                          : "bg-white text-gray-950",
                      )}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="relative">
                    <h3 className="font-display text-2xl font-semibold">
                      {link.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1.5 text-sm leading-relaxed",
                        link.variant === "light" ? "text-gray-600" : "text-white/70",
                      )}
                    >
                      {link.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
