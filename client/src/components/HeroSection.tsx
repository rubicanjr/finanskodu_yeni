import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackCTAClick } from "@/lib/analytics";
import { useI18n } from "@/contexts/I18nContext";

export default function HeroSection() {
  const { t } = useI18n();
  const [typedText, setTypedText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  const messages = [
    t('hero.terminal.ready'),
    t('hero.terminal.analyzing'),
    t('hero.terminal.loading'),
    t('hero.terminal.scanning'),
    t('hero.terminal.calculating')
  ];

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    const currentMessage = messages[currentMessageIndex];

    const typeWriter = () => {
      if (!isDeleting && currentIndex <= currentMessage.length) {
        setTypedText(currentMessage.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeWriter, 150);
      } else if (!isDeleting && currentIndex > currentMessage.length) {
        isDeleting = true;
        timeoutId = setTimeout(typeWriter, 2000);
      } else if (isDeleting && currentIndex > 0) {
        currentIndex--;
        setTypedText(currentMessage.slice(0, currentIndex));
        timeoutId = setTimeout(typeWriter, 100);
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        timeoutId = setTimeout(typeWriter, 500);
      }
    };

    typeWriter();
    return () => clearTimeout(timeoutId);
  }, [currentMessageIndex, messages]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('dijital-araclar');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToKodOdasi = () => {
    trackCTAClick('kod_odasi_hero');
    window.location.href = '/kod-odasi';
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0D1117 0%, #1A1F2E 50%, #0D1117 100%)'
      }}
      aria-labelledby="hero-heading"
    >
      {/* Animated Background Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Radial Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.05) 0%, transparent 50%)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="space-y-8">
          {/* New Subtitle - Replaces eyebrow and heading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold max-w-3xl mx-auto leading-relaxed text-white"
          >
            {t('hero.newSubtitle')}
          </motion.p>

          {/* Terminal Animation - Clean, no avatars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-10"
          >
            <div 
              className="w-64 h-20 sm:w-80 sm:h-24 rounded-xl border flex items-center justify-center"
              style={{ 
                background: '#0D1117',
                borderColor: '#1E2D3D',
              }}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="font-mono text-xs sm:text-sm h-5" style={{ color: '#8899AA' }}>
                  {typedText}
                  <span className="inline-block w-2 h-4 ml-1 bg-cyan-500 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={scrollToProducts}
              size="lg"
              className="group relative overflow-hidden px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
                color: 'white',
                border: 'none'
              }}
              aria-label={t('hero.cta1')}
            >
              <span className="relative z-10">{t('hero.cta1')}</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </Button>

            <Button
              onClick={goToKodOdasi}
              size="lg"
              variant="outline"
              className="group px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                borderColor: '#0EA5E9',
                color: '#0EA5E9',
                background: 'transparent'
              }}
              aria-label={t('hero.cta2')}
            >
              <span className="relative z-10">{t('hero.cta2')}</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0D1117)'
        }}
      />
    </section>
  );
}
