import Container from "@/src/components/layout/container";
import ProjectCard from "@/src/components/sections/project-card";
import { projects } from "@/src/data/projects";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="border-b border-white/5 py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            Proyectos destacados
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Mis Proyectos
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
            Una selección de proyectos enfocados en desarrollo web, estructura
            visual y construcción de interfaces limpias, funcionales y modernas.
          </p>
        </div>

        <div className="mt-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}