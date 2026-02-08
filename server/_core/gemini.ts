/**
 * Gemini API Wrapper for Stock Analysis
 * Provides AI-powered financial commentary using Google's Gemini model
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyB747gc6pUEbVeQlM3ZxhkPp4J-MF_Z-h0";
const genAI = new GoogleGenerativeAI(apiKey);
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
  try {
    const prompt = `${ticker} hissesi şu an ${currentPrice} TL seviyesinde. Aşağıdaki 3 bölümü AYRI AYRI ve KISA (her biri maksimum 2 cümle) yaz:

1. TEKNIK GÖRÜNÜM: Teknik analiz açısından bu hissenin durumu nedir?
2. SOSYAL MEDYA HYPE'I: Sosyal medyada bu hisse hakkında neler söyleniyor?
3. TEMEL ANALIZ: Şirketin temel finansal durumu nasıl?

Her bölümü açık bir şekilde başlığıyla birlikte yaz.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the response into 3 sections
    const technicalMatch = text.match(/TEKNIK GÖRÜNÜM[:\s]*(.*?)(?=SOSYAL|$)/i);
    const socialMatch = text.match(/SOSYAL MEDYA[:\s]*(.*?)(?=TEMEL|$)/i);
    const fundamentalMatch = text.match(/TEMEL ANALIZ[:\s]*(.*?)$/i);

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
