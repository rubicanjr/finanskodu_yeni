/*
  RECENT BLOG POSTS COMPONENT
  
  - Displays 3 most recent blog posts on homepage
  - "NEW" badge for posts from last 7 days
  - "View All" button to /blog page
  - Grid layout with hover effects
*/

import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import PictureImage from "@/components/PictureImage";

// Blog posts metadata (sorted by date, newest first)
const blogPosts = [
  {
    id: "finans-raporu-otomasyonu",
    title: "Finans Raporu Otomasyonu: Veri Girişinden Stratejik Liderliğe Geçiş",
    excerpt: "Finans raporlarını otomatikleştirerek veri girişinden stratejik liderliğe nasıl geçiş yapabilirsiniz?",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-1-800w_9b90dab8.webp",
    date: "13 Şubat 2026",
    dateISO: "2026-02-13",
    readTime: "8 dk",
    tags: ["Otomasyon", "CFO"],
    author: 'Sarp' as const
  },
  {
    id: "yeni-yilda-finanscilarin-10-ai-araci",
    title: "Yeni Yılda Finançıların Kullanması Gereken 10 AI Aracı",
    excerpt: "2026'da finançıların işlerini kolaylaştıracak 10 yapay zeka aracı.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-2-800w_34874b5b.webp",
    date: "13 Şubat 2026",
    dateISO: "2026-02-13",
    readTime: "10 dk",
    tags: ["AI", "Araçlar"],
    author: 'Vera' as const
  },
  {
    id: "excelde-ai-devrimi-finanscilar-icin-rehber",
    title: "Excel'de AI Devrimi: Finançılar İçin Yapay Zeka Kullanma Rehberi",
    excerpt: "Excel'de yapay zeka nasıl kullanılır? Finançılar için AI destekli Excel formülleri.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/blog-3-800w_929fe132.webp",
    date: "13 Şubat 2026",
    dateISO: "2026-02-13",
    readTime: "7 dk",
    tags: ["Excel", "AI"],
    author: 'Sarp' as const
  }
];

// Check if post is from last 7 days
function isNew(dateISO: string): boolean {
  const postDate = new Date(dateISO);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}

export default function RecentBlogPosts() {
  return (
    <section className="py-24 bg-gray-900/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Son Blog Yazıları
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Finans, yatırım ve otomasyon dünyasından güncel içerikler
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-gray-900/50 rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Cover Image */}
              <Link href={`/blog/${post.id}`}>
                <a className="block relative overflow-hidden aspect-video">
                  <PictureImage
                    src={post.image}
                    alt={post.title}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* NEW Badge */}
                  {isNew(post.dateISO) && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-black font-bold rounded-full text-sm flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      YENİ
                    </div>
                  )}
                  {/* Author Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-sm">
                    {post.author}
                  </div>
                </a>
              </Link>

              {/* Card Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
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
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </a>
                </Link>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all">
              Tümünü Gör
              <ArrowRight className="w-5 h-5" />
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
