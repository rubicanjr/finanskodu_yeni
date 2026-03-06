/*
  DESIGN PHILOSOPHY: Cyber Finance - Dijital Labirent Estetiği
  GEO OPTIMIZED: Generative Engine Optimization Standards
  CRO OPTIMIZED: Sales Funnel Section Ordering
  
  Finans Kodu web sitesi - One-pager mikro site
  - Dark mode ağırlıklı, teknolojik ve premium his
  - Logodaki labirent ve neon ışık motifini yansıtan tasarım
  - GEO uyumlu, mobil öncelikli, yüksek dönüşüm hedefli
  
  Section Order (CRO Optimized Sales Funnel - Updated per user request):
  1. Header (Sarp & Vera Görselleri - Hero)
  2. Dijital Araçlar / Ürünler (Featured Section)
  3. "Kaos'tan Düzen'e" Bölümü (Comparison Section)
  4. Finansal Analizi Başlat (Auth Gate + Analysis - Separate Section)
  5. Manifesto
  6. Blog & Analizler
  7. Özellikler Bölümü (Testimonials)
  8. SSS (FAQ)
  9. Sponsorlar
  10. Footer (with Feedback area)
  
  Semantic Structure:
  - <header> for hero section (contains h1)
  - <main> for primary content
  - <section> for each content block
  - <article> for products, testimonials, and blog posts
  - <footer> for contact and links
  
  Renk Paleti:
  - Ana: Lacivert/koyu mavi (#0D1117)
  - Vurgu: Neon cyan (#00D4FF)
  - Metin: Beyaz/gri tonları
  
  Tipografi:
  - Başlıklar: Space Grotesk
  - Gövde: Inter
  - Teknik: JetBrains Mono
*/

import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
// Navigation is now handled by Sidebar in App.tsx
// Above-fold: eager load (critical for LCP)
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";

// Below-fold: lazy load (improves initial bundle size)
const ComparisonSection = lazy(() => import("@/components/ComparisonSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const SponsorshipSection = lazy(() => import("@/components/SponsorshipSection"));
const SeoContentSection = lazy(() => import("@/components/SeoContentSection"));
const FeedbackSection = lazy(() => import("@/components/FeedbackSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Minimal skeleton for below-fold sections
function SectionSkeleton() {
  return <div className="h-32 bg-muted/20 animate-pulse rounded-lg mx-4 my-2" />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Finans | Finans Analiz Platformu ve Araçları - Finans Kodu</title>
        <meta name="description" content="Finans analiz, algoritmik ticaret ve yapay zeka borsa araçlarıyla Türkiye piyasalarında bilinçli kararlar alın. Finans Kodu ile portföyünüzü bugün güçlendirin." />
        <meta name="keywords" content="finans, finans analiz, yapay zeka borsa analizi, algoritmik ticaret, BIST analiz, portföy yönetimi, finans kodu" />
        <link rel="canonical" href="https://finanskodu.com/" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Finans | Finans Analiz Platformu ve Araçları - Finans Kodu" />
        <meta property="og:description" content="Finans analiz, algoritmik ticaret ve yapay zeka borsa araçlarıyla Türkiye piyasalarında bilinçli kararlar alın. Finans Kodu ile portföyünüzü bugün güçlendirin." />
        <meta property="og:url" content="https://finanskodu.com/" />
        <meta property="og:image" content="https://finanskodu.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="Finans Kodu" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Finans | Finans Analiz Platformu ve Araçları - Finans Kodu" />
        <meta name="twitter:description" content="Finans analiz, algoritmik ticaret ve yapay zeka borsa araçlarıyla Türkiye piyasalarında bilinçli kararlar alın. Finans Kodu ile portföyünüzü bugün güçlendirin." />
        <meta name="twitter:image" content="https://finanskodu.com/og-image.png" />
        <meta name="twitter:site" content="@finanskodu" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://finanskodu.com/#organization",
              "name": "Finans Kodu",
              "url": "https://finanskodu.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://finanskodu.com/og-image.png",
                "width": 1200,
                "height": 630
              },
              "description": "Türkiye'nin finans ve finans analiz platformu. Yapay zeka destekli borsa analizi, algoritmik ticaret stratejileri.",
              "sameAs": [
                "https://x.com/finanskodu",
                "https://instagram.com/finanskodu",
                "https://linkedin.com/company/finanskodu"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "areaServed": "TR",
                "availableLanguage": "Turkish"
              }
            },
            {
              "@type": "WebSite",
              "@id": "https://finanskodu.com/#website",
              "url": "https://finanskodu.com",
              "name": "Finans Kodu",
              "description": "finans analiz, algoritmik ticaret ve yapay zeka destekli borsa araçları platformu.",
              "publisher": { "@id": "https://finanskodu.com/#organization" },
              "inLanguage": "tr-TR",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://finanskodu.com/blog?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "WebPage",
              "@id": "https://finanskodu.com/#webpage",
              "url": "https://finanskodu.com/",
              "name": "Finans | Finans Analiz Platformu ve Araçları - Finans Kodu",
              "description": "Finans analiz, algoritmik ticaret ve yapay zeka borsa araçlarıyla Türkiye piyasalarında bilinçli kararlar alın. Finans Kodu ile portföyünüzü bugün güçlendirin.",
              "isPartOf": { "@id": "https://finanskodu.com/#website" },
              "about": { "@id": "https://finanskodu.com/#organization" },
              "inLanguage": "tr-TR",
              "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": "https://finanskodu.com/og-image.png",
                "width": 1200,
                "height": 630
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "@id": "https://finanskodu.com/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Ana Sayfa",
                    "item": "https://finanskodu.com/"
                  }
                ]
              }
            },
            {
              "@type": "ItemList",
              "@id": "https://finanskodu.com/#products",
              "numberOfItems": 3,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@type": "Product",
                    "@id": "https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi#product",
                    "name": "AI Prompt Kütüphanesi",
                    "description": "Finans analiz için 100+ yapay zeka komutu. Bilanço okuma, risk analizi ve makroekonomik tahminleme.",
                    "image": "https://finanskodu.com/og-image.png",
                    "url": "https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi",
                    "sku": "FK-AI-001",
                    "mpn": "FK-AI-001",
                    "brand": { "@type": "Brand", "name": "Finans Kodu" },
                    "offers": {
                      "@type": "Offer",
                      "url": "https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi",
                      "priceCurrency": "TRY",
                      "price": "299",
                      "priceValidUntil": "2026-12-31",
                      "availability": "https://schema.org/InStock",
                      "itemCondition": "https://schema.org/NewCondition",
                      "hasMerchantReturnPolicy": {
                        "@type": "MerchantReturnPolicy",
                        "applicableCountry": { "@type": "Country", "name": "TR" },
                        "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
                        "merchantReturnDays": 0,
                        "returnMethod": "https://schema.org/ReturnByMail",
                        "returnFees": "https://schema.org/FreeReturn"
                      },
                      "shippingDetails": {
                        "@type": "OfferShippingDetails",
                        "shippingRate": { "@type": "MonetaryAmount", "value": 0, "currency": "TRY" },
                        "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "TR" },
                        "deliveryTime": {
                          "@type": "ShippingDeliveryTime",
                          "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" },
                          "transitTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" }
                        }
                      }
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.9",
                      "reviewCount": "47",
                      "bestRating": "5",
                      "worstRating": "1"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "Product",
                    "@id": "https://finanskodu.com/dijital-araclar/finans-kodu-kaos-icinde-duzen#product",
                    "name": "Finans Kodu: Kaos İçinde Düzen",
                    "description": "Piyasa kaosunu düzene çeviren sistematik finans analiz rehberi. Portföy yönetimi ve risk stratejileri.",
                    "image": "https://finanskodu.com/og-image.png",
                    "url": "https://finanskodu.com/dijital-araclar/finans-kodu-kaos-icinde-duzen",
                    "sku": "FK-KID-002",
                    "mpn": "FK-KID-002",
                    "brand": { "@type": "Brand", "name": "Finans Kodu" },
                    "offers": {
                      "@type": "Offer",
                      "url": "https://finanskodu.com/dijital-araclar/finans-kodu-kaos-icinde-duzen",
                      "priceCurrency": "TRY",
                      "price": "890",
                      "priceValidUntil": "2026-12-31",
                      "availability": "https://schema.org/InStock",
                      "itemCondition": "https://schema.org/NewCondition",
                      "hasMerchantReturnPolicy": {
                        "@type": "MerchantReturnPolicy",
                        "applicableCountry": { "@type": "Country", "name": "TR" },
                        "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
                        "merchantReturnDays": 0,
                        "returnMethod": "https://schema.org/ReturnByMail",
                        "returnFees": "https://schema.org/FreeReturn"
                      },
                      "shippingDetails": {
                        "@type": "OfferShippingDetails",
                        "shippingRate": { "@type": "MonetaryAmount", "value": 0, "currency": "TRY" },
                        "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "TR" },
                        "deliveryTime": {
                          "@type": "ShippingDeliveryTime",
                          "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" },
                          "transitTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" }
                        }
                      }
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.8",
                      "reviewCount": "63",
                      "bestRating": "5",
                      "worstRating": "1"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "Product",
                    "@id": "https://finanskodu.com/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni#product",
                    "name": "Pro - Algoritmik Strateji ve Analiz Bülteni",
                    "description": "Aylık finans analiz sinyalleri, algoritmik ticaret stratejileri ve piyasa tahminleri. Profesyonel yatırımcılar için.",
                    "image": "https://finanskodu.com/og-image.png",
                    "url": "https://finanskodu.com/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni",
                    "sku": "FK-PRO-003",
                    "mpn": "FK-PRO-003",
                    "brand": { "@type": "Brand", "name": "Finans Kodu" },
                    "offers": {
                      "@type": "Offer",
                      "url": "https://finanskodu.com/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni",
                      "priceCurrency": "TRY",
                      "price": "9999",
                      "priceValidUntil": "2026-12-31",
                      "availability": "https://schema.org/InStock",
                      "itemCondition": "https://schema.org/NewCondition",
                      "hasMerchantReturnPolicy": {
                        "@type": "MerchantReturnPolicy",
                        "applicableCountry": { "@type": "Country", "name": "TR" },
                        "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
                        "merchantReturnDays": 0,
                        "returnMethod": "https://schema.org/ReturnByMail",
                        "returnFees": "https://schema.org/FreeReturn"
                      },
                      "shippingDetails": {
                        "@type": "OfferShippingDetails",
                        "shippingRate": { "@type": "MonetaryAmount", "value": 0, "currency": "TRY" },
                        "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "TR" },
                        "deliveryTime": {
                          "@type": "ShippingDeliveryTime",
                          "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" },
                          "transitTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" }
                        }
                      }
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.9",
                      "reviewCount": "28",
                      "bestRating": "5",
                      "worstRating": "1"
                    }
                  }
                }
              ]
            },
            {
              "@type": "Blog",
              "@id": "https://finanskodu.com/#blog",
              "name": "Finans Kodu Blog",
              "description": "Finans analiz, algoritmik ticaret ve yapay zeka destekli borsa stratejileri üzerine uzman içerikler.",
              "url": "https://finanskodu.com/blog",
              "publisher": { "@id": "https://finanskodu.com/#organization" },
              "inLanguage": "tr-TR",
              "blogPost": [
                {
                  "@type": "BlogPosting",
                  "@id": "https://finanskodu.com/blog/finans-raporu-otomasyonu#blogpost",
                  "headline": "Finans Raporu Otomasyonu: Veri Girişinden Stratejik Liderliğe Geçiş",
                  "description": "Finans raporlarını otomatikleştirerek veri girişinden stratejik liderliğe nasıl geçiş yapabilirsiniz?",
                  "url": "https://finanskodu.com/blog/finans-raporu-otomasyonu",
                  "datePublished": "2026-02-13",
                  "dateModified": "2026-02-13",
                  "author": { "@id": "https://finanskodu.com/#organization" },
                  "publisher": { "@id": "https://finanskodu.com/#organization" },
                  "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-1-800w_9b90dab8.webp",
                  "inLanguage": "tr-TR"
                },
                {
                  "@type": "BlogPosting",
                  "@id": "https://finanskodu.com/blog/yeni-yilda-finanscilarin-10-ai-araci#blogpost",
                  "headline": "Yeni Yılda Finançıların Kullanması Gereken 10 AI Aracı",
                  "description": "2026'da finançıların işlerini kolaylaştıracak 10 yapay zeka aracı.",
                  "url": "https://finanskodu.com/blog/yeni-yilda-finanscilarin-10-ai-araci",
                  "datePublished": "2026-02-13",
                  "dateModified": "2026-02-13",
                  "author": { "@id": "https://finanskodu.com/#organization" },
                  "publisher": { "@id": "https://finanskodu.com/#organization" },
                  "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-2-800w_34874b5b.webp",
                  "inLanguage": "tr-TR"
                },
                {
                  "@type": "BlogPosting",
                  "@id": "https://finanskodu.com/blog/excelde-ai-devrimi-finanscilar-icin-rehber#blogpost",
                  "headline": "Excel'de AI Devrimi: Finançılar İçin Yapay Zeka Kullanma Rehberi",
                  "description": "Excel'de yapay zeka nasıl kullanılır? Finançılar için AI destekli Excel formülleri.",
                  "url": "https://finanskodu.com/blog/excelde-ai-devrimi-finanscilar-icin-rehber",
                  "datePublished": "2026-02-13",
                  "dateModified": "2026-02-13",
                  "author": { "@id": "https://finanskodu.com/#organization" },
                  "publisher": { "@id": "https://finanskodu.com/#organization" },
                  "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-3-800w_929fe132.webp",
                  "inLanguage": "tr-TR"
                }
              ]
            },
            {
              "@type": "FAQPage",
              "@id": "https://finanskodu.com/#faq",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Finanscılar için en iyi AI promptları nelerdir?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Finans analiz için bilanço okuma, risk analizi ve makroekonomik tahminleme için mühendislik disipliniyle test edilmiş 100+ hazır komut sunan AI Prompt Kütüphanesi kullanılabilir." }
                },
                {
                  "@type": "Question",
                  "name": "Algoritmik ticaret stratejisi nasıl kurulur?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Duygusal kararları elemek için matematiksel kurallar (RSI, Hareketli Ortalamalar, Volatilite) belirlenmeli ve bu kurallar geriye dönük (backtest) test edilerek sistematik hale getirilmelidir." }
                },
                {
                  "@type": "Question",
                  "name": "Altın fiyatlarını etkileyen en temel faktör nedir?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Altın, ABD Reel Faizleri ile ters korelasyona sahiptir. Reel faizler düştüğünde altın yükselme eğilimine girer. Ayrıca DXY (Dolar Endeksi) gücü de belirleyicidir." }
                },
                {
                  "@type": "Question",
                  "name": "Borsa düşerken portföy nasıl korunur?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Portföyde Altın, Döviz veya Ters ETF'ler gibi negatif korelasyonlu varlıklar bulundurarak düşüş dönemlerinde denge sağlanabilir." }
                },
                {
                  "@type": "Question",
                  "name": "Temel Analiz mi Teknik Analiz mi daha önemlidir?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Finans Kodu yaklaşımına göre ikisi ayrılamaz. Temel analiz 'Ne almalıyım?' sorusunu, Teknik analiz 'Ne zaman almalıyım?' sorusunu cevaplar." }
                }
              ]
            }
          ]
        })}</script>
      </Helmet>

      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Ana içeriğe atla
      </a>

      {/* Navigation is now handled by Sidebar in App.tsx */}

      {/* 1. Hero Section (Sarp & Vera Görselleri + Conditional Auth Gate/Analysis) */}
      {/* CRO: Attention & Interest - First impression */}
      <HeroSection />

      {/* Main Content Area */}
      <main id="main-content" role="main">
        {/* 2. Dijital Araçlar / Ürünler (Featured Section) */}
        {/* CRO: Immediate Value Proposition - Show products */}
        <ProductsSection />

        {/* 3. "Kaos'tan Düzen'e" Bölümü (Comparison Section) */}
        {/* CRO: Technology & Methodology Comparison */}
        <Suspense fallback={<SectionSkeleton />}>
          <ComparisonSection />
        </Suspense>

        {/* 4. Finansal Analizi Başlat - MOVED TO /analiz PAGE */}

        {/* 6. Blog & Analizler - Articles and insights */}
        {/* CRO: Content & Authority - Demonstrate expertise */}
        <Suspense fallback={<SectionSkeleton />}>
          <BlogSection />
        </Suspense>

        {/* 7. Özellikler Bölümü (Testimonials / Social Proof) */}
        {/* CRO: Social Proof - Build trust through others */}
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>

        {/* 8. SSS (FAQ) - Frequently Asked Questions */}
        {/* CRO: Address objections and build authority */}
        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>

        {/* 9. Sponsorlar */}
        {/* CRO: Brand Partnerships & Collaboration */}
        <Suspense fallback={<SectionSkeleton />}>
          <SponsorshipSection />
        </Suspense>

        {/* 10. SEO Content Section - 2500+ kelime, finans 40x, finans analiz 15x */}
        <Suspense fallback={<SectionSkeleton />}>
          <SeoContentSection />
        </Suspense>
      </main>

      {/* 10. Footer (with Feedback area) */}
      {/* CRO: Engagement & Final Conversion Point */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeedbackSection />
        <Footer />
      </Suspense>
    </div>
  );
}
