import type { ReactNode } from "react";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { RichTitle } from "@/components/ui/rich-title";
import type { SectionIntro } from "@/lib/types";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  index?: string;
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ index, children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-accent-ink uppercase",
        className,
      )}
    >
      {index ? (
        <span className="font-serif text-sm tracking-normal normal-case italic">({index})</span>
      ) : null}
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}

interface SectionHeadingProps {
  intro: SectionIntro;
  /** `split`: titolo a sinistra e descrizione allineata in basso a destra. */
  layout?: "split" | "stacked";
  /** Illustrazione decorativa (es. `<LineArt />`): sopra il titolo su mobile, sopra l'angolo destro su desktop. */
  ornament?: ReactNode;
  className?: string;
}

export function SectionHeading({ intro, layout = "split", ornament, className }: SectionHeadingProps) {
  const isSplit = layout === "split";

  return (
    <div className={cn("relative", className)}>
      {ornament ? (
        <div className="mb-6 text-accent-ink lg:absolute lg:-top-5 lg:right-0 lg:mb-0 lg:-translate-y-full">
          {ornament}
        </div>
      ) : null}

      <Stagger className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8">
        <StaggerItem className="lg:col-span-12">
          <Eyebrow index={intro.index}>{intro.eyebrow}</Eyebrow>
        </StaggerItem>
        <StaggerItem className={isSplit ? "lg:col-span-7" : "lg:col-span-12"}>
          <h2 className="font-serif text-display-md text-balance">
            <RichTitle value={intro.title} />
          </h2>
        </StaggerItem>
        {intro.description ? (
          <StaggerItem
            className={isSplit ? "lg:col-span-4 lg:col-start-9 lg:self-end" : "lg:col-span-11"}
          >
            <p className="text-base leading-relaxed text-pretty text-muted lg:text-[1.0625rem]">
              {intro.description}
            </p>
          </StaggerItem>
        ) : null}
      </Stagger>
    </div>
  );
}
