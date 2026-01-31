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


## Mobil Ses Çalma Düzeltmesi & Logo Güncellemesi

### TASK 1: Mobil Audio Playback Düzeltmesi (iOS/Android Autoplay Politikaları)
- [x] Silent Unlock stratejisi: İlk touchstart/click'te 0.1 saniyeliğ sessiz buffer çal
- [x] AudioContext.resume() hemen click handler içinde çağrılsın
- [x] Mikrofon butonuna onTouchStart event listener ekle
- [x] audio.play() Promise rejection'ı yakala ve hata mesajı göster

### TASK 2: Speech Recognition İyileştirmeleri
- [x] iOS için webkitSpeechRecognition kullanımını doğrula
- [x] Mobil için continuous = false ayarını kontrol et
- [x] onend event'inde backend isteğini hemen tetikle

### TASK 3: Logo Güncellemesi
- [x] fklogo.jpg dosyasını public/images klasörüne kopyala
- [x] Navbar'daki logo boyutunu 40px yüksekliğe ayarla
- [x] object-fit: contain ile aspect ratio koru


## Final Polish & Mobile Optimization (pasted_content_14.txt)

### TASK 1: AudioManager.ts Oluşturma
- [x] src/utils/AudioManager.ts dosyası oluştur
- [x] AudioContext unlock stratejisi
- [x] playAudioBlob fonksiyonu

### TASK 2: VoiceWidget Güncelleme
- [x] audioManager import et
- [x] onTouchStart ve onMouseDown'da unlockAudio() çağır
- [x] audioManager.playAudioBlob() kullan
- [x] Navbar'dan "Finans Kodu" metnini kaldır, sadece logo göster

### TASK 3: Hero Section Overhaul
- [x] H1: "Duygularınızı Değil, Sisteminizi Yönetin."
- [x] H2: Yeni açıklama metni
- [x] Merkezi görsel: Laptop + Sarp (Sol) + Vera (Sağ)
- [x] Not: "Bu karakterler ürün değil, asistanlar"
- [x] Primary Button: "Dijital Araçları Keşfet" (Products'a scroll)
- [x] Secondary Button: "Foruma Git" (hikie.space linki)

### TASK 4: Persona Intro Mesajları
- [x] Sarp intro: Teknik motor, veri işleme, optimizasyon
- [x] Vera intro: Mimari ve psikoloji katmanı, Finansal Anayasa

### TASK 5: Content Cleanup
- [x] "Hakkımızda" bölümünü tamamen kaldır
- [x] Social Proof: "1000+ Mutlu Kullanıcı"
- [x] Footer'dan Hakkımızda linkini kaldırCan İçliyürek'le tanışın" + LinkedIn linki

### TASK 6: Product Carousel (Sadece 3 Ürün)
- [x] FİNANS KODU: Kaos İçinde Düzen
- [x] AI Prompt Kütüphanesi
- [x] Finansal Kokpit (Dashboard)

### TASK 7: Blog Carousel (Yeni Bölüm)
- [x] "Blog & Analizler" başlıklı yeni section
- [x] 5 blog kartı swipeable carousel formatında
- [x] Her kart: Title + Excerpt + "Devamını Oku" butonu


## UI Cleanup & Content Expansion (Yeni Strateji)

### TASK 1: Navbar Cleanup
- [x] "Finans Kodu" metnini navbar'dan kaldır (sadece logo kalsın) - zaten kaldırılmıştı
- [x] "Hakkımızda" linkini navigasyon menüsünden kaldır

### TASK 2: Social Proof Update
- [x] "500+ Mutlu Kullanıcı" → "1000+ Mutlu Kullanıcı" olarak güncelle - zaten 1000+ olarak ayarlı

### TASK 3: Blog Content Expansion
- [x] Yeni makale 1: "Altın'ın En Büyük Düşmanı ve Dostu: ABD Reel Faizleri"
- [x] Yeni makale 2: "Finansal Özgürlük İçin Okumanız Gereken 3 Gizli Rapor"
- [x] Yeni makale 3: "Manuel Takibi Bırakmanız Gerektiğini Gösteren 7 İşaret"
