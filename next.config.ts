import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo in sviluppo: permette di aprire il dev server da smartphone e altri
  // dispositivi della rete locale (es. http://192.168.1.69:3000). Senza questa
  // voce Next.js blocca le risorse di sviluppo e la pagina non si idrata.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  images: {
    // Domini autorizzati per le immagini remote servite tramite next/image.
    // Rimuovere Unsplash quando tutte le immagini saranno locali in `public/`.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
