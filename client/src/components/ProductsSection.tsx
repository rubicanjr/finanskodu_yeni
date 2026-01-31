/*
  DESIGN: Cyber Finance Products Section - HORIZONTAL CAROUSEL
  STRATEGY: pasted_content_14.txt - Only 3 Products
  
  - Horizontal Scrollable Carousel (Swipeable Cards)
  - Card Anatomy: Image/Icon (Top), Title (Bold), Description (2 lines), "İncele" Button
  - NO PRICE TAGS - Focus on VALUE
  - Only 3 products: Finans Kodu, AI Prompt, Finansal Kokpit
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  ExternalLink, 
  Layers, 
  Brain, 
  LayoutDashboard, 
  ChevronLeft,
  ChevronRight,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  badge?: string;
  badgeColor?: string;
}

// Only 3 products per strategy document
const products: Product[] = [
  {
    id: 1,
    title: "FİNANS KODU: Kaos İçinde Düzen",
    description: "Finansal operasyonlarınızı dönüştürecek kapsamlı metodoloji ve araç seti.",
    icon: Layers,
    link: "https://www.hikie.space/finanskodu/file/3813040824b54db8bba17e4f4b2dd56f",
    badge: "En Popüler",
    badgeColor: "bg-primary",
  },
  {
    id: 2,
    title: "AI Prompt Kütüphanesi",
    description: "Finans profesyonelleri için özel olarak tasarlanmış yapay zeka prompt koleksiyonu.",
    icon: Brain,
    link: "https://www.hikie.space/finanskodu/file/6cf62b1f141d48d1af13cb5ca04a53ab",
    badge: "AI Destekli",
    badgeColor: "bg-purple-500",
  },
  {
    id: 3,
    title: "Finansal Kokpit (Dashboard)",
    description: "Tüm finansal verilerinizi tek bir ekranda izleyin ve analiz edin.",
    icon: LayoutDashboard,
    link: "https://www.hikie.space/finanskodu/file/97301ecf159f43b29dbd4df27005e11c",
    badge: "Yeni",
    badgeColor: "bg-green-500",
  },
];

export default function ProductsSection() {
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
      const scrollAmount = 320; // Card width + gap
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
      id="urunler" 
      className="relative py-24 overflow-hidden"
      aria-labelledby="products-heading"
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0d1117 50%, #0a0a0a 100%)" }}
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
            // DİJİTAL VİTRİN
          </span>
          <h2 id="products-heading" className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Dijital <span className="gradient-text">Araçlar</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Finansal verimliliğinizi artıracak, özenle hazırlanmış dijital ürün koleksiyonumuz
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
            aria-label="Önceki ürünler"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full border-gray-700 hover:border-primary hover:text-primary disabled:opacity-30 bg-transparent"
            aria-label="Sonraki ürünler"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Product Cards - Grid for 3 items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="group"
                itemScope
                itemType="https://schema.org/Product"
              >
                <div 
                  className="h-full rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(145deg, rgba(20, 20, 25, 0.9), rgba(15, 15, 20, 0.95))",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {/* Top Section: Icon + Badge */}
                  <div className="relative mb-4">
                    {/* Icon as "Image" placeholder */}
                    <div 
                      className="w-full h-32 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(168, 85, 247, 0.1))",
                        border: "1px solid rgba(0, 212, 255, 0.2)",
                      }}
                    >
                      <IconComponent 
                        className="w-12 h-12 transition-transform duration-300 group-hover:scale-110" 
                        style={{ color: "#00D4FF" }}
                        aria-hidden="true" 
                      />
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <span 
                        className={`absolute top-3 right-3 ${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Title (Bold) */}
                  <h3 
                    className="font-display font-bold text-lg text-white mb-2 line-clamp-2" 
                    itemProp="name"
                  >
                    {product.title}
                  </h3>

                  {/* Description (2 lines max) */}
                  <p 
                    className="text-gray-400 text-sm mb-6 flex-grow line-clamp-2" 
                    itemProp="description"
                  >
                    {product.description}
                  </p>

                  {/* "Detaylı Bilgi" Button - NO PRICE */}
                  <Button
                    asChild
                    className="w-full font-semibold transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #00D4FF, #A855F7)",
                      color: "#000",
                    }}
                  >
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${product.title} hakkında detaylı bilgi`}
                    >
                      Detaylı Bilgi
                      <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.hikie.space/finanskodu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
          >
            Tüm ürünleri görüntüle
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
