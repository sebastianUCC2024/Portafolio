"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

const quickStats = [
  { value: "4", key: "projects" },
  { value: "5", key: "semester" },
  { value: "3+", key: "technologies" },
] as const;

export default function HeroSection() {
  const { dictionary } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  const codeLines = [
    { parts: [{ text: "const", cls: "text-primary font-semibold" }, { text: " developer = {", cls: "text-foreground" }] },
    { parts: [{ text: "  name:", cls: "text-secondary" }, { text: ' "Juan Patiño",', cls: "text-primary-light" }] },
    { parts: [{ text: "  role:", cls: "text-secondary" }, { text: ' "Software Engineer",', cls: "text-primary-light" }] },
    { parts: [{ text: "  stack:", cls: "text-secondary" }, { text: " [", cls: "text-foreground" }] },
    { parts: [{ text: '    "Python",', cls: "text-warning" }, { text: ' "Django",', cls: "text-warning" }] },
    { parts: [{ text: '    "TypeScript",', cls: "text-warning" }, { text: ' "React"', cls: "text-warning" }] },
    { parts: [{ text: "  ],", cls: "text-foreground" }] },
    { parts: [{ text: "  passion:", cls: "text-secondary" }, { text: ' "Building great UX"', cls: "text-primary-light" }] },
    { parts: [{ text: "};", cls: "text-foreground" }] },
  ];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCursorOn((p) => !p), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border py-20 sm:py-24 lg:py-32"
    >
      {/* Fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_top_right,rgba(16,185,129,0.13),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_bottom_left,rgba(6,182,212,0.08),transparent)]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Columna izquierda: texto */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <span
              className={`inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-primary transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {dictionary.hero.badge}
            </span>

            {/* Titulo */}
            <h1
              className={`mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="text-muted-foreground">{dictionary.hero.titleStart}</span>{" "}
              <span className="relative inline-block">
                <span
                  className="relative z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 50%, var(--secondary) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {dictionary.hero.titleHighlight}
                </span>
                <span className="absolute -bottom-1 left-0 h-3 w-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg" />
              </span>
              <br />
              <span className="text-foreground">{dictionary.hero.titleEnd}</span>
            </h1>

            {/* Descripcion */}
            <p
              className={`mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "300ms" }}
            >
              {dictionary.hero.description}
            </p>

            {/* CTAs */}
            <div
              className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "400ms" }}
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ boxShadow: "0 0 0 0 transparent" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 30px rgba(16,185,129,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 0 transparent";
                }}
              >
                <span className="flex items-center gap-2">
                  {dictionary.hero.primaryAction}
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:scale-105 hover:bg-primary/5"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  {dictionary.hero.secondaryAction}
                </span>
              </a>
            </div>

            {/* Stats */}
            <div
              className={`mt-10 grid max-w-xs grid-cols-3 gap-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "500ms" }}
            >
              {quickStats.map((stat) => (
                <div
                  key={stat.key}
                  className="group rounded-2xl border border-border bg-card/60 px-4 py-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card"
                >
                  <p className="text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {stat.value}
                    {stat.key === "semester" && (
                      <span className="text-base align-top text-primary">o</span>
                    )}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {dictionary.hero.stats[stat.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: foto + card */}
          <div
            className={`order-1 lg:order-2 flex flex-col items-center gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "250ms" }}
          >
            {/* Foto de perfil */}
            <div className="relative">
              {/* Anillo animado exterior */}
              <div
                className="absolute -inset-4 rounded-full opacity-30 blur-xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--primary), var(--secondary), var(--primary))",
                  animation: "spin 8s linear infinite",
                }}
              />
              {/* Anillo de borde */}
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--primary) 0%, var(--secondary) 50%, var(--primary) 100%)",
                  animation: "spin 8s linear infinite",
                  padding: "2px",
                }}
              >
                <div className="h-full w-full rounded-full bg-background" />
              </div>

              {/* Contenedor de imagen */}
              <div className="relative h-52 w-52 overflow-hidden rounded-full border-2 border-primary/30 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                <Image
                  src="/images/profile.jpg"
                  alt="Juan Patino - Desarrollador de Software"
                  fill
                  className="object-cover object-center"
                  priority
                  crossOrigin="anonymous"
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              </div>

              {/* Badge flotante: disponible */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-xs font-medium text-primary shadow-lg backdrop-blur-md whitespace-nowrap"
                style={{ boxShadow: "0 4px 20px rgba(16,185,129,0.2)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Disponible para proyectos
              </div>

              {/* Tag flotante izquierda */}
              <div
                className="absolute -left-6 top-10 hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-lg backdrop-blur-md animate-float"
                style={{ animationDelay: "0ms" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Python + Django
              </div>

              {/* Tag flotante derecha */}
              <div
                className="absolute -right-6 top-20 hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-lg backdrop-blur-md animate-float"
                style={{ animationDelay: "600ms" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                TypeScript
              </div>
            </div>

            {/* Card editor de codigo */}
            <div className="w-full max-w-sm">
              <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-primary/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                {/* Header del editor */}
                <div className="flex items-center gap-2 border-b border-border bg-accent/60 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-error/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    developer.ts
                  </span>
                </div>

                {/* Contenido del editor */}
                <div className="p-4">
                  <div className="font-mono text-xs leading-6">
                    {codeLines.map((line, lineIdx) => (
                      <div key={lineIdx} className="flex items-start">
                        <span className="mr-4 select-none text-muted/40 text-right w-4">
                          {lineIdx + 1}
                        </span>
                        <span>
                          {line.parts.map((part, partIdx) => (
                            <span key={partIdx} className={part.cls}>
                              {part.text}
                            </span>
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span
                    className={`inline-block h-4 w-0.5 bg-primary transition-opacity duration-100 ${cursorOn ? "opacity-100" : "opacity-0"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
