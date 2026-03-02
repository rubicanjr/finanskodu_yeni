import { Helmet } from 'react-helmet-async';
import { useI18n } from '@/contexts/I18nContext';
import { BookOpen, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayerButton from '@/components/AudioPlayerButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FinansKoduPage() {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>FİNANS KODU: Kaos İçinde Düzen | Finansal Metodoloji ve Araç Seti | Finans Kodu</title>
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
          "description": "Finansal operasyonlarınızı dönüştürecek kapsamlı metodoloji ve araç seti. Mühendislik perspektifi, duygu-bozucu algoritmalar, risk/getiri mühendisliği.",
          "url": "https://finanskodu.com/dijital-araclar/finans-kodu-kaos-icinde-duzen",
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {t('digitalTools.finansKodu.subtitle')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {t('digitalTools.finansKodu.title')}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('digitalTools.finansKodu.description')}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white">
                <a href="https://hikie.space/link/checkout/dzxB5G6fSEOYxRYgC2xkpcKJ3C1no8jHiPOl6iCY" target="_blank" rel="noopener noreferrer">
                  Satın Al
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <AudioPlayerButton
                text={`${t('digitalTools.finansKodu.title')}. ${t('digitalTools.finansKodu.subtitle')}. ${t('digitalTools.finansKodu.description')}. Özellikler: ${['feature1','feature2','feature3','feature4','feature5','feature6'].map(k => t('digitalTools.finansKodu.' + k)).join('. ')}`}
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
                { icon: '🏭', text: t('digitalTools.finansKodu.feature1') },
                { icon: '🧠', text: t('digitalTools.finansKodu.feature2') },
                { icon: '⚖️', text: t('digitalTools.finansKodu.feature3') },
                { icon: '🔄', text: t('digitalTools.finansKodu.feature4') },
                { icon: '🎯', text: t('digitalTools.finansKodu.feature5') },
                { icon: '🚫', text: t('digitalTools.finansKodu.feature6') },
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

        {/* What You'll Learn */}
        <section className="container py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Neler Öğreneceksiniz?</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {[
                    'Finansal kararları mühendislik perspektifiyle nasıl alırsınız',
                    'Duygusal yatırım hatalarını algoritmik düşünceyle nasıl önlersiniz',
                    'Risk ve getiri dengesini sistematik olarak nasıl yönetirsiniz',
                    'Varlık döngüsünü sürdürülebilir şekilde nasıl kurarsınız',
                    'Karar matrislerini finansal stratejinize nasıl entegre edersiniz',
                    'Piyasa gürültüsünü filtreleyerek odaklanmanız gereken sinyalleri nasıl bulursunuz',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
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
                      q: t('digitalTools.finansKodu.faq1Question'),
                      a: t('digitalTools.finansKodu.faq1Answer'),
                    },
                    {
                      q: t('digitalTools.finansKodu.faq2Question'),
                      a: t('digitalTools.finansKodu.faq2Answer'),
                    },
                    {
                      q: t('digitalTools.finansKodu.faq3Question'),
                      a: t('digitalTools.finansKodu.faq3Answer'),
                    },
                    {
                      q: t('digitalTools.finansKodu.faq4Question'),
                      a: t('digitalTools.finansKodu.faq4Answer'),
                    },
                    {
                      q: t('digitalTools.finansKodu.faq5Question'),
                      a: t('digitalTools.finansKodu.faq5Answer'),
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
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
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/20">
              <CardContent className="pt-12 pb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Kaosunuzu Düzene Çevirin
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Mühendislik perspektifiyle finansal kararlarınızı sistematik hale getirin.
                </p>
                <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <a href="https://hikie.space/link/checkout/dzxB5G6fSEOYxRYgC2xkpcKJ3C1no8jHiPOl6iCY" target="_blank" rel="noopener noreferrer">
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
