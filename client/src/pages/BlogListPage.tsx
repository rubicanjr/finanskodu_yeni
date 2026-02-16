/*
  BLOG LIST PAGE: All blog posts listing
  
  - Grid layout with all blog posts
  - Each card: Cover image, Title, Excerpt, Date, "Read More" button
  - SEO meta tags
  - Optional: Pagination (if many posts)
*/

import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Blog posts metadata
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

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Blog - Finans Kodu | Finans ve Yatırım Rehberi</title>
        <meta name="description" content="Finans, yatırım, otomasyon ve yapay zeka konularında güncel blog yazıları. Sarp ve Vera'dan finans dünyasına dair içgörüler." />
        <link rel="canonical" href="https://finanskodu.com/blog" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog - Finans Kodu" />
        <meta property="og:description" content="Finans, yatırım, otomasyon ve yapay zeka konularında güncel blog yazıları." />
        <meta property="og:url" content="https://finanskodu.com/blog" />
        <meta property="og:site_name" content="Finans Kodu" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog - Finans Kodu" />
        <meta name="twitter:description" content="Finans, yatırım, otomasyon ve yapay zeka konularında güncel blog yazıları." />
      </Helmet>

      <Navigation />

      <main className="container mx-auto px-4 py-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Finans, yatırım, otomasyon ve yapay zeka konularında güncel içerikler
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all duration-300"
            >
              {/* Cover Image */}
              <Link href={`/blog/${post.id}`}>
                <a className="block relative overflow-hidden aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Author Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-sm">
                    {post.author}
                  </div>
                </a>
              </Link>

              {/* Card Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.id}`}>
                  <a className="block">
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </a>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <Link href={`/blog/${post.id}`}>
                  <a className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
                    Devamını Oku
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
