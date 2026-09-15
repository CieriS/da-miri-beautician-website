import type { LogoContent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LogoProps extends LogoContent {
  className?: string;
}

/** Logo testuale con un colpo di pennello sotto la parte in corsivo (animato in CSS: `.logo-swash`). */
export function Logo({ text, accent, label, className }: LogoProps) {
  return (
    <a
      href="#top"
      aria-label={label}
      className={cn(
        "logo-link inline-flex min-h-11 items-center gap-[0.22em] font-serif text-[1.6rem] leading-none tracking-tight lg:text-[1.65rem]",
        className,
      )}
    >
      <span>{text}</span>
      <span className="relative italic">
        {accent}
        <svg
          aria-hidden
          viewBox="0 0 64 10"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-[0.3em] left-[-4%] h-[0.32em] w-[108%] overflow-visible text-accent"
        >
          <path
            className="logo-swash"
            d="M2 7C16 3 36 2.5 62 5"
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span aria-hidden className="size-[0.2em] self-end rounded-full bg-accent" />
    </a>
  );
}
