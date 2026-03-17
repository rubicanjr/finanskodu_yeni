import { useEffect, memo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

function TickerTape() {
  const { theme } = useTheme();

  useEffect(() => {
    const loadWidget = () => {
      const container = document.getElementById('tradingview-ticker-container');
      if (!container || container.hasChildNodes()) return; // Zaten yüklendiyse tekrar yükleme

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "FX_IDC:USDTRY", "title": "USD/TRY" },
          { "proName": "TVC:GOLD", "title": "Altın/Ons" },
          { "proName": "TVC:SILVER", "title": "Gümüş/Ons" },
          { "proName": "COMEX:HG1!", "title": "Bakır/Ons" },
          { "proName": "TVC:PLATINUM", "title": "Platin/Ons" },
          { "proName": "TVC:PALLADIUM", "title": "Paladyum/Ons" },
          { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" }
        ],
        "showSymbolLogo": true,
        "colorTheme": theme,
        "isTransparent": true,
        "displayMode": "adaptive",
        "locale": "tr"
      });

      container.innerHTML = ''; // Önceki scripti temizle
      container.appendChild(script);
    };

    // Tarayıcı boştayken yükle, 2 saniye timeout ile
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadWidget, { timeout: 2000 });
    } else {
      // Desteklenmiyorsa kısa bir gecikme ile yükle
      setTimeout(loadWidget, 500);
    }

    return () => {
      const container = document.getElementById('tradingview-ticker-container');
      if (container) container.innerHTML = '';
    };
  }, [theme]);

  return (
    <div id="tradingview-ticker-container" className="fixed top-0 left-0 right-0 h-14 z-50 bg-background/80 backdrop-blur-sm border-b border-border" />
  );
}

export default memo(TickerTape);
