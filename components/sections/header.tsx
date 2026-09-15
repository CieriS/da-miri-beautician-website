"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { EASE_SOFT } from "@/lib/motion";
import type { NavigationContent } from "@/lib/types";
import { cn, cssVars } from "@/lib/utils";

export function Header({ content }: { content: NavigationContent }) {
  const { links, labels, logo, booking, mobileBooking } = content;
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-700 ease-soft",
        menuOpen && "border-border bg-background",
        !menuOpen && scrolled && "border-border bg-background/80 backdrop-blur-xl",
        !menuOpen && !scrolled && "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-3 lg:h-20">
        <Logo {...logo} />

        <nav aria-label={labels.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-7 lg:gap-9">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-[13px] tracking-[0.02em] text-muted transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-soft hover:text-foreground hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle label={labels.themeToggle} />
          {/* Su mobile la prenotazione vive nella barra fissa in basso e nel menu. */}
          <div className="hidden md:block">
            <Button href={booking.href} external glitter size="sm" icon={<ArrowUpRight />}>
              {booking.label}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border transition-colors active:bg-foreground/5 md:hidden"
          >
            {menuOpen ? (
              <X aria-hidden className="size-[1.1rem]" strokeWidth={1.5} />
            ) : (
              <Menu aria-hidden className="size-[1.1rem]" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SOFT }}
            className="fixed inset-x-0 top-16 bottom-0 flex flex-col overflow-y-auto overscroll-contain bg-background md:hidden"
          >
            <Container className="flex flex-1 flex-col">
              <nav aria-label={labels.mobileNav}>
                <ul className="flex flex-col pt-2">
                  {links.map((link, index) => (
                    <li
                      key={link.href}
                      className="menu-rise border-b border-border"
                      style={cssVars({ "--i": index })}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex min-h-18 items-center justify-between py-3 font-serif text-[2.25rem] leading-none transition-colors active:text-accent-ink"
                      >
                        {link.label}
                        <span className="font-sans text-xs text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div
                className="menu-rise mt-auto pt-10 pb-[max(env(safe-area-inset-bottom),1.5rem)]"
                style={cssVars({ "--i": links.length })}
              >
                <Button
                  href={mobileBooking.href}
                  external
                  glitter="ambient"
                  size="lg"
                  className="w-full"
                  icon={<MessageCircle />}
                >
                  {mobileBooking.label}
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
