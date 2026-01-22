/*
  DESIGN: Finans Kodu AI Chatbot
  COMPLIANCE: SPK/BDDK mevzuatına uygun
  
  - Sticky chatbot icon in bottom-right corner
  - Expandable chat window
  - Financial analysis with risk/reward balance
  - Mandatory disclaimer on all investment-related responses
  - Educational and analytical tone, no buy/sell recommendations
*/

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const DISCLAIMER = "\n\n⚠️ *Burada yer alan bilgiler yatırım tavsiyesi değildir. Yatırım kararlarınızı kendi araştırmanıza dayanarak veriniz.*";

// Predefined responses for common financial topics
const getFinancialResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Altın
  if (lowerQuery.includes("altın") || lowerQuery.includes("altin")) {
    return `**Altın Analizi**

Altın, tarih boyunca "güvenli liman" olarak kabul edilen bir yatırım aracıdır.

**Potansiyel Fırsatlar:**
• Enflasyona karşı koruma sağlayabilir
• Ekonomik belirsizlik dönemlerinde değer kazanma eğilimi gösterebilir
• Portföy çeşitlendirmesi için kullanılabilir
• Fiziksel olarak saklanabilir

**Dikkat Edilmesi Gereken Riskler:**
• Faiz oranları yükseldiğinde cazibesini kaybedebilir
• Dolar/TL kuru dalgalanmaları gram altın fiyatını etkiler
• Kısa vadede volatilite gösterebilir
• Getiri sağlamaz (temettü, faiz yok)

Altın yatırımı yapmadan önce, portföyünüzdeki oranını ve yatırım vadenizi belirlemeniz önemlidir.${DISCLAIMER}`;
  }
  
  // Bitcoin / Kripto
  if (lowerQuery.includes("bitcoin") || lowerQuery.includes("kripto") || lowerQuery.includes("btc") || lowerQuery.includes("ethereum") || lowerQuery.includes("eth")) {
    return `**Kripto Para Analizi**

Kripto paralar, merkeziyetsiz dijital varlıklar olarak yüksek volatilite ve risk/getiri potansiyeli sunar.

**Potansiyel Fırsatlar:**
• Yüksek getiri potansiyeli (tarihsel performans gelecek garantisi değildir)
• 7/24 işlem yapılabilirlik
• Merkeziyetsiz yapı
• Blockchain teknolojisinin büyüme potansiyeli

**Dikkat Edilmesi Gereken Riskler:**
• Aşırı volatilite - %50+ düşüşler yaşanabilir
• Regülasyon belirsizlikleri
• Siber güvenlik riskleri
• Piyasa manipülasyonuna açıklık
• Türkiye'de ödeme aracı olarak kullanımı yasaktır

Kripto paralara yatırım yaparken, kaybetmeyi göze alabileceğiniz miktarı aşmamanız kritik önem taşır.${DISCLAIMER}`;
  }
  
  // Hisse Senedi
  if (lowerQuery.includes("hisse") || lowerQuery.includes("borsa") || lowerQuery.includes("bist") || lowerQuery.includes("pay")) {
    return `**Hisse Senedi Analizi**

Hisse senetleri, şirketlerin ortaklık paylarını temsil eden ve uzun vadede enflasyonun üzerinde getiri potansiyeli sunan yatırım araçlarıdır.

**Potansiyel Fırsatlar:**
• Uzun vadede enflasyonun üzerinde getiri potansiyeli
• Temettü geliri imkanı
• Şirket büyümesinden pay alma
• Likidite avantajı

**Dikkat Edilmesi Gereken Riskler:**
• Piyasa riski - genel düşüşlerden etkilenme
• Şirkete özgü riskler (yönetim, sektör, rekabet)
• Kısa vadede yüksek volatilite
• Duygusal kararlar verme riski

Hisse senedi yatırımında temel ve teknik analiz bilgisi, portföy çeşitlendirmesi ve uzun vadeli bakış açısı önemlidir.${DISCLAIMER}`;
  }
  
  // Fon
  if (lowerQuery.includes("fon") || lowerQuery.includes("yatırım fonu") || lowerQuery.includes("emeklilik")) {
    return `**Yatırım Fonu Analizi**

Yatırım fonları, profesyonel yönetim altında çeşitlendirilmiş portföy imkanı sunan kolektif yatırım araçlarıdır.

**Potansiyel Fırsatlar:**
• Profesyonel portföy yönetimi
• Küçük tutarlarla çeşitlendirme imkanı
• Farklı risk profillerine uygun seçenekler
• BES fonlarında devlet katkısı avantajı

**Dikkat Edilmesi Gereken Riskler:**
• Yönetim ücreti ve komisyonlar getiriyi azaltır
• Fon yöneticisi performansına bağımlılık
• Bazı fonlarda likidite kısıtlamaları
• Piyasa koşullarından etkilenme

Fon seçerken, yönetim ücretleri, geçmiş performans ve fon stratejisini incelemeniz önerilir.${DISCLAIMER}`;
  }
  
  // Döviz
  if (lowerQuery.includes("dolar") || lowerQuery.includes("euro") || lowerQuery.includes("döviz") || lowerQuery.includes("doviz")) {
    return `**Döviz Analizi**

Döviz yatırımı, farklı para birimlerinin değer değişimlerinden faydalanmayı hedefleyen bir yatırım stratejisidir.

**Potansiyel Fırsatlar:**
• TL değer kaybına karşı koruma
• Uluslararası çeşitlendirme
• Yüksek likidite
• 7/24 piyasa erişimi (forex)

**Dikkat Edilmesi Gereken Riskler:**
• Kur volatilitesi
• Merkez bankası müdahaleleri
• Faiz oranı farklılıkları
• Kaldıraçlı işlemlerde yüksek kayıp riski

Döviz yatırımı yaparken, makroekonomik göstergeleri ve merkez bankası politikalarını takip etmek önemlidir.${DISCLAIMER}`;
  }
  
  // Genel yatırım sorusu
  if (lowerQuery.includes("yatırım") || lowerQuery.includes("ne yapmalı") || lowerQuery.includes("öneri")) {
    return `**Yatırım Stratejisi Hakkında**

Doğru yatırım stratejisi, kişisel finansal durumunuza, risk toleransınıza ve yatırım vadenize bağlıdır.

**Temel Prensipler:**
• Risk toleransınızı belirleyin
• Yatırım vadenizi netleştirin
• Portföyünüzü çeşitlendirin
• Duygusal kararlardan kaçının
• Düzenli olarak portföyünüzü gözden geçirin

**Finans Kodu Yaklaşımı:**
Biz spesifik "AL" veya "SAT" tavsiyeleri vermiyoruz. Bunun yerine, kendi yatırım kararlarınızı verebilmeniz için gerekli analitik araçları ve eğitim içeriklerini sunuyoruz.

Finansal okuryazarlık ve disiplinli bir yaklaşım, uzun vadeli başarının anahtarıdır.${DISCLAIMER}`;
  }
  
  // Finans Kodu hakkında
  if (lowerQuery.includes("finans kodu") || lowerQuery.includes("siz kim") || lowerQuery.includes("ne yapıyor")) {
    return `**Finans Kodu Hakkında**

Finans Kodu, finans profesyonelleri için yapay zeka destekli verimlilik çözümleri sunan bir platformdur.

**Sunduğumuz Değer:**
• AI Prompt Kütüphanesi - Finansal analizler için hazır promptlar
• Otomasyon Araçları - Excel'den algoritmik finansa geçiş
• Eğitim İçerikleri - Dijital dönüşüm rehberleri
• Topluluk - Finans profesyonelleri forumu

**Misyonumuz:**
Finansal kaosunuzu, kod yazmadan düzenli bir "Mühendislik Harikası"na dönüştürmek.

Ürünlerimizi incelemek için "Dijital Ürünler" bölümümüzü ziyaret edebilirsiniz.`;
  }
  
  // Default response
  return `Merhaba! Ben Finans Kodu Chatbot. Size finansal konularda genel bilgi ve analiz sunabilirim.

**Sorularınız için örnekler:**
• "Altın yatırımı hakkında bilgi ver"
• "Bitcoin riskleri neler?"
• "Hisse senedi yatırımı nasıl yapılır?"
• "Yatırım fonları hakkında bilgi"
• "Finans Kodu nedir?"

Lütfen spesifik bir yatırım aracı veya konu hakkında soru sorun.

*Not: Spesifik "AL" veya "SAT" tavsiyeleri vermiyorum. Amacım eğitici ve analitik bilgi sunmaktır.*`;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Merhaba! Ben Finans Kodu Chatbot. Finansal konularda size yardımcı olabilirim. Altın, hisse, kripto veya diğer yatırım araçları hakkında sorularınızı sorabilirsiniz.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getFinancialResponse(input);
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button - Sticky bottom right */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all neon-glow flex items-center justify-center ${isOpen ? "hidden" : ""}`}
        aria-label="Chatbot'u aç"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] glass-card rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-primary/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm">Finans Kodu Chatbot</h3>
                  <p className="text-xs text-muted-foreground">Finansal Asistan</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Chatbot'u kapat"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Disclaimer Banner */}
            <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-500/90">
                Bu chatbot yatırım tavsiyesi vermez. Bilgiler eğitim amaçlıdır.
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === "user"
                        ? "bg-primary/10"
                        : "bg-secondary"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary text-secondary-foreground rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-secondary/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Sorunuzu yazın..."
                  className="flex-1 px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground text-sm"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4"
                  aria-label="Mesaj gönder"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
