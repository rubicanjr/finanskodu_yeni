/*
  DESIGN: Cyber Finance Hero Section
  GEO OPTIMIZED: Semantic HTML with <header> and <h1>
  
  - Full viewport height with labyrinth background
  - Strong headline with gradient text
  - Animated elements and neon CTA
  - ARIA labels for accessibility
*/

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Brain, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Code2, label: "Kod Gerektirmez", value: "No-Code" },
  { icon: Brain, label: "Yapay Zeka Destekli", value: "AI" },
  { icon: Clock, label: "Zaman Tasarrufu", value: "%80" },
  { icon: Zap, label: "Otomasyon", value: "7/24" },
];

export default function HeroSection() {
  const scrollToProducts = () => {
    document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToManifesto = () => {
    document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Ana başlık bölümü"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        role="img"
        aria-label="Labirent temalı arka plan görseli"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(0.85 0.18 195 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(0.85 0.18 195 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">
              Yapay Zeka Destekli Verimlilik Platformu
            </span>
          </motion.div>

          {/* Main Heading - H1 for SEO/GEO */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
          >
            Finansal Operasyonlarınızı{" "}
            <span className="gradient-text neon-text">Yapay Zeka</span>{" "}
            Hızıyla Yönetin
          </motion.h1>

          {/* Subheading with semantic emphasis */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            <strong>Endüstri Mühendisliği</strong> disiplinini, <strong>Finansal Operasyonlar</strong> ve{" "}
            <strong>Yapay Zeka</strong> teknolojileriyle birleştiriyoruz. Finansal kaosunuzu, kod yazmadan 
            düzenli bir <em className="text-primary font-semibold not-italic">Mühendislik Harikası</em>'na 
            dönüştürüyoruz.
          </motion.p>

          {/* CTA Buttons - Thumb Zone Optimized */}
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            aria-label="Ana eylem butonları"
          >
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-display font-semibold text-lg px-8 py-6 group"
              aria-label="Dijital ürün koleksiyonlarını incele"
            >
              Koleksiyonları İncele
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToManifesto}
              className="border-border hover:border-primary hover:text-primary font-display font-semibold text-lg px-8 py-6 bg-transparent"
              aria-label="Nasıl çalıştığımızı öğren"
            >
              Nasıl Çalışır?
            </Button>
          </motion.nav>

          {/* Stats with semantic list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16 pt-16 border-t border-border/30"
            role="list"
            aria-label="Platform özellikleri"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass-card rounded-xl p-4 text-center"
                role="listitem"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" aria-hidden="true" />
                <p className="font-display font-bold text-xl sm:text-2xl text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </header>
  );
}
