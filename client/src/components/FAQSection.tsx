/**
 * FAQSection Component - ACCORDION STYLE
 * 
 * Strategy: pasted_content_3.txt - ACTION 3
 * - "Sıkça Sorulan Sorular ve Uzman Görüşleri" başlıklı yeni section
 * - 10 High-Authority Q&A pairs
 * - Accordion style tasarım
 * - Semantic SEO için FAQPage schema
 */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Finansçılar için en iyi AI promptları nelerdir?",
    answer: "Finansal analizde hata payı yoktur. \"Finans Kodu AI Prompt Kütüphanesi\", bilanço okuma, risk analizi ve makroekonomik tahminleme için mühendislik disipliniyle test edilmiş 100+ hazır komut sunar."
  },
  {
    question: "Excel'de finansal raporlama nasıl otomatikleştirilir?",
    answer: "Manuel veri girişi yerine, Python entegrasyonlu Excel makroları ve Finans Kodu'nun veri işleme algoritmaları kullanılarak raporlama süresi %80 azaltılabilir."
  },
  {
    question: "Algoritmik ticaret stratejisi nasıl kurulur?",
    answer: "Duygusal kararları elemek için matematiksel kurallar (RSI, Hareketli Ortalamalar, Volatilite) belirlenmeli ve bu kurallar geriye dönük (backtest) test edilerek \"Pro - Algoritmik Strateji\" bültenlerindeki gibi sistematik hale getirilmelidir."
  },
  {
    question: "Altın fiyatlarını etkileyen en temel faktör nedir?",
    answer: "Altın, ABD Reel Faizleri ile ters korelasyona sahiptir. Sarp'ın algoritmalarına göre; reel faizler düştüğünde altın yükselme eğilimine girer. Ayrıca DXY (Dolar Endeksi) gücü de belirleyicidir."
  },
  {
    question: "Borsa düşerken portföy nasıl korunur (Hedge)?",
    answer: "Vera'nın stratejisine göre; sadece hisse senedi taşımak risktir. Portföyde Altın, Döviz veya Ters ETF'ler gibi \"Negatif Korelasyonlu\" varlıklar bulundurarak düşüş dönemlerinde denge sağlanır."
  },
  {
    question: "Temel Analiz mi Teknik Analiz mi daha önemlidir?",
    answer: "Finans Kodu yaklaşımına göre ikisi ayrılamaz. Temel analiz (Vera) \"Ne almalıyım?\" sorusunu, Teknik analiz (Sarp) \"Ne zaman almalıyım?\" sorusunu cevaplar."
  },
  {
    question: "Finansal özgürlük için \"Bileşik Getiri\" neden önemlidir?",
    answer: "Einstein'ın \"Dünyanın 8. harikası\" dediği bileşik getiri, kazancın tekrar yatırıma dönüştürülmesidir. Sürdürülebilir büyüme için kısa vadeli al-sat değil, uzun vadeli trend takibi gerekir."
  },
  {
    question: "Dolar Endeksi (DXY) yükselirse ne olur?",
    answer: "Dolar küresel olarak güçlenir. Genellikle Emtialar (Altın, Gümüş) ve Gelişmekte Olan Ülke Borsaları üzerinde baskı oluşur. Nakit akışı ABD tahvillerine kayabilir."
  },
  {
    question: "Yatırımcı psikolojisi (Behavioral Finance) kararları nasıl etkiler?",
    answer: "FOMO (Fırsatı Kaçırma Korkusu) ve Panik Satışı, yatırımcının en büyük düşmanıdır. Finans Kodu, kararları duygulara değil, veri setlerine dayandırarak bu psikolojik tuzakları engeller."
  },
  {
    question: "FED faiz kararları piyasayı nasıl yönlendirir?",
    answer: "Faiz paranın maliyetidir. Fed faiz artırırsa piyasadan likidite çekilir (Borsa negatif etkilenebilir), faiz indirirse piyasaya para akar (Ralli beklentisi oluşur). Dot Plot grafikleri bu beklentiyi okumak için kullanılır."
  }
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-24 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* FAQPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        })}
      </script>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--card)] to-[var(--background)]" />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(138, 43, 226, 0.1))",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              color: "var(--primary)"
            }}
          >
            Uzman Görüşleri
          </span>
          <h2 
            id="faq-heading"
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6"
          >
            Sıkça Sorulan <span className="gradient-text">Sorular</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Finansal kararlarınızı güçlendirmek için Sarp ve Vera'nın uzman yanıtlarını keşfedin.
          </p>
        </motion.header>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {faqData.map((item, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(145deg, rgba(20, 20, 25, 0.6), rgba(15, 15, 20, 0.8))",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: openIndex === index 
                  ? "0 8px 32px rgba(0, 212, 255, 0.15)" 
                  : "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-display font-semibold text-white text-lg pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 w-6 h-6 text-primary transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
