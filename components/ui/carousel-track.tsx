"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { attachReveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface CarouselTrackProps {
  children: ReactNode;
  /** Etichetta accessibile della lista scorrevole. */
  label: string;
  /** Un'etichetta per indicatore, nell'ordine degli elementi. */
  slideLabels: string[];
  /** Classi della lista: definiscono il carosello su mobile e la griglia da `md` in su. */
  className?: string;
}

/**
 * Lista che su mobile scorre orizzontalmente con snap, con indicatori di posizione
 * toccabili; da `md` in su il chiamante la trasforma in griglia e gli indicatori spariscono.
 * Senza JavaScript resta uno scroll orizzontale nativo pienamente usabile.
 */
export function CarouselTrack({ children, label, slideLabels, className }: CarouselTrackProps) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const frameRef = useRef(0);
  const [active, setActive] = useState(0);

  const setTrack = useCallback((node: HTMLUListElement | null) => {
    trackRef.current = node;
    return attachReveal(node);
  }, []);

  const handleScroll = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      const [first, second] = track ? Array.from(track.children as HTMLCollectionOf<HTMLElement>) : [];
      if (!track || !first || !second) return;

      const step = second.offsetLeft - first.offsetLeft;
      if (step <= 0) return;

      const index = Math.round(track.scrollLeft / step);
      setActive(Math.min(Math.max(index, 0), track.children.length - 1));
    });
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    const items = track ? (track.children as HTMLCollectionOf<HTMLElement>) : null;
    const first = items?.[0];
    const target = items?.[index];
    if (!track || !first || !target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <ul
        ref={setTrack}
        onScroll={handleScroll}
        aria-label={label}
        tabIndex={0}
        className={cn(
          "carousel-track [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className,
        )}
      >
        {children}
      </ul>

      <div className="mt-5 flex justify-center md:hidden">
        {slideLabels.map((slideLabel, index) => (
          <button
            key={slideLabel}
            type="button"
            onClick={() => goTo(index)}
            aria-label={slideLabel}
            aria-current={index === active ? "true" : undefined}
            className="flex h-8 items-center px-1.5"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-soft",
                index === active ? "w-6 bg-accent" : "w-1.5 bg-foreground/20",
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}
