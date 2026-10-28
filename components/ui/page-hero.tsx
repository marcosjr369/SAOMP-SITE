"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/section-heading";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  /** Enquadramento da foto (CSS object-position), ex.: "center 30%" */
  imagePosition?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imagePosition = "center",
}: PageHeroProps) {
  if (!image) {
    return (
      <div className="relative w-full overflow-hidden border-b border-gray-200/70 bg-white pt-[76px]">
        <div className="bg-dots absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-yellow-500/30 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-4xl px-5 py-14 md:py-20 text-center"
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gray-950">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-600">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full min-h-[420px] md:min-h-[480px] items-end overflow-hidden pt-[76px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: imagePosition }}
        className="object-cover animate-ken-burns"
      />
      <div className="absolute inset-0 bg-linear-to-t from-gray-950/90 via-gray-950/55 to-gray-950/25" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-7xl px-5 pb-14 md:pb-20"
      >
        <Eyebrow align="left" light>
          {eyebrow}
        </Eyebrow>
        <h1 className="max-w-3xl font-display text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-white/80">
            {description}
          </p>
        )}
        <div className="mt-8 h-1 w-20 rounded-full bg-yellow-500" />
      </motion.div>
    </div>
  );
}
