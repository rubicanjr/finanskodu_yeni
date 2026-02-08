import { useState } from "react";
import { AnalysisLoadingState } from "./AnalysisLoadingState";
import { AnalysisResultModal } from "./AnalysisResultModal";
import { PaywallModal } from "./PaywallModal";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";

interface Visual {
  type: "technical" | "social" | "fundamental";
  title: string;
  imageUrl?: string;
  analysisText?: string;
}

export function AnalysisSection() {
  const { user, isAuthenticated } = useAuth();
  
  const [ticker, setTicker] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [resultData, setResultData] = useState<{
    ticker: string;
    visuals?: Visual[];
    isDemoMode: boolean;
  } | null>(null);

  // tRPC queries and mutations
  const checkQuotaMutation = trpc.analysis.checkQuota.useQuery(
    { ticker },
    { enabled: false }
  );
  
  const startAnalysisMutation = trpc.analysis.startAnalysis.useMutation();
  const generateVisualsMutation = trpc.analysis.generateVisuals.useMutation();
  const upgradeToProMutation = trpc.profile.upgradeToProTier.useMutation();
  const userProfile = trpc.profile.getProfile.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ticker.trim()) {
      console.log("Lütfen bir hisse kodu girin");
      return;
    }

    // If not authenticated, show login prompt
    if (!isAuthenticated) {
      console.log("Analiz için lütfen giriş yapın veya ücretsiz kaydolun");
      return;
    }

    try {
      setIsLoading(true);

      // Check quota
      const quotaCheck = await checkQuotaMutation.refetch();
      if (!quotaCheck.data?.allowed && !quotaCheck.data?.isDemoMode) {
        setShowPaywall(true);
        setIsLoading(false);
        return;
      }

      // Start analysis
      const result = await startAnalysisMutation.mutateAsync({ ticker });

      // Simulate 27-second analysis
      await new Promise((resolve) => setTimeout(resolve, 27000));

      // Generate visuals (3 different prompts via Wiro API)
      const visualsResult = await generateVisualsMutation.mutateAsync({ ticker });

      setResultData({
        ticker: ticker.toUpperCase(),
        visuals: visualsResult.visuals,
        isDemoMode: result.isDemoMode,
      });

      setShowResult(true);
    } catch (error: any) {
      console.error("Analiz hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isPro = userProfile.data?.subscriptionTier === "pro";

  return (
    <section id="analysis" className="py-16 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Finansal Analiz Başlat
          </h2>
          <p className="text-slate-400 text-lg">
            Hisse kodunu girin ve 27 saniyede detaylı finansal analiz alın
          </p>
        </div>

        {/* Analysis Form */}
        <form onSubmit={handleAnalyze} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="Hisse Kodu Girin (örn: THYAO)"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-slate-900 border border-cyan-500/50 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? "Analiz Ediliyor..." : "Analiz Et (27sn)"}
            </button>
          </div>

          {/* Demo Ticker Info */}
          <p className="text-xs text-slate-500 mt-3">
            💡 Demo için "THYAO" veya "EREGL" kodlarını deneyin
          </p>
        </form>

        {/* Info Box */}
        {!isAuthenticated && (
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4 text-center">
            <p className="text-slate-300">
              Analiz için{" "}
              <a
                href={getLoginUrl()}
                className="text-cyan-400 font-semibold underline cursor-pointer hover:text-cyan-300 transition-colors"
              >
                giriş yapmanız
              </a>
              {" "}gerekiyor.
            </p>
          </div>
        )}

        {isAuthenticated && !isPro && (
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4 text-center">
            <p className="text-slate-300">
              Ücretsiz hesabınızla günde <span className="text-cyan-400 font-semibold">1 analiz</span> yapabilirsiniz.
              <br />
              <span className="text-sm text-slate-400">Sınırsız analiz için Pro'ya geçin</span>
            </p>
          </div>
        )}
      </div>

      {/* Loading State */}
      <AnalysisLoadingState
        isVisible={isLoading}
        onComplete={() => {
          // Loading will complete automatically after 27 seconds
        }}
      />

      {/* Result Modal */}
      {resultData && (
        <AnalysisResultModal
          isOpen={showResult}
          ticker={resultData.ticker}
          visuals={resultData.visuals}
          isPro={isPro}
          onClose={() => {
            setShowResult(false);
            setResultData(null);
            setTicker("");
          }}
          onDownload={(type) => {
            console.log(`${type} analiz raporu indirildi`);
          }}
          onUpgradeClick={() => {
            setShowResult(false);
            setShowPaywall(true);
          }}
        />
      )}

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onUpgrade={async () => {
          try {
            await upgradeToProMutation.mutateAsync();
            console.log("Pro tier'a yükseltildiniz!");
            setShowPaywall(false);
            userProfile.refetch();
          } catch (error) {
            console.error("Yükseltme hatası:", error);
          }
        }}
      />
    </section>
  );
}
