import { Benefits } from "@/components/sections/benefits";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { MobileBookingBar } from "@/components/sections/mobile-booking-bar";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import {
  benefits,
  contact,
  gallery,
  hero,
  navigation,
  services,
  site,
  testimonials,
} from "@/lib/content";
import { buildNailSalonJsonLd, serializeJsonLd } from "@/lib/schema";

const jsonLd = buildNailSalonJsonLd(site, services.items);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Header content={navigation} />
      <main>
        <Hero content={hero} />
        <Benefits content={benefits} />
        <Services content={services} />
        <Gallery content={gallery} />
        <Testimonials content={testimonials} />
      </main>
      <Contact content={contact} />
      <MobileBookingBar booking={navigation.mobileBooking} />
    </>
  );
}
