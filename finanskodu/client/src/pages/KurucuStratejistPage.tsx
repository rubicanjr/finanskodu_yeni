import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Linkedin, ExternalLink, Target, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const KURUCU_FOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/kurucu_cf9ec2c3.webp";

export default function KurucuStratejistPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Kurucu Stratejist | Rubi Can İçliyürek | Finans Kodu</title>
        <meta name="description" content="Rubi Can İçliyürek — LC Waikiki Planlama Yöneticisi'nden Finans Kodu Co-Founder & CIO'ya. Mühendislik ve finans geçmişiyle bireysel yatırımcılar için algoritmik altyapı kuruyor." />
        <meta name="keywords" content="Rubi Can İçliyürek, Finans Kodu kurucu, CIO, algoritmik finans, yatırım stratejisti" />
        <link rel="canonical" href="https://finanskodu.com/kurucu-stratejist" />
        <meta property="og:title" content="Kurucu Stratejistimizle Tanışın | Finans Kodu" />
        <meta property="og:description" content="Rubi Can İçliyürek — Mühendislik ve finans geçmişiyle bireysel yatırımcılar için algoritmik altyapı kuruyor." />
        <meta property="og:image" content={KURUCU_FOTO} />
        <meta property="og:url" content="https://finanskodu.com/kurucu-stratejist" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "Kurucu Stratejistimizle Tanışın", "item": "https://finanskodu.com/kurucu-stratejist" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Rubi Can İçliyürek",
          "jobTitle": "Co-Founder & Chief Investment Officer",
          "worksFor": { "@type": "Organization", "name": "Finans Kodu" },
          "url": "https://www.linkedin.com/in/rubi-can-icliyurek/",
          "image": KURUCU_FOTO,
          "alumniOf": "Sabancı Üniversitesi"
        })}</script>
      </Helmet>

      {/* Grid Background */}
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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col lg:flex-row gap-12 items-start"
            >
              {/* Sol: Fotoğraf */}
              <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center lg:items-start gap-6">
                <div
                  className="relative"
                  style={{
                    width: 'clamp(200px, 30vw, 280px)',
                    height: 'clamp(200px, 30vw, 280px)',
                  }}
                >
                  {/* Glow ring */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.3) 0%, rgba(0,200,150,0.2) 100%)',
                      filter: 'blur(20px)',
                      transform: 'scale(1.1)',
                    }}
                  />
                  <img
                    src={KURUCU_FOTO}
                    alt="Rubi Can İçliyürek — Finans Kodu Co-Founder & CIO"
                    className="relative z-10 w-full h-full object-cover rounded-2xl"
                    style={{
                      border: '1px solid rgba(0, 212, 255, 0.25)',
                      boxShadow: '0 0 40px rgba(0, 212, 255, 0.15)',
                    }}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>

                {/* İsim ve unvan kartı */}
                <div
                  className="w-full lg:w-auto px-5 py-4 rounded-xl text-center lg:text-left"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    maxWidth: 'clamp(200px, 30vw, 280px)',
                  }}
                >
                  <p
                    className="font-bold text-lg mb-1"
                    style={{ color: 'var(--foreground)', fontFamily: 'var(--font-syne)' }}
                  >
                    Rubi Can İçliyürek
                  </p>
                  <p
                    className="text-sm mb-3"
                    style={{ color: 'var(--fk-cyan)', fontFamily: 'var(--font-figtree)' }}
                  >
                    Co-Founder & Chief Investment Officer
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-figtree)' }}
                  >
                    Finans Kodu
                  </p>
                </div>

                {/* LinkedIn Butonu */}
                <Button
                  asChild
                  size="lg"
                  className="w-full lg:w-auto px-6 py-3 font-semibold rounded-lg"
                  style={{
                    background: '#0A66C2',
                    color: '#fff',
                    border: 'none',
                    fontFamily: 'var(--font-figtree)',
                    maxWidth: 'clamp(200px, 30vw, 280px)',
                  }}
                >
                  <a
                    href="https://www.linkedin.com/in/rubi-can-icliyurek/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={18} className="mr-2" />
                    LinkedIn'de Takip Et
                    <ExternalLink size={14} className="ml-2 opacity-70" />
                  </a>
                </Button>
              </div>

              {/* Sağ: Metin */}
              <div className="flex-1 space-y-6">
                <h2 className="sr-only">Rubi Can İçliyürek — Co-Founder & CIO Hikayesi</h2>
                {/* Eyebrow */}
                <div className="flex items-center gap-3">
                  <div className="h-px w-8" style={{ background: 'rgba(0,212,255,0.3)' }} />
                  <span
                    className="font-mono text-xs tracking-[0.15em]"
                    style={{ color: 'var(--fk-cyan)', fontFamily: 'var(--font-jetbrains)' }}
                  >
                    // KURUCU STRATEJİST
                  </span>
                  <div className="h-px w-8" style={{ background: 'rgba(0,212,255,0.3)' }} />
                </div>

                {/* Hikaye */}
                <div className="space-y-5" style={{ fontFamily: 'var(--font-figtree)' }}>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    LC Waikiki'de <strong style={{ color: 'var(--foreground)' }}>Planlama Yöneticisi</strong> olarak
                    milyonlarca SKU'nun stok hareketini talep tahminleme algoritmaları ile yönetiyordu.
                    Uluslararası pazarlarda büyük veri yönetimi, gerçek zamanlı karar alma ve hata payının sıfıra yakın olması
                    gereken işlemler üzerinde çalıştırıldı.
                  </p>

                  <div
                    className="px-5 py-4 rounded-xl"
                    style={{
                      background: 'rgba(0, 212, 255, 0.06)',
                      border: '1px solid rgba(0, 212, 255, 0.15)',
                      borderLeft: '3px solid var(--fk-cyan)',
                    }}
                  >
                    <p
                      className="text-base font-medium italic"
                      style={{ color: 'var(--foreground)', fontFamily: 'var(--font-figtree)' }}
                    >
                      "Orada şunu öğrendi: <strong>Duygusal karar, matematiksel karar karşısında her zaman değişir.</strong>"
                    </p>
                  </div>

                  <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    Sonra finans dünyasına baktı. 🎯
                  </p>

                  <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    Milyonlarca bireysel yatırımcı, kurumsal yatırımcıların onlarca yıldır kullandığı algoritmik
                    altyapıya erişemeden karar vermeye çalışıyor. Tüyo ile veri arasındaki fark görünmüyor.
                    Gürültü ile sinyal ayırt edilemiyor. Duygular analizi geçiyor.
                  </p>

                  <div
                    className="px-5 py-4 rounded-xl"
                    style={{
                      background: 'rgba(0, 200, 150, 0.06)',
                      border: '1px solid rgba(0, 200, 150, 0.15)',
                    }}
                  >
                    <p className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>
                      Bu bir bilgi sorunu değildi. <span style={{ color: 'var(--fk-cyan)' }}>Araç sorunuydu.</span>
                    </p>
                  </div>

                  <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    <strong style={{ color: 'var(--foreground)' }}>Sabancı Üniversitesi</strong>'nden mühendislik
                    ve finans geçmişine sahip iki ortak ve uzman bir ekiple Finans Kodu'nu bu yüzden kurdu.
                    Bireysel yatırımcının duygusal önyargılarını eleyen, kaynaklı ve şeffaf analize dayalı,
                    kara kutu değil <em style={{ color: 'var(--fk-cyan)' }}>cam kutu</em> çalışan bir sistem.
                  </p>
                </div>

                {/* Bugün bölümü */}
                <div
                  className="rounded-xl p-6"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p
                    className="font-semibold mb-4"
                    style={{ color: 'var(--foreground)', fontFamily: 'var(--font-syne)' }}
                  >
                    Bugün: 🚀
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: Target, text: 'Rule-based yatırım algoritmaları' },
                      { icon: TrendingUp, text: 'Yapay zeka destekli finansal analiz araçları' },
                      { icon: Users, text: 'Gerçek zamanlı topluluk: Kod Odası' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(0, 212, 255, 0.1)' }}
                        >
                          <Icon size={16} style={{ color: 'var(--fk-cyan)' }} />
                        </div>
                        <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-figtree)' }}>
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hedef */}
                <div
                  className="px-5 py-4 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(0,200,150,0.06) 100%)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                  }}
                >
                  <p className="text-sm font-mono mb-2" style={{ color: 'var(--fk-cyan)' }}>
                    // HEDEF
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: 'var(--foreground)', fontFamily: 'var(--font-figtree)' }}
                  >
                    Türkiye'deki her yatırımcının kurumsal kalitede analiz altyapısına erişmesi.
                  </p>
                  <p className="text-sm mt-3" style={{ color: 'var(--muted-foreground)' }}>
                    Tüyo değil, teknoloji. Tahmin değil, metodoloji. Karar her zaman sende. 🎯
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
