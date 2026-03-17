/**
 * SwUpdateToast — Service Worker Güncelleme Bildirimi
 *
 * Çalışma mantığı:
 * 1. autoUpdate modunda SW yeni sürümü arka planda indirir ve skipWaiting ile anında devreye girer.
 * 2. SW devreye girince eski chunk'ları kullanan açık sekmeler için clientsClaim tetiklenir.
 * 3. Bu bileşen kullanıcıya "Yeni sürüm yüklendi, sayfayı yenilemek ister misiniz?" sorar.
 * 4. Kullanıcı reddederse toast kapanır; bir sonraki normal gezinmede yeni sürüm zaten aktif olur.
 *
 * ChunkLoadError kurtarma:
 * - main.tsx'teki global hata yakalayıcı ChunkLoadError'ı algılar ve sayfayı otomatik yeniler.
 * - Bu bileşen yalnızca kullanıcıya bilgi verir; zorunlu yenileme yapmaz.
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
      if (!r) return;
      // Her 30 dakikada bir SW güncellemesini kontrol et (autoUpdate modunda da gerekli)
      setInterval(() => {
        r.update().catch(() => {/* ağ hatası — sessizce geç */});
      }, 30 * 60 * 1000);
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
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border"
      style={{
        background: 'var(--card)',
        borderColor: 'rgba(0, 212, 255, 0.35)',
        maxWidth: '440px',
        width: 'calc(100vw - 2rem)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.1)',
      }}
    >
      <RefreshCw className="w-4 h-4 flex-shrink-0 animate-spin" style={{ color: 'var(--fk-cyan, #00D4FF)' }} />
      <span className="flex-1 text-sm text-foreground leading-snug">
        <strong className="block text-xs font-semibold mb-0.5" style={{ color: 'var(--fk-cyan, #00D4FF)' }}>
          Yeni sürüm hazır
        </strong>
        Sitenin güncel versiyonu yüklendi. Yenilemek ister misiniz?
      </span>
      <Button
        size="sm"
        onClick={() => {
          updateServiceWorker(true);
          // Güncelleme sonrası sayfayı yenile — SW clientsClaim ile devralır
          setTimeout(() => window.location.reload(), 300);
        }}
        className="flex-shrink-0 font-semibold text-xs px-3 py-1.5 h-auto"
        style={{
          background: 'var(--fk-cyan, #00D4FF)',
          color: '#0a0d12',
          border: 'none',
        }}
      >
        Yenile
      </Button>
      <button
        onClick={() => setVisible(false)}
        aria-label="Kapat"
        className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors p-0.5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
