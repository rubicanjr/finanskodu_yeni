import { X, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisResultModalProps {
  isOpen: boolean;
  ticker: string;
  imageUrl?: string;
  isPro?: boolean;
  onClose: () => void;
  onDownload?: () => void;
  onUpgradeClick?: () => void;
  onDetailedReportClick?: () => void;
}

export function AnalysisResultModal({
  isOpen,
  ticker,
  imageUrl,
  isPro = false,
  onClose,
  onDownload,
  onUpgradeClick,
  onDetailedReportClick,
}: AnalysisResultModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    if (!imageUrl) return;
    
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${ticker}-analiz-${new Date().toISOString().split("T")[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden">
        
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
        <div className="relative p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {ticker} - Finansal Röntgen Sonucu
            </h2>
            <p className="text-slate-400 text-sm">
              Detaylı analiz raporu aşağıda görüntülenmektedir
            </p>
          </div>

          {/* Image Container */}
          <div className="mb-8 bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6 overflow-auto max-h-96">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${ticker} Analysis`}
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Download Button */}
            <Button
              onClick={handleDownload}
              disabled={!imageUrl}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Görseli İndir ⬇️
            </Button>

            {/* Detailed Report Button */}
            <Button
              onClick={isPro ? onDetailedReportClick : onUpgradeClick}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                isPro
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                  : "bg-slate-800 border border-cyan-500/30 text-cyan-300 hover:bg-slate-700"
              }`}
            >
              {!isPro && <Lock className="w-4 h-4" />}
              {isPro ? "Detaylı Raporu İncele" : "Detaylı Raporu İncele (Pro) 👑"}
            </Button>
          </div>

          {/* Info Text */}
          {!isPro && (
            <p className="text-xs text-slate-400 text-center mt-4">
              Sınırsız analiz ve detaylı raporlar için Pro'ya geçin
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
