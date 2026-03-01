import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Symbol {
  id: string;
  title: string;
  currency: string;
  decimals: number;
}

interface PriceData {
  price: number | null;
  change24h: number | null;
}

const SYMBOLS: Symbol[] = [
  { id: 'BIST100', title: 'BIST 100', currency: '₺', decimals: 2 },
  { id: 'USDTRY', title: 'USD/TRY', currency: '₺', decimals: 4 },
  { id: 'EURTRY', title: 'EUR/TRY', currency: '₺', decimals: 4 },
  { id: 'XAUUSD', title: 'Altın/Ons', currency: '$', decimals: 2 },
  { id: 'XAGUSD', title: 'Gümüş/Ons', currency: '$', decimals: 3 },
  { id: 'XPTUSD', title: 'Platin/Ons', currency: '$', decimals: 2 },
  { id: 'XPDUSD', title: 'Paladyum/Ons', currency: '$', decimals: 2 },
  { id: 'HGUSD', title: 'Bakır/lb', currency: '$', decimals: 4 },
  { id: 'BTCUSDT', title: 'Bitcoin', currency: '$', decimals: 2 },
  { id: 'ETHUSDT', title: 'Ethereum', currency: '$', decimals: 2 },
];

// Fetch crypto prices from CoinGecko
async function fetchCrypto(): Promise<Record<string, PriceData>> {
  const result: Record<string, PriceData> = {};
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',
      { signal: AbortSignal.timeout(6000) }
    );
    if (response.ok) {
      const data = await response.json();
      result.BTCUSDT = {
        price: data.bitcoin?.usd ?? null,
        change24h: data.bitcoin?.usd_24h_change ?? null,
      };
      result.ETHUSDT = {
        price: data.ethereum?.usd ?? null,
        change24h: data.ethereum?.usd_24h_change ?? null,
      };
    }
  } catch {
    // Silently fail for crypto
  }
  return result;
}

// Fetch market data: currencies and metals in parallel
async function fetchMarketData(): Promise<Record<string, PriceData>> {
  const result: Record<string, PriceData> = {};

  // HGUSD ve BIST100 için şimdilik null bırak
  result.HGUSD = { price: null, change24h: null };
  result.BIST100 = { price: null, change24h: null };

  const endpoints = [
    { url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json', key: 'usd' },
    { url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json', key: 'xau' },
    { url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xag.json', key: 'xag' },
    { url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xpt.json', key: 'xpt' },
    { url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xpd.json', key: 'xpd' },
  ];

  const responses = await Promise.allSettled(
    endpoints.map(({ url }) =>
      fetch(url, { signal: AbortSignal.timeout(6000) }).then(r => r.ok ? r.json() : null)
    )
  );

  // 1) USD endpoint → USDTRY, EURTRY
  if (responses[0].status === 'fulfilled' && responses[0].value) {
    try {
      const data = responses[0].value;
      const usdTry = data.usd?.try ?? null;
      const usdEur = data.usd?.eur ?? null;
      if (usdTry !== null) {
        result.USDTRY = { price: usdTry, change24h: null };
      }
      if (usdTry !== null && usdEur !== null && usdEur !== 0) {
        result.EURTRY = { price: (1 / usdEur) * usdTry, change24h: null };
      }
    } catch {
      // skip
    }
  }

  // 2) XAU endpoint → XAUUSD
  if (responses[1].status === 'fulfilled' && responses[1].value) {
    try {
      const data = responses[1].value;
      const xauUsd = data.xau?.usd ?? null;
      if (xauUsd !== null) {
        result.XAUUSD = { price: xauUsd, change24h: null };
      }
    } catch {
      // skip
    }
  }

  // 3) XAG endpoint → XAGUSD
  if (responses[2].status === 'fulfilled' && responses[2].value) {
    try {
      const data = responses[2].value;
      const xagUsd = data.xag?.usd ?? null;
      if (xagUsd !== null) {
        result.XAGUSD = { price: xagUsd, change24h: null };
      }
    } catch {
      // skip
    }
  }

  // 4) XPT endpoint → XPTUSD
  if (responses[3].status === 'fulfilled' && responses[3].value) {
    try {
      const data = responses[3].value;
      const xptUsd = data.xpt?.usd ?? null;
      if (xptUsd !== null) {
        result.XPTUSD = { price: xptUsd, change24h: null };
      }
    } catch {
      // skip
    }
  }

  // 5) XPD endpoint → XPDUSD
  if (responses[4].status === 'fulfilled' && responses[4].value) {
    try {
      const data = responses[4].value;
      const xpdUsd = data.xpd?.usd ?? null;
      if (xpdUsd !== null) {
        result.XPDUSD = { price: xpdUsd, change24h: null };
      }
    } catch {
      // skip
    }
  }

  return result;
}

export default function MarqueeTicker() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [priceData, setPriceData] = useState<Record<string, PriceData>>({});

  useEffect(() => {
    const refresh = async () => {
      // fetchCrypto ve fetchMarketData paralel çalışır
      const [cryptoData, marketData] = await Promise.all([
        fetchCrypto(),
        fetchMarketData(),
      ]);

      // Sonuçları birleştir
      setPriceData({ ...marketData, ...cryptoData });
    };

    refresh();
    const interval = setInterval(refresh, 30000);

    return () => clearInterval(interval);
  }, []);

  const animationDuration = (SYMBOLS.length * 200) / 60;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: '46px',
        backgroundColor: isDark ? '#0D1117' : '#F0F4F8',
        borderBottom: `1px solid ${isDark ? '#1E2D3D' : '#E5E7EB'}`,
      }}
    >
      {/* Left gradient overlay */}
      <div
        className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to right, #0D1117 0%, transparent 100%)'
            : 'linear-gradient(to right, #F0F4F8 0%, transparent 100%)',
        }}
      />

      {/* Right gradient overlay */}
      <div
        className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to left, #0D1117 0%, transparent 100%)'
            : 'linear-gradient(to left, #F0F4F8 0%, transparent 100%)',
        }}
      />

      {/* Marquee container */}
      <div
        className="flex items-center h-full group"
        style={{
          animation: `fk-marquee ${animationDuration}s linear infinite`,
          willChange: 'transform',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = 'running';
        }}
      >
        {/* Render symbols twice for seamless loop */}
        {[...SYMBOLS, ...SYMBOLS].map((symbol, index) => {
          const data = priceData[symbol.id];
          const price = data?.price;
          const change = data?.change24h;
          const isPositive = change !== null && change !== undefined && change >= 0;
          const isNegative = change !== null && change !== undefined && change < 0;

          return (
            <div
              key={`${symbol.id}-${index}`}
              className="flex items-center gap-2 px-4 flex-shrink-0"
              style={{ minWidth: '200px' }}
            >
              {/* Status dot */}
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: isPositive
                    ? '#10B981'
                    : isNegative
                    ? '#EF4444'
                    : isDark
                    ? '#8899AA'
                    : '#9CA3AF',
                }}
              />

              {/* Title */}
              <span
                className="font-mono text-xs"
                style={{
                  color: isDark ? '#8899AA' : '#6B7280',
                }}
              >
                {symbol.title}
              </span>

              {/* Price */}
              <span
                className="font-bold text-sm"
                style={{
                  color: isDark ? '#F0F4F8' : '#111827',
                }}
              >
                {price !== null && price !== undefined
                  ? `${symbol.currency}${price.toFixed(symbol.decimals)}`
                  : '—'}
              </span>

              {/* Change badge */}
              {change !== null && change !== undefined && (
                <span
                  className="text-xs font-semibold px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: isPositive
                      ? 'rgba(16, 185, 129, 0.15)'
                      : 'rgba(239, 68, 68, 0.15)',
                    color: isPositive ? '#10B981' : '#EF4444',
                  }}
                >
                  {isPositive ? '+' : ''}
                  {change.toFixed(2)}%
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes fk-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
