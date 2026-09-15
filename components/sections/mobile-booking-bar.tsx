"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LinkItem } from "@/lib/types";
import { cn } from "@/lib/utils";

/*
 * Barra di prenotazione fissa per smartphone, nella zona del pollice.
 * Compare dopo aver superato le CTA della hero (`[data-booking-bar="after"]`) e si
 * ritira quando è visibile la sezione contatti (`[data-booking-bar="hide"]`), che ha
 * già la sua CTA. Rispetta l'area sicura in basso dell'iPhone.
 */
export function MobileBookingBar({ booking }: { booking: LinkItem }) {
  const [pastHero, setPastHero] = useState(false);
  const [nearContact, setNearContact] = useState(false);

  useEffect(() => {
    const heroActions = document.querySelector('[data-booking-bar="after"]');
    const contact = document.querySelector('[data-booking-bar="hide"]');
    const observers: IntersectionObserver[] = [];

    if (heroActions) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry) setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      });
      observer.observe(heroActions);
      observers.push(observer);
    }

    if (contact) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry) setNearContact(entry.isIntersecting);
      });
      observer.observe(contact);
      observers.push(observer);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const visible = pastHero && !nearContact;

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] backdrop-blur-xl transition-[translate,opacity] duration-500 ease-soft md:hidden",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <Button
        href={booking.href}
        external
        glitter="ambient"
        size="lg"
        className="w-full"
        icon={<MessageCircle />}
      >
        {booking.label}
      </Button>
    </div>
  );
}
