import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Library, BookOpen, FileText, Video, ExternalLink, Tag } from "lucide-react";

const kaynaklar = [
  {
    kategori: 'Temel Kavramlar',
    icon: BookOpen,
    renk: '#00D4FF',
    kalemler: [
      {
        baslik: 'Risk/Getiri Mühendisliği Nedir?',
        aciklama: 'Portföy yönetiminde risk ve getiriyi matematiksel olarak dengeleyen temel çerçeve.',
        tur: 'Makale',
        link: '/blog',
      },
      {
        baslik: 'Duygusal Önyargılar ve Yatırım Kararları',
        aciklama: 'Panik satışı, FOMO ve aşırı güven gibi bilişsel hataların portföye etkisi.',
        tur: 'Makale',
        link: '/blog',
      },
      {
        baslik: 'Algoritmik Yatırım: Kara Kutu mu, Cam Kutu mu?',
        aciklama: 'Rule-based sistemler ile kara kutu AI arasındaki fark ve şeffaflığın önemi.',
        tur: 'Makale',
        link: '/blog',
      },
    ],
  },
  {
    kategori: 'Araçlar ve Metodoloji',
    icon: FileText,
    renk: '#00C896',
    kalemler: [
      {
        baslik: 'Karar Matrisi Şablonu',
        aciklama: 'Yatırım kararlarını sistematik hale getiren, duyguları devre dışı bırakan karar çerçevesi.',
        tur: 'Şablon',
        link: '/dijital-araclar/finans-kodu-kaos-icinde-duzen',
      },
      {
        baslik: 'AI Prompt Kütüphanesi — Finans Odaklı',
        aciklama: '100+ test edilmiş yapay zeka promptu; finansal analiz, raporlama ve araştırma için.',
        tur: 'Araç',
        link: '/dijital-araclar/ai-prompt-kutuphanesi',
      },
      {
        baslik: 'Aylık Portföy Kontrol Listesi',
        aciklama: 'Her ay portföyünüzü gözden geçirirken kullanabileceğiniz sistematik kontrol adımları.',
        tur: 'Şablon',
        link: '/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni',
      },
    ],
  },
  {
    kategori: 'Topluluk ve Canlı İçerik',
    icon: Video,
    renk: '#8B5CF6',
    kalemler: [
      {
        baslik: 'Kod Odası — Canlı Finans Topluluğu',
        aciklama: 'Gerçek zamanlı piyasa tartışmaları, soru-cevap ve haftalık analiz paylaşımları.',
        tur: 'Topluluk',
        link: '/kod-odasi',
        external: true,
      },
      {
        baslik: 'Pro Bülten — Haftalık Sesli Brifing',
        aciklama: 'Her hafta piyasanın sesli özeti; makro analiz, altın sinyalleri ve portföy önerileri.',
        tur: 'Bülten',
        link: '/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni',
      },
      {
        baslik: 'Blog — Finansal Analiz Yazıları',
        aciklama: 'Derinlemesine piyasa analizleri, metodoloji yazıları ve yatırım stratejileri.',
        tur: 'Blog',
        link: '/blog',
      },
    ],
  },
];

export default function KaynakKutuphanesiPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Kaynak Kütüphanesi | Finans Kodu — Finansal Araçlar ve Metodoloji</title>
        <meta name="description" content="Finans Kodu kaynak kütüphanesi: Temel kavramlar, araçlar, metodoloji şablonları ve topluluk içerikleri. Algoritmik yatırım için kapsamlı kaynak merkezi." />
        <meta name="keywords" content="finans kaynakları, yatırım metodoloji, algoritmik finans araçları, portföy yönetimi kaynakları" />
        <link rel="canonical" href="https://finanskodu.com/kaynak-kutuphanesi" />
        <meta property="og:title" content="Kaynak Kütüphanesi | Finans Kodu" />
        <meta property="og:description" content="Finansal araçlar, metodoloji şablonları ve topluluk içerikleri için kapsamlı kaynak merkezi." />
        <meta property="og:url" content="https://finanskodu.com/kaynak-kutuphanesi" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "Kaynak Kütüphanesi", "item": "https://finanskodu.com/kaynak-kutuphanesi" }
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
              <Library size={20} style={{ color: 'var(--fk-cyan)' }} />
              <span className="font-mono text-xs tracking-[0.15em]" style={{ color: 'var(--fk-cyan)' }}>
                // KAYNAK KÜTÜPHANESİ
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
              Kaynak <span style={{ color: 'var(--fk-cyan)' }}>Kütüphanesi</span>
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
              Algoritmik yatırım yolculuğunuzda ihtiyaç duyacağınız tüm araçlar, metodolojiler ve içerikler tek yerde.
            </p>
          </motion.div>

          {/* Kategoriler */}
          <div className="space-y-10">
            {kaynaklar.map((kategori, kidx) => (
              <motion.div
                key={kategori.kategori}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: kidx * 0.1 }}
              >
                {/* Kategori başlığı */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${kategori.renk}15` }}
                  >
                    <kategori.icon size={18} style={{ color: kategori.renk }} />
                  </div>
                  <h2
                    className="font-bold text-lg"
                    style={{ color: 'var(--foreground)', fontFamily: 'var(--font-syne)' }}
                  >
                    {kategori.kategori}
                  </h2>
                  <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                </div>

                {/* Kalemler */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {kategori.kalemler.map((kalem) => (
                    <a
                      key={kalem.baslik}
                      href={kalem.link}
                      target={kalem.external ? "_blank" : "_self"}
                      rel={kalem.external ? "noopener noreferrer" : undefined}
                      className="group p-5 rounded-xl flex flex-col gap-3 transition-all duration-200"
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${kategori.renk}40`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${kategori.renk}12`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          className="font-semibold text-sm leading-snug group-hover:text-cyan-400 transition-colors"
                          style={{ color: 'var(--foreground)', fontFamily: 'var(--font-figtree)' }}
                        >
                          {kalem.baslik}
                        </h3>
                        <ExternalLink
                          size={14}
                          className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: kategori.renk }}
                        />
                      </div>
                      <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--muted-foreground)' }}>
                        {kalem.aciklama}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <Tag size={11} style={{ color: kategori.renk }} />
                        <span
                          className="text-xs font-mono"
                          style={{ color: kategori.renk }}
                        >
                          {kalem.tur}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
