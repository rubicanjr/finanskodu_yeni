import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { X, Download, Volume2, Mail } from "lucide-react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { getTradingViewSymbol } from "@/lib/symbolHelper";
import { SentimentDashboard } from "./SentimentDashboard";
import { FinancialGrid } from "./FinancialGrid";

interface Visual {
  type: "technical" | "social" | "fundamental";
  title: string;
  imageUrl?: string;
  analysisText?: string;
}

interface GeminiDetails {
  technical: string;
  social: string;
  fundamental: string;
}

interface AnalysisResultModalProps {
  isOpen: boolean;
  ticker: string;
  visuals?: Visual[];
  geminiAnalysis?: string;
  geminiDetails?: GeminiDetails;
  currentPrice?: number;
  trend?: "POZİTİF" | "NEGATİF" | "NÖTR";
  isPro?: boolean;
  onClose: () => void;
  onDownload?: (type: string) => void;
  onUpgradeClick?: () => void;
}

export function AnalysisResultModal({
  isOpen,
  ticker,
  visuals = [],
  geminiAnalysis = "",
  geminiDetails,
  currentPrice = 0,
  trend = "NÖTR",
  isPro = false,
  onClose,
  onDownload,
  onUpgradeClick,
}: AnalysisResultModalProps) {
  const [activeTab, setActiveTab] = useState<"technical" | "social" | "fundamental">("technical");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  // No Pollinations code needed - using TradingView widget instead

  const handleDownload = () => {
    if (onDownload) {
      onDownload(activeTab);
    }
  };

  const handleListenToSarp = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const tickerLetters = ticker.split("").join(" ");
    const analysisText = geminiDetails?.technical || geminiAnalysis || "Teknik analiz yapılıyor.";
    const script = `${tickerLetters} için analiz tamamlandı. ${analysisText}`;

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "tr-TR";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleNewsletterSubscribe = () => {
    if (!newsletterEmail.trim()) return;

    setNewsletterSuccess(true);
    setNewsletterEmail("");

    setTimeout(() => setNewsletterSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-300 hover:text-cyan-400" />
        </button>

        <div className="relative flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="px-6 pt-6 pb-3 border-b border-cyan-500/20">
            <h2 className="text-base font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
              {ticker} - Finansal Röntgen
            </h2>
            <p className="text-slate-400 text-xs">
              Canlı fiyat: ₺{currentPrice.toFixed(2)} | Trend: {trend}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 pt-4 pb-3 border-b border-cyan-500/20 flex gap-2 overflow-x-auto">
            {["technical", "social", "fundamental"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                {tab === "technical" && "📈 Teknik Görünüm"}
                {tab === "social" && "🐦 Sosyal Medya"}
                {tab === "fundamental" && "📊 Temel Analiz"}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

            {/* Social Tab: Sentiment Dashboard */}
            {activeTab === "social" && <SentimentDashboard ticker={ticker} sentiment={87} trend={trend} />}

            {/* Fundamental Tab: Financial Grid */}
            {activeTab === "fundamental" && <FinancialGrid ticker={ticker} />}

            {/* Gemini Analysis Text - Tab Specific */}
            {geminiDetails && (
              <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-3">
                <p className="text-slate-300 text-xs leading-relaxed font-semibold">
                  {activeTab === "technical" && "📈 Teknik Analiz Yorumu"}
                  {activeTab === "social" && "🐦 Sosyal Medya Analizi"}
                  {activeTab === "fundamental" && "📊 Temel Analiz Yorumu"}
                </p>
                <p className="text-slate-300 text-xs leading-relaxed mt-2">
                  {activeTab === "technical" && geminiDetails.technical}
                  {activeTab === "social" && geminiDetails.social}
                  {activeTab === "fundamental" && geminiDetails.fundamental}
                </p>
              </div>
            )}
            {geminiAnalysis && !geminiDetails && (
              <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-3">
                <p className="text-slate-300 text-xs leading-relaxed font-semibold">
                  💡 Sarp'ın Yorumu:
                </p>
                <p className="text-slate-300 text-xs leading-relaxed mt-2">
                  {geminiAnalysis}
                </p>
              </div>
            )}

            {/* TradingView Widget - Main Visualization */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl overflow-hidden">
              <div className="w-full h-[500px]">
                {(() => {
                  const symbolPrefix = ticker?.toUpperCase().endsWith('USDT') ? 'BINANCE:' : 'BIST:';
                  const fullSymbol = `${symbolPrefix}${ticker?.toUpperCase() || 'THYAO'}`;
                  return (
                    <AdvancedRealTimeChart
                      key={fullSymbol}
                      symbol={fullSymbol}
                      theme="dark"
                      autosize
                      locale="tr"
                      hide_side_toolbar={false}
                    />
                  );
                })()}
              </div>
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              İndir ⬇️
            </Button>
          </div>

          {/* Footer: TTS + Newsletter */}
          <div className="px-6 py-4 border-t border-cyan-500/20 flex gap-3">
            {/* TTS Button */}
            <Button
              onClick={handleListenToSarp}
              className="flex-1 basis-2/5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1"
            >
              <Volume2 className="w-3 h-3" />
              {isSpeaking ? "Durdur" : "🔊 Dinle"}
            </Button>

            {/* Newsletter */}
            <div className="flex-1 basis-3/5 bg-slate-800/50 border border-cyan-500/20 rounded-lg p-3">
              <div className="flex gap-2 items-center">
                <input
                  type="email"
                  placeholder="E-posta"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleNewsletterSubscribe()}
                  className="flex-1 px-2 py-1 bg-slate-900/50 border border-cyan-500/30 text-white placeholder-slate-500 rounded text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <Button
                  onClick={handleNewsletterSubscribe}
                  disabled={!newsletterEmail.trim()}
                  className="px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 whitespace-nowrap"
                >
                  <Mail className="w-3 h-3" />
                  Abone
                </Button>
              </div>

              {newsletterSuccess && (
                <p className="text-xs text-green-400 mt-1">
                  ✓ Başarılı!
                </p>
              )}
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="px-6 py-3 bg-slate-900/50 border-t border-cyan-500/20">
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong>YASAL UYARI:</strong> Bu çalışma bir yatırım tavsiyesi değildir. Veriler ve grafikler yapay zeka tarafından eğitim ve simülasyon amaçlı üretilmiştir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
