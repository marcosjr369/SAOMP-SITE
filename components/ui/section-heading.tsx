import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <Eyebrow align={align}>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl md:text-[2.6rem] font-semibold leading-tight tracking-tight text-gray-950">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-600">
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function Eyebrow({
  children,
  align = "center",
  light = false,
}: {
  children: React.ReactNode;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        light ? "text-white/80" : "text-gray-500",
        align === "center" && "justify-center",
      )}
    >
      {children}
    </span>
  );
}
