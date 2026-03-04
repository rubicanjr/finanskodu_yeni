/*
  DESIGN: Cyber Finance Footer
  GEO OPTIMIZED: Semantic HTML with <footer>, <address>, <nav>
  
  - Social media icons with secure external links
  - Newsletter signup with proper form semantics
  - Address tag for contact information
  - ARIA labels for accessibility
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Instagram } from "lucide-react";

// Custom X (Twitter) icon
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom TikTok icon
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rubi-can-icliyurek/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/finans.kodu",
    icon: Instagram,
  },
  {
    name: "X",
    href: "https://x.com/finansk0du",
    icon: XIcon,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@finanskodu?_r=1&_t=ZS-91XN5JoeHIo",
    icon: TikTokIcon,
  },
];

const quickLinks = [
  { label: "Ürünler", href: "#urunler" },
  { label: "Blog", href: "/blog", isRoute: true },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer 
      id="iletisim" 
      className="relative pt-24 pb-8 overflow-hidden"
      role="contentinfo"
      aria-label="Site alt bilgisi"
    >
      {/* Section Divider */}
      <div className="section-divider mb-16" aria-hidden="true" />

      <div className="container" ref={ref}>
  

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 bg-cyan-400 rounded-lg flex items-center justify-center text-xs font-bold" style={{ color: 'var(--background)' }}>fk</span>
              <span className="font-bold text-foreground">finanskodu</span>
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Finansal verimliliği AI araçları ve algoritmik metodoloji ile bir üst seviyeye taşıyoruz.
            </p>
          </motion.div>

          {/* Quick Links - Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            aria-label="Hızlı bağlantılar"
          >
            <h4 className="font-display font-semibold text-lg mb-4">Hızlı Linkler</h4>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {link.isRoute ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      aria-label={`${link.label} sayfasına git`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      aria-label={`${link.label} bölümüne git`}
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h4 className="font-display font-semibold text-lg mb-4">Sosyal Medya</h4>
            <nav className="flex flex-wrap gap-3" aria-label="Sosyal medya bağlantıları">
              {socialLinks.map((social) => {
                const hoverClass =
                  social.name === 'LinkedIn' ? 'hover:text-blue-400 hover:border-blue-400/30' :
                  social.name === 'Instagram' ? 'hover:text-pink-400 hover:border-pink-400/30' :
                  social.name === 'X' ? 'hover:text-sky-400 hover:border-sky-400/30' :
                  social.name === 'TikTok' ? 'hover:text-white hover:border-white/20' : 'hover:text-primary hover:border-primary/30';
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center transition-colors ${hoverClass}`}
                    aria-label={`${social.name} profilimizi ziyaret et`}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground transition-colors" />
                  </a>
                );
              })}
            </nav>
            <p className="text-muted-foreground text-sm mt-4">
              Bizi sosyal medyada takip edin!
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm">
            <small>© {new Date().getFullYear()} Finans Kodu. Tüm hakları saklıdır.</small>
          </p>

        </motion.div>
      </div>
    </footer>
  );
}
