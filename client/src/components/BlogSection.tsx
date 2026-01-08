/**
 * BlogSection Component
 * 
 * Design Philosophy: Cyber Finance
 * - Dark theme with electric cyan accents
 * - Neon glow effects on hover
 * - Geometric patterns inspired by the labyrinth logo
 * - Premium, sophisticated typography
 */

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "excel-den-kacis",
    title: "Excel'den Kaçış: Finansın Geleceği Neden Kodlarda Gizli?",
    excerpt: "Finans dünyasında yıllardır değişmeyen bir ritüel var: Sabah kahvesi, açılan sonsuz Excel dosyaları, manuel veri girişleri ve \"Acaba formül bozuldu mu?\" gerginliği.",
    content: `Finans dünyasında yıllardır değişmeyen bir ritüel var: Sabah kahvesi, açılan sonsuz Excel dosyaları, manuel veri girişleri ve "Acaba formül bozuldu mu?" gerginliği.

Yıllarca endüstri mühendisliği ve finansal operasyonların merkezinde yer almış biri olarak şunu net bir şekilde gördüm: İnsan zihni, verileri "kopyala-yapıştır" yapmak için değil, strateji üretmek için var. Ancak vaktimizin %80'ini operasyona, sadece %20'sini analize harcıyoruz.

**Finans Kodu Neden Var?**

Bu platform, finansal özgürlüğü sadece "para kazanmak" olarak değil, "zaman kazanmak" olarak görenler için kuruldu.

Burada şunları konuşacağız:

• **Otomasyon:** Tekrarlayan işleri Python ve No-Code araçlarına devretmek.

• **Yapay Zeka:** Finansal analizlerde AI asistanlarını (ChatGPT, Claude, Gemini) birer stajyer gibi kullanmak.

• **Verimlilik:** Karmaşık tabloları basit dashboardlara dönüştürmek.

Finansın geleceği artık sadece rakamları bilenlerin değil, o rakamları kodlarla yönetebilenlerin olacak.

Bu yolculukta kemerlerinizi bağlayın. Excel'i kapatıp, terminali açma vakti geldi.`,
    image: "/images/blog-excel-escape.jpg",
    author: "Finans Kodu Ekibi",
    date: "8 Ocak 2026",
    readTime: "4 dk",
    tags: ["Otomasyon", "Yapay Zeka", "Verimlilik", "Excel"]
  }
];

export default function BlogSection() {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const togglePost = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <section
      id="blog"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="blog-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]" />
      
      {/* Geometric Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4ff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan-400 font-mono text-sm tracking-wider mb-4">
            // BLOG
          </span>
          <h2 
            id="blog-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Finans & Teknoloji <span className="text-cyan-400">Yazıları</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Finansal operasyonlarınızı dönüştürecek içgörüler, ipuçları ve stratejiler
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-[#0d1f35]/80 to-[#0a1628]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500"
            >
              {/* Featured Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/50 to-transparent" />
                
                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-cyan-500/20 backdrop-blur-sm text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} okuma</span>
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {post.title}
                </h3>

                {/* Excerpt or Full Content */}
                <div className="text-gray-300 leading-relaxed">
                  {expandedPost === post.id ? (
                    <div className="space-y-4">
                      {post.content.split('\n\n').map((paragraph, idx) => (
                        <p 
                          key={idx}
                          className="text-gray-300"
                          dangerouslySetInnerHTML={{
                            __html: paragraph
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-400 font-semibold">$1</strong>')
                              .replace(/•/g, '<span class="text-cyan-400">•</span>')
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>{post.excerpt}</p>
                  )}
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => togglePost(post.id)}
                  className="mt-6 inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-300 group/btn"
                  aria-expanded={expandedPost === post.id}
                >
                  <span>{expandedPost === post.id ? "Kapat" : "Devamını Oku"}</span>
                  <ArrowRight 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedPost === post.id ? "rotate-90" : "group-hover/btn:translate-x-1"
                    }`} 
                  />
                </button>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            </motion.article>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Daha fazla içerik için bizi takip edin. Yeni yazılar yakında...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
