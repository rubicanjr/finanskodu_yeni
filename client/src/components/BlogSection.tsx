/**
 * BlogSection Component - CAROUSEL FORMAT
 * 
 * Strategy: pasted_content_14.txt - TASK 7
 * - "Blog & Analizler" başlıklı yeni section
 * - 5 blog kartı swipeable carousel formatında
 * - Hikie.space forum linkleri
 */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  link: string;
  tags: string[];
}

// 5 Blog Posts per strategy document
const blogPosts: BlogPost[] = [
  {
    id: "excel-den-algoritmik-finansa",
    title: "Excel'den Algoritmik Finansa Geçiş",
    excerpt: "Manuel hataları sıfırlama rehberi. Finansal piyasaların hızı nanosaniyelerle ölçülürken, yatırım kararlarınızı hala statik Excel tablolarına mı emanet ediyorsunuz?",
    image: "/images/blog-excel-escape.jpg",
    date: "15 Ocak 2025",
    readTime: "5 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Algoritmik Finans", "Excel"]
  },
  {
    id: "whatsapp-tuyolari-vs-veri",
    title: "Whatsapp Tüyoları vs. Veri İstihbaratı",
    excerpt: "Telefonunuza gelen 'Bu hisse uçacak' mesajı bir fırsat mı, yoksa bir tuzak mı? Finans dünyasında bilgi ikiye ayrılır.",
    image: "/images/solution-section-bg.jpg",
    date: "10 Ocak 2025",
    readTime: "4 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Veri İstihbaratı", "Strateji"]
  },
  {
    id: "otomatik-strateji-takip",
    title: "Otomatik Strateji Takip Sistemleri",
    excerpt: "Zamanı olmayan yatırımcılar için. Toplantıdasınız, ameliyattasınız veya uçaktasınız... Tam o anda piyasa çöktü.",
    image: "/images/problem-section-bg.jpg",
    date: "5 Ocak 2025",
    readTime: "4 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Otomasyon", "Yapay Zeka"]
  },
  {
    id: "finansal-anayasa",
    title: "Finansal Anayasa Nedir?",
    excerpt: "Kendi yatırım kurallarınızı oluşturun. Duygusal kararlar yerine sistematik yaklaşım ile portföyünüzü koruyun.",
    image: "/images/blog-excel-escape.jpg",
    date: "1 Ocak 2025",
    readTime: "6 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Strateji", "Psikoloji"]
  },
  {
    id: "ai-finans-devrimi",
    title: "AI ile Finans Devrimi",
    excerpt: "Yapay zeka finansal kararlarınızı nasıl dönüştürüyor? Prompt mühendisliği ile yatırım analizlerinizi güçlendirin.",
    image: "/images/solution-section-bg.jpg",
    date: "28 Aralık 2024",
    readTime: "5 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["AI", "Prompt"]
  }
];

export default function BlogSection() {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section
      id="blog"
      className="relative py-24 overflow-hidden"
      aria-labelledby="blog-heading"
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #0d1117 0%, #0a0a0a 50%, #0d1117 100%)" }}
      />

      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // İÇGÖRÜLER
          </span>
          <h2 
            id="blog-heading"
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6"
          >
            Blog & <span className="gradient-text">Analizler</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Algoritmik finans, yapay zeka ve verimlilik stratejileri hakkında derinlemesine içerikler
          </p>
        </motion.header>

        {/* Carousel Navigation Buttons (Desktop) */}
        <div className="hidden md:flex items-center justify-end gap-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full border-gray-700 hover:border-primary hover:text-primary disabled:opacity-30 bg-transparent"
            aria-label="Önceki yazılar"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full border-gray-700 hover:border-primary hover:text-primary disabled:opacity-30 bg-transparent"
            aria-label="Sonraki yazılar"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div className="relative">
          {/* Gradient Fade Left */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none hidden md:block"
            style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }}
          />
          
          {/* Gradient Fade Right */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none hidden md:block"
            style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }}
          />

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="group flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
              >
                <div 
                  className="h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(145deg, rgba(20, 20, 25, 0.9), rgba(15, 15, 20, 0.95))",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {/* Featured Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    
                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {post.tags.slice(0, 1).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More Link */}
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary/80 transition-colors group/btn"
                    >
                      <span>Devamını Oku</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
          >
            Tüm yazıları görüntüle
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
