import {
  Droplets,
  Gem,
  Hand,
  Heart,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";

/**
 * Icone utilizzabili dai JSON tramite nome (campo `icon`).
 * Per aggiungerne una: importala da lucide-react e registrala qui.
 */
const icons = {
  droplets: Droplets,
  gem: Gem,
  hand: Hand,
  heart: Heart,
  leaf: Leaf,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  star: Star,
} satisfies Record<string, LucideIcon>;

type IconName = keyof typeof icons;

function isIconName(name: string): name is IconName {
  return name in icons;
}

export function resolveIcon(name: string): LucideIcon {
  if (!isIconName(name)) {
    throw new Error(
      `[data] Icona "${name}" non registrata in lib/icons.ts. Disponibili: ${Object.keys(icons).join(", ")}.`,
    );
  }
  return icons[name];
}
