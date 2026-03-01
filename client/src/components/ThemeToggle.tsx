import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 px-4 py-2 w-full rounded-md text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors"
      aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
    >
      {/* Icon */}
      {isDark ? <Sun size={20} className="flex-shrink-0" /> : <Moon size={20} className="flex-shrink-0" />}

      {/* Label */}
      <span className="flex-1 text-sm">{isDark ? 'Açık Tema' : 'Koyu Tema'}</span>

      {/* Toggle Switch */}
      <div
        className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
          isDark ? 'bg-cyan-500' : 'bg-muted-foreground/30'
        }`}
        aria-hidden="true"
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            isDark ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </div>
    </button>
  );
}
