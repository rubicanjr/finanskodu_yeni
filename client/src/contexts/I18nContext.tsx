// client/src/contexts/I18nContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
// Çeviri dosyalarının doğru yolda olduğundan emin ol
import tr from '@/locales/tr.json';
import en from '@/locales/en.json';

type Language = 'tr' | 'en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = { tr, en };

const I18nContext = createContext<I18nContextType>({
  language: 'tr',
  setLanguage: () => console.warn('I18nProvider is not wrapping the application'),
  t: (key) => key,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');

  useEffect(() => {
    const savedLang = localStorage.getItem('fk-language') as Language;
    if (savedLang && ['tr', 'en'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('fk-language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return value ?? key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
