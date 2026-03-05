import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
    const productsSection = document.getElementById('urunler');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const fallback = document.querySelector('[id="urunler"], [id="dijital-araclar"], [id="products"]');
      if (fallback) fallback.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToKodOdasi = () => {
    trackCTAClick('kod_odasi_hero');
    window.location.href = '/kod-odasi';
  };

  return (
    <section 
      className="fk-hero relative flex items-start justify-center px-4 pt-8 pb-12 overflow-hidden"
      style={{ background: 'var(--background)' }}
      aria-labelledby="hero-heading"
    >
      {/* Decorative backgrounds via single overlay div */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at center, transparent 0%, var(--background) 100%),
            linear-gradient(rgba(0, 212, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 52px 52px, 52px 52px'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[820px] mx-auto text-center">
        <div className="space-y-8">
          {/* Pill Eyebrow — CSS fade-in (no framer-motion) */}
          <div
            className="fk-anim-fade-up flex items-center justify-center gap-2 mx-auto w-fit px-4 py-2"
            style={{
              background: 'rgba(0, 212, 255, 0.09)',
              border: '1px solid rgba(0, 212, 255, 0.18)',
              borderRadius: '100px',
              animationDelay: '0ms'
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
          </div>

          {/* H1 Heading — CSS fade-in */}
          <h1
            id="hero-heading"
            className="fk-anim-fade-up leading-tight text-foreground"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 5vw, 54px)',
              animationDelay: '120ms'
            }}
          >
            finans
          </h1>

          {/* Subtitle — CSS fade-in */}
          <p
            className="fk-anim-fade-up mx-auto"
            style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              color: 'var(--muted-foreground)',
              maxWidth: '560px',
              fontFamily: 'var(--font-figtree)',
              animationDelay: '200ms'
            }}
          >
            100+ test edilmiş AI aracı, finansal metodoloji ve algoritmik analizle finansal ve zamansal olarak mükemmelleşin. Dijital ürünleri bugün satın alın!
          </p>

          {/* Terminal Widget — CSS fade-in */}
          <div
            className="fk-anim-fade-up mx-auto"
            style={{
              maxWidth: '680px',
              background: 'var(--card)',
              border: '1px solid rgba(0, 212, 255, 0.18)',
              borderRadius: '12px',
              overflow: 'hidden',
              animationDelay: '280ms'
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
                  className={`transition-opacity duration-500 ${index === 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}
                  style={{
                    opacity: line.visible ? 1 : 0
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
          </div>

          {/* CTA Buttons — CSS fade-in */}
          <div
            className="fk-anim-fade-up flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ animationDelay: '400ms' }}
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
          </div>

          {/* Trust Strip — CSS fade-in */}
          <div
            className="fk-anim-fade-up flex flex-wrap items-center justify-center gap-3 pt-8"
            style={{
              fontFamily: 'var(--font-figtree)',
              fontSize: '14px',
              color: 'var(--muted-foreground)',
              animationDelay: '500ms'
            }}
          >
            {['100+ AI Prompt', 'Finansal Metodoloji', 'Algoritmik Analiz', 'Aylık Strateji Bülteni'].map((item, i) => (
              <span key={i} className="flex items-center gap-3">
                {i > 0 && <span className="w-1 h-1 rounded-full inline-block" style={{ background: 'var(--fk-cyan)' }} />}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
