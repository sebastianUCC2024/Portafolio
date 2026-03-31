import type { Locale } from "@/src/lib/i18n/types";

export const translations = {
  es: {
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
      education: "Formación",
      about: "Conóceme",
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
    },
  },
  en: {
    navbar: {
      brand: "Juan Patiño",
      contact: "Contact me",
      languageLabel: "EN",
      mobileLanguageLabel: "Language: EN",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    navigation: {
      hero: "Home",
      projects: "Projects",
      education: "Education",
      about: "About",
      skills: "Skills",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    hero: {
      badge: "Professional personal portfolio",
      titleStart: "Hi, I'm",
      titleHighlight: "Juan",
      titleEnd: "Patiño",
      description:
        "I am a Software Engineering student focused on building modern, clean and functional digital experiences with a professional web development mindset.",
      primaryAction: "View projects",
      secondaryAction: "Contact me",
      stats: {
        projects: "Projects",
        semester: "Semester",
        technologies: "Technologies",
      },
    },
  },
} satisfies Record<Locale, unknown>;