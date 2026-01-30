# Finans Kodu - Visual & Usability Overhaul Todo

## Strateji Belgesi Gereksinimleri (pasted_content_13.txt)

### TASK 1: HERO SECTION REDESIGN (THE "HOOK")
- [x] Uzun paragrafı kaldır ("Finansal Okuryazarlığın Kodları...")
- [x] Yeni H1 Headline: "Sarp Hesaplar, Vera Hisseder. Sen Kazanırsın."
- [x] Sarp (Cyan) ve Vera (Purple) avatarlarını yan yana merkeze yerleştir
- [x] Neon renkli CTA butonu: "Analize Başla" (openChat() fonksiyonunu tetikler)

### TASK 2: DARK MODE & AESTHETICS
- [x] Premium Dark Mode teması
- [x] Background: Deep Black (#0a0a0a)
- [x] Text: White / Light Grey
- [x] Accents: Cyan (Sarp) ve Purple (Vera)
- [x] Vibe: Tech-forward, trustworthy, sleek

### TASK 3: READABILITY & TEXT FORMATTING
- [x] Mobilde 3 satırı geçen paragraf olmamalı
- [x] Uzun metin bloklarını bullet points'e dönüştür
- [x] Lucide-React ikonları ekle (📈, 🧠, 💡)
- [x] line-height ve section padding artır

### TASK 4: MOBILE NAVIGATION (STICKY BOTTOM BAR)
- [x] fixed bottom-0 navigasyon barı
- [x] Items: [🏠 Ana Sayfa] [🛍️ Ürünler] [🤖 Asistan]
- [x] Glassmorphism efekti (blur background)

### TASK 5: SOCIAL PROOF (TRUST SIGNALS)
- [x] Hero Section altına yerleştir
- [x] "1.000+ Yatırımcı Tarafından Kullanılıyor" veya "Finans Profesyonellerinin Tercihi"
- [x] Minimalist ve temiz tasarım

### TASK 6: PRODUCT LISTING (CARD CAROUSEL)
- [x] Ürün listesini Horizontal Scrollable Carousel'e dönüştür
- [x] Card Anatomy: Image (Top), Title (Bold), Price (Highlighted), "İncele" Button
- [x] Swipe left/right etkileşimi

### CRITICAL: DO NOT TOUCH
- [x] DualPersona AI Logic (Sarp/Vera)
- [x] AudioContext Logic
- [x] Knowledge Base
- [x] Voice Settings


## Yeni Gereksinimler (Kullanıcı Talebi)

### TASK 6 UPDATE: PRODUCT LISTING (NO PRICES)
- [x] Ürün kartlarından TÜM fiyat etiketlerini kaldır (₺299, ₺199 vb.)
- [x] Card Anatomy: Image/Icon (Top), Title (Bold), Description (2 satır), "İncele" Button
- [x] Fiyat yerine değer odaklı içerik
- [x] "Detaylı Bilgi" veya "İncele" butonları


## Azure Speech Services (Neural TTS) Entegrasyonu

### TASK 1: Backend Proxy Oluşturma
- [x] Projeyi web-db-user özelliğine yükselt
- [x] Azure API anahtarını Secrets'a ekle (AZURE_SPEECH_KEY, AZURE_SPEECH_REGION)
- [x] /api/tts endpoint oluştur
- [x] text ve voiceName parametrelerini al
- [x] Azure REST API ile ses üret (audio-16khz-32kbitrate-mono-mp3)
- [x] Audio binary döndür

### TASK 2: Frontend Entegrasyonu
- [x] Web Speech API'yi devre dışı bırak (fallback olarak korundu)
- [x] /api/tts endpoint'ine fetch çağrısı yap
- [x] Desktop (Sarp): tr-TR-AhmetNeural
- [x] Mobile (Vera): tr-TR-EmelNeural
- [x] Blob → URL.createObjectURL → Audio.play()

### TASK 3: UX İyileştirmeleri
- [x] "Ses oluşturuluyor..." loading state
- [x] Click-to-Unlock audio context korunsun
- [x] API Key frontend'de ASLA görünmesin
