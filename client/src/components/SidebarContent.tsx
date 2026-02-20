import { Link, useLocation } from 'wouter';
import { Home, BookOpen, MessageSquare, BarChart3 } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const navItems = [
  { href: '/', label: 'nav.home', icon: Home },
  { href: '/analiz', label: 'nav.analysis', icon: BarChart3 },
  { href: '/blog', label: 'nav.blog', icon: BookOpen },
  { href: '/kod-odasi', label: 'nav.kodOdasi', icon: MessageSquare },
];

interface SidebarContentProps {
  onLinkClick?: () => void;
}

export default function SidebarContent({ onLinkClick }: SidebarContentProps) {
  const { t } = useI18n();
  const [location] = useLocation();

  return (
    <div className="flex flex-col h-full p-4">
      <img src="/assets/fk-logo-new.png" alt="Finans Kodu" className="h-10 mb-8" />
      <nav className="flex flex-col gap-2">
        {navItems.map(item => {
          const isActive = location === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground/80 hover:bg-secondary hover:text-foreground'
              }`}
            >
              <item.icon size={20} />
              <span>{t(item.label)}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-border flex flex-col gap-4">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
}
