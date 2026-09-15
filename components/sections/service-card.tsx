"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { hoverSpring } from "@/lib/motion";
import type { Service, ServicesContent } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
  index: number;
  labels: ServicesContent["labels"];
}

/*
 * Card-link verso la prenotazione del trattamento.
 * Su dispositivi con mouse dettagli e prezzo si rivelano in hover/focus, con il
 * riflesso "top coat"; su touch screen sono sempre visibili (variante `can-hover:`).
 */
export function ServiceCard({ service, index, labels }: ServiceCardProps) {
  return (
    <motion.a
      href={service.bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.99 }}
      transition={hoverSpring}
      className="group relative flex w-full flex-col rounded-3xl border border-border bg-background p-7 transition-[border-color,box-shadow] duration-700 ease-soft hover:border-accent/70 hover:shadow-[0_40px_80px_-48px_rgb(0_0_0/0.35)] focus-visible:border-accent/70 sm:p-8 can-hover:min-h-[29rem] xl:can-hover:min-h-[34rem]"
    >
      <span aria-hidden className="gloss-sweep" />

      <div className="flex items-start justify-between">
        <span className="font-serif text-sm text-muted italic">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex size-10 items-center justify-center rounded-full border border-border transition-[background-color,border-color,color,rotate] duration-700 ease-soft group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
          <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
        </span>
      </div>

      <div className="mt-14">
        <p className="text-[11px] tracking-[0.22em] text-accent-ink uppercase">{service.tagline}</p>
        <h3 className="mt-3 font-serif text-[2rem] leading-[1.05] text-balance">{service.name}</h3>
      </div>

      <div className="relative mt-auto pt-10">
        {/* Stato di riposo */}
        <div className="transition-[opacity,translate] duration-700 ease-soft can-hover:min-h-[15rem] can-hover:group-hover:-translate-y-3 can-hover:group-hover:opacity-0 can-hover:group-focus-visible:-translate-y-3 can-hover:group-focus-visible:opacity-0">
          <p className="leading-relaxed text-pretty text-muted">{service.description}</p>
          <p className="mt-6 flex items-center gap-2 text-xs tracking-[0.04em] text-muted">
            <Clock aria-hidden className="size-3.5" strokeWidth={1.5} />
            {service.duration}
          </p>
        </div>

        {/* Dettagli e prezzo rivelati */}
        <div className="mt-8 border-t border-border pt-6 transition-[opacity,translate] duration-700 ease-soft can-hover:absolute can-hover:inset-x-0 can-hover:bottom-0 can-hover:mt-0 can-hover:translate-y-4 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-focus-visible:translate-y-0 can-hover:group-focus-visible:opacity-100">
          <ul className="space-y-2.5 text-sm">
            {service.details.map((detail) => (
              <li key={detail} className="flex items-start gap-3">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {detail}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex items-end justify-between gap-4">
            <p>
              <span className="block text-[11px] tracking-[0.2em] text-muted uppercase">
                {labels.priceFrom}
              </span>
              <span className="font-serif text-4xl leading-none">{service.priceLabel}</span>
              {service.priceNote ? (
                <span className="ml-1.5 text-sm text-muted">{service.priceNote}</span>
              ) : null}
            </p>
            <span className="pb-1 text-sm font-medium underline decoration-accent decoration-2 underline-offset-[6px]">
              {labels.book}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
