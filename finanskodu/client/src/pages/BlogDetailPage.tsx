/*
  BLOG DETAIL PAGE: Individual blog post page
  
  - Displays full blog content
  - Uses slug from URL to find blog post
  - SEO meta tags with react-helmet-async
  - Back to blog list link
*/

import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { blogContents } from "@/data/blogContent";
import { lazy, Suspense } from "react";
import LazyImage from "@/components/LazyImage";

// Lazy load Streamdown to reduce initial bundle size
const Streamdown = lazy(() => import("streamdown").then(mod => ({ default: mod.Streamdown })));
import { useEffect, useState } from "react";
import { trackBlogView } from "@/lib/analytics";

// Import blog metadata from BlogSection
const blogPosts = [
  {
    id: "finans-raporu-otomasyonu",
    title: "Finans Raporu Otomasyonu: Veri Girişinden Stratejik Liderliğe Geçiş",
    excerpt: "Finans raporlarını otomatikleştirerek veri girişinden stratejik liderliğe nasıl geçiş yapabilirsiniz? CFO'lar için otomasyon rehberi.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-1-800w_9b90dab8.webp",
    date: "13 Şubat 2026",
    readTime: "8 dk",
    tags: ["Otomasyon", "CFO"],
    author: 'Sarp' as const
  },
  {
    id: "yeni-yilda-finanscilarin-10-ai-araci",
    title: "Yeni Yılda Finançıların Kullanması Gereken 10 AI Aracı",
    excerpt: "2026'da finançıların işlerini kolaylaştıracak 10 yapay zeka aracı. ChatGPT, Gemini, Claude ve daha fazlası.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-2-800w_34874b5b.webp",
    date: "13 Şubat 2026",
    readTime: "10 dk",
    tags: ["AI", "Araçlar"],
    author: 'Vera' as const
  },
  {
    id: "excelde-ai-devrimi-finanscilar-icin-rehber",
    title: "Excel'de AI Devrimi: Finançılar İçin Yapay Zeka Kullanma Rehberi",
    excerpt: "Excel'de yapay zeka nasıl kullanılır? Finançılar için AI destekli Excel formülleri ve otomasyon rehberi.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-3-800w_929fe132.webp",
    date: "13 Şubat 2026",
    readTime: "7 dk",
    tags: ["Excel", "AI"],
    author: 'Sarp' as const
  },
  {
    id: "altin-abd-reel-faizleri",
    title: "Altın'ın En Büyük Düşmanı ve Dostu: ABD Reel Faizleri",
    excerpt: "Altın fiyatlarını etkileyen en önemli faktör: ABD reel faizleri. Makro analiz ve yatırım stratejileri.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-2-800w_34874b5b.webp",
    date: "25 Ocak 2025",
    readTime: "7 dk",
    tags: ["Altın", "Makro Analiz"],
    author: 'Vera' as const
  },
  {
    id: "finansal-ozgurluk-gizli-raporlar",
    title: "Finansal Özgürlük İçin Okumanız Gereken 3 Gizli Rapor",
    excerpt: "Finansal özgürlüğe giden yolda okumanız gereken 3 gizli rapor. Araştırma ve strateji önerileri.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-1-800w_9b90dab8.webp",
    date: "22 Ocak 2025",
    readTime: "6 dk",
    tags: ["Araştırma", "Strateji"],
    author: 'Sarp' as const
  },
  {
    id: "manuel-takip-7-isaret",
    title: "Manuel Takibi Bırakmanız Gerektiğini Gösteren 7 İşaret",
    excerpt: "Manuel takibi bırakmanız gerektiğini gösteren 7 işaret. Otomasyon ve verimlilik artırma yöntemleri.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-3-800w_929fe132.webp",
    date: "20 Ocak 2025",
    readTime: "5 dk",
    tags: ["Otomasyon", "Verimlilik"],
    author: 'Vera' as const
  },
  {
    id: "finansal-okuryazarlik-neden-onemli",
    title: "Finansal Okuryazarlık Neden Önemli?",
    excerpt: "Finansal okuryazarlık neden önemli? Eğitim ve temel bilgiler rehberi.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-1-800w_9b90dab8.webp",
    date: "15 Ocak 2025",
    readTime: "6 dk",
    tags: ["Eğitim", "Temel Bilgiler"],
    author: 'Sarp' as const
  },
  {
    id: "yatirim-stratejileri-temel-analiz",
    title: "Yatırım Stratejileri: Temel Analiz Rehberi",
    excerpt: "Yatırım stratejileri ve temel analiz yöntemleri. Hisse senedi ve borsa analizi.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-3-800w_929fe132.webp",
    date: "12 Ocak 2025",
    readTime: "8 dk",
    tags: ["Yatırım", "Temel Analiz"],
    author: 'Vera' as const
  },
  {
    id: "teknik-analiz-gostergeleri-rehberi",
    title: "Teknik Analiz Göstergeleri Rehberi",
    excerpt: "Teknik analiz göstergeleri ve kullanım rehberi. RSI, MACD, Bollinger Bantları ve daha fazlası.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-1-800w_9b90dab8.webp",
    date: "10 Ocak 2025",
    readTime: "9 dk",
    tags: ["Teknik Analiz", "Göstergeler"],
    author: 'Sarp' as const
  },
  {
    id: "portfoy-yonetimi-ipuclari",
    title: "Portföy Yönetimi İpuçları",
    excerpt: "Portföy yönetimi ipuçları ve risk yönetimi stratejileri. Diversifikasyon ve varlık dağılımı.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-2-800w_34874b5b.webp",
    date: "8 Ocak 2025",
    readTime: "7 dk",
    tags: ["Portföy", "Risk Yönetimi"],
    author: 'Vera' as const
  },
  {
    id: "kripto-para-blockchain-temelleri",
    title: "Kripto Para ve Blockchain Temelleri",
    excerpt: "Kripto para ve blockchain teknolojisi temelleri. Bitcoin, Ethereum ve altcoin rehberi.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-2-800w_34874b5b.webp",
    date: "5 Ocak 2025",
    readTime: "10 dk",
    tags: ["Kripto", "Blockchain"],
    author: 'Sarp' as const
  }
];

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find blog post metadata and content
  const post = blogPosts.find(p => p.id === slug);
  const blogContent = blogContents.find(b => b.id === slug);

  // Track blog view
  useEffect(() => {
    if (post) {
      trackBlogView(slug, post.title, post.tags[0]);
    }
  }, [slug, post]);

  // Loading state - give time for data to load
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!post || !blogContent) {
    return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Blog yazısı bulunamadı - Finans Kodu</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Blog yazısı bulunamadı</h1>
            <p className="text-muted-foreground mb-6">Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.</p>
            <a 
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Blog listesine dön
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Generate meta description (first 160 characters of content or excerpt)
  const metaDescription = post.excerpt || blogContent.content.substring(0, 160).replace(/[#*\n]/g, ' ').trim() + '...';
  const canonicalUrl = `https://finanskodu.com/blog/${slug}`;
  
  // Parse Turkish date format safely (e.g., "13 Şubat 2026")
  const parseTurkishDate = (dateStr: string): string => {
    const monthMap: Record<string, string> = {
      'Ocak': '01', 'Şubat': '02', 'Mart': '03', 'Nisan': '04',
      'Mayıs': '05', 'Haziran': '06', 'Temmuz': '07', 'Ağustos': '08',
      'Eylül': '09', 'Ekim': '10', 'Kasım': '11', 'Aralık': '12'
    };
    
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const month = monthMap[parts[1]];
      const year = parts[2];
      if (month) {
        return `${year}-${month}-${day}T12:00:00.000Z`;
      }
    }
    
    // Fallback to current date if parsing fails
    return new Date().toISOString();
  };
  
  const publishedDate = parseTurkishDate(post.date);

  // Schema.org Article structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": metaDescription,
    "image": {
      "@type": "ImageObject",
      "url": post.image,
      "width": 1200,
      "height": 630
    },
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "author": {
      "@type": "Person",
      "name": post.author === 'Sarp' ? 'Sarp' : 'Vera',
      "url": `https://finanskodu.com/blog?author=${post.author.toLowerCase()}`,
      "jobTitle": post.author === 'Sarp' ? 'Finansal Mühendis & Algoritmik Ticaret Uzmanı' : 'Yapay Zeka & Finans Stratejisti'
    },
    "publisher": {
      "@type": "Organization",
      "name": "Finans Kodu",
      "url": "https://finanskodu.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://finanskodu.com/assets/fk-logo-new.webp",
        "width": 512,
        "height": 512
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": post.tags[0] || "Finans",
    "keywords": post.tags.join(", "),
    "inLanguage": "tr-TR",
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://finanskodu.com/blog",
      "name": "Finans Kodu Blog",
      "publisher": { "@id": "https://finanskodu.com/#organization" }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO Meta Tags */}
      <Helmet>
        {/* Title */}
        <title>{post.title} - Finans Kodu</title>
        
        {/* Meta Description */}
        <meta name="description" content={metaDescription} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph (OG) Tags for Social Media */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Finans Kodu" />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:author" content={post.author} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={post.image} />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        {/* BreadcrumbList Schema.org */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://finanskodu.com/blog" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": canonicalUrl }
          ]
        })}</script>
      </Helmet>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Link */}
        <a 
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Blog listesine dön
        </a>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <LazyImage
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 rounded-xl"
            eager={true}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          {post.title}
        </motion.h1>

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm mb-8 pb-8 border-b border-border"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </motion.div>

        {/* Blog Content with Markdown Rendering */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-foreground
            prose-p:text-gray-300
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-code:text-primary prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-border
            prose-ul:text-gray-300
            prose-ol:text-gray-300
            prose-li:text-gray-300
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
          "
        >
          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Streamdown>{blogContent.content}</Streamdown>
          </Suspense>
        </motion.article>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </motion.div>

        {/* E-E-A-T: Yazar Kutusu - GEO ve SEO güven sinyali */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 p-6 border border-border rounded-xl bg-card"
          itemScope
          itemType="https://schema.org/Person"
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Yazar Hakkında</h2>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-lg" itemProp="name">{post.author[0]}</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1" itemProp="name">{post.author}</p>
              <p className="text-xs text-muted-foreground mb-3" itemProp="jobTitle">
                {post.author === 'Sarp' 
                  ? 'Finansal Mühendis & Algoritmik Ticaret Uzmanı | Finans Kodu Kurucu Ortağı'
                  : 'Yapay Zeka & Finans Stratejisti | Finans Kodu Analiz Ekibi'
                }
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed" itemProp="description">
                {post.author === 'Sarp'
                  ? '10+ yıllık finansal mühendislik deneyimiyle algoritmik ticaret stratejileri, risk yönetimi ve Excel otomasyon çözümleri üzerine uzmanlaşmıştır. BIST ve küresel piyasalarda kanıtlanmış metodolojiler geliştirmektedir.'
                  : 'Yapay zeka araçlarının finans sektörüne entegrasyonu, makro analiz ve yatırım stratejileri konularında uzmanlaşmıştır. Finans profesyonellerinin yapay zekayı etkin kullanmasına yardımcı olmaktadır.'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* GEO: Okuyucuya yönlendirme - Siteye bağlılığı artır */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 p-6 border border-primary/20 rounded-xl bg-primary/5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-2">Bu Yazıyı Yararlı Buldunuz mu?</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Finans Kodu'nun haftalık analizlerini, algoritmik sinyallerini ve yapay zeka araç önerilerini doğrudan gelen kutunuza almak için topluluğumuza katılın.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/kod-odasi" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Kod Odası'na Katıl
            </Link>
            <Link href="/blog" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors">
              Diğer Yazıları Gör
            </Link>
          </div>
        </motion.div>

        {/* İç Linkleme: Konuya göre ilgili ürün sayfasına yönlendirme */}
        {(() => {
          const tags = post.tags.map(t => t.toLowerCase());
          const isAIOrExcel = tags.some(t => ['ai', 'yapay zeka', 'excel', 'otomasyon', 'araçlar'].includes(t));
          const isAlgoOrTechAnalysis = tags.some(t => ['teknik analiz', 'algoritmik', 'göstergeler', 'sinyal', 'strateji'].includes(t));
          const isProBulletin = tags.some(t => ['altın', 'makro analiz', 'portföy', 'risk yönetimi', 'kripto', 'blockchain', 'yatırım'].includes(t));

          if (isAIOrExcel) return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 p-5 border border-cyan-500/20 rounded-xl bg-cyan-500/5"
            >
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">İlgili Ürün</p>
              <h3 className="text-base font-semibold text-foreground mb-1">AI Prompt Kütüphanesi: 100+ Finansal Analiz Komutu</h3>
              <p className="text-sm text-muted-foreground mb-3">Bu yazıda bahsedilen yapay zeka araçlarını finans analizinde kullanmak için hazır prompt şablonlarımızı inceleyin.</p>
              <a href="/dijital-araclar/ai-prompt-kutuphanesi" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
                Prompt Kütüphanesini Keşfet →
              </a>
            </motion.div>
          );

          if (isAlgoOrTechAnalysis) return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 p-5 border border-green-500/20 rounded-xl bg-green-500/5"
            >
              <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">İlgili Ürün</p>
              <h3 className="text-base font-semibold text-foreground mb-1">FİNANS KODU: Kaos İçinde Düzen</h3>
              <p className="text-sm text-muted-foreground mb-3">Bu yazıda ele alınan teknik analiz ve algoritmik stratejileri sistematik bir metodoloji ile uygulamak için kapsamlı araç setimizi inceleyin.</p>
              <a href="/dijital-araclar/finans-kodu-kaos-icinde-duzen" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors">
                Sistemi İncele →
              </a>
            </motion.div>
          );

          if (isProBulletin) return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 p-5 border border-amber-500/20 rounded-xl bg-amber-500/5"
            >
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">İlgili Ürün</p>
              <h3 className="text-base font-semibold text-foreground mb-1">Pro - Algoritmik Strateji ve Analiz Bülteni</h3>
              <p className="text-sm text-muted-foreground mb-3">Bu yazıda incelenen makro ve piyasa analizlerini aylık algoritmik strateji bültenimizle takip edin. Altın algoritması, akıllı fon sepetleri ve haftalık sesli brifing.</p>
              <a href="/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium transition-colors">
                Bültene Katıl →
              </a>
            </motion.div>
          );

          return null;
        })()}
      </main>

      <Footer />
    </div>
  );
}
