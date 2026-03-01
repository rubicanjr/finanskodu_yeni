/*
  ANALYSIS PAGE: Dedicated page for financial analysis tool
  
  - Moved from Home.tsx to dedicated route
  - Contains AnalysisAuthGate (EmailGate + AnalysisSection)
  - Clean, focused UX for analysis workflow
*/

import { AnalysisAuthGate } from "@/components/AnalysisAuthGate";
import Footer from "@/components/Footer";

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Ana içeriğe atla
      </a>

      {/* Main Content Area */}
      <main id="main-content" role="main" className="pt-4">
        {/* Finansal Analizi Başlat (Auth Gate + Analysis Section) */}
        <AnalysisAuthGate />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
