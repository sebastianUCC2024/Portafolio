export type AboutData = {
  badge: string;
  title: string;
  description: string;
  paragraphs: string[];
  tags: string[];
  highlightTitle: string;
  highlightText: string;
  strengths: string[];
};

export const aboutData: AboutData = {
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
  highlightTitle: "Mi enfoque",
  highlightText:
    "Busco crear experiencias digitales sobrias, modernas y útiles, con especial atención a la estructura, la claridad visual y la calidad del código.",
  strengths: [
    "Adaptabilidad al aprendizaje",
    "Interés por buenas prácticas",
    "Organización visual y técnica",
    "Enfoque en crecimiento profesional",
  ],
};