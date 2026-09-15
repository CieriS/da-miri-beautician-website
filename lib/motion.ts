import type { Transition } from "framer-motion";

/** Curva "soft" condivisa con il CSS (`--ease-soft`). */
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

/** Spring per micro-interazioni di hover e tap: reattiva ma mai nervosa. */
export const hoverSpring: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 20,
  mass: 0.6,
};
