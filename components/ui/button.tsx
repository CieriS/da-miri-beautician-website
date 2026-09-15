"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Glitter } from "@/components/ui/glitter";
import { hoverSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "accent" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icona decorativa (es. `<ArrowRight />`): trasla leggermente in hover. */
  icon?: ReactNode;
  /** Apre il link in una nuova scheda (WhatsApp, Maps, social). */
  external?: boolean;
  /** Glitter sulle CTA di prenotazione: `true` in hover, `"ambient"` sempre attivo (mobile). */
  glitter?: boolean | "ambient";
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-background hover:bg-foreground/85",
  accent: "bg-accent text-accent-foreground hover:bg-accent/85",
  secondary:
    "border border-foreground/20 bg-transparent text-foreground hover:border-foreground/70 hover:bg-foreground/[0.03]",
};

/* Altezze minime da 40px (desktop) e 48px (mobile) per target di tocco comodi. */
const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 px-4 text-[13px]",
  md: "h-12 gap-2.5 px-6 text-sm",
  lg: "h-12 gap-2 px-5 text-sm sm:h-14 sm:gap-3 sm:px-8 sm:text-[15px]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  external = false,
  glitter = false,
  className,
  ariaLabel,
  onClick,
}: ButtonProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={hoverSpring}
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center rounded-full font-medium tracking-[0.01em] whitespace-nowrap transition-colors duration-500 ease-soft",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {glitter ? <Glitter variant={glitter === "ambient" ? "ambient" : "hover"} /> : null}
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden
          className="inline-flex transition-transform duration-500 ease-soft group-hover:translate-x-1 [&_svg]:size-4 [&_svg]:stroke-[1.75]"
        >
          {icon}
        </span>
      ) : null}
    </motion.a>
  );
}
