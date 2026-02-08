/**
 * Gemini API Wrapper for Stock Analysis
 * Provides AI-powered financial commentary using Google's Gemini model
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyB747gc6pUEbVeQlM3ZxhkPp4J-MF_Z-h0";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export interface StockAnalysisResult {
  ticker: string;
  currentPrice: number;
  analysis: string;
  timestamp: number;
}

/**
 * Analyze a stock using Gemini API
 * Returns a witty, concise (max 2 sentences) financial commentary
 */
export async function analyzeStock(
  ticker: string,
  currentPrice: number
): Promise<StockAnalysisResult> {
  try {
    const prompt = `${ticker} hissesi şu an ${currentPrice} TL seviyesinde. Bir borsa spekülatörü veya finans uzmanı ağzıyla; esprili, iğneleyici ve kısa (maksimum 2 cümle) bir yorum yap.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return {
      ticker,
      currentPrice,
      analysis: text,
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
