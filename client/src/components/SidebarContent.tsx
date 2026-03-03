import { Link, useLocation } from 'wouter';
import { Home, BookOpen, MessageSquare, Package, User, Building2, FolderOpen, Library, Mail } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const navItems = [
  { href: '/', label: 'nav.home', icon: Home, external: false },
  { href: '/kurucu-stratejist', label: 'nav.kurucuStratejist', icon: User, external: false },
  { href: '/dijital-araclar', label: 'nav.products', icon: Package, external: false },
  { href: '/kurumsal', label: 'nav.kurumsal', icon: Building2, external: false },
  { href: '/blog', label: 'nav.blog', icon: BookOpen, external: false },
  { href: '/kod-odasi', label: 'nav.kodOdasi', icon: MessageSquare, external: true },
];

const bottomNavItems = [
  { href: '/projeler', label: 'nav.projeler', icon: FolderOpen, external: false },
  { href: '/kaynak-kutuphanesi', label: 'nav.kaynakKutuphanesi', icon: Library, external: false },
  { href: '/iletisim', label: 'nav.iletisim', icon: Mail, external: false },
];

interface SidebarContentProps {
  onLinkClick?: () => void;
}

export default function SidebarContent({ onLinkClick }: SidebarContentProps) {
  const { t } = useI18n();
  const [location] = useLocation();

  const renderNavItem = (item: typeof navItems[0]) => {
    const isActive = location === item.href;
    if (item.external) {
      return (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
          className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-foreground/80 hover:bg-secondary hover:text-foreground"
        >
          <item.icon size={20} />
          <span>{t(item.label)}</span>
        </a>
      );
    }
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
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-8 flex items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <rect width="32" height="32" rx="6" className="fill-primary/10" />
          <text x="16" y="22" fontFamily="var(--font-mono)" fontSize="16" fontWeight="700" textAnchor="middle" className="fill-primary">FK</text>
        </svg>
        <span className="font-mono text-lg font-bold text-foreground">finans<span className="text-primary">kodu</span></span>
      </div>

      {/* Ana Navigasyon */}
      <nav className="flex flex-col gap-1">
        {navItems.map(renderNavItem)}
      </nav>

      {/* Alt Navigasyon - Ayırıcı ile */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <nav className="flex flex-col gap-1">
          {bottomNavItems.map(renderNavItem)}
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t border-border flex flex-col gap-4">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
}
