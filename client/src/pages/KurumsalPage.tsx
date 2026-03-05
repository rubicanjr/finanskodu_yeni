import { Helmet } from "react-helmet-async";
import ProcessModelSection from "@/components/ProcessModelSection";
import { motion } from "framer-motion";
import { Building2, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KurumsalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Kurumsal | Finans Kodu — Özel Finansal Çözümler</title>
        <meta name="description" content="Finans ihtiyaçlarınız standart ürünlerimizin dışına çıkıyorsa, size özel çözüm için buradayız. Finans Kodu kurumsal hizmetleri ve süreç modeli." />
        <meta name="keywords" content="kurumsal finans çözümleri, özel finansal danışmanlık, algoritmik finans, kurumsal yatırım" />
        <link rel="canonical" href="https://finanskodu.com/kurumsal" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kurumsal | Finans Kodu" />
        <meta property="og:description" content="Finans ihtiyaçlarınız standart ürünlerimizin dışına çıkıyorsa, size özel çözüm için buradayız." />
        <meta property="og:url" content="https://finanskodu.com/kurumsal" />
        <meta property="og:image" content="https://finanskodu.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://finanskodu.com/kurumsal",
          "url": "https://finanskodu.com/kurumsal",
          "name": "Kurumsal | Finans Kodu — Özel Finansal Çözümler",
          "description": "Finans ihtiyaçlarınız standart ürünlerimizin dışına çıkıyorsa, size özel çözüm için buradayız.",
          "isPartOf": { "@id": "https://finanskodu.com/#website" },
          "publisher": { "@id": "https://finanskodu.com/#organization" },
          "inLanguage": "tr-TR"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "Kurumsal", "item": "https://finanskodu.com/kurumsal" }
          ]
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden" style={{ background: 'var(--background)' }}>
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
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 size={20} style={{ color: 'var(--fk-cyan)' }} />
              <span className="font-mono text-xs tracking-[0.15em]" style={{ color: 'var(--fk-cyan)' }}>
                // KURUMSAL
              </span>
            </div>
            <h1
              className="mb-6 leading-tight"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4.5vw, 48px)',
                color: 'var(--foreground)'
              }}
            >
              Finans ihtiyaçların standart ürünlerimizin{' '}
              <em style={{ color: 'var(--fk-cyan)', fontStyle: 'normal' }}>dışına çıkıyorsa</em>,
              sana özel çözüm için{' '}
              <em style={{ color: 'var(--fk-cyan)', fontStyle: 'normal' }}>buradayız</em>.
            </h1>
            <p
              className="mx-auto mb-8"
              style={{
                fontSize: 'clamp(15px, 2vw, 17px)',
                color: 'var(--muted-foreground)',
                maxWidth: '600px',
                fontFamily: 'var(--font-figtree)'
              }}
            >
              Fikirden canlı kullanıma kadar, finansal süreçlerini nasıl hayata geçirdiğimizi adım adım gör.
              Kurumsal danışmanlık, özel algoritma geliştirme ve entegrasyon hizmetleri için bizimle iletişime geç.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-base font-semibold rounded-lg"
                style={{
                  background: 'var(--fk-cyan)',
                  color: 'var(--fk-bg)',
                  border: 'none',
                  fontFamily: 'var(--font-figtree)',
                  fontWeight: 600,
                }}
              >
                <a href="mailto:info@finanskodu.com">
                  <Mail size={18} className="mr-2" />
                  Ücretsiz Keşif Görüşmesi
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base font-semibold rounded-lg"
                style={{
                  background: 'rgba(0, 212, 255, 0.08)',
                  color: 'var(--fk-cyan)',
                  border: '1px solid rgba(0, 212, 255, 0.18)',
                  fontFamily: 'var(--font-figtree)',
                  fontWeight: 600,
                }}
              >
                <a href="https://www.linkedin.com/in/rubi-can-icliyurek/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} className="mr-2" />
                  LinkedIn'den Ulaş
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Süreç Modeli - ProcessModelSection içeriği */}
      <section className="sr-only" aria-label="Süreç Modeli">
        <h2>Kurumsal Finansal Danışmanlık Süreç Modeli</h2>
      </section>
      <ProcessModelSection />
    </div>
  );
}
