export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
};

export const testimonials: TestimonialItem[] = [
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
];