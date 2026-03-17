import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FolderOpen, Cpu, TrendingUp, Bot, BarChart3, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const projeler = [
  {
    id: 1,
    icon: Cpu,
    badge: 'Canlı',
    badgeColor: '#00D4FF',
    title: 'Algoritmik Sinyal Motoru',
    description: 'Türkiye ve global piyasalar için rule-based yatırım sinyalleri üreten, gerçek zamanlı çalışan algoritmik altyapı. Altın, hisse ve döviz piyasalarını eş zamanlı izler.',
    tags: ['Python', 'Rule-based', 'Gerçek Zamanlı'],
    status: 'Aktif',
  },
  {
    id: 2,
    icon: Bot,
    badge: 'Beta',
    badgeColor: '#F59E0B',
    title: 'Vera — AI Finansal Asistan',
    description: 'Finans Kodu\'nun yapay zeka destekli finansal asistanı. Portföy analizi, risk değerlendirmesi ve yatırım kararı desteği için 7/24 erişilebilir.',
    tags: ['LLM', 'Finans AI', 'RAG'],
    status: 'Beta',
  },
  {
    id: 3,
    icon: TrendingUp,
    badge: 'Canlı',
    badgeColor: '#00D4FF',
    title: 'Kaos İçinde Düzen Metodolojisi',
    description: 'Bireysel yatırımcılar için geliştirilmiş sistematik karar çerçevesi. Risk/getiri mühendisliği, karar matrisleri ve duygu-yönetim protokollerini içerir.',
    tags: ['Metodoloji', 'Risk Yönetimi', 'Karar Çerçevesi'],
    status: 'Aktif',
  },
  {
    id: 4,
    icon: BarChart3,
    badge: 'Geliştiriliyor',
    badgeColor: '#8B5CF6',
    title: 'Portföy Analiz Platformu',
    description: 'Bireysel yatırımcıların portföylerini kurumsal kalitede analiz edebileceği, risk metriklerini ve korelasyon matrislerini görselleştiren web platformu.',
    tags: ['Dashboard', 'Portföy', 'Görselleştirme'],
    status: 'Geliştiriliyor',
  },
];

export default function ProjelerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Projeler | Finans Kodu — Algoritmik Finans Projeleri</title>
        <meta name="description" content="Finans Kodu'nun aktif projeleri: Algoritmik sinyal motoru, Vera AI asistan, Kaos İçinde Düzen metodolojisi ve portföy analiz platformu." />
        <meta name="keywords" content="Finans Kodu projeler, algoritmik sinyal, Vera AI, portföy analiz, finans teknoloji" />
        <link rel="canonical" href="https://finanskodu.com/projeler" />
        <meta property="og:title" content="Projeler | Finans Kodu" />
        <meta property="og:description" content="Finans Kodu'nun aktif projeleri: Algoritmik sinyal motoru, Vera AI asistan ve daha fazlası." />
        <meta property="og:url" content="https://finanskodu.com/projeler" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "Projeler", "item": "https://finanskodu.com/projeler" }
          ]
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
        <div className="container max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <FolderOpen size={20} style={{ color: 'var(--fk-cyan)' }} />
              <span className="font-mono text-xs tracking-[0.15em]" style={{ color: 'var(--fk-cyan)' }}>
                // PROJELERİMİZ
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
              Aktif <span style={{ color: 'var(--fk-cyan)' }}>Projeler</span>
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
              Bireysel yatırımcılar için kurumsal kalitede araçlar geliştiriyoruz.
              İşte üzerinde çalıştığımız projeler.
            </p>
          </motion.div>

          {/* Proje Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projeler.map((proje, idx) => (
              <motion.div
                key={proje.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0, 212, 255, 0.1)' }}
                  >
                    <proje.icon size={22} style={{ color: 'var(--fk-cyan)' }} />
                  </div>
                  <span
                    className="text-xs font-mono px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{
                      color: proje.badgeColor,
                      background: `${proje.badgeColor}18`,
                      border: `1px solid ${proje.badgeColor}30`,
                    }}
                  >
                    {proje.badge}
                  </span>
                </div>

                <div>
                  <h2
                    className="font-bold text-lg mb-2"
                    style={{ color: 'var(--foreground)', fontFamily: 'var(--font-syne)' }}
                  >
                    {proje.title}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {proje.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {proje.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md font-mono"
                      style={{
                        background: 'rgba(0, 212, 255, 0.06)',
                        color: 'var(--muted-foreground)',
                        border: '1px solid rgba(0, 212, 255, 0.12)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 p-8 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(0,200,150,0.06) 100%)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
            }}
          >
            <h2
              className="font-bold text-xl mb-3"
              style={{ color: 'var(--foreground)', fontFamily: 'var(--font-syne)' }}
            >
              Bir projeye katkı sağlamak ister misiniz?
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
              Finans, mühendislik veya veri bilimi alanında deneyimliyseniz birlikte çalışabiliriz.
            </p>
            <Button
              asChild
              size="lg"
              className="px-8 py-3 font-semibold rounded-lg"
              style={{
                background: 'var(--fk-cyan)',
                color: 'var(--fk-bg)',
                border: 'none',
                fontFamily: 'var(--font-figtree)',
                fontWeight: 600,
              }}
            >
              <a href="mailto:info@finanskodu.com">
                <ExternalLink size={18} className="mr-2" />
                İletişime Geç
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
