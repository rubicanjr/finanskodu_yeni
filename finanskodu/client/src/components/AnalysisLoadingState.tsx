import { useEffect, useState } from "react";

interface AnalysisLoadingStateProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const LOADING_MESSAGES = [
  { time: 0, text: "📡 KAP verilerine bağlanılıyor... (BIST Veri Akışı)" },
  { time: 5, text: "📄 Bilanço kalemleri taranıyor... (Satır: 1402/2000)" },
  { time: 10, text: "🔍 Makyajlı veriler temizleniyor... (Dedektif Modu Aktif)" },
  { time: 15, text: "🎨 Wiro AI görseli çiziyor... (Nöral Ağ İşlemesi)" },
  { time: 20, text: "🚀 Analiz tamamlanıyor... Sonuçlar Yükleniyor." },
];

const TOTAL_DURATION = 27000; // 27 seconds in milliseconds

export function AnalysisLoadingState({ isVisible, onComplete }: AnalysisLoadingStateProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(LOADING_MESSAGES[0].text);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setElapsedTime(0);
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 100;
        
        // Calculate progress percentage
        const progressPercent = (newTime / TOTAL_DURATION) * 100;
        setProgress(Math.min(progressPercent, 100));

        // Update message based on elapsed time
        const elapsedSeconds = newTime / 1000;
        for (let i = LOADING_MESSAGES.length - 1; i >= 0; i--) {
          if (elapsedSeconds >= LOADING_MESSAGES[i].time) {
            setCurrentMessage(LOADING_MESSAGES[i].text);
            break;
          }
        }

        // Complete after 27 seconds
        if (newTime >= TOTAL_DURATION) {
          clearInterval(interval);
          if (onComplete) {
            onComplete();
          }
          return TOTAL_DURATION;
        }

        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Finansal Analiz Yapılıyor</h2>
          <p className="text-cyan-400 text-sm">Lütfen bekleyin...</p>
        </div>

        {/* Radar Animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer circle */}
          <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-pulse" />
          
          {/* Middle circle */}
          <div className="absolute inset-4 border-2 border-cyan-500/20 rounded-full" />
          
          {/* Inner circle */}
          <div className="absolute inset-8 border-2 border-cyan-500/10 rounded-full" />
          
          {/* Rotating radar line */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute w-1 h-16 bg-gradient-to-b from-cyan-400 to-transparent origin-bottom"
              style={{
                animation: "spin 2s linear infinite",
              }}
            />
          </div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-cyan-500/20">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            {Math.round(progress)}% - {Math.round(elapsedTime / 1000)}s / 27s
          </p>
        </div>

        {/* Dynamic Message */}
        <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4 mb-6">
          <p className="text-cyan-300 text-center text-sm font-medium h-12 flex items-center justify-center">
            {currentMessage}
          </p>
        </div>

        {/* Info Text */}
        <p className="text-xs text-slate-400 text-center">
          Sistem, finansal verileri analiz ediyor ve sonuçları hazırlıyor...
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
