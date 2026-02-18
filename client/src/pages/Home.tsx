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
// Navigation is now handled by Sidebar in App.tsx
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import ComparisonSection from "@/components/ComparisonSection";

import ManifestoSection from "@/components/ManifestoSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";

import FAQSection from "@/components/FAQSection";
import SponsorshipSection from "@/components/SponsorshipSection";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Finans Kodu | Yapay Zeka Destekli Borsa Analiz ve Portföy Yönetimi</title>
        <meta name="description" content="Yapay zeka destekli finansal mühendislik, algoritmik ticaret ve Excel otomasyon çözümleri sunan finansal teknoloji platformu." />
        <link rel="canonical" href="https://finanskodu.com/" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Finans Kodu - AI Driven Financial Efficiency" />
        <meta property="og:description" content="Yapay zeka destekli finansal mühendislik, algoritmik ticaret ve Excel otomasyon çözümleri sunan finansal teknoloji platformu." />
        <meta property="og:url" content="https://finanskodu.com/" />
        <meta property="og:image" content="https://finanskodu.com/logo.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Finans Kodu - AI Driven Financial Efficiency" />
        <meta name="twitter:description" content="Yapay zeka destekli finansal mühendislik, algoritmik ticaret ve Excel otomasyon çözümleri sunan finansal teknoloji platformu." />
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
        <ComparisonSection />

        {/* 4. Finansal Analizi Başlat - MOVED TO /analiz PAGE */}

        {/* 5. Manifesto - Problem & Solution */}
        {/* CRO: Story & Vision - Build emotional connection */}
        <ManifestoSection />

        {/* 6. Blog & Analizler - Articles and insights */}
        {/* CRO: Content & Authority - Demonstrate expertise */}
        <BlogSection />

        {/* 7. Özellikler Bölümü (Testimonials / Social Proof) */}
        {/* CRO: Social Proof - Build trust through others */}
        <TestimonialsSection />



        {/* 8. SSS (FAQ) - Frequently Asked Questions */}
        {/* CRO: Address objections and build authority */}
        <FAQSection />

        {/* 9. Sponsorlar */}
        {/* CRO: Brand Partnerships & Collaboration */}
        <SponsorshipSection />
      </main>

      {/* 10. Footer (with Feedback area) */}
      {/* CRO: Engagement & Final Conversion Point */}
      <FeedbackSection />
      <Footer />
    </div>
  );
}
