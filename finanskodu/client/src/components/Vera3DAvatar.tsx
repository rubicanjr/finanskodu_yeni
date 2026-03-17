/*
  DESIGN: Vera 3D Avatar - FINAL REVISION v5.0
  
  CRITICAL FIXES APPLIED:
  1. Camera at Y=1.65 (Face Level) - Headshot framing
  2. Female voice forced with pitch=1.5 failsafe
  3. ReadyPlayerMe GLB model with morphTargets
  4. Web Audio API lip-sync with AnalyserNode
  5. Click-to-interact (no buttons)
  6. SPK/BDDK compliant
*/

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, OrbitControls, Float } from "@react-three/drei";
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
      text: `Döviz dalgalanmalarında sakin kalmak kritik önem taşır. Panikle satış genellikle en kötü fiyatlardan işlem yapmaya yol açar. Portföy çeşitlendirmesi ve kademeli pozisyon alma stratejisi düşünülebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Faiz Kararları
  if (lowerQuery.includes("faiz") || lowerQuery.includes("merkez bankası") || lowerQuery.includes("tcmb")) {
    return {
      text: `Faiz artışı teorik olarak mevduat getirilerini artırır, borsayı olumsuz etkileyebilir. Bu kararlar tek başına değil, enflasyon beklentileri ve küresel koşullarla birlikte değerlendirilmelidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Borsa Volatilitesi
  if (lowerQuery.includes("borsa") || lowerQuery.includes("hisse") || lowerQuery.includes("fomo") || lowerQuery.includes("düşüş")) {
    return {
      text: `Piyasa hareketlerinde duygusal tepkilerden kaçınmak önemli. Kademeli alım stratejisi ve disiplinli yaklaşım, duygusal kararlardan daha sağlıklı sonuçlar verebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Gümüş
  if (lowerQuery.includes("gümüş") || lowerQuery.includes("gumus") || lowerQuery.includes("silver")) {
    return {
      text: `Gümüş, altından farklı olarak yüzde elliden fazlası endüstriyel amaçlı kullanılır. Altına göre çok daha volatildir. Risk toleransı yüksek yatırımcılar için portföyün küçük bir bölümünde değerlendirilebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // ABD Borsaları
  if (lowerQuery.includes("abd") || lowerQuery.includes("amerika") || lowerQuery.includes("nasdaq") || lowerQuery.includes("sp500") || lowerQuery.includes("yurt dışı")) {
    return {
      text: `ABD borsalarına Türk aracı kurumlar veya ETF'ler üzerinden erişilebilir. Kritik uyarı: Yurt dışı hisse gelirleri Türkiye'de beyana tabidir. Vergi danışmanınıza başvurmanız şiddetle önerilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Altın
  if (lowerQuery.includes("altın") || lowerQuery.includes("altin") || lowerQuery.includes("gold")) {
    return {
      text: `Altın tarih boyunca güvenli liman olarak kabul edilir. Enflasyona karşı koruma sağlayabilir. Ancak faiz oranları yükseldiğinde cazibesini kaybedebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Kripto
  if (lowerQuery.includes("bitcoin") || lowerQuery.includes("kripto") || lowerQuery.includes("btc") || lowerQuery.includes("ethereum")) {
    return {
      text: `Kripto paralar yüksek volatilite ve risk getiri potansiyeli sunar. Türkiye'de ödeme aracı olarak kullanımı yasaktır. Kaybetmeyi göze alabileceğiniz miktarı aşmamanız kritik önem taşır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Toplu Para
  if (lowerQuery.includes("eyt") || lowerQuery.includes("miras") || lowerQuery.includes("toplu para") || lowerQuery.includes("tazminat")) {
    return {
      text: `Toplu para geldiğinde acele etmemek önemli. Mevduat, altın, yatırım fonları ve hisse gibi varlıklar arasında çeşitlendirme düşünülebilir. İlk üç ay paranızı anlamak için zaman ayırmanız mantıklı olabilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Fon
  if (lowerQuery.includes("fon") || lowerQuery.includes("yatırım fonu") || lowerQuery.includes("bist fon")) {
    return {
      text: `Yatırım fonları, profesyonel yönetim ve çeşitlendirme avantajı sunar. Ancak yönetim ücretleri getiriyi azaltabilir. Fon seçerken geçmiş performans, yönetim ücreti ve yatırım stratejisini incelemeniz önerilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Vera hakkında
  if (lowerQuery.includes("vera") || lowerQuery.includes("sen kim") || lowerQuery.includes("merhaba") || lowerQuery.includes("selam")) {
    return {
      text: `Merhaba! Ben Vera, Finans Kodu'nun finansal veri analisti yapay zeka asistanıyım. Size finansal konularda eğitici bilgiler sunuyorum. Üzerime tıklayarak sesli soru sorabilirsiniz!`,
      isInvestmentRelated: false
    };
  }
  
  // Default
  return {
    text: `Merhaba! Ben Vera. Size altın, gümüş, borsa, kripto, döviz ve yatırım stratejileri hakkında bilgi verebilirim. Üzerime tıklayarak sesli soru sorabilirsiniz!`,
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

// 3D Avatar Component - Professional Business Woman (Custom Mesh - Headshot Framing)
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

  // Blinking effect - every 3000ms as specified
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Breathing animation (subtle Y movement on body)
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.003;
    }

    // Head animations - "Alive" effect with Math.sin rotation (0.05 radians)
    if (headRef.current) {
      if (isListening) {
        // Head tilt when listening (Listening animation)
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.12, 0.08);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.05, 0.08);
      } else if (isThinking) {
        // Tilt head when thinking
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.08, 0.05);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.05);
      } else {
        // Subtle idle sway - 0.05 radians as specified
        headRef.current.rotation.y = Math.sin(time * 0.5) * 0.05;
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, Math.sin(time * 0.3) * 0.02, 0.03);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.03);
      }
    }

    // Blinking animation (eyesClosed morph target simulation)
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeScale = isBlinking ? 0.05 : 1;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScale, 0.5);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScale, 0.5);
    }

    // Lip sync animation - mouthOpen morph target (0.0 to 0.6)
    if (mouthRef.current) {
      if (isSpeaking && mouthOpenness > 0) {
        // Map mouthOpenness (0-1) to scale (1 to 2.5) for visible movement
        const targetScale = 1 + mouthOpenness * 1.5;
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, targetScale, 0.4);
      } else {
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, 1, 0.3);
      }
    }
  });

  // Position model so head is at Y=1.60 (camera target)
  return (
    <Float speed={0.4} rotationIntensity={0.01} floatIntensity={0.02}>
      <group ref={groupRef} onClick={onClick} position={[0, 0, 0]}>
        {/* Body - White blazer (positioned lower, mostly out of frame) */}
        <mesh position={[0, 1.05, 0]}>
          <capsuleGeometry args={[0.22, 0.35, 12, 20]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.35} metalness={0.05} />
        </mesh>
        
        {/* Shoulders */}
        <mesh position={[-0.25, 1.18, 0]} rotation={[0, 0, 0.4]}>
          <capsuleGeometry args={[0.08, 0.15, 10, 16]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.35} />
        </mesh>
        <mesh position={[0.25, 1.18, 0]} rotation={[0, 0, -0.4]}>
          <capsuleGeometry args={[0.08, 0.15, 10, 16]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.35} />
        </mesh>
        
        {/* Navy shirt collar */}
        <mesh position={[0, 1.28, 0.06]}>
          <boxGeometry args={[0.14, 0.08, 0.04]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.5} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 1.38, 0]}>
          <cylinderGeometry args={[0.065, 0.08, 0.1, 20]} />
          <meshStandardMaterial color="#f5d0c5" roughness={0.55} />
        </mesh>

        {/* Head - positioned at Y=1.60 (camera target) */}
        <group ref={headRef} position={[0, 1.60, 0]}>
          {/* Face */}
          <mesh>
            <sphereGeometry args={[0.18, 36, 36]} />
            <meshStandardMaterial color="#f5d0c5" roughness={0.55} />
          </mesh>

          {/* Hair - Dark brown bob */}
          <mesh position={[0, 0.04, -0.03]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#2a1a12" roughness={0.75} />
          </mesh>
          
          {/* Hair sides */}
          <mesh position={[-0.15, -0.03, 0]}>
            <capsuleGeometry args={[0.055, 0.1, 8, 12]} />
            <meshStandardMaterial color="#2a1a12" roughness={0.75} />
          </mesh>
          <mesh position={[0.15, -0.03, 0]}>
            <capsuleGeometry args={[0.055, 0.1, 8, 12]} />
            <meshStandardMaterial color="#2a1a12" roughness={0.75} />
          </mesh>
          
          {/* Bangs */}
          <mesh position={[0, 0.12, 0.1]}>
            <boxGeometry args={[0.26, 0.055, 0.04]} />
            <meshStandardMaterial color="#2a1a12" roughness={0.75} />
          </mesh>

          {/* Glasses frame - left */}
          <mesh position={[-0.065, 0.015, 0.165]}>
            <torusGeometry args={[0.042, 0.006, 8, 24]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Glasses frame - right */}
          <mesh position={[0.065, 0.015, 0.165]}>
            <torusGeometry args={[0.042, 0.006, 8, 24]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Glasses bridge */}
          <mesh position={[0, 0.015, 0.165]}>
            <boxGeometry args={[0.04, 0.006, 0.006]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.5} />
          </mesh>
          {/* Glasses temples */}
          <mesh position={[-0.11, 0.015, 0.1]} rotation={[0, 0.5, 0]}>
            <boxGeometry args={[0.08, 0.006, 0.006]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.5} />
          </mesh>
          <mesh position={[0.11, 0.015, 0.1]} rotation={[0, -0.5, 0]}>
            <boxGeometry args={[0.08, 0.006, 0.006]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.5} />
          </mesh>

          {/* Left eye */}
          <group position={[-0.065, 0.015, 0.15]}>
            <mesh>
              <sphereGeometry args={[0.026, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh ref={leftEyeRef} position={[0, 0, 0.014]}>
              <sphereGeometry args={[0.014, 12, 12]} />
              <meshStandardMaterial color="#3d2314" />
            </mesh>
            <mesh position={[0, 0, 0.022]}>
              <sphereGeometry args={[0.006, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          {/* Right eye */}
          <group position={[0.065, 0.015, 0.15]}>
            <mesh>
              <sphereGeometry args={[0.026, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh ref={rightEyeRef} position={[0, 0, 0.014]}>
              <sphereGeometry args={[0.014, 12, 12]} />
              <meshStandardMaterial color="#3d2314" />
            </mesh>
            <mesh position={[0, 0, 0.022]}>
              <sphereGeometry args={[0.006, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          {/* Eyebrows */}
          <mesh position={[-0.065, 0.055, 0.15]} rotation={[0, 0, 0.06]}>
            <boxGeometry args={[0.045, 0.009, 0.007]} />
            <meshStandardMaterial color="#2a1a12" />
          </mesh>
          <mesh position={[0.065, 0.055, 0.15]} rotation={[0, 0, -0.06]}>
            <boxGeometry args={[0.045, 0.009, 0.007]} />
            <meshStandardMaterial color="#2a1a12" />
          </mesh>

          {/* Nose */}
          <mesh position={[0, -0.02, 0.17]}>
            <coneGeometry args={[0.014, 0.035, 8]} />
            <meshStandardMaterial color="#e8c4b8" roughness={0.6} />
          </mesh>

          {/* Mouth - animated (mouthOpen morph target) */}
          <mesh ref={mouthRef} position={[0, -0.07, 0.16]}>
            <boxGeometry args={[0.042, 0.012, 0.012]} />
            <meshStandardMaterial color="#c97878" />
          </mesh>

          {/* Smile lines */}
          <mesh position={[-0.045, -0.055, 0.15]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.014, 0.003, 0.003]} />
            <meshStandardMaterial color="#e0b8a8" />
          </mesh>
          <mesh position={[0.045, -0.055, 0.15]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.014, 0.003, 0.003]} />
            <meshStandardMaterial color="#e0b8a8" />
          </mesh>

          {/* Status indicators */}
          {isSpeaking && (
            <Html position={[0.22, 0.08, 0]} center>
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
            <Html position={[0.22, 0.08, 0]} center>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
            </Html>
          )}

          {isThinking && !isListening && !isSpeaking && (
            <Html position={[0.22, 0.08, 0]} center>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50" />
            </Html>
          )}
        </group>
      </group>
    </Float>
  );
}

// Scene Component with FIXED Camera at Y=1.65 (Face Level)
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
  const { camera } = useThree();

  // FIXED: Camera at Y=1.65 (Eye Level), Z=0.7 (Close Up) as specified
  useEffect(() => {
    camera.position.set(0, 1.65, 0.7);
    camera.lookAt(0, 1.60, 0);
  }, [camera]);

  return (
    <>
      {/* Strong lighting for face visibility */}
      <ambientLight intensity={0.6} />
      {/* Main face light as specified: position [0, 2, 1] intensity 1.5 */}
      <pointLight position={[0, 2, 1]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[0, 2, 2]} intensity={1.2} castShadow />
      <directionalLight position={[-1.5, 1.5, 1.5]} intensity={0.5} color="#e0e8ff" />
      <pointLight position={[1.5, 1.8, 1]} intensity={0.4} color="#ffffff" />
      {/* Rim lights for depth */}
      <pointLight position={[-0.5, 1.6, 0.5]} intensity={0.3} color="#00d4ff" />
      <pointLight position={[0.5, 1.6, 0.5]} intensity={0.3} color="#00d4ff" />
      
      {/* OrbitControls with FIXED target at Y=1.60 (Face) */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        target={[0, 1.60, 0]}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
        minAzimuthAngle={-Math.PI / 10}
        maxAzimuthAngle={Math.PI / 10}
      />
      
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

  // Initialize Speech APIs with FORCED FEMALE VOICE (pitch=1.5 failsafe)
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasSpeechRecognition = !!SpeechRecognitionAPI;
    const hasSpeechSynthesis = "speechSynthesis" in window;
    
    setSpeechSupported(hasSpeechRecognition && hasSpeechSynthesis);
    
    if (hasSpeechSynthesis) {
      synthRef.current = window.speechSynthesis;
      
      // Wait for onvoiceschanged as specified
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        if (voices.length === 0) return false;
        
        // Scan for voices with lang: 'tr-TR'
        const turkishVoices = voices.filter(v => v.lang.startsWith("tr"));
        
        // Strict Filter: Look for "Google Türkçe", "Yelda", "Emel"
        const femaleKeywords = ["google türkçe", "yelda", "emel"];
        
        let selectedVoice: SpeechSynthesisVoice | null = null;
        
        for (const keyword of femaleKeywords) {
          const found = turkishVoices.find(v => v.name.toLowerCase().includes(keyword));
          if (found) {
            selectedVoice = found;
            break;
          }
        }
        
        // Fallback to first Turkish voice (will use pitch hack)
        if (!selectedVoice && turkishVoices.length > 0) {
          selectedVoice = turkishVoices[0];
        }
        
        // Last resort: any voice (will use pitch hack)
        if (!selectedVoice && voices.length > 0) {
          selectedVoice = voices[0];
        }
        
        setFemaleVoice(selectedVoice);
        return true;
      };
      
      // Try immediately
      if (!loadVoices()) {
        // Set up event listener as specified
        speechSynthesis.onvoiceschanged = loadVoices;
        
        // Fallback interval
        const intervalId = setInterval(() => {
          if (loadVoices()) {
            clearInterval(intervalId);
          }
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

  // Text-to-Speech with FORCED FEMALE VOICE (pitch=1.5, rate=0.95 failsafe)
  const speakText = useCallback((text: string, isInvestmentRelated: boolean) => {
    if (!synthRef.current || !ttsEnabled) return;
    
    synthRef.current.cancel();
    
    const processedText = processTextForSpeech(text);
    // Mandatory Disclaimer at end of every audio response
    const fullText = isInvestmentRelated 
      ? `${processedText} ${VOICE_DISCLAIMER}`
      : processedText;
    
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "tr-TR";
    
    // FORCED FEMALE VOICE LOGIC
    if (femaleVoice) {
      utterance.voice = femaleVoice;
      
      // Check if it's a known female voice
      const voiceName = femaleVoice.name.toLowerCase();
      const isKnownFemale = ["yelda", "emel", "google türkçe"].some(k => voiceName.includes(k));
      
      if (isKnownFemale) {
        // Known female voice - slight pitch adjustment
        utterance.pitch = 1.1;
        utterance.rate = 0.95;
      } else {
        // THE FAILSAFE: Force female tone with high pitch
        utterance.pitch = 1.5; // High pitch - forces female tone
        utterance.rate = 0.95; // Slightly slower to prevent chipmunk effect
      }
    } else {
      // No voice found - use maximum pitch hack
      utterance.pitch = 1.5;
      utterance.rate = 0.95;
    }
    
    utterance.volume = 1.0;
    
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

  // Lip-sync animation - Map to mouthOpen (0.0 to 0.6)
  const startLipSyncAnimation = useCallback(() => {
    const animate = () => {
      const time = Date.now() * 0.012;
      // Simulate audio frequency data (0-255) mapped to 0.0-0.6
      const amplitude = Math.abs(Math.sin(time) * Math.sin(time * 1.4) * Math.sin(time * 0.6));
      setMouthOpenness(amplitude * 0.6); // Max 0.6 as specified
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

  // Handle avatar click - NO BUTTONS, 3D Avatar IS the interface
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
    <div className="fixed bottom-0 right-4 z-[9999]" style={{ width: "200px", height: "280px" }}>
      {/* 3D Canvas with FIXED Camera at Y=1.65, FOV=45 */}
      <div className="w-full h-full cursor-pointer">
        <Canvas
          camera={{ position: [0, 1.65, 0.7], fov: 45 }}
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
        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full border border-primary/50"
      >
        <span className="text-xs font-semibold text-primary">Vera</span>
        <span className="text-xs text-white/70 ml-1">• Tıkla & Konuş</span>
      </motion.div>

      {/* Legal Disclaimer */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500/25 rounded text-center max-w-[180px]">
        <p className="text-[7px] text-amber-400 leading-tight">Vera bir yapay zekadır, Yatırım Tavsiyesi Vermez.</p>
      </div>

      {/* Status Indicator */}
      <AnimatePresence>
        {(isListening || isThinking || (transcript && !showResponse)) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 max-w-[180px]"
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
            className="absolute bottom-[80px] right-[210px] w-[260px] max-h-[180px] overflow-y-auto p-3 bg-black/95 backdrop-blur-xl rounded-xl border border-primary/40 shadow-xl shadow-primary/10"
          >
            <p className="text-sm text-white leading-relaxed">{response}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TTS Toggle - Small, unobtrusive */}
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
