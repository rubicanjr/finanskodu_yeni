/*
  BLOG DETAIL PAGE: Individual blog post page
  
  - Displays full blog content
  - Uses slug from URL to find blog post
  - SEO meta tags
  - Back to blog list link
*/

import { useParams, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { blogContents } from "@/data/blogContent";

// Import blog metadata from BlogSection
const blogPosts = [
  {
    id: "finans-raporu-otomasyonu",
    title: "Finans Raporu Otomasyonu: Veri Girişinden Stratejik Liderliğe Geçiş",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "13 Şubat 2026",
    readTime: "8 dk",
    tags: ["Otomasyon", "CFO"],
    author: 'Sarp' as const
  },
  {
    id: "yeni-yilda-finanscilarin-10-ai-araci",
    title: "Yeni Yılda Finançıların Kullanması Gereken 10 AI Aracı",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
    date: "13 Şubat 2026",
    readTime: "10 dk",
    tags: ["AI", "Araçlar"],
    author: 'Vera' as const
  },
  {
    id: "excelde-ai-devrimi-finanscilar-icin-rehber",
    title: "Excel'de AI Devrimi: Finançılar İçin Yapay Zeka Kullanma Rehberi",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/FkKeQxdluHuLVcpf.jpg",
    date: "13 Şubat 2026",
    readTime: "7 dk",
    tags: ["Excel", "AI"],
    author: 'Sarp' as const
  },
  {
    id: "altin-abd-reel-faizleri",
    title: "Altın'ın En Büyük Düşmanı ve Dostu: ABD Reel Faizleri",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
    date: "25 Ocak 2025",
    readTime: "7 dk",
    tags: ["Altın", "Makro Analiz"],
    author: 'Vera' as const
  },
  {
    id: "finansal-ozgurluk-gizli-raporlar",
    title: "Finansal Özgürlük İçin Okumanız Gereken 3 Gizli Rapor",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "22 Ocak 2025",
    readTime: "6 dk",
    tags: ["Araştırma", "Strateji"],
    author: 'Sarp' as const
  },
  {
    id: "manuel-takip-7-isaret",
    title: "Manuel Takibi Bırakmanız Gerektiğini Gösteren 7 İşaret",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/FkKeQxdluHuLVcpf.jpg",
    date: "20 Ocak 2025",
    readTime: "5 dk",
    tags: ["Otomasyon", "Verimlilik"],
    author: 'Vera' as const
  },
  {
    id: "finansal-okuryazarlik-neden-onemli",
    title: "Finansal Okuryazarlık Neden Önemli?",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "15 Ocak 2025",
    readTime: "6 dk",
    tags: ["Eğitim", "Temel Bilgiler"],
    author: 'Sarp' as const
  },
  {
    id: "yatirim-stratejileri-temel-analiz",
    title: "Yatırım Stratejileri: Temel Analiz",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
    date: "12 Ocak 2025",
    readTime: "8 dk",
    tags: ["Yatırım", "Analiz"],
    author: 'Vera' as const
  },
  {
    id: "teknik-analiz-gostergeleri-rehberi",
    title: "Teknik Analiz Göstergeleri Rehberi",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/FkKeQxdluHuLVcpf.jpg",
    date: "10 Ocak 2025",
    readTime: "9 dk",
    tags: ["Teknik Analiz", "Borsa"],
    author: 'Sarp' as const
  },
  {
    id: "portfoy-yonetimi-ipuclari",
    title: "Portföy Yönetimi İpuçları",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "8 Ocak 2025",
    readTime: "7 dk",
    tags: ["Portföy", "Risk Yönetimi"],
    author: 'Vera' as const
  },
  {
    id: "kripto-para-blockchain-temelleri",
    title: "Kripto Para ve Blockchain Temelleri",
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

  return (
    <div className="min-h-screen bg-background text-foreground">
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

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="whitespace-pre-wrap">{blogContent.content}</div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
