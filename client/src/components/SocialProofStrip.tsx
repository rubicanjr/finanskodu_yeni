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
      {/* Subtle top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ 
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" 
        }}
      />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-16"
        >
          {trustSignals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-400 transition-colors"
            >
              <signal.icon className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {signal.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle bottom border */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ 
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" 
        }}
      />
    </section>
  );
}
