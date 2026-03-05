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
        <title>Finans Kodu | Yapay Zeka Destekli Borsa Analizi</title>
        <meta name="description" content="Türkiye'nin finans profesyonelleri için yapay zeka destekli borsa analizi, algoritmik ticaret stratejileri ve Excel otomasyon araçları. BIST ve küresel piyasalarda bilinçli yatırım kararları alın." />
        <meta name="keywords" content="yapay zeka borsa analizi, algoritmik ticaret, BIST analiz, finansal mühendislik, portföy yönetimi, Excel finans otomasyonu, finans kodu" />
        <link rel="canonical" href="https://finanskodu.com/" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Finans Kodu | Yapay Zeka Destekli Finansal Analiz ve Algoritmik Ticaret" />
        <meta property="og:description" content="Türkiye'nin finans profesyonelleri için yapay zeka destekli borsa analizi, algoritmik ticaret stratejileri ve Excel otomasyon araçları." />
        <meta property="og:url" content="https://finanskodu.com/" />
        <meta property="og:image" content="https://finanskodu.com/assets/fk-logo-new.webp" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Finans Kodu | Yapay Zeka Destekli Finansal Analiz ve Algoritmik Ticaret" />
        <meta name="twitter:description" content="Türkiye'nin finans profesyonelleri için yapay zeka destekli borsa analizi, algoritmik ticaret stratejileri ve Excel otomasyon araçları." />
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
                "url": "https://finanskodu.com/assets/fk-logo-new.webp",
                "width": 512,
                "height": 512
              },
              "description": "Türkiye'nin finans profesyonelleri için yapay zeka destekli borsa analizi, algoritmik ticaret stratejileri ve Excel otomasyon araçları.",
              "sameAs": [
                "https://x.com/finanskodu",
                "https://instagram.com/finanskodu",
                "https://linkedin.com/company/finanskodu"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://finanskodu.com/#website",
              "url": "https://finanskodu.com",
              "name": "Finans Kodu",
              "description": "Yapay zeka destekli finansal analiz, algoritmik ticaret ve portföy yönetimi platformu.",
              "publisher": { "@id": "https://finanskodu.com/#organization" },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://finanskodu.com/blog?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
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
