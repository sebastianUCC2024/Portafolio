"use client";

import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

export default function AboutSection() {
  const { dictionary } = useLanguage();

  return (
    <section
      id="about"
      className="border-b border-white/5 py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              {dictionary.aboutSection.badge}
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {dictionary.aboutSection.title}
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
              {dictionary.aboutSection.description}
            </p>

            <div className="mt-8 space-y-5">
              {dictionary.aboutSection.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-white/72 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {dictionary.aboutSection.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(25,230,179,0.12),transparent_40%)]" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,24,33,0.96),rgba(11,15,20,0.98))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-8">
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                {dictionary.aboutSection.profileBadge}
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {dictionary.aboutSection.highlightTitle}
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
                {dictionary.aboutSection.highlightText}
              </p>

              <div className="mt-8 border-t border-white/8 pt-6">
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                  {dictionary.aboutSection.strengthsTitle}
                </h4>

                <ul className="mt-5 space-y-3">
                  {dictionary.aboutSection.strengths.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/75"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
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