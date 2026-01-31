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
import { useRef, useState } from "react";
import { Linkedin, Instagram, Mail, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  { label: "Manifesto", href: "#manifesto" },
  { label: "Ürünler", href: "#urunler" },
  { label: "Blog", href: "#blog" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("E-bülten kaydınız alındı! Yakında sizinle iletişime geçeceğiz.");
      setEmail("");
    }
  };

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
        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 md:p-12 mb-16 text-center"
          aria-labelledby="newsletter-heading"
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-7 h-7 text-primary" aria-hidden="true" />
            </div>
            <h3 id="newsletter-heading" className="font-display font-bold text-2xl sm:text-3xl mb-4">
              Güncel Kalın
            </h3>
            <p className="text-muted-foreground mb-8">
              Yeni ürünler, AI ipuçları ve verimlilik stratejileri için e-bültenimize katılın.
            </p>
            <form 
              onSubmit={handleNewsletterSubmit} 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              aria-label="E-bülten kayıt formu"
            >
              <label htmlFor="newsletter-email" className="sr-only">E-posta adresiniz</label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                required
                autoComplete="email"
                aria-required="true"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-display font-semibold px-6"
                aria-label="E-bültene katıl"
              >
                Katıl
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </motion.section>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-lg mb-4">
              Kurucu Stratejistimizle tanışın:
            </h4>
            <a 
              href="https://www.linkedin.com/in/rubi-can-icliyurek/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-display font-bold text-xl flex items-center gap-2"
            >
              Rubi Can İçliyürek
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            {/* Address tag for contact info - GEO optimized */}
            <address className="text-muted-foreground text-sm leading-relaxed not-italic mt-4">
              <p>
                Endüstri Mühendisliği, Finansal Operasyonlar ve Yapay Zeka teknolojilerini 
                birleştiren verimlilik platformu.
              </p>
            </address>
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
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    aria-label={`${link.label} bölümüne git`}
                  >
                    {link.label}
                  </button>
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
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-xl bg-secondary hover:bg-primary/10 border border-border hover:border-primary/30 flex items-center justify-center transition-all"
                  aria-label={`${social.name} profilimizi ziyaret et`}
                >
                  <social.icon className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
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
          <address className="flex items-center gap-4 text-sm text-muted-foreground not-italic">
            <a
              href="https://www.linkedin.com/in/rubi-can-icliyurek/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
              aria-label="Rubi Can İçliyürek LinkedIn profili"
            >
              Rubi Can İçliyürek
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </address>
        </motion.div>
      </div>
    </footer>
  );
}
