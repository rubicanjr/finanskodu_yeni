import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ComparisonSection() {
  const comparisons = [
    {
      title: "İnsan Analisti",
      time: "5 Saat",
      accuracy: "Değişken",
      quality: "Yüksek Maliyet",
      icon: "👤",
      highlight: false,
    },
    {
      title: "Standart AI (GPT-4)",
      time: "1 Dakika",
      accuracy: "67% Başarı",
      quality: "Yüzeysel Analiz",
      icon: "🤖",
      highlight: false,
    },
    {
      title: "Finans Kodu (Biz)",
      time: "27 Saniye",
      accuracy: "80% Başarı",
      quality: "Derin İçgörü",
      icon: "🔍",
      highlight: true,
      badge: "🏆 Hackathon Kazananı",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0F172A 0%, #0a0a0a 100%)" }} />

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Teknoloji & Metodoloji Karşılaştırması
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Finans Kodu, Wiro AI altyapısı ile pazardaki en hızlı ve en doğru analizi sunuyor.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                item.highlight ? "scale-105 md:scale-110" : ""
              }`}
              style={{
                background: item.highlight
                  ? "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(0, 240, 255, 0.05) 100%)"
                  : "rgba(15, 23, 42, 0.6)",
                border: item.highlight
                  ? "2px solid #10B981"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: item.highlight
                  ? "0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(0, 240, 255, 0.1)"
                  : "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Badge */}
              {item.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 text-xs font-bold whitespace-nowrap">
                  {item.badge}
                </div>
              )}

              {/* Icon */}
              <div className="text-4xl mb-4">{item.icon}</div>

              {/* Title */}
              <h3 className="font-display font-bold text-xl text-white mb-6">{item.title}</h3>

              {/* Metrics */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm">Analiz Süresi</p>
                    <p className="text-white font-semibold">{item.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm">Doğruluk Oranı</p>
                    <p className="text-white font-semibold">{item.accuracy}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm">Kalite</p>
                    <p className="text-white font-semibold">{item.quality}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">
            Bu analizi yapan 'Master Prompt'a sahip olmak ister misin?
          </p>
          <a
            href="https://www.hikie.space/finanskodu/file/6cf62b1f141d48d1af13cb5ca04a53ab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "#FFD700",
              color: "#000",
              boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
            }}
          >
            👉 AI Prompt Kütüphanesini İncele
          </a>
        </motion.div>
      </div>
    </section>
  );
}
