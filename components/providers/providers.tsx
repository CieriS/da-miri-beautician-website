"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/*
 * React 19 segnala i <script> renderizzati da Client Components.
 * Come indicato nella guida Next.js "Preventing flash before hydration", lo script
 * anti-flash di next-themes resta eseguibile nell'HTML del server e inerte sul client.
 */
const themeScriptProps = {
  type: typeof window === "undefined" ? "text/javascript" : "text/plain",
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={themeScriptProps}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
