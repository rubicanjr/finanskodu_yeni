/*
  DESIGN: Sarp GIF-Based AI Assistant - Mobile-First, Lightweight
  
  PERSONA: "Finansın sarp yollarında, rotanız zirve."
  
  FEATURES:
  1. GIF Swapping for visual states (no heavy 3D canvas)
  2. Touch-to-Unlock audio pattern for iOS/Android
  3. Native male voice with pitch=0.9, rate=0.95
  4. Click-to-Talk interaction
  5. SPK/BDDK compliant disclaimer
*/

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Mic, MicOff } from "lucide-react";

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

// GIF Assets
type GifState = 'idle' | 'talking' | 'listening' | 'thinking' | 'glad' | 'thumbsUp' | 'surprised' | 'confused' | 'ok' | 'excited';

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku";

const SARP_GIFS: Record<GifState, string> = {
  idle: `${CDN}/sarp-idle_0a38a832.webp`,
  talking: `${CDN}/sarp-talking_0565523f.webp`,
  listening: `${CDN}/sarp-listening_f39c1286.webp`,
  thinking: `${CDN}/sarp-thinking_6029ac00.webp`,
  glad: `${CDN}/sarp-glad_fc10cdac.webp`,
  thumbsUp: `${CDN}/sarp-thumbsup_86d24686.webp`,
  surprised: `${CDN}/sarp-surprised_d0f4d562.webp`,
  confused: `${CDN}/sarp-confused_ba6864f4.webp`,
  ok: `${CDN}/sarp-ok_aa5437c4.webp`,
  excited: `${CDN}/sarp-excited_229a643f.webp`,
};

// AVIF versiyonları (Chrome 85+, Firefox 93+, Safari 16+)
const SARP_GIFS_AVIF: Record<GifState, string> = {
  idle: `${CDN}/sarp-idle_c0551f7b.avif`,
  talking: `${CDN}/sarp-talking_3b608ae1.avif`,
  listening: `${CDN}/sarp-listening_9bc7af73.avif`,
  thinking: `${CDN}/sarp-thinking_82e3771c.avif`,
  glad: `${CDN}/sarp-glad_15ebda6d.avif`,
  thumbsUp: `${CDN}/sarp-thumbsup_41908526.avif`,
  surprised: `${CDN}/sarp-surprised_4dc35cf0.avif`,
  confused: `${CDN}/sarp-confused_d9ce34ed.avif`,
  ok: `${CDN}/sarp-ok_222ad8ec.avif`,
  excited: `${CDN}/sarp-excited_c305c37b.avif`,
};

// Knowledge Base & Response Logic - Sarp Persona
const DISCLAIMER = "\n\n⚠️ *Bu bir piyasa görüşüdür, yatırım tavsiyesi değildir.*";
const VOICE_DISCLAIMER = "Unutmayın, bu bir piyasa görüşüdür, yatırım tavsiyesi değildir.";

type ResponseType = {
  text: string;
  isInvestmentRelated: boolean;
  emotion: keyof typeof SARP_GIFS;
};

const getFinancialResponse = (query: string): ResponseType => {
  const lowerQuery = query.toLowerCase();
  
  // Kriz Yönetimi
  if (lowerQuery.includes("dolar") || lowerQuery.includes("enflasyon") || lowerQuery.includes("kriz") || lowerQuery.includes("panik")) {
    return {
      text: `Kriz dönemlerinde soğukkanlılık en büyük sermayedir. Döviz dalgalanmalarında panikle hareket etmek, genellikle en kötü fiyatlardan işlem yapmaya yol açar. Portföy çeşitlendirmesi ve kademeli pozisyon alma stratejisi, volatiliteye karşı en etkili kalkan olabilir.${DISCLAIMER}`,
      isInvestmentRelated: true,
      emotion: "ok"
    };
  }
  
  // Faiz Kararları
  if (lowerQuery.includes("faiz") || lowerQuery.includes("merkez bankası") || lowerQuery.includes("tcmb")) {
    return {
      text: `Merkez Bankası faiz kararları piyasaların nabzını belirler. Faiz artışı teorik olarak mevduat getirilerini yükseltirken, borsayı baskılayabilir. Ancak bu kararları tek başına değil, enflasyon beklentileri ve küresel koşullarla birlikte değerlendirmek gerekir.${DISCLAIMER}`,
      isInvestmentRelated: true,
      emotion: "thinking"
    };
  }
  
  // Borsa Volatilitesi
  if (lowerQuery.includes("borsa") || lowerQuery.includes("hisse") || lowerQuery.includes("fomo") || lowerQuery.includes("düşüş")) {
    return {
      text: `Borsada duygular en tehlikeli danışmandır. Yükselişte FOMO, düşüşte panik satışı, portföyün en büyük düşmanlarıdır. Kademeli alım stratejisi ve disiplinli yaklaşım, uzun vadede duygusal kararlardan çok daha sağlıklı sonuçlar verir.${DISCLAIMER}`,
      isInvestmentRelated: true,
      emotion: "ok"
    };
  }
  
  // Gümüş
  if (lowerQuery.includes("gümüş") || lowerQuery.includes("gumus") || lowerQuery.includes("silver")) {
    return {
      text: `Gümüş, altının gölgesinde kalan ama kendine özgü dinamikleri olan bir metaldir. Yüzde elliden fazlası endüstriyel amaçlı kullanılır, bu da onu altına göre çok daha volatil kılar. Risk toleransı yüksek yatırımcılar için portföyün küçük bir bölümünde değerlendirilebilir.${DISCLAIMER}`,
      isInvestmentRelated: true,
      emotion: "glad"
    };
  }
  
  // ABD Borsaları - VERGİ UYARISI
  if (lowerQuery.includes("abd") || lowerQuery.includes("amerika") || lowerQuery.includes("nasdaq") || lowerQuery.includes("sp500") || lowerQuery.includes("yurt dışı")) {
    return {
      text: `ABD borsalarına Türk aracı kurumlar veya ETF'ler üzerinden erişmek mümkün. Ancak kritik bir uyarı: Yurt dışı hisse gelirleri Türkiye'de beyana tabidir. Vergi danışmanınıza başvurmanızı şiddetle tavsiye ederim. Çifte vergilendirme anlaşmalarını da göz önünde bulundurun.${DISCLAIMER}`,
      isInvestmentRelated: true,
      emotion: "surprised"
    };
  }
  
  // Altın
  if (lowerQuery.includes("altın") || lowerQuery.includes("altin") || lowerQuery.includes("gold")) {
    return {
      text: `Altın, tarih boyunca güvenli liman olarak kabul edilmiştir. Enflasyona karşı koruma sağlayabilir, ancak faiz oranları yükseldiğinde cazibesini kaybedebilir. Fiziki altın, altın hesabı veya altın fonları arasında tercih yaparken likidite ve saklama maliyetlerini değerlendirin.${DISCLAIMER}`,
      isInvestmentRelated: true,
      emotion: "thumbsUp"
    };
  }
  
  // Kripto
  if (lowerQuery.includes("bitcoin") || lowerQuery.includes("kripto") || lowerQuery.includes("btc") || lowerQuery.includes("ethereum")) {
    return {
      text: `Kripto paralar yüksek volatilite ve yüksek risk-getiri potansiyeli sunar. Türkiye'de ödeme aracı olarak kullanımı yasaktır. Kaybetmeyi göze alabileceğiniz miktarı aşmamanız kritik önem taşır. Regülasyon riskleri de göz önünde bulundurulmalıdır.${DISCLAIMER}`,
      isInvestmentRelated: true,
      emotion: "confused"
    };
  }
  
  // Toplu Para
  if (lowerQuery.includes("eyt") || lowerQuery.includes("miras") || lowerQuery.includes("toplu para") || lowerQuery.includes("tazminat")) {
    return {
      text: `Toplu para geldiğinde acele etmemek en önemli kuraldır. Mevduat, altın, yatırım fonları ve hisse gibi varlıklar arasında çeşitlendirme düşünülebilir. İlk üç ay paranızı anlamak için zaman ayırmanız, uzun vadede çok daha sağlıklı kararlar almanızı sağlar.${DISCLAIMER}`,
      isInvestmentRelated: true,
      emotion: "ok"
    };
  }
  
  // Fon
  if (lowerQuery.includes("fon") || lowerQuery.includes("yatırım fonu") || lowerQuery.includes("bist fon")) {
    return {
      text: `Yatırım fonları, profesyonel yönetim ve çeşitlendirme avantajı sunar. Ancak yönetim ücretleri getiriyi azaltabilir. Fon seçerken geçmiş performans, yönetim ücreti ve yatırım stratejisini detaylıca incelemenizi öneririm.${DISCLAIMER}`,
      isInvestmentRelated: true,
      emotion: "glad"
    };
  }
  
  // Sarp hakkında
  if (lowerQuery.includes("sarp") || lowerQuery.includes("sen kim") || lowerQuery.includes("merhaba") || lowerQuery.includes("selam")) {
    return {
      text: `Merhaba! Ben Sarp, Finans Kodu'nun yapay zeka destekli finans asistanıyım. Finansın sarp yollarında rotanız zirve olsun diye buradayım. Üzerime tıklayarak sesli soru sorabilirsiniz!`,
      isInvestmentRelated: false,
      emotion: "excited"
    };
  }
  
  // Teşekkür
  if (lowerQuery.includes("teşekkür") || lowerQuery.includes("sağol") || lowerQuery.includes("eyvallah")) {
    return {
      text: `Rica ederim! Size yardımcı olabildiysem ne mutlu bana. Başka sorularınız olursa her zaman buradayım.`,
      isInvestmentRelated: false,
      emotion: "thumbsUp"
    };
  }
  
  // Default
  return {
    text: `Merhaba! Ben Sarp. Size altın, gümüş, borsa, kripto, döviz ve yatırım stratejileri hakkında piyasa görüşü sunabilirim. Üzerime tıklayarak sesli soru sorabilirsiniz!`,
    isInvestmentRelated: false,
    emotion: "glad"
  };
};

// Process text for speech
const processTextForSpeech = (text: string): string => {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/•/g, "")
    .replace(/⚠️/g, "")
    .replace(/\n+/g, ". ")
    .replace(/\s+/g, " ")
    .trim();
};

// Main Component
export default function SarpGifAvatar() {
  const [currentGif, setCurrentGif] = useState<keyof typeof SARP_GIFS>("idle");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [maleVoice, setMaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // MOBILE AUDIO FIX: Touch-to-Unlock pattern
  const unlockAudio = useCallback(() => {
    if (audioUnlocked) return;
    
    // Create and play a silent audio context to unlock
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioContext) {
        const audioCtx = new AudioContext();
        const buffer = audioCtx.createBuffer(1, 1, 22050);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
        audioCtx.resume();
      }
    } catch {
      // Fallback: Create empty utterance
    }
    
    // Also warm up speechSynthesis
    if (synthRef.current) {
      const warmUp = new SpeechSynthesisUtterance("");
      warmUp.volume = 0;
      synthRef.current.speak(warmUp);
    }
    
    setAudioUnlocked(true);
  }, [audioUnlocked]);

  // Global touch/click listener for audio unlock
  useEffect(() => {
    const handleInteraction = () => {
      unlockAudio();
    };
    
    document.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    document.addEventListener("click", handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("click", handleInteraction);
    };
  }, [unlockAudio]);

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
        
        // Scan for Turkish voices - prefer male (default on most systems)
        const turkishVoices = voices.filter(v => v.lang.startsWith("tr"));
        
        let selectedVoice: SpeechSynthesisVoice | null = null;
        
        // Look for male voice indicators
        const maleKeywords = ["erkek", "male", "mehmet", "ahmet"];
        for (const keyword of maleKeywords) {
          const found = turkishVoices.find(v => v.name.toLowerCase().includes(keyword));
          if (found) {
            selectedVoice = found;
            break;
          }
        }
        
        // Fallback to first Turkish voice (usually male)
        if (!selectedVoice && turkishVoices.length > 0) {
          selectedVoice = turkishVoices[0];
        }
        
        // Last resort: any voice
        if (!selectedVoice && voices.length > 0) {
          selectedVoice = voices[0];
        }
        
        setMaleVoice(selectedVoice);
        return true;
      };
      
      if (!loadVoices()) {
        speechSynthesis.onvoiceschanged = loadVoices;
        const intervalId = setInterval(() => {
          if (loadVoices()) clearInterval(intervalId);
        }, 100);
        setTimeout(() => clearInterval(intervalId), 5000);
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
        setCurrentGif("idle");
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  // Handle user query and generate response
  const handleUserQuery = useCallback((query: string) => {
    setIsListening(false);
    setIsThinking(true);
    setCurrentGif("thinking");
    
    setTimeout(() => {
      const { text, isInvestmentRelated, emotion } = getFinancialResponse(query);
      setResponse(text);
      setShowResponse(true);
      setIsThinking(false);
      
      speakText(text, isInvestmentRelated, emotion);
    }, 800);
  }, []);

  // Text-to-Speech with MALE VOICE (pitch=0.9, rate=0.95)
  const speakText = useCallback((text: string, isInvestmentRelated: boolean, emotion: keyof typeof SARP_GIFS) => {
    if (!synthRef.current || !ttsEnabled) {
      setCurrentGif(emotion);
      setTimeout(() => setCurrentGif("idle"), 3000);
      return;
    }
    
    // Ensure audio is unlocked
    unlockAudio();
    
    synthRef.current.cancel();
    
    const processedText = processTextForSpeech(text);
    const fullText = isInvestmentRelated 
      ? `${processedText} ${VOICE_DISCLAIMER}`
      : processedText;
    
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "tr-TR";
    
    if (maleVoice) {
      utterance.voice = maleVoice;
    }
    
    // Authoritative male voice settings
    utterance.pitch = 0.9; // Slightly deeper
    utterance.rate = 0.95; // Clear and confident
    utterance.volume = 1.0;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentGif("talking"); // GIF SWAP: Switch to talking GIF
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentGif(emotion); // Show emotion GIF briefly
      setTimeout(() => {
        setCurrentGif("idle"); // Return to idle
        setShowResponse(false);
      }, 3000);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentGif("idle");
    };
    
    synthRef.current.speak(utterance);
  }, [ttsEnabled, maleVoice, unlockAudio]);

  // Handle avatar click - Click-to-Talk
  const handleAvatarClick = useCallback(() => {
    // Always unlock audio on click
    unlockAudio();
    
    if (!speechSupported || !recognitionRef.current) return;
    
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setCurrentGif("idle");
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setCurrentGif("idle");
    } else {
      try {
        setTranscript("");
        setShowResponse(false);
        recognitionRef.current.start();
        setIsListening(true);
        setCurrentGif("listening"); // GIF SWAP: Switch to listening GIF
      } catch {
        setIsListening(false);
        setCurrentGif("idle");
      }
    }
  }, [speechSupported, isListening, isSpeaking, unlockAudio]);

  return (
    <div className="fixed bottom-4 right-4 z-[9999]" style={{ width: "180px" }}>
      {/* GIF Avatar Container - Video Call Cutout Style */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleAvatarClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* GIF Image - Head & Shoulders */}
        <div className="relative w-[180px] h-[180px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-2 border-primary/30 shadow-xl shadow-primary/20">
          <picture>
            <source srcSet={SARP_GIFS_AVIF[currentGif]} type="image/avif" />
            <source srcSet={SARP_GIFS[currentGif]} type="image/webp" />
            <img
              src={SARP_GIFS[currentGif]}
              alt="Sarp AI Asistan"
              className="w-full h-full object-cover object-top"
              style={{ objectPosition: "center 20%" }}
              loading="lazy"
              decoding="async"
              width="180"
              height="180"
            />
          </picture>
          
          {/* Listening indicator - Red glow border */}
          {isListening && (
            <div className="absolute inset-0 border-4 border-red-500 rounded-2xl animate-pulse" />
          )}
          
          {/* Speaking indicator - Cyan glow */}
          {isSpeaking && (
            <div className="absolute inset-0 border-4 border-primary rounded-2xl animate-pulse" />
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 backdrop-blur-sm rounded-full border border-primary/50 flex items-center gap-2">
          <span className="text-xs font-semibold text-primary">Sarp</span>
          {isListening && (
            <>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-red-400">Dinliyor</span>
            </>
          )}
          {isThinking && !isListening && (
            <>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-yellow-400">Düşünüyor</span>
            </>
          )}
          {isSpeaking && (
            <>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] text-primary">Konuşuyor</span>
            </>
          )}
          {!isListening && !isThinking && !isSpeaking && (
            <span className="text-[10px] text-white/60">Tıkla & Konuş</span>
          )}
        </div>

        {/* Mic Icon Overlay */}
        <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full">
          {isListening ? (
            <Mic className="w-4 h-4 text-red-500 animate-pulse" />
          ) : (
            <MicOff className="w-4 h-4 text-white/50" />
          )}
        </div>
      </motion.div>

      {/* Legal Disclaimer */}
      <div className="mt-2 px-2 py-1 bg-amber-500/20 rounded-lg text-center">
        <p className="text-[8px] text-amber-400 leading-tight">
          Sarp bir yapay zekadır, Yatırım Tavsiyesi Vermez.
        </p>
      </div>

      {/* Transcript Display */}
      <AnimatePresence>
        {(isListening || (transcript && !showResponse)) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 bg-black/95 backdrop-blur-sm rounded-xl border border-white/20 max-w-[200px] min-w-[120px]"
          >
            {isListening && !transcript && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-white">Dinliyorum...</span>
              </div>
            )}
            {transcript && (
              <p className="text-xs text-white/90 line-clamp-2">{transcript}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response Bubble */}
      <AnimatePresence>
        {showResponse && response && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="absolute bottom-[60px] right-[190px] w-[280px] max-h-[200px] overflow-y-auto p-4 bg-black/95 backdrop-blur-xl rounded-xl border border-primary/40 shadow-xl shadow-primary/10"
          >
            <p className="text-sm text-white leading-relaxed">{response}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TTS Toggle */}
      {speechSupported && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTtsEnabled(!ttsEnabled);
          }}
          className={`absolute top-2 left-2 p-1.5 rounded-full transition-colors ${
            ttsEnabled ? "bg-primary/40 text-primary" : "bg-white/15 text-white/50"
          }`}
        >
          {ttsEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        </button>
      )}

      {/* Audio Unlock Hint (shown only on mobile before interaction) */}
      {!audioUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary/20 rounded text-center whitespace-nowrap"
        >
          <p className="text-[9px] text-primary">👆 Sesi açmak için dokun</p>
        </motion.div>
      )}
    </div>
  );
}
