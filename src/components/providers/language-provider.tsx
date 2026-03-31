"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale } from "@/src/lib/i18n/types";
import { translations } from "@/src/lib/i18n/translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  dictionary: (typeof translations)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio-locale";

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);

    if (savedLocale === "es" || savedLocale === "en") {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  };

  const toggleLocale = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    setLocale(nextLocale);
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      dictionary: translations[locale],
    }),
    [locale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}