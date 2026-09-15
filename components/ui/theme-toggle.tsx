"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { hoverSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  label: string;
  className?: string;
}

/*
 * Le icone sono entrambe nel DOM e commutano via variante CSS `dark:`:
 * nessun mismatch di idratazione e nessun flash, anche prima del mount.
 */
export function ThemeToggle({ label, className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      whileHover={{ rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      transition={hoverSpring}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-500 hover:border-foreground/40 active:bg-foreground/5 md:size-10",
        className,
      )}
    >
      <Sun
        aria-hidden
        strokeWidth={1.5}
        className="size-[1.05rem] transition-[opacity,scale,rotate] duration-500 ease-soft dark:scale-50 dark:-rotate-90 dark:opacity-0"
      />
      <Moon
        aria-hidden
        strokeWidth={1.5}
        className="absolute size-[1.05rem] scale-50 rotate-90 opacity-0 transition-[opacity,scale,rotate] duration-500 ease-soft dark:scale-100 dark:rotate-0 dark:opacity-100"
      />
    </motion.button>
  );
}
