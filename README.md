# Da Miri — Sito vetrina di Miriana Rossetti

Sito one-page per **Da Miri**, l'home studio di onicotecnica di **Miriana Rossetti**.
Lo stile è sofisticato e minimale, con animazioni ispirate al mestiere: pennellate di
smalto, riflessi da top coat, illustrazioni a linea sottile e glitter. Ogni sezione porta
alla **prenotazione su WhatsApp** con un messaggio già compilato.

| | |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) · React 19 |
| **Linguaggio** | TypeScript in modalità `strict` |
| **Styling** | Tailwind CSS v4 (configurazione CSS-first in `app/globals.css`) |
| **Tema** | `next-themes`: chiaro, scuro o di sistema |
| **Animazioni** | CSS + IntersectionObserver (rivelazioni, pennellate, tracciati, riflessi, glitter) · Framer Motion (micro-interazioni) |
| **Target** | Mobile-first: barra di prenotazione fissa, fisarmonica servizi, caroselli con snap |
| **Icone** | `lucide-react` |
| **Font** | Playfair Display (titoli) + Geist (testo), ospitati in locale da `next/font` |
| **Contenuti** | File JSON in `/data`, separati dalla logica |

---

## Indice

1. [Installazione e avvio locale](#1-installazione-e-avvio-locale)
2. [Struttura del progetto](#2-struttura-del-progetto)
3. [Architettura: dati, logica, presentazione](#3-architettura-dati-logica-presentazione)
4. [Animazioni](#4-animazioni)
5. [Modificare il tema (colori, font, effetti)](#5-modificare-il-tema-colori-font-effetti)
6. [Sostituire le immagini mockup](#6-sostituire-le-immagini-mockup)
7. [Collegare il WhatsApp reale](#7-collegare-il-whatsapp-reale)
8. [Modificare testi, prezzi e informazioni](#8-modificare-testi-prezzi-e-informazioni)
9. [Deploy](#9-deploy)
10. [Checklist prima del lancio](#10-checklist-prima-del-lancio)
11. [Risoluzione problemi](#11-risoluzione-problemi)

---

## 1. Installazione e avvio locale

### Requisiti

- **Node.js ≥ 20.9** (richiesto da Next.js 16) **oppure** **Bun ≥ 1.2**
- Un package manager a scelta: `npm`, `pnpm`, `yarn` o `bun`

### Installazione

```bash
# con Bun (usa il lockfile incluso)
bun install

# oppure con npm
npm install
```

### Variabili d'ambiente

```bash
cp .env.example .env.local
```

| Variabile | Descrizione |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numero WhatsApp internazionale, **solo cifre** (es. `393471234567`). Ha la precedenza su `data/site.json`. |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico (es. `https://www.damiri.it`) per canonical, Open Graph e dati strutturati. Ha la precedenza su `data/site.json`. |

Senza `.env.local` vengono usati i valori di `data/site.json`.

### Avvio in sviluppo

```bash
npm run dev
```

Con Bun, anche senza Node installato:

```bash
bun --bun run dev
```

Apri l'indirizzo mostrato nel terminale (di solito [http://localhost:3000](http://localhost:3000)).

**Provarlo dallo smartphone** (consigliato: è il target principale): collega il telefono alla
stessa rete Wi-Fi del computer e apri l'indirizzo **Network** stampato dal terminale
(es. `http://192.168.1.69:3000`). Le reti locali `192.168.*.*`, `10.*.*.*` e `*.local` sono già
autorizzate in `next.config.ts` → `allowedDevOrigins`; per altri indirizzi aggiungili lì
(vedi §11).

### Script

| Script | Cosa fa |
|---|---|
| `dev` | Server di sviluppo con Turbopack |
| `build` | Build di produzione: type-check, **validazione dei JSON** e generazione statica |
| `start` | Serve la build di produzione |
| `lint` | ESLint (`core-web-vitals` + TypeScript) |

Per verificare tutto prima di un deploy:

```bash
npx tsc --noEmit && npm run lint && npm run build
```

---

## 2. Struttura del progetto

```
.
├── data/                        # ◆ DATI DA ESPORRE: solo JSON, nessuna logica
│   ├── site.json                #   Brand, SEO, WhatsApp e messaggi, zona, orari, P.IVA
│   ├── navigation.json          #   Voci di menu, etichette dell'header e accessibilità
│   ├── hero.json                #   Titolo, sottotitolo, CTA, dati rapidi
│   ├── benefits.json            #   "Perché uno studio privato?" e vantaggi
│   ├── services.json            #   Trattamenti, durate, prezzi, etichette delle card
│   ├── gallery.json             #   Lavori della galleria
│   ├── testimonials.json        #   Recensioni
│   ├── contact.json             #   CTA finale, schede info, mappa, footer
│   └── images.json              #   Registro di tutte le immagini (src, alt, ritaglio)
├── lib/                         # ◆ LOGICA
│   ├── types.ts                 #   Schema dei JSON (input) e dei contenuti risolti (output)
│   ├── content.ts               #   Loader: valida i JSON, risolve riferimenti, genera link e prezzi
│   ├── format.ts                #   formatPrice() e interpolate() per i segnaposto {chiave}
│   ├── icons.ts                 #   Registro delle icone utilizzabili dai JSON
│   ├── whatsapp.ts              #   createWhatsAppLink()
│   ├── schema.ts                #   JSON-LD schema.org/NailSalon
│   ├── motion.ts                #   Spring, curve e varianti di Framer Motion
│   └── utils.ts                 #   cn()
├── components/                  # ◆ PRESENTAZIONE: ricevono contenuti già pronti come props
│   ├── illustrations/
│   │   └── line-art.tsx         #   Flacone di smalto, lima, unghie a mandorla (SVG tracciati)
│   ├── providers/
│   │   └── providers.tsx        #   ThemeProvider + MotionConfig
│   ├── sections/
│   │   ├── header.tsx           #   Navigazione, tema, CTA con glitter, menu mobile
│   │   ├── hero.tsx
│   │   ├── benefits.tsx
│   │   ├── services.tsx
│   │   ├── service-card.tsx     #   Card con rivelazione in hover e riflesso top coat
│   │   ├── gallery.tsx
│   │   ├── testimonials.tsx
│   │   ├── contact.tsx          #   Footer: CTA, mappa mockup, orari, indirizzo
│   │   └── mobile-booking-bar.tsx # Barra "Prenota su WhatsApp" fissa su mobile
│   └── ui/
│       ├── accent.tsx           #   Parola in evidenza con pennellata di smalto
│       ├── button.tsx           #   Bottone-link con spring e glitter (hover o ambient)
│       ├── carousel-track.tsx   #   Carosello con snap su mobile, griglia da tablet
│       ├── container.tsx
│       ├── glitter.tsx          #   Particelle glitter
│       ├── graded-image.tsx     #   next/image + color grading + riflesso top coat
│       ├── hover-card.tsx
│       ├── logo.tsx             #   Logo con colpo di pennello
│       ├── reveal.tsx           #   Rivelazione allo scroll resiliente (Stagger, FadeUp, Reveal)
│       ├── rich-title.tsx       #   Rende i titoli { text, accent }
│       ├── section-heading.tsx  #   Eyebrow, titolo, descrizione, illustrazione
│       └── theme-toggle.tsx
├── app/
│   ├── globals.css              #   Design tokens, tipografia, effetti a tema
│   ├── layout.tsx               #   Font, metadata SEO da data/site.json
│   └── page.tsx                 #   Composizione: collega contenuti e sezioni
├── next.config.ts               #   Domini autorizzati per le immagini remote
└── .env.example
```

---

## 3. Architettura: dati, logica, presentazione

Il progetto è diviso in tre livelli con responsabilità nette:

```
 data/*.json            lib/content.ts                 app/page.tsx          components/
┌──────────────┐    ┌──────────────────────────┐    ┌───────────────┐    ┌──────────────────┐
│ testi        │    │ 1. valida la forma (tipi)│    │ importa i     │    │ rendono solo     │
│ prezzi       │───►│ 2. risolve immagini/icone│───►│ contenuti e   │───►│ markup e         │
│ immagini     │    │ 3. applica variabili env │    │ li passa come │    │ animazioni       │
│ messaggi     │    │ 4. link WhatsApp, prezzi │    │ props         │    │ (nessuna logica  │
│ etichette    │    │ 5. sostituisce {segnap.} │    │               │    │  di business)    │
└──────────────┘    └──────────────────────────┘    └───────────────┘    └──────────────────┘
```

### 3.1 `data/`: cosa si mostra

Solo JSON, modificabili senza toccare il codice. **Ogni testo visibile** sta qui, comprese
le etichette per l'accessibilità (es. "Apri menu") e i messaggi WhatsApp precompilati.

I JSON non contengono logica, ma possono usare:

- **riferimenti**: `"image": "hero"` punta a una chiave di `data/images.json`; `"icon": "gem"` punta a un'icona registrata in `lib/icons.ts`;
- **segnaposto**: `"Fondatrice di {brand}"`, sostituiti dal loader (elenco completo al §8.3);
- **titoli con enfasi**: `{ "text": "Non un salone.", "accent": "Il tuo momento." }`. La parte `accent` è in corsivo, con la pennellata di smalto.

### 3.2 `lib/`: come si elaborano

`lib/content.ts` è l'**unico punto** che legge i JSON. Si occupa di:

1. **Validazione a build time.** Ogni JSON è assegnato al proprio tipo (`const heroData: HeroData = heroJson`). Un campo mancante o del tipo sbagliato fa fallire `tsc` e `next build` con l'indicazione del file.
2. **Validazione a runtime** (sempre durante la build statica). Immagini inesistenti, icone non registrate, segnaposto sconosciuti e valutazioni fuori scala (1–5) generano errori espliciti con prefisso `[data]`.
3. **Risoluzione** delle chiavi immagine e dei nomi icona.
4. **Variabili d'ambiente**, che sovrascrivono numero WhatsApp e URL.
5. **Dati derivati**: link WhatsApp per ogni servizio e lavoro, prezzi formattati (`30 €`), testi con segnaposto sostituiti.

L'output sono oggetti tipizzati (`HeroContent`, `ServicesContent`…) definiti in `lib/types.ts`.

> **Passare a un CMS** (Sanity, Contentful, Strapi…) significa riscrivere solo
> `lib/content.ts` mantenendo gli stessi tipi di output: i componenti restano invariati.

### 3.3 `components/`: come si mostrano

I componenti ricevono i contenuti **già pronti** via props (`<Services content={services} />`)
e non importano mai i JSON. `app/page.tsx` fa da collegamento.

### 3.4 Server e Client Components

La pagina è **statica** (`○ /` in `next build`). Solo le parti interattive sono Client Components:

| Componente | Tipo | Perché |
|---|---|---|
| `sections/*` (tranne header e card), `ui/container`, `ui/section-heading`, `ui/rich-title`, `ui/graded-image`, `ui/glitter` | Server | Markup statico |
| `providers/providers.tsx` | **Client** | Context di tema e motion |
| `sections/header.tsx` | **Client** | Scroll, menu mobile, tasto Esc |
| `sections/service-card.tsx`, `ui/button.tsx`, `ui/hover-card.tsx` | **Client** | Spring in hover e tap |
| `ui/reveal.tsx`, `ui/carousel-track.tsx` | **Client** | IntersectionObserver e indicatori del carosello |
| `sections/mobile-booking-bar.tsx` | **Client** | Mostra o nasconde la barra in base allo scroll |
| `ui/accent.tsx`, `ui/logo.tsx`, `illustrations/line-art.tsx` | Server | Animazioni in puro CSS |
| `ui/theme-toggle.tsx` | **Client** | `useTheme()` |

Ai Client Components arrivano solo dati serializzabili (stringhe, numeri, elementi JSX). Le
icone dei vantaggi, che sono componenti, vengono usate soltanto da Server Components.

---

## 4. Animazioni

| Animazione | Dove | Tecnica | File |
|---|---|---|---|
| **Ingresso della hero** | Titolo, testo, CTA e dati rapidi | CSS `@keyframes rise` in sequenza: parte al primo paint, senza JavaScript | `.hero-rise` |
| **Fade-up con stagger** | Tutti i blocchi, allo scroll | IntersectionObserver + transizioni CSS | `components/ui/reveal.tsx`, `[data-reveal]` |
| **Pennellata di smalto** | Sotto le parole in evidenza dei titoli | `background-size` di un pennello SVG; `box-decoration-break: clone` la ripete su ogni riga | `components/ui/accent.tsx`, `.brush-accent` |
| **Colpo di pennello del logo** | Sotto "Miri", ridisegnato in hover | `stroke-dashoffset` con `pathLength="1"` | `components/ui/logo.tsx`, `.logo-swash` |
| **Illustrazioni line-art** | Flacone (servizi), lima (vantaggi), unghie (galleria) | `stroke-dashoffset`, tracciati in sequenza | `components/illustrations/line-art.tsx`, `.draw-path` |
| **Riflesso top coat** | Foto e card servizi | Desktop: in hover. Touch: passa da solo quando la foto compare | `.gloss-sweep` in `globals.css` |
| **Glitter** | CTA di prenotazione | Desktop: in hover e focus. Mobile: scintillio periodico sulla barra fissa e nel menu (`glitter="ambient"`) | `components/ui/glitter.tsx`, `.glitter` |
| **Micro-interazioni** | Bottoni, card, switch del tema, menu | Framer Motion `whileHover` / `whileTap` / `AnimatePresence` | `lib/motion.ts` → `hoverSpring` |

### Contenuti sempre visibili (anche senza JavaScript)

Le animazioni **non nascondono mai il contenuto nell'HTML del server**:

- la hero entra con animazioni CSS che partono subito, senza attendere JavaScript;
- `reveal.tsx` nasconde un blocco **solo dopo l'idratazione** e **solo se è fuori schermo**, per poi rivelarlo allo scroll. Se il JavaScript è lento, bloccato o in errore, la pagina resta completamente leggibile.

### Scelte di prestazioni e accessibilità

- Riflesso, glitter, pennellate e tracciati sono **solo CSS** e animano proprietà leggere (`translate`, `scale`, `opacity`, `stroke-dashoffset`).
- L'immagine della hero (LCP) non ha animazione d'ingresso.
- Con **"Riduci movimento"** attivo: niente traslazioni, riflessi o glitter; restano dissolvenze brevi, pennellate e tracciati.
- Su **touch screen** i contenuti rivelati in hover su desktop sono sempre visibili (variante `can-hover:`).

### Esperienza mobile (target principale)

| Elemento | Comportamento su smartphone | File |
|---|---|---|
| **Barra di prenotazione** | Fissa in basso nella zona del pollice, con glitter discreto. Compare dopo le CTA della hero e si ritira sui contatti. Rispetta l'area sicura dell'iPhone | `sections/mobile-booking-bar.tsx` |
| **Header e menu** | Solo logo, tema e menu (target da 44px). Il menu è a tutto schermo, con voci grandi e CTA WhatsApp in fondo | `sections/header.tsx` |
| **Hero** | Due CTA sulla stessa riga, immagine subito sotto, dati rapidi dopo l'immagine | `sections/hero.tsx` |
| **Servizi** | Fisarmonica con prezzi visibili da chiusa; si apre un trattamento alla volta, con bottone "Prenota {trattamento}". È `<details>` nativo: funziona anche senza JavaScript | `sections/services.tsx` |
| **Galleria e recensioni** | Caroselli con snap, anteprima dell'elemento successivo e indicatori toccabili; da tablet in su diventano griglie | `ui/carousel-track.tsx` |
| **Contatti** | CTA a tutta larghezza, orari e indirizzo prima della mappa decorativa | `sections/contact.tsx` |

La barra si aggancia agli attributi `data-booking-bar="after"` (CTA della hero) e
`data-booking-bar="hide"` (sezione contatti): spostandoli si cambia il punto in cui compare o sparisce.

### Personalizzare

- **Aggiungere un'illustrazione a una sezione**: `ornament={<LineArt name="polish" className="w-16" />}` su `<SectionHeading>`. I nomi disponibili sono `polish`, `file` e `nails`.
- **Creare una nuova illustrazione**: aggiungi una voce in `illustrations` dentro `line-art.tsx`, con `viewBox`, `strokeWidth` e l'elenco dei `paths` (disegnati nell'ordine dell'array).
- **Glitter su un altro bottone**: `<Button glitter …>`.
- **Riflesso su una nuova card**: la card deve avere la classe `group` e `position: relative`; aggiungi `<span aria-hidden className="gloss-sweep" />` come primo figlio.
- **Velocità**: durate e curve sono in `lib/motion.ts` (`softSpring`, `hoverSpring`, `BRUSH_EASE`) e nei blocchi `.gloss-sweep` e `.glitter-particle` di `globals.css`.

---

## 5. Modificare il tema (colori, font, effetti)

Tutto è centralizzato in **`app/globals.css`**: `:root` per il tema chiaro, `.dark` per quello scuro.

### 5.1 Colori

```css
:root {
  --background: #fafafa;   /* Sfondo */
  --foreground: #171717;   /* Testo principale */
  --accent: #d4a373;       /* Nude / Blush */
  --surface: #ffffff;      /* Superfici elevate */
  --accent-ink: #8c5e34;   /* Accento per TESTI piccoli (contrasto AA) */
  --accent-foreground: #171717;
}
.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  --accent: #e6ccb2;       /* Soft Rose Gold */
  --surface: #1a1a1a;
  --accent-ink: #e6ccb2;
  --accent-foreground: #0a0a0a;
}
```

Il blocco `@theme inline` genera le utility Tailwind corrispondenti (`bg-accent`,
`text-accent-ink`, `bg-surface`, `text-muted`, `border-border`…). **Basta cambiare
l'esadecimale**: tutte le sezioni si aggiornano.

> `--accent-ink` esiste perché il nude `#D4A373` su `#FAFAFA` ha un contrasto di circa 2,2:1,
> troppo basso per i testi piccoli. Se cambi `--accent`, scegli un `--accent-ink` con
> contrasto ≥ 4,5:1 sullo sfondo ([WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)).

### 5.2 Colori degli effetti a tema

| Token | Effetto |
|---|---|
| `--brush-stroke` | SVG del pennello (data URI). Cambia `fill` (`%23` + esadecimale) e `fill-opacity` per colore e intensità. |
| `--gloss-strong`, `--gloss-soft` | Luminosità del riflesso top coat |
| `--glitter-a`, `--glitter-b` | Sfumatura delle particelle glitter |

> Nel data URI il `#` va scritto `%23`: per esempio `fill='%23d4a373'`.

### 5.3 Color grading delle immagini

```css
--image-filter:       saturate(0.82) sepia(0.08) contrast(1.02) brightness(1);
--image-filter-hover: saturate(1)    sepia(0)    contrast(1)    brightness(1);
--image-overlay:      linear-gradient(…);
```

- **Più editoriale**: aumenta `sepia` o riduci `saturate`.
- **Nessun filtro**: `--image-filter: none; --image-filter-hover: none;`.
- Mantieni **le stesse funzioni nello stesso ordine** nei due filtri, altrimenti la transizione salta.

### 5.4 Font e tema predefinito

- **Font**: in `app/layout.tsx` (`next/font/google`), esposti come `--font-playfair` e `--font-geist-sans` e usati con `font-serif` e `font-sans`.
- **Tema iniziale**: in `components/providers/providers.tsx`, `defaultTheme="system" | "light" | "dark"`.

---

## 6. Sostituire le immagini mockup

Tutte le immagini sono in **`data/images.json`**. Gli altri JSON le richiamano per chiave.

```json
{
  "hero": {
    "src": "/images/hero.jpg",
    "alt": "Mani di una cliente con ricostruzione nude a mandorla",
    "position": "50% 35%"
  }
}
```

| Campo | Descrizione |
|---|---|
| `src` | Percorso locale (in `public/`) oppure URL remoto autorizzato |
| `alt` | Descrizione accessibile, specifica (forma, colore, tecnica) |
| `position` | *Opzionale.* `object-position` per spostare il ritaglio |

### 6.1 Formati consigliati

| Chiave | Dove | Formato a schermo | Sorgente consigliata |
|---|---|---|---|
| `hero` | Hero, arco a tutta altezza | 4:5 su mobile, verticale su desktop | ≥ 1600 × 2200 px |
| `portrait` | Miniatura accanto al nome | 1:1 | **Ritratto di Miriana**, ≥ 400 px |
| `studio` | Sezione vantaggi | 4:3 su mobile, 1:1 su desktop | ≥ 1400 × 1400 px |
| `gallery-*` | Galleria | **3:4** | ≥ 1200 × 1600 px |

### 6.2 Passare a immagini locali

1. Copia le foto in `public/images/` (JPG o WebP, idealmente < 500 KB).
2. In `data/images.json` imposta `"src": "/images/nome-file.jpg"` e aggiorna `alt`.
3. Quando nessuna immagine è più remota, rimuovi `remotePatterns` da `next.config.ts`.

`next/image` genera da solo le versioni responsive (WebP/AVIF).

### 6.3 Aggiungere un lavoro alla galleria

1. `data/images.json`:
   ```json
   "gallery-french-micro": { "src": "/images/lavori/french-micro.jpg", "alt": "French sottilissima su unghie corte squadrate" }
   ```
2. `data/gallery.json` → `items`:
   ```json
   { "id": "french-micro", "title": "Micro French", "technique": "Semipermanente", "image": "gallery-french-micro" }
   ```

Con un **multiplo di 3** elementi la griglia desktop resta bilanciata. Se la chiave
immagine è sbagliata, la build si ferma con `[data] Immagine "…" non trovata`.

### 6.4 Immagini da un altro dominio

```ts
// next.config.ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/damiri/**" }],
},
```

---

## 7. Collegare il WhatsApp reale

### 7.1 Numero

**Consigliato**, con variabile d'ambiente (in locale e sull'hosting):

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=393471234567
```

**Oppure** in `data/site.json`:

```json
"whatsapp": { "number": "393471234567", … }
```

| Scritto così | Va inserito così |
|---|---|
| `+39 347 123 4567` | `393471234567` |
| `347 1234567` | `393471234567` (aggiungi `39`) |
| `0039 347 1234567` | `393471234567` (togli `00`) |

> Le variabili `NEXT_PUBLIC_*` vengono lette a build time: dopo averle cambiate serve un nuovo deploy.

### 7.2 Messaggi precompilati

Sono in `data/site.json` → `whatsapp.messages`:

| Chiave | Usato da | Segnaposto |
|---|---|---|
| `default` | "Prenota ora" (header), "Prenota su WhatsApp" e "Scrivi su WhatsApp" (footer) | — |
| `service` | Ogni card trattamento | `{service}` |
| `look` | "Voglio questo look" in galleria | `{look}` |
| `advice` | "Chiedi un consiglio" (servizi) | — |

I link vengono generati in `lib/content.ts` tramite `createWhatsAppLink()` (`lib/whatsapp.ts`).

### 7.3 Verifica

Clicca "Prenota ora" da smartphone: deve aprirsi la chat col numero corretto e il messaggio già scritto.

---

## 8. Modificare testi, prezzi e informazioni

### 8.1 Dove si trova cosa

| Cosa | File |
|---|---|
| Nome, SEO, zona, orari, P.IVA, Instagram, fascia di prezzo | `data/site.json` |
| Menu, "Prenota ora", etichette accessibili | `data/navigation.json` |
| Titolo, sottotitolo, CTA e dati rapidi della hero | `data/hero.json` |
| Vantaggi (titoli, testi, icone) | `data/benefits.json` |
| Trattamenti, durate, prezzi, nota prezzi | `data/services.json` |
| Galleria | `data/gallery.json` + `data/images.json` |
| Recensioni | `data/testimonials.json` |
| CTA finale, schede info, mappa, footer | `data/contact.json` |

### 8.2 Regole per i campi

- **Titoli**: `{ "text": "…", "accent": "…" }`. `accent` è opzionale e riceve corsivo e pennellata.
- **Servizi**: `priceFrom` è un **numero** (`30`, non `"30 €"`) e viene formattato in automatico. `priceNote` è opzionale (`"/ unghia"`). Tieni `details` a **massimo 3 voci brevi** (~30 caratteri).
- **Icone dei vantaggi**: `"icon"` accetta `droplets`, `gem`, `hand`, `heart`, `leaf`, `shield-check`, `sparkles`, `star`. Per aggiungerne altre, registrale in `lib/icons.ts` (catalogo su [lucide.dev/icons](https://lucide.dev/icons)).
- **Recensioni**: `rating` è un intero da 1 a 5.
- **Instagram**: in `site.json` `"instagramUrl": "https://instagram.com/…"` mostra il link nel footer; `null` lo nasconde.
- **Link di navigazione**: `href` deve corrispondere all'`id` di una sezione (`#studio`, `#servizi`, `#lavori`, `#recensioni`, `#contatti`).

### 8.3 Segnaposto disponibili

| Segnaposto | Valore | Utilizzabile in |
|---|---|---|
| `{brand}` | `site.brand` | `navigation.labels.home`, `hero.portrait.caption`, `benefits.imageCaption.label`, `contact.address.headline`, `contact.map.*`, `contact.footer.copyright` |
| `{owner}` | `site.owner` | come sopra |
| `{area}` / `{city}` | `site.location` | come sopra |
| `{vatNumber}` | `site.vatNumber` | come sopra |
| `{year}` | anno corrente (alla build) | come sopra |
| `{service}` | nome del trattamento | `site.whatsapp.messages.service` |
| `{look}` | titolo del lavoro | `site.whatsapp.messages.look`, `gallery.lookAriaLabel` |
| `{rating}` | valutazione | `testimonials.ratingLabel` |

Un segnaposto scritto male (es. `{brnad}`) blocca la build con l'elenco di quelli validi.

### 8.4 Recensioni

Quelle incluse sono **segnaposto**. Sostituiscile con recensioni **reali**, con il consenso
delle clienti. Pubblicare recensioni inventate è una pratica commerciale scorretta
(Codice del Consumo).

---

## 9. Deploy

### Vercel (consigliato)

1. Carica il progetto su GitHub, GitLab o Bitbucket e importalo su [vercel.com/new](https://vercel.com/new).
2. In **Settings → Environment Variables** aggiungi `NEXT_PUBLIC_WHATSAPP_NUMBER` e `NEXT_PUBLIC_SITE_URL`.
3. Deploy, poi collega il dominio da **Settings → Domains**.

Ogni modifica ai JSON pubblicata sul repository genera un nuovo deploy.

### Altri hosting Node.js

```bash
npm run build
npm run start
```

---

## 10. Checklist prima del lancio

- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` impostato e link testato da smartphone
- [ ] `NEXT_PUBLIC_SITE_URL` con il dominio definitivo
- [ ] Zona, città, orari e **P.IVA** reali in `data/site.json`
- [ ] Foto reali in `data/images.json`, con il **ritratto di Miriana** in `portrait`
- [ ] Recensioni **reali** in `data/testimonials.json`
- [ ] Prezzi e durate verificati in `data/services.json`
- [ ] Testi dei vantaggi conformi alle procedure effettive (autoclave, monouso…)
- [ ] Privacy policy (e cookie policy, se aggiungi analytics) con link nel footer
- [ ] Favicon (`app/icon.png`) e immagine social (`app/opengraph-image.jpg`, 1200 × 630)
- [ ] `npm run build` senza errori

---

## 11. Risoluzione problemi

**La build fallisce con un errore `[data] …`**
Il messaggio indica file e campo: immagine inesistente, icona non registrata, segnaposto non valido o valutazione fuori scala. Correggi il JSON e rilancia.

**La build fallisce con un errore TypeScript su `lib/content.ts`**
Un JSON non rispetta lo schema: manca un campo obbligatorio o ha il tipo sbagliato (per esempio `"priceFrom": "30"` invece di `30`). L'errore nomina il campo. Gli schemi sono in `lib/types.ts`.

**JSON non valido** (virgola finale, virgolette non chiuse)
Controlla il file con l'editor oppure con `node -e "require('./data/services.json')"`.

**Da smartphone (o dall'indirizzo di rete) la pagina non reagisce: tema e menu non funzionano**
In sviluppo Next.js blocca le proprie risorse per le origini diverse da `localhost`, quindi la pagina non si idrata. Nel terminale compare `Blocked cross-origin request to Next.js dev resource … from "<indirizzo>"`. Aggiungi quell'indirizzo a `allowedDevOrigins` in `next.config.ts` (es. `"192.168.*.*"`) e riavvia `npm run dev`. In produzione questo limite non esiste.

**`Another next dev server is already running`**
Next.js 16 permette un solo server di sviluppo per cartella. Usa quello già attivo (l'indirizzo è nel messaggio) oppure chiudilo prima di avviarne un altro.

**`command not found: node`**
Installa Node.js 20.9+ oppure usa Bun: `bun install` e `bun --bun run dev`.

**`hostname "…" is not configured under images`**
Autorizza il dominio in `next.config.ts` (§6.4) e riavvia il server.

**Il numero WhatsApp non si aggiorna in produzione**
Le variabili `NEXT_PUBLIC_*` si leggono a build time: rifai il deploy.

**Glitter e riflessi non si vedono**
Sono effetti di hover: non compaiono su touch screen né con "Riduci movimento" attivo, per scelta.
