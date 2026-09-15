import { Reveal } from "@/components/ui/reveal";
import { cn, cssVars } from "@/lib/utils";

interface Illustration {
  viewBox: string;
  strokeWidth: number;
  transform?: string;
  /** Tracciati disegnati in sequenza, nell'ordine dell'array. */
  paths: string[];
}

/* Illustrazioni line-art del mestiere, disegnate a mano in SVG. */
const illustrations = {
  /** Flacone di smalto con tappo rigato, livello del liquido e riflesso. */
  polish: {
    viewBox: "0 0 120 200",
    strokeWidth: 2.2,
    paths: [
      "M50 80v10c-20 3-32 14-32 34v44c0 16 10 24 26 24h32c16 0 26-8 26-24v-44c0-20-12-31-32-34V80",
      "M46 80V22c0-8 6-14 14-14s14 6 14 14v58",
      "M40 80h40",
      "M26 136c14-6 28 6 44 0s22-2 24 0",
      "M30 122c-2 10-2 24 0 36",
      "M56 18v56M64 18v56",
      "M104 26v14M97 33h14",
    ],
  },
  /** Lima per unghie a doppia grana con il gesto della limatura. */
  file: {
    viewBox: "0 -10 220 90",
    strokeWidth: 1.6,
    transform: "rotate(-8 110 35)",
    paths: [
      "M18 35c0-9 7-15 17-15h150c10 0 17 6 17 15s-7 15-17 15H35c-10 0-17-6-17-15z",
      "M120 20v30",
      "M40 31h6M54 39h6M66 31h6M80 39h6M94 31h6M106 39h4",
      "M132 35h4M144 35h4M156 35h4M168 35h4M180 35h4",
      "M150 6c14-6 30-6 44 0M162 64c10 4 22 4 32 0",
    ],
  },
  /** Tre unghie a mandorla con cuticola, riflesso e scintille. */
  nails: {
    viewBox: "0 0 180 110",
    strokeWidth: 1.6,
    paths: [
      "M25 94C25 62 31 40 40 34C49 40 55 62 55 94",
      "M75 74C75 42 81 20 90 14C99 20 105 42 105 74",
      "M125 90C125 58 131 36 140 30C149 36 155 58 155 90",
      "M29 88Q40 80 51 88M79 68Q90 60 101 68M129 84Q140 76 151 84",
      "M34 54c-2 8-2 16-1 22M84 34c-2 8-2 16-1 22M134 50c-2 8-2 16-1 22",
      "M168 8v14M161 15h14M12 22v8M8 26h8",
    ],
  },
} satisfies Record<string, Illustration>;

export type IllustrationName = keyof typeof illustrations;

interface LineArtProps {
  name: IllustrationName;
  /** Classi del contenitore (larghezza): l'SVG lo riempie mantenendo le proporzioni. */
  className?: string;
}

/** Illustrazione a linea sottile che si traccia all'ingresso nel viewport (`.draw-path`). */
export function LineArt({ name, className }: LineArtProps) {
  const art: Illustration = illustrations[name];

  return (
    <Reveal className={className}>
      <svg
        viewBox={art.viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={art.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        focusable="false"
        className={cn("block h-auto w-full overflow-visible")}
      >
        <g transform={art.transform}>
          {art.paths.map((d, index) => (
            <path key={d} d={d} pathLength={1} className="draw-path" style={cssVars({ "--draw-i": index })} />
          ))}
        </g>
      </svg>
    </Reveal>
  );
}
