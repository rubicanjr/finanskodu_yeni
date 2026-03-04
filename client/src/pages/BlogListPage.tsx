/*
  BLOG LIST PAGE: All blog posts listing
  
  - Grid layout with all blog posts
  - Category filtering (horizontal scroll, single row)
  - Each card: Cover image, Title, Excerpt, Date, "Read More" button
  - SEO meta tags
  - Empty state for no results
  - Post count display
*/

import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { trackCategoryFilter } from "@/lib/analytics";
import LazyImage from "@/components/LazyImage";

// Blog posts metadata
const blogPosts = [
  {
    id: "finans-raporu-otomasyonu",
    title: "Finans Raporu Otomasyonu: Veri Girişinden Stratejik Liderliğe Geçiş",
    excerpt: "Finans raporlarını otomatikleştirerek veri girişinden stratejik liderliğe nasıl geçiş yapabilirsiniz? CFO'lar için otomasyon rehberi.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-1-800w_9b90dab8.webp",
    date: "13 Şubat 2026",
    readTime: "8",
    tags: ["Otomasyon", "CFO"],
    author: 'Sarp' as const
  },
  {
    id: "yeni-yilda-finanscilarin-10-ai-araci",
    title: "Yeni Yılda Finançıların Kullanması Gereken 10 AI Aracı",
    excerpt: "2026'da finançıların işlerini kolaylaştıracak 10 yapay zeka aracı. ChatGPT, Gemini, Claude ve daha fazlası.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-2-800w_34874b5b.webp",
    date: "13 Şubat 2026",
    readTime: "10",
    tags: ["AI", "Araçlar"],
    author: 'Vera' as const
  },
  {
    id: "excelde-ai-devrimi-finanscilar-icin-rehber",
    title: "Excel'de AI Devrimi: Finançılar İçin Yapay Zeka Kullanma Rehberi",
    excerpt: "Excel'de yapay zeka nasıl kullanılır? Finançılar için AI destekli Excel formülleri ve otomasyon rehberi.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-3-800w_929fe132.webp",
    date: "13 Şubat 2026",
    readTime: "7",
    tags: ["Excel", "AI"],
    author: 'Sarp' as const
  },
  {
    id: "altin-abd-reel-faizleri",
    title: "Altın'ın En Büyük Düşmanı ve Dostu: ABD Reel Faizleri",
    excerpt: "Altın fiyatlarını etkileyen en önemli faktör: ABD reel faizleri. Makro analiz ve yatırım stratejileri.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-2-800w_34874b5b.webp",
    date: "25 Ocak 2025",
    readTime: "7",
    tags: ["Altın", "Makro Analiz"],
    author: 'Vera' as const
  },
  {
    id: "finansal-ozgurluk-gizli-raporlar",
    title: "Finansal Özgürlük İçin Okumanız Gereken 3 Gizli Rapor",
    excerpt: "Finansal özgürlüğe giden yolda okumanız gereken 3 gizli rapor. Araştırma ve strateji önerileri.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-1-800w_9b90dab8.webp",
    date: "22 Ocak 2025",
    readTime: "6",
    tags: ["Araştırma", "Strateji"],
    author: 'Sarp' as const
  },
  {
    id: "manuel-takip-7-isaret",
    title: "Manuel Takibi Bırakmanız Gerektiğini Gösteren 7 İşaret",
    excerpt: "Manuel takibi bırakmanız gerektiğini gösteren 7 işaret. Otomasyon ve verimlilik artırma yöntemleri.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-3-800w_929fe132.webp",
    date: "20 Ocak 2025",
    readTime: "5",
    tags: ["Otomasyon", "Verimlilik"],
    author: 'Vera' as const
  },
  {
    id: "finansal-okuryazarlik-neden-onemli",
    title: "Finansal Okuryazarlık Neden Önemli?",
    excerpt: "Finansal okuryazarlık neden önemli? Eğitim ve temel bilgiler rehberi.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-1-800w_9b90dab8.webp",
    date: "15 Ocak 2025",
    readTime: "6",
    tags: ["Eğitim", "Temel Bilgiler"],
    author: 'Sarp' as const
  },
  {
    id: "yatirim-stratejileri-temel-analiz",
    title: "Yatırım Stratejileri: Temel Analiz Rehberi",
    excerpt: "Yatırım stratejileri ve temel analiz yöntemleri. Hisse senedi ve borsa analizi.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-3-800w_929fe132.webp",
    date: "12 Ocak 2025",
    readTime: "8",
    tags: ["Yatırım", "Temel Analiz"],
    author: 'Vera' as const
  },
  {
    id: "teknik-analiz-gostergeleri-rehberi",
    title: "Teknik Analiz Göstergeleri Rehberi",
    excerpt: "Teknik analiz göstergeleri ve kullanım rehberi. RSI, MACD, Bollinger Bantları ve daha fazlası.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-1-800w_9b90dab8.webp",
    date: "10 Ocak 2025",
    readTime: "9",
    tags: ["Teknik Analiz", "Göstergeler"],
    author: 'Sarp' as const
  },
  {
    id: "portfoy-yonetimi-ipuclari",
    title: "Portföy Yönetimi İpuçları",
    excerpt: "Portföy yönetimi ipuçları ve risk yönetimi stratejileri. Diversifikasyon ve varlık dağılımı.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-2-800w_34874b5b.webp",
    date: "8 Ocak 2025",
    readTime: "7",
    tags: ["Portföy", "Risk Yönetimi"],
    author: 'Vera' as const
  },
  {
    id: "kripto-para-blockchain-temelleri",
    title: "Kripto Para ve Blockchain Temelleri",
    excerpt: "Kripto para ve blockchain teknolojisi temelleri. Bitcoin, Ethereum ve altcoin rehberi.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-2-800w_34874b5b.webp",
    date: "5 Ocak 2025",
    readTime: "10",
    tags: ["Kripto", "Blockchain"],
    author: 'Sarp' as const
  }
];

// Category type for horizontal scroll filter
interface CategoryItem {
  slug: string;
  name: string;
  count: number;
}

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Build categories list
  const categories = useMemo<CategoryItem[]>(() => {
    const counts: Record<string, number> = {};
    blogPosts.forEach(post => {
      post.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    const cats: CategoryItem[] = [
      { slug: "all", name: "Tümü", count: blogPosts.length },
      ...Object.entries(counts)
        .sort((a, b) => a[0].localeCompare(b[0], "tr"))
        .map(([name, count]) => ({ slug: name, name, count })),
    ];
    return cats;
  }, []);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = activeCategory === "all"
      ? blogPosts
      : blogPosts.filter(post => post.tags.includes(activeCategory));

    if (sortOrder === "oldest") {
      posts = [...posts].reverse();
    }
    return posts;
  }, [activeCategory, sortOrder]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Blog & Analizler | Borsa, AI ve Otomasyon Rehberi | Finans Kodu</title>
        <meta name="description" content="Finans profesyonelleri için kapsamlı blog: BIST ve küresel borsa analizleri, yapay zeka araçları, Excel otomasyonu ve algoritmik ticaret stratejileri. Uzman yazarlar Sarp ve Vera'dan haftalık içerikler." />
        <meta name="keywords" content="finans blog, borsa analizi, yatırım rehberi, yapay zeka finans, Excel otomasyon, algoritmik ticaret, BIST" />
        <link rel="canonical" href="https://finanskodu.com/blog" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog & Analizler | Borsa, AI ve Otomasyon Rehberi | Finans Kodu" />
        <meta property="og:description" content="Finans profesyonelleri için kapsamlı blog: BIST analizleri, yapay zeka araçları ve algoritmik ticaret stratejileri." />
        <meta property="og:url" content="https://finanskodu.com/blog" />
        <meta property="og:site_name" content="Finans Kodu" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog & Analizler | Borsa, AI ve Otomasyon Rehberi | Finans Kodu" />
        <meta name="twitter:description" content="Finans profesyonelleri için kapsamlı blog: BIST analizleri, yapay zeka araçları ve algoritmik ticaret stratejileri." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://finanskodu.com/blog" }
          ]
        })}</script>
      </Helmet>

      <main className="container mx-auto px-4 py-8">
        {/* ── Yönerge 1: Güçlendirilmiş sayfa header'ı ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 pb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-5"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.18)',
              color: 'var(--fk-cyan, #00D4FF)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            // İÇGÖRÜLER
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Blog &amp; <span className="text-cyan-400">Analizler</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Algoritmik finans, yapay zeka ve verimlilik stratejileri hakkında derinlemesine içerikler
          </p>
        </motion.div>

        {/* ── Yönerge 2: Yatay scroll kategori filtreleri ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mb-8"
        >
          {/* Sol fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          {/* Sağ fade */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            className="flex gap-2 overflow-x-auto pb-2 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => {
                  setActiveCategory(cat.slug);
                  trackCategoryFilter(cat.name);
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide transition-all whitespace-nowrap ${
                  activeCategory === cat.slug
                    ? 'bg-cyan-400 text-background border border-cyan-400'
                    : 'bg-transparent text-muted-foreground border border-border hover:border-cyan-500/40 hover:text-cyan-400'
                }`}
              >
                {cat.name} <span className="opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Yönerge 6: Post sayısı ve sıralama ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-sm text-muted-foreground font-mono">
            <span className="text-foreground font-semibold">{filteredPosts.length}</span> içerik bulundu
          </p>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as "newest" | "oldest")}
            className="text-xs font-mono bg-card border border-border rounded-lg px-3 py-1.5 text-muted-foreground"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
          </select>
        </motion.div>

        {/* ── Yönerge 3: Blog kart grid'i — items-start ile yükseklik tutarsızlığı giderildi ── */}
        <motion.div
          key={activeCategory + sortOrder}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              /* ── Yönerge 4: bg-card (tema uyumlu), hover efektleri ── */
              className="group flex flex-col rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1"
              style={{ background: 'var(--card)' }}
            >
              {/* Görsel — 16/9 aspect ratio */}
              <a
                href={`/blog/${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden aspect-[16/9]"
              >
                <LazyImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Kategori badge — görsel üstünde */}
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  {post.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md text-[10px] font-mono font-semibold backdrop-blur-sm"
                      style={{
                        background: 'rgba(0,212,255,0.15)',
                        border: '1px solid rgba(0,212,255,0.25)',
                        color: '#00D4FF',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>

              {/* İçerik */}
              <div className="flex flex-col flex-1 p-5">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {post.date}
                  </span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {post.readTime} dk
                  </span>
                </div>

                {/* Başlık */}
                <h2
                  className="text-base font-bold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed flex-1 mb-4">
                  {post.excerpt}
                </p>

                {/* Footer — Devamını Oku */}
                <a
                  href={`/blog/${post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:gap-3 transition-all duration-200 mt-auto"
                >
                  Devamını Oku
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}

          {/* ── Yönerge 5: Boş durum ── */}
          {filteredPosts.length === 0 && (
            <div className="col-span-3 text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-muted-foreground font-mono text-sm">Bu kategoride henüz içerik yok.</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 text-xs text-cyan-400 font-mono hover:underline"
              >
                Tümünü göster →
              </button>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
