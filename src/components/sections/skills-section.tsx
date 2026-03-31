import Container from "@/src/components/layout/container";
import { skillCategories } from "@/src/data/skills";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="border-b border-white/5 bg-white/[0.015] py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            Habilidades y tecnologías
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Stack y capacidades técnicas
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
            Una visión general de las tecnologías, herramientas y prácticas que
            estoy fortaleciendo para construir productos web funcionales, modernos
            y bien estructurados.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skillCategories.map((category) => (
            <article
              key={category.id}
              className="rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,24,33,0.92),rgba(11,15,20,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    {category.description}
                  </p>
                </div>

                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  {category.items.length} items
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/75 transition-colors duration-300 hover:border-primary/30 hover:text-primary"
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