/*
  ANALYSIS PAGE: Dedicated page for financial analysis tool
  
  - SEO optimized: Helmet, H1, H2, H3 hierarchy
  - E-E-A-T: Expert content, author signals, trust indicators
  - Schema.org: SoftwareApplication + FAQPage structured data
  - GEO: Direct answers to conversational queries
*/

import { AnalysisAuthGate } from "@/components/AnalysisAuthGate";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function AnalysisPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Finans Kodu Finansal Analiz Aracı",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Yapay zeka destekli finansal analiz aracı. Hisse senedi, döviz ve emtia analizlerini dakikalar içinde gerçekleştirin.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "TRY"
        },
        "provider": {
          "@type": "Organization",
          "name": "Finans Kodu",
          "url": "https://finanskodu.com"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Finansal analiz aracı nasıl çalışır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Finans Kodu'nun yapay zeka destekli analiz aracı, hisse senedi sembolü veya şirket adı girmeniz üzerine gerçek zamanlı piyasa verilerini işleyerek teknik göstergeler, risk metrikleri ve yatırım sinyalleri üretir. Analiz sonuçları 30-60 saniye içinde hazır olur."
            }
          },
          {
            "@type": "Question",
            "name": "Hangi varlıkları analiz edebilirim?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BIST hisseleri, ABD borsası hisseleri (NYSE, NASDAQ), döviz çiftleri (USD/TRY, EUR/TRY) ve emtialar (altın, gümüş, petrol) analiz edilebilir. Günlük, haftalık ve aylık zaman dilimlerinde teknik analiz yapılır."
            }
          },
          {
            "@type": "Question",
            "name": "Analiz sonuçları ne kadar güvenilir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Analizler, kanıtlanmış teknik göstergeler (RSI, MACD, Bollinger Bantları, Hareketli Ortalamalar) ve yapay zeka modellerine dayanır. Ancak finansal analizler yatırım tavsiyesi değildir; her yatırım kararı kişisel risk toleransı ve finansal hedefler doğrultusunda değerlendirilmelidir."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Helmet>
        <title>Yapay Zeka Destekli Finansal Analiz Aracı | Finans Kodu</title>
        <meta name="description" content="BIST ve ABD borsası hisseleri için yapay zeka destekli teknik analiz. RSI, MACD, Bollinger Bantları ve algoritmik sinyallerle piyasaları dakikalar içinde analiz edin." />
        <meta name="keywords" content="finansal analiz, yapay zeka borsa analizi, BIST hisse analizi, teknik analiz aracı, RSI MACD analiz, algoritmik trading" />
        <link rel="canonical" href="https://finanskodu.com/analiz" />
        <meta property="og:title" content="Yapay Zeka Destekli Finansal Analiz Aracı | Finans Kodu" />
        <meta property="og:description" content="BIST ve ABD borsası hisseleri için yapay zeka destekli teknik analiz. RSI, MACD ve algoritmik sinyallerle piyasaları analiz edin." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://finanskodu.com/analiz" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Ana içeriğe atla
      </a>

      {/* SEO Content Header - E-E-A-T uyumlu, görsel olarak minimal */}
      <header className="pt-6 pb-2 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Yapay Zeka Destekli Finansal Analiz
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            BIST ve küresel piyasalarda hisse senedi, döviz ve emtia analizlerini dakikalar içinde gerçekleştirin. 
            Algoritmik göstergeler ve yapay zeka sinyalleriyle bilinçli yatırım kararları alın.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" role="main" className="pt-4">
        {/* Finansal Analizi Başlat (Auth Gate + Analysis Section) */}
        <AnalysisAuthGate />
      </main>

      {/* E-E-A-T Content Section - Arama motorları için değerli içerik */}
      <section className="py-16 px-4 bg-card/30 border-t border-border" aria-label="Finansal analiz hakkında bilgi">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Finansal Analiz Aracı Nasıl Çalışır?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Teknik Göstergeler ve Algoritmik Sinyaller
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Finans Kodu'nun analiz motoru, 20+ yıllık finansal mühendislik deneyimiyle geliştirilmiş algoritmalar kullanır. 
                RSI (Göreceli Güç Endeksi), MACD (Hareketli Ortalama Yakınsama/Iraksama), Bollinger Bantları ve 
                Fibonacci düzeltme seviyeleri gibi kanıtlanmış teknik göstergeler, yapay zeka modelleriyle birleştirilerek 
                piyasa koşullarına özgü sinyaller üretilir.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                Her analiz raporu; destek/direnç seviyeleri, trend yönü, momentum göstergeleri ve risk/getiri oranı 
                hesaplamalarını içerir. Bu veriler, hem kısa vadeli trader'lar hem de uzun vadeli yatırımcılar için 
                anlamlı içgörüler sunar.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Hangi Piyasaları Analiz Edebilirsiniz?
              </h3>
              <ul className="text-muted-foreground text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">▸</span>
                  <span><strong className="text-foreground">BIST Hisseleri:</strong> Borsa İstanbul'daki tüm hisse senetleri için teknik analiz ve fiyat hedefi hesaplama</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">▸</span>
                  <span><strong className="text-foreground">ABD Borsaları:</strong> NYSE ve NASDAQ'ta işlem gören hisseler için kapsamlı analiz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">▸</span>
                  <span><strong className="text-foreground">Döviz Çiftleri:</strong> USD/TRY, EUR/TRY, GBP/TRY ve diğer majör pariteler</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">▸</span>
                  <span><strong className="text-foreground">Emtialar:</strong> Altın, gümüş, petrol ve diğer emtia fiyat analizleri</span>
                </li>
              </ul>
            </div>
          </div>

          {/* GEO: Sohbet formatında sorulara doğrudan yanıtlar */}
          <div className="border border-border rounded-xl p-6 bg-background mb-8">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Sıkça Sorulan Sorular
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Yapay zeka ile finansal analiz nasıl yapılır?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Yapay zeka destekli finansal analiz, geleneksel teknik göstergeleri büyük veri işleme kapasitesiyle 
                  birleştirir. Analiz aracına hisse sembolü veya şirket adı girerek 30-60 saniye içinde kapsamlı bir 
                  teknik analiz raporu alırsınız. Rapor; trend analizi, momentum göstergeleri, destek/direnç seviyeleri 
                  ve risk değerlendirmesini içerir.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  En iyi hisse analizi aracı hangisidir?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Finans Kodu'nun analiz aracı, Türk yatırımcıların ihtiyaçlarına özel olarak tasarlanmıştır. 
                  BIST hisselerini ve global piyasaları Türkçe arayüzle analiz edebilir, algoritmik sinyalleri 
                  anlık olarak takip edebilirsiniz. Ücretsiz deneme ile aracın kapasitesini test edebilirsiniz.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Teknik analiz mi, temel analiz mi daha önemlidir?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Her iki analiz yöntemi de farklı zaman dilimlerinde değerli içgörüler sunar. Teknik analiz, 
                  kısa ve orta vadeli fiyat hareketlerini tahmin etmek için güçlü bir araçtır. Temel analiz ise 
                  şirketin gerçek değerini ve uzun vadeli büyüme potansiyelini değerlendirir. Finans Kodu, 
                  her iki yaklaşımı da kapsayan bütüncül bir analiz çerçevesi sunar.
                </p>
              </div>
            </div>
          </div>

          {/* Yazar/Uzman Bilgisi - E-E-A-T Güven Sinyali */}
          <div className="border border-border rounded-xl p-6 bg-background">
            <h2 className="text-lg font-semibold text-foreground mb-4">Bu Araç Hakkında</h2>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">FK</span>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Finans Kodu Analiz Ekibi</p>
                <p className="text-xs text-muted-foreground mb-2">Finansal Mühendislik & Algoritmik Ticaret Uzmanları</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Bu analiz aracı, 10+ yıllık finansal mühendislik deneyimine sahip uzmanlar tarafından geliştirilmiştir. 
                  Algoritmalar, gerçek piyasa verileriyle sürekli test edilmekte ve güncellenmektedir. 
                  Tüm analizler bilgilendirme amaçlıdır; yatırım tavsiyesi niteliği taşımaz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
