/*
  DESIGN: Social Proof Strip
  STRATEGY: pasted_content_13.txt - TASK 5
  
  - Placement: Immediately below the Hero Section (before the fold)
  - Content: "1.000+ Yatırımcı Tarafından Kullanılıyor" or "Finans Profesyonellerinin Tercihi"
  - Design: Minimalist and clean, grey-scale
*/

import { motion } from "framer-motion";
import { Users, Award, TrendingUp, Shield } from "lucide-react";

const trustSignals = [
  { icon: Users, text: "1000+ Mutlu Kullanıcı" },
  { icon: Award, text: "Finans Profesyonellerinin Tercihi" },
  { icon: TrendingUp, text: "Dijital Araçlar Bütünü" },
  { icon: Shield, text: "SPK/BDDK Uyumlu" },
];

export default function SocialProofStrip() {
  return (
    <section 
      className="relative py-8 overflow-hidden"
      style={{ 
        background: "linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)" 
      }}
      aria-label="Güven göstergeleri"
    >
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-16">
          {trustSignals.map((signal, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-400 transition-colors"
            >
              <signal.icon className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{signal.text}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
