"use client";

import { useState } from "react";
import Container from "@/src/components/layout/container";
import { navigationItems } from "@/src/data/navigation";
import { useLanguage } from "@/src/components/providers/language-provider";
import { useTheme } from "@/src/components/providers/theme-provider";

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dictionary, toggleLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl animate-fade-in-down">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <a
            href="#hero"
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-foreground transition-colors duration-300 hover:text-primary"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_rgba(25,230,179,0.45)] animate-pulse-slow" />
            <span>{dictionary.navbar.brand}</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigationItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-primary animate-fade-in-down"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {
                  dictionary.navigation[
                    item.key as keyof typeof dictionary.navigation
                  ]
                }
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:scale-105"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              type="button"
              onClick={toggleLocale}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
            >
              {dictionary.navbar.languageLabel}
            </button>

            <a
              href="#contact"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              {dictionary.navbar.contact}
            </a>
          </div>

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? dictionary.navbar.closeMenu
                : dictionary.navbar.openMenu
            }
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary lg:hidden"
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
            isMenuOpen ? "max-h-[500px] pb-6" : "max-h-0"
          }`}
        >
          <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-md">
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleCloseMenu}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-accent hover:text-primary"
                >
                  {
                    dictionary.navigation[
                      item.key as keyof typeof dictionary.navigation
                    ]
                  }
                </a>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
                >
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                  <span>{theme === "dark" ? "Modo claro" : "Modo oscuro"}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleLocale}
                  className="flex h-12 flex-1 items-center justify-center rounded-full border border-border text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
                >
                  {dictionary.navbar.mobileLanguageLabel}
                </button>
              </div>

              <a
                href="#contact"
                onClick={handleCloseMenu}
                className="rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-primary/25"
              >
                {dictionary.navbar.contact}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
