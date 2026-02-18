import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, ArrowRight, TrendingDown, TrendingUp, Brain, Zap, Shield, BarChart3 } from "lucide-react";

const chaosItems = [
  { icon: TrendingDown, text: "Haberlere göre alım-satım" },
  { icon: AlertTriangle, text: "Duygusal kararlar" },
  { icon: TrendingDown, text: "Sürü psikolojisi" },
  { icon: AlertTriangle, text: "Bilgi kirliliği" },
  { icon: TrendingDown, text: "Zamansız giriş-çıkış" },
];

const orderItems = [
  { icon: Brain, text: "AI destekli veri analizi" },
  { icon: Shield, text: "Risk yönetimi algoritmaları" },
  { icon: Zap, text: "Otomatik sinyal üretimi" },
  { icon: BarChart3, text: "Teknik + Temel analiz" },
  { icon: TrendingUp, text: "Disiplinli strateji" },
];

export default function ComparisonSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: '#050810' }}>
      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-mono tracking-[0.15em] mb-4 block" style={{ color: '#0EA5E9' }}>
            // KAOS vs DÜZEN
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: '#F0F4F8' }}>
            Piyasa Gürültüsünden <span style={{ color: '#10B981' }}>Stratejiye</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#8899AA' }}>
            Çoğu yatırımcı kaosta kaybolur. Finans Kodu, gürültüyü filtreleyerek sana net bir yol haritası sunar.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* CHAOS Column - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ x: -4 }}
            className="rounded-xl p-8 transition-all duration-300 group"
            style={{
              background: '#0D1117',
              border: '1px solid #EF444430',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#EF444415' }}>
                <AlertTriangle size={20} style={{ color: '#EF4444' }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg" style={{ color: '#EF4444' }}>KAOS</h3>
                <p className="text-xs font-mono" style={{ color: '#8899AA' }}>Geleneksel Yaklaşım</p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {chaosItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 group/item"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.15 }}
                >
                  <item.icon size={16} style={{ color: '#EF4444' }} className="flex-shrink-0 opacity-60" />
                  <span className="text-sm" style={{ color: '#C8D6E5' }}>{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Result */}
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid #1E2D3D' }}>
              <div className="flex items-center gap-2">
                <TrendingDown size={16} style={{ color: '#EF4444' }} />
                <span className="text-sm font-mono font-semibold" style={{ color: '#EF4444' }}>
                  Sonuç: Kayıp & Stres
                </span>
              </div>
            </div>
          </motion.div>

          {/* ORDER Column - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="rounded-xl p-8 transition-all duration-300 group relative"
            style={{
              background: '#0D1117',
              border: '1px solid #10B98130',
              boxShadow: '0 0 30px #10B98108',
            }}
          >
            {/* Badge */}
            <div 
              className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-mono font-semibold"
              style={{ background: '#10B98120', color: '#10B981', border: '1px solid #10B98140' }}
            >
              Finans Kodu
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#10B98115' }}>
                <CheckCircle size={20} style={{ color: '#10B981' }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg" style={{ color: '#10B981' }}>DÜZEN</h3>
                <p className="text-xs font-mono" style={{ color: '#8899AA' }}>AI Destekli Yaklaşım</p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {orderItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                >
                  <item.icon size={16} style={{ color: '#10B981' }} className="flex-shrink-0 opacity-80" />
                  <span className="text-sm" style={{ color: '#C8D6E5' }}>{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Result */}
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid #1E2D3D' }}>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} style={{ color: '#10B981' }} />
                <span className="text-sm font-mono font-semibold" style={{ color: '#10B981' }}>
                  Sonuç: Disiplin & Kazanç
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/analiz"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: '#0EA5E9',
              color: '#fff',
              boxShadow: '0 0 20px #0EA5E920',
            }}
          >
            Düzene Geç
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
