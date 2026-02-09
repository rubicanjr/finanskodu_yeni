/*
  DESIGN PHILOSOPHY: Cyber Finance - Dijital Labirent Estetiği
  GEO OPTIMIZED: Generative Engine Optimization Standards
  CRO OPTIMIZED: Sales Funnel Section Ordering
  
  Finans Kodu web sitesi - One-pager mikro site
  - Dark mode ağırlıklı, teknolojik ve premium his
  - Logodaki labirent ve neon ışık motifini yansıtan tasarım
  - GEO uyumlu, mobil öncelikli, yüksek dönüşüm hedefli
  
  Section Order (CRO Optimized Sales Funnel):
  1. Hero Section - Attention & Interest
  2. Products - Immediate Value Proposition
  3. Manifesto - Story & Vision
  4. Blog - Content & Authority
  5. Testimonials - Social Proof
  6. About - Trust & Credibility
  7. Footer - Contact & Conversion
  
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

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ComparisonSection from "@/components/ComparisonSection";
import { AnalysisSection } from "@/components/AnalysisSection";
import ProductsSection from "@/components/ProductsSection";
import ManifestoSection from "@/components/ManifestoSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SocialProofStrip from "@/components/SocialProofStrip";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Ana içeriğe atla
      </a>

      {/* Navigation - Sticky header */}
      <Navigation />

      {/* Hero Section - Contains the main <header> with <h1> */}
      {/* CRO: Attention & Interest - First impression */}
      <HeroSection />

      {/* Comparison Section - Technology & Methodology */}
      {/* CRO: Immediate Value Proposition - Show comparison right after hero */}
      <ComparisonSection />

      {/* Analysis Section - PHASE 1 of Hackathon MVP */}
      {/* CRO: Engagement & Conversion - Interactive analysis feature */}
      <AnalysisSection />

      {/* Social Proof Strip - Trust Signals */}
      <SocialProofStrip />

      {/* Main Content Area */}
      <main id="main-content" role="main">
        {/* Products Showcase - Each product in <article> */}
        {/* CRO: Immediate Value Proposition - Show products */}
        <ProductsSection />

        {/* Manifesto - Problem & Solution with <dl> structure */}
        {/* CRO: Story & Vision - Build emotional connection */}
        <ManifestoSection />

        {/* Blog - Articles and insights */}
        {/* CRO: Content & Authority - Demonstrate expertise */}
        <BlogSection />

        {/* Testimonials / Social Proof - <figure> with <blockquote> */}
        {/* CRO: Social Proof - Build trust through others */}
        <TestimonialsSection />

        {/* FAQ - Frequently Asked Questions with Expert Insights */}
        {/* CRO: Address objections and build authority */}
        <FAQSection />

        {/* About section removed per strategy document */}
      </main>

      {/* Footer & Contact - Contains <address> for contact info */}
      {/* CRO: Final Conversion Point */}
      <Footer />
    </div>
  );
}
