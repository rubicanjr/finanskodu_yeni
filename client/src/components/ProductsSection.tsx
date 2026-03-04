import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Layers, LayoutDashboard, ArrowRight, type LucideIcon } from "lucide-react";
import PictureImage from "@/components/PictureImage";

interface Product {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  avifImage?: string;
  link: string;
  badge: string;
  badgeColor: string;
  journeyBadge: string;
  journeyColor: string;
  buttonText: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    title: "AI Prompt Kütüphanesi",
     description: "Yapay zekaı etkili kullanarak verimliliğinizi ve aramalardaki kalitenizi artırın; AI Prompt kütüphanesi ile özellikle finans alanındaki işinizde fark yaratın.",
    icon: Brain,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/product-ai-prompt-562w_1a853b57.webp",
    avifImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/product-ai-prompt-562w_1ed62be2.avif",
    link: "/dijital-araclar/ai-prompt-kutuphanesi",
    badge: "Hemen Kullan",
    badgeColor: "#8B5CF6",
    journeyBadge: "BAŞLA",
    journeyColor: "#10B981",
    buttonText: "Şimdi anında erişim sağlayın",
    features: [
      "🧠 100+ Profesyonel Komut",
      "👔 Sanal Analist",
      "⚡ Hız ve Verimlilik",
      "📊 Tam Kapsam",
      "📋 Kopyala-Yapıştır",
      "🚀 AI Okuryazarlığı",
    ],
  },
  {
    id: 2,
    title: "Kaos İçinde Düzen",
    description: "Finansal kararlarınızı duygulardan değil, mühendislik mantığından alın. Kaos İçinde Düzen ile panik ve açgözlük döngüsünü kırın; sistematik düşünce, karar matrisleri ve risk/getiri formülleriyle sürdürülebilir bir portföy mimarisi kurun.",
    icon: Layers,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/product-finans-kodu-562w_28e65c3f.webp",
    avifImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/product-finans-kodu-562w_eee8781b.avif",
    link: "/dijital-araclar/finans-kodu-kaos-icinde-duzen",
    badge: "Çok Satan",
    badgeColor: "#0EA5E9",
    journeyBadge: "DEVAM ET",
    journeyColor: "#0EA5E9",
    buttonText: "Şimdi anında satın alın",
    features: [
      "🏭 Mühendislik Perspektifi",
      "🧠 Duygu-Bozucu Algoritmalar",
      "⚖️ Risk/Getiri Mühendisliği",
      "🔄 Sürdürülebilir Varlık Döngüsü",
      "🎯 Karar Matrisleri",
      "🚫 Gürültü Filtreleme",
    ],
  },
  {
    id: 3,
    title: "Pro — Algoritmik Strateji Bülteni",
    description: "Piyasanın nereye gittiğini bilmek yetmez — siz o piyasada nerede duruyorsunuz? Algoritmik altın ve fon sinyalleri, haftalık sesli brifing ve aylık 1:1 finansal check-up ile portföyünüzdeki mantık hatalarını temizleyin; duygu yok, tahmin yok, sadece matematik.",
    icon: LayoutDashboard,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/product-pro-bulten-565w_c1ddc987.webp",
    avifImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/product-pro-bulten-565w_60a9a35f.avif",
    link: "/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni",
    badge: "Aylık Sinyal",
    badgeColor: "#D4A853",
    journeyBadge: "İLERLE",
    journeyColor: "#8899AA",
    buttonText: "Şimdi anında erişim sağlayın",
    features: [
      "🥇 Altın Algoritması",
      "📈 Akıllı Fon Sepetleri",
      "🎙️ Haftalık Sesli Brifing",
      "🚀 Kanıtlanmış Model",
      "🎯 Yüksek Veri İsabeti",
      "🔍 1:1 Finansal Check-Up",
      "🛣️ Kişisel Reçete",
      "📲 VIP İletişim Hattı",
    ],
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
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Image */}
          <div className="relative overflow-hidden h-48">
          <PictureImage
            src={product.image}
            avifSrc={product.avifImage}
            alt={product.title}
            className="transition-transform duration-500 group-hover:scale-105"
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
            <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--secondary)' }}>
              <IconComponent size={18} style={{ color: 'var(--primary)' }} />
            </span>
            <h3 className="font-bold text-[15px] leading-tight" style={{ color: 'var(--foreground)', minHeight: '40px' }} itemProp="name">
              {product.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }} itemProp="description">
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
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "1px solid var(--primary)",
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
