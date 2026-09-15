/**
 * Livello di accesso ai contenuti.
 *
 * Legge i JSON in `/data`, ne verifica la forma e produce oggetti pronti per i
 * componenti: riferimenti a immagini e icone risolti, link WhatsApp, prezzi
 * formattati, segnaposto `{chiave}` sostituiti. I componenti non importano mai
 * direttamente i JSON: per passare a un CMS basta riscrivere questo file.
 */

import benefitsJson from "@/data/benefits.json";
import contactJson from "@/data/contact.json";
import galleryJson from "@/data/gallery.json";
import heroJson from "@/data/hero.json";
import imagesJson from "@/data/images.json";
import navigationJson from "@/data/navigation.json";
import servicesJson from "@/data/services.json";
import siteJson from "@/data/site.json";
import testimonialsJson from "@/data/testimonials.json";
import { formatPrice, interpolate } from "@/lib/format";
import { resolveIcon } from "@/lib/icons";
import type {
  BenefitsContent,
  BenefitsData,
  ContactContent,
  ContactData,
  GalleryContent,
  GalleryData,
  HeroContent,
  HeroData,
  ImageAsset,
  ImagesData,
  LogoContent,
  NavigationContent,
  NavigationData,
  ServicesContent,
  ServicesData,
  SiteData,
  TestimonialsContent,
  TestimonialsData,
} from "@/lib/types";
import { createWhatsAppLink } from "@/lib/whatsapp";

/* Le annotazioni di tipo fanno fallire `tsc` e `next build` se un JSON non rispetta lo schema. */
const siteData: SiteData = siteJson;
const navigationData: NavigationData = navigationJson;
const heroData: HeroData = heroJson;
const benefitsData: BenefitsData = benefitsJson;
const servicesData: ServicesData = servicesJson;
const galleryData: GalleryData = galleryJson;
const testimonialsData: TestimonialsData = testimonialsJson;
const contactData: ContactData = contactJson;
const imagesData: ImagesData = imagesJson;

function resolveImage(key: string): ImageAsset {
  const image = imagesData[key];
  if (!image) {
    throw new Error(`[data] Immagine "${key}" non trovata in data/images.json.`);
  }
  return image;
}

function assertRating(rating: number, owner: string): number {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error(`[data] Valutazione non valida (${rating}) per "${owner}": usa un intero da 1 a 5.`);
  }
  return rating;
}

/* ─────────────────────────────────── Sito ─────────────────────────────────── */

export const site: SiteData = {
  ...siteData,
  url: process.env.NEXT_PUBLIC_SITE_URL || siteData.url,
  whatsapp: {
    ...siteData.whatsapp,
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteData.whatsapp.number,
  },
};

/** Valori disponibili come segnaposto nei testi generici. */
const siteValues = {
  brand: site.brand,
  owner: site.owner,
  area: site.location.area,
  city: site.location.city,
  vatNumber: site.vatNumber,
  year: new Date().getFullYear(),
};

const { messages } = site.whatsapp;
const whatsappLink = (message: string) => createWhatsAppLink(site.whatsapp.number, message);
const defaultBookingHref = whatsappLink(messages.default);

const logo: LogoContent = {
  ...site.logo,
  label: interpolate(navigationData.labels.home, siteValues),
};

/* ───────────────────────────────── Sezioni ───────────────────────────────── */

export const navigation: NavigationContent = {
  links: navigationData.links,
  labels: navigationData.labels,
  logo,
  booking: { label: navigationData.bookingLabel, href: defaultBookingHref },
  mobileBooking: { label: navigationData.mobileBookingLabel, href: defaultBookingHref },
};

export const hero: HeroContent = {
  ...heroData,
  image: resolveImage(heroData.image),
  portrait: {
    image: resolveImage(heroData.portrait.image),
    name: site.owner,
    caption: interpolate(heroData.portrait.caption, siteValues),
  },
};

export const benefits: BenefitsContent = {
  intro: benefitsData.intro,
  image: resolveImage(benefitsData.image),
  imageCaption: {
    label: interpolate(benefitsData.imageCaption.label, siteValues),
    note: benefitsData.imageCaption.note,
  },
  items: benefitsData.items.map((item) => ({ ...item, icon: resolveIcon(item.icon) })),
};

export const services: ServicesContent = {
  intro: servicesData.intro,
  labels: servicesData.labels,
  footnote: servicesData.footnote,
  advice: { label: servicesData.adviceCta, href: whatsappLink(messages.advice) },
  items: servicesData.items.map((item) => ({
    ...item,
    priceLabel: formatPrice(item.priceFrom),
    bookingHref: whatsappLink(interpolate(messages.service, { service: item.name })),
    bookingLabel: interpolate(servicesData.labels.bookService, { service: item.name }),
  })),
};

export const gallery: GalleryContent = {
  intro: galleryData.intro,
  carouselLabel: galleryData.carouselLabel,
  items: galleryData.items.map((item, index, all) => ({
    id: item.id,
    title: item.title,
    technique: item.technique,
    image: resolveImage(item.image),
    look: {
      label: galleryData.lookCta,
      ariaLabel: interpolate(galleryData.lookAriaLabel, { look: item.title }),
      href: whatsappLink(interpolate(messages.look, { look: item.title })),
    },
    slideLabel: interpolate(galleryData.slideLabel, { index: index + 1, total: all.length }),
  })),
};

export const testimonials: TestimonialsContent = {
  intro: testimonialsData.intro,
  carouselLabel: testimonialsData.carouselLabel,
  items: testimonialsData.items.map((item, index, all) => ({
    ...item,
    rating: assertRating(item.rating, item.name),
    ratingLabel: interpolate(testimonialsData.ratingLabel, { rating: item.rating }),
    slideLabel: interpolate(testimonialsData.slideLabel, { index: index + 1, total: all.length }),
  })),
};

export const contact: ContactContent = {
  intro: contactData.intro,
  booking: { label: contactData.primaryCta, href: defaultBookingHref },
  hours: { ...contactData.hours, slots: site.hours },
  address: {
    title: contactData.address.title,
    headline: interpolate(contactData.address.headline, siteValues),
    note: site.location.note,
  },
  quickContact: {
    title: contactData.quickContact.title,
    text: contactData.quickContact.text,
    cta: { label: contactData.quickContact.cta, href: defaultBookingHref },
  },
  map: {
    ariaLabel: interpolate(contactData.map.ariaLabel, siteValues),
    title: interpolate(contactData.map.title, siteValues),
    caption: interpolate(contactData.map.caption, siteValues),
    badge: contactData.map.badge,
  },
  footer: {
    logo,
    copyright: interpolate(contactData.footer.copyright, siteValues),
    backToTop: contactData.footer.backToTop,
    navLabel: contactData.footer.navLabel,
    instagram: site.instagramUrl
      ? { label: contactData.footer.instagram, href: site.instagramUrl }
      : null,
  },
};
