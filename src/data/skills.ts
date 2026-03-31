export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description:
      "Tecnologías y herramientas enfocadas en la construcción de interfaces modernas, limpias y responsivas.",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    id: "backend",
    title: "Backend",
    description:
      "Bases técnicas para lógica del servidor, organización del proyecto y construcción de aplicaciones funcionales.",
    items: ["Python", "Django", "APIs REST", "Arquitectura básica", "Autenticación"],
  },
  {
    id: "database",
    title: "Bases de datos",
    description:
      "Conocimientos orientados a modelado, estructura de información y persistencia de datos.",
    items: ["SQL", "PostgreSQL", "Modelado relacional", "Consultas básicas"],
  },
  {
    id: "workflow",
    title: "Flujo de trabajo",
    description:
      "Herramientas y prácticas que apoyan el desarrollo ordenado, mantenible y colaborativo.",
    items: ["Git", "GitHub", "Responsive Design", "Componentización", "UI estructurada"],
  },
];