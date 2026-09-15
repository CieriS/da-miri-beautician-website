import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradedImage } from "@/components/ui/graded-image";
import { RichTitle } from "@/components/ui/rich-title";
import { Eyebrow } from "@/components/ui/section-heading";
import type { HeroContent } from "@/lib/types";
import { cssVars } from "@/lib/utils";

/*
 * L'ingresso della hero è in puro CSS (`.hero-rise`): parte al primo paint, senza
 * attendere JavaScript, così su mobile e con rete lenta il testo è subito leggibile.
 */
export function Hero({ content }: { content: HeroContent }) {
  const { eyebrow, title, subtitle, primaryCta, secondaryCta, facts, image, portrait } = content;

  return (
    <section
      id="top"
      className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 lg:flex lg:min-h-[100svh] lg:items-end lg:pt-32 lg:pb-14"
    >
      <Container className="grid grid-cols-1 gap-y-10 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
        <div className="lg:col-span-7 lg:row-start-1 lg:self-end">
          <div className="hero-rise" style={cssVars({ "--i": 0 })}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>

          <h1
            className="hero-rise mt-6 font-serif text-display-xl text-balance sm:mt-8"
            style={cssVars({ "--i": 1 })}
          >
            <RichTitle value={title} />
          </h1>

          <p
            className="hero-rise mt-5 max-w-[33rem] text-[1.0625rem] leading-relaxed text-pretty text-muted sm:mt-8 sm:text-lg"
            style={cssVars({ "--i": 2 })}
          >
            {subtitle}
          </p>

          <div
            data-booking-bar="after"
            className="hero-rise mt-8 flex flex-wrap items-center gap-2 sm:mt-10 sm:gap-3"
            style={cssVars({ "--i": 3 })}
          >
            <Button href={primaryCta.href} size="lg" className="flex-1 sm:flex-none" icon={<ArrowRight />}>
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} size="lg" variant="secondary">
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* Immagine LCP: nessuna animazione d'ingresso; su touch riceve un riflesso "top coat". */}
        <div className="hero-sheen relative mb-4 sm:mx-auto sm:w-full sm:max-w-md lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:mb-0 lg:max-w-none">
          <GradedImage
            image={image}
            eager
            interactive
            sizes="(min-width: 1400px) 540px, (min-width: 1024px) 40vw, (min-width: 640px) 448px, 100vw"
            className="aspect-[4/5] w-full rounded-t-full rounded-b-3xl lg:aspect-auto lg:h-[calc(100svh-10rem)] lg:max-h-[56rem] lg:min-h-[34rem]"
          />

          <figure
            className="hero-rise absolute -bottom-6 left-3 flex items-center gap-3 rounded-2xl border border-border bg-surface/90 p-2 pr-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.3)] backdrop-blur-md sm:left-6 sm:gap-4 sm:p-2.5 sm:pr-6 lg:bottom-10 lg:-left-16"
            style={cssVars({ "--i": 5 })}
          >
            <GradedImage image={portrait.image} sizes="64px" className="size-12 rounded-xl sm:size-14" />
            <figcaption>
              <p className="font-serif text-base leading-tight sm:text-lg">{portrait.name}</p>
              <p className="mt-0.5 text-xs text-muted">{portrait.caption}</p>
            </figcaption>
          </figure>
        </div>

        <dl
          className="hero-rise grid grid-cols-3 gap-3 border-t border-border pt-6 lg:col-span-7 lg:row-start-2 lg:mt-14 lg:max-w-xl"
          style={cssVars({ "--i": 4 })}
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[10px] tracking-[0.2em] text-muted uppercase sm:text-[11px]">
                {fact.label}
              </dt>
              <dd className="mt-2 font-serif text-[1.05rem] leading-tight sm:text-xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
