/**
 * Web Vitals Monitoring
 * Core Web Vitals metrikleri console ve GA4'e raporlar.
 * Sadece production'da aktif — dev modda sadece console.log.
 */
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

type ReportTarget = 'console' | 'ga4';

function sendToGA4(metric: Metric) {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag;
  if (typeof gtag !== 'function') return;
  try {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  } catch {
    // AdBlock may block the underlying network request
  }
}

function reportMetric(metric: Metric, targets: ReportTarget[] = ['console', 'ga4']) {
  if (targets.includes('console')) {
    const rating = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    console.info(`[Web Vitals] ${rating} ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})`);
  }
  if (targets.includes('ga4')) {
    sendToGA4(metric);
  }
}

/**
 * Web Vitals izlemeyi başlat.
 * main.tsx'te çağrılmalı — uygulama mount edildikten sonra.
 */
export function initWebVitals() {
  // Tüm Core Web Vitals metrikleri
  onCLS((m) => reportMetric(m));
  onFCP((m) => reportMetric(m));
  onINP((m) => reportMetric(m)); // FID'in yerini INP aldı (web-vitals v4+)
  onLCP((m) => reportMetric(m));
  onTTFB((m) => reportMetric(m));
}

// gtag global tipi — mevcut gtag tipi korunur, ek overload eklenmez
// window.gtag GA4 tarafından index.html'de tanımlanır
