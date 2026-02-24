import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Layers, LayoutDashboard, ArrowRight, type LucideIcon } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  link: string;
  badge: string;
  badgeColor: string;
  journeyBadge: string;
  journeyColor: string;
  buttonText: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "AI Prompt Kütüphanesi",
    description: "Finans profesyonelleri için özel olarak tasarlanmış 100+ yapay zeka prompt koleksiyonu.",
    icon: Brain,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/eExAEklLAjIAZkEK.png",
    link: "https://www.hikie.space/finanskodu/file/6cf62b1f141d48d1af13cb5ca04a53ab",
    badge: "Hemen Kullan",
    badgeColor: "#8B5CF6",
    journeyBadge: "BAŞLA",
    journeyColor: "#10B981",
    buttonText: "Prompt'ları Keşfet",
  },
  {
    id: 2,
    title: "FİNANS KODU: Kaos İçinde Düzen",
    description: "Finansal operasyonlarınızı dönüştürecek kapsamlı metodoloji ve araç seti.",
    icon: Layers,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/tipqmgRCXZXEvHBH.png",
    link: "https://www.hikie.space/finanskodu/file/3813040824b54db8bba17e4f4b2dd56f",
    badge: "Çok Satan",
    badgeColor: "#0EA5E9",
    journeyBadge: "DEVAM ET",
    journeyColor: "#0EA5E9",
    buttonText: "Sistemi İncele",
  },
  {
    id: 3,
    title: "Pro - Algoritmik Strateji ve Analiz Bülteni",
    description: "Piyasa yönü, makro analizler ve algoritmik sinyaller içeren kapsamlı aylık bülten.",
    icon: LayoutDashboard,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/KzrqHllOnTCvKWzx.png",
    link: "https://www.hikie.space/finanskodu/algoritmik-strateji-ve-analiz",
    badge: "Aylık Sinyal",
    badgeColor: "#D4A853",
    journeyBadge: "İLERLE",
    journeyColor: "#8899AA",
    buttonText: "Bültene Katıl",
  },
];

function ProductCard({ product, index, isInView }: { product: Product; index: number; isInView: boolean }) {
  const IconComponent = product.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
      className="group relative"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div
        className="h-full rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:translate-y-[-2px]"
        style={{
          background: "#0D1117",
          border: "1px solid #1E2D3D",
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, var(--card) 100%)" }} />
          
          {/* Journey Badge */}
          <span
            className="absolute top-3 left-3 font-mono text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded"
            style={{ background: product.journeyColor + "20", color: product.journeyColor, border: `1px solid ${product.journeyColor}40` }}
          >
            {product.journeyBadge}
          </span>

          {/* Badge */}
          <span
            className="absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded"
            style={{ background: product.badgeColor + "20", color: product.badgeColor }}
          >
            {product.badge}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Icon + Title */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--secondary)' }}>
              <IconComponent size={18} style={{ color: 'var(--primary)' }} />
            </div>
            <h3 className="font-bold text-[15px] leading-tight" style={{ color: 'var(--foreground)' }} itemProp="name">
              {product.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5 flex-1 line-clamp-2" style={{ color: 'var(--muted-foreground)' }} itemProp="description">
            {product.description}
          </p>

          {/* CTA */}
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            itemProp="url"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "#0EA5E910",
              color: "#0EA5E9",
              border: "1px solid #0EA5E930",
            }}
            aria-label={`${product.title} sayfasına git`}
          >
            {product.buttonText}
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="urunler" className="relative py-20 overflow-hidden" aria-labelledby="products-heading" style={{ background: 'var(--background)' }}>
      <div className="container relative z-10" ref={ref}>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[0.15em] mb-3 block" style={{ color: 'var(--primary)' }}>
            // DİJİTAL VİTRİN
          </span>
          <h2 id="products-heading" className="font-display font-bold text-3xl sm:text-4xl mb-4" style={{ color: 'var(--foreground)' }}>
            Dijital <span style={{ color: 'var(--chart-2)' }}>Araçlar</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            100+ hazır AI prompt, finansal metodoloji ve aylık strateji bülteni
          </p>
        </motion.header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
