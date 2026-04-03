import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import tr from '@/locales/tr.json';
import en from '@/locales/en.json';

type Language = 'tr' | 'en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = { tr, en };
const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Bu fonksiyon sadece ilk render'da çalışır.
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('fk-language') as Language;
      if (savedLang && ['tr', 'en'].includes(savedLang)) {
        return savedLang;
      }
    }
    return 'tr'; // Varsayılan dil
  });

  useEffect(() => {
    // Bu useEffect artık sadece 'language' state'i değiştiğinde çalışır.
    document.documentElement.lang = language;
    localStorage.setItem('fk-language', language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return String(value ?? key);
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
