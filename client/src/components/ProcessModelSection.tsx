/*
  DESIGN: Finans Kodu Süreç Modeli Section
  GEO OPTIMIZED: Semantic HTML with <section>, <article>
  
  - 3-step process model: Keşif & Analiz, Tasarım & Geliştirme, Kurulum & Sürekli Beta
  - Clean card-based design
  - E-E-A-T optimized content
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Code, Rocket } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface ProcessStep {
  id: string;
  number: string;
  icon: typeof Search;
  titleKey: string;
  descriptionKey: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    icon: Search,
    titleKey: 'processModel.step1.title',
    descriptionKey: 'processModel.step1.description',
  },
  {
    id: 'design',
    number: '02',
    icon: Code,
    titleKey: 'processModel.step2.title',
    descriptionKey: 'processModel.step2.description',
  },
  {
    id: 'deployment',
    number: '03',
    icon: Rocket,
    titleKey: 'processModel.step3.title',
    descriptionKey: 'processModel.step3.description',
  },
];

export default function ProcessModelSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="process-model" 
      className="relative py-24 overflow-hidden bg-muted/30"
      aria-labelledby="process-model-heading"
    >
      <div className="container" ref={ref}>
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="process-model-heading" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-6 max-w-4xl mx-auto leading-tight">
            {t('processModel.heading')}
          </h2>
          <p className="text-primary font-semibold text-lg mb-2">
            {t('processModel.subheading')}
          </p>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            {t('processModel.description')}
          </p>
        </motion.header>

        {/* Process Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col">
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-bold text-primary/20">
                      {step.number}
                    </span>
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold mb-3">
                    {t(step.titleKey)}
                  </h3>

                  {/* Step Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(step.descriptionKey)}
                  </p>
                </div>

                {/* Connector Arrow (not for last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary/30">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 16H28M28 16L20 8M28 16L20 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
