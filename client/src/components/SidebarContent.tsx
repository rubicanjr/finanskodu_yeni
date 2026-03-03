import { Link, useLocation } from 'wouter';
import { Home, BookOpen, MessageSquare, Package, Building2, FolderOpen, Library, Mail } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const navItems = [
  { href: '/', label: 'nav.home', icon: Home, external: false },
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
  const [location, navigate] = useLocation();

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
      {/* Logo */}
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

      {/* FounderCard — nav ile bottom controls arasında */}
      <div className="mt-4 px-0 pb-0 flex-shrink-0">
        <a
          href="/kurucu-stratejist"
          onClick={(e) => { e.preventDefault(); onLinkClick?.(); navigate('/kurucu-stratejist'); }}
          className="group relative block rounded-xl p-3 transition-all duration-200 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(0,200,150,0.04) 100%)',
            border: '1px solid rgba(0,212,255,0.14)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.14)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Corner glow */}
          <div
            className="absolute -top-5 -right-5 w-20 h-20 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)' }}
          />

          {/* Eyebrow */}
          <p
            className="font-mono text-[8.5px] font-medium tracking-[.10em] uppercase mb-2"
            style={{ color: 'rgba(0,212,255,0.7)' }}
          >
            // Kurucu Stratejist
          </p>

          {/* Avatar + Info + Arrow */}
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,200,150,0.15))',
                  border: '1.5px solid rgba(0,212,255,0.25)',
                  color: '#00D4FF'
                }}
              >
                RC
              </div>
              {/* Online dot */}
              <div
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2"
                style={{ borderColor: 'var(--sidebar-bg, #0F1520)', boxShadow: '0 0 6px rgba(0,200,150,0.5)' }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Rubi Can İ.</p>
              <p className="font-mono text-[9.5px] text-muted-foreground/60 tracking-[.03em]">finanskodu.com</p>
            </div>

            {/* Arrow */}
            <svg
              className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(0,212,255,0.5)"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          {/* Social links */}
          <div
            className="flex gap-1.5 mt-2.5 pt-2.5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            {[
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rubi-can-icliyurek/' },
        { label: 'Twitter', href: 'https://x.com/finansk0du' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex-1 text-center font-mono text-[9px] font-semibold py-1.5 rounded-md transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--muted-foreground)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#00D4FF';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </a>
      </div>

      {/* Bottom Controls */}
      <div className="mt-auto pt-4 border-t border-border flex flex-col gap-4">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
}
