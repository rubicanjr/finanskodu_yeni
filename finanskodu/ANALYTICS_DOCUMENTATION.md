# Google Analytics 4 Entegrasyonu Dokümantasyonu

## 📊 Genel Bakış

Finans Kodu web sitesine Google Analytics 4 (GA4) entegrasyonu başarıyla tamamlanmıştır. Bu dokümantasyon, kurulum detaylarını, izlenen event'leri ve kullanım örneklerini içerir.

---

## ⚙️ Kurulum

### 1. Environment Variable

GA4 Measurement ID, environment variable olarak yapılandırılmıştır:

```bash
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Not:** Measurement ID'yi Google Analytics dashboard'unuzdan alabilirsiniz (Admin > Data Streams > Web Stream Details).

### 2. Tracking Script

GA4 tracking script `client/index.html` dosyasına eklenmiştir ve sayfa yüklendiğinde otomatik olarak çalışır.

### 3. Analytics Utility

`client/src/lib/analytics.ts` dosyası, tüm tracking fonksiyonlarını içerir ve TypeScript type-safe yapıdadır.

---

## 📈 İzlenen Event'ler

### 1. Otomatik Sayfa Görüntüleme (Page View)

**Tetiklenme:** Her route değişiminde otomatik

**Konum:** `client/src/App.tsx`

**Parametreler:**
- `page_path`: URL path (örn: `/blog`)
- `page_title`: Sayfa başlığı
- `page_location`: Tam URL

**Örnek Console Log:**
```
[Analytics] Page view tracked: /blog
```

---

### 2. CTA Buton Tıklamaları

**Event Adı:** `cta_click`

**Tetiklenme Noktaları:**
- Hero section'daki ana CTA butonları
- Product card'larındaki CTA butonları
- Chat widget açma butonları

**Parametreler:**
- `button_name`: Buton tanımlayıcısı (örn: `hero_products_cta`)
- `destination`: Hedef URL veya anchor (örn: `#urunler`)

**Örnek Kullanım:**
```typescript
import { trackCTAClick } from '@/lib/analytics';

<button onClick={() => trackCTAClick('hero_products_cta', '#urunler')}>
  Dijital Araçları Keşfet
</button>
```

**Örnek Console Log:**
```
[Analytics] Event tracked: cta_click {button_name: hero_products_cta, destination: #urunler}
```

---

### 3. Blog Görüntüleme

**Event Adı:** `blog_view`

**Tetiklenme:** Blog detay sayfası açıldığında

**Konum:** `client/src/pages/BlogDetailPage.tsx`

**Parametreler:**
- `blog_slug`: Blog URL slug'ı
- `blog_title`: Blog başlığı
- `category`: Blog kategorisi (ilk tag)

**Örnek Kullanım:**
```typescript
import { trackBlogView } from '@/lib/analytics';

useEffect(() => {
  if (post) {
    trackBlogView(slug, post.title, post.tags[0]);
  }
}, [slug, post]);
```

---

### 4. Kategori Filtreleme

**Event Adı:** `category_filter`

**Tetiklenme:** Blog listesinde kategori filtresi seçildiğinde

**Konum:** `client/src/pages/BlogListPage.tsx`

**Parametreler:**
- `category`: Seçilen kategori adı

**Örnek Kullanım:**
```typescript
import { trackCategoryFilter } from '@/lib/analytics';

<button onClick={() => {
  setSelectedCategory(category);
  trackCategoryFilter(category);
}}>
  {category}
</button>
```

**Örnek Console Log:**
```
[Analytics] Event tracked: category_filter {category: AI}
```

---

### 5. Chat Widget Etkileşimi

**Event Adı:** `chat_widget`

**Tetiklenme:** Chat widget açıldığında veya kapatıldığında

**Konum:** `client/src/components/DualPersonaWidget.tsx`

**Parametreler:**
- `action`: `open` veya `close`
- `persona`: `sarp` veya `vera`

**Örnek Kullanım:**
```typescript
import { trackChatWidget } from '@/lib/analytics';

const handleOpenWidget = (persona: 'sarp' | 'vera') => {
  setActivePersona(persona);
  setIsOpen(true);
  trackChatWidget('open', persona);
};
```

---

## 🔧 Mevcut Utility Fonksiyonları

### `trackPageView(path, title?)`
Sayfa görüntülemelerini izler.

### `trackEvent(eventName, params?)`
Genel amaçlı custom event tracking.

### `trackCTAClick(buttonName, destination?)`
CTA buton tıklamalarını izler.

### `trackBlogView(slug, title, category?)`
Blog görüntülemelerini izler.

### `trackChatWidget(action, persona)`
Chat widget etkileşimlerini izler.

### `trackTTSUsage(persona, messageLength)`
Text-to-Speech kullanımını izler (henüz entegre edilmedi).

### `trackCategoryFilter(category)`
Blog kategori filtrelerini izler.

### `trackScrollDepth(percentage)`
Sayfa scroll derinliğini izler (henüz entegre edilmedi).

### `trackOutboundLink(url, linkText?)`
Harici link tıklamalarını izler (henüz entegre edilmedi).

---

## 📊 Google Analytics Dashboard'da Görüntüleme

### Gerçek Zamanlı Raporlar

1. Google Analytics dashboard'a gidin
2. **Reports** > **Realtime** sekmesine tıklayın
3. Aşağıdaki metrikleri görebilirsiniz:
   - Aktif kullanıcılar
   - Sayfa görüntülemeleri
   - Event'ler (cta_click, blog_view, category_filter, chat_widget)

### Event Raporları

1. **Reports** > **Engagement** > **Events**
2. Tüm custom event'leri görebilirsiniz:
   - `page_view`
   - `cta_click`
   - `blog_view`
   - `category_filter`
   - `chat_widget`

### Popüler İçerik Analizi

1. **Reports** > **Engagement** > **Pages and screens**
2. En çok görüntülenen sayfaları görebilirsiniz
3. Blog yazılarının performansını karşılaştırabilirsiniz

---

## 🧪 Test ve Doğrulama

### Browser Console'da Test

1. Dev server'ı açın: `pnpm dev`
2. Browser console'u açın (F12)
3. Siteyi kullanın (sayfa değiştir, butonlara tıkla, blog oku)
4. Console'da analytics loglarını görün:

```
[Analytics] Page view tracked: /
[Analytics] Event tracked: cta_click {button_name: hero_products_cta, destination: #urunler}
[Analytics] Event tracked: category_filter {category: AI}
```

### GA4 DebugView ile Test

1. Browser'a GA4 Debug extension kurun
2. Debug mode'u aktifleştirin
3. Google Analytics > **Admin** > **DebugView**
4. Gerçek zamanlı event'leri görün

---

## 🚀 Gelecek İyileştirmeler

### Henüz Entegre Edilmemiş Event'ler

1. **TTS Kullanımı** (`trackTTSUsage`)
   - Text-to-Speech özelliği kullanıldığında
   - Parametreler: persona, message_length

2. **Scroll Depth** (`trackScrollDepth`)
   - Kullanıcıların sayfa içinde ne kadar aşağı kaydırdığını izler
   - Parametreler: percentage (25%, 50%, 75%, 100%)

3. **Outbound Link** (`trackOutboundLink`)
   - Harici linklere tıklamaları izler
   - Parametreler: url, link_text

### Önerilen Ek Event'ler

1. **Form Submission**
   - Newsletter kayıt formu
   - İletişim formu

2. **Video Engagement**
   - Video başlatma/durdurma
   - Video tamamlanma oranı

3. **Search Queries**
   - Site içi arama sorguları (eğer arama özelliği eklenirse)

4. **E-commerce Events** (eğer ürün satışı başlarsa)
   - `view_item`
   - `add_to_cart`
   - `begin_checkout`
   - `purchase`

---

## 🔒 Güvenlik ve Gizlilik

### GDPR Uyumluluğu

- GA4 otomatik olarak IP anonimizasyonu yapar
- Cookie consent banner eklemek önerilir (özellikle AB kullanıcıları için)

### Veri Saklama

- GA4 varsayılan olarak 2 ay kullanıcı verisi saklar
- Admin > Data Settings > Data Retention'dan ayarlanabilir

---

## 📞 Destek

Analytics ile ilgili sorularınız için:
- **Dokümantasyon:** `client/src/lib/analytics.ts` dosyasındaki JSDoc yorumları
- **Test:** Browser console'da `[Analytics]` prefix'li loglar
- **GA4 Dashboard:** [analytics.google.com](https://analytics.google.com)

---

## ✅ Kurulum Kontrolü

Entegrasyonun doğru çalıştığını kontrol etmek için:

- [x] `VITE_GA4_MEASUREMENT_ID` environment variable tanımlı
- [x] `client/index.html` içinde gtag script yükleniyor
- [x] `client/src/lib/analytics.ts` utility dosyası mevcut
- [x] `client/src/App.tsx` içinde otomatik pageview tracking aktif
- [x] CTA butonlarında `trackCTAClick` çağrılıyor
- [x] Blog detay sayfasında `trackBlogView` çağrılıyor
- [x] Kategori filtrelerinde `trackCategoryFilter` çağrılıyor
- [x] Chat widget'ta `trackChatWidget` çağrılıyor
- [x] Browser console'da analytics logları görünüyor
- [x] GA4 dashboard'da event'ler görünüyor (canlıya alındıktan sonra)

---

**Son Güncelleme:** 16 Şubat 2026  
**Versiyon:** 1.0.0  
**Durum:** ✅ Aktif ve Çalışıyor
