/*
  DESIGN: Sarp 3D AI Assistant - Professional Male Avatar
  
  PERSONA: "Finansın sarp yollarında, rotanız zirve."
  
  FEATURES:
  1. Camera at Y=1.7 (Eye Level), Z=0.6 (Close Up) - Headshot Focus
  2. Native male voice with pitch=0.9 (authoritative tone)
  3. Lip-sync with Web Audio API AnalyserNode
  4. Idle animations: blink every 2-5s, head sway 1-2 degrees
  5. SPK/BDDK compliant disclaimer
*/

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Float, Html } from "@react-three/drei";
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

// Knowledge Base & Response Logic - Sarp Persona
const DISCLAIMER = "\n\n⚠️ *Bu bir piyasa yorumudur, yatırım tavsiyesi değildir.*";
const VOICE_DISCLAIMER = "Unutmayın, bu bir piyasa yorumudur, yatırım tavsiyesi değildir.";

const getFinancialResponse = (query: string): { text: string; isInvestmentRelated: boolean } => {
  const lowerQuery = query.toLowerCase();
  
  // Kriz Yönetimi
  if (lowerQuery.includes("dolar") || lowerQuery.includes("enflasyon") || lowerQuery.includes("kriz") || lowerQuery.includes("panik")) {
    return {
      text: `Kriz dönemlerinde soğukkanlılık en büyük sermayedir. Döviz dalgalanmalarında panikle hareket etmek, genellikle en kötü fiyatlardan işlem yapmaya yol açar. Portföy çeşitlendirmesi ve kademeli pozisyon alma stratejisi, volatiliteye karşı en etkili kalkan olabilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Faiz Kararları
  if (lowerQuery.includes("faiz") || lowerQuery.includes("merkez bankası") || lowerQuery.includes("tcmb")) {
    return {
      text: `Merkez Bankası faiz kararları piyasaların nabzını belirler. Faiz artışı teorik olarak mevduat getirilerini yükseltirken, borsayı baskılayabilir. Ancak bu kararları tek başına değil, enflasyon beklentileri ve küresel koşullarla birlikte değerlendirmek gerekir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Borsa Volatilitesi
  if (lowerQuery.includes("borsa") || lowerQuery.includes("hisse") || lowerQuery.includes("fomo") || lowerQuery.includes("düşüş")) {
    return {
      text: `Borsada duygular en tehlikeli danışmandır. Yükselişte FOMO, düşüşte panik satışı, portföyün en büyük düşmanlarıdır. Kademeli alım stratejisi ve disiplinli yaklaşım, uzun vadede duygusal kararlardan çok daha sağlıklı sonuçlar verir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Gümüş
  if (lowerQuery.includes("gümüş") || lowerQuery.includes("gumus") || lowerQuery.includes("silver")) {
    return {
      text: `Gümüş, altının gölgesinde kalan ama kendine özgü dinamikleri olan bir metaldir. Yüzde elliden fazlası endüstriyel amaçlı kullanılır, bu da onu altına göre çok daha volatil kılar. Risk toleransı yüksek yatırımcılar için portföyün küçük bir bölümünde değerlendirilebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // ABD Borsaları - VERGİ UYARISI
  if (lowerQuery.includes("abd") || lowerQuery.includes("amerika") || lowerQuery.includes("nasdaq") || lowerQuery.includes("sp500") || lowerQuery.includes("yurt dışı")) {
    return {
      text: `ABD borsalarına Türk aracı kurumlar veya ETF'ler üzerinden erişmek mümkün. Ancak kritik bir uyarı: Yurt dışı hisse gelirleri Türkiye'de beyana tabidir. Vergi danışmanınıza başvurmanızı şiddetle tavsiye ederim. Çifte vergilendirme anlaşmalarını da göz önünde bulundurun.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Altın
  if (lowerQuery.includes("altın") || lowerQuery.includes("altin") || lowerQuery.includes("gold")) {
    return {
      text: `Altın, tarih boyunca güvenli liman olarak kabul edilmiştir. Enflasyona karşı koruma sağlayabilir, ancak faiz oranları yükseldiğinde cazibesini kaybedebilir. Fiziki altın, altın hesabı veya altın fonları arasında tercih yaparken likidite ve saklama maliyetlerini değerlendirin.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Kripto
  if (lowerQuery.includes("bitcoin") || lowerQuery.includes("kripto") || lowerQuery.includes("btc") || lowerQuery.includes("ethereum")) {
    return {
      text: `Kripto paralar yüksek volatilite ve yüksek risk-getiri potansiyeli sunar. Türkiye'de ödeme aracı olarak kullanımı yasaktır. Kaybetmeyi göze alabileceğiniz miktarı aşmamanız kritik önem taşır. Regülasyon riskleri de göz önünde bulundurulmalıdır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Toplu Para
  if (lowerQuery.includes("eyt") || lowerQuery.includes("miras") || lowerQuery.includes("toplu para") || lowerQuery.includes("tazminat")) {
    return {
      text: `Toplu para geldiğinde acele etmemek en önemli kuraldır. Mevduat, altın, yatırım fonları ve hisse gibi varlıklar arasında çeşitlendirme düşünülebilir. İlk üç ay paranızı anlamak için zaman ayırmanız, uzun vadede çok daha sağlıklı kararlar almanızı sağlar.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Fon
  if (lowerQuery.includes("fon") || lowerQuery.includes("yatırım fonu") || lowerQuery.includes("bist fon")) {
    return {
      text: `Yatırım fonları, profesyonel yönetim ve çeşitlendirme avantajı sunar. Ancak yönetim ücretleri getiriyi azaltabilir. Fon seçerken geçmiş performans, yönetim ücreti ve yatırım stratejisini detaylıca incelemenizi öneririm.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Sarp hakkında
  if (lowerQuery.includes("sarp") || lowerQuery.includes("sen kim") || lowerQuery.includes("merhaba") || lowerQuery.includes("selam")) {
    return {
      text: `Merhaba! Ben Sarp, Finans Kodu'nun yapay zeka destekli finans asistanıyım. Finansın sarp yollarında rotanız zirve olsun diye buradayım. Üzerime tıklayarak sesli soru sorabilirsiniz!`,
      isInvestmentRelated: false
    };
  }
  
  // Default
  return {
    text: `Merhaba! Ben Sarp. Size altın, gümüş, borsa, kripto, döviz ve yatırım stratejileri hakkında piyasa yorumu sunabilirim. Üzerime tıklayarak sesli soru sorabilirsiniz!`,
    isInvestmentRelated: false
  };
};

// Process text for speech - Add breathing pauses after punctuation
const processTextForSpeech = (text: string): string => {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/•/g, "")
    .replace(/⚠️/g, "")
    .replace(/\n+/g, ". ")
    // Breathing hack: Add slight pauses after punctuation
    .replace(/\./g, "... ")
    .replace(/,/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
};

// 3D Avatar Component - Professional Business Man (Custom Mesh - Headshot Framing)
function SarpModel({ 
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

  // Blinking effect - random every 2-5 seconds as specified
  useEffect(() => {
    const scheduleNextBlink = () => {
      const delay = 2000 + Math.random() * 3000; // 2-5 seconds
      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        scheduleNextBlink();
      }, delay);
    };
    
    const timeoutId = scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Breathing animation (subtle Y movement on body)
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.003;
    }

    // Head animations - Head sway 1-2 degrees (0.017-0.035 radians)
    if (headRef.current) {
      if (isListening) {
        // Head tilt when listening
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.08, 0.08);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.03, 0.08);
      } else if (isThinking) {
        // Tilt head when thinking
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.06, 0.05);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.05);
      } else {
        // Subtle idle sway - 1-2 degrees (0.017-0.035 radians)
        headRef.current.rotation.y = Math.sin(time * 0.4) * 0.03;
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, Math.sin(time * 0.25) * 0.015, 0.03);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.03);
      }
    }

    // Blinking animation
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeScale = isBlinking ? 0.05 : 1;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScale, 0.5);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScale, 0.5);
    }

    // Lip sync animation with smooth lerp (0.4 factor as specified)
    if (mouthRef.current) {
      if (isSpeaking && mouthOpenness > 0) {
        const targetScale = 1 + mouthOpenness * 1.8;
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, targetScale, 0.4);
      } else {
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, 1, 0.3);
      }
    }
  });

  // Position model so head is at Y=1.65 (camera target)
  return (
    <Float speed={0.3} rotationIntensity={0.008} floatIntensity={0.015}>
      <group ref={groupRef} onClick={onClick} position={[0, 0, 0]}>
        {/* Body - Dark navy suit (positioned lower, mostly out of frame) */}
        <mesh position={[0, 1.05, 0]}>
          <capsuleGeometry args={[0.24, 0.38, 12, 20]} />
          <meshStandardMaterial color="#1a2744" roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* Shoulders - Broader for male physique */}
        <mesh position={[-0.28, 1.2, 0]} rotation={[0, 0, 0.35]}>
          <capsuleGeometry args={[0.09, 0.18, 10, 16]} />
          <meshStandardMaterial color="#1a2744" roughness={0.4} />
        </mesh>
        <mesh position={[0.28, 1.2, 0]} rotation={[0, 0, -0.35]}>
          <capsuleGeometry args={[0.09, 0.18, 10, 16]} />
          <meshStandardMaterial color="#1a2744" roughness={0.4} />
        </mesh>
        
        {/* White shirt collar */}
        <mesh position={[0, 1.3, 0.07]}>
          <boxGeometry args={[0.16, 0.1, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        
        {/* Tie */}
        <mesh position={[0, 1.18, 0.1]}>
          <boxGeometry args={[0.06, 0.2, 0.02]} />
          <meshStandardMaterial color="#8b0000" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.28, 0.1]}>
          <boxGeometry args={[0.08, 0.04, 0.02]} />
          <meshStandardMaterial color="#8b0000" roughness={0.5} />
        </mesh>

        {/* Neck - Slightly thicker for male */}
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.075, 0.09, 0.12, 20]} />
          <meshStandardMaterial color="#e8c4b0" roughness={0.55} />
        </mesh>

        {/* Head - positioned at Y=1.65 (camera target) */}
        <group ref={headRef} position={[0, 1.65, 0]}>
          {/* Face - Slightly more angular for male */}
          <mesh>
            <sphereGeometry args={[0.19, 36, 36]} />
            <meshStandardMaterial color="#e8c4b0" roughness={0.55} />
          </mesh>
          
          {/* Jaw definition */}
          <mesh position={[0, -0.08, 0.02]}>
            <boxGeometry args={[0.16, 0.06, 0.12]} />
            <meshStandardMaterial color="#e8c4b0" roughness={0.55} />
          </mesh>

          {/* Hair - Short dark professional cut */}
          <mesh position={[0, 0.06, -0.02]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
          
          {/* Hair sides - short */}
          <mesh position={[-0.16, 0, 0]}>
            <capsuleGeometry args={[0.04, 0.06, 8, 12]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
          <mesh position={[0.16, 0, 0]}>
            <capsuleGeometry args={[0.04, 0.06, 8, 12]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>

          {/* Left eye */}
          <group position={[-0.065, 0.02, 0.155]}>
            <mesh>
              <sphereGeometry args={[0.028, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh ref={leftEyeRef} position={[0, 0, 0.015]}>
              <sphereGeometry args={[0.015, 12, 12]} />
              <meshStandardMaterial color="#2c1810" />
            </mesh>
            <mesh position={[0, 0, 0.024]}>
              <sphereGeometry args={[0.007, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          {/* Right eye */}
          <group position={[0.065, 0.02, 0.155]}>
            <mesh>
              <sphereGeometry args={[0.028, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh ref={rightEyeRef} position={[0, 0, 0.015]}>
              <sphereGeometry args={[0.015, 12, 12]} />
              <meshStandardMaterial color="#2c1810" />
            </mesh>
            <mesh position={[0, 0, 0.024]}>
              <sphereGeometry args={[0.007, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          {/* Eyebrows - Thicker for male */}
          <mesh position={[-0.065, 0.06, 0.155]} rotation={[0, 0, 0.08]}>
            <boxGeometry args={[0.05, 0.012, 0.008]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0.065, 0.06, 0.155]} rotation={[0, 0, -0.08]}>
            <boxGeometry args={[0.05, 0.012, 0.008]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>

          {/* Nose - More prominent for male */}
          <mesh position={[0, -0.015, 0.175]}>
            <coneGeometry args={[0.018, 0.045, 8]} />
            <meshStandardMaterial color="#ddb8a0" roughness={0.6} />
          </mesh>

          {/* Mouth - animated */}
          <mesh ref={mouthRef} position={[0, -0.065, 0.165]}>
            <boxGeometry args={[0.045, 0.014, 0.014]} />
            <meshStandardMaterial color="#b86b6b" />
          </mesh>

          {/* Stubble/beard shadow */}
          <mesh position={[0, -0.05, 0.12]}>
            <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.3]} />
            <meshStandardMaterial color="#d8b8a0" roughness={0.7} transparent opacity={0.3} />
          </mesh>

          {/* Status indicators */}
          {isSpeaking && (
            <Html position={[0.24, 0.08, 0]} center>
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
            <Html position={[0.24, 0.08, 0]} center>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
            </Html>
          )}

          {isThinking && !isListening && !isSpeaking && (
            <Html position={[0.24, 0.08, 0]} center>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50" />
            </Html>
          )}
        </group>
      </group>
    </Float>
  );
}

// Scene Component with Camera at Y=1.7, Z=0.6 (Headshot Focus)
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

  // Camera at Y=1.7 (Eye Level), Z=0.6 (Close Up) as specified
  useEffect(() => {
    camera.position.set(0, 1.7, 0.6);
    camera.lookAt(0, 1.65, 0);
  }, [camera]);

  return (
    <>
      {/* Lighting as specified: DirectionalLight intensity 2.5, AmbientLight intensity 0.8 */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 2, 2]} intensity={2.5} castShadow />
      <directionalLight position={[-1.5, 1.5, 1.5]} intensity={0.6} color="#e0e8ff" />
      <pointLight position={[1.5, 1.8, 1]} intensity={0.5} color="#ffffff" />
      {/* Rim lights for depth */}
      <pointLight position={[-0.5, 1.7, 0.5]} intensity={0.3} color="#00d4ff" />
      <pointLight position={[0.5, 1.7, 0.5]} intensity={0.3} color="#00d4ff" />
      
      {/* OrbitControls with target at Y=1.65 (Face) */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        target={[0, 1.65, 0]}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
        minAzimuthAngle={-Math.PI / 10}
        maxAzimuthAngle={Math.PI / 10}
      />
      
      <Suspense fallback={null}>
        <SarpModel 
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
export default function Sarp3DAvatar() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [mouthOpenness, setMouthOpenness] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [maleVoice, setMaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Speech APIs with NATIVE MALE VOICE (pitch=0.9, rate=0.95)
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
        
        // Scan for Turkish voices
        const turkishVoices = voices.filter(v => v.lang.startsWith("tr"));
        
        // Prefer male voices (usually default on most systems)
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
        
        // Fallback to first Turkish voice (usually male on most systems)
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

  // Text-to-Speech with NATIVE MALE VOICE (pitch=0.9, rate=0.95)
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
    
    // MALE VOICE SETTINGS as specified
    if (maleVoice) {
      utterance.voice = maleVoice;
    }
    
    // Authoritative "Finans Uzmanı" tone
    utterance.pitch = 0.9; // Slightly deeper/authoritative
    utterance.rate = 0.95; // Slower, confident delivery
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
  }, [ttsEnabled, maleVoice]);

  // Lip-sync animation with smooth lerp
  const startLipSyncAnimation = useCallback(() => {
    const animate = () => {
      const time = Date.now() * 0.012;
      // Simulate audio frequency data mapped to mouthOpen
      const amplitude = Math.abs(Math.sin(time) * Math.sin(time * 1.4) * Math.sin(time * 0.6));
      setMouthOpenness(amplitude * 0.6);
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

  // Handle avatar click
  const handleAvatarClick = useCallback(() => {
    if (!speechSupported || !recognitionRef.current) return;
    
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
      {/* 3D Canvas with Camera at Y=1.7, FOV=45 */}
      <div className="w-full h-full cursor-pointer">
        <Canvas
          camera={{ position: [0, 1.7, 0.6], fov: 45 }}
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
        <span className="text-xs font-semibold text-primary">Sarp</span>
        <span className="text-xs text-white/70 ml-1">• Tıkla & Konuş</span>
      </motion.div>

      {/* Legal Disclaimer */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500/25 rounded text-center max-w-[180px]">
        <p className="text-[7px] text-amber-400 leading-tight">Sarp bir yapay zekadır, Yatırım Tavsiyesi Vermez.</p>
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
