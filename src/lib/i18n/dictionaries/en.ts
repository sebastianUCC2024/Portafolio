import type { TranslationSchema } from "@/src/lib/i18n/schema";

export const enDictionary: TranslationSchema = {
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
    floatingTags: ["Python + Django", "TypeScript"],
  },
  projectsSection: {
    badge: "Featured projects",
    title: "My Projects",
    description:
      "A selection of projects focused on web development, visual structure and building clean, functional and modern interfaces.",
    previewLabel: "Preview",
    items: [
      {
        id: "interactive-dashboard",
        eyebrow: "01 / Project",
        title: "Interactive Dashboard",
        description:
          "Application designed to visualize information clearly through modern components, summarized metrics and an interface focused on readability.",
        features: [
          "Visual interface design",
          "Data handling",
          "Structured visualization",
        ],
        technologies: ["TypeScript", "HTML", "CSS"],
        primaryAction: "View project",
        secondaryAction: "View code",
      },
      {
        id: "checkout-system",
        eyebrow: "02 / Project",
        title: "Checkout System",
        description:
          "Interface that simulates a user purchase flow, from product selection to confirmation, prioritizing a clear and functional experience.",
        features: [
          "Purchase logic",
          "Visual validation",
          "User experience",
        ],
        technologies: ["JavaScript", "HTML", "CSS"],
        primaryAction: "View project",
        secondaryAction: "View code",
      },
      {
        id: "resource-management",
        eyebrow: "03 / Project",
        title: "Resource Management",
        description:
          "System focused on visual organization of resources, processes and data, with a clean structure designed for administrative or academic contexts.",
        features: [
          "Organized structure",
          "Visual flows",
          "Functional organization",
        ],
        technologies: ["Python", "Django"],
        primaryAction: "View project",
        secondaryAction: "View code",
      },
      {
        id: "servermc",
        eyebrow: "04 / Project",
        title: "ServerMC",
        description:
          "Project focused on creating and configuring a server environment, with emphasis on technical structure, performance and system organization.",
        features: [
          "Technical setup",
          "Basic optimization",
          "Environment management",
        ],
        technologies: ["Linux", "Networks"],
        primaryAction: "Explore",
        secondaryAction: "Details",
      },
    ],
  },
  educationSection: {
    badge: "Academic background",
    title: "Academic Experience",
    description:
      "Training focused on software development with emphasis on logic, structure, web building and progressive technical growth.",
    period: "In progress",
    institution: "Universidad Cooperativa de Colombia",
    program: "Software Engineering",
    body:
      "Training process focused on software development, programming logic, interface design, databases and building digital solutions with a practical and professional vision.",
    focusTitle: "Focus areas",
    focusAreas: [
      "Structured programming",
      "Databases",
      "Web development",
      "Software best practices",
    ],
    achievementsTitle: "Skills acquired",
    achievements: [
      "Problem-solving mindset",
      "Academic project development",
      "Progressive backend and frontend learning",
      "Stronger logic and architecture",
    ],
  },
  aboutSection: {
    badge: "About",
    title: "I build solutions with a visual, technical and functional approach",
    description:
      "I am interested in developing digital products that not only work well, but also communicate order, clarity and a carefully designed user experience.",
    paragraphs: [
      "I am currently strengthening my web development skills, especially in technologies such as Python, Django, TypeScript and modern interface tools.",
      "I enjoy learning by building projects, understanding how clean architecture is organized, and gradually improving in both frontend and backend.",
    ],
    tags: [
      "Web development",
      "Modern interfaces",
      "Clean architecture",
      "Continuous learning",
      "Logical thinking",
      "Structured UI",
    ],
    profileBadge: "Professional profile",
    highlightTitle: "My approach",
    highlightText:
      "I aim to create sober, modern and useful digital experiences, with special attention to structure, visual clarity and code quality.",
    strengthsTitle: "Strengths",
    strengths: [
      "Learning adaptability",
      "Interest in best practices",
      "Visual and technical organization",
      "Professional growth mindset",
    ],
  },
  skillsSection: {
    badge: "Skills and technologies",
    title: "Stack and technical capabilities",
    description:
      "An overview of the technologies, tools and practices I am strengthening to build functional, modern and well-structured web products.",
    itemsLabel: "items",
    categories: [
      {
        id: "frontend",
        title: "Frontend",
        description:
          "Technologies and tools focused on building modern, clean and responsive interfaces.",
        items: ["HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS", "Next.js"],
      },
      {
        id: "backend",
        title: "Backend",
        description:
          "Technical foundations for server logic, project organization and building functional applications.",
        items: ["Python", "Django", "REST APIs", "Basic architecture", "Authentication"],
      },
      {
        id: "database",
        title: "Databases",
        description:
          "Knowledge focused on modeling, information structure and data persistence.",
        items: ["SQL", "PostgreSQL", "Relational modeling", "Basic queries"],
      },
      {
        id: "workflow",
        title: "Workflow",
        description:
          "Tools and practices that support organized, maintainable and collaborative development.",
        items: ["Git", "GitHub", "Responsive Design", "Component-based design", "Structured UI"],
      },
    ],
  },
  testimonialsSection: {
    badge: "Testimonials and references",
    title: "What people say about my work",
    description:
      "References that reflect my commitment to learning, work organization and building digital solutions with technical and visual criteria.",
    cardBadge: "Reference",
    items: [
      {
        id: "testimonial-1",
        name: "Carlos Ramírez",
        role: "Teacher",
        company: "University",
        quote:
          "Juan has consistently shown commitment to learning, a strong willingness to solve problems and clear growth in building software projects.",
      },
      {
        id: "testimonial-2",
        name: "Laura Mendoza",
        role: "Project teammate",
        company: "Academic work",
        quote:
          "I would highlight his ability to organize ideas, care about visual details and maintain a clean structure in interface development and deliverables.",
      },
      {
        id: "testimonial-3",
        name: "Andrés Gómez",
        role: "Academic collaborator",
        company: "Development team",
        quote:
          "He has a very positive attitude toward learning, improving and contributing. He knows how to receive feedback and turn it into concrete progress within a project.",
      },
    ],
  },
  contactSection: {
    badge: "Contact",
    title: "Let’s talk about your next project or collaboration",
    description:
      "If you would like to contact me for an opportunity, collaboration or professional conversation, you can reach me through any of these channels.",
    links: [
      {
        id: "email",
        label: "Email",
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
        label: "Location",
        value: "Colombia",
        href: "#",
      },
    ],
    formBadge: "Form",
    formTitle: "Send me a message",
    fields: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      subject: "Subject",
      subjectPlaceholder: "Reason for your message",
      message: "Message",
      messagePlaceholder: "Tell me about your project or idea",
      submit: "Send message",
    },
  },
  footer: {
    brandName: "Juan Patiño",
    description:
      "Personal portfolio focused on web development, modern interfaces and building digital solutions with technical and visual criteria.",
    navigationTitle: "Navigation",
    connectionsTitle: "Connections",
    copyright: "© 2026 Juan Patiño. All rights reserved.",
    backToTop: "Back to top",
    socialLinks: [
      { id: "github", label: "GitHub", href: "https://github.com/tuusuario" },
      { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/tuusuario" },
      { id: "email", label: "Email", href: "mailto:juan@example.com" },
    ],
  },
  pianoSection: {
    badge: "Interactive",
    title: "Skills Piano",
    description:
      "Each key represents one of my technical skills. Play the piano with your mouse or use keyboard keys (A, S, D, F, G, H, J, K for white keys and W, E, T, Y, U for black keys) to discover my tech stack in a unique way.",
    placeholder: "Press a key to see the skill",
    whiteKeys: "White keys: A-K",
    blackKeys: "Black keys: W,E,T,Y,U",
    progress: "skills discovered",
  },
};
