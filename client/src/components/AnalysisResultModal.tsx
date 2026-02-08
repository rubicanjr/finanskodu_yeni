import { X, Download, Lock, Volume2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Visual {
  type: "technical" | "social" | "fundamental";
  title: string;
  imageUrl?: string;
  analysisText?: string;
}

interface AnalysisResultModalProps {
  isOpen: boolean;
  ticker: string;
  visuals?: Visual[];
  isPro?: boolean;
  onClose: () => void;
  onDownload?: (type: string) => void;
  onUpgradeClick?: () => void;
}

export function AnalysisResultModal({
  isOpen,
  ticker,
  visuals = [],
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

  const currentVisual = visuals.find((v) => v.type === activeTab);

  const handleDownload = () => {
    if (!currentVisual?.imageUrl) return;

    const link = document.createElement("a");
    link.href = currentVisual.imageUrl;
    link.download = `${ticker}-${activeTab}-${new Date().toISOString().split("T")[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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

    const script = `${ticker} için analiz tamamlandı. Twitter skoru yüksek, teknik indikatörler AL veriyor. JP Morgan hedef fiyatı güncelledi.`;

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

    // Simulate subscription
    setNewsletterSuccess(true);
    setNewsletterEmail("");

    // Reset success message after 3 seconds
    setTimeout(() => setNewsletterSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Glassmorphism Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-slate-300 hover:text-cyan-400" />
        </button>

        {/* Content */}
        <div className="relative flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="px-8 pt-8 pb-4 border-b border-cyan-500/20">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {ticker} - Finansal Röntgen Sonucu
            </h2>
            <p className="text-slate-400 text-sm">
              Detaylı analiz raporu aşağıda görüntülenmektedir
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="px-8 pt-6 pb-4 border-b border-cyan-500/20 flex gap-2 overflow-x-auto">
            {visuals.map((visual) => (
              <button
                key={visual.type}
                onClick={() => setActiveTab(visual.type)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === visual.type
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                {visual.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {currentVisual ? (
              <div className="space-y-6">
                {/* Image Container */}
                <div className="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6 overflow-auto">
                  {currentVisual.imageUrl ? (
                    <img
                      src={currentVisual.imageUrl}
                      alt={`${ticker} ${currentVisual.type} Analysis`}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-slate-900/50 rounded-lg">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                        <p className="text-slate-400">Görsel yükleniyor...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Analysis Text (for Social tab) */}
                {currentVisual.analysisText && (
                  <div className="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-4">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {currentVisual.analysisText}
                    </p>
                  </div>
                )}

                {/* Download Button */}
                <Button
                  onClick={handleDownload}
                  disabled={!currentVisual.imageUrl}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Görseli İndir ⬇️
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-slate-400">Sekme yüklenemedi</p>
              </div>
            )}
          </div>

          {/* Footer: TTS Button + Newsletter */}
          <div className="px-8 py-6 border-t border-cyan-500/20 space-y-4">
            {/* TTS Button */}
            <Button
              onClick={handleListenToSarp}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              {isSpeaking ? "Dinleme Durdur ⏸️" : "🔊 Sarp'ı Dinle"}
            </Button>

            {/* Newsletter Subscription */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleNewsletterSubscribe()}
                  className="flex-1 px-4 py-2 bg-slate-900/50 border border-cyan-500/30 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <Button
                  onClick={handleNewsletterSubscribe}
                  disabled={!newsletterEmail.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Abone Ol
                </Button>
              </div>

              {newsletterSuccess && (
                <p className="text-sm text-green-400 mt-2">
                  ✓ Abonelik başarılı! İlk bülten Pazar günü gelecek.
                </p>
              )}

              {!newsletterSuccess && (
                <p className="text-xs text-slate-400 mt-2">
                  Haftalık finansal analiz bültenine abone olun
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
