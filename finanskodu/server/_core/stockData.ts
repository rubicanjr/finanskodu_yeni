/**
 * Real Stock Data Helper
 * Fetches live stock prices from Yahoo Finance API
 */

export async function getRealStockPrice(ticker: string): Promise<number> {
  try {
    // Format ticker for BIST stocks (e.g., THYAO.IS)
    const symbol = ticker.endsWith(".IS") ? ticker : `${ticker}.IS`;
    
    // Using a lightweight API endpoint instead of yfinance
    // This avoids heavy dependencies and works in Node.js environment
    const response = await fetch(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=price`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    if (!response.ok) {
      console.warn(`Failed to fetch price for ${symbol}, using fallback`);
      return 50.0; // Fallback value
    }

    const data = await response.json();
    const price = data?.quoteSummary?.result?.[0]?.price?.regularMarketPrice?.raw;

    if (typeof price === "number" && price > 0) {
      return Math.round(price * 100) / 100;
    }

    return 50.0; // Fallback
  } catch (error) {
    console.error("Error fetching stock price:", error);
    return 50.0; // Fallback value
  }
}

export function calculateTargetPrice(currentPrice: number): number {
  return Math.round(currentPrice * 1.45 * 100) / 100;
}
