/*
  DESIGN: Premium Dark Mode Hero Section
  STRATEGY: pasted_content_13.txt - Visual & Usability Overhaul
  
  KEY CHANGES:
  - New H1: "Sarp Hesaplar, Vera Hisseder. Sen Kazanırsın."
  - Sarp (Cyan) and Vera (Purple) avatars side-by-side
  - Neon CTA button: "Analize Başla" → triggers openChat()
  - Premium Dark Mode aesthetic (#0a0a0a background)
  - Tech-forward, trustworthy, sleek vibe
*/

import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  // Trigger the DualPersona widget to open
  const openChat = () => {
    // Find and click the floating widget button
    const widgetButton = document.querySelector('[data-widget-trigger="true"]') as HTMLButtonElement;
    if (widgetButton) {
      widgetButton.click();
    } else {
      // Fallback: dispatch custom event
      window.dispatchEvent(new CustomEvent('openDualPersonaWidget'));
    }
  };

  return (
    <header 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0d1117 50%, #0a0a0a 100%)' }}
      role="banner"
      aria-label="Ana başlık bölümü"
    >
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #00D4FF10 1px, transparent 1px),
              linear-gradient(to bottom, #A855F710 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Radial Glow Effects */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Cyan glow for Sarp */}
        <div 
          className="absolute top-1/2 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
        />
        {/* Purple glow for Vera */}
        <div 
          className="absolute top-1/2 right-1/4 w-[600px] h-[600px] translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Sarp & Vera Avatars - Side by Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center justify-center gap-6 sm:gap-12 mb-10"
          >
            {/* Sarp Avatar (Cyan) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group"
            >
              <div 
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 transition-all duration-300 group-hover:scale-105"
                style={{ 
                  borderColor: '#00D4FF',
                  boxShadow: '0 0 40px #00D4FF40, 0 0 80px #00D4FF20'
                }}
              >
                <img 
                  src="/images/metaperson_mix_2.gif" 
                  alt="Sarp - Teknik Analist"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #00D4FF 0%, #0891B2 100%)',
                  color: '#000'
                }}
              >
                SARP
              </motion.div>
            </motion.div>

            {/* VS Divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-2xl sm:text-3xl font-bold text-gray-500"
            >
              &
            </motion.div>

            {/* Vera Avatar (Purple) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group"
            >
              <div 
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 transition-all duration-300 group-hover:scale-105"
                style={{ 
                  borderColor: '#A855F7',
                  boxShadow: '0 0 40px #A855F740, 0 0 80px #A855F720'
                }}
              >
                <img 
                  src="/images/vera-avatar.png" 
                  alt="Vera - Makro Stratejist"
                  className="w-full h-full object-cover bg-gradient-to-br from-purple-900 to-purple-700"
                  onError={(e) => {
                    // Fallback gradient if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                        <span class="text-4xl sm:text-5xl">👩‍💼</span>
                      </div>
                    `;
                  }}
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                  color: '#fff'
                }}
              >
                VERA
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Heading - NEW H1 from Strategy Document */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
          >
            <span style={{ color: '#00D4FF' }}>Sarp Hesaplar,</span>{" "}
            <span style={{ color: '#A855F7' }}>Vera Hisseder.</span>
            <br />
            <span className="text-white">Sen Kazanırsın.</span>
          </motion.h1>

          {/* Subheading - Short and punchy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Yapay zeka destekli finansal asistanlarınız. 
            <span className="text-white font-medium"> Teknik analiz mi, makro strateji mi?</span> 
            {" "}İkisi de burada.
          </motion.p>

          {/* CTA Button - Neon "Analize Başla" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={openChat}
              className="relative overflow-hidden font-display font-bold text-lg sm:text-xl px-10 py-7 rounded-full group"
              style={{ 
                background: 'linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)',
                boxShadow: '0 0 30px #00D4FF50, 0 0 60px #A855F750'
              }}
              aria-label="Yapay zeka asistanı ile analize başla"
            >
              <span className="relative z-10 flex items-center gap-2 text-black">
                <Play className="w-5 h-5 fill-current" />
                Analize Başla
                <Sparkles className="w-5 h-5" />
              </span>
              {/* Hover effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #A855F7 0%, #00D4FF 100%)' }}
              />
            </Button>
          </motion.div>

          {/* Persona Descriptions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-16"
          >
            {/* Sarp Description */}
            <div 
              className="p-6 rounded-2xl border text-left"
              style={{ 
                background: 'rgba(0, 212, 255, 0.05)',
                borderColor: 'rgba(0, 212, 255, 0.2)'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: '#00D4FF' }}>
                  <img src="/images/metaperson_mix_2.gif" alt="Sarp" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Sarp</h3>
                  <p className="text-xs" style={{ color: '#00D4FF' }}>Teknik Analist</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                📊 RSI, MACD, Bollinger Bantları
                <br />
                📈 Destek/Direnç seviyeleri
                <br />
                🧮 Risk/Ödül hesaplamaları
              </p>
            </div>

            {/* Vera Description */}
            <div 
              className="p-6 rounded-2xl border text-left"
              style={{ 
                background: 'rgba(168, 85, 247, 0.05)',
                borderColor: 'rgba(168, 85, 247, 0.2)'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center" style={{ borderColor: '#A855F7' }}>
                  <span className="text-lg">👩‍💼</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Vera</h3>
                  <p className="text-xs" style={{ color: '#A855F7' }}>Makro Stratejist</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                🌍 Merkez bankası politikaları
                <br />
                🧠 Yatırımcı psikolojisi
                <br />
                💡 Uzun vadeli stratejiler
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #A855F7)' }}
          />
        </div>
      </motion.div>
    </header>
  );
}
