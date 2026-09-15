import { ArrowUp, Clock, MapPin, MessageCircle, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HoverCard } from "@/components/ui/hover-card";
import { Logo } from "@/components/ui/logo";
import { FadeUp, Stagger, StaggerItem } from "@/components/ui/reveal";
import { RichTitle } from "@/components/ui/rich-title";
import { Eyebrow } from "@/components/ui/section-heading";
import type { ContactContent } from "@/lib/types";

export function Contact({ content }: { content: ContactContent }) {
  const { intro, booking, hours, address, quickContact, map, footer } = content;

  return (
    <footer
      id="contatti"
      data-booking-bar="hide"
      className="relative overflow-hidden pt-20 sm:pt-28 lg:pt-44"
    >
      <Container>
        {/* CTA finale */}
        <Stagger className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-8">
            <StaggerItem>
              <Eyebrow index={intro.index}>{intro.eyebrow}</Eyebrow>
            </StaggerItem>
            <StaggerItem>
              <h2 className="mt-6 font-serif text-display-lg text-balance sm:mt-8">
                <RichTitle value={intro.title} />
              </h2>
            </StaggerItem>
          </div>
          <StaggerItem className="flex flex-col items-stretch gap-6 sm:items-start lg:col-span-4 lg:pb-3">
            {intro.description ? (
              <p className="max-w-sm leading-relaxed text-pretty text-muted">{intro.description}</p>
            ) : null}
            <Button
              href={booking.href}
              external
              glitter
              variant="accent"
              size="lg"
              className="w-full sm:w-auto"
              icon={<MessageCircle />}
            >
              {booking.label}
            </Button>
          </StaggerItem>
        </Stagger>

        {/* Informazioni + mappa (su mobile la mappa, decorativa, va in fondo) */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:mt-28 lg:grid-cols-12 lg:gap-5">
          <FadeUp className="order-last lg:order-none lg:col-span-7">
            <MapMockup {...map} />
          </FadeUp>

          <Stagger className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
            <StaggerItem className="flex">
              <InfoCard icon={Clock} title={hours.title}>
                <p className="font-serif text-[1.4rem] leading-tight sm:text-2xl">{hours.headline}</p>
                <dl className="mt-5 space-y-2.5 text-sm">
                  {hours.slots.map((slot) => (
                    <div key={slot.days} className="flex justify-between gap-6">
                      <dt className="text-muted">{slot.days}</dt>
                      <dd className="tabular-nums">{slot.time}</dd>
                    </div>
                  ))}
                </dl>
              </InfoCard>
            </StaggerItem>

            <StaggerItem className="flex">
              <InfoCard icon={MapPin} title={address.title}>
                <p className="font-serif text-[1.4rem] leading-tight sm:text-2xl">{address.headline}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{address.note}</p>
              </InfoCard>
            </StaggerItem>

            <StaggerItem className="flex sm:col-span-2 lg:col-span-1">
              <InfoCard icon={MessageCircle} title={quickContact.title}>
                <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <p className="text-sm leading-relaxed text-muted sm:max-w-[16rem]">{quickContact.text}</p>
                  <Button
                    href={quickContact.cta.href}
                    external
                    glitter
                    size="md"
                    className="w-full sm:w-auto"
                    icon={<MessageCircle />}
                  >
                    {quickContact.cta.label}
                  </Button>
                </div>
              </InfoCard>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Barra finale */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-border pt-10 pb-[max(env(safe-area-inset-bottom),2.5rem)] text-center text-sm text-muted md:mt-24 md:flex-row md:justify-between md:text-left lg:mt-32">
          <Logo {...footer.logo} className="text-foreground" />
          <p className="text-pretty">{footer.copyright}</p>
          <nav aria-label={footer.navLabel} className="flex items-center gap-2">
            {footer.instagram ? (
              <a
                href={footer.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center px-3 transition-colors hover:text-foreground"
              >
                {footer.instagram.label}
              </a>
            ) : null}
            <a
              href="#top"
              className="group inline-flex min-h-11 items-center gap-2 px-3 transition-colors hover:text-foreground"
            >
              {footer.backToTop}
              <ArrowUp
                aria-hidden
                className="size-3.5 transition-transform duration-500 ease-soft group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          </nav>
        </div>
      </Container>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.2em] text-center font-serif text-[23vw] leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-foreground/[0.045] select-none"
      >
        {footer.logo.text} <span className="italic">{footer.logo.accent}</span>
      </p>
    </footer>
  );
}

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

function InfoCard({ icon: Icon, title, children }: InfoCardProps) {
  return (
    <HoverCard lift={4} className="flex w-full">
      <div className="w-full rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <p className="mb-4 flex items-center gap-2.5 text-[11px] tracking-[0.22em] text-accent-ink uppercase sm:mb-5">
          <Icon aria-hidden className="size-4" strokeWidth={1.5} />
          {title}
        </p>
        {children}
      </div>
    </HoverCard>
  );
}

function MapMockup({ ariaLabel, title, caption, badge }: ContactContent["map"]) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="relative h-full min-h-[15rem] overflow-hidden rounded-3xl border border-border bg-surface sm:min-h-[20rem] lg:min-h-[24rem]"
    >
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:3rem_3rem]"
      />
      <div aria-hidden className="absolute top-[36%] -left-12 h-3.5 w-[150%] -rotate-[9deg] bg-foreground/[0.06]" />
      <div aria-hidden className="absolute top-[74%] -left-12 h-2 w-[150%] rotate-[5deg] bg-foreground/[0.05]" />
      <div aria-hidden className="absolute -top-12 left-[62%] h-[150%] w-4 rotate-[16deg] bg-foreground/[0.06]" />
      <div aria-hidden className="absolute -top-12 left-[22%] h-[150%] w-2 -rotate-[6deg] bg-foreground/[0.04]" />

      <div aria-hidden className="absolute top-[42%] left-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 sm:size-64" />
      <div aria-hidden className="absolute top-[42%] left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 sm:size-32" />

      <div aria-hidden className="absolute top-[42%] left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="flex size-11 items-center justify-center rounded-full bg-foreground text-background shadow-[0_20px_40px_-12px_rgb(0_0_0/0.45)] sm:size-12">
          <MapPin className="size-5" strokeWidth={1.5} />
        </span>
        <span className="h-4 w-px bg-foreground" />
      </div>

      <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-background/85 px-4 py-3 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:px-5 sm:py-4">
        <div>
          <p className="font-serif text-base leading-tight sm:text-lg">{title}</p>
          <p className="mt-0.5 text-xs text-muted">{caption}</p>
        </div>
        <span className="text-[10px] tracking-[0.22em] text-accent-ink uppercase">{badge}</span>
      </div>
    </div>
  );
}
