import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { translations } from "./translations";
import type { Language, TranslationKey } from "./translations";

const STORAGE_KEY = "axcc-lang";

function getInitialLang(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && stored in translations) return stored;
    const browser = navigator.language.slice(0, 2) as Language;
    if (browser in translations) return browser;
  } catch {}
  return "en";
}

type LanguageContextValue = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    return translations[lang][key] ?? translations["en"][key] ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
