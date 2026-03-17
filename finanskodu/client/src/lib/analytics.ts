/**
 * Google Analytics 4 Tracking Utilities
 * 
 * Bu dosya GA4 event tracking için yardımcı fonksiyonlar içerir.
 * gtag fonksiyonu index.html'de global olarak tanımlanmıştır.
 */

// Global gtag type declaration
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Sayfa görüntüleme (pageview) event'i gönder
 * @param path - Görüntülenen sayfa yolu (örn: "/blog/makale-slug")
 * @param title - Sayfa başlığı (opsiyonel)
 */
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag !== 'function') {
    console.warn('[Analytics] gtag is not loaded yet');
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });

  console.log('[Analytics] Page view tracked:', path);
};

/**
 * Custom event gönder
 * @param eventName - Event adı (örn: "cta_click", "blog_read")
 * @param eventParams - Event parametreleri
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window.gtag !== 'function') {
    console.warn('[Analytics] gtag is not loaded yet');
    return;
  }

  window.gtag('event', eventName, eventParams);

  console.log('[Analytics] Event tracked:', eventName, eventParams);
};

/**
 * CTA buton tıklaması izle
 * @param buttonName - Buton adı (örn: "hero_cta", "product_card")
 * @param destination - Hedef URL veya section ID
 */
export const trackCTAClick = (buttonName: string, destination?: string) => {
  trackEvent('cta_click', {
    button_name: buttonName,
    destination: destination,
  });
};

/**
 * Blog okuma event'i izle
 * @param blogSlug - Blog yazısının slug'ı
 * @param blogTitle - Blog yazısının başlığı
 * @param category - Blog kategorisi
 */
export const trackBlogView = (
  blogSlug: string,
  blogTitle: string,
  category?: string
) => {
  trackEvent('blog_view', {
    blog_slug: blogSlug,
    blog_title: blogTitle,
    category: category,
  });
};

/**
 * Chat widget açma/kapama izle
 * @param action - "open" veya "close"
 * @param persona - "sarp" veya "vera"
 */
export const trackChatWidget = (action: 'open' | 'close', persona?: string) => {
  trackEvent('chat_widget', {
    action: action,
    persona: persona,
  });
};

/**
 * TTS (Text-to-Speech) kullanımı izle
 * @param persona - "sarp" veya "vera"
 * @param messageLength - Mesaj karakter uzunluğu
 */
export const trackTTSUsage = (persona: string, messageLength: number) => {
  trackEvent('tts_usage', {
    persona: persona,
    message_length: messageLength,
  });
};

/**
 * Blog kategori filtreleme izle
 * @param category - Seçilen kategori
 */
export const trackCategoryFilter = (category: string) => {
  trackEvent('category_filter', {
    category: category,
  });
};

/**
 * Scroll depth izle (sayfa scroll yüzdesi)
 * @param percentage - Scroll yüzdesi (25, 50, 75, 100)
 */
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    percentage: percentage,
  });
};

/**
 * Dış link tıklaması izle
 * @param url - Tıklanan dış link URL'i
 * @param linkText - Link metni
 */
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent('outbound_link', {
    url: url,
    link_text: linkText,
  });
};
