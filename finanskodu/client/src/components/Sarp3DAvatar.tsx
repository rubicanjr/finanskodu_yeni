/*
  DESIGN: Sarp 3D Avatar - Custom GitHub GLB Model Integration
  
  FEATURES:
  1. GitHub-hosted GLB model loading with auto-scaling
  2. Touch-to-Unlock mobile audio fix (critical for iOS/Android)
  3. Adaptive lip-sync (morph targets OR jaw bone rotation)
  4. Portrait/Headshot camera mode [0, 1.65, 0.7]
  5. Turkish male voice with pitch=0.9, rate=0.95
  6. SPK/BDDK compliant disclaimer
*/

import { Suspense, useState, useRef, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Mic, MicOff } from "lucide-react";
// GLTF type from drei

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

// GitHub Raw GLB Model URL
const SARP_URL = "https://github.com/rubicanjr/avatar-model/raw/master/model.glb";

// Knowledge Base
const DISCLAIMER = "\n\n⚠️ *Bu bir yatırım tavsiyesi değildir.*";
const VOICE_DISCLAIMER = "Bu bir yatırım tavsiyesi değildir.";

type ResponseType = {
  text: string;
  isInvestmentRelated: boolean;
};

const getFinancialResponse = (query: string): ResponseType => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("dolar") || lowerQuery.includes("enflasyon") || lowerQuery.includes("kriz")) {
    return {
      text: `Kriz dönemlerinde soğukkanlılık en büyük sermayedir. Portföy çeşitlendirmesi ve kademeli pozisyon alma stratejisi, volatiliteye karşı etkili bir kalkan olabilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  if (lowerQuery.includes("faiz") || lowerQuery.includes("merkez bankası")) {
    return {
      text: `Merkez Bankası faiz kararları piyasaların nabzını belirler. Bu kararları enflasyon beklentileri ve küresel koşullarla birlikte değerlendirmek gerekir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  if (lowerQuery.includes("borsa") || lowerQuery.includes("hisse")) {
    return {
      text: `Borsada duygular en tehlikeli danışmandır. Kademeli alım stratejisi ve disiplinli yaklaşım, uzun vadede daha sağlıklı sonuçlar verir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  if (lowerQuery.includes("altın") || lowerQuery.includes("gold")) {
    return {
      text: `Altın, tarih boyunca güvenli liman olarak kabul edilmiştir. Fiziki altın, altın hesabı veya altın fonları arasında tercih yaparken likidite ve saklama maliyetlerini değerlendirin.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  if (lowerQuery.includes("gümüş") || lowerQuery.includes("silver")) {
    return {
      text: `Gümüş, altının gölgesinde kalan ama kendine özgü dinamikleri olan bir metaldir. Risk toleransı yüksek yatırımcılar için portföyün küçük bir bölümünde değerlendirilebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  if (lowerQuery.includes("kripto") || lowerQuery.includes("bitcoin")) {
    return {
      text: `Kripto paralar yüksek volatilite sunar. Türkiye'de ödeme aracı olarak kullanımı yasaktır. Kaybetmeyi göze alabileceğiniz miktarı aşmamanız kritik önem taşır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  if (lowerQuery.includes("abd") || lowerQuery.includes("nasdaq") || lowerQuery.includes("amerika")) {
    return {
      text: `ABD borsalarına Türk aracı kurumlar veya ETF'ler üzerinden erişmek mümkün. Kritik uyarı: Yurt dışı hisse gelirleri Türkiye'de beyana tabidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  if (lowerQuery.includes("sarp") || lowerQuery.includes("merhaba") || lowerQuery.includes("selam")) {
    return {
      text: `Merhaba! Ben Sarp, Finans Kodu'nun yapay zeka destekli finans asistanıyım. Size yardımcı olmak için buradayım.`,
      isInvestmentRelated: false
    };
  }
  
  return {
    text: `Merhaba! Ben Sarp. Size altın, gümüş, borsa, kripto ve yatırım stratejileri hakkında piyasa görüşü sunabilirim.`,
    isInvestmentRelated: false
  };
};

// CRITICAL: Audio Context for mobile unlock and lip-sync
let globalAudioContext: AudioContext | null = null;
let audioUnlockedGlobal = false;

const unlockAudioContext = (): boolean => {
  if (audioUnlockedGlobal) return true;
  
  try {
    // Create AudioContext
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!globalAudioContext) {
      globalAudioContext = new AudioContextClass();
    }
    
    // Resume if suspended
    if (globalAudioContext.state === "suspended") {
      globalAudioContext.resume();
    }
    
    // Play silent buffer to unlock speakers on mobile
    const buffer = globalAudioContext.createBuffer(1, 1, 22050);
    const source = globalAudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(globalAudioContext.destination);
    source.start(0);
    
    // Also warm up speechSynthesis
    if ("speechSynthesis" in window) {
      const warmUp = new SpeechSynthesisUtterance("");
      warmUp.volume = 0;
      window.speechSynthesis.speak(warmUp);
    }
    
    audioUnlockedGlobal = true;
    return true;
  } catch {
    return false;
  }
};

// 3D Avatar Model Component with GLB loading
interface AvatarModelProps {
  isSpeaking: boolean;
  mouthOpenness: number;
}

function AvatarModel({ isSpeaking, mouthOpenness }: AvatarModelProps) {
  const gltf = useGLTF(SARP_URL);
  const modelRef = useRef<THREE.Group>(null);
  const jawBoneRef = useRef<THREE.Bone | null>(null);
  const morphMeshRef = useRef<THREE.SkinnedMesh | null>(null);
  const mouthOpenIndexRef = useRef<number>(-1);
  const { camera } = useThree();
  const [modelReady, setModelReady] = useState(false);
  
  // Auto-scale and position model using Box3
  useEffect(() => {
    if (!gltf.scene) return;
    
    const scene = gltf.scene;
    
    // Measure model bounds
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    // Scale to fit head at Y=1.6m
    const targetHeight = 2.0;
    const scale = targetHeight / size.y;
    scene.scale.setScalar(scale);
    
    // Center horizontally and position vertically
    scene.position.x = -center.x * scale;
    scene.position.y = -box.min.y * scale;
    scene.position.z = -center.z * scale;
    
    // Find morph targets or jaw bone for lip-sync
    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.SkinnedMesh) {
        // Check for morph targets (visemes)
        if (child.morphTargetDictionary && child.morphTargetInfluences) {
          morphMeshRef.current = child;
          
          // Look for mouth-related morph targets
          const mouthKeys = ["mouthOpen", "viseme_aa", "viseme_O", "jawOpen", "mouth_open", "Jaw_Open"];
          for (const key of mouthKeys) {
            if (key in child.morphTargetDictionary) {
              mouthOpenIndexRef.current = child.morphTargetDictionary[key];
              break;
            }
          }
        }
        
        // Find jaw bone as fallback for CASE B
        if (child.skeleton) {
          child.skeleton.bones.forEach((bone) => {
            const boneName = bone.name.toLowerCase();
            if (boneName.includes("jaw") || boneName.includes("chin") || boneName.includes("mouth")) {
              jawBoneRef.current = bone;
            }
          });
        }
      }
    });
    
    // Position camera for headshot [0, 1.65, 0.7]
    camera.position.set(0, 1.65, 0.7);
    camera.lookAt(0, 1.6, 0);
    
    setModelReady(true);
  }, [gltf.scene, camera]);
  
  // Lip-sync animation with smooth lerp (0.4 factor)
  useFrame(() => {
    if (!modelReady) return;
    
    const targetMouth = isSpeaking ? mouthOpenness : 0;
    
    // CASE A: Use morph targets if available
    if (morphMeshRef.current && mouthOpenIndexRef.current >= 0) {
      const influences = morphMeshRef.current.morphTargetInfluences;
      if (influences) {
        influences[mouthOpenIndexRef.current] = THREE.MathUtils.lerp(
          influences[mouthOpenIndexRef.current],
          targetMouth * 0.8,
          0.4 // Smooth lerp factor as specified
        );
      }
    }
    // CASE B: Rotate jaw bone as fallback
    else if (jawBoneRef.current) {
      const targetRotation = targetMouth * 0.3;
      jawBoneRef.current.rotation.x = THREE.MathUtils.lerp(
        jawBoneRef.current.rotation.x,
        targetRotation,
        0.4
      );
    }
  });
  
  return (
    <group ref={modelRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

// Fallback Avatar (simple mesh when GLB fails)
function FallbackAvatar({ isSpeaking, mouthOpenness }: AvatarModelProps) {
  const headRef = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Blinking effect
  useEffect(() => {
    const scheduleNextBlink = () => {
      const delay = 2000 + Math.random() * 3000;
      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        scheduleNextBlink();
      }, delay);
    };
    const timeoutId = scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Head sway
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.4) * 0.03;
    }
    
    // Blinking
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeScale = isBlinking ? 0.05 : 1;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScale, 0.5);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScale, 0.5);
    }
    
    // Lip sync
    if (mouthRef.current) {
      const targetScale = isSpeaking ? 1 + mouthOpenness * 1.8 : 1;
      mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, targetScale, 0.4);
    }
  });
  
  return (
    <group ref={headRef} position={[0, 1.65, 0]}>
      {/* Face */}
      <mesh>
        <sphereGeometry args={[0.19, 36, 36]} />
        <meshStandardMaterial color="#e8c4b0" roughness={0.55} />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 0.06, -0.02]}>
        <sphereGeometry args={[0.2, 32, 32]} />
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
      </group>
      
      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, -0.065, 0.165]}>
        <boxGeometry args={[0.045, 0.014, 0.014]} />
        <meshStandardMaterial color="#b86b6b" />
      </mesh>
    </group>
  );
}

// Loading component
function LoadingFallback() {
  return (
    <mesh position={[0, 1.65, 0]}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="#00d4ff" wireframe />
    </mesh>
  );
}

// Model wrapper with error handling
function ModelWithFallback({ isSpeaking, mouthOpenness }: AvatarModelProps) {
  const [useGlb, setUseGlb] = useState(true);
  const [loadError, setLoadError] = useState(false);
  
  // Preload model
  useEffect(() => {
    useGLTF.preload(SARP_URL);
  }, []);
  
  if (loadError || !useGlb) {
    return <FallbackAvatar isSpeaking={isSpeaking} mouthOpenness={mouthOpenness} />;
  }
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ErrorBoundaryModel onError={() => { setLoadError(true); setUseGlb(false); }}>
        <AvatarModel isSpeaking={isSpeaking} mouthOpenness={mouthOpenness} />
      </ErrorBoundaryModel>
    </Suspense>
  );
}

// Simple error boundary for GLB loading
import React from "react";

class ErrorBoundaryModel extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch() {
    this.props.onError();
  }
  
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// Main Component
export default function Sarp3DAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [mouthOpenness, setMouthOpenness] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [maleVoice, setMaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // CRITICAL: Touch-to-Unlock handler for mobile
  const handleUnlockAudio = useCallback(() => {
    if (audioUnlocked) return;
    const success = unlockAudioContext();
    if (success) setAudioUnlocked(true);
  }, [audioUnlocked]);

  // Global touch/click listener for audio unlock
  useEffect(() => {
    const handleInteraction = () => {
      handleUnlockAudio();
    };
    
    // Listen on both touchstart AND click for maximum compatibility
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction);
    
    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, [handleUnlockAudio]);

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
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
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

  // Lip-sync animation
  const startLipSyncAnimation = useCallback(() => {
    const animate = () => {
      const time = Date.now() * 0.012;
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

  // Text-to-Speech with MALE VOICE (pitch=0.9, rate=0.95)
  const speakText = useCallback((text: string, isInvestmentRelated: boolean) => {
    if (!synthRef.current || !ttsEnabled) {
      setTimeout(() => setShowResponse(false), 5000);
      return;
    }
    
    // Ensure audio is unlocked before speaking
    handleUnlockAudio();
    
    synthRef.current.cancel();
    
    const processedText = text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/⚠️/g, "")
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
      startLipSyncAnimation();
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      stopLipSyncAnimation();
      setTimeout(() => setShowResponse(false), 3000);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      stopLipSyncAnimation();
    };
    
    synthRef.current.speak(utterance);
  }, [ttsEnabled, maleVoice, handleUnlockAudio, startLipSyncAnimation, stopLipSyncAnimation]);

  // Handle avatar click
  const handleAvatarClick = useCallback(() => {
    // Always unlock audio on click
    handleUnlockAudio();
    
    if (!isOpen) {
      setIsOpen(true);
      return;
    }
    
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
  }, [isOpen, speechSupported, isListening, isSpeaking, handleUnlockAudio, stopLipSyncAnimation]);

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Collapsed State - Avatar Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={handleAvatarClick}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform"
        >
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
            <span className="text-2xl">🧑‍💼</span>
          </div>
        </motion.button>
      )}

      {/* Expanded State - 3D Avatar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative"
          >
            {/* 3D Canvas Container */}
            <div 
              className="w-[200px] h-[240px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 border-2 border-primary/30 shadow-xl shadow-primary/20 cursor-pointer"
              onClick={handleAvatarClick}
            >
              <Canvas
                camera={{ position: [0, 1.65, 0.7], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
              >
                <ambientLight intensity={0.8} />
                <directionalLight position={[0, 2, 2]} intensity={2.5} />
                <pointLight position={[0, 1.6, 0.5]} intensity={1.5} color="#00d4ff" />
                
                <ModelWithFallback isSpeaking={isSpeaking} mouthOpenness={mouthOpenness} />
                
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  target={[0, 1.6, 0]}
                  minPolarAngle={Math.PI / 2.5}
                  maxPolarAngle={Math.PI / 1.8}
                />
                
                <Environment preset="studio" />
              </Canvas>
              
              {/* Status Indicators */}
              {isListening && (
                <div className="absolute inset-0 border-4 border-red-500 rounded-2xl animate-pulse pointer-events-none" />
              )}
              {isSpeaking && (
                <div className="absolute inset-0 border-4 border-primary rounded-2xl animate-pulse pointer-events-none" />
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
              {isThinking && (
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

            {/* Controls */}
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTtsEnabled(!ttsEnabled);
                }}
                className={`p-1.5 rounded-full transition-colors ${
                  ttsEnabled ? "bg-primary/40 text-primary" : "bg-white/15 text-white/50"
                }`}
              >
                {ttsEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-full bg-white/15 text-white/50 hover:bg-white/25"
              >
                ✕
              </button>
            </div>

            {/* Mic Icon */}
            <div className="absolute top-2 left-2 p-1.5 bg-black/60 rounded-full">
              {isListening ? (
                <Mic className="w-4 h-4 text-red-500 animate-pulse" />
              ) : (
                <MicOff className="w-4 h-4 text-white/50" />
              )}
            </div>

            {/* Legal Disclaimer */}
            <div className="mt-3 px-2 py-1 bg-amber-500/20 rounded-lg text-center max-w-[200px]">
              <p className="text-[8px] text-amber-400 leading-tight">
                Sarp bir yapay zekadır, Yatırım Tavsiyesi Vermez.
              </p>
            </div>

            {/* Audio Unlock Hint */}
            {!audioUnlocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary/20 rounded text-center whitespace-nowrap"
              >
                <p className="text-[9px] text-primary">👆 Sesi açmak için dokun</p>
              </motion.div>
            )}

            {/* Transcript */}
            <AnimatePresence>
              {(isListening || transcript) && !showResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 bg-black/95 rounded-xl border border-white/20 max-w-[200px]"
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute bottom-[60px] right-[210px] w-[280px] max-h-[200px] overflow-y-auto p-4 bg-black/95 backdrop-blur-xl rounded-xl border border-primary/40 shadow-xl"
                >
                  <p className="text-sm text-white leading-relaxed">{response}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
