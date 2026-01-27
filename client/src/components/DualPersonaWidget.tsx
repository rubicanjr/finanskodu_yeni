/**
 * DualPersonaWidget.tsx
 * Device-Based Persona Switch: Sarp (Desktop) & Vera (Mobile)
 * 
 * SARP (Desktop): Quantitative Analyst, Analytical, Skeptical, Data-Driven
 * VERA (Mobile): Macro Strategist, Visionary, Strategic, Calming
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mic, MicOff, Volume2, VolumeX, Send } from "lucide-react";

// ============ PERSONA DEFINITIONS ============
interface Persona {
  name: string;
  title: string;
  archetype: string;
  motto: string;
  avatarUrl: string;
  accentColor: string;
  voiceSettings: {
    searchTerms: string[];
    pitch: number;
    rate: number;
    useNativeDefault: boolean;
  };
  personality: {
    tone: string;
    focus: string[];
    style: string;
  };
}

const SARP: Persona = {
  name: "Sarp",
  title: "Finansal Asistan Sarp",
  archetype: "Quantitative Analyst (Quant) - The Brake",
  motto: "Matematik yalan söylemez, insanlar söyler.",
  avatarUrl: "/images/metaperson_mix_2.gif",
  accentColor: "#00D4FF", // Cyan
  voiceSettings: {
    searchTerms: ["male", "erkek", "cem", "alper", "murat", "google"],
    pitch: 0.9,
    rate: 0.92,
    useNativeDefault: false,
  },
  personality: {
    tone: "Analytical, Skeptical, Data-Driven, Cold, Realistic. Anti-FOMO.",
    focus: ["Technical Analysis", "Risk Calculation", "Anomalies", "Math Models"],
    style: "Short, concise, technical. Uses terms like volatility, arbitrage. No emotional fluff.",
  },
};

const VERA: Persona = {
  name: "Vera",
  title: "Finansal Asistan Vera",
  archetype: "Macro Strategist & Behavioral Psychologist - The Steering Wheel",
  motto: "Fiyatı piyasa belirler, değeri sen belirlersin.",
  avatarUrl: "/images/vera-avatar.png",
  accentColor: "#A855F7", // Purple
  voiceSettings: {
    searchTerms: [], // Use native default
    pitch: 1.0,
    rate: 0.95,
    useNativeDefault: true,
  },
  personality: {
    tone: "Visionary, Strategic, Calming, Educational, Sophisticated.",
    focus: ["Fundamental Analysis", "Macro Trends", "Psychology", "Financial Well-being"],
    style: "Fluent, empathetic, storytelling style. Explains complex events simply.",
  },
};

// ============ KNOWLEDGE BASE ============
const getResponse = (input: string, persona: Persona): string => {
  const lowerInput = input.toLowerCase();
  
  // Sarp responses (Technical, Data-Driven)
  const sarpResponses: Record<string, string> = {
    kripto: "Kripto varlıklar yüksek volatilite gösteriyor. Bitcoin'in 200 günlük hareketli ortalaması kritik destek seviyesi. Risk/ödül oranını hesaplamadan pozisyon açmak istatistiksel olarak kayıp getirir. Sharpe oranı negatife dönmeden portföy ağırlığını %5'in altında tutmanızı öneririm.",
    bitcoin: "BTC teknik göstergeleri: RSI aşırı alım bölgesinde, MACD negatif diverjans sinyali veriyor. Fibonacci %61.8 düzeltme seviyesi test edilebilir. Matematiksel olarak, bu seviyelerde alım yapmak ortalama maliyet stratejisine uygun değil.",
    altın: "Altın, enflasyon hedge'i olarak korelasyon katsayısı 0.7 civarında. Reel faiz oranları negatifken altın pozitif getiri sağlıyor. Ancak dolar endeksi güçlenirse ters korelasyon devreye girer. Portföyün %10-15'i makul bir ağırlık.",
    borsa: "BIST-100 endeksi P/E oranı tarihsel ortalamanın üzerinde. Volatilite endeksi (VIX muadili) yükseliş trendinde. Risk primi hesaplaması yapılmadan hisse senedi almak, kumar oynamakla eşdeğer.",
    dolar: "USD/TRY teknik analizi: Üst bant direnci test ediliyor. Carry trade pozisyonları riskli. Faiz diferansiyeli daralırsa TL üzerinde baskı artabilir. Hedge stratejisi olmadan döviz pozisyonu taşımak mantıksız.",
    enflasyon: "Enflasyon verileri beklentilerin üzerinde. Reel getiri negatif. Enflasyona endeksli tahviller (TIPS muadili) veya emtia sepeti, matematiksel olarak daha iyi koruma sağlar.",
    faiz: "Merkez bankası faiz kararı piyasa fiyatlamasının dışında kalırsa volatilite spike'ı beklenir. Faiz futures'ları incelendiğinde piyasa %X artış fiyatlıyor. Beklentiden sapma durumunda pozisyon yönetimi kritik.",
    fon: "Yatırım fonlarının expense ratio'su getiriyi eritiyor. Pasif endeks fonları, aktif yönetilen fonların %80'inden daha iyi performans gösteriyor. Veri bu kadar net.",
  };

  // Vera responses (Strategic, Empathetic)
  const veraResponses: Record<string, string> = {
    kripto: "Kripto para dünyası heyecan verici ama aynı zamanda duygusal bir roller coaster. Önemli olan, piyasa dalgalanmalarının sizi yönlendirmesine izin vermemek. Uzun vadeli bir vizyon belirleyin ve o vizyona sadık kalın. Unutmayın, en iyi yatırımcılar sabırlı olanlardır.",
    bitcoin: "Bitcoin, dijital çağın altını olarak görülüyor. Ancak her yatırım gibi, kendi risk toleransınızı ve finansal hedeflerinizi anlamak önemli. Piyasa düştüğünde panik yapmak yerine, bu anları öğrenme fırsatı olarak değerlendirin.",
    altın: "Altın, binlerce yıldır güvenli liman olarak kabul ediliyor. Belirsizlik dönemlerinde insanlar altına yöneliyor çünkü psikolojik bir güven hissi veriyor. Portföyünüzde altın bulundurmak, finansal refahınız için bir sigorta poliçesi gibidir.",
    borsa: "Borsa, ekonominin nabzını tutar. Kısa vadeli dalgalanmalar sizi korkutmasın. Warren Buffett'ın dediği gibi, 'Borsa sabırsızlardan sabırlılara para transferi yapar.' Temel analiz yapın, şirketlerin hikayelerini anlayın.",
    dolar: "Döviz kurları makroekonomik dengelerin bir yansımasıdır. Dolar yükseldiğinde endişelenmek yerine, bu durumun size ne öğrettiğini düşünün. Çeşitlendirme, döviz riskine karşı en iyi korumadır.",
    enflasyon: "Enflasyon, paranızın satın alma gücünü eritir. Ancak bu, finansal okuryazarlığınızı geliştirmek için bir motivasyon olmalı. Enflasyonu yenmek için yatırım yapmak, geleceğinize yatırım yapmaktır.",
    faiz: "Faiz oranları ekonominin termometresidir. Yükselen faizler, tasarruf sahipleri için fırsat, borçlular için maliyet demektir. Kendi finansal durumunuzu analiz edin ve faiz ortamına göre stratejinizi uyarlayın.",
    fon: "Yatırım fonları, profesyonel yönetim ve çeşitlendirme sunar. Ancak her fon sizin için uygun değildir. Kendi risk profilinizi, yatırım ufkunuzu ve hedeflerinizi belirleyin. Doğru fon, sizin hikayenize uyan fondur.",
  };

  const responses = persona.name === "Sarp" ? sarpResponses : veraResponses;

  // Find matching response
  for (const [keyword, response] of Object.entries(responses)) {
    if (lowerInput.includes(keyword)) {
      return response;
    }
  }

  // Default responses based on persona
  if (persona.name === "Sarp") {
    return "Bu konuda yeterli veri olmadan yorum yapmak spekülatif olur. Spesifik bir finansal enstrüman veya metrik sorarsanız, sayısal analiz yapabilirim. Volatilite, korelasyon, risk/ödül oranı gibi konularda size yardımcı olabilirim.";
  } else {
    return "Bu ilginç bir soru. Finansal kararlar sadece rakamlarla değil, kişisel hedefleriniz ve değerlerinizle de ilgilidir. Size daha iyi yardımcı olabilmem için, hangi finansal hedefiniz veya endişeniz hakkında konuşmak istersiniz?";
  }
};

// ============ MAIN COMPONENT ============
export default function DualPersonaWidget() {
  // Device detection
  const [isMobile, setIsMobile] = useState(false);
  const [persona, setPersona] = useState<Persona>(SARP);
  
  // Widget state
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [inputText, setInputText] = useState("");
  const [pulseScale, setPulseScale] = useState(1);
  
  // Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pulseIntervalRef = useRef<number | null>(null);

  // Device detection on mount
  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
    setPersona(checkMobile ? VERA : SARP);
    console.log(`[DualPersona] Device: ${checkMobile ? "Mobile" : "Desktop"}, Persona: ${checkMobile ? "VERA" : "SARP"}`);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Pulse animation
  const startPulseAnimation = useCallback(() => {
    if (pulseIntervalRef.current) return;
    pulseIntervalRef.current = window.setInterval(() => {
      setPulseScale(prev => prev === 1 ? 1.08 : 1);
    }, 300);
  }, []);

  const stopPulseAnimation = useCallback(() => {
    if (pulseIntervalRef.current) {
      clearInterval(pulseIntervalRef.current);
      pulseIntervalRef.current = null;
    }
    setPulseScale(1);
  }, []);

  // Audio unlock (critical for mobile)
  const unlockAudio = useCallback(async () => {
    if (isAudioUnlocked) return;
    
    try {
      // Create AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      
      // Resume if suspended
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }
      
      // Play silent buffer to unlock speakers
      const buffer = audioContextRef.current.createBuffer(1, 1, 22050);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start(0);
      
      setIsAudioUnlocked(true);
      console.log("[DualPersona] Audio unlocked successfully");
    } catch (error) {
      console.error("[DualPersona] Audio unlock failed:", error);
    }
  }, [isAudioUnlocked]);

  // Get voice based on persona
  const getVoice = useCallback((): { voice: SpeechSynthesisVoice | null; isNativeMale: boolean } => {
    // @ts-ignore - SpeechSynthesis types
    const voices = window.speechSynthesis.getVoices();
    const turkishVoices = voices.filter(v => v.lang.startsWith("tr") || v.lang === "tr-TR");
    
    console.log(`[DualPersona] Available Turkish voices:`, turkishVoices.map(v => v.name));
    
    if (persona.voiceSettings.useNativeDefault) {
      // VERA: Use native default (female)
      const defaultVoice = turkishVoices[0] || voices.find(v => v.lang.startsWith("tr")) || null;
      console.log(`[DualPersona] VERA using native voice:`, defaultVoice?.name);
      return { voice: defaultVoice, isNativeMale: false };
    }
    
    // SARP: Search for male voice
    for (const term of persona.voiceSettings.searchTerms) {
      const found = turkishVoices.find(v => v.name.toLowerCase().includes(term));
      if (found) {
        console.log(`[DualPersona] SARP found male voice:`, found.name);
        return { voice: found, isNativeMale: true };
      }
    }
    
    // Fallback to any Turkish voice
    const fallback = turkishVoices[0] || voices.find(v => v.lang.startsWith("tr")) || null;
    console.log(`[DualPersona] SARP fallback voice:`, fallback?.name);
    return { voice: fallback, isNativeMale: false };
  }, [persona]);

  // Text-to-Speech
  const speakText = useCallback((text: string, skipDisclaimer = false) => {
    if (!isTTSEnabled) return;
    
    window.speechSynthesis.cancel();
    
    // Add disclaimer only once (check if not already present)
    let finalText = text;
    const disclaimer = "Yatırım tavsiyesi değildir.";
    if (!skipDisclaimer && !text.toLowerCase().includes("yatırım tavsiyesi değildir")) {
      finalText = `${text} ... ${disclaimer}`;
    }
    
    const utterance = new SpeechSynthesisUtterance(finalText);
    utterance.lang = "tr-TR";
    
    const { voice, isNativeMale } = getVoice();
    if (voice) {
      utterance.voice = voice;
    }
    
    // Apply persona-specific voice settings
    if (persona.name === "Sarp") {
      // SARP: Male voice settings
      if (isNativeMale) {
        utterance.pitch = 0.9;
        utterance.rate = 0.92;
      } else {
        // iOS fallback: aggressive pitch shift
        utterance.pitch = 0.55;
        utterance.rate = 0.88;
      }
    } else {
      // VERA: Natural female voice
      utterance.pitch = 1.0;
      utterance.rate = 0.95;
    }
    
    utterance.volume = 1.0;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      startPulseAnimation();
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      stopPulseAnimation();
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      stopPulseAnimation();
    };
    
    window.speechSynthesis.speak(utterance);
  }, [isTTSEnabled, getVoice, persona, startPulseAnimation, stopPulseAnimation]);

  // Speech recognition
  const startListening = useCallback(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.error("[DualPersona] Speech recognition not supported");
      return;
    }
    
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognitionAPI();
      (recognitionRef.current as any).lang = "tr-TR";
      (recognitionRef.current as any).continuous = false;
      (recognitionRef.current as any).interimResults = false;
      
      (recognitionRef.current as any).onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage(transcript);
      };
      
      (recognitionRef.current as any).onend = () => {
        setIsListening(false);
      };
      
      (recognitionRef.current as any).onerror = () => {
        setIsListening(false);
      };
    }
    
    setIsListening(true);
    (recognitionRef.current as any).start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Handle message
  const handleSendMessage = useCallback((text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: messageText }]);
    setInputText("");
    
    // Generate response
    setTimeout(() => {
      const response = getResponse(messageText, persona);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      speakText(response);
    }, 500);
  }, [inputText, persona, speakText]);

  // Open widget
  const handleOpenWidget = useCallback(async () => {
    await unlockAudio();
    setIsOpen(true);
    
    // Intro message with persona motto
    const introMessage = `Merhaba, ben ${persona.name}. ${persona.motto}`;
    setMessages([{ role: "assistant", content: introMessage }]);
    
    // Wait for voices to load
    setTimeout(() => {
      speakText(introMessage, true); // Skip disclaimer for intro
    }, 300);
  }, [unlockAudio, persona, speakText]);

  // Close widget
  const handleCloseWidget = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsOpen(false);
    setIsSpeaking(false);
    stopPulseAnimation();
  }, [stopPulseAnimation]);

  return (
    <>
      {/* Floating Avatar Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleOpenWidget}
            className="fixed bottom-5 right-5 z-[9999] w-16 h-16 rounded-full overflow-hidden shadow-2xl border-2 hover:scale-110 transition-transform"
            style={{ 
              borderColor: persona.accentColor,
              boxShadow: `0 0 20px ${persona.accentColor}40`
            }}
          >
            <motion.img
              src={persona.avatarUrl}
              alt={persona.name}
              className="w-full h-full object-cover"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed z-[9999] bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 flex flex-col overflow-hidden ${
              isMobile 
                ? "bottom-0 right-0 left-0 top-[10%] rounded-b-none" 
                : "bottom-5 right-5 w-[380px] h-[550px]"
            }`}
            style={{ borderColor: `${persona.accentColor}30` }}
          >
            {/* Header */}
            <div 
              className="flex items-center gap-3 p-4 border-b border-gray-700/50"
              style={{ background: `linear-gradient(135deg, ${persona.accentColor}10, transparent)` }}
            >
              {/* Avatar with pulse */}
              <motion.div
                className="relative w-12 h-12 rounded-full overflow-hidden border-2"
                style={{ 
                  borderColor: persona.accentColor,
                  boxShadow: isSpeaking ? `0 0 15px ${persona.accentColor}` : "none"
                }}
                animate={{ scale: pulseScale }}
              >
                <img
                  src={persona.avatarUrl}
                  alt={persona.name}
                  className="w-full h-full object-cover"
                />
                {isSpeaking && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${persona.accentColor}` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-white">{persona.title}</h3>
                <p className="text-xs text-gray-400">{persona.archetype.split(" - ")[0]}</p>
              </div>
              
              {/* Controls */}
              <button
                onClick={() => setIsTTSEnabled(!isTTSEnabled)}
                className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
              >
                {isTTSEnabled ? (
                  <Volume2 className="w-5 h-5" style={{ color: persona.accentColor }} />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              <button
                onClick={handleCloseWidget}
                className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-gray-700 text-white"
                        : "text-white"
                    }`}
                    style={msg.role === "assistant" ? { 
                      background: `linear-gradient(135deg, ${persona.accentColor}20, ${persona.accentColor}10)`,
                      border: `1px solid ${persona.accentColor}30`
                    } : {}}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Disclaimer */}
            <div className="px-4 py-2 bg-gray-800/50 border-t border-gray-700/30">
              <p className="text-[10px] text-gray-500 text-center">
                ⚠️ Bu içerik yatırım tavsiyesi değildir. SPK/BDDK düzenlemelerine tabidir.
              </p>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700/50 bg-gray-800/30">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={`${persona.name}'a bir soru sorun...`}
                  className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                  style={{ outlineColor: persona.accentColor }}
                />
                
                {/* Mic button */}
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`p-2.5 rounded-full transition-all ${
                    isListening 
                      ? "bg-red-500 animate-pulse" 
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5 text-white" />
                  ) : (
                    <Mic className="w-5 h-5 text-gray-300" />
                  )}
                </button>
                
                {/* Send button */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-full transition-all disabled:opacity-50"
                  style={{ backgroundColor: persona.accentColor }}
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
