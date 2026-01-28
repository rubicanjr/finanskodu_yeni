/*
  DESIGN: Mobile Bottom Navigation Bar
  STRATEGY: pasted_content_13.txt - TASK 4
  
  - Fixed bottom-0 navigation bar for Mobile screens
  - Items: [🏠 Ana Sayfa] [🛍️ Ürünler] [🤖 Asistan]
  - Glassmorphism effect (blur background)
  - Only visible on mobile devices
*/

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ShoppingBag, Bot } from "lucide-react";

interface NavItem {
  icon: typeof Home;
  label: string;
  action: () => void;
  isSpecial?: boolean;
}

export default function MobileBottomNav() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Navigation actions
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveItem("home");
  };

  const scrollToProducts = () => {
    document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth" });
    setActiveItem("products");
  };

  const openAssistant = () => {
    // Dispatch custom event to open DualPersona widget
    window.dispatchEvent(new CustomEvent("openDualPersonaWidget"));
    setActiveItem("assistant");
  };

  const navItems: NavItem[] = [
    { icon: Home, label: "Ana Sayfa", action: scrollToTop },
    { icon: ShoppingBag, label: "Ürünler", action: scrollToProducts },
    { icon: Bot, label: "Asistan", action: openAssistant, isSpecial: true },
  ];

  // Don't render on desktop
  if (!isMobile) return null;

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 pb-safe"
      aria-label="Mobil navigasyon"
    >
      {/* Glassmorphism Container */}
      <div 
        className="mx-3 mb-3 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10, 10, 10, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 -4px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex items-center justify-around py-3 px-2">
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={item.action}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                item.isSpecial 
                  ? "relative" 
                  : activeItem === item.label.toLowerCase().replace(" ", "") 
                    ? "text-white" 
                    : "text-gray-400"
              }`}
              aria-label={item.label}
            >
              {item.isSpecial ? (
                // Special styling for Assistant button
                <div 
                  className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #00D4FF20, #A855F720)",
                    border: "1px solid rgba(0, 212, 255, 0.3)",
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #00D4FF, #A855F7)",
                      boxShadow: "0 0 15px #00D4FF50",
                    }}
                  >
                    <item.icon className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-[10px] font-medium text-white">{item.label}</span>
                </div>
              ) : (
                <>
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
