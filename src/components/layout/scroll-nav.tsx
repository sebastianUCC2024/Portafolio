"use client";

import { useEffect, useState } from "react";
import { navigationItems } from "@/src/data/navigation";
import { useLanguage } from "@/src/components/providers/language-provider";

export default function ScrollNav() {
  const { dictionary } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Muestra la barra solo despues de hacer un poco de scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setIsVisible(scrollTop > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detecta que seccion esta visible con IntersectionObserver
  useEffect(() => {
    const sectionIds = navigationItems.map((item) => item.href.replace("#", ""));

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Navegacion por secciones"
      className={`fixed right-5 top-1/2 z-40 -translate-y-1/2 hidden lg:flex flex-col items-center gap-1 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6 pointer-events-none"
      }`}
    >
      {/* Linea de progreso de fondo */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-border" />

      {/* Linea de progreso activa */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-px bg-primary transition-all duration-200 origin-top"
        style={{ height: `${scrollProgress * 100}%` }}
      />

      {navigationItems.map((item) => {
        const isActive = activeSection === item.href.replace("#", "");
        const label = dictionary.navigation[item.key as keyof typeof dictionary.navigation];

        return (
          <button
            key={item.href}
            type="button"
            onClick={() => handleClick(item.href)}
            aria-label={`Ir a ${label}`}
            className="group relative flex items-center justify-center py-1.5"
          >
            {/* Tooltip a la izquierda */}
            <span
              className={`absolute right-7 whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium shadow-lg pointer-events-none select-none transition-all duration-200 ${
                isActive
                  ? "opacity-100 translate-x-0 text-primary"
                  : "opacity-0 translate-x-2 text-muted-foreground group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {label}
            </span>

            {/* Punto del indicador */}
            <span
              className={`relative z-10 block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-3 w-3 bg-primary shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                  : "h-2 w-2 bg-border group-hover:bg-primary/50 group-hover:scale-125"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
