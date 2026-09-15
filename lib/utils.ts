import type { CSSProperties } from "react";

type ClassValue = string | false | null | undefined;

/** Unisce classi condizionali ignorando i valori falsy. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Custom properties CSS tipizzate da passare a `style` (es. indici di stagger). */
export function cssVars(vars: Record<`--${string}`, string | number>): CSSProperties {
  return vars as CSSProperties;
}
