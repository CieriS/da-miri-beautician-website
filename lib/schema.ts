import type { Service, SiteData } from "@/lib/types";

/** Dati strutturati schema.org per la SEO locale. */
export function buildNailSalonJsonLd(site: SiteData, services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: site.brand,
    description: site.seo.description,
    url: site.url,
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    priceRange: site.priceRange,
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.name, description: service.description },
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: service.priceFrom,
        priceCurrency: "EUR",
      },
    })),
  };
}

/** Serializza JSON-LD evitando la chiusura prematura del tag <script>. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
