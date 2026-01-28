/*
  DESIGN: Cyber Finance Products Section - HORIZONTAL CAROUSEL
  STRATEGY: pasted_content_13.txt - TASK 6
  
  - Horizontal Scrollable Carousel (Swipeable Cards)
  - Card Anatomy: Image (Top), Title (Bold), Price (Highlighted), "İncele" Button
  - Users swipe left/right to see products
  - Touch-friendly for mobile
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  ExternalLink, 
  Layers, 
  Brain, 
  LayoutDashboard, 
  Package, 
  BookOpen, 
  Crown, 
  Users, 
  UserCheck, 
  TrendingUp,
  Calendar,
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
  price?: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "FİNANS KODU: Kaos İçinde Düzen",
    description: "Finansal operasyonlarınızı dönüştürecek kapsamlı metodoloji ve araç seti.",
    icon: Layers,
    link: "https://www.hikie.space/finanskodu/file/3813040824b54db8bba17e4f4b2dd56f",
    badge: "En Popüler",
    badgeColor: "bg-primary",
    price: "₺299",
  },
  {
    id: 2,
    title: "AI Prompt Kütüphanesi",
    description: "Finans profesyonelleri için özel olarak tasarlanmış yapay zeka prompt koleksiyonu.",
    icon: Brain,
    link: "https://www.hikie.space/finanskodu/file/6cf62b1f141d48d1af13cb5ca04a53ab",
    price: "₺149",
  },
  {
    id: 3,
    title: "Finansal Kokpit (Dashboard)",
    description: "Tüm finansal verilerinizi tek bir ekranda izleyin ve analiz edin.",
    icon: LayoutDashboard,
    link: "https://www.hikie.space/finanskodu/file/97301ecf159f43b29dbd4df27005e11c",
    badge: "Yeni",
    badgeColor: "bg-green-500",
    price: "₺199",
  },
  {
    id: 4,
    title: "Finans Kodu Koleksiyonu",
    description: "Tüm dijital ürünlerimizi içeren kapsamlı paket. Excel'den kurtulun, verimliliğe geçin.",
    icon: Package,
    link: "https://www.hikie.space/finanskodu/file/947c92609953489cb1d929b41546e309",
    price: "₺499",
  },
  {
    id: 5,
    title: "Finansçının El Kitabı",
    description: "Modern finansçının dijital dönüşüm yolculuğu için kapsamlı rehber.",
    icon: BookOpen,
    link: "https://www.hikie.space/finanskodu/file/cedbc017e960447ea07d4b6b11d48483",
    price: "₺99",
  },
  {
    id: 6,
    title: "FULL PAKET",
    description: "Tüm ürünlere sınırsız erişim. Maksimum değer, minimum maliyet.",
    icon: Crown,
    link: "https://www.hikie.space/finanskodu/file/1b3adbf2aa454b63a0c3f9d0f3d5220f",
    badge: "Premium",
    badgeColor: "bg-amber-500",
    price: "₺999",
  },
  {
    id: 7,
    title: "Finans Kodu Forum",
    description: "Finans profesyonelleri topluluğuna katılın, sorular sorun, deneyimlerinizi paylaşın.",
    icon: Users,
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    badge: "Ücretsiz",
    badgeColor: "bg-blue-500",
    price: "Ücretsiz",
  },
  {
    id: 8,
    title: "1:1 Finansal Check-Up",
    description: "Kişiselleştirilmiş finansal analiz ve strateji danışmanlığı seansı.",
    icon: UserCheck,
    link: "https://www.hikie.space/finanskodu/file/f24c51cbdeb94149857af492db48f85e",
    price: "₺599",
  },
  {
    id: 9,
    title: "Algoritmik Strateji Bülteni (1 Ay)",
    description: "Aylık algoritmik strateji analizleri ve piyasa içgörüleri.",
    icon: TrendingUp,
    link: "https://www.hikie.space/finanskodu/file/580f50a8894f4076aaca0b93ae255406",
    price: "₺199",
  },
  {
    id: 10,
    title: "Algoritmik Strateji Bülteni (3 Ay)",
    description: "3 aylık algoritmik strateji paketi. Uzun vadeli analiz ve takip.",
    icon: Calendar,
    link: "https://www.hikie.space/finanskodu/file/0245fdcfe8ac429ba9fad3c5948ee04c",
    badge: "Tasarruflu",
    badgeColor: "bg-emerald-500",
    price: "₺449",
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
            Dijital <span className="gradient-text">Ürünler</span>
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
            {products.map((product, index) => {
              const IconComponent = product.icon;
              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="group flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
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

                    {/* Description */}
                    <p 
                      className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3" 
                      itemProp="description"
                    >
                      {product.description}
                    </p>

                    {/* Price (Highlighted) */}
                    <div className="mb-4">
                      <span 
                        className="text-2xl font-bold"
                        style={{ 
                          background: "linear-gradient(135deg, #00D4FF, #A855F7)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        itemProp="price"
                      >
                        {product.price}
                      </span>
                    </div>

                    {/* "İncele" Button */}
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
                        aria-label={`${product.title} ürününü incele`}
                        itemProp="url"
                      >
                        İncele
                        <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Swipe Hint (Mobile) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-sm mt-4 md:hidden"
        >
          ← Kaydırarak daha fazla ürün görün →
        </motion.p>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            Tüm ürünleri Hikie mağazamızdan satın alabilirsiniz
          </p>
          <Button
            asChild
            size="lg"
            className="font-display font-semibold px-8"
            style={{
              background: "linear-gradient(135deg, #00D4FF, #A855F7)",
              color: "#000",
              boxShadow: "0 0 30px #00D4FF40",
            }}
          >
            <a
              href="https://www.hikie.space/finanskodu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hikie mağazamızı ziyaret et"
            >
              Hikie Mağazamız
              <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
