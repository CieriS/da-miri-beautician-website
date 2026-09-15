"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { hoverSpring } from "@/lib/motion";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  /** Sollevamento in px al passaggio del mouse. */
  lift?: number;
}

/** Wrapper con micro-interazione di sollevamento (spring) per carte statiche. */
export function HoverCard({ children, className, lift = 6 }: HoverCardProps) {
  return (
    <motion.div whileHover={{ y: -lift }} transition={hoverSpring} className={className}>
      {children}
    </motion.div>
  );
}
