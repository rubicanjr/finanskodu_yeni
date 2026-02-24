import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackCTAClick } from "@/lib/analytics";
import { useI18n } from "@/contexts/I18nContext";

export default function HeroSection() {
  const { t } = useI18n();
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const lines = [
    "$ init finanskodu.system",
    "> Loading modules...",
    "> Connecting to data streams...",
    "✓ Sistem hazır. Kaos filtrelendi."
  ];

  // Typing animation for terminal
  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setTerminalLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 50); // 50ms per character
      
      return () => clearTimeout(timeout);
    } else {
      // Line completed, move to next line after delay
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentLineIndex, lines]);

  // Cursor blink animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

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
          {/* Eyebrow Label with Pulse Dot */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400 font-mono text-sm tracking-wider">
              {t('hero.eyebrow')}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto leading-tight text-white"
          >
            {t('hero.heading1')}
          </motion.h1>

          {/* Terminal Animation - 4 Lines */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-10"
          >
            <div 
              className="w-full max-w-2xl rounded-xl border p-6"
              style={{ 
                background: '#0a0a0a',
                borderColor: '#1E2D3D',
              }}
            >
              <div className="font-mono text-xs sm:text-sm space-y-2 text-left">
                {terminalLines.map((line, index) => (
                  <div key={index} style={{ color: index === 3 ? '#10b981' : '#8899AA' }}>
                    {line}
                    {index === currentLineIndex && showCursor && (
                      <span className="inline-block w-2 h-4 ml-1 bg-cyan-500" />
                    )}
                  </div>
                ))}
                {/* Empty lines for spacing */}
                {Array.from({ length: 4 - terminalLines.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-5" />
                ))}
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
              className="group px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:border-cyan-400"
              style={{
                borderColor: '#0EA5E9',
                borderWidth: '2px',
                color: '#0EA5E9',
                background: 'rgba(0, 212, 255, 0.08)'
              }}
              aria-label={t('hero.cta2')}
            >
              <span className="relative z-10 group-hover:text-cyan-300 transition-colors">{t('hero.cta2')}</span>
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
