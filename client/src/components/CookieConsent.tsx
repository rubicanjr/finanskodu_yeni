/**
 * CookieConsent — KVKK/GDPR Çerez Onay Banner'ı
 *
 * Kullanıcı ilk ziyaretinde gösterilir. Onay/red kararı localStorage'da saklanır.
 * - "Kabul Et": Tüm analitik çerezler etkinleştirilir (GA4, Clarity)
 * - "Reddet": Yalnızca zorunlu çerezler kullanılır, analitik yüklenmez
 * - "Detaylar": Gizlilik politikası sayfasına yönlendirir
 *
 * Teknik not: GA4 ve Clarity index.html'de localStorage'daki 'fk-cookie-consent'
 * değerini kontrol ederek yüklenir. Bu bileşen sadece UI katmanıdır.
 */
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X, Shield } from 'lucide-react';

const CONSENT_KEY = 'fk-cookie-consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<ConsentStatus>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY) as ConsentStatus;
      if (!stored) {
        // 500ms gecikme: sayfa yüklendikten sonra göster (LCP'yi etkilemez)
        const timer = setTimeout(() => setVisible(true), 500);
        return () => clearTimeout(timer);
      }
      setConsent(stored);
    } catch {
      // localStorage erişim hatası — banner'ı göster
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {}
    setConsent('accepted');
    setVisible(false);

    // GA4 ve Clarity'yi dinamik olarak yükle (index.html'deki window.load handler'ı tetikle)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('fk-cookie-accepted'));
    }
  };

  const handleReject = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'rejected');
    } catch {}
    setConsent('rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Çerez kullanım bildirimi"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="max-w-4xl mx-auto rounded-xl border border-border/60 p-4 md:p-6 shadow-2xl"
        style={{
          background: 'rgba(5, 8, 16, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          pointerEvents: 'all',
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* İkon */}
          <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
            <Cookie className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>

          {/* İçerik */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
              <p className="text-sm font-semibold text-foreground">
                Çerez ve Gizlilik Bildirimi (KVKK)
              </p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Finanskodu.com, site deneyimini iyileştirmek ve kullanım istatistiklerini analiz etmek için
              çerezler kullanmaktadır. Zorunlu çerezler her zaman aktiftir. Analitik çerezler (Google
              Analytics, Microsoft Clarity) için onayınız gerekmektedir.{' '}
              <a
                href="/kvkk"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gizlilik Politikası
              </a>
            </p>
          </div>

          {/* Butonlar */}
          <div className="flex flex-row md:flex-col gap-2 flex-shrink-0 w-full md:w-auto">
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 md:flex-none text-xs font-semibold"
            >
              Kabul Et
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReject}
              className="flex-1 md:flex-none text-xs bg-transparent border-border/60 text-muted-foreground hover:text-foreground"
            >
              Reddet
            </Button>
          </div>

          {/* Kapat butonu */}
          <button
            onClick={handleReject}
            aria-label="Çerez bildirimini kapat"
            className="absolute top-3 right-3 md:relative md:top-auto md:right-auto p-1 rounded text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
