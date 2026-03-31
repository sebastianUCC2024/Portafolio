"use client";

import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

export default function TestimonialsSection() {
  const { dictionary } = useLanguage();

  return (
    <section
      id="testimonials"
      className="border-b border-white/5 py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            {dictionary.testimonialsSection.badge}
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {dictionary.testimonialsSection.title}
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
            {dictionary.testimonialsSection.description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {dictionary.testimonialsSection.items.map((testimonial) => (
            <article
              key={testimonial.id}
              className="group rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,24,33,0.94),rgba(11,15,20,0.98))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:-translate-y-1 sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  {dictionary.testimonialsSection.cardBadge}
                </span>

                <span className="text-white/20 transition-colors duration-300 group-hover:text-primary/40">
                  “”
                </span>
              </div>

              <p className="mt-6 text-sm leading-7 text-white/72 sm:text-base">
                {testimonial.quote}
              </p>

              <div className="mt-8 border-t border-white/8 pt-5">
                <h3 className="text-base font-semibold text-foreground">
                  {testimonial.name}
                </h3>
                <p className="mt-1 text-sm text-white/60">
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