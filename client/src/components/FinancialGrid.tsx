import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";

interface FinancialMetric {
  label: string;
  value: string | number;
  change?: number; // percentage change
  icon: React.ReactNode;
}

interface FinancialGridProps {
  ticker: string;
  metrics?: FinancialMetric[];
}

export function FinancialGrid({ ticker, metrics }: FinancialGridProps) {
  // Default dummy data
  const defaultMetrics: FinancialMetric[] = [
    {
      label: "F/K Oranı",
      value: "4.52",
      change: 2.3,
      icon: <PieChart className="w-5 h-5" />,
    },
    {
      label: "PD/DD",
      value: "1.20",
      change: -1.5,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      label: "Özkaynak Kârlılığı",
      value: "%18.7",
      change: 4.2,
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: "Net Kâr (Yıllık)",
      value: "₺2.3B",
      change: 8.1,
      icon: <DollarSign className="w-5 h-5" />,
    },
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-4">
        <h3 className="text-slate-300 text-sm font-semibold">
          {ticker} - Şirket Karnesi
        </h3>
        <p className="text-slate-500 text-xs mt-1">Son 12 aylık finansal veriler</p>
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {displayMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/30 border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 transition-all"
          >
            {/* Icon & Label */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-slate-400 text-xs font-semibold">{metric.label}</h4>
              <div className="text-cyan-400/60">{metric.icon}</div>
            </div>

            {/* Value */}
            <div className="mb-3">
              <div className="text-2xl font-bold text-white">{metric.value}</div>
            </div>

            {/* Change Indicator */}
            {metric.change !== undefined && (
              <div
                className={`flex items-center gap-1 text-xs font-semibold ${
                  metric.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {metric.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Analysis Summary */}
      <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-4">
        <h4 className="text-slate-300 text-xs font-semibold mb-2">Temel Analiz Özeti</h4>
        <p className="text-slate-400 text-xs leading-relaxed">
          <span className="text-cyan-400">{ticker}</span> hissesi finansal açıdan sağlam temellere
          sahiptir. F/K oranı sektör ortalamasının altında olup, hisse değeri cazip görünmektedir.
          Özkaynak kârlılığı yüksek seviyelerde seyretmektedir.
        </p>
      </div>

      {/* Risk Indicator */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 border border-cyan-500/10 rounded-lg p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Likidite</div>
          <div className="text-sm font-bold text-green-400">Yüksek</div>
        </div>
        <div className="bg-white/5 border border-cyan-500/10 rounded-lg p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Borç Oranı</div>
          <div className="text-sm font-bold text-yellow-400">Orta</div>
        </div>
        <div className="bg-white/5 border border-cyan-500/10 rounded-lg p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Büyüme</div>
          <div className="text-sm font-bold text-green-400">Güçlü</div>
        </div>
      </div>
    </div>
  );
}
