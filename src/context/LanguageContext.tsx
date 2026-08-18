import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage } from '../types';
import { translations, LANGUAGE_OPTIONS } from '../locales';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  languageOptions: typeof LANGUAGE_OPTIONS;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'schoolsaathi_selected_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage;
      if (saved && translations[saved]) {
        return saved;
      }
    } catch {
      // Ignore
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    // Set html dir for RTL if Urdu is selected
    if (language === 'ur') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language] || translations.en;
    if (dict && dict[key]) {
      return dict[key];
    }
    const fallbackDict = translations.en;
    return fallbackDict[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageOptions: LANGUAGE_OPTIONS }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
