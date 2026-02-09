import yahooFinance from "yahoo-finance2";
import { RSI, SMA } from "technicalindicators";

export interface TechnicalAnalysisResult {
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

export async function analyzeTechnical(ticker: string): Promise<TechnicalAnalysisResult> {
  try {
    // Add .IS suffix for BIST stocks
    const yahooTicker = ticker.endsWith('.IS') ? ticker : `${ticker}.IS`;
    
    // Fetch last 100 days of data
    const data = await yahooFinance.historical(yahooTicker, {
      period1: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000),
      period2: new Date(),
    });

    if (!data || (data as any[]).length < 50) {
      return {
        status: "NEGATİF",
        message: "Yeterli veri bulunamadı",
        reasons: ["Veri eksikliği"],
        indicators: {
          current_price: 0,
          rsi: 0,
          sma50: 0,
          volume_trend: "Bilinmiyor",
        },
      };
    }

    // Extract prices and volumes
    const closes = (data as any[]).map((d: any) => d.close || 0);
    const volumes = (data as any[]).map((d: any) => d.volume || 0);
    
    // Calculate RSI (14 period)
    const rsiValues = RSI.calculate({ values: closes, period: 14 });
    const currentRSI = rsiValues[rsiValues.length - 1] || 50;
    
    // Calculate SMA (50 period)
    const smaValues = SMA.calculate({ values: closes, period: 50 });
    const currentSMA50 = smaValues[smaValues.length - 1] || closes[closes.length - 1];
    
    // Get current price and volume
    const currentPrice = closes[closes.length - 1];
    const currentVolume = volumes[volumes.length - 1];
    const avgVolume = volumes.slice(-20).reduce((a: number, b: number) => a + b, 0) / 20;
    
    // Decision Tree Logic
    const reasons: string[] = [];
    let negativeCount = 0;
    let positiveCount = 0;

    // DURUM 1: RSI < 45 AND Fiyat > SMA50 (Negatif Uyumsuzluk)
    if (currentRSI < 45 && currentPrice > currentSMA50) {
      reasons.push("⚠️ Negatif Uyumsuzluk Riski: RSI düşüşte, fiyat yükselişte");
      negativeCount++;
    } else if (currentRSI >= 45 && currentPrice > currentSMA50) {
      reasons.push("✅ Pozitif Trend: RSI ve fiyat uyumlu");
      positiveCount++;
    }

    // DURUM 2: Fiyat yükselirken hacim düşüyor
    if (currentPrice > closes[closes.length - 2] && currentVolume < avgVolume) {
      reasons.push("⚠️ Hacimsiz Yükseliş: Fiyat artıyor ama hacim zayıf");
      negativeCount++;
    } else if (currentPrice > closes[closes.length - 2] && currentVolume >= avgVolume) {
      reasons.push("✅ Hacimli Yükseliş: Güçlü alım baskısı");
      positiveCount++;
    }

    // DURUM 3: Fiyat < SMA50
    if (currentPrice < currentSMA50) {
      reasons.push("⚠️ Trend Desteği Kırıldı: Fiyat SMA50'nin altında");
      negativeCount++;
    } else {
      reasons.push("✅ Trend Desteği Sağlam: Fiyat SMA50'nin üzerinde");
      positiveCount++;
    }

    // Final Decision
    const status = negativeCount > positiveCount ? "NEGATİF" : "POZİTİF";
    const message = 
      status === "NEGATİF" 
        ? "Teknik Durum: NEGATİF - Satış Baskısı Hissediliyor"
        : "Teknik Durum: POZİTİF - Güçlü Alım İştahı";

    return {
      status,
      message,
      reasons,
      indicators: {
        current_price: Math.round(currentPrice * 100) / 100,
        rsi: Math.round(currentRSI * 100) / 100,
        sma50: Math.round(currentSMA50 * 100) / 100,
        volume_trend: currentVolume >= avgVolume ? "Güçlü" : "Zayıf",
      },
    };
  } catch (error) {
    console.error("Technical analysis error:", error);
    return {
      status: "NEGATİF",
      message: "Analiz sırasında hata oluştu",
      reasons: ["Teknik hata"],
      indicators: {
        current_price: 0,
        rsi: 0,
        sma50: 0,
        volume_trend: "Bilinmiyor",
      },
    };
  }
}
