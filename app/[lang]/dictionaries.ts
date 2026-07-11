import "server-only";

const dictionaries = {
  ar: () =>
    import("./dictionaries/ar.json").then((module) => module.default),
  en: () =>
    import("./dictionaries/en.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["ar", "en"];
export const defaultLocale: Locale = "ar";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();
