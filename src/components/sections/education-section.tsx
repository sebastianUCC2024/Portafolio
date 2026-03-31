"use client";

import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

export default function EducationSection() {
  const { dictionary } = useLanguage();

  return (
    <section
      id="education"
      className="border-b border-white/5 bg-white/[0.02] py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            {dictionary.educationSection.badge}
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {dictionary.educationSection.title}
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
            {dictionary.educationSection.description}
          </p>
        </div>

        <article className="mt-12 overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,24,33,0.96),rgba(11,15,20,0.98))] shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="border-b border-white/8 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                {dictionary.educationSection.period}
              </div>

              <p className="mt-6 text-sm font-medium text-primary">
                {dictionary.educationSection.institution}
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {dictionary.educationSection.program}
              </h3>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                {dictionary.educationSection.body}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                  {dictionary.educationSection.focusTitle}
                </h4>

                <ul className="mt-5 space-y-3">
                  {dictionary.educationSection.focusAreas.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/75"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-white/8 pt-6">
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                  {dictionary.educationSection.achievementsTitle}
                </h4>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {dictionary.educationSection.achievements.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/75"
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