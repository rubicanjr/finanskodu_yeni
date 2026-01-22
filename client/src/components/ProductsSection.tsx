/*
  DESIGN: Cyber Finance Products Section
  GEO OPTIMIZED: Semantic HTML with <section>, <article>
  
  - 10 products in responsive 3-4 column grid
  - External links open in new tab with security attributes
  - Product disclaimer note below each description
  - Neon glow effects on hover
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
  {
    id: 4,
    title: "Finans Kodu Koleksiyonu",
    description: "Tüm dijital ürünlerimizi içeren kapsamlı paket. Excel'den kurtulun, verimliliğe geçin.",
    icon: Package,
    link: "https://www.hikie.space/finanskodu/file/947c92609953489cb1d929b41546e309",
  },
  {
    id: 5,
    title: "Finansçının El Kitabı",
    description: "Modern finansçının dijital dönüşüm yolculuğu için kapsamlı rehber.",
    icon: BookOpen,
    link: "https://www.hikie.space/finanskodu/file/cedbc017e960447ea07d4b6b11d48483",
  },
  {
    id: 6,
    title: "FULL PAKET",
    description: "Tüm ürünlere sınırsız erişim. Maksimum değer, minimum maliyet.",
    icon: Crown,
    link: "https://www.hikie.space/finanskodu/file/1b3adbf2aa454b63a0c3f9d0f3d5220f",
    badge: "Premium",
    badgeColor: "bg-amber-500",
  },
  {
    id: 7,
    title: "Finans Kodu Forum",
    description: "Finans profesyonelleri topluluğuna katılın, sorular sorun, deneyimlerinizi paylaşın.",
    icon: Users,
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    badge: "Ücretsiz",
    badgeColor: "bg-blue-500",
  },
  {
    id: 8,
    title: "1:1 Finansal Check-Up",
    description: "Kişiselleştirilmiş finansal analiz ve strateji danışmanlığı seansı.",
    icon: UserCheck,
    link: "https://www.hikie.space/finanskodu/file/f24c51cbdeb94149857af492db48f85e",
  },
  {
    id: 9,
    title: "Algoritmik Strateji Bülteni (1 Ay)",
    description: "Aylık algoritmik strateji analizleri ve piyasa içgörüleri.",
    icon: TrendingUp,
    link: "https://www.hikie.space/finanskodu/file/580f50a8894f4076aaca0b93ae255406",
  },
  {
    id: 10,
    title: "Algoritmik Strateji Bülteni (3 Ay)",
    description: "3 aylık algoritmik strateji paketi. Uzun vadeli analiz ve takip.",
    icon: Calendar,
    link: "https://www.hikie.space/finanskodu/file/0245fdcfe8ac429ba9fad3c5948ee04c",
    badge: "Tasarruflu",
    badgeColor: "bg-emerald-500",
  },
];

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="urunler" 
      className="relative py-24 overflow-hidden"
      aria-labelledby="products-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/products-bg.jpg')" }}
        role="img"
        aria-label="Ürünler bölümü arka planı"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // DİJİTAL VİTRİN
          </span>
          <h2 id="products-heading" className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Dijital <span className="gradient-text">Ürünler</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finansal verimliliğinizi artıracak, özenle hazırlanmış dijital ürün koleksiyonumuz
          </p>
        </motion.header>

        {/* Products Grid - 3-4 columns responsive */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="group glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 relative flex flex-col"
                itemScope
                itemType="https://schema.org/Product"
              >
                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-4 right-4 ${product.badgeColor} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
                    {product.badge}
                  </span>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-lg mb-2" itemProp="name">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-3 flex-grow" itemProp="description">
                  {product.description}
                </p>

                {/* Disclaimer Note */}
                <p className="text-xs text-muted-foreground/70 italic mb-4">
                  Sitede ürün açıklamasının altında ürünün özellikleri ve sıkça sorulan sorular mevcut, bunları inceleyin.
                </p>

                {/* CTA Button */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-border hover:border-primary hover:text-primary bg-transparent group-hover:neon-glow"
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
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Tüm ürünleri Hikie mağazamızdan satın alabilirsiniz
          </p>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-display font-semibold"
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
    </section>
  );
}
