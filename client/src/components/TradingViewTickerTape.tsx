import { useEffect, useRef } from "react";

/**
 * TradingView Ticker Tape Widget
 * Real-time market data strip for BIST100, USD/TRY, Gold, Bitcoin
 * 
 * Displays live prices with color-coded changes
 * Auto-scrolling ticker tape at the top of the page
 */

export default function TradingViewTickerTape() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up any existing script
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Create TradingView widget script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        {
          "proName": "BIST:XU100",
          "title": "BIST 100"
        },
        {
          "proName": "FX:USDTRY",
          "title": "USD/TRY"
        },
        {
          "proName": "OANDA:XAUUSD",
          "title": "Altın/Ons"
        },
        {
          "proName": "BINANCE:BTCUSDT",
          "title": "Bitcoin"
        },
        {
          "proName": "OANDA:XAGUSD",
          "title": "Gümüş/Ons"
        },
        {
          "proName": "OANDA:XPTUSD",
          "title": "Platin/Ons"
        },
        {
          "proName": "OANDA:XPDUSD",
          "title": "Paladyum/Ons"
        },
        {
          "proName": "COMEX:HG1!",
          "title": "Bakır/lb"
        }
      ],
      "showSymbolLogo": true,
      "isTransparent": true,
      "displayMode": "compact",
      "colorTheme": "dark",
      "locale": "tr"
    });

    containerRef.current?.appendChild(script);

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" style={{ width: "100%", height: "46px" }}>
      <div className="tradingview-widget-container__widget" ref={containerRef}></div>
    </div>
  );
}
