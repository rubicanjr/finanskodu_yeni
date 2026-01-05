/*
  DESIGN: Cyber Finance Products Section
  GEO OPTIMIZED: Semantic HTML with <section>, <article> for each product
  
  - Glassmorphism product cards wrapped in <article>
  - Secure external links with target="_blank" rel="noopener noreferrer"
  - Lazy loading for images
  - Machine-readable product structure
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Sparkles, BookOpen, Lightbulb, Layers, ArrowUpRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SHOPIER_URL = "https://www.shopier.com/finanskodu";

interface Product {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  featured: boolean;
  badge: string | null;
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    title: "Finans Kodu Koleksiyonu",
    description: "Finansal operasyonlarınızı dönüştürecek kapsamlı şablon ve otomasyon seti. Excel'den kurtulun, verimliliğe geçin.",
    icon: Layers,
    featured: true,
    badge: "En Popüler",
    features: ["50+ Hazır Şablon", "AI Prompt Setleri", "Video Eğitimler", "Topluluk Erişimi"],
  },
  {
    id: 2,
    title: "Kaos İçinde Düzen",
    description: "Karmaşık finansal süreçlerinizi sistematik hale getiren metodoloji ve araç seti.",
    icon: Sparkles,
    featured: false,
    badge: "Yeni",
    features: ["Süreç Haritaları", "Kontrol Listeleri", "Otomasyon Rehberi"],
  },
  {
    id: 3,
    title: "AI Prompt Kütüphanesi",
    description: "Finans profesyonelleri için özel olarak tasarlanmış yapay zeka prompt koleksiyonu.",
    icon: Lightbulb,
    featured: false,
    badge: null,
    features: ["100+ Prompt", "ChatGPT Uyumlu", "Sürekli Güncelleme"],
  },
  {
    id: 4,
    title: "Finansçının El Kitabı",
    description: "Modern finansçının dijital dönüşüm yolculuğu için kapsamlı rehber.",
    icon: BookOpen,
    featured: false,
    badge: null,
    features: ["E-Kitap", "Pratik Örnekler", "Bonus İçerikler"],
  },
];

function ProductCard({ product }: { product: Product }) {
  const IconComponent = product.icon;
  
  return (
    <article
      className="group relative h-full glass-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
      itemScope
      itemType="https://schema.org/Product"
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            {product.badge}
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <IconComponent className="w-6 h-6 text-primary" aria-hidden="true" />
      </div>

      {/* Title & Description */}
      <h3 
        id={`product-title-${product.id}`}
        className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors"
        itemProp="name"
      >
        {product.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4" itemProp="description">
        {product.description}
      </p>

      {/* Features */}
      <ul className="flex flex-wrap gap-1.5 mb-4" aria-label={`${product.title} özellikleri`}>
        {product.features.map((feature, idx) => (
          <li
            key={idx}
            className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs"
          >
            {feature}
          </li>
        ))}
      </ul>

      {/* Link - Secure external link */}
      <a 
        href={SHOPIER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all"
        itemProp="url"
        aria-label={`${product.title} detaylarını Shopier'de gör`}
      >
        <span>Detayları Gör</span>
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
      </a>
    </article>
  );
}

function FeaturedProductCard({ product }: { product: Product }) {
  const IconComponent = product.icon;
  
  return (
    <article
      className="group relative h-full glass-card rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden"
      itemScope
      itemType="https://schema.org/Product"
      aria-labelledby={`featured-product-title-${product.id}`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Badge */}
        {product.badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs font-semibold text-primary">{product.badge}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <IconComponent className="w-7 h-7 text-primary" aria-hidden="true" />
            </div>

            {/* Title & Description */}
            <h3 
              id={`featured-product-title-${product.id}`}
              className="font-display font-bold text-2xl mb-3 group-hover:text-primary transition-colors"
              itemProp="name"
            >
              {product.title}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg" itemProp="description">
              {product.description}
            </p>

            {/* Features */}
            <ul className="flex flex-wrap gap-2 mb-6" aria-label={`${product.title} özellikleri`}>
              {product.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA - Secure external link */}
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-display font-semibold group/btn shrink-0"
          >
            <a 
              href={SHOPIER_URL}
              target="_blank"
              rel="noopener noreferrer"
              itemProp="url"
              aria-label={`${product.title} ürününü Shopier'de incele`}
            >
              İncele
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProduct = products[0];
  const otherProducts = products.slice(1);

  return (
    <section 
      id="urunler" 
      className="relative py-24 overflow-hidden"
      aria-labelledby="products-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Finansal verimliliğinizi artıracak, özenle hazırlanmış dijital ürün koleksiyonumuz
          </p>
        </motion.header>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Product - Spans 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2"
          >
            <FeaturedProductCard product={featuredProduct} />
          </motion.div>

          {/* Other Products */}
          {otherProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
          aria-label="Mağaza bağlantısı"
        >
          <p className="text-muted-foreground mb-4">
            Tüm ürünleri Shopier mağazamızdan satın alabilirsiniz
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border hover:border-primary hover:text-primary font-display bg-transparent"
          >
            <a 
              href={SHOPIER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shopier mağazamızı ziyaret et"
            >
              Shopier Mağazamız
              <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        </motion.nav>
      </div>
    </section>
  );
}
