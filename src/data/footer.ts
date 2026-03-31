export type FooterLink = {
  id: string;
  label: string;
  href: string;
};

export type FooterData = {
  brandName: string;
  description: string;
  copyright: string;
  navigation: FooterLink[];
  socialLinks: FooterLink[];
};

export const footerData: FooterData = {
  brandName: "Juan Patiño",
  description:
    "Portafolio personal enfocado en desarrollo web, interfaces modernas y construcción de soluciones digitales con criterio técnico y visual.",
  copyright: "© 2026 Juan Patiño. Todos los derechos reservados.",
  navigation: [
    { id: "home", label: "Inicio", href: "#hero" },
    { id: "projects", label: "Proyectos", href: "#projects" },
    { id: "education", label: "Formación", href: "#education" },
    { id: "about", label: "Conóceme", href: "#about" },
    { id: "skills", label: "Habilidades", href: "#skills" },
    { id: "testimonials", label: "Testimonios", href: "#testimonials" },
    { id: "contact", label: "Contacto", href: "#contact" },
  ],
  socialLinks: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/tuusuario",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/tuusuario",
    },
    {
      id: "email",
      label: "Correo",
      href: "mailto:juan@example.com",
    },
  ],
};