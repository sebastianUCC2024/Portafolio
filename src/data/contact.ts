export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
};

export type ContactData = {
  badge: string;
  title: string;
  description: string;
  links: ContactLink[];
};

export const contactData: ContactData = {
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
};