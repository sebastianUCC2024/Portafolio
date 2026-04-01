import type { TranslationSchema } from "@/src/lib/i18n/schema";

export const esDictionary: TranslationSchema = {
  navbar: {
    brand: "Juan Patiño",
    contact: "Contáctame",
    languageLabel: "ES",
    mobileLanguageLabel: "Idioma: ES",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  navigation: {
    hero: "Inicio",
    projects: "Proyectos",
    education: "Formacion",
    about: "Conoceme",
    skills: "Habilidades",
    testimonials: "Testimonios",
    contact: "Contacto",
  },
  hero: {
    badge: "Portafolio personal profesional",
    titleStart: "Hola, soy",
    titleHighlight: "Juan",
    titleEnd: "Patiño",
    description:
      "Soy estudiante de Ingeniería de Software y me enfoco en construir experiencias digitales modernas, limpias y funcionales, con una visión orientada al desarrollo web profesional.",
    primaryAction: "Ver proyectos",
    secondaryAction: "Contáctame",
    stats: {
      projects: "Proyectos",
      semester: "Semestre",
      technologies: "Tecnologías",
    },
    floatingTags: ["Python + Django", "TypeScript"],
  },
  projectsSection: {
    badge: "Proyectos destacados",
    title: "Mis Proyectos",
    description:
      "Una selección de proyectos enfocados en desarrollo web, estructura visual y construcción de interfaces limpias, funcionales y modernas.",
    previewLabel: "Vista previa",
    items: [
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
        primaryAction: "Ver proyecto",
        secondaryAction: "Ver código",
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
        primaryAction: "Ver proyecto",
        secondaryAction: "Ver código",
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
        primaryAction: "Ver proyecto",
        secondaryAction: "Ver código",
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
        primaryAction: "Explorar",
        secondaryAction: "Detalles",
      },
    ],
  },
  educationSection: {
    badge: "Formación académica",
    title: "Experiencia Académica",
    description:
      "Formación orientada al desarrollo de software con enfoque en lógica, estructura, construcción web y crecimiento técnico progresivo.",
    period: "En curso",
    institution: "Universidad Cooperativa de Colombia",
    program: "Ingeniería de Software",
    body:
      "Proceso de formación enfocado en desarrollo de software, lógica de programación, diseño de interfaces, bases de datos y construcción de soluciones digitales con visión práctica y profesional.",
    focusTitle: "Áreas de enfoque",
    focusAreas: [
      "Programación estructurada",
      "Bases de datos",
      "Desarrollo web",
      "Buenas prácticas de software",
    ],
    achievementsTitle: "Habilidades adquiridas",
    achievements: [
      "Enfoque en resolución de problemas",
      "Construcción de proyectos académicos",
      "Aprendizaje progresivo en backend y frontend",
      "Fortalecimiento de lógica y arquitectura",
    ],
  },
  aboutSection: {
    badge: "Conóceme",
    title: "Construyo soluciones con enfoque visual, técnico y funcional",
    description:
      "Me interesa desarrollar productos digitales que no solo funcionen bien, sino que también transmitan orden, claridad y una experiencia cuidada para el usuario.",
    paragraphs: [
      "Actualmente estoy fortaleciendo mis habilidades en desarrollo web, especialmente en tecnologías como Python, Django, TypeScript y herramientas modernas para interfaces.",
      "Disfruto aprender construyendo proyectos, entender cómo se organiza una arquitectura limpia y mejorar poco a poco tanto en frontend como en backend.",
    ],
    tags: [
      "Desarrollo web",
      "Interfaces modernas",
      "Arquitectura limpia",
      "Aprendizaje continuo",
      "Pensamiento lógico",
      "UI estructurada",
    ],
    profileBadge: "Perfil profesional",
    highlightTitle: "Mi enfoque",
    highlightText:
      "Busco crear experiencias digitales sobrias, modernas y útiles, con especial atención a la estructura, la claridad visual y la calidad del código.",
    strengthsTitle: "Fortalezas",
    strengths: [
      "Adaptabilidad al aprendizaje",
      "Interés por buenas prácticas",
      "Organización visual y técnica",
      "Enfoque en crecimiento profesional",
    ],
  },
  skillsSection: {
    badge: "Habilidades y tecnologías",
    title: "Stack y capacidades técnicas",
    description:
      "Una visión general de las tecnologías, herramientas y prácticas que estoy fortaleciendo para construir productos web funcionales, modernos y bien estructurados.",
    itemsLabel: "items",
    categories: [
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
    ],
  },
  testimonialsSection: {
    badge: "Testimonios y referencias",
    title: "Lo que dicen sobre mi trabajo",
    description:
      "Referencias que reflejan mi compromiso con el aprendizaje, la organización del trabajo y la construcción de soluciones digitales con criterio técnico y visual.",
    cardBadge: "Referencia",
    items: [
      {
        id: "testimonial-1",
        name: "Carlos Ramírez",
        role: "Docente",
        company: "Universidad",
        quote:
          "Juan ha demostrado compromiso constante con su aprendizaje, buena disposición para resolver problemas y una evolución clara en la construcción de proyectos de software.",
      },
      {
        id: "testimonial-2",
        name: "Laura Mendoza",
        role: "Compañera de proyecto",
        company: "Trabajo académico",
        quote:
          "Destaco su capacidad para organizar ideas, cuidar los detalles visuales y mantener una estructura limpia en el desarrollo de interfaces y entregables.",
      },
      {
        id: "testimonial-3",
        name: "Andrés Gómez",
        role: "Colaborador académico",
        company: "Equipo de desarrollo",
        quote:
          "Tiene una actitud muy positiva para aprender, mejorar y aportar. Sabe recibir retroalimentación y convertirla en avances concretos dentro del proyecto.",
      },
    ],
  },
  contactSection: {
    badge: "Contacto",
    title: "Hablemos sobre tu próximo proyecto o colaboración",
    description:
      "Si deseas ponerte en contacto conmigo para una oportunidad, colaboración o conversación profesional, puedes escribirme por cualquiera de estos medios.",
    links: [
      {
        id: "email",
        label: "Correo",
        value: "juan@example.com",
        href: "mailto:juan@example.com",
      },
      {
        id: "github",
        label: "GitHub",
        value: "github.com/tuusuario",
        href: "https://github.com/tuusuario",
      },
      {
        id: "location",
        label: "Ubicación",
        value: "Colombia",
        href: "#",
      },
    ],
    formBadge: "Formulario",
    formTitle: "Envíame un mensaje",
    fields: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Correo",
      emailPlaceholder: "tucorreo@email.com",
      subject: "Asunto",
      subjectPlaceholder: "Motivo del mensaje",
      message: "Mensaje",
      messagePlaceholder: "Cuéntame sobre tu proyecto o idea",
      submit: "Enviar mensaje",
    },
  },
  footer: {
    brandName: "Juan Patiño",
    description:
      "Portafolio personal enfocado en desarrollo web, interfaces modernas y construcción de soluciones digitales con criterio técnico y visual.",
    navigationTitle: "Navegación",
    connectionsTitle: "Conexiones",
    copyright: "© 2026 Juan Patiño. Todos los derechos reservados.",
    backToTop: "Volver arriba",
    socialLinks: [
      { id: "github", label: "GitHub", href: "https://github.com/tuusuario" },
      { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/tuusuario" },
      { id: "email", label: "Correo", href: "mailto:juan@example.com" },
    ],
  },
  pianoSection: {
    badge: "Interactivo",
    title: "Piano de Habilidades",
    description:
      "Cada tecla representa una de mis habilidades técnicas. Toca el piano con el mouse o usa las teclas del teclado (A, S, D, F, G, H, J, K para blancas y W, E, T, Y, U para negras) para descubrir mi stack tecnológico de una forma única.",
    placeholder: "Toca una tecla para ver la habilidad",
    whiteKeys: "Teclas blancas: A-K",
    blackKeys: "Teclas negras: W,E,T,Y,U",
    progress: "habilidades descubiertas",
  },
};
