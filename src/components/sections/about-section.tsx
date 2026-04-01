"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

export default function AboutSection() {
  const { dictionary } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-b border-border py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">

          {/* Columna izquierda */}
          <div
            className={`max-w-2xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              {dictionary.aboutSection.badge}
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {dictionary.aboutSection.title}
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              {dictionary.aboutSection.description}
            </p>

            <div className="mt-8 space-y-5">
              {dictionary.aboutSection.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-muted-foreground sm:text-base"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.5s ease ${300 + index * 120}ms, transform 0.5s ease ${300 + index * 120}ms`,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {dictionary.aboutSection.tags.map((tag, index) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-accent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:scale-105"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.4s ease ${500 + index * 50}ms`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Columna derecha */}
          <aside
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Tarjeta con foto de perfil */}
            <div className="mb-5 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-primary/20">
                <Image
                  src="/images/profile.jpg"
                  alt="Juan Patino"
                  fill
                  sizes="64px"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Desarrollador
                </p>
                <h3 className="mt-0.5 text-base font-bold text-foreground">
                  Juan Patiño
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  Disponible para proyectos
                </div>
              </div>
            </div>

            {/* Tarjeta principal */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20">
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.07),transparent_50%)]" />

              <span className="relative inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                {dictionary.aboutSection.profileBadge}
              </span>

              <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {dictionary.aboutSection.highlightTitle}
              </h3>

              <p className="relative mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                {dictionary.aboutSection.highlightText}
              </p>

              <div className="relative mt-7 border-t border-border pt-5">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {dictionary.aboutSection.strengthsTitle}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {dictionary.aboutSection.strengths.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-border bg-accent px-4 py-3 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/20 hover:text-foreground"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: `opacity 0.4s ease ${400 + index * 100}ms`,
                      }}
                    >
                      <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

        </div>
      </Container>
    </section>
  );
}
