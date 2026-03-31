export type EducationItem = {
  badge: string;
  institution: string;
  program: string;
  period: string;
  description: string;
  focusAreas: string[];
  achievements: string[];
};

export const education: EducationItem = {
  badge: "Formación académica",
  institution: "Universidad Cooperativa de Colombia",
  program: "Ingeniería de Software",
  period: "En curso",
  description:
    "Proceso de formación enfocado en desarrollo de software, lógica de programación, diseño de interfaces, bases de datos y construcción de soluciones digitales con visión práctica y profesional.",
  focusAreas: [
    "Programación estructurada",
    "Bases de datos",
    "Desarrollo web",
    "Buenas prácticas de software",
  ],
  achievements: [
    "Enfoque en resolución de problemas",
    "Construcción de proyectos académicos",
    "Aprendizaje progresivo en backend y frontend",
    "Fortalecimiento de lógica y arquitectura",
  ],
};