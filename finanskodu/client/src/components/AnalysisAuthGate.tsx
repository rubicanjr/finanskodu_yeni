import { useState } from "react";
import { motion } from "framer-motion";
import { EmailGate } from "@/components/EmailGate";
import { AnalysisSection } from "./AnalysisSection";

/**
 * AnalysisAuthGate Component
 * 
 * Displays email gate for login, then shows analysis section after authentication.
 * This component is placed separately in the layout (after ComparisonSection)
 * to create a distinct "Finansal Analizi Başlat" section.
 */
export function AnalysisAuthGate() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <section
      id="analiz-giris"
      className="relative py-16 sm:py-24 md:py-32 bg-background"
      role="region"
      aria-label="Finansal Analizi Başlat"
    >
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Auth Gate or Analysis Section */}
          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <EmailGate onSubmit={() => setIsLoggedIn(true)} />
            </motion.div>
          )}

          {isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <AnalysisSection />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
