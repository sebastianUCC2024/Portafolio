"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

export default function SkillsSection() {
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
      id="skills"
      className="border-b border-border bg-accent py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className={`max-w-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            {dictionary.skillsSection.badge}
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {dictionary.skillsSection.title}
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            {dictionary.skillsSection.description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {dictionary.skillsSection.categories.map((category, index) => (
            <article
              key={category.id}
              className={`rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)] hover:border-primary/20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 150}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  {category.items.length} {dictionary.skillsSection.itemsLabel}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {category.items.map((item, itemIndex) => (
                  <span
                    key={item}
                    className={`rounded-full border border-border bg-accent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:scale-105 hover:-translate-y-0.5 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
                    style={{ animationDelay: `${(index + 1) * 150 + itemIndex * 50}ms`, animationFillMode: "forwards" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
