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
  label: string;
  icon: typeof Home;
  isRoute?: boolean;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", label: "Ana Sayfa", icon: Home, isRoute: true },
  { href: "#urunler", label: "Ürünler", icon: ShoppingBag },
  { href: "#manifesto", label: "Manifesto", icon: FileText },
  { href: "/blog", label: "Blog", icon: BookOpen, isRoute: true },
  { href: "/analiz", label: "Finansal Analiz", icon: BarChart3, isRoute: true },
  { href: "/kod-odasi", label: "Kod Odası", icon: MessageSquareText, isRoute: true },
];

export default function Sidebar() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme, switchable } = useTheme();
  const { language, setLanguage } = useI18n();

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
      // Section scroll - navigate to home first if not there
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

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 rounded-lg transition-colors"
        style={{ 
          background: '#0D1117', 
          border: '1px solid #1E2D3D',
          color: '#F0F4F8'
        }}
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Logo - top right */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <a href="/" onClick={(e) => { e.preventDefault(); setLocation("/"); }}>
          <img
            src="/assets/fk-logo-new.png"
            alt="Finans Kodu Logo"
            className="h-8 w-auto"
          />
        </a>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ${
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{ 
          width: '220px',
          background: '#050810',
          borderRight: '1px solid #1E2D3D'
        }}
        role="navigation"
        aria-label="Ana navigasyon"
      >
        {/* Logo */}
        <div className="p-5 pb-3 flex items-center gap-3" style={{ borderBottom: '1px solid #1E2D3D' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); setLocation("/"); }} className="flex items-center gap-3">
            <img
              src="/assets/fk-logo-new.png"
              alt="Finans Kodu Logo"
              className="h-8 w-auto"
            />
            <span className="font-mono text-xs font-semibold tracking-[0.08em]" style={{ color: '#0EA5E9' }}>
              FK
            </span>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                  active ? "" : "hover:bg-[#141B24]"
                }`}
                style={{
                  background: active ? '#0EA5E910' : 'transparent',
                  borderLeft: active ? '2px solid #0EA5E9' : '2px solid transparent',
                  color: active ? '#0EA5E9' : '#8899AA',
                }}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className="text-sm font-medium font-sans">{item.label}</span>
                {active && (
                  <ChevronRight size={14} className="ml-auto opacity-60" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Spacer - pushes controls to bottom */}
        <div style={{ flexGrow: 1 }} />

        {/* Theme & Language Controls */}
        <div 
          className="px-3 py-4 flex flex-col gap-3"
          style={{ borderTop: '1px solid #1E2D3D' }}
        >
          {/* Theme Toggle */}
          {switchable && toggleTheme && (
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-[#141B24]"
              style={{ color: '#8899AA' }}
              aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
              title={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
            >
              {theme === "dark" ? (
                <Sun size={18} className="flex-shrink-0" />
              ) : (
                <Moon size={18} className="flex-shrink-0" />
              )}
              <span className="text-sm font-medium font-sans">
                {theme === "dark" ? "Açık Tema" : "Koyu Tema"}
              </span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-[#141B24]"
            style={{ color: '#8899AA' }}
            aria-label={language === "tr" ? "Switch to English" : "Türkçe'ye geç"}
            title={language === "tr" ? "Switch to English" : "Türkçe'ye geç"}
          >
            <span className="flex-shrink-0 text-sm font-bold w-[18px] text-center">
              {language === "tr" ? "EN" : "TR"}
            </span>
            <span className="text-sm font-medium font-sans">
              {language === "tr" ? "English" : "Türkçe"}
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4" style={{ borderTop: '1px solid #1E2D3D' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
            <span className="text-xs font-mono" style={{ color: '#8899AA' }}>
              v2.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
