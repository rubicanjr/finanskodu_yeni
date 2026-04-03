/*
  DESIGN: Sarp Floating Chat Widget
  
  FEATURES:
  1. Floating button (bottom-right corner)
  2. Audio unlock on widget click (NOT full-screen overlay)
  3. Expandable chat window (350px desktop, 90% mobile)
  4. Voice-Reactive Pulse animation
  5. Turkish Male Voice (pitch=0.9, rate=0.95)
  6. SPK/BDDK compliant disclaimer
*/

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Mic, MicOff, X, MessageCircle, Send } from "lucide-react";

// Type definitions
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

// Avatar URL
const SARP_AVATAR_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/sarp-mobile-avatar_7c9f2a4d.webp";
const SARP_AVATAR_AVIF = "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/sarp-mobile-avatar_fcd9e1e7.avif";

// Knowledge Base - Disclaimer is ONLY added programmatically in TTS, NOT in text responses
// This prevents double disclaimer issue
const VOICE_DISCLAIMER = "Yatırım tavsiyesi değildir.";
const INTRO_MESSAGE = "Merhaba, ben Sarp. Finansın sarp yollarında, rotanız zirve. Size nasıl yardımcı olabilirim?";

type ResponseType = {
  text: string;
  isInvestmentRelated: boolean;
};

const getFinancialResponse = (query: string): ResponseType => {
  const lowerQuery = query.toLowerCase();
  
  // Kripto
  if (lowerQuery.includes("kripto") || lowerQuery.includes("bitcoin") || lowerQuery.includes("ethereum") || lowerQuery.includes("btc") || lowerQuery.includes("eth")) {
    return {
      text: `Kripto paralar, blockchain teknolojisi üzerine kurulu dijital varlıklardır. Bitcoin piyasa hakimiyetiyle öncü konumunu korurken, Ethereum akıllı kontratlarıyla ekosistem lideridir. Yüksek volatilite nedeniyle portföyün küçük bir bölümünde tutulması önerilir.`,
      isInvestmentRelated: true
    };
  }
  
  // Altın
  if (lowerQuery.includes("altın") || lowerQuery.includes("gold") || lowerQuery.includes("ons")) {
    return {
      text: `Altın, binlerce yıldır değer saklama aracı olarak kabul görmektedir. Enflasyona karşı koruma ve portföy çeşitlendirmesi için tercih edilir. Gram altın, çeyrek altın veya altın fonları arasında seçim yapabilirsiniz.`,
      isInvestmentRelated: true
    };
  }
  
  // Gümüş
  if (lowerQuery.includes("gümüş") || lowerQuery.includes("silver")) {
    return {
      text: `Gümüş, hem değerli metal hem de endüstriyel metal özelliği taşır. Altına göre daha volatil olmakla birlikte, güneş panelleri ve elektronik sektöründeki talep değerini artırmaktadır.`,
      isInvestmentRelated: true
    };
  }
  
  // Borsa / Hisse
  if (lowerQuery.includes("borsa") || lowerQuery.includes("hisse") || lowerQuery.includes("bist") || lowerQuery.includes("endeks")) {
    return {
      text: `Borsa yatırımı, şirketlere ortak olarak uzun vadeli değer artışından faydalanma imkanı sunar. BIST-100 endeksi Türkiye'nin en büyük 100 şirketini temsil eder. Temel ve teknik analizi birlikte kullanmak başarı için kritiktir.`,
      isInvestmentRelated: true
    };
  }
  
  // Fon
  if (lowerQuery.includes("fon") || lowerQuery.includes("yatırım fonu") || lowerQuery.includes("emeklilik")) {
    return {
      text: `Yatırım fonları, profesyonel yönetim ve çeşitlendirme avantajı sunar. BES fonları vergi avantajı sağlarken, uzun vadeli birikim için idealdir. Fon seçiminde yönetim ücreti ve geçmiş performansı inceleyin.`,
      isInvestmentRelated: true
    };
  }
  
  // Gayrimenkul
  if (lowerQuery.includes("gayrimenkul") || lowerQuery.includes("ev") || lowerQuery.includes("konut") || lowerQuery.includes("arsa")) {
    return {
      text: `Gayrimenkul, somut bir varlık olarak enflasyona karşı koruma ve kira geliri potansiyeli sunar. GYO'lar düşük sermayeyle gayrimenkul sektörüne yatırım imkanı sağlar.`,
      isInvestmentRelated: true
    };
  }
  
  // Döviz / Forex
  if (lowerQuery.includes("dolar") || lowerQuery.includes("euro") || lowerQuery.includes("döviz") || lowerQuery.includes("forex") || lowerQuery.includes("kur")) {
    return {
      text: `Döviz yatırımı, TL'nin değer kaybına karşı koruma sağlayabilir. Forex piyasası 24 saat açıktır ve kaldıraçlı işlem imkanı sunar, ancak yüksek risk içerir.`,
      isInvestmentRelated: true
    };
  }
  
  // Faiz / Mevduat
  if (lowerQuery.includes("faiz") || lowerQuery.includes("mevduat") || lowerQuery.includes("vadeli")) {
    return {
      text: `Vadeli mevduat, düşük riskli sabit getiri sunar. Merkez Bankası politika faizi, mevduat faizlerini doğrudan etkiler. Enflasyonun üzerinde reel getiri için faiz oranlarını takip edin.`,
      isInvestmentRelated: true
    };
  }
  
  // ABD Borsası
  if (lowerQuery.includes("abd") || lowerQuery.includes("nasdaq") || lowerQuery.includes("s&p") || lowerQuery.includes("amerika")) {
    return {
      text: `ABD borsaları, dünyanın en büyük ve en likit piyasalarıdır. Kritik uyarı: Yurt dışı hisse gelirleri Türkiye'de beyana tabidir ve vergi yükümlülüğü doğurur.`,
      isInvestmentRelated: true
    };
  }
  
  // Enflasyon / Kriz
  if (lowerQuery.includes("enflasyon") || lowerQuery.includes("kriz") || lowerQuery.includes("ekonomi")) {
    return {
      text: `Yüksek enflasyon dönemlerinde reel değer koruması kritiktir. Enflasyona endeksli tahviller, altın ve gayrimenkul koruma sağlayabilir. Panik satışlarından kaçının.`,
      isInvestmentRelated: true
    };
  }
  
  // Selamlama
  if (lowerQuery.includes("sarp") || lowerQuery.includes("merhaba") || lowerQuery.includes("selam") || lowerQuery.includes("nasılsın")) {
    return {
      text: `Merhaba! Ben Sarp, Finans Kodu'nun yapay zeka destekli finans asistanıyım. Kripto, altın, borsa, fon, gayrimenkul, döviz hakkında size piyasa görüşü sunabilirim.`,
      isInvestmentRelated: false
    };
  }
  
  // Teşekkür
  if (lowerQuery.includes("teşekkür") || lowerQuery.includes("sağol")) {
    return {
      text: `Rica ederim! Başka bir sorunuz olursa her zaman buradayım. Finansın sarp yollarında rotanız zirve olsun!`,
      isInvestmentRelated: false
    };
  }
  
  // Default
  return {
    text: `Finansal kararlar alırken risk toleransınızı, yatırım vadenizi ve likidite ihtiyacınızı değerlendirin. Çeşitlendirme her zaman akıllıca bir stratejidir. Kripto, altın, borsa, fon, gayrimenkul veya döviz hakkında detaylı bilgi verebilirim.`,
    isInvestmentRelated: true
  };
};

// Audio Context for mobile unlock
let globalAudioContext: AudioContext | null = null;
let audioUnlocked = false;

const unlockAudioContext = (): boolean => {
  if (audioUnlocked) return true;
  
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!globalAudioContext) {
      globalAudioContext = new AudioContextClass();
    }
    
    if (globalAudioContext.state === "suspended") {
      globalAudioContext.resume();
    }
    
    // Play silent buffer to unlock speakers
    const buffer = globalAudioContext.createBuffer(1, 1, 22050);
    const source = globalAudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(globalAudioContext.destination);
    source.start(0);
    
    audioUnlocked = true;
    return true;
  } catch {
    return false;
  }
};

// Message type
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Main Component
export default function SarpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [maleVoice, setMaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isNativeMaleVoice, setIsNativeMaleVoice] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [hasGreeted, setHasGreeted] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const pulseIntervalRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Speech APIs with iOS-specific Adaptive Pitch algorithm
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasSpeechRecognition = !!SpeechRecognitionAPI;
    const hasSpeechSynthesis = "speechSynthesis" in window;
    
    setSpeechSupported(hasSpeechRecognition && hasSpeechSynthesis);
    
    if (hasSpeechSynthesis) {
      synthRef.current = window.speechSynthesis;
      
      // iOS-specific Adaptive Pitch Voice Selection Algorithm
      const selectMaleVoice = (): { voice: SpeechSynthesisVoice | null; isNativeMale: boolean } => {
        const voices = synthRef.current?.getVoices() || [];
        if (voices.length === 0) return { voice: null, isNativeMale: false };
        
        // Filter Turkish voices
        const turkishVoices = voices.filter(v => 
          v.lang.startsWith("tr") || v.lang === "tr-TR"
        );
        
        // Priority 1: Apple Male voices (Cem, Alper, Murat)
        const appleMaleNames = ["cem", "alper", "murat"];
        for (const name of appleMaleNames) {
          const found = turkishVoices.find(v => 
            v.name.toLowerCase().includes(name)
          );
          if (found) {
            console.log("[Sarp Voice] Found Apple male voice:", found.name);
            return { voice: found, isNativeMale: true };
          }
        }
        
        // Priority 2: Explicit Male/Erkek keywords + Google Türkçe erkek
        const maleKeywords = ["male", "erkek", "mehmet", "ahmet", "mustafa", "ali", "turkish male", "tr-tr-erkek"];
        for (const keyword of maleKeywords) {
          const found = turkishVoices.find(v => 
            v.name.toLowerCase().includes(keyword)
          );
          if (found) {
            console.log("[Sarp Voice] Found explicit male voice:", found.name);
            return { voice: found, isNativeMale: true };
          }
        }
        
        // Priority 3: Google voices (often neutral/male on Android)
        const googleVoice = turkishVoices.find(v => 
          v.name.toLowerCase().includes("google")
        );
        if (googleVoice) {
          console.log("[Sarp Voice] Using Google voice:", googleVoice.name);
          return { voice: googleVoice, isNativeMale: true };
        }
        
        // Priority 4: Any Turkish voice (will use AGGRESSIVE pitch hack for iOS)
        // This is likely "Yelda" on iOS - a female voice
        if (turkishVoices.length > 0) {
          const voice = turkishVoices[0];
          const isFemale = ["yelda", "samantha", "female", "kadın"].some(
            name => voice.name.toLowerCase().includes(name)
          );
          console.log(`[Sarp Voice] Fallback to Turkish voice: ${voice.name} (Female: ${isFemale})`);
          return { voice, isNativeMale: !isFemale };
        }
        
        // Priority 5: Any available voice
        console.log("[Sarp Voice] No Turkish voice, using default:", voices[0]?.name);
        return { voice: voices[0] || null, isNativeMale: false };
      };
      
      const loadVoices = () => {
        const result = selectMaleVoice();
        if (result.voice) {
          setMaleVoice(result.voice);
          setIsNativeMaleVoice(result.isNativeMale);
          console.log(`[Sarp Voice] Selected: ${result.voice.name}, Native Male: ${result.isNativeMale}`);
          return true;
        }
        return false;
      };
      
      // Try immediately and on voices changed
      if (!loadVoices()) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      // Retry after delay for mobile devices (iOS loads voices async)
      setTimeout(loadVoices, 500);
      setTimeout(loadVoices, 1000);
      setTimeout(loadVoices, 2000);
    }
    
    if (hasSpeechRecognition) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "tr-TR";
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleUserMessage(transcript);
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
      if (recognitionRef.current) recognitionRef.current.abort();
      if (synthRef.current) synthRef.current.cancel();
      if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
    };
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Voice-Reactive Pulse Animation
  const startPulseAnimation = useCallback(() => {
    if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
    
    pulseIntervalRef.current = window.setInterval(() => {
      const amplitude = Math.random() * 0.5 + 0.5;
      setPulseIntensity(amplitude);
    }, 100);
  }, []);

  const stopPulseAnimation = useCallback(() => {
    if (pulseIntervalRef.current) {
      clearInterval(pulseIntervalRef.current);
      pulseIntervalRef.current = null;
    }
    setPulseIntensity(0);
  }, []);

  // Handle user message
  const handleUserMessage = useCallback((text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsThinking(true);
    setInputText("");
    
    setTimeout(() => {
      const { text: responseText, isInvestmentRelated } = getFinancialResponse(text);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsThinking(false);
      
      speakText(responseText, isInvestmentRelated);
    }, 800);
  }, []);

  // Text-to-Speech
  const speakText = useCallback((text: string, isInvestmentRelated: boolean) => {
    if (!synthRef.current || !ttsEnabled) return;
    
    synthRef.current.cancel();
    
    const processedText = text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/\n+/g, ". ");
    
    const fullText = isInvestmentRelated 
      ? `${processedText} ${VOICE_DISCLAIMER}`
      : processedText;
    
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "tr-TR";
    
    if (maleVoice) {
      utterance.voice = maleVoice;
    }
    
    // ADAPTIVE PITCH: iOS-specific aggressive pitch shifting
    // Strategy from pasted_content_10.txt - pitch=0.55, rate=0.88 for iOS
    if (isNativeMaleVoice) {
      // Native male voice - use natural settings (slightly deep)
      utterance.pitch = 0.95;  // Hafif derin (doğal erkek tonu)
      utterance.rate = 1.25;
      console.log("[Sarp Voice] ✅ Native male voice - natural pitch 0.95");
    } else {
      // iOS/Female voice - AGGRESSIVE pitch fix (deeper than before)
      utterance.pitch = 0.55;  // 0.6'dan daha düşük (daha derin)
      utterance.rate = 1.25;
      console.log("[Sarp Voice] ⚠️ iOS Mode - aggressive pitch 0.55, rate 0.88");
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
    
    synthRef.current.speak(utterance);
  }, [ttsEnabled, maleVoice, isNativeMaleVoice, startPulseAnimation, stopPulseAnimation]);

  // Open widget and unlock audio
  const handleOpenWidget = useCallback(() => {
    // CRITICAL: Unlock audio on widget click
    unlockAudioContext();
    
    // Warm up speechSynthesis
    if ("speechSynthesis" in window) {
      const warmUp = new SpeechSynthesisUtterance("");
      warmUp.volume = 0;
      window.speechSynthesis.speak(warmUp);
    }
    
    setIsOpen(true);
    
    // Play intro message on first open
    if (!hasGreeted) {
      setHasGreeted(true);
      
      const introMessage: Message = {
        id: "intro",
        role: "assistant",
        content: INTRO_MESSAGE
      };
      
      setMessages([introMessage]);
      
      setTimeout(() => {
        speakText(INTRO_MESSAGE, false);
      }, 300);
    }
  }, [hasGreeted, speakText]);

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (!speechSupported || !recognitionRef.current) return;
    
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      stopPulseAnimation();
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  }, [speechSupported, isListening, isSpeaking, stopPulseAnimation]);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleUserMessage(inputText.trim());
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {/* Collapsed State - Floating Avatar Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenWidget}
          className="relative w-16 h-16 rounded-full shadow-2xl shadow-primary/40 overflow-hidden border-2 border-primary/60"
        >
          {/* Pulse animation when idle */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-primary/30 rounded-full"
          />
          
          <picture>
            <source srcSet={SARP_AVATAR_AVIF} type="image/avif" />
            <source srcSet={SARP_AVATAR_URL} type="image/webp" />
            <img
              src={SARP_AVATAR_URL}
              alt="Sarp"
              className="relative w-full h-full object-cover"
              decoding="async"
              width="64"
              height="64"
            />
          </picture>
          
          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
        </motion.button>
      )}

      {/* Expanded State - Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-[350px] max-w-[90vw] h-[500px] max-h-[80vh] bg-slate-950 rounded-2xl border border-primary/30 shadow-2xl shadow-primary/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-slate-900/50">
              {/* Avatar with Voice-Reactive Glow */}
              <motion.div
                animate={{
                  boxShadow: isSpeaking 
                    ? `0 0 ${15 + pulseIntensity * 25}px ${5 + pulseIntensity * 10}px rgba(0, 212, 255, ${0.4 + pulseIntensity * 0.4})`
                    : "0 0 10px 2px rgba(0, 212, 255, 0.2)"
                }}
                transition={{ duration: 0.1 }}
                className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50"
              >
                <picture>
                  <source srcSet={SARP_AVATAR_AVIF} type="image/avif" />
                  <source srcSet={SARP_AVATAR_URL} type="image/webp" />
                  <motion.img
                    src={SARP_AVATAR_URL}
                    alt="Sarp"
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isSpeaking ? 1 + pulseIntensity * 0.08 : 1
                    }}
                    transition={{ duration: 0.1 }}
                    decoding="async"
                    width="48"
                    height="48"
                  />
                </picture>
              </motion.div>
              
              <div className="flex-1">
                <h3 className="font-bold text-white">Sarp</h3>
                <p className="text-xs text-white/60">
                  {isSpeaking ? "Konuşuyor..." : isListening ? "Dinliyor..." : isThinking ? "Düşünüyor..." : "Finans Asistanı"}
                </p>
              </div>
              
              {/* Controls */}
              <button
                onClick={() => setTtsEnabled(!ttsEnabled)}
                className={`p-2 rounded-full transition-colors ${
                  ttsEnabled ? "bg-primary/30 text-primary" : "bg-white/10 text-white/50"
                }`}
              >
                {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white/50 hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                      message.role === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-white/10 text-white/90 rounded-bl-md"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Disclaimer */}
            <div className="px-4 py-1 bg-amber-500/10 border-t border-amber-500/20">
              <p className="text-[10px] text-amber-400 text-center">
                Sarp bir yapay zekadır. Yatırım tavsiyesi vermez.
              </p>
            </div>
            
            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-slate-900/50">
              <div className="flex items-center gap-2">
                {/* Mic button */}
                {speechSupported && (
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-2 rounded-full transition-all ${
                      isListening 
                        ? "bg-red-500 text-white animate-pulse" 
                        : "bg-white/10 text-white/60 hover:bg-white/20"
                    }`}
                  >
                    {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                )}
                
                {/* Text input */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isListening ? "Dinliyorum..." : "Mesajınızı yazın..."}
                  disabled={isListening}
                  className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                />
                
                {/* Send button */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isListening}
                  className="p-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
