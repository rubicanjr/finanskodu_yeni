/*
  DESIGN: Cyber Finance Manifesto Section
  - Problem vs Solution split layout
  - Contrasting visuals (chaos vs order)
  - Animated reveal on scroll
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, CheckCircle2, Clock, FileSpreadsheet, Brain, Zap, Target, TrendingUp } from "lucide-react";

const problems = [
  {
    icon: FileSpreadsheet,
    title: "Excel Bataklığı",
    description: "Saatler süren manuel veri girişi ve formül hataları",
  },
  {
    icon: Clock,
    title: "Zaman Kaybı",
    description: "Tekrarlayan görevlere harcanan değerli mesai saatleri",
  },
  {
    icon: AlertTriangle,
    title: "Operasyonel Kaos",
    description: "Dağınık veriler, tutarsız raporlar ve geciken kararlar",
  },
];

const solutions = [
  {
    icon: Brain,
    title: "AI Destekli Sistemler",
    description: "Yapay zeka ile otomatik veri işleme ve analiz",
  },
  {
    icon: Zap,
    title: "No-Code Otomasyon",
    description: "Kod yazmadan süreçlerinizi otomatikleştirin",
  },
  {
    icon: Target,
    title: "Mühendislik Yaklaşımı",
    description: "Endüstri mühendisliği disipliniyle optimize edilmiş sistemler",
  },
];

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="manifesto" className="relative py-24 overflow-hidden">
      {/* Section Divider */}
      <div className="section-divider mb-24" />

      <div className="container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // MANİFESTO
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Kaos'tan <span className="gradient-text">Düzen</span>'e
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Finansçıların yaşadığı günlük mücadeleyi anlıyoruz. 
            Çünkü biz de oradaydık.
          </p>
        </motion.div>

        {/* Problem vs Solution Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Problem Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('/images/problem-section-bg.jpg')" }}
            />
            <div className="relative glass-card rounded-2xl p-8 border border-destructive/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-destructive">
                    Mevcut Durum
                  </h3>
                  <p className="text-sm text-muted-foreground">Finansal Kaos</p>
                </div>
              </div>

              <div className="space-y-6">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <problem.icon className="w-5 h-5 text-destructive/80" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        {problem.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {problem.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('/images/solution-section-bg.jpg')" }}
            />
            <div className="relative glass-card rounded-2xl p-8 neon-border">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-primary">
                    Finans Kodu Çözümü
                  </h3>
                  <p className="text-sm text-muted-foreground">Mühendislik Harikası</p>
                </div>
              </div>

              <div className="space-y-6">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <solution.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        {solution.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {solution.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl sm:text-2xl font-display text-muted-foreground italic max-w-3xl mx-auto">
            "Size zaman ve hız kazandırıyoruz. Çünkü finansın karmaşıklığını 
            çözmek için <span className="text-primary not-italic font-semibold">mühendislik düşüncesi</span> gerekir."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
