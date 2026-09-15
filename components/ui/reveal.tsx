"use client";

import type { ReactNode } from "react";

/*
 * Rivelazione allo scroll progressiva e resiliente.
 *
 * - Il markup SSR non nasconde nulla: senza JavaScript, con rete lenta o prima
 *   dell'idratazione tutti i contenuti sono visibili.
 * - Dopo l'idratazione vengono nascosti solo i blocchi ancora fuori schermo, che si
 *   rivelano all'ingresso nel viewport. Gli stili sono in app/globals.css
 *   (`[data-reveal]`, `[data-reveal-item]`, `.brush-accent`, `.draw-path`).
 */

function isInViewport(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/** Ref callback (React 19, con cleanup) che collega un contenitore alla rivelazione. */
export function attachReveal(node: HTMLElement | null): (() => void) | undefined {
  if (!node || node.dataset.reveal === "visible") return undefined;

  node.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach((item, index) => {
    item.style.setProperty("--reveal-i", String(index));
  });

  if (isInViewport(node) || !("IntersectionObserver" in window)) {
    node.dataset.reveal = "visible";
    return undefined;
  }

  node.dataset.reveal = "hidden";
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      node.dataset.reveal = "visible";
      observer.disconnect();
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  observer.observe(node);

  return () => observer.disconnect();
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
}

/** Contenitore i cui `<StaggerItem>` compaiono in sequenza. */
export function Stagger({ children, className, as = "div" }: StaggerProps) {
  return as === "ul" ? (
    <ul ref={attachReveal} className={className}>
      {children}
    </ul>
  ) : (
    <div ref={attachReveal} className={className}>
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  return as === "li" ? (
    <li data-reveal-item="" className={className}>
      {children}
    </li>
  ) : (
    <div data-reveal-item="" className={className}>
      {children}
    </div>
  );
}

/** Singolo blocco con fade-up autonomo. */
export function FadeUp({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div ref={attachReveal} data-reveal-self="" className={className}>
      {children}
    </div>
  );
}

/** Contenitore che attiva solo gli effetti interni (es. tracciati line-art), senza fade. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div ref={attachReveal} className={className}>
      {children}
    </div>
  );
}
