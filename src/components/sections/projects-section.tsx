"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/src/components/layout/container";
import ProjectCard from "@/src/components/sections/project-card";
import { useLanguage } from "@/src/components/providers/language-provider";

export default function ProjectsSection() {
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
      id="projects"
      className="border-b border-border py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className={`max-w-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            {dictionary.projectsSection.badge}
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {dictionary.projectsSection.title}
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            {dictionary.projectsSection.description}
          </p>
        </div>

        <div className="mt-12">
          {dictionary.projectsSection.items.map((project, index) => (
            <div
              key={project.id}
              className={isVisible ? "animate-fade-in-up" : "opacity-0"}
              style={{ animationDelay: `${(index + 1) * 150}ms`, animationFillMode: "forwards" }}
            >
              <ProjectCard
                project={project}
                previewLabel={dictionary.projectsSection.previewLabel}
                reverse={index % 2 !== 0}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
