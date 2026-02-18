import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackCTAClick } from "@/lib/analytics";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  const messages = [
    "Sistem Hazır...",
    "Analiz Başlıyor...",
    "Veriler Yükleniyor...",
    "Portföy Taranıyor...",
    "Strateji Hesaplanıyor..."
  ];

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    const currentMessage = messages[currentMessageIndex];

    const typeWriter = () => {
      if (!isDeleting && currentIndex <= currentMessage.length) {
        setTypedText(currentMessage.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeWriter, 150);
      } else if (!isDeleting && currentIndex > currentMessage.length) {
        isDeleting = true;
        timeoutId = setTimeout(typeWriter, 2000);
      } else if (isDeleting && currentIndex > 0) {
        currentIndex--;
        setTypedText(currentMessage.slice(0, currentIndex));
        timeoutId = setTimeout(typeWriter, 100);
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        timeoutId = setTimeout(typeWriter, 500);
      }
    };

    typeWriter();
    return () => clearTimeout(timeoutId);
  }, [currentMessageIndex]);

  const scrollToProducts = () => {
    trackCTAClick('hero_products_cta', '#urunler');
    const productsSection = document.getElementById("urunler");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openForum = () => {
    trackCTAClick('hero_forum_cta', 'https://www.hikie.space/finanskodu/finans-kodu-forum');
    window.open("https://www.hikie.space/finanskodu/finans-kodu-forum", "_blank");
  };

  return (
    <header 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#050810' }}
      role="banner"
      aria-label="Ana başlık bölümü"
    >
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0EA5E9 1px, transparent 1px),
              linear-gradient(to bottom, #0EA5E9 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Radial Glow - Subtle */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div 
          className="absolute top-1/3 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[150px]"
          style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm font-mono tracking-[0.15em] mb-6"
            style={{ color: '#0EA5E9' }}
          >
            // FİNANSAL VERİMLİLİK İÇİN
          </motion.div>

          {/* Main Heading - Updated for 2.0 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-white"
          >
            Kaos Senin İşin Değil.{" "}
            <br className="hidden sm:block" />
            <span style={{ color: '#0EA5E9' }}>
              Karar Senin,
            </span>{" "}
            Gürültüyü Biz Filtreleriz.
          </motion.h1>

          {/* Subheading - Updated for 2.0 */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#8899AA' }}
          >
            100+ test edilmiş AI aracı, finansal metodoloji ve algoritmik analiz. 
            Sen pilotun; navigasyonu biz üstleniyoruz.
          </motion.p>

          {/* Terminal Animation - Clean, no avatars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-10"
          >
            <div 
              className="w-64 h-20 sm:w-80 sm:h-24 rounded-xl border flex items-center justify-center"
              style={{ 
                background: '#0D1117',
                borderColor: '#1E2D3D',
              }}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="font-mono text-xs sm:text-sm h-5" style={{ color: '#8899AA' }}>
                  {typedText}
                </div>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
                  className="font-mono text-xl sm:text-2xl font-bold"
                  style={{ color: '#10B981', textShadow: '0 0 10px #10B98140' }}
                >
                  /&gt;_
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="relative overflow-hidden font-display font-bold text-base sm:text-lg px-8 py-6 rounded-lg group"
              style={{ 
                background: '#0EA5E9',
                color: '#fff',
                boxShadow: '0 0 20px #0EA5E930'
              }}
              aria-label="Dijital araçları keşfet"
            >
              <span className="relative z-10 flex items-center gap-2">
                Dijital Araçları Keşfet
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={openForum}
              className="font-display font-semibold text-base sm:text-lg px-8 py-6 rounded-lg border hover:bg-white/5 transition-all"
              style={{ 
                borderColor: '#1E2D3D',
                color: '#C8D6E5'
              }}
              aria-label="Finans Kodu forumuna git"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Foruma Git
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2" style={{ borderColor: '#1E2D3D' }}>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#0EA5E9' }}
          />
        </div>
      </motion.div>
    </header>
  );
}
