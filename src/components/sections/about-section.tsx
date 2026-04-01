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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

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
          {/* Columna izquierda: texto */}
          <div className={`max-w-2xl ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              {dictionary.aboutSection.badge}
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-balance">
              {dictionary.aboutSection.title}
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              {dictionary.aboutSection.description}
            </p>

            <div className="mt-8 space-y-5">
              {dictionary.aboutSection.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`text-sm leading-7 text-muted-foreground sm:text-base ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${(index + 2) * 150}ms`, animationFillMode: "forwards" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {dictionary.aboutSection.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={`rounded-full border border-border bg-accent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:scale-105 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
                  style={{ animationDelay: `${400 + index * 50}ms`, animationFillMode: "forwards" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Columna derecha: foto + card */}
          <aside className={`relative ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            {/* Foto de perfil */}
            <div className="mb-6 flex items-center gap-5 rounded-[2rem] border border-border bg-card p-5 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-primary/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <Image
                  src="/images/profile.jpg"
                  alt="Juan Patino"
                  fill
                  className="object-cover object-center"
                  crossOrigin="anonymous"
                />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                  Desarrollador
                </p>
                <h3 className="mt-0.5 text-xl font-bold text-foreground">
                  Juan Patiño
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  Disponible para proyectos
                </div>
              </div>
            </div>

            {/* Card de perfil */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:border-primary/20">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_40%)]" />

              <div className="relative inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                {dictionary.aboutSection.profileBadge}
              </div>

              <h3 className="relative mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {dictionary.aboutSection.highlightTitle}
              </h3>

              <p className="relative mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                {dictionary.aboutSection.highlightText}
              </p>

              <div className="relative mt-8 border-t border-border pt-6">
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                  {dictionary.aboutSection.strengthsTitle}
                </h4>

                <ul className="mt-5 space-y-3">
                  {dictionary.aboutSection.strengths.map((item, index) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 rounded-2xl border border-border bg-accent px-4 py-3 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/20 hover:text-foreground ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                      style={{ animationDelay: `${300 + index * 100}ms`, animationFillMode: "forwards" }}
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
