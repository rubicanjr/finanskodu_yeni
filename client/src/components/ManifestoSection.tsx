/*
  DESIGN: Cyber Finance Manifesto Section
  GEO OPTIMIZED: Semantic HTML with <section>, <article>, <dl>, <dt>, <dd>
  
  - Problem/Solution comparison using Description Lists
  - Machine-readable structure for LLMs
  - E-E-A-T optimized content
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, CheckCircle2, Clock, FileSpreadsheet, Brain, Zap, Target, TrendingUp, Sparkles } from "lucide-react";

const problems = [
  {
    icon: FileSpreadsheet,
    term: "Excel Bataklığı",
    definition: "Saatler süren manuel veri girişi ve formül hataları",
  },
  {
    icon: Clock,
    term: "Zaman Kaybı",
    definition: "Tekrarlayan görevlere harcanan değerli mesai saatleri",
  },
  {
    icon: AlertTriangle,
    term: "Operasyonel Kaos",
    definition: "Dağınık veriler, tutarsız raporlar ve geciken kararlar",
  },
];

const solutions = [
  {
    icon: Brain,
    term: "AI Destekli Sistemler",
    definition: "Yapay zeka ile otomatik veri işleme ve analiz",
  },
  {
    icon: Zap,
    term: "No-Code Otomasyon",
    definition: "Kod yazmadan süreçlerinizi otomatikleştirin",
  },
  {
    icon: Target,
    term: "Mühendislik Yaklaşımı",
    definition: "Endüstri mühendisliği disipliniyle optimize edilmiş sistemler",
  },
];

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="manifesto" 
      className="relative py-24 overflow-hidden"
      aria-labelledby="manifesto-heading"
    >
      {/* Section Divider */}
      <div className="section-divider mb-24" aria-hidden="true" />

      <div className="container" ref={ref}>
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // MANİFESTO
          </span>
          <h2 id="manifesto-heading" className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Kaos'tan <span className="gradient-text">Düzen</span>'e
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Finansçıların yaşadığı günlük mücadeleyi anlıyoruz. 
            Çünkü biz de oradaydık.
          </p>
        </motion.header>

        {/* Problem vs Solution Grid with Semantic Articles */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Problem Side - Article */}
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
            aria-labelledby="problem-heading"
          >
            <div
              className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('/images/problem-section-bg.jpg')" }}
              role="img"
              aria-label="Problem bölümü arka planı"
            />
            <div className="relative glass-card rounded-2xl p-8 border border-destructive/20">
              <header className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="problem-heading" className="font-display font-bold text-xl text-destructive">
                    Mevcut Durum
                  </h3>
                  <p className="text-sm text-muted-foreground">Finansal Kaos</p>
                </div>
              </header>

              {/* Semantic Description List for Problems */}
              <dl className="space-y-6" aria-label="Finansal sorunlar listesi">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <problem.icon className="w-5 h-5 text-destructive/80" aria-hidden="true" />
                    </div>
                    <div>
                      <dt className="font-display font-semibold text-foreground mb-1">
                        {problem.term}
                      </dt>
                      <dd className="text-sm text-muted-foreground">
                        {problem.definition}
                      </dd>
                    </div>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.article>

          {/* Solution Side - Article */}
          <motion.article
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
            aria-labelledby="solution-heading"
          >
            <div
              className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('/images/solution-section-bg.jpg')" }}
              role="img"
              aria-label="Çözüm bölümü arka planı"
            />
            <div className="relative glass-card rounded-2xl p-8 neon-border">
              <header className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="solution-heading" className="font-display font-bold text-xl text-primary">
                    Finans Kodu Çözümü
                  </h3>
                  <p className="text-sm text-muted-foreground">Mühendislik Harikası</p>
                </div>
              </header>

              {/* Semantic Description List for Solutions */}
              <dl className="space-y-6" aria-label="Finans Kodu çözümleri listesi">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <solution.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <dt className="font-display font-semibold text-foreground mb-1">
                        {solution.term}
                      </dt>
                      <dd className="text-sm text-muted-foreground">
                        {solution.definition}
                      </dd>
                    </div>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.article>
        </div>

        {/* Bottom Quote - E-E-A-T Authority Statement */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <blockquote 
            className="text-xl sm:text-2xl font-display text-muted-foreground italic max-w-3xl mx-auto"
            cite="https://finanskodu.manus.space"
          >
            "Size zaman ve hız kazandırıyoruz. Çünkü finansın karmaşıklığını 
            çözmek için <strong className="text-primary not-italic font-semibold">mühendislik düşüncesi</strong> gerekir."
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            — Finans Kodu Ekibi
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
