"use client";

import { useEffect, useState } from "react";
import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

const quickStats = [
  { value: "4", key: "projects" },
  { value: "5", key: "semester" },
  { value: "3+", key: "technologies" },
] as const;

const codeSnippet = `const developer = {
  name: "Juan Patiño",
  role: "Software Engineer",
  skills: ["Python", "TypeScript", "React"],
  passion: "Building great UX"
};`;

export default function HeroSection() {
  const { dictionary } = useLanguage();
  const [typedCode, setTypedCode] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= codeSnippet.length) {
        setTypedCode(codeSnippet.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border py-20 sm:py-24 lg:py-32"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.1),transparent_35%)]" />
        <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Animated grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-primary animate-fade-in-up opacity-0"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {dictionary.hero.badge}
            </span>

            {/* Title */}
            <h1
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl animate-fade-in-up opacity-0"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <span className="text-muted-foreground">{dictionary.hero.titleStart}</span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
                  {dictionary.hero.titleHighlight}
                </span>
                <span className="absolute -bottom-1 left-0 h-3 w-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg" />
              </span>
              <br />
              <span className="text-foreground">{dictionary.hero.titleEnd}</span>
            </h1>

            {/* Description */}
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg animate-fade-in-up opacity-0"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              {dictionary.hero.description}
            </p>

            {/* CTA Buttons */}
            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-in-up opacity-0"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-2">
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
            <div className="mt-12 grid max-w-md grid-cols-3 gap-4">
              {quickStats.map((stat, index) => (
                <div
                  key={stat.key}
                  className="group rounded-2xl border border-border bg-card/60 px-4 py-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 animate-fade-in-up opacity-0"
                  style={{
                    animationDelay: `${500 + index * 100}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <p className="text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                    {stat.value}
                    {stat.key === "semester" && <span className="text-lg align-top text-primary">o</span>}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {dictionary.hero.stats[stat.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div
            className="relative mx-auto w-full max-w-lg lg:max-w-none animate-scale-in opacity-0"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            {/* Floating tags */}
            {dictionary.hero.floatingTags.map((label, index) => (
              <span
                key={label}
                className={`absolute z-20 hidden rounded-full border border-primary/25 bg-card/90 px-4 py-2 text-xs font-medium text-primary shadow-lg backdrop-blur-md sm:inline-flex animate-float ${
                  index === 0 ? "left-0 top-8" : "right-0 bottom-16"
                }`}
                style={{ animationDelay: `${index * 500}ms` }}
              >
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {label}
              </span>
            ))}

            {/* Main card with code editor */}
            <div className="relative rounded-[2rem] border border-border bg-card/80 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
              {/* Editor header */}
              <div className="flex items-center gap-2 rounded-t-[1.5rem] bg-accent/80 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-error/80" />
                  <span className="h-3 w-3 rounded-full bg-warning/80" />
                  <span className="h-3 w-3 rounded-full bg-success/80" />
                </div>
                <span className="ml-2 text-xs text-muted-foreground font-mono">developer.ts</span>
              </div>

              {/* Code editor content */}
              <div className="rounded-b-[1.5rem] bg-background/50 p-5 font-mono text-sm">
                <pre className="overflow-x-auto text-xs sm:text-sm leading-relaxed">
                  <code>
                    {typedCode.split("\n").map((line, i) => (
                      <div key={i} className="flex">
                        <span className="mr-4 select-none text-muted/50">{i + 1}</span>
                        <span className="text-muted-foreground">
                          {line.includes("const") && (
                            <>
                              <span className="text-primary">const</span>
                              {line.replace("const", "")}
                            </>
                          )}
                          {line.includes(":") && !line.includes("const") && (
                            <>
                              <span className="text-secondary">{line.split(":")[0]}</span>
                              <span className="text-muted">:</span>
                              <span className="text-primary-light">{line.split(":").slice(1).join(":")}</span>
                            </>
                          )}
                          {!line.includes(":") && !line.includes("const") && line}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
                <span
                  className={`inline-block h-5 w-2 bg-primary ${
                    cursorVisible ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/20 to-transparent backdrop-blur-sm" />
              <div className="absolute -top-4 -left-4 h-16 w-16 rounded-xl border border-secondary/20 bg-gradient-to-br from-secondary/20 to-transparent backdrop-blur-sm" />
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-50 blur-3xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
