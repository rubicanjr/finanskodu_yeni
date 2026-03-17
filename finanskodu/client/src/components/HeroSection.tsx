import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { Link } from "wouter";

export default function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('urunler');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const fallback = document.querySelector('[id="urunler"], [id="dijital-araclar"], [id="products"]');
      if (fallback) fallback.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToProducts = () => {
    trackCTAClick('urunleri_gor_hero');
    scrollToProducts();
  };

  const goToFreeStart = () => {
    trackCTAClick('ucretsiz_basla_hero');
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
          {/* Pill Eyebrow — CSS fade-in */}
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
              // TÜRK YATIRIMCISI İÇİN
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
            Piyasayı anlamak için saatler harcıyorsun.{' '}
            <span style={{ color: 'var(--fk-cyan)' }}>
              Karar verirken yine de emin olamıyorsun.
            </span>
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
            Finans Kodu bunu değiştiriyor. AI araçları + algoritmik analiz + aktif topluluk.
          </p>

          {/* CTA Buttons — CSS fade-in */}
          <div
            className="fk-anim-fade-up flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ animationDelay: '320ms' }}
          >
            <Button
              onClick={goToFreeStart}
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
              Ücretsiz Başla
            </Button>

            <Button
              onClick={goToProducts}
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
              Ürünleri Gör
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
