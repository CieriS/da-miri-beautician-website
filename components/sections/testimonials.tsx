import { Quote, Star } from "lucide-react";
import { CarouselTrack } from "@/components/ui/carousel-track";
import { Container } from "@/components/ui/container";
import { HoverCard } from "@/components/ui/hover-card";
import { StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { TestimonialsContent } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Testimonials({ content }: { content: TestimonialsContent }) {
  const { intro, carouselLabel, items } = content;

  return (
    <section id="recensioni" className="border-y border-border bg-surface py-20 sm:py-28 lg:py-44">
      {/* grid-cols-1 = minmax(0, 1fr): impedisce al carosello di allargare la colonna su mobile. */}
      <Container className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
        <div className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading intro={intro} layout="stacked" />
          </div>
        </div>

        <div className="min-w-0 lg:col-span-8">
          {/* Mobile: carosello con snap. Da md: griglia sfalsata. */}
          <CarouselTrack
            label={carouselLabel}
            slideLabels={items.map((item) => item.slideLabel)}
            className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-16 lg:grid-cols-1 lg:gap-5 lg:pb-0 xl:grid-cols-2 xl:pb-16"
          >
            {items.map((testimonial, index) => (
              <StaggerItem
                as="li"
                key={testimonial.id}
                className={cn(
                  "flex w-[86%] shrink-0 snap-start sm:w-[60%] md:w-auto",
                  index % 2 === 1 && "md:translate-y-16 lg:translate-y-0 xl:translate-y-16",
                )}
              >
                <HoverCard className="flex w-full">
                  <figure className="flex w-full flex-col rounded-3xl border border-border bg-background p-6 transition-colors duration-700 ease-soft hover:border-accent/60 sm:p-9">
                    <div className="flex items-center justify-between">
                      <div role="img" aria-label={testimonial.ratingLabel} className="flex gap-1 text-accent">
                        {Array.from({ length: testimonial.rating }, (_, star) => (
                          <Star key={star} aria-hidden className="size-3.5 fill-current" strokeWidth={0} />
                        ))}
                      </div>
                      <Quote aria-hidden className="size-6 text-accent" strokeWidth={1} />
                    </div>

                    <blockquote className="mt-6 font-serif text-[1.2rem] leading-snug text-pretty sm:mt-8 sm:text-[1.3rem] xl:text-[1.4rem]">
                      “{testimonial.quote}”
                    </blockquote>

                    <figcaption className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-8 sm:pt-10">
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="mt-0.5 text-sm text-muted">{testimonial.treatment}</p>
                      </div>
                      <span className="rounded-full border border-border px-3 py-1.5 text-[10px] tracking-[0.18em] text-accent-ink uppercase">
                        {testimonial.highlight}
                      </span>
                    </figcaption>
                  </figure>
                </HoverCard>
              </StaggerItem>
            ))}
          </CarouselTrack>
        </div>
      </Container>
    </section>
  );
}
