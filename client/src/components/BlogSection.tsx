/**
 * BlogSection Component - CAROUSEL FORMAT
 * 
 * Strategy: pasted_content_14.txt - TASK 7
 * - "Blog & Analizler" başlıklı yeni section
 * - 5 blog kartı swipeable carousel formatında
 * - Hikie.space forum linkleri
 */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  link: string;
  tags: string[];
  author: 'Sarp' | 'Vera';
}

// 11 Blog Posts - Updated with FAZ 3 new content
const blogPosts: BlogPost[] = [
  // FAZ 3: NEW BLOG 1 - Finans Raporu Otomasyonu
  {
    id: "finans-raporu-otomasyonu",
    title: "Finans Raporu Otomasyonu: Veri Girişinden Stratejik Liderliğe Geçiş",
    excerpt: "Manuel veri girişinden kurtulun. Finans raporu otomasyonu ile bilançoları saniyeler içinde analiz edin, hataları sıfıra indirin ve stratejik kararlara odaklanın.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "13 Şubat 2026",
    readTime: "8 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Otomasyon", "CFO"],
    author: 'Sarp'
  },
  // FAZ 3: NEW BLOG 2 - 10 AI Aracı
  {
    id: "yeni-yilda-finanscilarin-10-ai-araci",
    title: "Yeni Yılda Finançıların Kullanması Gereken 10 AI Aracı",
    excerpt: "Yapay zeka, finans dünyasını yeniden yazıyor. Veri analizi, risk yönetimi ve raporlama süreçlerinizi dönüştürecek 10 AI aracını keşfedin.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
    date: "13 Şubat 2026",
    readTime: "10 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["AI", "Araçlar"],
    author: 'Vera'
  },
  // FAZ 3: NEW BLOG 3 - Excel'de AI Devrimi
  {
    id: "excelde-ai-devrimi-finanscilar-icin-rehber",
    title: "Excel'de AI Devrimi: Finançılar İçin Yapay Zeka Kullanma Rehberi",
    excerpt: "Excel artık sadece tablo değil. Yapay zeka entegrasyonlarıyla finansal analizlerinizi otomatikleştirin, tahmin modellerinizi güçlendirin.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/FkKeQxdluHuLVcpf.jpg",
    date: "13 Şubat 2026",
    readTime: "7 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Excel", "AI"],
    author: 'Sarp'
  },
  // NEW: Altın ve ABD Reel Faizleri
  {
    id: "altin-abd-reel-faizleri",
    title: "Altın'ın En Büyük Düşmanı ve Dostu: ABD Reel Faizleri",
    excerpt: "Altın faizsiz bir varlıktır. Reel faizler yükseldığinde nefesi kesilir. DXY ile ters korelasyonu ve Merkez Bankalarının sessiz alımlarını analiz ediyoruz.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
    date: "25 Ocak 2025",
    readTime: "7 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Altın", "Makro Analiz"],
    author: 'Vera'
  },
  // NEW: Gizli Raporlar
  {
    id: "finansal-ozgurluk-gizli-raporlar",
    title: "Finansal Özgürlük İçin Okumanız Gereken 3 Gizli Rapor",
    excerpt: "Herkesin bildiği haberler fiyatlanmıştır. Gerçek fırsatlar Fed Dot Plot grafiklerinde, 13F dosyalarında ve Faaliyet Raporlarının risk bölümlerinde gizlidir.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "22 Ocak 2025",
    readTime: "6 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Araştırma", "Strateji"],
    author: 'Sarp'
  },
  // NEW: Manuel Takip 7 İşaret
  {
    id: "manuel-takip-7-isaret",
    title: "Manuel Takibi Bırakmanız Gerektiğini Gösteren 7 İşaret",
    excerpt: "Ekran bağımlılığı, analiz felci ve 'kârdaydım zarar ettim' pişmanlığı... Yatırımcılığınızı 'Debug' etmenin ve otomasyona geçmenin vakti geldi.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/FkKeQxdluHuLVcpf.jpg",
    date: "20 Ocak 2025",
    readTime: "5 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Otomasyon", "Psikoloji"],
    author: 'Vera'
  },
  {
    id: "excel-den-algoritmik-finansa",
    title: "Excel'den Algoritmik Finansa Geçiş",
    excerpt: "Manuel hataları sıfırlama rehberi. Finansal piyasaların hızı nanosaniyelerle ölçülürken, yatırım kararlarınızı hala statik Excel tablolarına mı emanet ediyorsunuz?",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "15 Ocak 2025",
    readTime: "5 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Algoritmik Finans", "Excel"],
    author: 'Sarp'
  },
  {
    id: "whatsapp-tuyolari-vs-veri",
    title: "Whatsapp Tüyoları vs. Veri İstihbaratı",
    excerpt: "Telefonunuza gelen 'Bu hisse uçacak' mesajı bir fırsat mı, yoksa bir tuzak mı? Finans dünyasında bilgi ikiye ayrılır.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
    date: "10 Ocak 2025",
    readTime: "4 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Veri İstihbaratı", "Strateji"],
    author: 'Vera'
  },
  {
    id: "otomatik-strateji-takip",
    title: "Otomatik Strateji Takip Sistemleri",
    excerpt: "Zamanı olmayan yatırımcılar için. Toplantıdasınız, ameliyattasınız veya uçaktasınız... Tam o anda piyasa çöktü.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/FkKeQxdluHuLVcpf.jpg",
    date: "5 Ocak 2025",
    readTime: "4 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Otomasyon", "Yapay Zeka"],
    author: 'Sarp'
  },
  {
    id: "finansal-anayasa",
    title: "Finansal Anayasa Nedir?",
    excerpt: "Kendi yatırım kurallarınızı oluşturun. Duygusal kararlar yerine sistematik yaklaşım ile portföyünüzü koruyun.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/jojKojKpcfLpRHCc.jpg",
    date: "1 Ocak 2025",
    readTime: "6 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["Strateji", "Psikoloji"],
    author: 'Vera'
  },
  {
    id: "ai-finans-devrimi",
    title: "AI ile Finans Devrimi",
    excerpt: "Yapay zeka finansal kararlarınızı nasıl dönüştürüyor? Prompt mühendisliği ile yatırım analizlerinizi güçlendirin.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/dLfzwcekwqlakvAq.jpg",
    date: "28 Aralık 2024",
    readTime: "5 dk",
    link: "https://www.hikie.space/finanskodu/forum/a8adebd8f9ef4c3b8051a425eb18481a",
    tags: ["AI", "Prompt"],
    author: 'Sarp'
  }
];

export default function BlogSection() {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section
      id="blog"
      className="relative py-24 overflow-hidden"
      aria-labelledby="blog-heading"
    >
      {/* BreadcrumbList Schema for Blog Section */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://finanskodu.com/#blog"}
          ]
        })}
      </script>
      
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ background: "#050810" }}
      />

      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[0.15em] mb-3 block" style={{ color: '#0EA5E9' }}>
            // İÇGÖRÜLER
          </span>
          <h2 
            id="blog-heading"
            className="font-display font-bold text-3xl sm:text-4xl mb-4"
            style={{ color: '#F0F4F8' }}
          >
            Blog & <span style={{ color: '#10B981' }}>Analizler</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: '#8899AA' }}>
            Algoritmik finans, yapay zeka ve verimlilik stratejileri hakkında derinlemesine içerikler
          </p>
        </motion.header>

        {/* Carousel Navigation Buttons (Desktop) */}
        <div className="hidden md:flex items-center justify-end gap-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full border-gray-700 hover:border-primary hover:text-primary disabled:opacity-30 bg-transparent"
            aria-label="Önceki yazılar"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full border-gray-700 hover:border-primary hover:text-primary disabled:opacity-30 bg-transparent"
            aria-label="Sonraki yazılar"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div className="relative">
          {/* Gradient Fade Left */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none hidden md:block"
            style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }}
          />
          
          {/* Gradient Fade Right */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none hidden md:block"
            style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }}
          />

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="group flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
              >
                {/* Author Person Schema */}
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": `${post.author} (Finans Kodu)`,
                    "jobTitle": post.author === 'Sarp' 
                      ? "Head of Data & Algorithmic Strategy" 
                      : "Macro Strategist & Behavioral Finance Expert",
                    "sameAs": [
                      post.author === 'Sarp'
                        ? "https://www.linkedin.com/in/sarp-finanskodu-placeholder"
                        : "https://www.linkedin.com/in/vera-finanskodu-placeholder"
                    ]
                  })}
                </script>
                <div 
                  className="h-full rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:translate-y-[-2px]"
                  style={{
                    background: '#0D1117',
                    border: '1px solid #1E2D3D',
                  }}
                >
                  {/* Featured Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, #0D1117 100%)' }} />
                    
                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {post.tags.slice(0, 1).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-mono font-medium rounded"
                          style={{ background: '#0EA5E920', color: '#0EA5E9' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs mb-3" style={{ color: '#4A5568' }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold mb-2 line-clamp-2 transition-colors" style={{ color: '#F0F4F8' }}>
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm mb-4 flex-grow line-clamp-3" style={{ color: '#8899AA' }}>
                      {post.excerpt}
                    </p>

                    {/* Read More Link - Opens in New Tab */}
                    <a 
                      href={`/blog/${post.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-sm transition-colors group/btn"
                      style={{ color: '#0EA5E9' }}
                    >
                      <span>Devamını Oku</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center mt-10"
        >
          <a 
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
          >
            Tüm yazıları görüntüle
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
