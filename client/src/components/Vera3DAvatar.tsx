/*
  DESIGN: Vera 3D Interactive Avatar v2.0
  
  - Real 3D scene using React Three Fiber + Drei
  - Humanoid mesh with idle animations (breathing, blinking)
  - Lip-sync animation during speech
  - Female voice forced via Web Speech API
  - Fixed position bottom-right with transparent background
  - SPK/BDDK compliant disclaimer
  - Full duplex: stops speaking when user starts talking
*/

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Text, RoundedBox } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX, X, MessageCircle, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

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

// 3D Humanoid Avatar Component
function HumanoidAvatar({ isSpeaking, isListening }: { isSpeaking: boolean; isListening: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const jawRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  // Blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Breathing animation (subtle scale on Y)
    if (groupRef.current) {
      groupRef.current.scale.y = 1 + Math.sin(time * 1.5) * 0.01;
    }

    // Head subtle sway
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.5) * 0.05;
      headRef.current.rotation.z = Math.sin(time * 0.3) * 0.02;
    }

    // Lip-sync animation when speaking
    if (jawRef.current) {
      if (isSpeaking) {
        // Fast sine wave for mouth movement
        const mouthOpen = Math.abs(Math.sin(time * 15)) * 0.15;
        jawRef.current.position.y = -0.35 - mouthOpen;
        jawRef.current.scale.y = 1 + mouthOpen * 0.5;
      } else {
        // Closed mouth
        jawRef.current.position.y = -0.35;
        jawRef.current.scale.y = 1;
      }
    }

    // Blinking animation
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeScale = isBlinking ? 0.1 : 1;
      leftEyeRef.current.scale.y = eyeScale;
      rightEyeRef.current.scale.y = eyeScale;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        {/* Body - Business attire torso */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.4, 0.8, 8, 16]} />
          <meshStandardMaterial color="#f0f0f0" /> {/* White blazer */}
        </mesh>
        
        {/* Shirt collar */}
        <mesh position={[0, 0.5, 0.1]}>
          <boxGeometry args={[0.3, 0.15, 0.1]} />
          <meshStandardMaterial color="#1a365d" /> {/* Navy blue shirt */}
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#fcd5b8" /> {/* Skin tone */}
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 1.1, 0]}>
          {/* Face */}
          <mesh>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial color="#fcd5b8" /> {/* Skin tone */}
          </mesh>

          {/* Hair - Dark brown bob cut */}
          <mesh position={[0, 0.1, -0.05]}>
            <sphereGeometry args={[0.38, 32, 32]} />
            <meshStandardMaterial color="#2d1810" /> {/* Dark brown hair */}
          </mesh>
          
          {/* Hair front bangs */}
          <mesh position={[0, 0.25, 0.2]}>
            <boxGeometry args={[0.5, 0.15, 0.1]} />
            <meshStandardMaterial color="#2d1810" />
          </mesh>

          {/* Glasses frame */}
          <mesh position={[0, 0.05, 0.32]}>
            <torusGeometry args={[0.25, 0.015, 8, 32]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>

          {/* Left eye */}
          <mesh ref={leftEyeRef} position={[-0.1, 0.05, 0.3]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#2d1810" />
          </mesh>

          {/* Right eye */}
          <mesh ref={rightEyeRef} position={[0.1, 0.05, 0.3]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#2d1810" />
          </mesh>

          {/* Nose */}
          <mesh position={[0, -0.05, 0.35]}>
            <coneGeometry args={[0.03, 0.08, 8]} />
            <meshStandardMaterial color="#e8c4a8" />
          </mesh>

          {/* Mouth/Lips */}
          <mesh position={[0, -0.15, 0.32]}>
            <boxGeometry args={[0.12, 0.03, 0.02]} />
            <meshStandardMaterial color="#c97878" /> {/* Lip color */}
          </mesh>

          {/* Jaw (for lip-sync) */}
          <mesh ref={jawRef} position={[0, -0.35, 0.1]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#fcd5b8" transparent opacity={0} />
          </mesh>
        </group>

        {/* Left arm */}
        <mesh position={[-0.55, 0.1, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>

        {/* Right arm - holding tablet gesture */}
        <mesh position={[0.55, 0.1, 0.1]} rotation={[0.3, 0, -0.3]}>
          <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>

        {/* Holographic tablet */}
        <mesh position={[0.4, -0.1, 0.4]} rotation={[0.3, -0.3, 0]}>
          <planeGeometry args={[0.4, 0.3]} />
          <meshStandardMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.3}
            emissive="#00d4ff"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Listening indicator */}
        {isListening && (
          <mesh position={[0.6, 1.3, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
          </mesh>
        )}

        {/* Speaking indicator */}
        {isSpeaking && (
          <group position={[-0.5, 0.8, 0.3]}>
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[i * 0.08, 0, 0]}>
                <boxGeometry args={[0.03, 0.1 + Math.sin(Date.now() * 0.01 + i) * 0.05, 0.03]} />
                <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.8} />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </Float>
  );
}

// 3D Scene Component
function Scene({ isSpeaking, isListening }: { isSpeaking: boolean; isListening: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00d4ff" />
      
      <Suspense fallback={null}>
        <HumanoidAvatar isSpeaking={isSpeaking} isListening={isListening} />
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

// Financial response logic (same as before)
const DISCLAIMER = "\n\n⚠️ *Vera bir yapay zekadır ve yatırım tavsiyesi vermez.*";
const VOICE_DISCLAIMER = "Hatırlatmak isterim ki, Vera bir yapay zekadır ve yatırım tavsiyesi vermez.";

const getFinancialResponse = (query: string): { text: string; isInvestmentRelated: boolean } => {
  const lowerQuery = query.toLowerCase();
  
  // 1. Kriz Yönetimi
  if (lowerQuery.includes("dolar") && (lowerQuery.includes("yüksel") || lowerQuery.includes("panik") || lowerQuery.includes("ne yapmalı"))) {
    return {
      text: `Döviz dalgalanmalarında sakin kalmak önemli. Panikle satış genellikle en kötü fiyatlardan işlem yapmaya yol açar. Portföy çeşitlendirmesi, kademeli pozisyon alma stratejisi ve enflasyona karşı korumalı varlıklar düşünülebilir. Uzun vadeli stratejinizi gözden geçirin.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 2. Merkez Bankası
  if (lowerQuery.includes("faiz") || lowerQuery.includes("merkez bankası") || lowerQuery.includes("tcmb")) {
    return {
      text: `Faiz artışı teorik olarak mevduat getirilerini artırır, borsayı olumsuz etkileyebilir ve yerli parayı güçlendirebilir. Faiz indirimi ise tam tersine etki edebilir. Ancak bu kararlar tek başına değil, enflasyon beklentileri ve küresel koşullarla birlikte değerlendirilmelidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 3. Borsa Volatilitesi
  if ((lowerQuery.includes("borsa") || lowerQuery.includes("hisse")) && (lowerQuery.includes("düş") || lowerQuery.includes("yüksel") || lowerQuery.includes("fomo"))) {
    return {
      text: `Piyasa hareketlerinde duygusal tepkilerden kaçınmak önemli. Ralli dönemlerinde FOMO riski, düşüş dönemlerinde panik satışı riski vardır. Kademeli alım stratejisi ve disiplinli yaklaşım, duygusal kararlardan daha sağlıklı sonuçlar verebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 4. Toplu Para
  if (lowerQuery.includes("eyt") || lowerQuery.includes("miras") || lowerQuery.includes("toplu para") || lowerQuery.includes("tazminat")) {
    return {
      text: `Toplu para geldiğinde acele etmemek önemli. Mevduat, altın, yatırım fonları ve hisse gibi varlıklar arasında çeşitlendirme düşünülebilir. İlk 3 ay paranızı anlamak için zaman ayırmanız ve vergi yükümlülüklerinizi araştırmanız mantıklı olabilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 5. Vergi Dönemleri
  if (lowerQuery.includes("vergi") || lowerQuery.includes("bilanço") || lowerQuery.includes("temettü") || lowerQuery.includes("yıl sonu")) {
    return {
      text: `Yıl sonu vergi avantajlı yatırımlar, BES katkı payı limitleri ve portföy yeniden dengeleme için önemli bir dönemdir. Bilanço dönemlerinde şirket finansalları açıklanır ve temettü kararları verilir. Dönemsel fırsatları değerlendirirken uzun vadeli stratejinizi gözden kaçırmayın.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 6. Gümüş
  if (lowerQuery.includes("gümüş") || lowerQuery.includes("gumus") || lowerQuery.includes("silver")) {
    return {
      text: `Gümüş, altından farklı olarak yüzde elliden fazlası endüstriyel amaçlı kullanılır. Elektronik, güneş panelleri ve tıbbi cihazlarda kullanılır. Altına göre çok daha volatildir, iki üç kat daha fazla dalgalanma gösterebilir. Risk toleransı yüksek yatırımcılar için portföyün küçük bir bölümünde değerlendirilebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 7. ABD Borsaları
  if (lowerQuery.includes("abd") || lowerQuery.includes("amerika") || lowerQuery.includes("nasdaq") || lowerQuery.includes("yurt dışı hisse")) {
    return {
      text: `ABD borsalarına Türk aracı kurumlar veya ETF'ler üzerinden erişilebilir. Kritik uyarı: Yurt dışı hisse gelirleri Türkiye'de beyana tabidir. Temettü ve alım satım kazançları beyan edilmelidir. Vergi danışmanınıza başvurmanız şiddetle önerilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Altın
  if (lowerQuery.includes("altın") || lowerQuery.includes("altin")) {
    return {
      text: `Altın tarih boyunca güvenli liman olarak kabul edilir. Enflasyona karşı koruma sağlayabilir ve portföy çeşitlendirmesi için kullanılabilir. Ancak faiz oranları yükseldiğinde cazibesini kaybedebilir ve kısa vadede volatilite gösterebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Kripto
  if (lowerQuery.includes("bitcoin") || lowerQuery.includes("kripto") || lowerQuery.includes("btc")) {
    return {
      text: `Kripto paralar yüksek volatilite ve risk getiri potansiyeli sunar. Yüzde elli üzerinde düşüşler yaşanabilir. Regülasyon belirsizlikleri ve siber güvenlik riskleri mevcuttur. Türkiye'de ödeme aracı olarak kullanımı yasaktır. Kaybetmeyi göze alabileceğiniz miktarı aşmamanız kritik önem taşır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Vera hakkında
  if (lowerQuery.includes("vera") || lowerQuery.includes("sen kim") || lowerQuery.includes("finans kodu")) {
    return {
      text: `Merhaba! Ben Vera, Finans Kodu'nun yapay zeka asistanıyım. Size finansal konularda eğitici bilgiler sunuyorum. Sesli ve yazılı sohbet desteği, finansal kavramları açıklama ve risk fırsat analizi çerçevesi sunuyorum. Ürünlerimizi incelemek için Dijital Ürünler bölümümüzü ziyaret edebilirsiniz!`,
      isInvestmentRelated: false
    };
  }
  
  // Default
  return {
    text: `Merhaba! Ben Vera, Finans Kodu'nun AI asistanıyım. Size altın, gümüş, borsa, kripto, döviz, faiz kararları ve yatırım stratejileri hakkında bilgi verebilirim. Mikrofona basarak sesli soru da sorabilirsiniz!`,
    isInvestmentRelated: false
  };
};

// Process text for speech
const processTextForSpeech = (text: string): string => {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/•/g, "")
    .replace(/⚠️/g, "")
    .replace(/👋/g, "")
    .replace(/🎤/g, "")
    .replace(/\n+/g, ". ")
    .replace(/\s+/g, " ")
    .trim();
};

// Find female Turkish voice
const findFemaleVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  const turkishVoices = voices.filter(v => v.lang.startsWith("tr"));
  
  // Priority keywords for female voice
  const femaleKeywords = ["female", "kadın", "yelda", "emel", "filiz", "google türkçe", "microsoft aylin"];
  
  for (const keyword of femaleKeywords) {
    const found = turkishVoices.find(v => v.name.toLowerCase().includes(keyword));
    if (found) return found;
  }
  
  // Return first Turkish voice if no female found
  return turkishVoices[0] || null;
};

// Main Component
export default function Vera3DAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: number; role: string; content: string }>>([
    { id: 1, role: "assistant", content: "Merhaba! Ben Vera. Size nasıl yardımcı olabilirim?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize Speech APIs
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasSpeechRecognition = !!SpeechRecognitionAPI;
    const hasSpeechSynthesis = "speechSynthesis" in window;
    
    setSpeechSupported(hasSpeechRecognition && hasSpeechSynthesis);
    
    if (hasSpeechSynthesis) {
      synthRef.current = window.speechSynthesis;
      
      // Load voices
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        const female = findFemaleVoice(voices);
        setFemaleVoice(female);
      };
      
      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
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
      
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text-to-Speech with female voice
  const speakText = useCallback((text: string, isInvestmentRelated: boolean) => {
    if (!synthRef.current || !ttsEnabled) return;
    
    synthRef.current.cancel();
    
    const processedText = processTextForSpeech(text);
    const fullText = isInvestmentRelated 
      ? `${processedText} ${VOICE_DISCLAIMER}`
      : processedText;
    
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "tr-TR";
    utterance.rate = 0.9;
    utterance.volume = 1.0;
    
    // Force female voice
    if (femaleVoice) {
      utterance.voice = femaleVoice;
      utterance.pitch = 1.1; // Slightly higher pitch for female
    } else {
      // Fallback: increase pitch to simulate female voice
      utterance.pitch = 1.2;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  }, [ttsEnabled, femaleVoice]);

  // Toggle microphone - Full Duplex: stop speaking when listening
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Full Duplex: Stop speaking when user starts talking
      if (synthRef.current) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  }, [isListening]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const { text: response, isInvestmentRelated } = getFinancialResponse(currentInput);
      const assistantMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
      
      speakText(response, isInvestmentRelated);
    }, 800);
  }, [input, messages.length, isListening, speakText]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Fixed 3D Avatar - Bottom Right */}
      <div 
        className="fixed bottom-0 right-5 z-[9999]"
        style={{ width: isExpanded ? "400px" : "200px", height: isExpanded ? "500px" : "280px" }}
      >
        {/* 3D Canvas with transparent background */}
        <div 
          className="w-full h-full cursor-pointer"
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          <Canvas
            camera={{ position: [0, 0.5, 2.5], fov: 45 }}
            style={{ background: "transparent" }}
            gl={{ alpha: true, antialias: true }}
          >
            <Scene isSpeaking={isSpeaking} isListening={isListening} />
          </Canvas>
        </div>

        {/* Vera Name Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-primary/30"
        >
          <span className="text-xs font-semibold text-primary">Vera</span>
          <span className="text-xs text-white/70 ml-1">AI Asistan</span>
        </motion.div>

        {/* Disclaimer */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500/20 rounded text-center">
          <p className="text-[10px] text-amber-400">Yatırım Tavsiyesi Vermez</p>
        </div>

        {/* Minimize button when expanded */}
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}

        {/* Chat toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-2 left-2 p-2 bg-primary/80 rounded-full hover:bg-primary transition-colors shadow-lg"
        >
          <MessageCircle className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="fixed bottom-[300px] right-5 z-[9998] w-[350px] max-h-[400px] bg-black/90 backdrop-blur-xl rounded-2xl border border-primary/30 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-white">Vera ile Konuş</span>
              </div>
              <div className="flex items-center gap-1">
                {speechSupported && (
                  <button
                    onClick={() => {
                      if (isSpeaking) stopSpeaking();
                      setTtsEnabled(!ttsEnabled);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      ttsEnabled ? "bg-primary/20 text-primary" : "bg-white/10 text-white/50"
                    }`}
                  >
                    {ttsEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-3 h-3 text-white/70" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[250px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-xl px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              {isListening && (
                <div className="flex items-center justify-center gap-2 mb-2 py-1.5 bg-red-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs text-red-400">Dinliyorum...</span>
                </div>
              )}
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Vera'ya sorun..."
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-primary focus:outline-none text-white placeholder:text-white/40 text-sm"
                  disabled={isListening}
                />
                
                {speechSupported && (
                  <Button
                    onClick={toggleListening}
                    size="sm"
                    className={`px-3 ${
                      isListening 
                        ? "bg-red-500 hover:bg-red-600" 
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                )}
                
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 px-3"
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
