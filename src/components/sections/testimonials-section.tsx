"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

export default function TestimonialsSection() {
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
      id="testimonials"
      className="border-b border-border py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className={`max-w-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            {dictionary.testimonialsSection.badge}
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {dictionary.testimonialsSection.title}
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            {dictionary.testimonialsSection.description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {dictionary.testimonialsSection.items.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className={`group rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.28)] hover:border-primary/20 sm:p-7 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 150}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  {dictionary.testimonialsSection.cardBadge}
                </span>

                <span className="text-3xl text-muted transition-all duration-300 group-hover:text-primary/40 group-hover:scale-110">
                  &ldquo;&rdquo;
                </span>
              </div>

              <p className="mt-6 text-sm leading-7 text-muted-foreground sm:text-base">
                {testimonial.quote}
              </p>

              <div className="mt-8 border-t border-border pt-5">
                <h3 className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {testimonial.name}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
