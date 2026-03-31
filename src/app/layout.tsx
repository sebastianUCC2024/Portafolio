import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}