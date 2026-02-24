/*
  PIKSEL-PERFECT DESIGN: Finans Kodu Süreç Modeli Section
  Spec: pasted_content_7.txt
*/

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Search, Code, Rocket, Star, CheckCircle } from "lucide-react";
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
  pillars: Array<{ text: string }>;
}

const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    icon: Search,
    titleKey: 'processModel.step1.title',
    descriptionKey: 'processModel.step1.description',
    badge: 'Kara kutu yok',
    color: 'var(--fk-cyan)',
    pillars: [
      { text: 'Şeffaf süreç' },
      { text: 'Detaylı analiz' },
      { text: 'Açık raporlama' },
    ],
  },
  {
    id: 'design',
    number: '02',
    icon: Code,
    titleKey: 'processModel.step2.title',
    descriptionKey: 'processModel.step2.description',
    badge: 'Sürpriz entegrasyon yok',
    color: 'var(--fk-cyan)',
    pillars: [
      { text: 'Özel mimari' },
      { text: 'AI + otomasyon' },
      { text: 'Maksimum verimlilik' },
    ],
  },
  {
    id: 'deployment',
    number: '03',
    icon: Rocket,
    titleKey: 'processModel.step3.title',
    descriptionKey: 'processModel.step3.description',
    badge: 'Versiyon 1.0 yok',
    color: 'var(--fk-green)',
    pillars: [
      { text: 'Sürekli iyileştirme' },
      { text: 'Ekip eğitimi' },
      { text: 'Evrimsel sistem' },
    ],
  },
];

export default function ProcessModelSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section 
      id="process-model" 
      className="relative overflow-hidden"
      style={{ 
        background: 'var(--fk-bg)',
        padding: '120px 0 140px'
      }}
      aria-labelledby="process-model-heading"
      ref={ref}
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px'
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          {/* Eyebrow with lines */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div 
              className="h-px w-6"
              style={{ background: 'rgba(255, 255, 255, 0.2)' }}
            />
            <span 
              className="text-xs tracking-wider"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                color: 'var(--fk-cyan)'
              }}
            >
              // Özel Çözüm
            </span>
            <div 
              className="h-px w-6"
              style={{ background: 'rgba(255, 255, 255, 0.2)' }}
            />
          </div>

          {/* H2 */}
          <h2 
            id="process-model-heading" 
            className="mb-6 leading-tight"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4.5vw, 46px)',
              color: '#fff'
            }}
          >
            Finans ihtiyaçların standart ürünlerimizin <em style={{ color: 'var(--fk-cyan)', fontStyle: 'normal' }}>dışına çıkıyorsa</em>, sana özel çözüm için <em style={{ color: 'var(--fk-cyan)', fontStyle: 'normal' }}>buradayız</em>.
          </h2>

          {/* Subtitle */}
          <p 
            className="mx-auto mb-6"
            style={{
              fontSize: '16px',
              color: '#8B97AB',
              maxWidth: '640px',
              fontFamily: 'var(--font-figtree)'
            }}
          >
            Fikirden canlı kullanıma kadar, finansal süreçlerini nasıl hayata geçirdiğimizi adım adım gör.
          </p>

          {/* Mono Label */}
          <div 
            className="flex items-center justify-center gap-3"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '12px',
              color: '#4E5D71'
            }}
          >
            <div className="h-px w-8" style={{ background: 'var(--border)' }} />
            <span>3 ADIMDA FİNANS KODU SÜRECİ</span>
            <div className="h-px w-8" style={{ background: 'var(--border)' }} />
          </div>
        </motion.header>

        {/* Progress Track (Desktop) */}
        <div className="hidden lg:block relative mb-12 max-w-5xl mx-auto">
          <div className="relative h-14">
            {/* Gradient Line */}
            <div 
              className="absolute top-7 left-0 right-0 h-[1.5px]"
              style={{
                background: 'linear-gradient(to right, var(--fk-cyan) 0%, var(--fk-cyan) 50%, var(--fk-green) 100%)'
              }}
            />
            
            {/* Nodes */}
            <div className="absolute inset-0 flex justify-between px-12">
              {processSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className="flex items-center justify-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--fk-bg)',
                    border: `1.5px solid ${step.color}`,
                    boxShadow: `0 0 0 8px ${step.color}20`,
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 800,
                    fontSize: '18px',
                    color: step.color
                  }}
                >
                  {step.number}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div 
          className="grid lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredCard === step.id;
            
            return (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.65, 
                  delay: 0.2 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                onMouseEnter={() => setHoveredCard(step.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative transition-transform duration-300"
                style={{
                  background: 'var(--fk-bg-card)',
                  border: `1px solid rgba(255, 255, 255, ${isHovered ? 0.16 : 0.11})`,
                  borderRadius: '16px',
                  padding: '36px 32px',
                  transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
                }}
              >
                {/* Top Gradient Line (appears on hover) */}
                <div 
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, ${step.color}, ${step.color})`,
                    opacity: isHovered ? 1 : 0
                  }}
                />

                {/* Inner Radial Glow (appears on hover) */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${step.color}10, transparent 70%)`,
                    opacity: isHovered ? 1 : 0
                  }}
                />

                <div className="relative z-10">
                  {/* Gold Badge */}
                  <div 
                    className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full mb-5"
                    style={{
                      background: 'rgba(240, 180, 41, 0.10)',
                      border: '1px solid rgba(240, 180, 41, 0.20)'
                    }}
                  >
                    <Star className="w-3.5 h-3.5" style={{ color: 'var(--fk-gold)' }} />
                    <span 
                      className="text-xs font-semibold"
                      style={{ 
                        color: 'var(--fk-gold)',
                        fontFamily: 'var(--font-figtree)'
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>

                  {/* Large Number */}
                  <div 
                    className="mb-4 transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 800,
                      fontSize: '52px',
                      color: step.color,
                      textShadow: isHovered ? `0 0 20px ${step.color}60` : 'none'
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div 
                    className="w-fit p-3 rounded-lg mb-4"
                    style={{ background: `${step.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>

                  {/* H3 Title */}
                  <h3 
                    className="mb-4"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      fontSize: '20px',
                      color: '#fff'
                    }}
                  >
                    {t(step.titleKey)}
                  </h3>

                  {/* Divider */}
                  <div 
                    className="mb-4 transition-all duration-300"
                    style={{
                      height: '1px',
                      width: isHovered ? '56px' : '32px',
                      background: isHovered ? step.color : 'rgba(255, 255, 255, 0.11)'
                    }}
                  />

                  {/* Body Text */}
                  <p 
                    className="mb-6"
                    style={{
                      fontFamily: 'var(--font-figtree)',
                      fontSize: '14px',
                      lineHeight: '1.75',
                      color: '#8B97AB'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: t(step.descriptionKey).replace(/\*\*(.*?)\*\*/g, '<strong style="color: #E8EDF5">$1</strong>')
                    }}
                  />

                  {/* 3 Pillars */}
                  <div className="space-y-3">
                    {step.pillars.map((pillar, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div 
                          className="flex items-center justify-center rounded"
                          style={{
                            width: '16px',
                            height: '16px',
                            background: step.color
                          }}
                        >
                          <CheckCircle className="w-3 h-3" style={{ color: 'var(--fk-bg)' }} />
                        </div>
                        <span 
                          style={{
                            fontFamily: 'var(--font-figtree)',
                            fontSize: '13px',
                            color: '#8B97AB'
                          }}
                        >
                          {pillar.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto mt-16"
          style={{
            background: 'var(--fk-bg-elevated)',
            border: '1px solid rgba(0, 212, 255, 0.18)',
            borderRadius: '20px',
            padding: '44px 52px'
          }}
        >
          {/* Left Gradient Line */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
            style={{
              background: 'linear-gradient(to bottom, var(--fk-cyan), var(--fk-green))'
            }}
          />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Text Group */}
            <div className="flex-1">
              <div 
                className="text-xs tracking-wider mb-2"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  color: 'var(--fk-cyan)'
                }}
              >
                // ÜCRETSİZ KEŞİF GÖRÜŞMESİ
              </div>
              <h3 
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  fontSize: '24px',
                  color: '#fff'
                }}
              >
                Finansal dönüşümünü planlamaya hazır mısın?
              </h3>
              <p 
                style={{
                  fontFamily: 'var(--font-figtree)',
                  fontSize: '15px',
                  color: '#8B97AB'
                }}
              >
                30 dakikalık ücretsiz görüşmede, ihtiyaçlarını analiz edip en uygun çözümü birlikte belirleyelim.
              </p>
            </div>

            {/* Right: Button + Note */}
            <div className="flex flex-col items-center gap-2">
              <Button
                onClick={() => window.open('https://cal.com/rubi-can', '_blank')}
                size="lg"
                className="px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'var(--fk-cyan)',
                  color: 'var(--fk-bg)',
                  border: 'none',
                  fontFamily: 'var(--font-figtree)',
                  fontWeight: 600,
                  boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.4)',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 24px 0 rgba(0, 212, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0, 212, 255, 0.4)';
                }}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Ücretsiz Keşif Görüşmesi Ayarla
              </Button>
              <span 
                className="text-xs"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  color: '#4E5D71'
                }}
              >
                Ücretsiz · Bağlayıcı değil · 30 dakika
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
