import { X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  isLoading?: boolean;
}

export function PaywallModal({ isOpen, onClose, onUpgrade, isLoading = false }: PaywallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden">
        
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
        <div className="relative p-8 text-center">
          
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Zap className="w-8 h-8 text-amber-400" />
          </div>

          {/* Header */}
          <h2 className="text-2xl font-bold text-white mb-3">
            Günlük Limit Aşıldı
          </h2>
          
          <p className="text-slate-300 mb-6">
            Ücretsiz hesabınızla günde 1 analiz yapabilirsiniz. Sınırsız analiz ve detaylı raporlar için Pro'ya geçin.
          </p>

          {/* Features List */}
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-cyan-400 mb-3">Pro Tier Avantajları:</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                Sınırsız finansal analiz
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                Detaylı analiz raporları
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                Portföy karşılaştırması
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                Öncelikli destek
              </li>
            </ul>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-slate-400 text-sm mb-1">Aylık Fiyat</p>
            <p className="text-3xl font-bold text-white">
              199 <span className="text-lg text-slate-400">₺</span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={onUpgrade}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "İşleniyor..." : "Pro'ya Geçiş Yap"}
            </Button>
            
            <Button
              onClick={onClose}
              className="w-full bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 font-semibold py-3 rounded-lg transition-all"
            >
              Daha Sonra
            </Button>
          </div>

          {/* Footer Text */}
          <p className="text-xs text-slate-500 mt-4">
            Kredi kartı gerekmez. Dilediğiniz zaman iptal edebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
