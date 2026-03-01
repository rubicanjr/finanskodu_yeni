/*
  DESIGN: Cyber Finance Testimonials Section
  GEO OPTIMIZED: Semantic HTML with <section>, <figure>, <blockquote>, <figcaption>
  
  - Slider/carousel for social proof
  - Glassmorphism cards
  - ARIA labels for accessibility
  - Proper blockquote semantics
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
  { icon: Users, value: "1000+", label: "Mutlu Kullanıcı" },
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
    <section 
      className="relative py-24 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Section Divider */}
      <div className="section-divider mb-24" aria-hidden="true" />

      <div className="container" ref={ref}>
        {/* Stats - Semantic list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 mb-12 sm:mb-20"
          role="list"
          aria-label="Platform istatistikleri"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="text-center"
              role="listitem"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div className="font-display font-bold text-3xl sm:text-4xl text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // SOSYAL KANIT
          </span>
          <h2 id="testimonials-heading" className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Kullanıcılarımız <span className="gradient-text">Ne Diyor?</span>
          </h2>
        </motion.header>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
          role="region"
          aria-label="Kullanıcı yorumları karuseli"
          aria-live="polite"
        >
          {/* Main Card - Figure with blockquote */}
          <figure className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 opacity-20" aria-hidden="true">
              <Quote className="w-16 h-16 text-primary" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-6 justify-center" role="img" aria-label={`${testimonials[currentIndex].rating} yıldız değerlendirme`}>
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" aria-hidden="true" />
                ))}
              </div>

              {/* Blockquote - Semantic */}
              <blockquote 
                className="text-xl md:text-2xl text-center font-display leading-relaxed mb-8"
                cite="https://finanskodu.manus.space"
              >
                <p>"{testimonials[currentIndex].quote}"</p>
              </blockquote>

              {/* Figcaption - Author info */}
              <figcaption className="text-center">
                <cite className="not-italic">
                  <strong className="font-display font-semibold text-foreground block">
                    {testimonials[currentIndex].author}
                  </strong>
                  <span className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].company}
                  </span>
                </cite>
              </figcaption>
            </div>
          </figure>

          {/* Navigation */}
          <nav className="flex items-center justify-center gap-4 mt-8" aria-label="Yorum navigasyonu">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full border-border hover:border-primary hover:text-primary bg-transparent"
              aria-label="Önceki yorum"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </Button>

            {/* Dots - Pagination */}
            <div className="flex gap-2" role="tablist" aria-label="Yorum seçici">
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
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Yorum ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full border-border hover:border-primary hover:text-primary bg-transparent"
              aria-label="Sonraki yorum"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </nav>
        </motion.div>
      </div>
    </section>
  );
}
