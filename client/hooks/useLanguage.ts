import { useEffect, useState } from "react";

export type LanguageCode = "en" | "fr" | "pt";

const DEFAULT_LANGUAGE: LanguageCode = "en";

export function getInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem("kc-language");
  if (stored === "fr" || stored === "pt" || stored === "en") return stored;
  return DEFAULT_LANGUAGE;
}

export function useLanguage(): LanguageCode {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      const next = getInitialLanguage();
      setLanguage(next);
    };

    window.addEventListener("kc-language-change", handler as EventListener);
    return () => {
      window.removeEventListener("kc-language-change", handler as EventListener);
    };
  }, []);

  return language;
}
