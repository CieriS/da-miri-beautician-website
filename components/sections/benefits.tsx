import { LineArt } from "@/components/illustrations/line-art";
import { Container } from "@/components/ui/container";
import { GradedImage } from "@/components/ui/graded-image";
import { FadeUp, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { BenefitsContent } from "@/lib/types";

export function Benefits({ content }: { content: BenefitsContent }) {
  const { intro, image, imageCaption, items } = content;

  return (
    <section id="studio" className="py-20 sm:py-28 lg:py-44">
      <Container className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
        {/* Su mobile l'immagine chiude la sezione: prima il perché, poi l'ambiente. */}
        <div className="order-last lg:order-none lg:col-span-5">
          <FadeUp className="lg:sticky lg:top-32">
            <GradedImage
              image={image}
              interactive
              sizes="(min-width: 1400px) 540px, (min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] rounded-3xl lg:aspect-square"
            />
            <p className="mt-4 flex items-baseline justify-between gap-4 text-xs text-muted sm:mt-5">
              <span className="tracking-[0.2em] uppercase">{imageCaption.label}</span>
              <span className="font-serif text-sm italic">{imageCaption.note}</span>
            </p>
          </FadeUp>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            intro={intro}
            layout="stacked"
            ornament={<LineArt name="file" className="w-32 lg:w-48" />}
          />

          <Stagger as="ul" className="mt-10 border-t border-border lg:mt-20">
            {items.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <StaggerItem
                  as="li"
                  key={benefit.id}
                  className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-border py-7 sm:grid-cols-[2.5rem_auto_1fr] sm:gap-x-8 sm:py-9"
                >
                  <span className="hidden pt-3.5 font-serif text-sm text-muted italic sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-full border border-border text-accent-ink transition-colors duration-700 ease-soft group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground sm:size-12">
                    <Icon aria-hidden className="size-5" strokeWidth={1.25} />
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.5rem] leading-tight sm:text-[1.75rem]">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] tracking-[0.2em] text-accent-ink uppercase">
                      {benefit.highlight}
                    </p>
                    <p className="mt-3 max-w-md leading-relaxed text-pretty text-muted sm:mt-4">
                      {benefit.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
