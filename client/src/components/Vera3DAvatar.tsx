/*
  DESIGN: Vera High-Fidelity 3D Avatar - FINAL REVISION
  
  - Custom 3D humanoid mesh (fallback - no external GLB dependency)
  - Simulated lip-sync animation
  - Female voice forced (Yelda/Emel/Google Türkçe + pitch 1.4 fallback)
  - Click-to-interact (no chat UI buttons)
  - Micro-expressions: blinking, breathing
  - SPK/BDDK compliant disclaimer
*/

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
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

// Knowledge Base & Response Logic
const DISCLAIMER = "\n\n⚠️ *Vera bir yapay zekadır ve yatırım tavsiyesi vermez.*";
const VOICE_DISCLAIMER = "Hatırlatmak isterim ki, bunlar yatırım tavsiyesi değildir.";

const getFinancialResponse = (query: string): { text: string; isInvestmentRelated: boolean } => {
  const lowerQuery = query.toLowerCase();
  
  // Kriz Yönetimi
  if (lowerQuery.includes("dolar") || lowerQuery.includes("enflasyon") || lowerQuery.includes("kriz") || lowerQuery.includes("panik")) {
    return {
      text: `Döviz dalgalanmalarında sakin kalmak kritik önem taşır. Panikle satış genellikle en kötü fiyatlardan işlem yapmaya yol açar. Portföy çeşitlendirmesi ve kademeli pozisyon alma stratejisi düşünülebilir. Sepet mantığıyla farklı varlık sınıflarına dağıtım yapılabilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Faiz Kararları
  if (lowerQuery.includes("faiz") || lowerQuery.includes("merkez bankası") || lowerQuery.includes("tcmb")) {
    return {
      text: `Faiz artışı teorik olarak mevduat getirilerini artırır, borsayı olumsuz etkileyebilir ve yerli parayı güçlendirebilir. Faiz indirimi ise tam tersine etki edebilir. Bu kararlar tek başına değil, enflasyon beklentileri ve küresel koşullarla birlikte değerlendirilmelidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Borsa Volatilitesi
  if (lowerQuery.includes("borsa") || lowerQuery.includes("hisse") || lowerQuery.includes("fomo") || lowerQuery.includes("düşüş")) {
    return {
      text: `Piyasa hareketlerinde duygusal tepkilerden kaçınmak önemli. Ralli dönemlerinde FOMO riski, düşüş dönemlerinde panik satışı riski vardır. Kademeli alım stratejisi ve disiplinli yaklaşım, duygusal kararlardan daha sağlıklı sonuçlar verebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Gümüş
  if (lowerQuery.includes("gümüş") || lowerQuery.includes("gumus") || lowerQuery.includes("silver")) {
    return {
      text: `Gümüş, altından farklı olarak yüzde elliden fazlası endüstriyel amaçlı kullanılır. Elektronik, güneş panelleri ve tıbbi cihazlarda yer alır. Altına göre çok daha volatildir, iki üç kat daha fazla dalgalanma gösterebilir. Risk toleransı yüksek yatırımcılar için portföyün küçük bir bölümünde değerlendirilebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // ABD Borsaları
  if (lowerQuery.includes("abd") || lowerQuery.includes("amerika") || lowerQuery.includes("nasdaq") || lowerQuery.includes("sp500") || lowerQuery.includes("yurt dışı")) {
    return {
      text: `ABD borsalarına Türk aracı kurumlar veya ETF'ler üzerinden erişilebilir. Kritik uyarı: Yurt dışı hisse gelirleri Türkiye'de beyana tabidir. Temettü ve alım satım kazançları beyan edilmelidir. Vergi danışmanınıza başvurmanız şiddetle önerilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Altın
  if (lowerQuery.includes("altın") || lowerQuery.includes("altin") || lowerQuery.includes("gold")) {
    return {
      text: `Altın tarih boyunca güvenli liman olarak kabul edilir. Enflasyona karşı koruma sağlayabilir ve portföy çeşitlendirmesi için kullanılabilir. Ancak faiz oranları yükseldiğinde cazibesini kaybedebilir ve kısa vadede volatilite gösterebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Kripto
  if (lowerQuery.includes("bitcoin") || lowerQuery.includes("kripto") || lowerQuery.includes("btc") || lowerQuery.includes("ethereum")) {
    return {
      text: `Kripto paralar yüksek volatilite ve risk getiri potansiyeli sunar. Yüzde elli üzerinde düşüşler yaşanabilir. Regülasyon belirsizlikleri ve siber güvenlik riskleri mevcuttur. Türkiye'de ödeme aracı olarak kullanımı yasaktır. Kaybetmeyi göze alabileceğiniz miktarı aşmamanız kritik önem taşır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Toplu Para
  if (lowerQuery.includes("eyt") || lowerQuery.includes("miras") || lowerQuery.includes("toplu para") || lowerQuery.includes("tazminat")) {
    return {
      text: `Toplu para geldiğinde acele etmemek önemli. Mevduat, altın, yatırım fonları ve hisse gibi varlıklar arasında çeşitlendirme düşünülebilir. İlk üç ay paranızı anlamak için zaman ayırmanız ve vergi yükümlülüklerinizi araştırmanız mantıklı olabilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Vera hakkında
  if (lowerQuery.includes("vera") || lowerQuery.includes("sen kim") || lowerQuery.includes("merhaba") || lowerQuery.includes("selam")) {
    return {
      text: `Merhaba! Ben Vera, Finans Kodu'nun yapay zeka asistanıyım. Size finansal konularda eğitici bilgiler sunuyorum. Altın, gümüş, borsa, kripto, döviz ve faiz kararları hakkında sorularınızı yanıtlayabilirim. Bana tıklayarak sesli soru sorabilirsiniz!`,
      isInvestmentRelated: false
    };
  }
  
  // Default
  return {
    text: `Merhaba! Ben Vera. Size altın, gümüş, borsa, kripto, döviz, faiz kararları ve yatırım stratejileri hakkında bilgi verebilirim. Üzerime tıklayarak sesli soru sorabilirsiniz!`,
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
    .replace(/\n+/g, ". ")
    .replace(/\s+/g, " ")
    .trim();
};

// Find female Turkish voice with priority
const findFemaleVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  const turkishVoices = voices.filter(v => v.lang.startsWith("tr"));
  
  // Priority keywords for female voice
  const femaleKeywords = ["google türkçe", "yelda", "emel", "filiz", "female", "kadın", "aylin"];
  
  for (const keyword of femaleKeywords) {
    const found = turkishVoices.find(v => v.name.toLowerCase().includes(keyword));
    if (found) return found;
  }
  
  // Return first Turkish voice if no female found
  return turkishVoices[0] || null;
};

// 3D Avatar Component - Professional Business Woman
function VeraModel({ 
  isSpeaking, 
  isListening, 
  isThinking,
  mouthOpenness,
  onClick 
}: { 
  isSpeaking: boolean; 
  isListening: boolean;
  isThinking: boolean;
  mouthOpenness: number;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  // Blinking effect - every 3-5 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Breathing animation (subtle Y movement on body)
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.015;
    }

    // Head animations
    if (headRef.current) {
      if (isListening) {
        // Lean forward when listening
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.12, 0.08);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.08);
      } else if (isThinking) {
        // Tilt head when thinking
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.15, 0.08);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.08);
      } else {
        // Subtle idle sway
        headRef.current.rotation.y = Math.sin(time * 0.4) * 0.04;
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.05);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.05);
      }
    }

    // Blinking animation
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeScale = isBlinking ? 0.1 : 1;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScale, 0.4);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScale, 0.4);
    }

    // Lip sync animation
    if (mouthRef.current) {
      const targetScale = 1 + mouthOpenness * 3;
      mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, targetScale, 0.3);
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.08}>
      <group ref={groupRef} onClick={onClick} position={[0, -0.2, 0]}>
        {/* Body - White blazer */}
        <mesh position={[0, -0.15, 0]}>
          <capsuleGeometry args={[0.32, 0.55, 12, 20]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.35} metalness={0.05} />
        </mesh>
        
        {/* Blazer lapels */}
        <mesh position={[-0.12, 0.15, 0.15]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.08, 0.25, 0.03]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.4} />
        </mesh>
        <mesh position={[0.12, 0.15, 0.15]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.08, 0.25, 0.03]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.4} />
        </mesh>
        
        {/* Navy shirt */}
        <mesh position={[0, 0.22, 0.1]}>
          <boxGeometry args={[0.18, 0.15, 0.06]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.5} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.12, 20]} />
          <meshStandardMaterial color="#f5d0c5" roughness={0.55} />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.7, 0]}>
          {/* Face */}
          <mesh>
            <sphereGeometry args={[0.26, 36, 36]} />
            <meshStandardMaterial color="#f5d0c5" roughness={0.55} />
          </mesh>

          {/* Hair - Dark brown bob */}
          <mesh position={[0, 0.06, -0.04]}>
            <sphereGeometry args={[0.28, 32, 32]} />
            <meshStandardMaterial color="#2a1a12" roughness={0.75} />
          </mesh>
          
          {/* Hair sides */}
          <mesh position={[-0.22, -0.05, 0]}>
            <capsuleGeometry args={[0.08, 0.15, 8, 12]} />
            <meshStandardMaterial color="#2a1a12" roughness={0.75} />
          </mesh>
          <mesh position={[0.22, -0.05, 0]}>
            <capsuleGeometry args={[0.08, 0.15, 8, 12]} />
            <meshStandardMaterial color="#2a1a12" roughness={0.75} />
          </mesh>
          
          {/* Bangs */}
          <mesh position={[0, 0.18, 0.14]}>
            <boxGeometry args={[0.35, 0.08, 0.06]} />
            <meshStandardMaterial color="#2a1a12" roughness={0.75} />
          </mesh>

          {/* Glasses frame - left */}
          <mesh position={[-0.09, 0.02, 0.24]}>
            <torusGeometry args={[0.06, 0.008, 8, 24]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.4} roughness={0.3} />
          </mesh>
          {/* Glasses frame - right */}
          <mesh position={[0.09, 0.02, 0.24]}>
            <torusGeometry args={[0.06, 0.008, 8, 24]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.4} roughness={0.3} />
          </mesh>
          {/* Glasses bridge */}
          <mesh position={[0, 0.02, 0.24]}>
            <boxGeometry args={[0.06, 0.008, 0.008]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.4} />
          </mesh>
          {/* Glasses temples */}
          <mesh position={[-0.15, 0.02, 0.15]} rotation={[0, 0.5, 0]}>
            <boxGeometry args={[0.12, 0.008, 0.008]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.4} />
          </mesh>
          <mesh position={[0.15, 0.02, 0.15]} rotation={[0, -0.5, 0]}>
            <boxGeometry args={[0.12, 0.008, 0.008]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.4} />
          </mesh>

          {/* Left eye */}
          <group position={[-0.09, 0.02, 0.22]}>
            <mesh>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh ref={leftEyeRef} position={[0, 0, 0.02]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial color="#3d2314" />
            </mesh>
            <mesh position={[0, 0, 0.03]}>
              <sphereGeometry args={[0.008, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          {/* Right eye */}
          <group position={[0.09, 0.02, 0.22]}>
            <mesh>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh ref={rightEyeRef} position={[0, 0, 0.02]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial color="#3d2314" />
            </mesh>
            <mesh position={[0, 0, 0.03]}>
              <sphereGeometry args={[0.008, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          {/* Eyebrows */}
          <mesh position={[-0.09, 0.08, 0.22]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.06, 0.012, 0.01]} />
            <meshStandardMaterial color="#2a1a12" />
          </mesh>
          <mesh position={[0.09, 0.08, 0.22]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[0.06, 0.012, 0.01]} />
            <meshStandardMaterial color="#2a1a12" />
          </mesh>

          {/* Nose */}
          <mesh position={[0, -0.03, 0.25]}>
            <coneGeometry args={[0.02, 0.05, 8]} />
            <meshStandardMaterial color="#e8c4b8" roughness={0.6} />
          </mesh>

          {/* Mouth - animated */}
          <mesh ref={mouthRef} position={[0, -0.1, 0.23]}>
            <boxGeometry args={[0.06, 0.015, 0.015]} />
            <meshStandardMaterial color="#c97878" />
          </mesh>

          {/* Smile lines */}
          <mesh position={[-0.06, -0.08, 0.22]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.02, 0.003, 0.003]} />
            <meshStandardMaterial color="#e0b8a8" />
          </mesh>
          <mesh position={[0.06, -0.08, 0.22]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.02, 0.003, 0.003]} />
            <meshStandardMaterial color="#e0b8a8" />
          </mesh>

          {/* Status indicators */}
          {isSpeaking && (
            <Html position={[0.35, 0.15, 0]} center>
              <div className="flex gap-0.5 items-end">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-primary rounded-full"
                    style={{ 
                      height: `${6 + Math.sin(Date.now() * 0.015 + i * 1.5) * 4}px`,
                      animation: "pulse 0.5s ease-in-out infinite",
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
            </Html>
          )}

          {isListening && (
            <Html position={[0.35, 0.15, 0]} center>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
            </Html>
          )}

          {isThinking && !isListening && !isSpeaking && (
            <Html position={[0.35, 0.15, 0]} center>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50" />
            </Html>
          )}
        </group>

        {/* Left arm */}
        <mesh position={[-0.42, -0.05, 0]} rotation={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.055, 0.35, 10, 16]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.35} />
        </mesh>
        
        {/* Right arm - holding tablet gesture */}
        <mesh position={[0.42, -0.05, 0.1]} rotation={[0.25, 0, -0.2]}>
          <capsuleGeometry args={[0.055, 0.35, 10, 16]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.35} />
        </mesh>

        {/* Holographic tablet */}
        <mesh position={[0.32, -0.12, 0.35]} rotation={[0.25, -0.2, 0]}>
          <planeGeometry args={[0.25, 0.18]} />
          <meshStandardMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.2}
            emissive="#00d4ff"
            emissiveIntensity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Tablet glow effect */}
        <mesh position={[0.32, -0.12, 0.34]} rotation={[0.25, -0.2, 0]}>
          <planeGeometry args={[0.28, 0.21]} />
          <meshStandardMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.08}
            emissive="#00d4ff"
            emissiveIntensity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Scene Component
function Scene({ 
  isSpeaking, 
  isListening, 
  isThinking,
  mouthOpenness,
  onClick
}: { 
  isSpeaking: boolean; 
  isListening: boolean;
  isThinking: boolean;
  mouthOpenness: number;
  onClick: () => void;
}) {
  return (
    <>
      {/* Studio lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.0} castShadow />
      <directionalLight position={[-3, 2, 3]} intensity={0.4} color="#e0e8ff" />
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-2, 1, 3]} intensity={0.3} color="#00d4ff" />
      <pointLight position={[2, 1, 3]} intensity={0.3} color="#00d4ff" />
      
      <Suspense fallback={null}>
        <VeraModel 
          isSpeaking={isSpeaking} 
          isListening={isListening}
          isThinking={isThinking}
          mouthOpenness={mouthOpenness}
          onClick={onClick}
        />
        <Environment preset="studio" />
      </Suspense>
    </>
  );
}

// Main Component
export default function Vera3DAvatar() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [mouthOpenness, setMouthOpenness] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const animationFrameRef = useRef<number | null>(null);

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
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Handle user query and generate response
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

  // Text-to-Speech with lip-sync
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
      utterance.pitch = 1.2;
    } else {
      // Fallback: increase pitch to feminize
      utterance.pitch = 1.4;
    }
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      startLipSyncAnimation();
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      stopLipSyncAnimation();
      setTimeout(() => setShowResponse(false), 4000);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      stopLipSyncAnimation();
    };
    
    synthRef.current.speak(utterance);
  }, [ttsEnabled, femaleVoice]);

  // Lip-sync animation
  const startLipSyncAnimation = useCallback(() => {
    const animate = () => {
      const time = Date.now() * 0.012;
      const amplitude = Math.abs(Math.sin(time) * Math.sin(time * 1.4) * Math.sin(time * 0.6));
      setMouthOpenness(amplitude * 0.7);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const stopLipSyncAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setMouthOpenness(0);
  }, []);

  // Handle avatar click - start listening
  const handleAvatarClick = useCallback(() => {
    if (!speechSupported || !recognitionRef.current) return;
    
    // Stop speaking if currently speaking
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      stopLipSyncAnimation();
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
  }, [speechSupported, isListening, isSpeaking, stopLipSyncAnimation]);

  return (
    <div className="fixed bottom-0 right-4 z-[9999]" style={{ width: "200px", height: "300px" }}>
      {/* 3D Canvas */}
      <div className="w-full h-full cursor-pointer">
        <Canvas
          camera={{ position: [0, 0.25, 1.8], fov: 42 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Scene 
            isSpeaking={isSpeaking} 
            isListening={isListening}
            isThinking={isThinking}
            mouthOpenness={mouthOpenness}
            onClick={handleAvatarClick}
          />
        </Canvas>
      </div>

      {/* Name Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/75 backdrop-blur-sm rounded-full border border-primary/50"
      >
        <span className="text-xs font-semibold text-primary">Vera</span>
        <span className="text-xs text-white/70 ml-1">• Tıkla & Konuş</span>
      </motion.div>

      {/* Legal Disclaimer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500/25 rounded text-center max-w-[180px]">
        <p className="text-[8px] text-amber-400 leading-tight">Vera bir yapay zekadır, Yatırım Tavsiyesi Vermez.</p>
      </div>

      {/* Status Indicator */}
      <AnimatePresence>
        {(isListening || isThinking || (transcript && !showResponse)) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/85 backdrop-blur-sm rounded-lg border border-white/20 max-w-[180px]"
          >
            {isListening && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-white">Dinliyorum...</span>
              </div>
            )}
            {isThinking && !isListening && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-xs text-white">Düşünüyorum...</span>
              </div>
            )}
            {transcript && !isListening && !isThinking && (
              <p className="text-xs text-white/80 truncate">{transcript}</p>
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
            className="absolute bottom-[80px] right-[210px] w-[260px] max-h-[180px] overflow-y-auto p-3 bg-black/92 backdrop-blur-xl rounded-xl border border-primary/40 shadow-xl shadow-primary/10"
          >
            <p className="text-sm text-white leading-relaxed">{response}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TTS Toggle */}
      {speechSupported && (
        <button
          onClick={() => setTtsEnabled(!ttsEnabled)}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
            ttsEnabled ? "bg-primary/40 text-primary" : "bg-white/15 text-white/50"
          }`}
        >
          {ttsEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        </button>
      )}
    </div>
  );
}
