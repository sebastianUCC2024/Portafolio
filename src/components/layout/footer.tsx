"use client";

import Container from "@/src/components/layout/container";
import { navigationItems } from "@/src/data/navigation";
import { useLanguage } from "@/src/components/providers/language-provider";

export default function Footer() {
  const { dictionary } = useLanguage();

  return (
    <footer className="border-t border-white/6 bg-white/[0.02]">
      <Container>
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:gap-12 lg:py-16">
          <div className="max-w-md">
            <a
              href="#hero"
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-foreground transition-colors duration-300 hover:text-primary"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_rgba(25,230,179,0.4)]" />
              <span>{dictionary.footer.brandName}</span>
            </a>

            <p className="mt-5 text-sm leading-7 text-white/65">
              {dictionary.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              {dictionary.footer.navigationTitle}
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {navigationItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm text-white/70 transition-colors duration-300 hover:text-primary"
                >
                  {dictionary.navigation[item.key]}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              {dictionary.footer.connectionsTitle}
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {dictionary.footer.socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-sm text-white/70 transition-colors duration-300 hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/6 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{dictionary.footer.copyright}</p>
          <a
            href="#hero"
            className="inline-flex w-fit items-center text-white/55 transition-colors duration-300 hover:text-primary"
          >
            {dictionary.footer.backToTop}
          </a>
        </div>
      </Container>
    </footer>
  );
}