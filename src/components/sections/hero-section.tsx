"use client";

import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

const quickStats = [
  { value: "4", key: "projects" },
  { value: "5°", key: "semester" },
  { value: "3+", key: "technologies" },
] as const;

const floatingPositions = ["left-8 top-10", "right-8 bottom-12"] as const;

export default function HeroSection() {
  const { dictionary } = useLanguage();

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(25,230,179,0.12),transparent_28%),radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_22%)]" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-primary sm:text-xs animate-fade-in-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
              {dictionary.hero.badge}
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl animate-fade-in-up opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
              {dictionary.hero.titleStart}{" "}
              <span className="text-primary animate-pulse-slow">{dictionary.hero.titleHighlight}</span>
              <br />
              {dictionary.hero.titleEnd}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base animate-fade-in-up opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
              {dictionary.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-in-up opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                {dictionary.hero.primaryAction}
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:scale-105"
              >
                {dictionary.hero.secondaryAction}
              </a>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-3 sm:gap-4">
              {quickStats.map((stat, index) => (
                <div
                  key={stat.key}
                  className="rounded-2xl border border-border bg-card/70 px-4 py-4 backdrop-blur-sm hover-lift animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${500 + index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <p className="text-lg font-semibold text-foreground sm:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    {dictionary.hero.stats[stat.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none animate-scale-in opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
            <div className="relative flex min-h-[360px] items-center justify-center rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(18,24,33,0.92),rgba(11,15,20,0.96))] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:min-h-[420px] transition-transform duration-500 hover:scale-[1.02]">
              {dictionary.hero.floatingTags.map((label, index) => (
                <span
                  key={label}
                  className={`absolute hidden rounded-full border border-primary/20 bg-background/80 px-3 py-1.5 text-[11px] font-medium text-primary shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md sm:inline-flex animate-float ${floatingPositions[index]}`}
                  style={{ animationDelay: `${index * 500}ms` }}
                >
                  {label}
                </span>
              ))}

              <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-primary/15 bg-[radial-gradient(circle,rgba(25,230,179,0.12),rgba(18,24,33,0.2),transparent)] sm:h-64 sm:w-64">
                <div className="absolute inset-3 rounded-full border border-primary/10 animate-pulse-slow" />
                <div className="absolute inset-0 rounded-full animate-glow" />
                <div className="flex h-32 w-32 items-center justify-center rounded-full border border-border bg-card text-4xl font-semibold tracking-tight text-primary sm:h-36 sm:w-36 sm:text-5xl transition-transform duration-300 hover:scale-110">
                  JP
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
