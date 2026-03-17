/**
 * SwUpdateToast — Service Worker Güncelleme Bildirimi
 *
 * VitePWA'nın `registerType: 'prompt'` modu ile çalışır.
 * Yeni bir SW sürümü hazır olduğunda kullanıcıya sade bir banner gösterir.
 * Kullanıcı "Yenile" butonuna tıkladığında SW güncellenir ve sayfa yenilenir.
 */
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useEffect, useState } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SwUpdateToast() {
  const [visible, setVisible] = useState(false);

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      // SW kaydedildi — periyodik güncelleme kontrolü (her 60 dakika)
      if (r) {
        setInterval(() => r.update(), 60 * 60 * 1000);
      }
    },
    onRegisterError(error: unknown) {
      console.warn('[SW] Kayıt hatası:', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setVisible(true);
    }
  }, [needRefresh]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border"
      style={{
        background: 'var(--card)',
        borderColor: 'rgba(0, 212, 255, 0.25)',
        maxWidth: '420px',
        width: 'calc(100vw - 2rem)',
      }}
    >
      <RefreshCw className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--fk-cyan)' }} />
      <span className="flex-1 text-sm text-foreground">
        Sitenin yeni bir sürümü mevcut.
      </span>
      <Button
        size="sm"
        onClick={() => updateServiceWorker(true)}
        className="flex-shrink-0 font-semibold text-xs px-3 py-1.5 h-auto"
        style={{
          background: 'var(--fk-cyan)',
          color: 'var(--fk-bg)',
          border: 'none',
        }}
      >
        Yenile
      </Button>
      <button
        onClick={() => setVisible(false)}
        aria-label="Kapat"
        className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
