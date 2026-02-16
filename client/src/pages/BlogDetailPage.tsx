/*
  BLOG DETAIL PAGE: Individual blog post page
  
  - Displays full blog content
  - Uses slug from URL to find blog post
  - SEO meta tags with react-helmet-async
  - Back to blog list link
*/

import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { blogContents } from "@/data/blogContent";
import { Streamdown } from "streamdown";

// Import blog metadata from BlogSection
const blogPosts = [
  {
    id: "finans-raporu-otomasyonu",
    title: "Finans Raporu Otomasyonu: Veri Girişinden Stratejik Liderliğe Geçiş",
    excerpt: "Finans raporlarını otomatikleştirerek veri girişinden stratejik liderliğe nasıl geçiş yapabilirsiniz? CFO'lar için otomasyon rehberi.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "13 Şubat 2026",
    readTime: "8 dk",
    tags: ["Otomasyon", "CFO"],
    author: 'Sarp' as const
  },
  {
    id: "yeni-yilda-finanscilarin-10-ai-araci",
    title: "Yeni Yılda Finançıların Kullanması Gereken 10 AI Aracı",
    excerpt: "2026'da finançıların işlerini kolaylaştıracak 10 yapay zeka aracı. ChatGPT, Gemini, Claude ve daha fazlası.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
    date: "13 Şubat 2026",
    readTime: "10 dk",
    tags: ["AI", "Araçlar"],
    author: 'Vera' as const
  },
  {
    id: "excelde-ai-devrimi-finanscilar-icin-rehber",
    title: "Excel'de AI Devrimi: Finançılar İçin Yapay Zeka Kullanma Rehberi",
    excerpt: "Excel'de yapay zeka nasıl kullanılır? Finançılar için AI destekli Excel formülleri ve otomasyon rehberi.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/FkKeQxdluHuLVcpf.jpg",
    date: "13 Şubat 2026",
    readTime: "7 dk",
    tags: ["Excel", "AI"],
    author: 'Sarp' as const
  },
  {
    id: "altin-abd-reel-faizleri",
    title: "Altın'ın En Büyük Düşmanı ve Dostu: ABD Reel Faizleri",
    excerpt: "Altın fiyatlarını etkileyen en önemli faktör: ABD reel faizleri. Makro analiz ve yatırım stratejileri.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
    date: "25 Ocak 2025",
    readTime: "7 dk",
    tags: ["Altın", "Makro Analiz"],
    author: 'Vera' as const
  },
  {
    id: "finansal-ozgurluk-gizli-raporlar",
    title: "Finansal Özgürlük İçin Okumanız Gereken 3 Gizli Rapor",
    excerpt: "Finansal özgürlüğe giden yolda okumanız gereken 3 gizli rapor. Araştırma ve strateji önerileri.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "22 Ocak 2025",
    readTime: "6 dk",
    tags: ["Araştırma", "Strateji"],
    author: 'Sarp' as const
  },
  {
    id: "manuel-takip-7-isaret",
    title: "Manuel Takibi Bırakmanız Gerektiğini Gösteren 7 İşaret",
    excerpt: "Manuel takibi bırakmanız gerektiğini gösteren 7 işaret. Otomasyon ve verimlilik artırma yöntemleri.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/FkKeQxdluHuLVcpf.jpg",
    date: "20 Ocak 2025",
    readTime: "5 dk",
    tags: ["Otomasyon", "Verimlilik"],
    author: 'Vera' as const
  },
  {
    id: "finansal-okuryazarlik-neden-onemli",
    title: "Finansal Okuryazarlık Neden Önemli?",
    excerpt: "Finansal okuryazarlık neden önemli? Eğitim ve temel bilgiler rehberi.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "15 Ocak 2025",
    readTime: "6 dk",
    tags: ["Eğitim", "Temel Bilgiler"],
    author: 'Sarp' as const
  },
  {
    id: "yatirim-stratejileri-temel-analiz",
    title: "Yatırım Stratejileri: Temel Analiz Rehberi",
    excerpt: "Yatırım stratejileri ve temel analiz yöntemleri. Hisse senedi ve borsa analizi.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/FkKeQxdluHuLVcpf.jpg",
    date: "12 Ocak 2025",
    readTime: "8 dk",
    tags: ["Yatırım", "Temel Analiz"],
    author: 'Vera' as const
  },
  {
    id: "teknik-analiz-gostergeleri-rehberi",
    title: "Teknik Analiz Göstergeleri Rehberi",
    excerpt: "Teknik analiz göstergeleri ve kullanım rehberi. RSI, MACD, Bollinger Bantları ve daha fazlası.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "10 Ocak 2025",
    readTime: "9 dk",
    tags: ["Teknik Analiz", "Göstergeler"],
    author: 'Sarp' as const
  },
  {
    id: "portfoy-yonetimi-ipuclari",
    title: "Portföy Yönetimi İpuçları",
    excerpt: "Portföy yönetimi ipuçları ve risk yönetimi stratejileri. Diversifikasyon ve varlık dağılımı.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
    date: "8 Ocak 2025",
    readTime: "7 dk",
    tags: ["Portföy", "Risk Yönetimi"],
    author: 'Vera' as const
  },
  {
    id: "kripto-para-blockchain-temelleri",
    title: "Kripto Para ve Blockchain Temelleri",
    excerpt: "Kripto para ve blockchain teknolojisi temelleri. Bitcoin, Ethereum ve altcoin rehberi.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
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

  if (!post || !blogContent) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Helmet>
          <title>Blog yazısı bulunamadı - Finans Kodu</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Navigation />
        <main className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold mb-4">Blog yazısı bulunamadı</h1>
          <Link href="/">
            <a className="text-primary hover:underline">Anasayfaya dön</a>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Generate meta description (first 160 characters of content or excerpt)
  const metaDescription = post.excerpt || blogContent.content.substring(0, 160).replace(/[#*\n]/g, ' ').trim() + '...';
  const canonicalUrl = `https://finanskodu.com/blog/${slug}`;
  const publishedDate = new Date(post.date).toISOString();

  // Schema.org Article structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": metaDescription,
    "image": post.image,
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Finans Kodu",
      "logo": {
        "@type": "ImageObject",
        "url": "https://finanskodu.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
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
      </Helmet>

      <Navigation />

      <main className="container mx-auto px-4 py-24 max-w-4xl">
        {/* Back Link */}
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Blog listesine dön
          </a>
        </Link>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
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
          className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8 pb-8 border-b border-gray-800"
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
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
            prose-ul:text-gray-300
            prose-ol:text-gray-300
            prose-li:text-gray-300
            prose-blockquote:border-l-primary prose-blockquote:text-gray-400
          "
        >
          <Streamdown>{blogContent.content}</Streamdown>
        </motion.article>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-800"
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
      </main>

      <Footer />
    </div>
  );
}
