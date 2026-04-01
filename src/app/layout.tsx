import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/src/components/providers/language-provider";
import { ThemeProvider } from "@/src/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Juan Patiño | Desarrollador de Software",
  description:
    "Portafolio profesional de Juan Patiño - Estudiante de Ingeniería de Software especializado en desarrollo web moderno con Next.js, TypeScript, Python y Django.",
  keywords: [
    "desarrollador web",
    "software engineer",
    "next.js",
    "typescript",
    "python",
    "django",
    "portfolio",
  ],
  authors: [{ name: "Juan Patiño" }],
  creator: "Juan Patiño",
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: "Juan Patiño | Desarrollador de Software",
    description:
      "Portafolio profesional enfocado en desarrollo web moderno y experiencias digitales innovadoras.",
    siteName: "Juan Patiño Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Patiño | Desarrollador de Software",
    description:
      "Portafolio profesional enfocado en desarrollo web moderno y experiencias digitales innovadoras.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0f14" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
