import { Helmet } from 'react-helmet-async';
import { useI18n } from '@/contexts/I18nContext';
import { Brain, ExternalLink, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayerButton from '@/components/AudioPlayerButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PromptItem {
  name: string;
  category: string;
  difficulty: 'Başlangıç' | 'Orta' | 'İleri';
  dateAdded: string;
  notes: string;
}

const promptLibrary: PromptItem[] = [
  {
    name: 'Hisse Senedi Temel Analiz',
    category: 'Analiz',
    difficulty: 'Başlangıç',
    dateAdded: '2024-01-15',
    notes: 'F/K, PD/DD gibi temel metrikleri değerlendirir',
  },
  {
    name: 'Teknik Gösterge Yorumlama',
    category: 'Teknik Analiz',
    difficulty: 'Orta',
    dateAdded: '2024-01-20',
    notes: 'RSI, MACD, Bollinger Bands yorumları',
  },
  {
    name: 'Portföy Optimizasyonu',
    category: 'Portföy Yönetimi',
    difficulty: 'İleri',
    dateAdded: '2024-02-01',
    notes: 'Modern Portföy Teorisi ile varlık dağılımı',
  },
  {
    name: 'Risk Analizi ve Yönetimi',
    category: 'Risk',
    difficulty: 'Orta',
    dateAdded: '2024-02-10',
    notes: 'VaR, Sharpe Ratio, maksimum düşüş analizi',
  },
  {
    name: 'Makroekonomik Veri Yorumlama',
    category: 'Makro Ekonomi',
    difficulty: 'İleri',
    dateAdded: '2024-02-15',
    notes: 'Enflasyon, faiz, işsizlik verilerinin piyasa etkisi',
  },
  {
    name: 'Finansal Tablo Analizi',
    category: 'Analiz',
    difficulty: 'Orta',
    dateAdded: '2024-02-20',
    notes: 'Bilanço, gelir tablosu, nakit akışı yorumlama',
  },
  {
    name: 'Sektör Karşılaştırması',
    category: 'Karşılaştırmalı Analiz',
    difficulty: 'Başlangıç',
    dateAdded: '2024-03-01',
    notes: 'Aynı sektördeki şirketlerin kıyaslanması',
  },
  {
    name: 'Opsiyon Stratejileri',
    category: 'Türev Ürünler',
    difficulty: 'İleri',
    dateAdded: '2024-03-05',
    notes: 'Call/Put, straddle, strangle stratejileri',
  },
];

const difficultyColors = {
  'Başlangıç': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  'Orta': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'İleri': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
};

export default function AIPromptLibraryPage() {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>AI Prompt Kütüphanesi: 100+ Finansal Analiz Komutu | Finans Kodu</title>
        <meta name="description" content="Finans profesyonelleri için 100+ yapay zeka prompt koleksiyonu. ChatGPT ve Claude ile finansal analiz, rapor hazırlama ve portföy yönetimi işlerini otomatikleştirin. Sanal analist, hazır şablonlar ve tam kapsam." />
        <meta name="keywords" content="finans AI prompt, ChatGPT finans, finansal analiz komutu, yapay zeka prompt kütüphanesi, finans otomasyon" />
        <link rel="canonical" href="https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi" />
        <meta property="og:title" content="AI Prompt Kütüphanesi: 100+ Finansal Analiz Komutu | Finans Kodu" />
        <meta property="og:description" content="Finans profesyonelleri için 100+ yapay zeka prompt koleksiyonu. ChatGPT ve Claude ile finansal analiz işlerini otomatikleştirin." />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "AI Prompt Kütüphanesi",
          "description": "Finans profesyonelleri için 100+ yapay zeka prompt koleksiyonu. ChatGPT ve Claude ile finansal analiz, rapor hazırlama ve portföy yönetimi işlerini otomatikleştirin.",
          "url": "https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi",
          "brand": { "@type": "Brand", "name": "Finans Kodu" },
          "category": "Dijital Ürün",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "TRY",
            "seller": { "@type": "Organization", "name": "Finans Kodu" }
          }
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="container py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Brain className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                {t('digitalTools.aiPromptLibrary.subtitle')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {t('digitalTools.aiPromptLibrary.title')}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('digitalTools.aiPromptLibrary.description')}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <Button size="lg" asChild className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <a href="https://hikie.space/link/checkout/j9p0eW1ITmovb8v0xE752kmcTTjyPZ3zSLnAuQlm" target="_blank" rel="noopener noreferrer">
                  Satın Al
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <AudioPlayerButton
                text={`${t('digitalTools.aiPromptLibrary.title')}. ${t('digitalTools.aiPromptLibrary.subtitle')}. ${t('digitalTools.aiPromptLibrary.description')}. Özellikler: ${['feature1','feature2','feature3','feature4','feature5','feature6'].map(k => t('digitalTools.aiPromptLibrary.' + k)).join('. ')}`}
                duration="~2 dk"
              />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Özellikler</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🧠', text: t('digitalTools.aiPromptLibrary.feature1') },
                { icon: '👔', text: t('digitalTools.aiPromptLibrary.feature2') },
                { icon: '⚡', text: t('digitalTools.aiPromptLibrary.feature3') },
                { icon: '📊', text: t('digitalTools.aiPromptLibrary.feature4') },
                { icon: '📋', text: t('digitalTools.aiPromptLibrary.feature5') },
                { icon: '🚀', text: t('digitalTools.aiPromptLibrary.feature6') },
              ].map((feature, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <p className="text-sm text-muted-foreground">{feature.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Prompt Library Table */}
        <section className="container py-12">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Prompt Kütüphanesi</CardTitle>
                <CardDescription>
                  Finansal analiz için hazır komutlar. Kopyalayın, yapıştırın ve AI'ınızı eğitin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Prompt Adı</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Kategori</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Zorluk</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Eklenme Tarihi</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Notlar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promptLibrary.map((prompt, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-medium text-foreground">{prompt.name}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Tag className="w-4 h-4" />
                              <span className="text-sm">{prompt.category}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={difficultyColors[prompt.difficulty]}>
                              {prompt.difficulty}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{prompt.dateAdded}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground max-w-xs">
                            {prompt.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Sıkça Sorulan Sorular</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    {
                      q: t('digitalTools.aiPromptLibrary.faq1Question'),
                      a: t('digitalTools.aiPromptLibrary.faq1Answer'),
                    },
                    {
                      q: t('digitalTools.aiPromptLibrary.faq2Question'),
                      a: t('digitalTools.aiPromptLibrary.faq2Answer'),
                    },
                    {
                      q: t('digitalTools.aiPromptLibrary.faq3Question'),
                      a: t('digitalTools.aiPromptLibrary.faq3Answer'),
                    },
                    {
                      q: t('digitalTools.aiPromptLibrary.faq4Question'),
                      a: t('digitalTools.aiPromptLibrary.faq4Answer'),
                    },
                    {
                      q: t('digitalTools.aiPromptLibrary.faq5Question'),
                      a: t('digitalTools.aiPromptLibrary.faq5Answer'),
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                        {faq.q}
                      </h3>
                      <p className="text-muted-foreground text-sm pl-7">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/20">
              <CardContent className="pt-12 pb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Hemen Başlayın
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  100+ profesyonel komutla AI asistanınızı finansal analist seviyesine çıkarın.
                </p>
                <Button size="lg" asChild className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <a href="https://hikie.space/link/checkout/j9p0eW1ITmovb8v0xE752kmcTTjyPZ3zSLnAuQlm" target="_blank" rel="noopener noreferrer">
                    Satın Al
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
