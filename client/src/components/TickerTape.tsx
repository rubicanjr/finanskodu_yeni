import { useEffect, memo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

function TickerTape() {
  const { theme } = useTheme();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "BIST:XU100", "title": "BIST 100" },
        { "proName": "FX_IDC:USDTRY", "title": "USD/TRY" },
        { "proName": "FX_IDC:EURTRY", "title": "EUR/TRY" },
        { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
        { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" }
      ],
      "showSymbolLogo": true,
      "colorTheme": theme,
      "isTransparent": true,
      "displayMode": "adaptive",
      "locale": "tr"
    });

    const container = document.getElementById('tradingview-ticker-container');
    if (container) {
      container.innerHTML = ''; // Önceki scripti temizle
      container.appendChild(script);
    }

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [theme]);

  return (
    <div id="tradingview-ticker-container" className="fixed top-0 left-0 right-0 h-14 z-50 bg-background/80 backdrop-blur-sm border-b border-border" />
  );
}

export default memo(TickerTape);
