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

// Import blog data (same as BlogSection)
// TODO: Move to shared data file
const blogPosts = [
  {
    id: "finans-raporu-otomasyonu",
    title: "Finans Raporu Otomasyonu: Veri Girişinden Stratejik Liderliğe Geçiş",
    excerpt: "Manuel veri girişinden kurtulun. Finans raporu otomasyonu ile bilançoları saniyeler içinde analiz edin, hataları sıfıra indirin ve stratejik kararlara odaklanın.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "13 Şubat 2026",
    readTime: "8 dk",
    tags: ["Otomasyon", "CFO"],
    author: 'Sarp',
    content: `
# Finans Raporu Otomasyonu: Veri Girişinden Stratejik Liderliğe Geçiş

Manuel veri girişi, finansal raporlama süreçlerinin en büyük zaman hırsızıdır. Finans ekipleri, saatlerini Excel tablolarına veri girmek, formülleri kontrol etmek ve hataları düzeltmekle geçiriyor. Bu yazıda, finans raporu otomasyonunun nasıl stratejik liderliğe geçiş sağladığını inceleyeceğiz.

## Manuel Süreçlerin Maliyeti

Ortalama bir finans ekibi, aylık kapanış sürecinde 40-60 saat manuel veri girişi yapıyor. Bu süre, stratejik analizler, tahminleme ve karar destek faaliyetlerinden çalınıyor.

## Otomasyon Çözümleri

Modern finans otomasyon araçları, ERP sistemlerinden otomatik veri çekimi, API entegrasyonları ve AI destekli veri doğrulama sunuyor. Bu araçlar sayesinde:

- **Hata oranı %95 azalıyor**
- **Raporlama süresi %80 kısalıyor**
- **Stratejik analize ayrılan zaman 3 kat artıyor**

## Sonuç

Finans raporu otomasyonu, sadece zaman tasarrufu değil, aynı zamanda stratejik değer yaratma fırsatıdır.
    `
  },
  // Add more blog posts here...
];

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find blog post by slug
  const post = blogPosts.find(p => p.id === slug);

  if (!post) {
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
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
