export type ProjectItem = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
};

export const projects: ProjectItem[] = [
  {
    id: "interactive-dashboard",
    eyebrow: "01 / Proyecto",
    title: "Dashboard Interactivo",
    description:
      "Aplicación desarrollada para visualizar información de forma clara mediante componentes modernos, métricas resumidas y una interfaz enfocada en legibilidad.",
    features: [
      "Diseño de interfaz visual",
      "Manejo de datos",
      "Visualización estructurada",
    ],
    technologies: ["TypeScript", "HTML", "CSS"],
    primaryAction: {
      label: "Ver proyecto",
      href: "#",
    },
    secondaryAction: {
      label: "Ver código",
      href: "#",
    },
  },
  {
    id: "checkout-system",
    eyebrow: "02 / Proyecto",
    title: "Sistema de Checkout",
    description:
      "Interfaz que simula el flujo de compra de un usuario, desde la selección de productos hasta la confirmación, priorizando una experiencia clara y funcional.",
    features: [
      "Lógica de compra",
      "Validación visual",
      "Experiencia de usuario",
    ],
    technologies: ["JavaScript", "HTML", "CSS"],
    primaryAction: {
      label: "Ver proyecto",
      href: "#",
    },
    secondaryAction: {
      label: "Ver código",
      href: "#",
    },
  },
  {
    id: "resource-management",
    eyebrow: "03 / Proyecto",
    title: "Gestión de Recursos",
    description:
      "Sistema enfocado en la organización visual de recursos, procesos y datos, con una estructura limpia pensada para contextos administrativos o académicos.",
    features: [
      "Estructura ordenada",
      "Flujos visuales",
      "Organización funcional",
    ],
    technologies: ["Python", "Django"],
    primaryAction: {
      label: "Ver proyecto",
      href: "#",
    },
    secondaryAction: {
      label: "Ver código",
      href: "#",
    },
  },
  {
    id: "servermc",
    eyebrow: "04 / Proyecto",
    title: "ServerMC",
    description:
      "Proyecto orientado a la creación y configuración de un entorno de servidor, con énfasis en estructura técnica, rendimiento y organización del sistema.",
    features: [
      "Configuración técnica",
      "Optimización básica",
      "Gestión del entorno",
    ],
    technologies: ["Linux", "Redes"],
    primaryAction: {
      label: "Explorar",
      href: "#",
    },
    secondaryAction: {
      label: "Detalles",
      href: "#",
    },
  },
];