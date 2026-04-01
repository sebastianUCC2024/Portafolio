import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/src/components/providers/language-provider";
import { ThemeProvider } from "@/src/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "Juan Patiño | Portafolio",
  description: "Portafolio profesional de desarrollo web con Next.js y Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
