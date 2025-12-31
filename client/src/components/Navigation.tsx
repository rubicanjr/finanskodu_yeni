/*
  DESIGN: Cyber Finance Navigation
  - Floating glassmorphism navbar
  - Logo + nav links + CTA
  - Scroll-triggered background opacity
*/

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#urunler", label: "Ürünler" },
  { href: "#hakkimda", label: "Hakkımda" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
        >
          <img
            src="/images/logo.jpg"
            alt="Finans Kodu Logo"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all"
          />
          <span className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
            Finans Kodu
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm tracking-wide"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection("#urunler")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-display font-semibold"
          >
            Koleksiyonları İncele
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-lg p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-left py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#urunler")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-display font-semibold w-full mt-2"
            >
              Koleksiyonları İncele
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
