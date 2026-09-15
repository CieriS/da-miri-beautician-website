import { ArrowUpRight, Clock, Plus } from "lucide-react";
import { LineArt } from "@/components/illustrations/line-art";
import { ServiceCard } from "@/components/sections/service-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeUp, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Service, ServicesContent } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Services({ content }: { content: ServicesContent }) {
  const { intro, labels, footnote, advice, items } = content;

  return (
    <section id="servizi" className="border-y border-border bg-surface py-20 sm:py-28 lg:py-44">
      <Container>
        <SectionHeading intro={intro} ornament={<LineArt name="polish" className="w-10 lg:w-16" />} />

        {/* Mobile: elenco a fisarmonica, prezzi visibili senza aprire nulla. */}
        <Stagger as="ul" className="mt-10 border-t border-border md:hidden">
          {items.map((service, index) => (
            <StaggerItem as="li" key={service.id} className="border-b border-border">
              <ServiceAccordionItem service={service} index={index} labels={labels} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Da tablet in su: card con dettagli e prezzo rivelati in hover. */}
        <Stagger
          as="ul"
          className="mt-16 hidden gap-4 md:grid md:grid-cols-2 lg:mt-24 xl:grid-cols-4 xl:gap-5"
        >
          {items.map((service, index) => (
            <StaggerItem
              as="li"
              key={service.id}
              className={cn("flex", index % 2 === 1 && "xl:translate-y-12")}
            >
              <ServiceCard service={service} index={index} labels={labels} />
            </StaggerItem>
          ))}
        </Stagger>

        <FadeUp className="mt-10 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-14 xl:mt-28">
          <p className="max-w-xl text-sm leading-relaxed text-muted">{footnote}</p>
          <Button
            href={advice.href}
            external
            variant="secondary"
            size="md"
            className="w-full sm:w-auto"
            icon={<ArrowUpRight />}
          >
            {advice.label}
          </Button>
        </FadeUp>
      </Container>
    </section>
  );
}

interface ServiceAccordionItemProps {
  service: Service;
  index: number;
  labels: ServicesContent["labels"];
}

/*
 * `<details>` nativo: accessibile, usabile senza JavaScript e, grazie a `name`,
 * con un solo trattamento aperto alla volta. Il primo è aperto di default.
 */
function ServiceAccordionItem({ service, index, labels }: ServiceAccordionItemProps) {
  return (
    <details name="trattamenti" open={index === 0} className="service-accordion group">
      <summary className="flex min-h-22 cursor-pointer list-none items-center gap-3 py-5 transition-colors active:bg-foreground/[0.03] [&::-webkit-details-marker]:hidden">
        <span className="w-6 shrink-0 self-start pt-2 font-serif text-sm text-muted italic">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-[1.5rem] leading-[1.1] text-balance">{service.name}</span>
          <span className="mt-1.5 block text-[10px] tracking-[0.18em] text-accent-ink uppercase">
            {service.tagline}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="block text-[10px] tracking-[0.18em] text-muted uppercase">
            {labels.priceFromShort}
          </span>
          <span className="block font-serif text-xl leading-tight whitespace-nowrap">
            {service.priceLabel}
          </span>
          {service.priceNote ? (
            <span className="block text-[11px] text-muted">{service.priceNote}</span>
          ) : null}
        </span>
        <span
          aria-hidden
          className="ml-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border transition-[rotate,background-color,border-color,color] duration-500 ease-soft group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-accent-foreground"
        >
          <Plus className="size-4" strokeWidth={1.5} />
        </span>
      </summary>

      <div className="pb-7 pl-9">
        <p className="leading-relaxed text-pretty text-muted">{service.description}</p>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted">
          <Clock aria-hidden className="size-3.5" strokeWidth={1.5} />
          {service.duration}
        </p>
        <p className="mt-6 text-[10px] tracking-[0.2em] text-muted uppercase">{labels.includes}</p>
        <ul className="mt-3 space-y-2.5 text-[0.95rem]">
          {service.details.map((detail) => (
            <li key={detail} className="flex items-start gap-3">
              <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
              {detail}
            </li>
          ))}
        </ul>
        <Button
          href={service.bookingHref}
          external
          size="lg"
          className="mt-7 w-full"
          icon={<ArrowUpRight />}
        >
          {service.bookingLabel}
        </Button>
      </div>
    </details>
  );
}
