/*
  DESIGN PHILOSOPHY: Cyber Finance - Dijital Labirent Estetiği
  GEO OPTIMIZED: Generative Engine Optimization Standards
  
  Finans Kodu web sitesi - One-pager mikro site
  - Dark mode ağırlıklı, teknolojik ve premium his
  - Logodaki labirent ve neon ışık motifini yansıtan tasarım
  - GEO uyumlu, mobil öncelikli, yüksek dönüşüm hedefli
  
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
import ManifestoSection from "@/components/ManifestoSection";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

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
      <HeroSection />

      {/* Main Content Area */}
      <main id="main-content" role="main">
        {/* Manifesto - Problem & Solution with <dl> structure */}
        <ManifestoSection />

        {/* Products Showcase - Each product in <article> */}
        <ProductsSection />

        {/* Blog - Articles and insights */}
        <BlogSection />

        {/* Testimonials / Social Proof - <figure> with <blockquote> */}
        <TestimonialsSection />

        {/* About the Team - E-E-A-T optimized */}
        <AboutSection />
      </main>

      {/* Footer & Contact - Contains <address> for contact info */}
      <Footer />
    </div>
  );
}
