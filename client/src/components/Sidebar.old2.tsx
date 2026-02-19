import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Home, ShoppingBag, FileText, BarChart3, MessageSquareText,
  BookOpen, Menu, X, ChevronRight, Sun, Moon
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useI18n } from "@/contexts/I18nContext";

interface NavItem {
  href: string;
  labelKey: string;
  icon: typeof Home;
  isRoute?: boolean;
}

const navItems: NavItem[] = [
  { href: "/",          labelKey: "nav.home",     icon: Home,              isRoute: true },
  { href: "#urunler",   labelKey: "nav.products", icon: ShoppingBag },
  { href: "#manifesto", labelKey: "nav.manifesto",icon: FileText },
  { href: "/blog",      labelKey: "nav.blog",     icon: BookOpen,          isRoute: true },
  { href: "/analiz",    labelKey: "nav.analysis", icon: BarChart3,         isRoute: true },
  { href: "/kod-odasi", labelKey: "nav.kodOdasi", icon: MessageSquareText, isRoute: true },
];

export default function Sidebar() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme, switchable } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const isDark = theme === "dark";

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavClick = (item: NavItem) => {
    if (item.isRoute) {
      setLocation(item.href);
    } else {
      if (location !== "/") {
        setLocation("/");
        setTimeout(() => {
          document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (isMobile) setIsOpen(false);
  };

  const isActive = (item: NavItem) => {
    if (item.isRoute) {
      if (item.href === "/") return location === "/";
      return location.startsWith(item.href);
    }
    return false;
  };

  // Theme-reactive palette — sidebar uses explicit hex to avoid Tailwind dark: class conflicts
  const pal = {
    bg:          isDark ? "#050810" : "#EEF2F7",
    border:      isDark ? "#1E2D3D" : "#CBD5E1",
    text:        isDark ? "#8899AA" : "#64748B",
    activeBg:    isDark ? "rgba(14,165,233,0.06)" : "rgba(59,130,246,0.08)",
    activeBorder:isDark ? "#0EA5E9" : "#3B82F6",
    activeColor: isDark ? "#0EA5E9" : "#2563EB",
    hover:       isDark ? "#141B24" : "#E2E8F0",
    mobileBg:    isDark ? "#0D1117" : "#FFFFFF",
    mobileColor: isDark ? "#F0F4F8" : "#1E293B",
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 rounded-lg"
        style={{ background: pal.mobileBg, border: `1px solid ${pal.border}`, color: pal.mobileColor }}
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Logo */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <a href="/" onClick={(e) => { e.preventDefault(); setLocation("/"); }}>
          <img src="/assets/fk-logo-new.png" alt="Finans Kodu Logo" className="h-8 w-auto" />
        </a>
      </div>

      {/* Backdrop */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ${
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{ width: "220px", background: pal.bg, borderRight: `1px solid ${pal.border}` }}
        role="navigation"
        aria-label="Ana navigasyon"
      >
        {/* Logo */}
        <div className="p-5 pb-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${pal.border}` }}>
          <a href="/" onClick={(e) => { e.preventDefault(); setLocation("/"); }} className="flex items-center gap-3">
            <img src="/assets/fk-logo-new.png" alt="Finans Kodu Logo" className="h-8 w-auto" />
            <span className="font-mono text-xs font-semibold tracking-[0.08em]" style={{ color: pal.activeBorder }}>FK</span>
          </a>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left group"
                style={{
                  background: active ? pal.activeBg : "transparent",
                  borderLeft: `2px solid ${active ? pal.activeBorder : "transparent"}`,
                  color: active ? pal.activeColor : pal.text,
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = pal.hover; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className="text-sm font-medium font-sans">{t(item.labelKey)}</span>
                {active && <ChevronRight size={14} className="ml-auto opacity-60" />}
              </button>
            );
          })}
        </nav>

        <div className="flex-grow" />

        {/* Controls */}
        <div className="px-3 py-4 flex flex-col gap-2" style={{ borderTop: `1px solid ${pal.border}` }}>
          {switchable && toggleTheme && (
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left"
              style={{ color: pal.text }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = pal.hover; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              aria-label={isDark ? t("theme.light") : t("theme.dark")}
            >
              {isDark ? <Sun size={18} className="flex-shrink-0" /> : <Moon size={18} className="flex-shrink-0" />}
              <span className="text-sm font-medium font-sans">
                {isDark ? t("theme.light") : t("theme.dark")}
              </span>
            </button>
          )}

          <button
            onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left"
            style={{ color: pal.text }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = pal.hover; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            aria-label={language === "tr" ? "Switch to English" : "Türkçe'ye geç"}
          >
            <span className="flex-shrink-0 text-sm font-bold w-[18px] text-center">
              {language === "tr" ? "EN" : "TR"}
            </span>
            <span className="text-sm font-medium font-sans">
              {language === "tr" ? t("language.en") : t("language.tr")}
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4" style={{ borderTop: `1px solid ${pal.border}` }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
            <span className="text-xs font-mono" style={{ color: pal.text }}>v2.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}
