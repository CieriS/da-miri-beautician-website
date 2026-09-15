import { ArrowUpRight } from "lucide-react";
import { LineArt } from "@/components/illustrations/line-art";
import { CarouselTrack } from "@/components/ui/carousel-track";
import { Container } from "@/components/ui/container";
import { GradedImage } from "@/components/ui/graded-image";
import { StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { GalleryContent } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Gallery({ content }: { content: GalleryContent }) {
  const { intro, carouselLabel, items } = content;

  return (
    <section id="lavori" className="py-20 sm:py-28 lg:py-44">
      <Container>
        <SectionHeading intro={intro} ornament={<LineArt name="nails" className="w-24 lg:w-36" />} />

        {/* Mobile: carosello a scorrimento con snap. Da md: griglia asimmetrica 3:4. */}
        <CarouselTrack
          label={carouselLabel}
          slideLabels={items.map((item) => item.slideLabel)}
          className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-16 md:grid md:snap-none md:grid-cols-2 md:gap-x-5 md:gap-y-10 md:overflow-visible md:px-0 md:pb-10 lg:mt-24 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-14 lg:pb-28"
        >
          {items.map((item, index) => (
            <StaggerItem
              as="li"
              key={item.id}
              className={cn(
                "w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto",
                index % 2 === 1 && "md:max-lg:translate-y-10",
                index % 3 === 1 && "lg:translate-y-28",
              )}
            >
              <figure className="group">
                <div className="relative">
                  <GradedImage
                    image={item.image}
                    interactive
                    sizes="(min-width: 1400px) 420px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 78vw"
                    className="aspect-[3/4] rounded-2xl sm:rounded-3xl"
                  />
                  <a
                    href={item.look.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.look.ariaLabel}
                    className="absolute right-3 bottom-3 inline-flex size-11 items-center justify-center gap-2 rounded-full bg-background/90 text-xs font-medium text-foreground backdrop-blur-md transition-[opacity,translate,scale] duration-700 ease-soft active:scale-95 sm:right-4 sm:bottom-4 sm:size-auto sm:px-4 sm:py-2.5 can-hover:translate-y-2 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:focus-visible:translate-y-0 can-hover:focus-visible:opacity-100"
                  >
                    <span className="hidden sm:inline">{item.look.label}</span>
                    <ArrowUpRight aria-hidden className="size-4 sm:size-3.5" strokeWidth={1.75} />
                  </a>
                </div>
                <figcaption className="mt-3 flex flex-col gap-1 sm:mt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <span className="font-serif text-lg leading-tight sm:text-xl">{item.title}</span>
                  <span className="text-[10px] tracking-[0.2em] text-muted uppercase sm:text-[11px]">
                    {item.technique}
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </CarouselTrack>
      </Container>
    </section>
  );
}
