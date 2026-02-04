/*
  DESIGN: Cyber Finance About Section
  GEO OPTIMIZED: E-E-A-T (Expertise, Experience, Authoritativeness, Trustworthiness)
  
  - Semantic HTML with <section>, <article>
  - Founder name and credentials prominently displayed
  - Schema.org Person markup
  - Sabancı University Industrial Engineering emphasis
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, GraduationCap, Briefcase, Target, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const credentials = [
  {
    icon: GraduationCap,
    title: "Sabancı Üniversitesi",
    description: "Endüstri Mühendisliği mezunları",
  },
  {
    icon: Briefcase,
    title: "Finans Deneyimi",
    description: "Yıllarca kurumsal finans tecrübesi",
  },
  {
    icon: Target,
    title: "Verimlilik Odaklı",
    description: "AI ve no-code araçlarla süreç otomasyonu",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="hakkimda" 
      className="relative py-24 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/SCFgBNYSWaWwaemk.jpg')" }}
        role="img"
        aria-label="Ekip bölümü arka planı"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // EKİP
          </span>
          <h2 id="about-heading" className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Biz <span className="gradient-text">Kimiz?</span>
          </h2>
        </motion.header>

        {/* Content - Article with Person Schema */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
          itemScope
          itemType="https://schema.org/Person"
          aria-labelledby="founder-name"
        >
          <div className="space-y-6">
            {/* Founder/Team Title - E-E-A-T Optimized */}
            <header className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Users className="w-6 h-6 text-primary" aria-hidden="true" />
                <h3 id="founder-name" className="font-display font-bold text-2xl sm:text-3xl" itemProp="name">
                  Finans Kodu Ekibi
                </h3>
              </div>
              <p className="text-primary font-medium" itemProp="jobTitle">
                Sabancı Üniversitesi Endüstri Mühendisleri
              </p>
              <meta itemProp="alumniOf" content="Sabancı Üniversitesi" />
              <meta itemProp="knowsAbout" content="Artificial Intelligence, Financial Operations, B2B Strategy, Industrial Engineering" />
            </header>

            {/* Story - Semantic paragraphs */}
            <div className="space-y-4 text-muted-foreground leading-relaxed text-center" itemProp="description">
              <p>
                Üç arkadaş olarak <strong>Sabancı Üniversitesi Endüstri Mühendisliği</strong> bölümünden mezun olduk. 
                Finans dünyasında yıllarca çalıştık. Excel tablolarında boğulduk, 
                manuel raporlama süreçlerinde saatlerimizi harcadık. Bir gün kendimize 
                sorduk: <em className="text-foreground font-medium not-italic">"Mühendisler olarak bu kaosun 
                içinde neden hâlâ bu kadar verimsiz çalışıyoruz?"</em>
              </p>
              <p>
                İşte o gün <strong>Finans Kodu</strong> doğdu. <strong>Endüstri mühendisliği</strong> eğitimimizi, 
                finans tecrübemizi ve <strong>yapay zeka</strong> tutkumuzu birleştirerek, finansçıların 
                hayatını kolaylaştıracak sistemler geliştirmeye başladık.
              </p>
              <p>
                Bugün, <strong className="text-primary">no-code araçlar</strong> ve{" "}
                <strong className="text-primary">AI destekli sistemler</strong> ile 
                yüzlerce finans profesyonelinin operasyonel yükünü hafifletiyoruz. 
                Çünkü inanıyoruz ki, finansın karmaşıklığını çözmek için{" "}
                <em className="text-foreground font-medium not-italic">mühendislik düşüncesi</em> gerekir.
              </p>
            </div>

            {/* Credentials - Description List */}
            <dl className="grid sm:grid-cols-3 gap-4 pt-6" aria-label="Ekip yetkinlikleri">
              {credentials.map((cred, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <cred.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <dt className="font-display font-semibold text-sm mb-1">
                    {cred.title}
                  </dt>
                  <dd className="text-xs text-muted-foreground">
                    {cred.description}
                  </dd>
                </motion.div>
              ))}
            </dl>

            {/* Quote - Blockquote */}
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="pt-6 border-t border-border/30"
            >
              <div className="flex items-start justify-center gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" aria-hidden="true" />
                <blockquote className="text-foreground italic font-display text-center max-w-xl">
                  "Finansal kaosunuzu, kod yazmadan düzenli bir Mühendislik Harikası'na 
                  dönüştürüyoruz. Size zaman ve hız kazandırıyoruz."
                </blockquote>
              </div>
            </motion.figure>

            {/* Social Link - Secure external link */}
            <nav className="pt-6 text-center" aria-label="Sosyal medya bağlantıları">
              <Button
                asChild
                variant="outline"
                className="border-border hover:border-primary hover:text-primary bg-transparent"
              >
                <a 
                  href="https://www.linkedin.com/in/rubi-can-icliyurek/"
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="sameAs"
                  aria-label="LinkedIn profilimizi ziyaret et"
                >
                  <Linkedin className="w-4 h-4 mr-2" aria-hidden="true" />
                  LinkedIn'de Bağlan
                </a>
              </Button>
            </nav>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
