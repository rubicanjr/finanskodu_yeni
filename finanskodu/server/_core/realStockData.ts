/**
 * Real Stock Data Fetcher & Technical Analysis Calculator
 * Uses yahoo-finance2 for live data and technicalindicators for RSI/MA calculations
 */

import yahooFinance from 'yahoo-finance2';
import { RSI, SMA } from 'technicalindicators';

export interface RealStockData {
  price: number;
  rsi: number | string;
  ma50: number | string;
  fk: number | string;
  pddd: number | string;
  teknik_durum: "POZİTİF" | "NEGATİF" | "NÖTR" | "KARIŞIK";
  volume?: number;
  change?: number;
  changePercent?: number;
}

/**
 * Fetch real-time stock data and calculate technical indicators
 * @param ticker - Stock ticker symbol (e.g., "THYAO", "ASELS")
 * @returns RealStockData object with live prices and calculated indicators
 */
export async function getRealStockData(ticker: string): Promise<RealStockData> {
  try {
    // BIST stocks require .IS suffix
    const symbol = ticker.endsWith('.IS') || ticker.endsWith('USD') 
      ? ticker 
      : `${ticker}.IS`;

    console.log(`[getRealStockData] Fetching data for ${symbol}...`);

    // 1. FETCH FUNDAMENTAL DATA (Live)
    const quote: any = await yahooFinance.quote(symbol);
    
    const currentPrice = quote.regularMarketPrice || 0;
    const fk_orani = quote.trailingPE || 'Veri Yok';
    const pb_ratio = quote.priceToBook || 'Veri Yok';
    const volume = quote.regularMarketVolume || 0;
    const change = quote.regularMarketChange || 0;
    const changePercent = quote.regularMarketChangePercent || 0;

    // 2. FETCH HISTORICAL DATA (Last 3 months for technical analysis)
    const queryOptions = { period1: getThreeMonthsAgo(), period2: new Date() };
    const historicalData: any = await yahooFinance.historical(symbol, queryOptions);

    if (!historicalData || historicalData.length < 50) {
      console.warn(`[getRealStockData] Insufficient historical data for ${symbol}`);
      return {
        price: currentPrice,
        rsi: 'Veri Yok',
        ma50: 'Veri Yok',
        fk: fk_orani,
        pddd: pb_ratio,
        teknik_durum: 'NÖTR',
        volume,
        change,
        changePercent,
      };
    }

    // 3. CALCULATE RSI (14-period)
    const closePrices = historicalData.map((d: any) => d.close);
    const rsiValues = RSI.calculate({
      values: closePrices,
      period: 14,
    });
    const currentRSI = rsiValues.length > 0 
      ? Math.round(rsiValues[rsiValues.length - 1] * 100) / 100 
      : 'Veri Yok';

    // 4. CALCULATE MA50 (50-period Simple Moving Average)
    const ma50Values = SMA.calculate({
      values: closePrices,
      period: 50,
    });
    const ma50 = ma50Values.length > 0 
      ? Math.round(ma50Values[ma50Values.length - 1] * 100) / 100 
      : 'Veri Yok';

    // 5. TECHNICAL SIGNAL LOGIC
    let teknik_durum: "POZİTİF" | "NEGATİF" | "NÖTR" | "KARIŞIK" = "NÖTR";
    
    if (typeof currentRSI === 'number' && typeof ma50 === 'number') {
      if (currentRSI < 45 && currentPrice > ma50) {
        teknik_durum = "KARIŞIK";
      } else if (currentRSI > 55 && currentPrice > ma50) {
        teknik_durum = "POZİTİF";
      } else if (currentRSI < 30) {
        teknik_durum = "POZİTİF"; // Aşırı satım → dip fırsatı
      } else if (currentRSI > 70) {
        teknik_durum = "NEGATİF"; // Aşırı alım → düzeltme riski
      } else if (currentPrice < ma50) {
        teknik_durum = "NEGATİF";
      } else {
        teknik_durum = "KARIŞIK";
      }
    }

    console.log(`[getRealStockData] ${symbol} - Price: ${currentPrice}, RSI: ${currentRSI}, MA50: ${ma50}, Signal: ${teknik_durum}`);

    return {
      price: currentPrice,
      rsi: currentRSI,
      ma50,
      fk: fk_orani,
      pddd: pb_ratio,
      teknik_durum,
      volume,
      change,
      changePercent,
    };
  } catch (error) {
    console.error(`[getRealStockData] Error fetching data for ${ticker}:`, error);
    
    // Return fallback data on error
    return {
      price: 0,
      rsi: 'Veri Yok',
      ma50: 'Veri Yok',
      fk: 'Veri Yok',
      pddd: 'Veri Yok',
      teknik_durum: 'NÖTR',
    };
  }
}

/**
 * Helper function to get date 3 months ago
 */
function getThreeMonthsAgo(): Date {
  const date = new Date();
  date.setMonth(date.getMonth() - 3);
  return date;
}
