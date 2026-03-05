import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useI18n } from '@/contexts/I18nContext';
import { Brain, ExternalLink, ChevronLeft, Check, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayerButton from '@/components/AudioPlayerButton';
import { Badge } from '@/components/ui/badge';

interface PromptItem {
  name: string;
  category: string;
  difficulty: 'Başlangıç' | 'Orta' | 'İleri';
  dateAdded: string;
  notes: string;
}

const promptLibrary: PromptItem[] = [
  { name: 'Hisse Senedi Temel Analiz', category: 'Analiz', difficulty: 'Başlangıç', dateAdded: '2024-01-15', notes: 'F/K, PD/DD gibi temel metrikleri değerlendirir' },
  { name: 'Teknik Gösterge Yorumlama', category: 'Teknik Analiz', difficulty: 'Orta', dateAdded: '2024-01-20', notes: 'RSI, MACD, Bollinger Bands yorumları' },
  { name: 'Portföy Optimizasyonu', category: 'Portföy Yönetimi', difficulty: 'İleri', dateAdded: '2024-02-01', notes: 'Modern Portföy Teorisi ile varlık dağılımı' },
  { name: 'Risk Analizi ve Yönetimi', category: 'Risk', difficulty: 'Orta', dateAdded: '2024-02-10', notes: 'VaR, Sharpe Ratio, maksimum düşüş analizi' },
  { name: 'Makroekonomik Veri Yorumlama', category: 'Makro Ekonomi', difficulty: 'İleri', dateAdded: '2024-02-15', notes: 'Enflasyon, faiz, işsizlik verilerinin piyasa etkisi' },
  { name: 'Finansal Tablo Analizi', category: 'Analiz', difficulty: 'Orta', dateAdded: '2024-02-20', notes: 'Bilanço, gelir tablosu, nakit akışı yorumlama' },
  { name: 'Sektör Karşılaştırması', category: 'Karşılaştırmalı Analiz', difficulty: 'Başlangıç', dateAdded: '2024-03-01', notes: 'Aynı sektördeki şirketlerin kıyaslanması' },
  { name: 'Opsiyon Stratejileri', category: 'Türev Ürünler', difficulty: 'İleri', dateAdded: '2024-03-05', notes: 'Call/Put, straddle, strangle stratejileri' },
];

const difficultyColors = {
  'Başlangıç': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  'Orta': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'İleri': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
};

const product = {
  shortTitle: 'AI Prompt Kütüphanesi',
  buyUrl: 'https://hikie.space/link/checkout/j9p0eW1ITmovb8v0xE752kmcTTjyPZ3zSLnAuQlm',
  consultUrl: 'https://cal.com/rubi-can',
  summaryItems: [
    'Finansal analiz, portföy yönetimi ve piyasa yorumlama için özel olarak tasarlanmış 100+ prompt',
    'ChatGPT, Claude ve Gemini ile test edilmiş, anında kullanıma hazır şablonlar',
    'Temel analiz, teknik analiz, makroekonomik yorum ve risk yönetimi kategorileri',
    'Kopyala-yapıştır formatı: Sıfır kurulum, anında sonuç',
    'Sürekli güncellenen kütüphane: Piyasa koşullarına göre yeni promptlar ekleniyor',
    'Başlangıç, Orta ve İleri seviye olarak sınıflandırılmış yapı',
  ],
  thirtyDayItems: [
    'Saatler süren finansal rapor analizini dakikalara indir',
    'Portföyündeki riskleri ve fırsatları AI ile otomatik olarak tespit et',
    'Haber akışını piyasa etkisi açısından filtrele, gürültüyü kes',
    'Teknik analiz yorumlarını standartlaştır ve hızlandır',
    'Kendi kişisel AI analist asistanını sıfırdan kur',
  ],
};

const tabs = [
  { id: 'about', label: 'Bu Ürün Hakkında' },
  { id: 'includes', label: 'Neler İçeriyor' },
  { id: 'bonus', label: 'Bonus' },
  { id: 'faq', label: 'Sıkça Sorulan Sorular' },
  { id: 'founder', label: 'Kurucu Stratejistimiz' },
];

export default function AIPromptLibraryPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('about');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t('digitalTools.aiPromptLibrary.faq1Question'), a: t('digitalTools.aiPromptLibrary.faq1Answer') },
    { q: t('digitalTools.aiPromptLibrary.faq2Question'), a: t('digitalTools.aiPromptLibrary.faq2Answer') },
    { q: t('digitalTools.aiPromptLibrary.faq3Question'), a: t('digitalTools.aiPromptLibrary.faq3Answer') },
    { q: t('digitalTools.aiPromptLibrary.faq4Question'), a: t('digitalTools.aiPromptLibrary.faq4Answer') },
    { q: t('digitalTools.aiPromptLibrary.faq5Question'), a: t('digitalTools.aiPromptLibrary.faq5Answer') },
  ];

  return (
    <>
      <Helmet>
        <title>AI Prompt Kütüphanesi | 100+ Finansal Komut | Finans Kodu</title>
        <meta name="description" content="Finans profesyonelleri için 100+ yapay zeka prompt koleksiyonu. ChatGPT ve Claude ile finansal analiz, rapor hazırlama ve portföy yönetimi işlerini otomatikleştirin." />
        <meta name="keywords" content="finans AI prompt, ChatGPT finans, finansal analiz komutu, yapay zeka prompt kütüphanesi, finans otomasyon" />
        <link rel="canonical" href="https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi" />
        <meta property="og:title" content="AI Prompt Kütüphanesi: 100+ Finansal Analiz Komutu | Finans Kodu" />
        <meta property="og:description" content="Finans profesyonelleri için 100+ yapay zeka prompt koleksiyonu. ChatGPT ve Claude ile finansal analiz işlerini otomatikleştirin." />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "Dijital Araçlar", "item": "https://finanskodu.com/dijital-araclar" },
            { "@type": "ListItem", "position": 3, "name": "AI Prompt Kütüphanesi", "item": "https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "AI Prompt Kütüphanesi",
          "description": "Finans profesyonelleri için 100+ yapay zeka prompt koleksiyonu.",
          "url": "https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi",
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Brain className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-semibold text-cyan-500 tracking-wide uppercase">// Yapay Zeka Araç Seti</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {t('digitalTools.aiPromptLibrary.title')}
            </h1>

            <p className="text-base text-muted-foreground max-w-[640px]">
              {t('digitalTools.aiPromptLibrary.description')}
            </p>

            {/* Fiyat Gösterimi */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-bold text-orange-400">299 TL</span>
              <span className="text-lg text-muted-foreground line-through">699 TL</span>
              <span className="text-xs font-semibold bg-orange-500/15 text-orange-400 px-2 py-0.5 rounded-full">
                %57 İndirim
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
                text={`${t('digitalTools.aiPromptLibrary.title')}. ${t('digitalTools.aiPromptLibrary.description')}`}
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
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-lg">📊</div>
              <div>
                <div className="font-bold text-sm text-foreground">Öğrenme Özeti</div>
                <div className="text-xs text-muted-foreground">Bu pakette neler var?</div>
              </div>
            </div>
            <ul className="space-y-2">
              {product.summaryItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-cyan-500" />
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
                    ? 'border-cyan-500 text-cyan-500'
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
                {t('digitalTools.aiPromptLibrary.description')} Finans profesyonelleri ve bireysel yatırımcılar için tasarlanan bu koleksiyon, ChatGPT ve Claude gibi büyük dil modelleriyle çalışacak şekilde optimize edilmiştir.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Her prompt, gerçek finansal analiz senaryolarında test edilmiş ve rafine edilmiştir. Temel analizden teknik analize, portföy yönetiminden risk hesaplamalarına kadar geniş bir yelpazede kullanıma hazır komutlar içerir.
              </p>
              <div className="border-l-4 border-cyan-500 pl-5 py-2 bg-cyan-500/5 rounded-r-lg">
                <p className="text-foreground font-medium italic">
                  "AI asistanınızı finansal analist seviyesine çıkarmak için ihtiyacınız olan tek kaynak."
                </p>
                <p className="text-sm text-muted-foreground mt-1">— Rubi Can İçliyürek, Co-Founder & CIO</p>
              </div>
            </div>
          )}

          {/* includes */}
          {activeTab === 'includes' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '🧠', title: '100+ Test Edilmiş Prompt', desc: 'Gerçek senaryolarda doğrulanmış komutlar' },
                  { icon: '👔', title: 'Profesyonel Şablonlar', desc: 'Kurumsal raporlama için hazır formatlar' },
                  { icon: '⚡', title: 'Anında Kullanım', desc: 'Kopyala-yapıştır ile sıfır kurulum' },
                  { icon: '📊', title: 'Kategori Sistemi', desc: 'Analiz, teknik, portföy, risk, makro' },
                  { icon: '📋', title: 'Düzenli Güncellemeler', desc: 'Yeni promptlar sürekli ekleniyor' },
                  { icon: '🚀', title: 'Zorluk Seviyeleri', desc: 'Başlangıçtan ileri seviyeye kademeli öğrenme' },
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
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-border">
                  <h3 className="font-semibold text-foreground text-sm">Prompt Kütüphanesi Önizlemesi</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Prompt Adı</th>
                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Kategori</th>
                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Zorluk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promptLibrary.map((prompt, index) => (
                        <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="py-2.5 px-4 font-medium text-foreground">{prompt.name}</td>
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Tag className="w-3.5 h-3.5" />
                              <span>{prompt.category}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-4">
                            <Badge variant="outline" className={difficultyColors[prompt.difficulty]}>
                              {prompt.difficulty}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* bonus */}
          {activeTab === 'bonus' && (
            <div className="space-y-4">
              {[
                { num: '01', title: 'Hızlı Başlangıç Rehberi', desc: 'AI asistanınızı finansal analist olarak yapılandırmak için adım adım kurulum kılavuzu. İlk promptunuzu 10 dakikada çalıştırın.' },
                { num: '02', title: 'Sistem Promptu Şablonu', desc: 'ChatGPT ve Claude için özel hazırlanmış "finansal analist" sistem promptu. Tüm sohbetlerinizi bu şablonla başlatın.' },
                { num: '03', title: 'Prompt Zincirleme Rehberi', desc: 'Birden fazla promptu birbirine bağlayarak derin analiz yapma tekniği. Karmaşık finansal soruları adım adım çözün.' },
                { num: '04', title: 'Excel Entegrasyon Şablonları', desc: 'AI çıktılarını doğrudan Excel\'e aktarmak için hazır formüller ve makrolar.' },
              ].map((bonus, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 flex gap-4"
                  style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(0,200,150,0.05) 100%)', border: '1px solid rgba(0,212,255,0.15)' }}
                >
                  <div className="text-2xl font-black text-cyan-500/30 font-mono leading-none flex-shrink-0 mt-0.5">{bonus.num}</div>
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-black text-cyan-500">RC</span>
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
                Bu prompt kütüphanesi, yıllar içinde gerçek portföy yönetimi ve finansal analiz süreçlerinde test edilmiş komutların derlemesidir. Her prompt, pratikte işe yaradığı kanıtlanmış bir araçtır.
              </p>
              <div className="border-l-4 border-cyan-500 pl-5 py-2 bg-cyan-500/5 rounded-r-lg">
                <p className="text-foreground font-medium italic">
                  "Finansal analizi herkes için erişilebilir kılmak istiyorum. Bu kütüphane, o yolculuğun ilk adımı."
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
