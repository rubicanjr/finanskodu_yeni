import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Linkedin, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>İletişim | Finans Kodu — Bize Ulaşın</title>
        <meta name="description" content="Finans Kodu ile iletişime geçin. Ürün soruları, kurumsal işbirlikleri veya teknik destek için e-posta, LinkedIn veya Kod Odası üzerinden ulaşabilirsiniz." />
        <meta name="keywords" content="Finans Kodu iletişim, destek, kurumsal işbirliği, finans danışmanlık iletişim" />
        <link rel="canonical" href="https://finanskodu.com/iletisim" />
        <meta property="og:title" content="İletişim | Finans Kodu" />
        <meta property="og:description" content="Finans Kodu ile iletişime geçin. Ürün soruları, kurumsal işbirlikleri veya teknik destek için ulaşın." />
        <meta property="og:url" content="https://finanskodu.com/iletisim" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "İletişim", "item": "https://finanskodu.com/iletisim" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Finans Kodu İletişim",
          "url": "https://finanskodu.com/iletisim",
          "mainEntity": {
            "@type": "Organization",
            "name": "Finans Kodu",
            "email": "info@finanskodu.com",
            "url": "https://finanskodu.com"
          }
        })}</script>
      </Helmet>

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
          zIndex: 0
        }}
      />

      <div className="relative z-10 py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail size={20} style={{ color: 'var(--fk-cyan)' }} />
              <span className="font-mono text-xs tracking-[0.15em]" style={{ color: 'var(--fk-cyan)' }}>
                // İLETİŞİM
              </span>
            </div>
            <h1
              className="mb-4 leading-tight"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4.5vw, 48px)',
                color: 'var(--foreground)'
              }}
            >
              Bize <span style={{ color: 'var(--fk-cyan)' }}>Ulaşın</span>
            </h1>
            <p
              className="mx-auto"
              style={{
                fontSize: 'clamp(15px, 2vw, 17px)',
                color: 'var(--muted-foreground)',
                maxWidth: '520px',
                fontFamily: 'var(--font-figtree)'
              }}
            >
              Ürün soruları, kurumsal işbirlikleri veya teknik destek için aşağıdaki kanallardan ulaşabilirsiniz.
            </p>
          </motion.div>

          {/* İletişim Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Mail,
                title: 'E-posta',
                description: 'Genel sorular, ürün desteği ve kurumsal teklifler için.',
                action: 'info@finanskodu.com',
                href: 'mailto:info@finanskodu.com',
                buttonText: 'E-posta Gönder',
                color: 'var(--fk-cyan)',
              },
              {
                icon: Linkedin,
                title: 'LinkedIn',
                description: 'Kurumsal işbirlikleri ve profesyonel ağ için.',
                action: 'linkedin.com/company/finanskodu',
                href: 'https://www.linkedin.com/in/rubi-can-icliyurek/',
                buttonText: 'LinkedIn\'de Bul',
                color: '#0A66C2',
              },
              {
                icon: MessageSquare,
                title: 'Kod Odası',
                description: 'Canlı topluluk. Sorularını anında sor, yanıt al.',
                action: 'Canlı Topluluk',
                href: '/kod-odasi',
                buttonText: 'Kod Odası\'na Gir',
                color: 'var(--fk-cyan)',
                external: false,
              },
            ].map(({ icon: Icon, title, description, action, href, buttonText, color, external = true }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(0, 212, 255, 0.1)' }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <h2
                    className="font-bold text-lg mb-2"
                    style={{ color: 'var(--foreground)', fontFamily: 'var(--font-syne)' }}
                  >
                    {title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>
                    {description}
                  </p>
                  <p className="text-xs font-mono" style={{ color }}>
                    {action}
                  </p>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="mt-auto"
                  style={{
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: 'var(--fk-cyan)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    fontFamily: 'var(--font-figtree)',
                    fontWeight: 600,
                  }}
                >
                  <a href={href} target={external ? "_blank" : "_self"} rel={external ? "noopener noreferrer" : undefined}>
                    {buttonText}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Yanıt süresi ve beklentiler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} style={{ color: 'var(--fk-cyan)' }} />
              <h2
                className="font-semibold"
                style={{ color: 'var(--foreground)', fontFamily: 'var(--font-syne)' }}
              >
                Yanıt Süreleri
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Genel sorular', time: '24-48 saat içinde' },
                { label: 'Teknik destek', time: '12-24 saat içinde' },
                { label: 'Kurumsal teklif', time: '48-72 saat içinde' },
              ].map(({ label, time }) => (
                <div key={label} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--fk-cyan)' }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{label}</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
