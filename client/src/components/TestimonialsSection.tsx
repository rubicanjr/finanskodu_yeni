/*
  DESIGN: Cyber Finance Testimonials Section
  - Slider/carousel for social proof
  - Glassmorphism cards
  - Anonymous stats and quotes
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Users, Clock, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    quote: "Finans Kodu sayesinde aylık raporlama süremiz 3 günden 3 saate düştü. Artık stratejik işlere odaklanabiliyoruz.",
    author: "Finans Müdürü",
    company: "Teknoloji Şirketi",
    rating: 5,
  },
  {
    id: 2,
    quote: "Excel'de saatlerimi harcadığım işleri artık dakikalar içinde tamamlıyorum. Mühendislik yaklaşımı gerçekten fark yaratıyor.",
    author: "CFO",
    company: "E-Ticaret Firması",
    rating: 5,
  },
  {
    id: 3,
    quote: "AI prompt setleri inanılmaz zaman kazandırıyor. Finansal analiz raporlarımı artık çok daha hızlı hazırlıyorum.",
    author: "Finans Uzmanı",
    company: "Danışmanlık Şirketi",
    rating: 5,
  },
  {
    id: 4,
    quote: "Koleksiyondaki şablonlar tam da ihtiyacım olan şeydi. Profesyonel ve kullanımı çok kolay.",
    author: "Muhasebe Müdürü",
    company: "Üretim Şirketi",
    rating: 5,
  },
];

const stats = [
  { icon: Users, value: "500+", label: "Mutlu Kullanıcı" },
  { icon: Clock, value: "%80", label: "Zaman Tasarrufu" },
  { icon: TrendingUp, value: "10x", label: "Verimlilik Artışı" },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Section Divider */}
      <div className="section-divider mb-24" />

      <div className="container" ref={ref}>
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="font-display font-bold text-3xl sm:text-4xl text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // SOSYAL KANIT
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Kullanıcılarımız <span className="gradient-text">Ne Diyor?</span>
          </h2>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Card */}
          <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 opacity-20">
              <Quote className="w-16 h-16 text-primary" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-center font-display leading-relaxed mb-8">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="text-center">
                <div className="font-display font-semibold text-foreground">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full border-border hover:border-primary hover:text-primary bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full border-border hover:border-primary hover:text-primary bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
