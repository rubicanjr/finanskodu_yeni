/**
 * Symbol Helper for TradingView Widget
 * Dynamically determines the correct prefix based on ticker code
 */

export function getTradingViewSymbol(ticker: string): string {
  if (!ticker) return "BIST:THYAO"; // Default fallback

  const upperTicker = ticker.toUpperCase().trim();

  // Check if ticker ends with USD or USDT (Crypto/Forex)
  if (upperTicker.endsWith("USD") || upperTicker.endsWith("USDT")) {
    return `BINANCE:${upperTicker}`;
  }

  // Default to Turkish stock exchange (Borsa İstanbul)
  return `BIST:${upperTicker}`;
}

/**
 * Validate ticker format
 */
export function isValidTicker(ticker: string): boolean {
  if (!ticker || ticker.trim().length === 0) return false;
  if (ticker.length > 20) return false; // Reasonable max length
  return /^[A-Za-z0-9]+$/.test(ticker); // Alphanumeric only
}

/**
 * Get exchange name from symbol
 */
export function getExchangeName(symbol: string): string {
  if (symbol.startsWith("BIST:")) return "Borsa İstanbul";
  if (symbol.startsWith("BINANCE:")) return "Binance";
  if (symbol.startsWith("NASDAQ:")) return "NASDAQ";
  if (symbol.startsWith("NYSE:")) return "NYSE";
  return "Unknown Exchange";
}
