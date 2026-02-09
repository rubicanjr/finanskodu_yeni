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


## Content Data Update (Yeni Strateji)

### ACTION 1: Dijital Ürün Kartı #3 Güncellemesi
- [x] Title: "Pro - Algoritmik Strateji ve Analiz Bülteni (1 Aylık Erişim)"
- [x] Link: https://www.hikie.space/finanskodu/algoritmik-strateji-ve-analiz
- [x] Badge: "Pro" (amber renk)
- [x] Description: Aylık bülten açıklaması

### ACTION 2: Social Proof Sayacı
- [x] "500+" → "1000+" olarak güncelle - zaten "1000+ Mutlu Kullanıcı" olarak ayarlı


## UI Güncellemeleri (Kullanıcı İsteği)

### Görsel 1: Stats Bölümü
- [x] "500+ Mutlu Kullanıcı" → "1000+ Mutlu Kullanıcı" olarak güncelle

### Görsel 2: Footer Güncellemesi
- [x] Logo'yu kaldır
- [x] "Finans Kodu" başlığı yerine "Kurucu Stratejistimizle tanışın: Rubi Can İçliyürek" yaz
- [x] Rubi Can İçliyürek'in LinkedIn profiline bağlantı ekle

### Görsel 3: Navbar Logo
- [x] Sol üstteki logo'yu kaldır


## Footer & Widget Cleanup (Kullanıcı İsteği)

### Footer Açıklama Metni
- [x] "Endüstri Mühendisliği, Finansal Operasyonlar ve Yapay Zeka teknolojilerini birleştiren verimlilik platformu." metnini kaldır

### Sağ Alt Avatar İsmi
- [x] Footer'daki sağ alttaki "Rubi Can İçliyürek" yazısını kaldır


## SEO & AI Bot Erişimi (Yeni Görevler)

### Robots.txt Güncellemesi
- [x] GPTBot için User-agent ve Allow: / kuralı ekle
- [x] Google-Extended için User-agent ve Allow: / kuralı ekle
- [x] Mevcut User-agent: * kurallarını koru

### Sitemap.xml Güncellemesi
- [x] Projedeki tüm rotaları tespit et (App.tsx'den)
- [x] Her rota için <url> etiketi ekle
- [x] loc ve lastmod etiketlerini dahil et


## Robots.txt & Sitemap.xml Düzeltmesi (Kullanıcı Talebi)

### Robots.txt Yeniden Oluşturma
- [x] GPTBot için Allow: / kuralı (tek satır)
- [x] Google-Extended için Allow: / kuralı (tek satır)
- [x] User-agent: * için Allow: / ve Disallow: /api/* kuralları
- [x] Sitemap URL'sini ekle

### Sitemap.xml Yeniden Oluşturma
- [x] Ana sayfa URL'si
- [x] #manifesto anchor bölümü
- [x] #products anchor bölümü
- [x] #contact anchor bölümü
- [x] #blog anchor bölümü
- [x] #testimonials anchor bölümü


## DevOps Fix: Static File Serving (URGENT)

### ACTION 1: Force Overwrite robots.txt
- [x] Navigate to public/ directory
- [x] Force overwrite robots.txt with exact GPTBot/Google-Extended content

### ACTION 2: Force Overwrite sitemap.xml
- [x] Force overwrite sitemap.xml with anchor links (#products, #manifesto, #contact)
- [x] Include changefreq and priority for each URL

### ACTION 3: Verify Build Configuration
- [x] Ensure Vite copies public folder to dist root (publicDir configured correctly)
- [ ] Trigger new deployment (user must click Publish button)


## Dynamic Route Implementation (Express Backend)

### TASK 1: Cleanup Static Files
- [x] Delete public/robots.txt
- [x] Delete public/sitemap.xml

### TASK 2: Implement Dynamic /robots.txt Route
- [x] Add Express route for /robots.txt
- [x] Include GPTBot, Google-Extended, and * user agents
- [x] Set Content-Type: text/plain

### TASK 3: Implement Dynamic /sitemap.xml Route
- [x] Add Express route for /sitemap.xml
- [x] Include anchor links (#products, #manifesto, #contact)
- [x] Set Content-Type: application/xml


## Bing Webmaster Tools Doğrulaması
- [x] index.html head kısmına msvalidate.01 meta etiketi ekle


## SEO Düzeltmeleri (Ana Sayfa)
- [x] Anahtar kelimeleri 10'dan 5 odaklanmış kelimeye indirildi
- [x] Başlık uzunluğu 49 karaktere ayarlandı (30-60 arası)


## SEO Başlık Güncellemesi
- [x] Title tag'i "Finans Kodu | Yapay Zeka Destekli Borsa Analiz ve Portföy Yönetimi" olarak güncellendi (64 karakter)


## Strateji Belgesi Uygulaması

### STEP 1: UI & Visual Updates
- [x] Header logo: fkodulogo.PNG kullan, sol üst köşe, minimal stil (h-10)
- [x] Hero section: Metin zaten "Duygularınızı Değil, Sisteminizi Yönetin." olarak ayarlı
- [x] Mobil layout fix: Scroll indicator mobilde gizlendi (hidden md:block)

### STEP 2: Character Introductions
- [x] Sarp için yeni karşılama mesajı eklendi (DualPersonaWidget)
- [x] Vera için yeni karşılama mesajı eklendi (DualPersonaWidget)

### STEP 3: Knowledge Base Expansion
- [x] AI System Prompt'a ürün bilgi tabanı eklendi (3 ürün detayı - Sarp ve Vera için)
- [x] Ürün sorularına yanıt verebilme yeteneği eklendi


## Siyah Ekran İmleci
- [x] Sarp ve Vera arasındaki siyah ekrana yanıp sönen yeşil />_ imleci eklendi

- [x] İmlece hover efekti eklendi (yeşilden cyan/mor gradient'e geçiş + scale efekti)

- [x] İmlecin yanına "Sistem Hazır..." typing animasyonu eklendi (150ms/karakter)

- [x] Typing animasyonunu sonsuz döngüye çevrildi (yaz - 2s bekle - sil - 0.5s bekle - tekrar başla)

- [x] Animasyon ekranına onClick handler eklendi - DualPersonaWidget'ı açıyor

- [x] Animasyon ekranına tooltip eklendi - hover yapıldığında "Sarp ve Vera ile tanışmak için tıkla" gösteriliyor

- [x] Typing animasyonuna rastgele mesaj döngüsü eklendi (5 farklı mesaj sıralı döngüde)

- [x] Animasyon ekranına tıklandığında pulse ring efekti eklendi (cyan ve mor çift dalga)


## Schema Markup & FAQ Section (pasted_content_3.txt)

### ACTION 1: Global SoftwareApplication Schema
- [x] index.html head kısmına SoftwareApplication JSON-LD schema eklendi
- [x] name: "Finans Kodu AI Prompt Kütüphanesi"
- [x] applicationCategory: "FinanceApplication"
- [x] price: "0" TRY

### ACTION 2: Author Entity Schema (Blog Posts)
- [x] Blog post bileşenine Person schema eklendi
- [x] Sarp için: "Head of Data & Algorithmic Strategy" + LinkedIn placeholder
- [x] Vera için: "Macro Strategist & Behavioral Finance Expert" + LinkedIn placeholder

### ACTION 3: FAQ Section
- [x] Yeni "Sıkça Sorulan Sorular ve Uzman Görüşleri" bölümü oluşturuldu (FAQSection.tsx)
- [x] Accordion style tasarım uygulandı
- [x] 10 soru-cevap çifti eklendi (strateji belgesindeki tam metinlerle)
- [x] FAQPage JSON-LD schema eklendi
- [x] Footer öncesine yerleştirildi (Home.tsx'e import edildi)


## BreadcrumbList Schema
- [x] Ana sayfa (index.html) için BreadcrumbList schema eklendi
- [x] Blog post'ları için BreadcrumbList schema eklendi (BlogSection.tsx)


## Finans Kodu Dedektifi V3.0 - Hackathon MVP

### PHASE 1: DESIGN SYSTEM
- [x] Tailwind config'e yeni color palette eklendi (Deep Space, Neon Cyan, Saturn Gold)
- [x] Hero section başlığı güncellendi: "Bilançoların MR'ını Çeken Yapay Zeka."
- [x] Glassmorphism input field eklendi (border: #00F0FF, placeholder: "Hisse Kodu Girin")
- [x] Action button eklendi: "Analiz Et (27sn)" - Saturn Gold (#FFD700) + loading animation
- [x] Comparison section eklendi (Human vs GPT-4 vs Finans Kodu - Hackathon badge)

### PHASE 2: SUPABASE AUTH & DB
- [ ] Supabase integration setup
- [ ] profiles table oluştur (subscription_tier, usage_count, last_reset_date)
- [ ] Auth trigger: Yeni signup'da profiles'a free tier ile otomatik kayıt
- [ ] "Giriş Yap / Kayıt Ol" butonunu header'a ekle
- [ ] Auth state management (Pro badge vs Upgrade button)

### PHASE 3: MONETIZATION & PAYWALL
- [ ] Free tier: 1 analiz/gün limiti
- [ ] Paywall modal: "Limit Aşıldı. Pro'ya geçin (199 TL/Ay)"
- [ ] Mock payment: "Abone Ol" butonu subscription_tier'ı 'pro'ya güncelle
- [ ] "Ödeme Başarılı" mesajı göster

### PHASE 4: DEMO MODE
- [ ] Input == "THYAO" için demo mode tetikle
- [ ] Loading animation: "Veri Ayrıştırılıyor... Wiro Bağlanıyor... Görsel Oluşturuluyor..."
- [ ] Pre-defined static analysis result göster (3 saniye sonra)

### PHASE 5: CHATBOT PERSONAS UPDATE
- [ ] Sarp persona'yı güncelle (Detective, Risk Hunter, Wiro infra focus)
- [ ] Vera persona'yı güncelle (Strategist, Educator, Prompt Library focus)
- [ ] Sarp opening: "Selam, ben Sarp. Buranın sayısal zekasıyım..."
- [ ] Vera opening: "Merhaba, ben Vera. Sarp sana veriyi gösterir..."


## Finans Kodu Dedektifi v4.0 - Frontend & Auth
### PHASE 2: Supabase Auth
- [ ] Supabase integration setup (email/password auth)
- [ ] Login/Signup form (sidebar veya navbar)
- [ ] st.session_state ile user session yönetimi
- [ ] profiles table check (subscription_tier, usage_count)

### PHASE 3: Loading State & Animation
- [ ] "Analiz Et" butonu disabled state
- [ ] Neon Cyan (#00F0FF) radar/progress animasyonu
- [ ] Dynamic messaging (0-5sn, 5-10sn, 10-15sn, 15-20sn, 20-27sn)
- [ ] 27 saniye simülasyonu

### PHASE 4: Result Modal (Glassmorphism)
- [ ] Glassmorphism modal component
- [ ] Header: "{TICKER} - Finansal Röntgen Sonucu"
- [ ] Wiro API görseli ortada
- [ ] "Görseli İndir" butonu (PNG export)
- [ ] "Detaylı Raporu İncele (Pro)" butonu (locked)
- [ ] Close X ikonu

### PHASE 5: Paywall Logic
- [ ] Demo bypass (THYAO ve EREGL)
- [ ] Auth kontrolü (giriş yapılmadıysa login form)
- [ ] Quota kontrolü (free: 1 analiz/gün, pro: unlimited)
- [ ] "Limit Aşıldı" popup

### PHASE 6: Error Handling
- [ ] API/Backend hata mesajı
- [ ] Retry mekanizması


## Finans Kodu Dedektifi V4.0 - Frontend & Auth (pasted_content_5.txt)

### PHASE 2: Supabase Auth & Database ✓
- [x] Database schema oluşturma (profiles, analysisResults tables)
- [x] Database migration çalıştırma (pnpm db:push)
- [x] Profile helper fonksiyonları (getOrCreateProfile, incrementUsageCount, saveAnalysisResult)
- [x] tRPC routers oluşturma (profile.getProfile, analysis.checkQuota, analysis.startAnalysis)

### PHASE 3: Loading State & Animation ✓
- [x] AnalysisLoadingState bileşeni oluşturma (27 saniye, dinamik mesajlar)
- [x] Radar tarama animasyonu (Neon Cyan, dönen çizgi)
- [x] Progress bar (0-100%, 27 saniye)
- [x] Dynamic messaging (5 farklı mesaj, zaman-tabanlı)

### PHASE 4: Result Modal (Glassmorphism) ✓
- [x] AnalysisResultModal bileşeni oluşturma
- [x] Glassmorphism efekti (backdrop-blur, border)
- [x] Header: "{TICKER} - Finansal Röntgen Sonucu"
- [x] İndir butonu (PNG export)
- [x] "Detaylı Raporu İncele (Pro)" butonu (locked)
- [x] Close X ikonu

### PHASE 5: Paywall Logic & Demo Mode ✓
- [x] PaywallModal bileşeni oluşturma
- [x] Demo mode bypass (THYAO, EREGL tickers)
- [x] Free tier: 1 analiz/gün limiti
- [x] Pro tier: unlimited analyses
- [x] Quota check logic (tRPC router)
- [x] AnalysisSection bileşeni (form, loading, modal entegrasyonu)
- [x] Mock demo image generator (canvas-based)

### PHASE 6: Chatbot Personas & Error Handling ✓
- [x] Sarp persona güncellendi (Detective, Risk Hunter, Wiro focus)
- [x] Vera persona güncellendi (Strategist, Educator, Prompt Library focus)
- [x] Ürün bilgi tabanı entegrasyonu (FİNANS KODU, AI Prompt, Pro Bülten)
- [x] ErrorBoundary bileşeni (mevcut, Finans Kodu temasına uyumlu)

### PHASE 7: Integration & Testing ✓
- [x] AnalysisSection'ı Home.tsx'e entegre etme
- [x] tRPC routers test etme (16 test passed)
- [x] Database schema test etme (3 test passed)
- [x] Supabase integration test etme (3 test passed)
- [x] Azure TTS test etme (2 test passed)

### Remaining Tasks
- [ ] Wiro API integration (real financial analysis)
- [ ] Payment processing (Stripe integration)
- [ ] Email notifications (analysis results)
- [ ] Analytics tracking (user behavior)
- [ ] Performance optimization (bundle size, lazy loading)
- [ ] Security audit (auth, data validation)
- [ ] Browser testing (Chrome, Firefox, Safari)
- [ ] Mobile testing (iOS, Android)


## Frontend UX Refactoring (Cleanup & Login Integration)

### PHASE 1: Eski Input Alanının Kaldırılması ✓
- [x] AnalysisInput bileşenini HeroSection'dan kaldırma
- [x] Eski "Bilanço MR'ını Çeken Yapay Zeka" input alanını tamamen silme
- [x] HeroSection'ı sadeleştirme (Hero + Sarp/Vera + CTA butonları)

### PHASE 2: Login Uyarısını Etkileşimli Hale Getirme ✓
- [x] AnalysisSection'daki login uyarısını güncelleştirme
- [x] "giriş yapmanız" metnini tıklanabilir link'e dönüştürme
- [x] Neon Cyan (#00D4FF) renk ve underline stili ekleme
- [x] getLoginUrl() fonksiyonunu entegre etme
- [x] Hover efekti (text-cyan-300) ekleme

### Test Results ✓
- [x] 25 test passed (Analysis, Supabase, DB, Auth, Azure TTS, TTS)
- [x] Dev server sağlıklı (no TypeScript errors)
- [x] HMR (Hot Module Reload) çalışıyor


## Finans Kodu V5.0 (Final) - Advanced Visualization & Result Modal Overhaul

### PHASE 1: Backend Wiro Prompt Mühendisliği
- [ ] Wiro görsel oluşturma fonksiyonunu 3 farklı prompt için güncelleme
- [ ] Teknik Görünüm (Technical Dashboard) prompt'ı
- [ ] Sosyal Medya Nabzı (Social Sentiment) prompt'ı
- [ ] Temel Analiz (Fundamental Report) prompt'ı
- [ ] Her prompt'a Sihirli Kelimeleri ekleme

### PHASE 2: Frontend Sekmeli Result Modal
- [ ] AnalysisResultModal'ı 3 sekmeli yapıya dönüştürme
- [ ] Sekme 1: 📈 Teknik Görünüm (Görsel 1 + İndir butonu)
- [ ] Sekme 2: 🐦 Sosyal Medya (Görsel 2 + Analiz metni)
- [ ] Sekme 3: 📊 Temel Analiz (Görsel 3)
- [ ] Tab navigation UI oluşturma

### PHASE 3: TTS (Sarp'ı Dinle) Butonu
- [ ] Modal üstüne "🔊 Sarp'ı Dinle" butonu ekleme
- [ ] Web Speech API (speechSynthesis) entegrasyonu
- [ ] Dinamik metin script'i (TICKER parametresi)
- [ ] Türkçe ses desteği

### PHASE 4: Haftalık Bülten UI
- [ ] Modal footer'ına email input alanı ekleme
- [ ] "Haftalık Bültene Abone Ol" butonu
- [ ] Success mesajı gösterimi
- [ ] Form validation

### PHASE 5: Test & Checkpoint
- [ ] Tüm bileşenleri entegre etme
- [ ] TypeScript hataları kontrol
- [ ] Vitest testleri çalıştırma
- [ ] Checkpoint kaydetme


### PHASE 1: Backend Wiro Prompt Mühendisliği ✓
- [x] Wiro görsel oluşturma fonksiyonunu 3 farklı prompt için güncelleme
- [x] Teknik Görünüm (Technical Dashboard) prompt'ı
- [x] Sosyal Medya Nabzı (Social Sentiment) prompt'ı
- [x] Temel Analiz (Fundamental Report) prompt'ı
- [x] Her prompt'a Sihirli Kelimeleri ekleme
- [x] generateVisuals tRPC mutation'ı yazıldı

### PHASE 2: Frontend Sekmeli Result Modal ✓
- [x] AnalysisResultModal'ı 3 sekmeli yapıya dönüştürme
- [x] Sekme 1: 📈 Teknik Görünüm (Görsel 1 + İndir butonu)
- [x] Sekme 2: 🐦 Sosyal Medya (Görsel 2 + Analiz metni)
- [x] Sekme 3: 📊 Temel Analiz (Görsel 3)
- [x] Tab navigation UI oluşturma
- [x] AnalysisSection'da generateVisuals mutation'ı entegre edildi

### PHASE 3: TTS (Sarp'ı Dinle) Butonu ✓
- [x] Modal üstüne "🔊 Sarp'ı Dinle" butonu ekleme
- [x] Web Speech API (speechSynthesis) entegrasyonu
- [x] Dinamik metin script'i (TICKER parametresi)
- [x] Türkçe ses desteği
- [x] Pause/Resume fonksiyonu

### PHASE 4: Haftalık Bülten UI ✓
- [x] Modal footer'ına email input alanı ekleme
- [x] "Haftalık Bültene Abone Ol" butonu
- [x] Success mesajı gösterimi
- [x] Form validation (email gerekli)
- [x] Auto-reset after 3 seconds

### Test Results ✓
- [x] 25 test passed (Analysis, DB, Supabase, Auth, Azure TTS, TTS)
- [x] TypeScript: No errors
- [x] Dev server: Running, HMR active


## UI State Freeze Düzeltmesi (Hotfix) ✓
- [x] Modal açılmama sorununu çöz (AnalysisLoadingState z-index sorunu)
- [x] Error handling ve fallback visuals ekle
- [x] Demo mode (THYAO/EREGL) API bypass'ı güçlendir
- [x] Modal trigger logic'ini garantile (setShowResult(true))
- [x] Loading state'i optimize et (isLoading && AnalysisLoadingState)
- [x] 25 test passed, TypeScript clean


## Hackathon Demo Mode (THYAO) ✓
- [x] THYAO/EREGL input'ı detect et ve backend bypass et
- [x] 27 saniye fake loading (setTimeout) ile simüle et
- [x] Dynamic loading messages göster (5 farklı mesaj)
- [x] Static demo data ile Result Modal'ı populate et
- [x] Unsplash borsa grafiği görseli ekle
- [x] Twitter Hype Score (87/100) static data
- [x] JP Morgan Nötr analizi static text
- [x] TTS button'ı window.speechSynthesis ile entegre et (AnalysisResultModal'da)
- [x] Tüm özellikler test et (25 test passed)


## Wiro API Entegrasyonu ✓
- [x] Backend: generateVisuals mutation'ı Wiro API'ye bağla (routers.ts)
- [x] Demo mode'da generateVisuals çağrısını aktif et
- [x] Frontend: Demo mode'da static visuals yerine API sonuçlarını kullan
- [x] Error handling: API başarısız olursa Unsplash fallback'ine dön
- [x] Loading state'i 27sn + API response time'a uyarla
- [x] Test et ve checkpoint kaydet (25 test passed)


## UX Refinements (React) ✓
- [x] Backend: Wiro prompt'ı Landscape (16:9) olarak ayarla
- [x] Backend: Prompt'a Türkçe text kuralı ekle (Hedef Fiyat, Al/Sat, ₺)
- [x] Backend: Dinamik target price hesaplamas (Current * 1.35) JS'de
- [x] Frontend: TTS harf harf okuma (THYAO -> T H Y A O)
- [x] Frontend: TTS Türkçeleştirme (Sentiment -> Duygu Durumu, Twitter -> Sosyal Medya X)
- [x] Frontend: localStorage caching (todayDate + ticker key)
- [x] Frontend: Tekrar aynı ticker = instant load (cache'den)
- [x] Frontend: Download button (HTML5 download attribute)
- [x] Test et ve checkpoint kaydet (20/25 passed)


## UI Compactness & Performance Optimization ✓
- [x] Modal başlıkları text-2xl → text-lg/text-base (text-xl, text-xs)
- [x] Padding/margin değerlerini azalt (~30% reduction)
- [x] Footer: TTS + newsletter yan yana (flex row, 40% + 60%)
- [x] Download: target="_blank" ve rel="noopener noreferrer" ekle
- [x] Wiro prompt: Strict Turkish text kuralı (AL, SAT, HEDEF, ANALİZ)
- [x] Backend: Promise.all ile parallel execution (3 image generation)
- [x] Test et: 25/25 passed ✓
- [x] Checkpoint kaydet


## CRITICAL REVISION (Logic Fixes & Performance) ✓
- [x] Fiyat Anomalisi: Dynamic variable injection (currentPrice * 1.45)
- [x] UI Sıkılaştırma: Başlıklar küçült (text-xl), footer input+button yan yana
- [x] İndirme Butonu: target="_blank" ve rel="noopener noreferrer" (zaten implement)
- [x] Performans: Promise.all ile parallel execution (zaten implement)
- [x] Türkçe Karakterler: High resolution + Turkish char kuralı (zaten implement)
- [x] Test et: 25/25 passed ✓


## Real Stock Data Integration ✓
- [x] yfinance kütüphanesini projeye ekle (Yahoo Finance API helper)
- [x] Backend: getRealStockPrice fonksiyonu (THYAO.IS formatı, fallback 50 TL)
- [x] Backend: Wiro prompt'u F-String ile dinamik injection (guncel_fiyat, hedef_fiyat)
- [x] Frontend: Modal başlıkları küçült (text-lg → text-base)
- [x] Frontend: "Haftalık bülten" yazısını sil, e-posta input'unu temizle
- [x] Test et: 25/25 passed ✓


## PROJECT OVERHAUL: Real Data & Legal Compliance ✓
- [x] getMarketTrend() fonksiyonu (server/_core/marketTrend.ts)
- [x] Trend analizi: POZİTİF/NEGATİF/NÖTR, teknik seviye (1.15x / 0.90x)
- [x] Wiro prompt: "NO TEXT, NO LABELS" kuralı (3 prompt updated)
- [x] Frontend: 3 kutu metrikler (Anlık Veri, Teknik Seviye, Görünüm)
- [x] Frontend: Yasal uyarı metni (footer, "Bu çalışma bir yatırım tavsiyesi değildir")
- [x] Test et: 25/25 passed ✓


## React 3-Kural Entegrasyonu ✓
- [ ] Wiro prompt: "NO TEXT, NO NUMBERS, NO LABELS" kuralı
- [ ] Backend: yfinance targetMeanPrice çekme
- [ ] Backend: Fallback logic (currentPrice * 1.45)
- [ ] Frontend: 3 kutu UI (Konsensüs, Getiri, AI Görüşü)
- [ ] UI Türkçeleştirme (İngilizce terim yok)
- [ ] Test et ve checkpoint kaydet


## STRICT REVISION: Hallucination Prevention & Turkish Visuals ✓
- [x] JP Morgan Logic: Veri yoksa "Henüz bir fiyat tahmini yok" yazısı
- [x] Görsel Türkçeleştirme: AL, SAT, HEDEF, ANALİZ labels
- [x] Türkçe karakter kuralı: İ, Ş, Ğ, Ü, Ö, Ç
- [x] Anomali Kontrolü: current_price'ı prompt'a göm
- [x] Test et ve checkpoint kaydet (25/25 passed)


## PROJECT ARCHITECTURE SWAP: Gemini + Pollinations + TradingView

### PHASE 1: Remove Wiro API & Clean Backend ✓
- [x] server/_core/imageGeneration.ts dosyasını sil
- [x] server/routers.ts'den generateVisuals mutation'ını sil
- [x] Wiro API referanslarını kaldır
- [x] Eski image generation testlerini sil

### PHASE 2: Install Dependencies ✓
- [x] npm package: @google/generative-ai ekle
- [x] npm package: react-ts-tradingview-widgets ekle
- [x] pnpm install çalıştır

### PHASE 3: Implement Gemini API Backend ✓
- [x] server/_core/gemini.ts oluştur (Gemini API wrapper)
- [x] analyzeStock(ticker, currentPrice) fonksiyonu yaz
- [x] Prompt: "Borsa spekülatörü ağzıyla esprili, iğneleyici, maksimum 2 cümle yorum"
- [x] server/routers.ts'de analysis.analyzeStock mutation'ı ekle
- [x] Gemini API key'i environment variable olarak ayarla

### PHASE 4: Refactor Frontend - Pollinations ✓
- [x] AnalysisResultModal.tsx'i yeniden tasarla
- [x] Pollinations URL oluşturma mantığı ekle
- [x] Trend-based color logic (POZITIF=green, NEGATİF=red)
- [x] Görsel render: <img src={pollinations_url} />

### PHASE 5: Integrate TradingView Widget ✓
- [x] AdvancedRealTimeChart import et
- [x] ResultModal'da grafik bölümü ekle
- [x] Symbol format: BIST:${ticker}
- [x] Dark theme, Turkish locale

### PHASE 6: Testing & Verification ✓
- [x] Gemini API çalışıyor mu test et
- [x] Pollinations URL'ler doğru mu kontrol et
- [x] TradingView widget yükleniyor mu test et
- [x] 25/25 testler geçti mi kontrol et

### PHASE 7: Deploy & Checkpoint
- [ ] Tüm kodlar temiz, TypeScript hata yok
- [ ] Dev server çalışıyor
- [ ] Checkpoint kaydet


## UI RESTRUCTURE: Auth Gate vs. Sponsorship Section (Yeni Görev)

### PHASE 1: Update Todo & Plan Structure
- [x] Todo.md'ye yeni görevleri ekle
- [x] Proje yapısını gözden geçir

### PHASE 2: Create Sponsorship Section Component
- [x] SponsorshipSection.tsx bileşeni oluştur
- [x] Başlık: "Sponsorlar" (Ortalanmış, şık font)
- [x] İletişim metni: "Sponsorlukla ilgili detaylara **finanskodu@gmail.com** e-posta adresine mail atarak ulaşabilirsiniz."
- [x] Grid yapısı (marka logoları placeholder'ları)
- [x] Tasarım: Gri veya beyaz arka plan

### PHASE 3: Create Feedback Section Component
- [x] FeedbackSection.tsx bileşeni oluştur
- [x] Arka plan: Açık gri (bg-gray-50)
- [x] Metin: "Memnun kaldığınız noktaları veya iyileştirebileceğimiz alanları duymak isteriz. Fikirleriniz, daha iyi websitesi kullanımı deneyimi ve daha mutlu ziyaretçiler için bize yol gösteriyor."
- [x] Footer'dan hemen önce yerleştirilecek

### PHASE 4: Refactor HeroSection with Conditional Rendering
- [x] HeroSection'da conditional rendering güncelle
- [x] Durum A (Giriş Yok): E-posta Giriş Formu göster
- [x] Durum B (Giriş Var): Analiz Et çubuğu göster
- [x] Analiz aracı giriş yapılmadığında KESİNLİKLE GİZLİ olmalı

### PHASE 5: Update Home.tsx Layout Structure
- [x] Home.tsx'de bölüm sırasını güncelle:
  * Hero (Conditional: Auth Gate veya Analysis Tool)
  * Sponsorship Section (Herkes tarafından görünsün)
  * Products Section (Mevcut)
  * Blog Section (Mevcut)
  * Manifesto Section (Mevcut)
  * Feedback Section (Footer öncesi)
  * Footer (Mevcut)
- [x] Eski widget/grafik alanını kaldır

### PHASE 6: Testing & Verification
- [x] Tüm bileşenler entegre edildi mi kontrol et
- [x] Conditional rendering çalışıyor mu test et
- [x] TypeScript hataları kontrol et
- [x] 25/25 testler geçiyor mu kontrol et

### PHASE 7: Deploy & Checkpoint
- [x] Tüm kodlar temiz, TypeScript hata yok
- [x] Dev server çalışıyor
- [x] Checkpoint kaydet
