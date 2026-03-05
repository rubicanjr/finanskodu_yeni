import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useI18n } from '@/contexts/I18nContext';
import { TrendingUp, ExternalLink, ChevronLeft, Check, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayerButton from '@/components/AudioPlayerButton';

const product = {
  shortTitle: 'Pro — Algoritmik Strateji Bülteni',
  buyUrl: 'https://www.hikie.space/finanskodu/algoritmik-strateji-ve-analiz',
  consultUrl: 'https://cal.com/rubi-can',
  summaryItems: [
    'Haftalık algoritmik altın alım-satım sinyalleri: Duygu yok, tahmin yok, sadece matematik',
    'Akıllı fon sepeti önerileri: Hisse senedi, tahvil ve emtia dengesini optimize et',
    'Haftalık sesli brifing: Piyasaları 7 dakikada öğren, harekete geç',
    'Kanıtlanmış model: Geçmiş performansı görülebilir, veri isabeti ölçülebilir',
    'Aylık 1:1 finansal check-up: Portföyündeki mantık hatalarını birlikte temizle',
    'VIP iletişim hattı: WhatsApp/Telegram üzerinden öncelikli destek',
  ],
  thirtyDayItems: [
    'Altın algoritmasını portföyüne entegre et, ilk sinyali al',
    'Akıllı fon sepeti ile portföyünü çeşitlendir ve riski dağıt',
    'Haftalık sesli brifinglerle piyasaları hiç kaçırmadan takip et',
    '1:1 check-up görüşmesinde kişisel finansal reçeteni al',
    'Portföyündeki duygusal kararları sistematik bir çerçeveyle değiştir',
  ],
};

const tabs = [
  { id: 'about', label: 'Bu Ürün Hakkında' },
  { id: 'includes', label: 'Neler İçeriyor' },
  { id: 'bonus', label: 'Bonus' },
  { id: 'faq', label: 'Sıkça Sorulan Sorular' },
  { id: 'founder', label: 'Kurucu Stratejistimiz' },
];

export default function ProBultenPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('about');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t('digitalTools.proBulletin.faq1Question'), a: t('digitalTools.proBulletin.faq1Answer') },
    { q: t('digitalTools.proBulletin.faq2Question'), a: t('digitalTools.proBulletin.faq2Answer') },
    { q: t('digitalTools.proBulletin.faq3Question'), a: t('digitalTools.proBulletin.faq3Answer') },
    { q: t('digitalTools.proBulletin.faq4Question'), a: t('digitalTools.proBulletin.faq4Answer') },
    { q: t('digitalTools.proBulletin.faq5Question'), a: t('digitalTools.proBulletin.faq5Answer') },
  ];

  return (
    <>
      <Helmet>
        <title>Pro Algoritmik Strateji Bülteni | Finans Kodu</title>
        <meta name="description" content="Aylık algoritmik strateji bülteni: Altın algoritması, akıllı fon sepetleri, haftalık sesli brifing ve 1:1 finansal check-up. Kanıtlanmış model ve yüksek veri isabeti ile piyasalarda öne geçin." />
        <meta name="keywords" content="algoritmik strateji bülteni, piyasa analizi, altın algoritması, fon sepeti, finansal brifing, borsa sinyali" />
        <link rel="canonical" href="https://finanskodu.com/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni" />
        <meta property="og:title" content="Pro Algoritmik Strateji ve Analiz Bülteni | Aylık Piyasa Analizi" />
        <meta property="og:description" content="Aylık algoritmik strateji bülteni: Altın algoritması, akıllı fon sepetleri ve 1:1 finansal check-up ile piyasalarda öne geçin." />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://finanskodu.com/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "Dijital Araçlar", "item": "https://finanskodu.com/dijital-araclar" },
            { "@type": "ListItem", "position": 3, "name": "Pro Algoritmik Strateji Bülteni", "item": "https://finanskodu.com/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Pro - Algoritmik Strateji ve Analiz Bülteni",
          "description": "Aylık algoritmik strateji bülteni. Altın algoritması, akıllı fon sepetleri, haftalık sesli brifing, kanıtlanmış model ve 1:1 finansal check-up.",
          "url": "https://finanskodu.com/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni",
          "brand": { "@type": "Brand", "name": "Finans Kodu" },
          "category": "Dijital Ürün",
          "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "TRY", "seller": { "@type": "Organization", "name": "Finans Kodu" } }
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background pb-20">

        {/* ── TOPBAR ── */}
        <div className="bg-[var(--card)] border-b border-border px-6 py-2.5 flex items-center gap-2 text-sm">
          <span className="text-muted-foreground/60">finanskodu</span>
          <span className="text-muted-foreground/30">/</span>
          <span className="font-bold text-foreground">Dijital Araçlar</span>
          <Link to="/dijital-araclar" className="ml-auto flex items-center gap-1.5 text-muted-foreground/60 hover:text-foreground transition-colors text-xs">
            <ChevronLeft className="w-3.5 h-3.5" />
            Dijital Araçlar
          </Link>
        </div>

        {/* ── HERO + CTA ── */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-amber-500 tracking-wide uppercase">// Algoritmik Strateji</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {t('digitalTools.proBulletin.title')}
              </h1>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-sm flex-shrink-0">PRO</span>
            </div>

            <p className="text-base text-muted-foreground max-w-[640px]">
              {t('digitalTools.proBulletin.description')}
            </p>

            {/* Fiyat Gösterimi */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-bold text-orange-400">9.999 TL</span>
              <span className="text-lg text-muted-foreground line-through">12.999 TL</span>
              <span className="text-xs font-semibold bg-orange-500/15 text-orange-400 px-2 py-0.5 rounded-full">
                %23 İndirim
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                <a href={product.buyUrl} target="_blank" rel="noopener noreferrer">
                  Satın Al (1 Aylık Erişim)
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-foreground/20 text-foreground hover:bg-foreground/5">
                <a href={product.consultUrl} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 w-4 h-4" />
                  Ücretsiz Danışma
                </a>
              </Button>
              <AudioPlayerButton
                text={`${t('digitalTools.proBulletin.title')}. ${t('digitalTools.proBulletin.description')}`}
                duration="~3 dk"
              />
            </div>
            <p className="text-xs text-muted-foreground/60">Ücretsiz · Bağlayıcı değil · 30 dakika</p>
          </div>
        </section>

        {/* ── SUMMARY GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto px-6 py-6">
          {/* Öğrenme Özeti */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-lg">📊</div>
              <div>
                <div className="font-bold text-sm text-foreground">Öğrenme Özeti</div>
                <div className="text-xs text-muted-foreground">Bu pakette neler var?</div>
              </div>
            </div>
            <ul className="space-y-2">
              {product.summaryItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-amber-500" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 30 Günde */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-lg">🎯</div>
              <div>
                <div className="font-bold text-sm text-foreground">30 Günde Yapabileceklerin</div>
                <div className="text-xs text-muted-foreground">Somut çıktılar</div>
              </div>
            </div>
            <ul className="space-y-2">
              {product.thirtyDayItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-emerald-500" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── STICKY TAB BAR ── */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border">
          <div className="max-w-4xl mx-auto px-6 flex gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB PANELS ── */}
        <div className="max-w-4xl mx-auto px-6 py-8">

          {/* about */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {t('digitalTools.proBulletin.description')} Pro bülten, algoritmik analiz ve kişisel danışmanlığı bir arada sunan premium bir finansal istihbarat hizmetidir.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Her ay, kanıtlanmış algoritmik modeller kullanılarak hazırlanan altın sinyalleri, fon sepeti önerileri ve sesli brifinglerle piyasalarda bir adım önde olun. Aylık 1:1 check-up görüşmesiyle stratejinizi kişiselleştirin.
              </p>
              <div className="border-l-4 border-amber-500 pl-5 py-2 bg-amber-500/5 rounded-r-lg">
                <p className="text-foreground font-medium italic">
                  "Algoritmik analiz, duygusal kararların önüne geçer. Pro bülten, bu disiplini herkes için erişilebilir kılıyor."
                </p>
                <p className="text-sm text-muted-foreground mt-1">— Rubi Can İçliyürek, Co-Founder & CIO</p>
              </div>
            </div>
          )}

          {/* includes */}
          {activeTab === 'includes' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '🥇', title: 'Altın Algoritması', desc: 'Haftalık algoritmik altın alım-satım sinyalleri' },
                  { icon: '📈', title: 'Akıllı Fon Sepeti', desc: 'Hisse senedi, tahvil ve emtia önerileri' },
                  { icon: '🎙️', title: 'Sesli Brifing', desc: 'Vera ve Sarp tarafından hazırlanan haftalık ses analizi' },
                  { icon: '🚀', title: 'Kanıtlanmış Model', desc: 'Yüksek veri isabeti ile test edilmiş algoritmalar' },
                  { icon: '🎯', title: '1:1 Check-up', desc: 'Aylık kişisel finansal değerlendirme görüşmesi' },
                  { icon: '🔍', title: 'Kişisel Reçete', desc: 'Size özel finansal strateji ve öneriler' },
                  { icon: '🛣️', title: 'Özel Raporlar', desc: 'Derinlemesine piyasa analiz raporları' },
                  { icon: '📲', title: 'VIP İletişim', desc: 'WhatsApp/Telegram üzerinden öncelikli destek' },
                ].map((f, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
                    <span className="text-2xl">{f.icon}</span>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{f.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-4">Bültene Dahil Olanlar</h3>
                <ul className="space-y-3">
                  {[
                    'Haftalık algoritmik altın alım-satım sinyalleri',
                    'Akıllı fon sepeti önerileri (hisse senedi, tahvil, emtia)',
                    'Sesli brifing (Vera ve Sarp tarafından hazırlanmış)',
                    'Kanıtlanmış model ile yüksek veri isabeti',
                    'Aylık 1:1 finansal check-up görüşmesi',
                    'Kişisel finansal reçete ve strateji önerileri',
                    'VIP iletişim hattı (WhatsApp/Telegram)',
                    'Özel raporlar ve piyasa analizleri',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* bonus */}
          {activeTab === 'bonus' && (
            <div className="space-y-4">
              {[
                { num: '01', title: 'Onboarding Görüşmesi', desc: 'Aboneliğinizin ilk haftasında 30 dakikalık ücretsiz tanışma görüşmesi. Finansal hedeflerinizi belirleyin ve kişiselleştirilmiş bir başlangıç planı alın.' },
                { num: '02', title: 'Geçmiş Bülten Arşivi', desc: 'Son 3 aylık tüm bülten ve analizlere anında erişim. Geçmiş sinyallerin performansını inceleyin ve modelin doğruluğunu kendiniz doğrulayın.' },
                { num: '03', title: 'Özel Telegram Kanalı', desc: 'Anlık piyasa güncellemeleri ve acil sinyaller için özel Telegram kanalına erişim. Kritik gelişmeleri gerçek zamanlı takip edin.' },
                { num: '04', title: 'Yıllık Piyasa Takvimi', desc: 'Merkez bankası toplantıları, ekonomik veri açıklamaları ve kritik tarihler için hazırlanmış özel piyasa takvimi.' },
              ].map((bonus, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 flex gap-4"
                  style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(249,115,22,0.05) 100%)', border: '1px solid rgba(245,158,11,0.15)' }}
                >
                  <div className="text-2xl font-black text-amber-500/30 font-mono leading-none flex-shrink-0 mt-0.5">{bonus.num}</div>
                  <div>
                    <div className="font-bold text-foreground mb-1">{bonus.title}</div>
                    <div className="text-sm text-muted-foreground">{bonus.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* faq */}
          {activeTab === 'faq' && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-border last:border-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-medium text-foreground text-sm">{faq.q}</span>
                    <span className="text-muted-foreground flex-shrink-0 text-lg leading-none">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* founder */}
          {activeTab === 'founder' && (
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-black text-amber-500">RC</span>
                </div>
                <div>
                  <div className="font-bold text-foreground text-lg">Rubi Can İçliyürek</div>
                  <div className="text-sm text-muted-foreground">Co-Founder & CIO, Finans Kodu</div>
                  <div className="flex gap-2 mt-2">
                    <a href="https://www.linkedin.com/in/rubi-can-icliyurek/" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">LinkedIn</a>
                    <a href="https://x.com/finansk0du" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 rounded-full bg-foreground/5 text-foreground border border-border hover:bg-foreground/10 transition-colors">X / Twitter</a>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Endüstri Mühendisliği, Finansal Operasyonlar ve Yapay Zeka teknolojilerini birleştiren Rubi Can İçliyürek, finansal kaosunuzu kod yazmadan düzenli bir mühendislik harikasına dönüştürmek için Finans Kodu'nu kurdu.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Pro bülten, Rubi Can'ın yıllar içinde geliştirdiği algoritmik modellerin ve piyasa analiz metodolojisinin doğrudan abonelere sunulduğu premium hizmettir. Her sinyal, gerçek portföy yönetimi deneyimiyle desteklenmektedir.
              </p>
              <div className="border-l-4 border-amber-500 pl-5 py-2 bg-amber-500/5 rounded-r-lg">
                <p className="text-foreground font-medium italic">
                  "Algoritmalar duygu tanımaz. Bu bülten, piyasalara duygusuz ama akıllıca yaklaşmanın somut bir örneğidir."
                </p>
                <p className="text-sm text-muted-foreground mt-1">— Rubi Can İçliyürek</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── STICKY CTA BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-md border-t border-border px-6 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold text-sm text-foreground">{product.shortTitle}</div>
          <div className="text-xs text-muted-foreground">1 Aylık Erişim · Ücretsiz danışma mevcut</div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild className="border-foreground/20 text-foreground hover:bg-foreground/5 text-xs">
            <a href={product.consultUrl} target="_blank" rel="noopener noreferrer">Ücretsiz Danışma</a>
          </Button>
          <Button size="sm" asChild className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold">
            <a href={product.buyUrl} target="_blank" rel="noopener noreferrer">Satın Al</a>
          </Button>
        </div>
      </div>
    </>
  );
}
