import { useI18n } from '@/contexts/I18nContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useI18n();
  
  return (
    <div className="flex items-center justify-center gap-2">
      <button 
        onClick={() => setLanguage('tr')} 
        className={`p-2 rounded-md transition-colors ${
          language === 'tr' 
            ? 'bg-primary text-primary-foreground' 
            : 'hover:bg-secondary'
        }`}
        aria-label="Switch to Turkish"
      >
        TR
      </button>
      <button 
        onClick={() => setLanguage('en')} 
        className={`p-2 rounded-md transition-colors ${
          language === 'en' 
            ? 'bg-primary text-primary-foreground' 
            : 'hover:bg-secondary'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
