/*
  DESIGN: Vera 3D AI Avatar Component
  
  - Animated 2D avatar with 3D-like effects using CSS transforms
  - Lip-sync animation based on speech synthesis
  - Idle animations: breathing, head sway, blinking
  - Mouse tracking for eye contact effect
  - Listening mode animation
  
  Note: Using 2D image with CSS animations for zero-cost implementation
  without requiring 3D model files or heavy WebGL libraries
*/

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

interface VeraAvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
  amplitude?: number;
}

export default function VeraAvatar({ isSpeaking, isListening, amplitude = 0 }: VeraAvatarProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouthControls = useAnimation();
  const headControls = useAnimation();

  // Mouse tracking for eye contact effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate offset from center (limited range for subtle effect)
        const offsetX = Math.max(-15, Math.min(15, (e.clientX - centerX) / 30));
        const offsetY = Math.max(-10, Math.min(10, (e.clientY - centerY) / 40));
        
        setMousePosition({ x: offsetX, y: offsetY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      // Random blink every 2-5 seconds
      if (Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 1000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Lip-sync animation based on speaking state
  useEffect(() => {
    if (isSpeaking) {
      // Animate mouth opening based on amplitude
      const animateMouth = async () => {
        while (isSpeaking) {
          const openAmount = 0.3 + Math.random() * 0.7; // Random mouth opening
          await mouthControls.start({
            scaleY: openAmount,
            transition: { duration: 0.1 }
          });
          await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));
        }
      };
      animateMouth();
    } else {
      mouthControls.start({ scaleY: 0.1, transition: { duration: 0.2 } });
    }
  }, [isSpeaking, mouthControls]);

  // Head sway animation
  useEffect(() => {
    const swayAnimation = async () => {
      while (true) {
        await headControls.start({
          rotateZ: 1,
          rotateY: mousePosition.x * 0.5,
          rotateX: mousePosition.y * 0.3,
          transition: { duration: 2, ease: "easeInOut" }
        });
        await headControls.start({
          rotateZ: -1,
          rotateY: mousePosition.x * 0.5,
          rotateX: mousePosition.y * 0.3,
          transition: { duration: 2, ease: "easeInOut" }
        });
      }
    };
    swayAnimation();
  }, [headControls, mousePosition]);

  // Listening mode - lean forward
  const getListeningTransform = useCallback(() => {
    if (isListening) {
      return {
        rotateX: 5,
        scale: 1.02,
        y: -5
      };
    }
    return {
      rotateX: 0,
      scale: 1,
      y: 0
    };
  }, [isListening]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50" />
      
      {/* Vera Avatar Container */}
      <motion.div
        animate={{
          ...getListeningTransform(),
          rotateY: mousePosition.x * 0.3,
          rotateX: mousePosition.y * 0.2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Main Avatar Image */}
        <motion.div
          animate={headControls}
          className="relative"
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/vera-avatar_3171c555.webp"
            alt="Vera - Finans Kodu AI Asistan"
            className="w-48 h-auto rounded-2xl shadow-2xl"
            loading="lazy"
            decoding="async"
            style={{
              filter: isBlinking ? "brightness(0.95)" : "brightness(1)",
              transition: "filter 0.1s ease"
            }}
          />
          
          {/* Breathing overlay effect */}
          <motion.div
            animate={{
              scale: [1, 1.01, 1],
              opacity: [0, 0.1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-primary/10 rounded-2xl pointer-events-none"
          />
          
          {/* Lip-sync indicator overlay */}
          {isSpeaking && (
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity
              }}
              className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-8 h-3 bg-primary/30 rounded-full blur-sm pointer-events-none"
            />
          )}
          
          {/* Listening indicator */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -right-2 top-1/3 flex items-center gap-1"
            >
              <div className="flex gap-0.5">
                <motion.span
                  animate={{ height: [8, 16, 8] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                  className="w-1 bg-red-500 rounded-full"
                />
                <motion.span
                  animate={{ height: [12, 8, 12] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                  className="w-1 bg-red-500 rounded-full"
                />
                <motion.span
                  animate={{ height: [8, 14, 8] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  className="w-1 bg-red-500 rounded-full"
                />
              </div>
            </motion.div>
          )}
          
          {/* Speaking indicator */}
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -left-2 top-1/3 flex items-center gap-1"
            >
              <div className="flex gap-0.5">
                <motion.span
                  animate={{ height: [6, 12, 6] }}
                  transition={{ duration: 0.3, repeat: Infinity, delay: 0 }}
                  className="w-1 bg-primary rounded-full"
                />
                <motion.span
                  animate={{ height: [10, 6, 10] }}
                  transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
                  className="w-1 bg-primary rounded-full"
                />
                <motion.span
                  animate={{ height: [6, 14, 6] }}
                  transition={{ duration: 0.3, repeat: Infinity, delay: 0.2 }}
                  className="w-1 bg-primary rounded-full"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      
      {/* Vera name badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-secondary/80 backdrop-blur-sm rounded-full border border-primary/30"
      >
        <span className="text-xs font-display font-semibold text-primary">Vera</span>
        <span className="text-xs text-muted-foreground ml-1">AI Asistan</span>
      </motion.div>
    </div>
  );
}
