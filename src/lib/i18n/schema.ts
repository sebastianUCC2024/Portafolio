export type TranslationSchema = {
  navbar: {
    brand: string;
    contact: string;
    languageLabel: string;
    mobileLanguageLabel: string;
    openMenu: string;
    closeMenu: string;
  };
  navigation: {
    hero: string;
    projects: string;
    education: string;
    about: string;
    skills: string;
    testimonials: string;
    contact: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
    stats: {
      projects: string;
      semester: string;
      technologies: string;
    };
    floatingTags: string[];
  };
  projectsSection: {
    badge: string;
    title: string;
    description: string;
    previewLabel: string;
    items: {
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      features: string[];
      technologies: string[];
      primaryAction: string;
      secondaryAction: string;
    }[];
  };
  educationSection: {
    badge: string;
    title: string;
    description: string;
    period: string;
    institution: string;
    program: string;
    body: string;
    focusTitle: string;
    focusAreas: string[];
    achievementsTitle: string;
    achievements: string[];
  };
  aboutSection: {
    badge: string;
    title: string;
    description: string;
    paragraphs: string[];
    tags: string[];
    profileBadge: string;
    highlightTitle: string;
    highlightText: string;
    strengthsTitle: string;
    strengths: string[];
  };
  skillsSection: {
    badge: string;
    title: string;
    description: string;
    itemsLabel: string;
    categories: {
      id: string;
      title: string;
      description: string;
      items: string[];
    }[];
  };
  testimonialsSection: {
    badge: string;
    title: string;
    description: string;
    cardBadge: string;
    items: {
      id: string;
      name: string;
      role: string;
      company: string;
      quote: string;
    }[];
  };
  contactSection: {
    badge: string;
    title: string;
    description: string;
    links: {
      id: string;
      label: string;
      value: string;
      href: string;
    }[];
    formBadge: string;
    formTitle: string;
    fields: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
    };
  };
  footer: {
    brandName: string;
    description: string;
    navigationTitle: string;
    connectionsTitle: string;
    copyright: string;
    backToTop: string;
    socialLinks: {
      id: string;
      label: string;
      href: string;
    }[];
  };
};