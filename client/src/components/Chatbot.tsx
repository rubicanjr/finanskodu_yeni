/*
  DESIGN: Finans Kodu AI Chatbot - Voice Assistant
  COMPLIANCE: SPK/BDDK mevzuatına uygun
  
  - Sticky chatbot icon in bottom-right corner
  - Expandable chat window
  - Financial analysis with risk/reward balance
  - Mandatory disclaimer on all investment-related responses
  - Educational and analytical tone, no buy/sell recommendations
  - Voice Input: Web Speech API (SpeechRecognition)
  - Voice Output: Web Speech API (speechSynthesis)
  - Zero-cost implementation using native browser APIs
*/

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, AlertTriangle, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const DISCLAIMER = "\n\n⚠️ *Burada yer alan bilgiler yatırım tavsiyesi değildir. Yatırım kararlarınızı kendi araştırmanıza dayanarak veriniz.*";
const VOICE_DISCLAIMER = "Hatırlatmak isterim ki, bunlar yatırım tavsiyesi değildir.";

// Predefined responses for common financial topics
const getFinancialResponse = (query: string): { text: string; isInvestmentRelated: boolean } => {
  const lowerQuery = query.toLowerCase();
  
  // Altın
  if (lowerQuery.includes("altın") || lowerQuery.includes("altin")) {
    return {
      text: `**Altın Analizi**

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

Altın yatırımı yapmadan önce, portföyünüzdeki oranını ve yatırım vadenizi belirlemeniz önemlidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Bitcoin / Kripto
  if (lowerQuery.includes("bitcoin") || lowerQuery.includes("kripto") || lowerQuery.includes("btc") || lowerQuery.includes("ethereum") || lowerQuery.includes("eth")) {
    return {
      text: `**Kripto Para Analizi**

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

Kripto paralara yatırım yaparken, kaybetmeyi göze alabileceğiniz miktarı aşmamanız kritik önem taşır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Hisse Senedi
  if (lowerQuery.includes("hisse") || lowerQuery.includes("borsa") || lowerQuery.includes("bist") || lowerQuery.includes("pay")) {
    return {
      text: `**Hisse Senedi Analizi**

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

Hisse senedi yatırımında temel ve teknik analiz bilgisi, portföy çeşitlendirmesi ve uzun vadeli bakış açısı önemlidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Fon
  if (lowerQuery.includes("fon") || lowerQuery.includes("yatırım fonu") || lowerQuery.includes("emeklilik")) {
    return {
      text: `**Yatırım Fonu Analizi**

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

Fon seçerken, yönetim ücretleri, geçmiş performans ve fon stratejisini incelemeniz önerilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Döviz
  if (lowerQuery.includes("dolar") || lowerQuery.includes("euro") || lowerQuery.includes("döviz") || lowerQuery.includes("doviz")) {
    return {
      text: `**Döviz Analizi**

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

Döviz yatırımı yaparken, makroekonomik göstergeleri ve merkez bankası politikalarını takip etmek önemlidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Genel yatırım sorusu
  if (lowerQuery.includes("yatırım") || lowerQuery.includes("ne yapmalı") || lowerQuery.includes("öneri")) {
    return {
      text: `**Yatırım Stratejisi Hakkında**

Doğru yatırım stratejisi, kişisel finansal durumunuza, risk toleransınıza ve yatırım vadenize bağlıdır.

**Temel Prensipler:**
• Risk toleransınızı belirleyin
• Yatırım vadenizi netleştirin
• Portföyünüzü çeşitlendirin
• Duygusal kararlardan kaçının
• Düzenli olarak portföyünüzü gözden geçirin

**Finans Kodu Yaklaşımı:**
Biz spesifik "AL" veya "SAT" tavsiyeleri vermiyoruz. Bunun yerine, kendi yatırım kararlarınızı verebilmeniz için gerekli analitik araçları ve eğitim içeriklerini sunuyoruz.

Finansal okuryazarlık ve disiplinli bir yaklaşım, uzun vadeli başarının anahtarıdır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Finans Kodu hakkında
  if (lowerQuery.includes("finans kodu") || lowerQuery.includes("siz kim") || lowerQuery.includes("ne yapıyor")) {
    return {
      text: `**Finans Kodu Hakkında**

Finans Kodu, finans profesyonelleri için yapay zeka destekli verimlilik çözümleri sunan bir platformdur.

**Sunduğumuz Değer:**
• AI Prompt Kütüphanesi - Finansal analizler için hazır promptlar
• Otomasyon Araçları - Excel'den algoritmik finansa geçiş
• Eğitim İçerikleri - Dijital dönüşüm rehberleri
• Topluluk - Finans profesyonelleri forumu

**Misyonumuz:**
Finansal kaosunuzu, kod yazmadan düzenli bir "Mühendislik Harikası"na dönüştürmek.

Ürünlerimizi incelemek için "Dijital Ürünler" bölümümüzü ziyaret edebilirsiniz.`,
      isInvestmentRelated: false
    };
  }
  
  // Default response
  return {
    text: `Merhaba! Ben Finans Kodu Asistan. Size finansal konularda genel bilgi ve analiz sunabilirim.

**Sorularınız için örnekler:**
• "Altın yatırımı hakkında bilgi ver"
• "Bitcoin riskleri neler?"
• "Hisse senedi yatırımı nasıl yapılır?"
• "Yatırım fonları hakkında bilgi"
• "Finans Kodu nedir?"

Lütfen spesifik bir yatırım aracı veya konu hakkında soru sorun.

*Not: Spesifik "AL" veya "SAT" tavsiyeleri vermiyorum. Amacım eğitici ve analitik bilgi sunmaktır.*`,
    isInvestmentRelated: false
  };
};

// Clean text for speech synthesis (remove markdown formatting)
const cleanTextForSpeech = (text: string): string => {
  return text
    .replace(/\*\*/g, "") // Remove bold
    .replace(/\*/g, "") // Remove italic
    .replace(/•/g, "") // Remove bullets
    .replace(/⚠️/g, "") // Remove emoji
    .replace(/\n+/g, ". ") // Replace newlines with periods
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Merhaba! Ben Finans Kodu Asistan. Finansal konularda size yardımcı olabilirim. Yazarak veya mikrofon butonuna basarak sesli soru sorabilirsiniz. 🎤",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Check for Web Speech API support
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasSpeechRecognition = !!SpeechRecognitionAPI;
    const hasSpeechSynthesis = "speechSynthesis" in window;
    
    setSpeechSupported(hasSpeechRecognition && hasSpeechSynthesis);
    
    if (hasSpeechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
    
    if (hasSpeechRecognition) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "tr-TR";
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        let interimTranscript = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setInput(finalTranscript);
        } else if (interimTranscript) {
          setInput(interimTranscript);
        }
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text-to-Speech function
  const speakText = useCallback((text: string, isInvestmentRelated: boolean) => {
    if (!synthRef.current || !ttsEnabled) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const cleanedText = cleanTextForSpeech(text);
    const fullText = isInvestmentRelated 
      ? `${cleanedText} ${VOICE_DISCLAIMER}`
      : cleanedText;
    
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "tr-TR";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to find a Turkish voice
    const voices = synthRef.current.getVoices();
    const turkishVoice = voices.find(voice => voice.lang.startsWith("tr"));
    if (turkishVoice) {
      utterance.voice = turkishVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  }, [ttsEnabled]);

  // Toggle microphone
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Cancel any ongoing speech when starting to listen
      if (synthRef.current) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        // Recognition might already be running
        setIsListening(false);
      }
    }
  }, [isListening]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const { text: response, isInvestmentRelated } = getFinancialResponse(currentInput);
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Speak the response
      speakText(response, isInvestmentRelated);
    }, 1000);
  }, [input, messages.length, isListening, speakText]);

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
                  <h3 className="font-display font-semibold text-sm">Finans Kodu Asistan</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {speechSupported && (
                      <>
                        <Mic className="w-3 h-3" />
                        Sesli Asistan
                      </>
                    )}
                    {!speechSupported && "Finansal Asistan"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* TTS Toggle */}
                {speechSupported && (
                  <button
                    onClick={() => {
                      if (isSpeaking) stopSpeaking();
                      setTtsEnabled(!ttsEnabled);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      ttsEnabled ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                    }`}
                    aria-label={ttsEnabled ? "Sesli yanıtı kapat" : "Sesli yanıtı aç"}
                    title={ttsEnabled ? "Sesli yanıt açık" : "Sesli yanıt kapalı"}
                  >
                    {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                )}
                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Chatbot'u kapat"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
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
              {/* Speaking indicator */}
              {isSpeaking && (
                <div className="flex justify-center">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                    <div className="flex gap-0.5">
                      <span className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "100ms" }} />
                      <span className="w-1 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
                      <span className="w-1 h-5 bg-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                      <span className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
                    </div>
                    <span className="text-xs text-primary">Konuşuyor...</span>
                    <button
                      onClick={stopSpeaking}
                      className="p-1 hover:bg-primary/20 rounded-full transition-colors"
                      aria-label="Konuşmayı durdur"
                    >
                      <VolumeX className="w-3 h-3 text-primary" />
                    </button>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-secondary/30">
              {/* Listening indicator */}
              {isListening && (
                <div className="flex items-center justify-center gap-2 mb-3 py-2 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="relative">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  </div>
                  <span className="text-xs text-red-400">Dinleniyor... Konuşmaya başlayın</span>
                </div>
              )}
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? "Konuşun..." : "Sorunuzu yazın veya mikrofona basın..."}
                  className="flex-1 px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground text-sm"
                  disabled={isListening}
                />
                
                {/* Microphone Button - Only show if supported */}
                {speechSupported && (
                  <Button
                    onClick={toggleListening}
                    className={`px-4 transition-all ${
                      isListening 
                        ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" 
                        : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                    }`}
                    aria-label={isListening ? "Dinlemeyi durdur" : "Sesli soru sor"}
                    title={isListening ? "Dinlemeyi durdur" : "Sesli soru sor"}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                )}
                
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4"
                  aria-label="Mesaj gönder"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Voice feature hint */}
              {speechSupported && !isListening && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  🎤 Mikrofona basarak sesli soru sorabilirsiniz
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
