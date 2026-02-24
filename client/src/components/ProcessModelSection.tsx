/*
  DESIGN: Finans Kodu Süreç Modeli Section
  GEO OPTIMIZED: Semantic HTML with <section>, <article>
  
  - 3-step process model with enhanced visual design
  - Trust badges, visual flow, CTA button
  - E-E-A-T optimized content
*/

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Code, Rocket, Shield, Zap, CheckCircle } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";

interface ProcessStep {
  id: string;
  number: string;
  icon: typeof Search;
  titleKey: string;
  descriptionKey: string;
  badge: string;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    icon: Search,
    titleKey: 'processModel.step1.title',
    descriptionKey: 'processModel.step1.description',
    badge: 'Kara kutu yok',
    color: '#0EA5E9', // cyan
  },
  {
    id: 'design',
    number: '02',
    icon: Code,
    titleKey: 'processModel.step2.title',
    descriptionKey: 'processModel.step2.description',
    badge: 'Sürpriz entegrasyon yok',
    color: '#10b981', // green
  },
  {
    id: 'deployment',
    number: '03',
    icon: Rocket,
    titleKey: 'processModel.step3.title',
    descriptionKey: 'processModel.step3.description',
    badge: 'Versiyon 1.0 yok',
    color: '#10b981', // green
  },
];

export default function ProcessModelSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="process-model" 
      className="relative py-24 overflow-hidden"
      style={{ background: '#0D1117' }}
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
          <h2 id="process-model-heading" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-6 max-w-4xl mx-auto leading-tight text-white">
            {t('processModel.heading')}
          </h2>
          <p className="text-cyan-400 font-semibold text-lg mb-2">
            {t('processModel.subheading')}
          </p>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            {t('processModel.description')}
          </p>
        </motion.header>

        {/* Visual Process Flow */}
        <div className="relative max-w-6xl mx-auto mb-12">
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-green-500 to-green-500 opacity-30" style={{ top: '120px' }} />
          
          {/* Process Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="relative group"
                >
                  {/* Step Number Circle (on line) */}
                  <div className="hidden md:flex absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full items-center justify-center z-10"
                    style={{ 
                      background: '#121A24',
                      border: `3px solid ${step.color}`,
                      boxShadow: `0 0 20px ${step.color}40`
                    }}
                  >
                    <span className="text-2xl font-bold" style={{ color: step.color }}>
                      {step.number}
                    </span>
                  </div>

                  {/* Card */}
                  <div 
                    className="rounded-xl p-6 h-full flex flex-col transition-all duration-300 group-hover:-translate-y-1 mt-12 md:mt-16"
                    style={{ 
                      background: '#121A24',
                      border: '1px solid #1E2D3D',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Accent Line (top) - appears on hover */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: step.color }}
                    />

                    {/* Trust Badge */}
                    <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full w-fit"
                      style={{ 
                        background: 'rgba(251, 191, 36, 0.1)',
                        border: '1px solid rgba(251, 191, 36, 0.3)'
                      }}
                    >
                      <Shield className="w-3 h-3 text-amber-400" />
                      <span className="text-xs font-semibold text-amber-400">{step.badge}</span>
                    </div>

                    {/* Step Number (Mobile) + Icon */}
                    <div className="flex items-center gap-4 mb-4 md:hidden">
                      <span 
                        className="font-extrabold transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          fontSize: '52px',
                          fontWeight: 800,
                          color: step.color,
                          textShadow: `0 0 20px ${step.color}60`
                        }}
                      >
                        {step.number}
                      </span>
                      <div className="p-3 rounded-lg" style={{ background: `${step.color}20` }}>
                        <Icon className="w-6 h-6" style={{ color: step.color }} />
                      </div>
                    </div>

                    {/* Icon (Desktop) */}
                    <div className="hidden md:flex p-3 rounded-lg w-fit mb-4" style={{ background: `${step.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {t(step.titleKey)}
                    </h3>

                    {/* Step Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {t(step.descriptionKey)}
                    </p>

                    {/* Inner Glow on Hover */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ 
                        boxShadow: `inset 0 0 30px ${step.color}20`
                      }}
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button
            onClick={() => window.open('https://cal.com/rubi-can', '_blank')}
            size="lg"
            className="group relative overflow-hidden px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none'
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Ücretsiz Keşif Görüşmesi Ayarla
            </span>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Button>
          <p className="text-gray-400 text-sm mt-3">
            Ücretsiz · Bağlayıcı değil · 30 dakika
          </p>
        </motion.div>
      </div>
    </section>
  );
}
