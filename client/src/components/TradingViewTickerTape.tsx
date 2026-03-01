import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * TradingView Ticker Tape Widget
 * Real-time market data strip for BIST100, USD/TRY, Gold, Bitcoin
 *
 * Displays live prices with color-coded changes
 * Auto-scrolling ticker tape at the top of the page
 * displayMode: "scrolling" ensures continuous animation
 */

export default function TradingViewTickerTape() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Temizle
    container.innerHTML = '';

    // 1. Önce widget div'i ekle (script'ten önce DOM'da olmalı)
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    container.appendChild(widgetDiv);

    // 2. Sonra script'i ekle
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "BIST:XU100", "title": "BIST 100" },
        { "proName": "FX:USDTRY", "title": "USD/TRY" },
        { "proName": "FX:EURTRY", "title": "EUR/TRY" },
        { "proName": "TVC:GOLD", "title": "Altın/Ons" },
        { "proName": "TVC:SILVER", "title": "Gümüş/Ons" },
        { "proName": "TVC:PLATINUM", "title": "Platin/Ons" },
        { "proName": "TVC:PALLADIUM", "title": "Paladyum/Ons" },
        { "proName": "COMEX:HG1!", "title": "Bakır/lb" },
        { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
        { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" }
      ],
      "showSymbolLogo": true,
      "isTransparent": true,
      "displayMode": "scrolling",
      "colorTheme": theme === 'light' ? 'light' : 'dark',
      "locale": "tr"
    });

    container.appendChild(script);

    // Cleanup
    return () => {
      if (container) container.innerHTML = '';
    };
  }, [theme]); // theme değişince yeniden yükle

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{ width: '100%', height: '46px' }}
    />
  );
}
