/*
  TESTIMONIALS COLUMN: Right column for Hero section
  
  - Displays rotating user testimonials
  - Fade effect animation
  - 2 testimonials cycling
*/

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Finans Kodu sayesinde analizlerim saatlerden dakikalara indi. Prompt kütüphanesi gerçekten işimi kolaylaştırdı.",
    author: "Ahmet K.",
    role: "CFO",
    avatar: "👨‍💼",
  },
  {
    id: 2,
    text: "Excel'de AI kullanmayı öğrendikten sonra raporlama süreçlerim tamamen değişti. Çok pratik çözümler.",
    author: "Zeynep M.",
    role: "Finansal Analist",
    avatar: "👩‍💻",
  },
];

export default function TestimonialsColumn() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col gap-6"
    >
      {/* Heading */}
      <h3 className="text-lg font-display font-semibold text-gray-300 mb-2">
        Kullanıcı Yorumları
      </h3>

      {/* Testimonial Card with Fade Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 relative"
          style={{
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)",
          }}
        >
          {/* Quote Icon */}
          <div className="absolute top-4 right-4 opacity-20">
            <Quote className="w-8 h-8 text-purple-400" />
          </div>

          {/* Testimonial Text */}
          <p className="text-sm text-gray-300 mb-4 leading-relaxed italic">
            "{current.text}"
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-xl">
              {current.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{current.author}</p>
              <p className="text-xs text-gray-400">{current.role}</p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2 mt-4 justify-center">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-purple-500 w-6"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
