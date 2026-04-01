export type NavigationItem = {
  key: "hero" | "projects" | "education" | "about" | "skills" | "piano" | "testimonials" | "contact";
  href: string;
};

export const navigationItems: NavigationItem[] = [
  {
    key: "hero",
    href: "#hero",
  },
  {
    key: "projects",
    href: "#projects",
  },
  {
    key: "education",
    href: "#education",
  },
  {
    key: "about",
    href: "#about",
  },
  {
    key: "skills",
    href: "#skills",
  },
  {
    key: "piano",
    href: "#piano",
  },
  {
    key: "testimonials",
    href: "#testimonials",
  },
  {
    key: "contact",
    href: "#contact",
  },
];
