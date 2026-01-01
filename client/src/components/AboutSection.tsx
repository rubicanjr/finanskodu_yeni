/*
  DESIGN: Cyber Finance About Section
  - Team introduction without photo
  - Three Sabancı University Industrial Engineering graduates
  - Engineering + Finance background emphasis
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
    <section id="hakkimda" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/founder-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // EKİP
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Biz <span className="gradient-text">Kimiz?</span>
          </h2>
        </motion.div>

        {/* Content - Centered without photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-6">
            {/* Team Title */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="font-display font-bold text-2xl sm:text-3xl">
                  Finans Kodu Ekibi
                </h3>
              </div>
              <p className="text-primary font-medium">
                Sabancı Üniversitesi Endüstri Mühendisleri
              </p>
            </div>

            {/* Story */}
            <div className="space-y-4 text-muted-foreground leading-relaxed text-center">
              <p>
                Üç arkadaş olarak Sabancı Üniversitesi Endüstri Mühendisliği bölümünden mezun olduk. 
                Finans dünyasında yıllarca çalıştık. Excel tablolarında boğulduk, 
                manuel raporlama süreçlerinde saatlerimizi harcadık. Bir gün kendimize 
                sorduk: <span className="text-foreground font-medium">"Mühendisler olarak bu kaosun 
                içinde neden hâlâ bu kadar verimsiz çalışıyoruz?"</span>
              </p>
              <p>
                İşte o gün Finans Kodu doğdu. Endüstri mühendisliği eğitimimizi, 
                finans tecrübemizi ve yapay zeka tutkumuzu birleştirerek, finansçıların 
                hayatını kolaylaştıracak sistemler geliştirmeye başladık.
              </p>
              <p>
                Bugün, <span className="text-primary font-semibold">no-code araçlar</span> ve{" "}
                <span className="text-primary font-semibold">AI destekli sistemler</span> ile 
                yüzlerce finans profesyonelinin operasyonel yükünü hafifletiyoruz. 
                Çünkü inanıyoruz ki, finansın karmaşıklığını çözmek için{" "}
                <span className="text-foreground font-medium">mühendislik düşüncesi</span> gerekir.
              </p>
            </div>

            {/* Credentials */}
            <div className="grid sm:grid-cols-3 gap-4 pt-6">
              {credentials.map((cred, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <cred.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-sm mb-1">
                    {cred.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {cred.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="pt-6 border-t border-border/30"
            >
              <div className="flex items-start justify-center gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
                <p className="text-foreground italic font-display text-center max-w-xl">
                  "Finansal kaosunuzu, kod yazmadan düzenli bir Mühendislik Harikası'na 
                  dönüştürüyoruz. Size zaman ve hız kazandırıyoruz."
                </p>
              </div>
            </motion.div>

            {/* Social Link */}
            <div className="pt-6 text-center">
              <Button
                variant="outline"
                className="border-border hover:border-primary hover:text-primary bg-transparent"
                onClick={() => window.open("https://www.linkedin.com/in/rubi-can-icliyurek/", "_blank")}
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn'de Bağlan
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
