import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";

interface TechnicalSummaryCardProps {
  status: "POZİTİF" | "NEGATİF";
  message: string;
  reasons: string[];
  indicators: {
    current_price: number;
    rsi: number;
    sma50: number;
    volume_trend: string;
  };
}

export function TechnicalSummaryCard({
  status,
  message,
  reasons,
  indicators,
}: TechnicalSummaryCardProps) {
  const isPositive = status === "POZİTİF";
  const bgColor = isPositive
    ? "bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30"
    : "bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/30";
  const textColor = isPositive ? "text-green-400" : "text-red-400";
  const Icon = isPositive ? CheckCircle : AlertCircle;

  return (
    <div className={`${bgColor} border rounded-xl p-6 backdrop-blur-sm`}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <Icon className={`w-8 h-8 ${textColor} flex-shrink-0 mt-1`} />
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${textColor} mb-1`}>{message}</h3>
          <p className="text-slate-400 text-sm">
            {isPositive ? "Güçlü Alım Sinyali" : "Satış Baskısı Hissediliyor"}
          </p>
        </div>
      </div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Current Price */}
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/20">
          <p className="text-slate-400 text-xs font-semibold mb-1">Anlık Fiyat</p>
          <p className="text-white text-lg font-bold">
            {indicators.current_price.toFixed(2)} TL
          </p>
        </div>

        {/* RSI */}
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/20">
          <p className="text-slate-400 text-xs font-semibold mb-1">RSI (14)</p>
          <p className={`text-lg font-bold ${
            indicators.rsi > 70 ? "text-red-400" :
            indicators.rsi < 30 ? "text-green-400" :
            "text-yellow-400"
          }`}>
            {indicators.rsi.toFixed(1)}
          </p>
        </div>

        {/* SMA50 */}
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/20">
          <p className="text-slate-400 text-xs font-semibold mb-1">SMA (50)</p>
          <p className="text-white text-lg font-bold">
            {indicators.sma50.toFixed(2)} TL
          </p>
        </div>

        {/* Volume Trend */}
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/20">
          <p className="text-slate-400 text-xs font-semibold mb-1">Hacim Trendi</p>
          <div className="flex items-center gap-2">
            {indicators.volume_trend === "Güçlü" ? (
              <TrendingUp className="w-5 h-5 text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
            <p className="text-white font-bold">{indicators.volume_trend}</p>
          </div>
        </div>
      </div>

      {/* Reasons List */}
      <div className="space-y-2">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
          Analiz Nedenleri
        </p>
        <div className="space-y-1">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-slate-500 text-xs mt-4 pt-4 border-t border-slate-700/50">
        ⚠️ Bu analiz eğitim amaçlıdır. Yatırım kararı vermeden önce uzman danışmanla görüşün.
      </p>
    </div>
  );
}
