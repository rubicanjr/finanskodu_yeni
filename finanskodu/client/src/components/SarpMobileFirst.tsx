/*
  DESIGN: Sarp Mobile-First Edition
  
  FEATURES:
  1. Welcome Overlay - %100 mobil ses garantisi
  2. 2D GIF Avatar with Voice-Reactive Pulse animation
  3. Genişletilmiş bilgi tabanı (tüm yatırım araçları)
  4. Turkish Male Voice (pitch=0.9, rate=0.95)
  5. SPK/BDDK compliant disclaimer
  6. Mobile keyboard-aware layout
*/

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Mic, MicOff, X, MessageCircle } from "lucide-react";

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

// Avatar GIF URL
const SARP_AVATAR_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/sarp-mobile-avatar_7c9f2a4d.webp";
const SARP_AVATAR_AVIF = "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku/sarp-mobile-avatar_fcd9e1e7.avif";

// Knowledge Base - Comprehensive (NO "I DON'T KNOW")
const DISCLAIMER = "\n\nBunlar piyasa yorumudur, yatırım tavsiyesi değildir.";
const VOICE_DISCLAIMER = "Bunlar piyasa yorumudur, yatırım tavsiyesi değildir.";

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
      text: `Kripto paralar, blockchain teknolojisi üzerine kurulu dijital varlıklardır. Bitcoin piyasa hakimiyetiyle öncü konumunu korurken, Ethereum akıllı kontratlarıyla ekosistem lideridir. Yüksek volatilite nedeniyle portföyün küçük bir bölümünde tutulması ve soğuk cüzdan kullanılması önerilir. Türkiye'de ödeme aracı olarak kullanımı yasaktır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Altın
  if (lowerQuery.includes("altın") || lowerQuery.includes("gold") || lowerQuery.includes("ons")) {
    return {
      text: `Altın, binlerce yıldır değer saklama aracı olarak kabul görmektedir. Enflasyona karşı koruma ve portföy çeşitlendirmesi için tercih edilir. Gram altın, çeyrek altın, altın hesabı veya altın fonları arasında seçim yaparken likidite, saklama maliyeti ve vergi avantajlarını değerlendirin. Küresel belirsizliklerde genellikle güvenli liman olarak talep görür.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Gümüş
  if (lowerQuery.includes("gümüş") || lowerQuery.includes("silver")) {
    return {
      text: `Gümüş, hem değerli metal hem de endüstriyel metal özelliği taşır. Altına göre daha volatil olmakla birlikte, altın/gümüş oranı tarihsel ortalamaların üzerindeyken cazip olabilir. Güneş panelleri ve elektronik sektöründeki talep, gümüşün endüstriyel değerini artırmaktadır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Borsa / Hisse
  if (lowerQuery.includes("borsa") || lowerQuery.includes("hisse") || lowerQuery.includes("bist") || lowerQuery.includes("endeks")) {
    return {
      text: `Borsa yatırımı, şirketlere ortak olarak uzun vadeli değer artışından faydalanma imkanı sunar. BIST-100 endeksi Türkiye'nin en büyük 100 şirketini temsil eder. Temel analiz ve teknik analizi birlikte kullanmak, kademeli alım stratejisi uygulamak ve duygusal kararlardan kaçınmak başarı için kritiktir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Fon
  if (lowerQuery.includes("fon") || lowerQuery.includes("yatırım fonu") || lowerQuery.includes("emeklilik")) {
    return {
      text: `Yatırım fonları, profesyonel yönetim ve çeşitlendirme avantajı sunar. Hisse senedi fonları, tahvil fonları, karma fonlar ve para piyasası fonları farklı risk-getiri profillerine hitap eder. BES fonları vergi avantajı sağlarken, uzun vadeli birikim için idealdir. Fon seçiminde yönetim ücreti ve geçmiş performansı inceleyin.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Gayrimenkul
  if (lowerQuery.includes("gayrimenkul") || lowerQuery.includes("ev") || lowerQuery.includes("konut") || lowerQuery.includes("arsa") || lowerQuery.includes("emlak")) {
    return {
      text: `Gayrimenkul, somut bir varlık olarak enflasyona karşı koruma ve kira geliri potansiyeli sunar. Konum, altyapı projeleri ve demografik trendler değeri belirler. GYO'lar (Gayrimenkul Yatırım Ortaklıkları) düşük sermayeyle gayrimenkul sektörüne yatırım imkanı sağlar. Likidite düşüklüğü ve bakım maliyetlerini göz önünde bulundurun.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Döviz / Forex
  if (lowerQuery.includes("dolar") || lowerQuery.includes("euro") || lowerQuery.includes("döviz") || lowerQuery.includes("forex") || lowerQuery.includes("kur")) {
    return {
      text: `Döviz yatırımı, TL'nin değer kaybına karşı koruma sağlayabilir. Dolar ve Euro en likit para birimleridir. Forex piyasası 24 saat açıktır ve kaldıraçlı işlem imkanı sunar, ancak yüksek risk içerir. Merkez bankası faiz kararları ve enflasyon verileri kur hareketlerini etkileyen temel faktörlerdir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Faiz / Mevduat
  if (lowerQuery.includes("faiz") || lowerQuery.includes("mevduat") || lowerQuery.includes("vadeli")) {
    return {
      text: `Vadeli mevduat, düşük riskli sabit getiri sunar. Merkez Bankası politika faizi, mevduat faizlerini doğrudan etkiler. KKM (Kur Korumalı Mevduat) döviz kuru artışına karşı koruma sağlar. Enflasyonun üzerinde reel getiri elde etmek için faiz oranlarını yakından takip edin.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Tahvil / Bono
  if (lowerQuery.includes("tahvil") || lowerQuery.includes("bono") || lowerQuery.includes("hazine")) {
    return {
      text: `Devlet tahvilleri ve hazine bonoları, düşük riskli sabit getirili yatırım araçlarıdır. Vade sonunda anapara ve faiz garantisi sunar. Faiz oranları düştüğünde tahvil fiyatları yükselir. Eurobond'lar döviz cinsinden getiri sağlarken, kur riski içermez.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // ABD Borsası
  if (lowerQuery.includes("abd") || lowerQuery.includes("nasdaq") || lowerQuery.includes("s&p") || lowerQuery.includes("amerika") || lowerQuery.includes("dow")) {
    return {
      text: `ABD borsaları, dünyanın en büyük ve en likit piyasalarıdır. Türk aracı kurumlar veya ETF'ler üzerinden erişim mümkündür. NASDAQ teknoloji ağırlıklıyken, S&P 500 geniş piyasayı temsil eder. Kritik uyarı: Yurt dışı hisse gelirleri Türkiye'de beyana tabidir ve vergi yükümlülüğü doğurur.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Enflasyon / Kriz
  if (lowerQuery.includes("enflasyon") || lowerQuery.includes("kriz") || lowerQuery.includes("ekonomi")) {
    return {
      text: `Yüksek enflasyon dönemlerinde reel değer koruması kritiktir. Enflasyona endeksli tahviller, altın ve gayrimenkul koruma sağlayabilir. Kriz dönemlerinde nakit pozisyonu ve çeşitlendirme önem kazanır. Panik satışlarından kaçınmak ve uzun vadeli stratejiyi korumak başarının anahtarıdır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Portföy
  if (lowerQuery.includes("portföy") || lowerQuery.includes("çeşitlendirme") || lowerQuery.includes("strateji")) {
    return {
      text: `Portföy çeşitlendirmesi, riski dağıtmanın en etkili yoludur. Farklı varlık sınıfları (hisse, tahvil, altın, gayrimenkul) ve coğrafyalar arasında dağılım yapın. Risk toleransınıza göre agresif, dengeli veya muhafazakar portföy oluşturabilirsiniz. Düzenli rebalancing performansı optimize eder.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Selamlama
  if (lowerQuery.includes("sarp") || lowerQuery.includes("merhaba") || lowerQuery.includes("selam") || lowerQuery.includes("nasılsın")) {
    return {
      text: `Merhaba! Ben Sarp, Finans Kodu'nun yapay zeka destekli finans asistanıyım. Kripto, altın, borsa, fon, gayrimenkul, döviz ve daha fazlası hakkında size piyasa görüşü sunabilirim. Hangi konuda yardımcı olabilirim?`,
      isInvestmentRelated: false
    };
  }
  
  // Teşekkür
  if (lowerQuery.includes("teşekkür") || lowerQuery.includes("sağol") || lowerQuery.includes("eyvallah")) {
    return {
      text: `Rica ederim! Başka bir sorunuz olursa her zaman buradayım. Finansın sarp yollarında rotanız zirve olsun!`,
      isInvestmentRelated: false
    };
  }
  
  // Default - Genel bilgi (NEVER say "I don't know")
  return {
    text: `Bu konuda size genel bir perspektif sunayım. Finansal kararlar alırken risk toleransınızı, yatırım vadenizi ve likidite ihtiyacınızı değerlendirmeniz önemlidir. Çeşitlendirme her zaman akıllıca bir stratejidir. Spesifik bir yatırım aracı hakkında sormak ister misiniz? Kripto, altın, borsa, fon, gayrimenkul veya döviz konularında detaylı bilgi verebilirim.${DISCLAIMER}`,
    isInvestmentRelated: true
  };
};

// Audio Context for mobile unlock
let globalAudioContext: AudioContext | null = null;

const unlockAudioContext = (): boolean => {
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
    
    return true;
  } catch {
    return false;
  }
};

// Main Component
export default function SarpMobileFirst() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [maleVoice, setMaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const pulseIntervalRef = useRef<number | null>(null);

  // Initialize Speech APIs
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasSpeechRecognition = !!SpeechRecognitionAPI;
    const hasSpeechSynthesis = "speechSynthesis" in window;
    
    setSpeechSupported(hasSpeechRecognition && hasSpeechSynthesis);
    
    if (hasSpeechSynthesis) {
      synthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        if (voices.length === 0) return false;
        
        // Find Turkish male voice
        const turkishVoices = voices.filter(v => v.lang.startsWith("tr"));
        let selectedVoice = turkishVoices[0] || voices[0];
        
        // Prefer male voices
        const maleKeywords = ["erkek", "male", "mehmet"];
        for (const keyword of maleKeywords) {
          const found = turkishVoices.find(v => v.name.toLowerCase().includes(keyword));
          if (found) {
            selectedVoice = found;
            break;
          }
        }
        
        setMaleVoice(selectedVoice);
        return true;
      };
      
      if (!loadVoices()) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
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
          setTranscript(finalTranscript);
          handleUserQuery(finalTranscript);
        } else if (interimTranscript) {
          setTranscript(interimTranscript);
        }
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        setIsThinking(false);
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

  // Voice-Reactive Pulse Animation
  const startPulseAnimation = useCallback(() => {
    if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
    
    pulseIntervalRef.current = window.setInterval(() => {
      // Simulate voice amplitude
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

  // Handle user query
  const handleUserQuery = useCallback((query: string) => {
    setIsListening(false);
    setIsThinking(true);
    
    setTimeout(() => {
      const { text, isInvestmentRelated } = getFinancialResponse(query);
      setResponse(text);
      setShowResponse(true);
      setIsThinking(false);
      
      speakText(text, isInvestmentRelated);
    }, 800);
  }, []);

  // Text-to-Speech with MALE VOICE (pitch=0.9, rate=0.95)
  const speakText = useCallback((text: string, isInvestmentRelated: boolean) => {
    if (!synthRef.current || !ttsEnabled) {
      setTimeout(() => setShowResponse(false), 5000);
      return;
    }
    
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
    
    // Authoritative male voice settings
    utterance.pitch = 0.9;
    utterance.rate = 1.25;
    utterance.volume = 1.0;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      startPulseAnimation();
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      stopPulseAnimation();
      setTimeout(() => setShowResponse(false), 3000);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      stopPulseAnimation();
    };
    
    synthRef.current.speak(utterance);
  }, [ttsEnabled, maleVoice, startPulseAnimation, stopPulseAnimation]);

  // Welcome overlay start handler - CRITICAL for mobile audio
  const handleStart = useCallback(() => {
    // Unlock audio context FIRST
    unlockAudioContext();
    
    // Warm up speechSynthesis
    if ("speechSynthesis" in window) {
      const warmUp = new SpeechSynthesisUtterance("");
      warmUp.volume = 0;
      window.speechSynthesis.speak(warmUp);
    }
    
    setShowWelcome(false);
    setIsOpen(true);
    
    // Speak intro message after a short delay
    setTimeout(() => {
      speakText(INTRO_MESSAGE, false);
      setResponse(INTRO_MESSAGE);
      setShowResponse(true);
    }, 500);
  }, [speakText]);

  // Handle avatar click
  const handleAvatarClick = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }
    
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
        setTranscript("");
        setShowResponse(false);
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  }, [isOpen, speechSupported, isListening, isSpeaking, stopPulseAnimation]);

  return (
    <>
      {/* WELCOME OVERLAY - Critical for mobile audio unlock */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-6"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.3) 0%, transparent 50%),
                                  radial-gradient(circle at 75% 75%, rgba(0, 212, 255, 0.2) 0%, transparent 50%)`
              }} />
            </div>
            
            {/* Avatar Preview */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative mb-8"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl shadow-primary/30">
                <picture>
                  <source srcSet={SARP_AVATAR_AVIF} type="image/avif" />
                  <source srcSet={SARP_AVATAR_URL} type="image/webp" />
                  <img
                    src={SARP_AVATAR_URL}
                    alt="Sarp Avatar"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="128"
                    height="128"
                  />
                </picture>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary/90 rounded-full">
                <span className="text-sm font-bold text-white">SARP</span>
              </div>
            </motion.div>
            
            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
            >
              Finansal Asistan <span className="text-primary">Sarp</span>
            </motion.h1>
            
            {/* Slogan */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/70 text-center mb-8 max-w-md"
            >
              Finansın sarp yollarında, rotanız zirve.
            </motion.p>
            
            {/* Features */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {["Kripto", "Altın", "Borsa", "Fon", "Gayrimenkul", "Döviz"].map((item) => (
                <span key={item} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                  {item}
                </span>
              ))}
            </motion.div>
            
            {/* START BUTTON - Critical for audio unlock */}
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-10 py-4 bg-gradient-to-r from-primary to-cyan-400 rounded-full text-xl font-bold text-white shadow-xl shadow-primary/40 flex items-center gap-3"
            >
              <Mic className="w-6 h-6" />
              BAŞLAT / KONUŞ
            </motion.button>
            
            {/* Hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-sm text-white/50 text-center"
            >
              Sesli asistanı başlatmak için butona dokunun
            </motion.p>
            
            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-amber-500/20 rounded-lg max-w-md"
            >
              <p className="text-xs text-amber-400 text-center">
                Sarp bir yapay zekadır. Sunduğu bilgiler yatırım tavsiyesi niteliği taşımaz.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN AVATAR INTERFACE */}
      {!showWelcome && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          {/* Collapsed State - Avatar Button */}
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform overflow-hidden border-2 border-primary/50"
            >
              <picture>
                <source srcSet={SARP_AVATAR_AVIF} type="image/avif" />
                <source srcSet={SARP_AVATAR_URL} type="image/webp" />
                <img
                  src={SARP_AVATAR_URL}
                  alt="Sarp"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="64"
                  height="64"
                />
              </picture>
            </motion.button>
          )}

          {/* Expanded State - Chat Interface */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="relative"
              >
                {/* Avatar Container with Voice-Reactive Pulse */}
                <div 
                  className="relative w-[180px] h-[180px] cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      boxShadow: isSpeaking 
                        ? `0 0 ${30 + pulseIntensity * 40}px ${10 + pulseIntensity * 20}px rgba(0, 212, 255, ${0.3 + pulseIntensity * 0.4})`
                        : isListening
                        ? "0 0 30px 10px rgba(239, 68, 68, 0.4)"
                        : "0 0 20px 5px rgba(0, 212, 255, 0.2)"
                    }}
                    transition={{ duration: 0.1 }}
                    className="absolute inset-2 rounded-full"
                  />
                  
                  {/* Avatar Image with Pulse Scale */}
                  <motion.div
                    animate={{
                      scale: isSpeaking ? 1 + pulseIntensity * 0.05 : 1
                    }}
                    transition={{ duration: 0.1 }}
                    className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/50 bg-slate-900"
                  >
                    <picture>
                      <source srcSet={SARP_AVATAR_AVIF} type="image/avif" />
                      <source srcSet={SARP_AVATAR_URL} type="image/webp" />
                      <img
                        src={SARP_AVATAR_URL}
                        alt="Sarp Avatar"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width="180"
                        height="180"
                      />
                    </picture>
                    
                    {/* Listening Overlay */}
                    {isListening && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse" />
                      </div>
                    )}
                    
                    {/* Thinking Overlay */}
                    {isThinking && (
                      <div className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Status Badge */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/90 backdrop-blur-sm rounded-full border border-primary/50 flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">Sarp</span>
                  {isListening && (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs text-red-400">Dinliyor</span>
                    </>
                  )}
                  {isThinking && (
                    <>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-xs text-yellow-400">Düşünüyor</span>
                    </>
                  )}
                  {isSpeaking && (
                    <>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-xs text-primary">Konuşuyor</span>
                    </>
                  )}
                  {!isListening && !isThinking && !isSpeaking && (
                    <span className="text-xs text-white/60">Tıkla & Konuş</span>
                  )}
                </div>

                {/* Controls */}
                <div className="absolute top-0 right-0 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTtsEnabled(!ttsEnabled);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      ttsEnabled ? "bg-primary/40 text-primary" : "bg-white/15 text-white/50"
                    }`}
                  >
                    {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="p-2 rounded-full bg-white/15 text-white/50 hover:bg-white/25"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mic Status */}
                <div className="absolute top-0 left-0 p-2 bg-black/60 rounded-full">
                  {isListening ? (
                    <Mic className="w-4 h-4 text-red-500 animate-pulse" />
                  ) : (
                    <MicOff className="w-4 h-4 text-white/50" />
                  )}
                </div>

                {/* Legal Disclaimer */}
                <div className="mt-3 px-2 py-1 bg-amber-500/20 rounded-lg text-center max-w-[180px]">
                  <p className="text-[8px] text-amber-400 leading-tight">
                    Sarp bir yapay zekadır, Yatırım Tavsiyesi Vermez.
                  </p>
                </div>

                {/* Transcript */}
                <AnimatePresence>
                  {(isListening || transcript) && !showResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -top-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/95 rounded-xl border border-white/20 max-w-[200px]"
                    >
                      {isListening && !transcript && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-sm text-white">Dinliyorum...</span>
                        </div>
                      )}
                      {transcript && (
                        <p className="text-sm text-white/90 line-clamp-2">{transcript}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Response Bubble */}
                <AnimatePresence>
                  {showResponse && response && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="absolute bottom-[60px] right-[190px] w-[300px] max-h-[250px] overflow-y-auto p-4 bg-black/95 backdrop-blur-xl rounded-xl border border-primary/40 shadow-xl"
                    >
                      <p className="text-sm text-white leading-relaxed whitespace-pre-line">{response}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Chat Button (when closed) */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
            >
              <MessageCircle className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}
