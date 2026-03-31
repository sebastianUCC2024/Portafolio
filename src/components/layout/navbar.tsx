"use client";

import { useState } from "react";
import Container from "./container";
import { navigationItems } from "@/src/data/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-background/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <a
            href="#hero"
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-foreground transition-colors duration-300 hover:text-primary"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_rgba(25,230,179,0.45)]" />
            <span>Juan Patiño</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/65 transition-all duration-300 hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-primary/40 hover:text-primary"
            >
              ES
            </button>

            <button
              type="button"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02]"
            >
              Contáctame
            </button>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/80 transition-all duration-300 hover:border-primary/40 hover:text-primary lg:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div className="rounded-3xl border border-white/8 bg-card/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleCloseMenu}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-white/75 transition-all duration-300 hover:bg-white/5 hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/8 pt-4">
              <button
                type="button"
                className="rounded-full border border-white/10 px-4 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-primary/40 hover:text-primary"
              >
                Idioma: ES
              </button>

              <a
                href="#contact"
                onClick={handleCloseMenu}
                className="rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.01]"
              >
                Contáctame
              </a>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}