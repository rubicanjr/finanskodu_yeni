/*
  DESIGN: Premium Dark Mode Hero Section
  STRATEGY: pasted_content_14.txt - Final Polish
  
  KEY CHANGES:
  - H1: "Duygularınızı Değil, Sisteminizi Yönetin."
  - H2: Finans Kodu tanımı - Debug, Prompt, Algoritma
  - Central: Laptop image flanked by Sarp (Left) and Vera (Right)
  - Note: "Bu karakterler ürün değil, asistanlar"
  - Primary CTA: "Dijital Araçları Keşfet" → Products
  - Secondary CTA: "Foruma Git" → hikie.space
*/

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Sistem Hazır...";

  // Typing animation effect with infinite loop
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      if (!isDeleting && currentIndex <= fullText.length) {
        // Typing phase
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeWriter, 150); // 150ms per character
      } else if (!isDeleting && currentIndex > fullText.length) {
        // Pause before deleting
        isDeleting = true;
        timeoutId = setTimeout(typeWriter, 2000); // Wait 2 seconds
      } else if (isDeleting && currentIndex > 0) {
        // Deleting phase
        currentIndex--;
        setTypedText(fullText.slice(0, currentIndex));
        timeoutId = setTimeout(typeWriter, 100); // 100ms per character deletion
      } else if (isDeleting && currentIndex === 0) {
        // Reset and start over
        isDeleting = false;
        timeoutId = setTimeout(typeWriter, 500); // Wait 500ms before restarting
      }
    };

    typeWriter();

    return () => clearTimeout(timeoutId);
  }, []);

  // Scroll to products section
  const scrollToProducts = () => {
    const productsSection = document.getElementById("urunler");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Open forum link
  const openForum = () => {
    window.open("https://www.hikie.space/finanskodu/finans-kodu-forum", "_blank");
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
          
          {/* Main Heading - NEW H1 from Strategy Document */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
          >
            <span className="text-white">Duygularınızı Değil,</span>
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Sisteminizi Yönetin.
            </span>
          </motion.h1>

          {/* Subheading - H2 from Strategy Document */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            <span className="font-semibold text-white">Finans Kodu;</span> portföyünüzdeki hataları ayıklayan{" "}
            <span style={{ color: '#00D4FF' }}>(Debug)</span>, yapay zekaya emretmenizi sağlayan{" "}
            <span style={{ color: '#A855F7' }}>(Prompt)</span> ve piyasa yönünü tayin eden{" "}
            <span className="text-white">(Algoritma)</span> dijital araçlar bütünüdür.{" "}
            <span className="text-gray-300">Yatırımınızı şansa değil, matematiğe dayandırın.</span>
          </motion.p>

          {/* Visual Composition: Laptop + Sarp + Vera */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-4 sm:gap-8 mb-8"
          >
            {/* Sarp Avatar (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative group"
            >
              <div 
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-3 transition-all duration-300 group-hover:scale-105"
                style={{ 
                  borderColor: '#00D4FF',
                  boxShadow: '0 0 30px #00D4FF40'
                }}
              >
                <img 
                  src="/images/metaperson_mix_2.gif" 
                  alt="Sarp - Teknik Analist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #00D4FF 0%, #0891B2 100%)',
                  color: '#000'
                }}
              >
                SARP
              </div>
            </motion.div>

            {/* Central Laptop/Monitor Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative group"
            >
              <div 
                className="w-32 h-24 sm:w-48 sm:h-36 md:w-56 md:h-40 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-105"
                style={{ 
                  background: '#0a0a0a',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 0 40px rgba(0, 212, 255, 0.2), 0 0 40px rgba(168, 85, 247, 0.2)'
                }}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  {/* Typing Text */}
                  <div className="font-mono text-xs sm:text-sm text-gray-400 h-5">
                    {typedText}
                  </div>
                  
                  {/* Blinking Terminal Cursor />_ with Hover Effect */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
                    className="font-mono text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-300"
                    style={{ 
                      color: '#00FF00', 
                      textShadow: '0 0 10px #00FF00, 0 0 20px #00FF00'
                    }}
                  >
                    <style>{`
                      .group:hover motion-span {
                        background: linear-gradient(135deg, #00D4FF 0%, #A855F7 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-shadow: none;
                        filter: drop-shadow(0 0 10px #00D4FF) drop-shadow(0 0 20px #A855F7);
                      }
                    `}</style>
                    <span className="group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent">
                      /&gt;_
                    </span>
                  </motion.span>
                </div>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-2 rounded-full bg-gray-700" />
            </motion.div>

            {/* Vera Avatar (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative group"
            >
              <div 
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-3 transition-all duration-300 group-hover:scale-105"
                style={{ 
                  borderColor: '#A855F7',
                  boxShadow: '0 0 30px #A855F740'
                }}
              >
                <img 
                  src="/images/vera-avatar.png" 
                  alt="Vera - Makro Stratejist"
                  className="w-full h-full object-cover bg-gradient-to-br from-purple-900 to-purple-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                        <span class="text-3xl sm:text-4xl">👩‍💼</span>
                      </div>
                    `;
                  }}
                />
              </div>
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                  color: '#fff'
                }}
              >
                VERA
              </div>
            </motion.div>
          </motion.div>

          {/* Caption/Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xs sm:text-sm text-gray-500 italic mb-10"
          >
            Bu karakterler ürün değil, bu sistemi kullanırken sana yardım eden asistanlar.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary Button: Dijital Araçları Keşfet */}
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="relative overflow-hidden font-display font-bold text-base sm:text-lg px-8 py-6 rounded-full group"
              style={{ 
                background: 'linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)',
                boxShadow: '0 0 30px #00D4FF50, 0 0 60px #A855F750'
              }}
              aria-label="Dijital araçları keşfet"
            >
              <span className="relative z-10 flex items-center gap-2 text-black">
                Dijital Araçları Keşfet
                <ArrowRight className="w-5 h-5" />
              </span>
              {/* Hover effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #A855F7 0%, #00D4FF 100%)' }}
              />
            </Button>

            {/* Secondary Button: Foruma Git */}
            <Button
              size="lg"
              variant="outline"
              onClick={openForum}
              className="font-display font-semibold text-base sm:text-lg px-8 py-6 rounded-full border-2 hover:bg-white/5 transition-all"
              style={{ 
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#fff'
              }}
              aria-label="Finans Kodu forumuna git"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Foruma Git
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile to prevent overlap with Foruma Git button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
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
