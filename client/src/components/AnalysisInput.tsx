import { motion } from "framer-motion";
import { useState } from "react";

interface AnalysisInputProps {
  onAnalyze?: (ticker: string) => void;
}

export default function AnalysisInput({ onAnalyze }: AnalysisInputProps) {
  const [ticker, setTicker] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    if (ticker.trim()) {
      setIsLoading(true);
      // Simulate 27 second analysis
      setTimeout(() => {
        setIsLoading(false);
        onAnalyze?.(ticker);
      }, 27000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex flex-col gap-6 mb-8"
    >
      {/* Input & Button */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Hisse Kodu Girin (Örn: THYAO)"
          disabled={isLoading}
          className="px-6 py-3 rounded-lg backdrop-blur-md border-2 transition-all duration-300 focus:outline-none text-white placeholder-gray-500 flex-1 min-w-0 disabled:opacity-50"
          style={{
            background: "rgba(15, 23, 42, 0.5)",
            borderColor: "#00F0FF",
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)",
          }}
          onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
        />
        <button
          onClick={handleAnalyze}
          disabled={isLoading || !ticker.trim()}
          className="px-8 py-3 rounded-lg font-bold text-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "#FFD700",
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
          }}
        >
          {isLoading ? "Analiz Ediliyor..." : "Analiz Et (27sn)"}
        </button>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-xs text-gray-500 text-center"
      >
        Wiro.ai altyapısı ile BIST verilerini yerel bağlamda analiz eder.
      </motion.p>

      {/* Loading Animation */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground text-sm"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
          <p>Veri Ayrıştırılıyor... Wiro Bağlanıyor... Görsel Oluşturuluyor...</p>
        </motion.div>
      )}
    </motion.div>
  );
}
