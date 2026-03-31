import type { Locale } from "@/src/lib/i18n/types";
import type { TranslationSchema } from "@/src/lib/i18n/schema";
import { esDictionary } from "@/src/lib/i18n/dictionaries/es";
import { enDictionary } from "@/src/lib/i18n/dictionaries/en";

export const translations: Record<Locale, TranslationSchema> = {
  es: esDictionary,
  en: enDictionary,
};