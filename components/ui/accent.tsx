import type { ReactNode } from "react";

/**
 * Enfasi nei titoli: corsivo serif con una "pennellata di smalto" sotto il testo,
 * ripetuta su ogni riga. Si stende quando il blocco si rivela (o all'ingresso della
 * hero); senza JavaScript è già visibile. Stili: `.brush-accent` in app/globals.css.
 */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="brush-accent text-accent-ink italic">{children}</em>;
}
