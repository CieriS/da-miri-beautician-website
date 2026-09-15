import Image from "next/image";
import type { ImageAsset } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GradedImageProps {
  image: ImageAsset;
  /** Attributo `sizes` di next/image: descrive la larghezza reale a ogni breakpoint. */
  sizes: string;
  /** Classi del wrapper: qui si definiscono aspect ratio e raggi. */
  className?: string;
  imageClassName?: string;
  /** Per l'immagine LCP (hero): caricamento immediato ad alta priorità. */
  eager?: boolean;
  /** In hover: rimuove il color grading, zoom lieve e riflesso "top coat". */
  interactive?: boolean;
}

/**
 * Immagine con color grading coerente col tema (vedi `.graded-image`,
 * `.graded-overlay` e `.gloss-sweep` in `app/globals.css`).
 */
export function GradedImage({
  image,
  sizes,
  className,
  imageClassName,
  eager = false,
  interactive = false,
}: GradedImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface", interactive && "group", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        data-interactive={interactive}
        className={cn("graded-image object-cover", imageClassName)}
        style={image.position ? { objectPosition: image.position } : undefined}
      />
      <span
        aria-hidden
        data-interactive={interactive}
        className="graded-overlay pointer-events-none absolute inset-0"
      />
      {interactive ? <span aria-hidden className="gloss-sweep" /> : null}
    </div>
  );
}
