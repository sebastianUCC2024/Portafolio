"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

export default function EducationSection() {
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
      id="education"
      className="border-b border-border bg-accent py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className={`max-w-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            {dictionary.educationSection.badge}
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {dictionary.educationSection.title}
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            {dictionary.educationSection.description}
          </p>
        </div>

        <article className={`mt-12 overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_24px_70px_rgba(0,0,0,0.3)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:border-primary/20 ${isVisible ? "animate-scale-in" : "opacity-0"}`} style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary animate-pulse-slow">
                {dictionary.educationSection.period}
              </div>

              <p className="mt-6 text-sm font-medium text-primary">
                {dictionary.educationSection.institution}
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {dictionary.educationSection.program}
              </h3>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                {dictionary.educationSection.body}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                  {dictionary.educationSection.focusTitle}
                </h4>

                <ul className="mt-5 space-y-3">
                  {dictionary.educationSection.focusAreas.map((item, index) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                      style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: "forwards" }}
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                  {dictionary.educationSection.achievementsTitle}
                </h4>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {dictionary.educationSection.achievements.map((item, index) => (
                    <li
                      key={item}
                      className={`rounded-2xl border border-border bg-accent px-4 py-3 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/20 hover:text-foreground ${isVisible ? "animate-scale-in" : "opacity-0"}`}
                      style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: "forwards" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
