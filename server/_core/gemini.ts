/**
 * Gemini API Wrapper for Stock Analysis
 * Provides AI-powered financial commentary using Google's Gemini model
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("[Gemini] GEMINI_API_KEY is not configured. Stock analysis will be unavailable.");
}
const genAI = new GoogleGenerativeAI(apiKey ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export interface StockAnalysisDetail {
  technical: string;
  social: string;
  fundamental: string;
}

export interface StockAnalysisResult {
  ticker: string;
  currentPrice: number;
  analysis: string;
  details?: StockAnalysisDetail;
  timestamp: number;
}

/**
 * Analyze a stock using Gemini API
 * Returns 3 separate paragraphs: Technical, Social, Fundamental
 */
export async function analyzeStock(
  ticker: string,
  currentPrice: number
): Promise<StockAnalysisResult> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  try {
    // Cache Buster: Add timestamp to prevent AI from returning cached responses
    const now = new Date().toISOString();
    const randomSeed = Math.floor(Math.random() * 10000);
    
    const prompt = `ANALİZ ZAMANI: ${now} (Bu tarih ve saatteki veriyi kullan, eski cache'i unut).
RASTGELE SEED: ${randomSeed}

${ticker} hissesi için aşağıdaki 3 bölümü AYRI AYRI ve KISA (her biri maksimum 3 cümle) yaz:

1. TEKNIK GÖRÜNÜM: Teknik analiz açısından bu hissenin durumu nedir? (RSI, Hacim, Hareketli Ortalamalar)

2. SOSYAL MEDYA ANALİZİ:
GÖREV: ${ticker} için CANLI sosyal medya ve haber analizi yap.
KURALLAR:
- Genel ifadeler YASAKTIR. (Örn: "Yatırımcılar umutlu" deme.)
- Mutlaka ${ticker} ile ilgili son 1 hafta içinde internette konuşulan özgün bir habere, ihaleye veya olaya atıfta bulun.
- Eğer havayolu şirketi ise (örn: THYAO) "turizm sezonu, petrol fiyatları" gibi; Savunma sanayi ise (örn: ASELS) "yeni siparişler, jeopolitik riskler"den bahset.
ÇIKTI FORMATI:
Twitter Nabzı: [Spesifik konu]
Forum Tartışmaları: [Spesifik tartışma]

3. TEMEL ANALİZ:
GÖREV: ${ticker} için gerçek zamanlı Temel Analiz yap.
ZORUNLU: Yahoo Finance veya KAP verilerini baz al.
KURALLAR:
- ASLA UYDURMA: Güncel F/K, PD/DD ve Son Çeyrek Net Kâr rakamını net sayı olarak yaz. Bulamazsan "Veri çekilemedi" de.
- SEKTÖREL:
  * Sanayi/Savunma ise: Sipariş Bakiyesi, Teşvikler.
  * Havayolu ise: Doluluk Oranları, Yakıt, Turizm.
  * Banka ise: Faiz Marjı, Kredi/Mevduat.
- SONUÇ: Sektör ortalamasına göre ucuz mu pahalı mı? Tek cümleyle özetle.

Her bölümü açık bir şekilde başlığıyla birlikte yaz.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the response into 3 sections
    const technicalMatch = text.match(/TEKN[İI]K G[ÖO]R[ÜU]N[ÜU]M[:\s]*([\s\S]*?)(?=SOSYAL|$)/i);
    const socialMatch = text.match(/SOSYAL MEDYA[:\s]*([\s\S]*?)(?=TEMEL|$)/i);
    const fundamentalMatch = text.match(/TEMEL ANAL[İI]Z[:\s]*([\s\S]*?)$/i);

    const details: StockAnalysisDetail = {
      technical: technicalMatch ? technicalMatch[1].trim() : "Teknik analiz verisi yükleniyor...",
      social: socialMatch ? socialMatch[1].trim() : "Sosyal medya analizi verisi yükleniyor...",
      fundamental: fundamentalMatch ? fundamentalMatch[1].trim() : "Temel analiz verisi yükleniyor...",
    };

    return {
      ticker,
      currentPrice,
      analysis: text,
      details,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(`Failed to analyze stock ${ticker}: ${error}`);
  }
}

/**
 * Batch analyze multiple stocks
 */
export async function analyzeStocksBatch(
  stocks: Array<{ ticker: string; currentPrice: number }>
): Promise<StockAnalysisResult[]> {
  const results = await Promise.all(
    stocks.map((stock) => analyzeStock(stock.ticker, stock.currentPrice))
  );
  return results;
}
