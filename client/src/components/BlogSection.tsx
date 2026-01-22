/**
 * BlogSection Component
 * 
 * Design Philosophy: Cyber Finance
 * - Dark theme with electric cyan accents
 * - Neon glow effects on hover
 * - Geometric patterns inspired by the labyrinth logo
 * - Premium, sophisticated typography
 * - 3 blog posts with full content
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
    id: "excel-den-algoritmik-finansa",
    title: "Excel'den Algoritmik Finansa Geçiş: Manuel Hataları Sıfırlama Rehberi",
    excerpt: "Finansal piyasaların hızı nanosaniyelerle ölçülürken, yatırım kararlarınızı hala statik Excel tablolarına mı emanet ediyorsunuz?",
    content: `**Giriş:** Finansal piyasaların hızı nanosaniyelerle ölçülürken, yatırım kararlarınızı hala statik Excel tablolarına mı emanet ediyorsunuz? Excel, finans dünyasının alfabesidir, ancak romanı yazmak için artık yetersizdir. "Fat Finger" (hatalı tuşlama) riskinden, formül kaymalarına kadar manuel takibin gizli maliyetlerini ve algoritmik sistemlere geçişin yol haritasını inceliyoruz.

**Excel Nerede Tıkanıyor?**

Yatırımcıların %80'i stratejilerini Excel üzerinde kurgular. Ancak piyasa dinamiktir, Excel ise statiktir.

• **Veri Gecikmesi:** Siz veriyi çekip formülü güncelleyene kadar fırsat kaçar.
• **İnsan Hatası:** Bir hücredeki yanlış referans, tüm portföy yönetiminizi çökertebilir.
• **Duygusal Müdahale:** Excel size "SAT" dese bile, o hücreyi silip "BEKLE" yazmak çok kolaydır. Algoritma ise acımasızdır ve disiplinlidir.

**Neden Algoritmik Finansa Geçmelisiniz?**

Algoritmik finans, kod yazmaktan ibaret değildir; bir disiplin inşasıdır.

1. **Backtest Gücü:** Stratejinizin son 10 yılda, kriz anlarında nasıl davrandığını saniyeler içinde simüle edebilirsiniz.
2. **Hız ve Kesinlik:** Duygulara yer yoktur. Şartlar oluştuğunda sistem tetiği çeker.
3. **7/24 İzleme:** Siz uyurken veya toplantıdayken sisteminiz nöbettedir.

**Nasıl Başlanır?**

Python veya basit "No-Code" algoritmik platformlar, Excel mantığını bir üst seviyeye taşır. "EĞER" (IF) formüllerinizi, "Emir Gönder" komutlarına dönüştürmek sandığınızdan daha kolaydır. Finans Kodu olarak, bu dijital dönüşümde karmaşık kodlar yerine, uygulanabilir sistemler kurmanıza rehberlik ediyoruz.

**Sonuç:** Excel bir hesap makinesidir, Algoritma ise bir pilottur. Kokpite geçme zamanınız geldi.`,
    image: "/images/blog-excel-escape.jpg",
    author: "Finans Kodu Ekibi",
    date: "15 Ocak 2025",
    readTime: "5 dk",
    tags: ["Algoritmik Finans", "Excel", "Otomasyon", "Python"]
  },
  {
    id: "whatsapp-tuyolari-vs-veri",
    title: "Whatsapp Tüyoları vs. Veri İstihbaratı: Kararınızı Neye Göre Vermelisiniz?",
    excerpt: "Telefonunuza gelen 'Bu hisse uçacak' mesajı bir fırsat mı, yoksa bir tuzak mı?",
    content: `**Giriş:** Telefonunuza gelen "Bu hisse uçacak" mesajı bir fırsat mı, yoksa bir tuzak mı? Finans dünyasında bilgi ikiye ayrılır: Manipülasyona açık "Tüyo" ve matematiksel gerçekliğe dayalı "Veri İstihbaratı". Neden tüyoların sizi batıracağını, verinin ise nasıl özgürleştireceğini anlatıyoruz.

**Tüyo Ekonomisi Nasıl Çalışır?**

Ücretsiz peynir sadece fare kapanında olur. Whatsapp ve Telegram gruplarında yayılan tüyolar, genellikle "Pump and Dump" (Şişir ve Boşalt) stratejisinin bir parçasıdır. Siz "içeriden bilgi" aldığınızı sanırken, aslında malı size satmak isteyenlerin likiditesi olursunuz.

• **Kaynak Belirsizdir:** "Bir abim söyledi" finansal bir argüman değildir.
• **Zamanlama Yanlıştır:** Haber size ulaştığında, akıllı para (Smart Money) pozisyonunu çoktan kapatmıştır.

**Veri İstihbaratı (Data Intelligence) Nedir?**

Finans Kodu yaklaşımında biz "söylentiye" değil, "ayak izlerine" bakarız.

• **Takas Analizi:** Malı kim topluyor?
• **Bilanço Kalitesi:** Şirket gerçekten kar ediyor mu?
• **Teknik Göstergeler:** Fiyat, hacimle destekleniyor mu?

**Tüyo Bağımlılığından Kurtulma Reçetesi**

Yatırımcı olmak, başkasının aklıyla hareket etmemektir. Kendi "Filtreleme Sisteminizi" kurmalısınız. Bir hisseyi alırken referansınız "Whatsapp Grubu" değil, "Yatırım Stratejisi Belgeniz" olmalı.

**Sonuç:** Tüyo kumarbazlar içindir, Veri İstihbaratı ise servetini korumak ve büyütmek isteyen mühendis ruhlu yatırımcılar içindir. Seçim sizin.`,
    image: "/images/solution-section-bg.jpg",
    author: "Finans Kodu Ekibi",
    date: "10 Ocak 2025",
    readTime: "4 dk",
    tags: ["Veri İstihbaratı", "Yatırım", "Manipülasyon", "Strateji"]
  },
  {
    id: "otomatik-strateji-takip",
    title: "Zamanı Olmayan Yatırımcılar İçin Otomatik Strateji Takip Sistemleri",
    excerpt: "Toplantıdasınız, ameliyattasınız veya uçaktasınız... Tam o anda piyasa çöktü veya beklediğiniz fırsat geldi.",
    content: `**Giriş:** Toplantıdasınız, ameliyattasınız veya uçaktasınız... Tam o anda piyasa çöktü veya beklediğiniz fırsat geldi. Ekran başında olmadığınız için kaybettiğiniz fırsatların maliyetini hiç hesapladınız mı? Modern yatırımcı için "Zaman", paradan daha değerli bir sermayedir. İşte ekran bağımlılığını bitiren otomatik takip sistemleri.

**FOMO ve Stres**

Beyaz yakalı yatırımcının en büyük düşmanı ekran başında geçiremediği zamandır. Sürekli telefona bakarak çalışmak, hem kariyerinize hem de portföyünüze zarar verir.

• **Kararsızlık:** Sınırlı zamanda hızlı karar vermeye çalışmak hata yaptırır.
• **Psikolojik Yıpranma:** Piyasayı sürekli izlemek (Screen Time) stres seviyenizi artırır.

**Otomatik Takip Sistemi Nedir?**

Yapay zeka ve algoritmaların devreye girdiği yer burasıdır. Siz stratejinizi bir kez kurarsınız, sistem sizin adınıza 7/24 piyasayı tarar.

• **Fiyat Alarmları:** "X hissesi, 50 günlük ortalamasını yukarı keserse bana haber ver."
• **Koşullu Emirler:** "Zarar %2'ye ulaşırsa otomatik sat, bana sorma."
• **Trend Takibi:** Yükseliş trendi bittiğinde sizi uyarır.

**Finans Kodu Çözümü: Kaos İçinde Düzen**

Bizim sunduğumuz dijital ürünler ve sistemler, sizin yerinize piyasanın "gürültüsünü" izler. Size sadece nihai kararı vermek veya sistemi onaylamak kalır. Bu sayede ana işinize odaklanırken, birikimleriniz enflasyona karşı profesyonelce korunur.

**Sonuç:** Hayat, ekran başında mum çubuklarını izlemek için çok kısa. Sisteminizi kurun, arkanıza yaslanın ve bırakın algoritmalar sizin için çalışsın.`,
    image: "/images/problem-section-bg.jpg",
    author: "Finans Kodu Ekibi",
    date: "5 Ocak 2025",
    readTime: "4 dk",
    tags: ["Otomasyon", "Yapay Zeka", "Zaman Yönetimi", "Algoritmik"]
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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
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
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // BLOG
          </span>
          <h2 
            id="blog-heading"
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6"
          >
            Finans <span className="gradient-text">İçgörüleri</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Algoritmik finans, yapay zeka ve verimlilik stratejileri hakkında derinlemesine analizler
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative glass-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500"
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium rounded-full border border-primary/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
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
                <h3 
                  className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2"
                >
                  {post.title}
                </h3>

                {/* Excerpt or Full Content */}
                <div className="text-muted-foreground text-sm leading-relaxed">
                  {expandedPost === post.id ? (
                    <div className="space-y-3">
                      {post.content.split('\n\n').map((paragraph, idx) => (
                        <p 
                          key={idx}
                          className="text-muted-foreground"
                          dangerouslySetInnerHTML={{
                            __html: paragraph
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
                              .replace(/•/g, '<span class="text-primary">•</span>')
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="line-clamp-3">{post.excerpt}</p>
                  )}
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => togglePost(post.id)}
                  className="mt-4 inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary/80 transition-colors duration-300 group/btn"
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
              <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
