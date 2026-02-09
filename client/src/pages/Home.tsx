import { useState } from "react";
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
import { EmailGate } from "@/components/EmailGate";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  // If not logged in, show email gate only
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navigation />
        <EmailGate onSubmit={handleEmailSubmit} />
        <Footer />
      </div>
    );
  }

  // If logged in, show full dashboard
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
