import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useI18n } from '@/contexts/I18nContext';
import { BookOpen, ExternalLink, ChevronLeft, Check, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayerButton from '@/components/AudioPlayerButton';

const product = {
  shortTitle: 'Kaos İçinde Düzen',
  buyUrl: 'https://hikie.space/link/checkout/wSUWqMlyV3n7eOJIAEBk7yq9FuOL92FKXHRk8sk',
  consultUrl: 'https://cal.com/rubi-can',
  summaryItems: [
    'Finansal kararları mühendislik perspektifiyle ele alan, duygusal hata oranını sıfıra indiren çerçeve',
    'Panik ve açgözlük döngüsünü kıran duygu-bozucu algoritmalar',
    'Risk/getiri mühendisliği: Matematiksel modeller ve karar matrisleri',
    'Sürdürülebilir varlık döngüsü: Portföyünü sistematik olarak büyüt',
    'Piyasa gürültüsünü filtreleme: Sinyal mi, gürültü mü? Farkı öğren',
    'Hazır şablonlar ve araç seti: Hemen uygula, anında sonuç al',
  ],
  thirtyDayItems: [
    'Duygusal yatırım hatalarını algoritmik düşünceyle tamamen önle',
    'Risk ve getiri dengesini sistematik bir çerçeveyle yönet',
    'Kendi kişisel finansal karar matrisini oluştur ve uygula',
    'Piyasa gürültüsünü filtreleyerek doğru sinyallere odaklan',
    'Portföyünü sürdürülebilir bir varlık döngüsü üzerine kur',
  ],
};

const tabs = [
  { id: 'about', label: 'Bu Ürün Hakkında' },
  { id: 'includes', label: 'Neler İçeriyor' },
  { id: 'bonus', label: 'Bonus' },
  { id: 'faq', label: 'Sıkça Sorulan Sorular' },
  { id: 'founder', label: 'Kurucu Stratejistimiz' },
];

export default function FinansKoduPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('about');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t('digitalTools.finansKodu.faq1Question'), a: t('digitalTools.finansKodu.faq1Answer') },
    { q: t('digitalTools.finansKodu.faq2Question'), a: t('digitalTools.finansKodu.faq2Answer') },
    { q: t('digitalTools.finansKodu.faq3Question'), a: t('digitalTools.finansKodu.faq3Answer') },
    { q: t('digitalTools.finansKodu.faq4Question'), a: t('digitalTools.finansKodu.faq4Answer') },
    { q: t('digitalTools.finansKodu.faq5Question'), a: t('digitalTools.finansKodu.faq5Answer') },
  ];

  return (
    <>
      <Helmet>
        <title>Finans Kodu: Kaos İçinde Düzen | Metodoloji Seti</title>
        <meta name="description" content="Finansal operasyonlarınızı dönüştürecek kapsamlı metodoloji ve araç seti. Mühendislik perspektifi, duygu-bozucu algoritmalar, risk/getiri mühendisliği ve sürdürülebilir varlık döngüsü ile piyasalarda kaosı düzene çevirin." />
        <meta name="keywords" content="finansal metodoloji, algoritmik ticaret sistemi, risk getiri mühendisliği, finansal otomasyon, piyasa analizi sistemi" />
        <link rel="canonical" href="https://finanskodu.com/dijital-araclar/finans-kodu-kaos-icinde-duzen" />
        <meta property="og:title" content="FİNANS KODU: Kaos İçinde Düzen | Finansal Metodoloji ve Araç Seti" />
        <meta property="og:description" content="Finansal operasyonlarınızı dönüştürecek kapsamlı metodoloji ve araç seti. Mühendislik perspektifi ile piyasalarda kaosı düzene çevirin." />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://finanskodu.com/dijital-araclar/finans-kodu-kaos-icinde-duzen" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "Dijital Araçlar", "item": "https://finanskodu.com/dijital-araclar" },
            { "@type": "ListItem", "position": 3, "name": "Finans Kodu: Kaos İçinde Düzen", "item": "https://finanskodu.com/dijital-araclar/finans-kodu-kaos-icinde-duzen" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "FİNANS KODU: Kaos İçinde Düzen",
          "description": "Finansal operasyonlarınızı dönüştürecek kapsamlı metodoloji ve araç seti.",
          "url": "https://finanskodu.com/dijital-araclar/finans-kodu-kaos-icinde-duzen",
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500 tracking-wide uppercase">// Algoritmik Strateji</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {t('digitalTools.finansKodu.title')}
            </h1>

            <p className="text-base text-muted-foreground max-w-[640px]">
              {t('digitalTools.finansKodu.description')}
            </p>

            {/* Fiyat Gösterimi */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-bold text-orange-400">890 TL</span>
              <span className="text-lg text-muted-foreground line-through">1.199 TL</span>
              <span className="text-xs font-semibold bg-orange-500/15 text-orange-400 px-2 py-0.5 rounded-full">
                %26 İndirim
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                <a href={product.buyUrl} target="_blank" rel="noopener noreferrer">
                  Satın Al
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
                text={`${t('digitalTools.finansKodu.title')}. ${t('digitalTools.finansKodu.description')}`}
                duration="~2 dk"
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
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-lg">📊</div>
              <div>
                <div className="font-bold text-sm text-foreground">Öğrenme Özeti</div>
                <div className="text-xs text-muted-foreground">Bu pakette neler var?</div>
              </div>
            </div>
            <ul className="space-y-2">
              {product.summaryItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-emerald-500" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 30 Günde */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-lg">🎯</div>
              <div>
                <div className="font-bold text-sm text-foreground">30 Günde Yapabileceklerin</div>
                <div className="text-xs text-muted-foreground">Somut çıktılar</div>
              </div>
            </div>
            <ul className="space-y-2">
              {product.thirtyDayItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-cyan-500" />
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
                    ? 'border-emerald-500 text-emerald-500'
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
                {t('digitalTools.finansKodu.description')} Bu metodoloji, finansal kararları mühendislik perspektifiyle ele alarak duygusal hataları sistemden çıkarır.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Piyasalardaki kaos, doğru araçlarla düzene dönüştürülebilir. Kaos İçinde Düzen, yatırımcıların ve finansal profesyonellerin kendi algoritmik karar sistemlerini kurmasına yardımcı olan kapsamlı bir metodoloji ve araç setidir.
              </p>
              <div className="border-l-4 border-emerald-500 pl-5 py-2 bg-emerald-500/5 rounded-r-lg">
                <p className="text-foreground font-medium italic">
                  "Finansal başarı, doğru kararlar vermekle değil; sistematik bir karar çerçevesi oluşturmakla gelir."
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
                  { icon: '🏭', title: 'Mühendislik Perspektifi', desc: 'Finansal kararları sistematik bir süreç olarak ele alma' },
                  { icon: '🧠', title: 'Duygu-Bozucu Algoritmalar', desc: 'Duygusal yatırım hatalarını önleyen karar çerçeveleri' },
                  { icon: '⚖️', title: 'Risk/Getiri Mühendisliği', desc: 'Optimal risk-getiri dengesi için matematiksel modeller' },
                  { icon: '🔄', title: 'Varlık Döngüsü', desc: 'Sürdürülebilir portföy büyüme stratejileri' },
                  { icon: '🎯', title: 'Karar Matrisleri', desc: 'Karmaşık finansal kararları basitleştiren şablonlar' },
                  { icon: '🚫', title: 'Gürültü Filtreleme', desc: 'Piyasa gürültüsünü sinyal olarak yorumlamayı önleme' },
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
                <h3 className="font-semibold text-foreground mb-4">Neler Öğreneceksiniz?</h3>
                <ul className="space-y-3">
                  {[
                    'Finansal kararları mühendislik perspektifiyle nasıl alırsınız',
                    'Duygusal yatırım hatalarını algoritmik düşünceyle nasıl önlersiniz',
                    'Risk ve getiri dengesini sistematik olarak nasıl yönetirsiniz',
                    'Varlık döngüsünü sürdürülebilir şekilde nasıl kurarsınız',
                    'Karar matrislerini finansal stratejinize nasıl entegre edersiniz',
                    'Piyasa gürültüsünü filtreleyerek odaklanmanız gereken sinyalleri nasıl bulursunuz',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
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
                { num: '01', title: 'Finansal Karar Matrisi Şablonu', desc: 'Excel ve Notion formatında hazır karar matrisi. Yatırım kararlarınızı bu şablonla yapılandırın ve duygusal kararları sistemden çıkarın.' },
                { num: '02', title: 'Risk Hesaplama Araç Seti', desc: 'Portföy risk analizi için hazır formüller. VaR, Sharpe Ratio ve maksimum düşüş hesaplamalarını otomatikleştirin.' },
                { num: '03', title: 'Haftalık Gözden Geçirme Protokolü', desc: 'Portföyünüzü sistematik olarak gözden geçirmek için adım adım kontrol listesi ve değerlendirme kriterleri.' },
                { num: '04', title: 'Piyasa Gürültüsü Filtresi', desc: 'Hangi haberlerin gerçekten önemli olduğunu belirlemek için özel geliştirilen filtreleme çerçevesi.' },
              ].map((bonus, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 flex gap-4"
                  style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(0,212,255,0.05) 100%)', border: '1px solid rgba(16,185,129,0.15)' }}
                >
                  <div className="text-2xl font-black text-emerald-500/30 font-mono leading-none flex-shrink-0 mt-0.5">{bonus.num}</div>
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-black text-emerald-500">RC</span>
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
                Kaos İçinde Düzen metodolojisi, yıllar içinde gerçek portföy yönetimi deneyiminden damıtılmıştır. Her araç ve çerçeve, pratikte test edilmiş ve sonuç verdiği kanıtlanmıştır.
              </p>
              <div className="border-l-4 border-emerald-500 pl-5 py-2 bg-emerald-500/5 rounded-r-lg">
                <p className="text-foreground font-medium italic">
                  "Piyasalar kaotik görünür, ama altında her zaman bir düzen vardır. Onu bulmak için doğru araçlara ihtiyacınız var."
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
