/* Posizioni fisse (niente Math.random) per un markup identico tra server e client. */
const PARTICLES = [
  { left: "6%", top: "-22%", size: 7, delay: 0 },
  { left: "24%", top: "114%", size: 5, delay: 0.4 },
  { left: "44%", top: "-30%", size: 6, delay: 0.8 },
  { left: "62%", top: "118%", size: 7, delay: 0.2 },
  { left: "82%", top: "-18%", size: 5, delay: 0.6 },
  { left: "101%", top: "50%", size: 6, delay: 1 },
  { left: "-2%", top: "62%", size: 5, delay: 1.2 },
  { left: "34%", top: "30%", size: 3, delay: 0.5 },
  { left: "72%", top: "68%", size: 3, delay: 1.35 },
] as const;

interface GlitterProps {
  /**
   * `hover`: brilla quando il `.group` genitore è in hover o ha il focus (desktop).
   * `ambient`: scintilla periodicamente da solo (CTA mobile, dove l'hover non esiste).
   */
  variant?: "hover" | "ambient";
}

/** Micro-particelle glitter (stili `.glitter` in app/globals.css). */
export function Glitter({ variant = "hover" }: GlitterProps) {
  return (
    <span aria-hidden className={variant === "ambient" ? "glitter glitter--ambient" : "glitter"}>
      {PARTICLES.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="glitter-particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </span>
  );
}
