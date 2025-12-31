/*
  DESIGN: Cyber Finance About Section
  - Founder introduction with photo placeholder
  - Engineering + Finance background emphasis
  - Personal story with professional tone
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, GraduationCap, Briefcase, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const credentials = [
  {
    icon: GraduationCap,
    title: "Endüstri Mühendisi",
    description: "Sistem optimizasyonu ve süreç mühendisliği uzmanlığı",
  },
  {
    icon: Briefcase,
    title: "Finans Profesyoneli",
    description: "Yıllarca kurumsal finans deneyimi",
  },
  {
    icon: Target,
    title: "Verimlilik Mimarı",
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
            // KURUCU
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Ben <span className="gradient-text">Kimim?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Photo Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Photo Placeholder with Glow */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-2xl blur-xl" />
                <div className="relative aspect-square rounded-2xl overflow-hidden glass-card neon-border">
                  {/* Placeholder - User can add their photo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="font-display font-bold text-4xl text-primary">RC</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Fotoğraf eklenecek
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Link */}
              <div className="mt-6 text-center lg:text-left">
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

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="space-y-6">
              {/* Name & Title */}
              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl mb-2">
                  Rubi Can İçliyürek
                </h3>
                <p className="text-primary font-medium">
                  Endüstri Mühendisi & Finans Stratejisti
                </p>
              </div>

              {/* Story */}
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Finans dünyasında yıllarca çalıştım. Excel tablolarında boğuldum, 
                  manuel raporlama süreçlerinde saatlerimi harcadım. Bir gün kendime 
                  sordum: <span className="text-foreground font-medium">"Bir mühendis olarak bu kaosun 
                  içinde neden hâlâ bu kadar verimsiz çalışıyorum?"</span>
                </p>
                <p>
                  İşte o gün Finans Kodu doğdu. Endüstri mühendisliği eğitimimi, 
                  finans tecrübemi ve yapay zeka tutkumu birleştirerek, finansçıların 
                  hayatını kolaylaştıracak sistemler geliştirmeye başladım.
                </p>
                <p>
                  Bugün, <span className="text-primary font-semibold">no-code araçlar</span> ve{" "}
                  <span className="text-primary font-semibold">AI destekli sistemler</span> ile 
                  yüzlerce finans profesyonelinin operasyonel yükünü hafifletiyorum. 
                  Çünkü inanıyorum ki, finansın karmaşıklığını çözmek için{" "}
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
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <p className="text-foreground italic font-display">
                    "Finansal kaosunuzu, kod yazmadan düzenli bir Mühendislik Harikası'na 
                    dönüştürüyorum. Size zaman ve hız kazandırıyorum."
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
