import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-full justify-start gap-3 px-4 py-2 text-foreground/80 hover:bg-secondary hover:text-foreground"
      aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}
    >
      {theme === 'dark' ? (
        <>
          <Sun size={20} />
          <span>Açık Tema</span>
        </>
      ) : (
        <>
          <Moon size={20} />
          <span>Koyu Tema</span>
        </>
      )}
    </Button>
  );
}
