import { TrendingUp, Zap, BarChart3 } from "lucide-react";

interface SentimentDashboardProps {
  ticker: string;
  sentiment?: number; // 0-100 (percentage)
  trend?: "POZİTİF" | "NEGATİF" | "NÖTR" | "KARIŞIK";
}

export function SentimentDashboard({
  ticker,
  sentiment = 87,
  trend = "POZİTİF",
}: SentimentDashboardProps) {
  const sentimentColor =
    sentiment >= 70 ? "text-green-400" : sentiment >= 40 ? "text-yellow-400" : "text-red-400";
  const sentimentBgColor =
    sentiment >= 70 ? "from-green-500/20 to-green-600/10" : sentiment >= 40 ? "from-yellow-500/20 to-yellow-600/10" : "from-red-500/20 to-red-600/10";

  const trendingHashtags = ["#BIST100", "#Ralli", "#Teknik"];
  const recentNews = ["KAP Bildirimi", "Temettü Haberi", "Şirket Açıklaması"];
  const hypeScore = sentiment >= 70 ? "Yüksek" : sentiment >= 40 ? "Orta" : "Düşük";

  return (
    <div className="space-y-4">
      {/* Main Sentiment Gauge */}
      <div className={`bg-gradient-to-br ${sentimentBgColor} border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-300 text-sm font-semibold">Duygu Durumu</h3>
          <TrendingUp className={`w-5 h-5 ${sentimentColor}`} />
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-bold ${sentimentColor}`}>{sentiment}%</span>
            <span className="text-slate-400 text-sm">Pozitif</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${
              sentiment >= 70
                ? "from-green-400 to-green-500"
                : sentiment >= 40
                  ? "from-yellow-400 to-yellow-500"
                  : "from-red-400 to-red-500"
            }`}
            style={{ width: `${sentiment}%` }}
          />
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Trending Hashtags */}
        <div className="bg-white/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-semibold text-slate-300">Trend Hashtags</h4>
          </div>
          <div className="space-y-2">
            {trendingHashtags.map((tag, idx) => (
              <div key={idx} className="text-xs text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors">
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Recent News */}
        <div className="bg-white/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-semibold text-slate-300">Son Dakika</h4>
          </div>
          <div className="space-y-2">
            {recentNews.map((news, idx) => (
              <div key={idx} className="text-xs text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors">
                {news}
              </div>
            ))}
          </div>
        </div>

        {/* Hype Score */}
        <div className="bg-white/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-semibold text-slate-300">Hype Skoru</h4>
          </div>
          <div className="text-2xl font-bold text-cyan-400">{hypeScore}</div>
          <div className="text-xs text-slate-500 mt-2">Sosyal Medya Aktivitesi</div>
        </div>
      </div>

      {/* Analysis Text */}
      {trend && (
        <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-3">
          <p className="text-slate-300 text-xs leading-relaxed">
            <span className="font-semibold text-cyan-400">{ticker}</span> hissesi sosyal medyada{" "}
            <span className={trend === "POZİTİF" ? "text-green-400" : trend === "NEGATİF" ? "text-red-400" : "text-yellow-400"}>
              {trend === "POZİTİF" ? "güçlü ilgi" : trend === "NEGATİF" ? "olumsuz duygu" : "karışık görüş"}
            </span>{" "}
            görmektedir.
          </p>
        </div>
      )}
    </div>
  );
}
