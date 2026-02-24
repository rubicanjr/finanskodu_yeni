import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackCTAClick } from "@/lib/analytics";
import { useI18n } from "@/contexts/I18nContext";

export default function HeroSection() {
  const { t } = useI18n();
  const [terminalLines, setTerminalLines] = useState<Array<{ text: string; visible: boolean }>>([
    { text: "$ finans-kodu init --mode=analiz", visible: false },
    { text: "› Portföy taranıyor…", visible: false },
    { text: "› Risk modeli hesaplanıyor…", visible: false },
    { text: "✔ Sistem hazır. Kaos filtrelendi.", visible: false },
  ]);
  const [showCursor, setShowCursor] = useState(false);

  // Terminal fadeIn animation
  useEffect(() => {
    const delays = [300, 900, 1500, 2100];
    const timeouts = terminalLines.map((_, index) =>
      setTimeout(() => {
        setTerminalLines(prev =>
          prev.map((line, i) => (i === index ? { ...line, visible: true } : line))
        );
        if (index === terminalLines.length - 1) {
          setTimeout(() => setShowCursor(true), 200);
        }
      }, delays[index])
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Cursor blink
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [showCursor]);

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
      style={{ background: 'var(--fk-bg)' }}
      aria-labelledby="hero-heading"
    >
      {/* 52px Grid Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px'
        }}
      />

      {/* Radial Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(13, 17, 23, 0.8) 100%)'
        }}
      />

      {/* Glow Blob - Top Left */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Glow Blob - Bottom Right */}
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 200, 150, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[820px] mx-auto text-center">
        <div className="space-y-8">
          {/* Pill Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mx-auto w-fit px-4 py-2"
            style={{
              background: 'rgba(0, 212, 255, 0.09)',
              border: '1px solid rgba(0, 212, 255, 0.18)',
              borderRadius: '100px'
            }}
          >
            {/* Pulse Dot */}
            <span className="relative flex h-[6px] w-[6px]">
              <span 
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: 'var(--fk-cyan)' }}
              />
              <span 
                className="relative inline-flex rounded-full h-[6px] w-[6px]"
                style={{ background: 'var(--fk-cyan)' }}
              />
            </span>
            <span 
              className="font-mono text-xs tracking-wider"
              style={{ 
                fontFamily: 'var(--font-jetbrains)',
                color: 'var(--fk-cyan)'
              }}
            >
              // FİNANSAL VERİMLİLİK İÇİN
            </span>
          </motion.div>

          {/* H1 Heading */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="leading-tight"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 5vw, 54px)',
              color: '#fff'
            }}
          >
            Finansınızı{' '}
            <span style={{ color: 'var(--fk-cyan)' }}>finanskodu</span>{' '}
            dijital ürünleri ile{' '}
            <span style={{ color: 'var(--fk-green)' }}>bir üst seviyeye taşıyın.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto"
            style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              color: 'var(--muted-foreground)',
              maxWidth: '560px',
              fontFamily: 'var(--font-figtree)'
            }}
          >
            100+ test edilmiş AI aracı, finansal metodoloji ve algoritmik analiz. Sen pilotsun; navigasyonu biz üstleniyoruz.
          </motion.p>

          {/* Terminal Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto"
            style={{
              maxWidth: '680px',
              background: 'var(--card)',
              border: '1px solid rgba(0, 212, 255, 0.18)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          >
            {/* Titlebar */}
            <div 
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span 
                className="text-xs opacity-50"
                style={{ 
                  fontFamily: 'var(--font-jetbrains)',
                  color: 'var(--muted-foreground)'
                }}
              >
                finans-kodu-terminal
              </span>
            </div>

            {/* Terminal Body */}
            <div 
              className="p-6 font-mono text-sm space-y-2"
              style={{ 
                fontFamily: 'var(--font-jetbrains)',
                minHeight: '140px'
              }}
            >
              {terminalLines.map((line, index) => (
                <div
                  key={index}
                  className="transition-opacity duration-500"
                  style={{
                    opacity: line.visible ? 1 : 0,
                    color: index === 3 ? 'var(--fk-green)' : 'var(--muted-foreground)'
                  }}
                >
                  {line.text}
                  {index === terminalLines.length - 1 && line.visible && (
                    <span
                      className="inline-block w-2 h-4 ml-1"
                      style={{
                        background: 'var(--fk-cyan)',
                        opacity: showCursor ? 1 : 0,
                        transition: 'opacity 0.1s'
                      }}
                    />
                  )}
                </div>
              ))}
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
              className="group px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--fk-cyan)',
                color: 'var(--fk-bg)',
                border: 'none',
                fontFamily: 'var(--font-figtree)',
                fontWeight: 600,
                boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 24px 0 rgba(0, 212, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0, 212, 255, 0.4)';
              }}
            >
              {t('hero.cta1')}
            </Button>

            <Button
              onClick={goToKodOdasi}
              size="lg"
              variant="outline"
              className="group px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(0, 212, 255, 0.08)',
                color: 'var(--fk-cyan)',
                border: '1px solid rgba(0, 212, 255, 0.18)',
                fontFamily: 'var(--font-figtree)',
                fontWeight: 600,
                boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px 0 rgba(0, 212, 255, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0, 212, 255, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.18)';
              }}
            >
              {t('hero.cta2')}
            </Button>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-8"
            style={{
              fontFamily: 'var(--font-figtree)',
              fontSize: '14px',
              color: 'var(--muted-foreground)'
            }}
          >
            <span>100+ AI Prompt</span>
            <div 
              className="w-1 h-1 rounded-full"
              style={{ background: 'var(--fk-cyan)' }}
            />
            <span>Finansal Metodoloji</span>
            <div 
              className="w-1 h-1 rounded-full"
              style={{ background: 'var(--fk-cyan)' }}
            />
            <span>Algoritmik Analiz</span>
            <div 
              className="w-1 h-1 rounded-full"
              style={{ background: 'var(--fk-cyan)' }}
            />
            <span>Aylık Strateji Bülteni</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
