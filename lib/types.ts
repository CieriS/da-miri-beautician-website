import type { LucideIcon } from "lucide-react";

/* ═══════════════════════════ Primitive condivise ═══════════════════════════ */

/** Titolo con una parte in evidenza (corsivo serif + pennellata di smalto). */
export interface RichText {
  text: string;
  accent?: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  /** `object-position` CSS per regolare il ritaglio (es. "50% 30%"). */
  position?: string;
}

export interface SectionIntro {
  index: string;
  eyebrow: string;
  title: RichText;
  description?: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface OpeningHours {
  days: string;
  time: string;
}

export interface LogoContent {
  text: string;
  accent: string;
  label: string;
}

/* ═══════════════════ Forma dei file JSON in /data (input) ═══════════════════ */

export interface SiteData {
  brand: string;
  logo: { text: string; accent: string };
  owner: string;
  role: string;
  url: string;
  locale: string;
  seo: { title: string; description: string; keywords: string[] };
  whatsapp: {
    /** Formato internazionale, solo cifre. Sovrascrivibile con NEXT_PUBLIC_WHATSAPP_NUMBER. */
    number: string;
    messages: { default: string; service: string; look: string; advice: string };
  };
  location: { area: string; city: string; countryCode: string; note: string };
  hours: OpeningHours[];
  instagramUrl: string | null;
  vatNumber: string;
  priceRange: string;
}

export interface NavigationData {
  links: LinkItem[];
  bookingLabel: string;
  mobileBookingLabel: string;
  labels: {
    home: string;
    mainNav: string;
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
    themeToggle: string;
  };
}

export interface HeroData {
  eyebrow: string;
  title: RichText;
  subtitle: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  facts: Fact[];
  /** Chiave in data/images.json */
  image: string;
  portrait: { image: string; caption: string };
}

export interface BenefitItemData {
  id: string;
  /** Nome registrato in lib/icons.ts */
  icon: string;
  title: string;
  highlight: string;
  description: string;
}

export interface BenefitsData {
  intro: SectionIntro;
  image: string;
  imageCaption: { label: string; note: string };
  items: BenefitItemData[];
}

export interface ServiceItemData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  /** Prezzo di partenza in euro. */
  priceFrom: number;
  priceNote?: string;
  /** Massimo 3 voci brevi (~30 caratteri) per restare nella card. */
  details: string[];
}

export interface ServicesData {
  intro: SectionIntro;
  labels: {
    priceFrom: string;
    priceFromShort: string;
    book: string;
    /** Supporta il segnaposto {service}. */
    bookService: string;
    includes: string;
  };
  footnote: string;
  adviceCta: string;
  items: ServiceItemData[];
}

export interface GalleryItemData {
  id: string;
  title: string;
  technique: string;
  image: string;
}

export interface GalleryData {
  intro: SectionIntro;
  lookCta: string;
  lookAriaLabel: string;
  carouselLabel: string;
  /** Supporta {index} e {total}. */
  slideLabel: string;
  items: GalleryItemData[];
}

export interface TestimonialItemData {
  id: string;
  quote: string;
  name: string;
  treatment: string;
  highlight: string;
  /** Intero da 1 a 5. */
  rating: number;
}

export interface TestimonialsData {
  intro: SectionIntro;
  ratingLabel: string;
  carouselLabel: string;
  /** Supporta {index} e {total}. */
  slideLabel: string;
  items: TestimonialItemData[];
}

export interface ContactData {
  intro: SectionIntro;
  primaryCta: string;
  hours: { title: string; headline: string };
  address: { title: string; headline: string };
  quickContact: { title: string; text: string; cta: string };
  map: { ariaLabel: string; title: string; caption: string; badge: string };
  footer: { copyright: string; backToTop: string; instagram: string; navLabel: string };
}

export type ImagesData = Record<string, ImageAsset>;

/* ════════════ Contenuti risolti, pronti per i componenti (output) ═══════════ */

export interface NavigationContent {
  links: LinkItem[];
  labels: NavigationData["labels"];
  logo: LogoContent;
  booking: LinkItem;
  mobileBooking: LinkItem;
}

export interface HeroContent extends Omit<HeroData, "image" | "portrait"> {
  image: ImageAsset;
  portrait: { image: ImageAsset; name: string; caption: string };
}

export interface Benefit extends Omit<BenefitItemData, "icon"> {
  icon: LucideIcon;
}

export interface BenefitsContent {
  intro: SectionIntro;
  image: ImageAsset;
  imageCaption: { label: string; note: string };
  items: Benefit[];
}

export interface Service extends ServiceItemData {
  priceLabel: string;
  bookingHref: string;
  bookingLabel: string;
}

export interface ServicesContent {
  intro: SectionIntro;
  labels: ServicesData["labels"];
  footnote: string;
  advice: LinkItem;
  items: Service[];
}

export interface GalleryItem {
  id: string;
  title: string;
  technique: string;
  image: ImageAsset;
  look: LinkItem & { ariaLabel: string };
  slideLabel: string;
}

export interface GalleryContent {
  intro: SectionIntro;
  carouselLabel: string;
  items: GalleryItem[];
}

export interface Testimonial extends TestimonialItemData {
  ratingLabel: string;
  slideLabel: string;
}

export interface TestimonialsContent {
  intro: SectionIntro;
  carouselLabel: string;
  items: Testimonial[];
}

export interface ContactContent {
  intro: SectionIntro;
  booking: LinkItem;
  hours: { title: string; headline: string; slots: OpeningHours[] };
  address: { title: string; headline: string; note: string };
  quickContact: { title: string; text: string; cta: LinkItem };
  map: { ariaLabel: string; title: string; caption: string; badge: string };
  footer: {
    logo: LogoContent;
    copyright: string;
    backToTop: string;
    navLabel: string;
    instagram: LinkItem | null;
  };
}
