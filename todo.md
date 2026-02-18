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
- [x] Checkpoint kaydetme


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
- [x] Checkpoint kaydet


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


## MAJOR REFACTOR: Layout Reordering, Logic Update & UI Fixes (pasted_content_3.txt)

### PHASE 1: LAYOUT & HEADER (App.js / Home.js)
- [ ] Update Header text:
  * Başlık: "Kaos İçinde Düzen: Finansal Operasyonlarınızı Dönüştürün"
  * Alt Başlık: "Verimliliğinizi artırmak için özenle hazırlanmış yapay zeka destekli dijital araç koleksiyonumuzu keşfedin. Kapsamlı metodolojilerden prompt kütüphanelerine kadar ihtiyacınız olan her şey burada."
- [ ] Reorder page sections (NEW FLOW):
  1. Header (Sarp & Vera Görselleri - Hero)
  2. Dijital Araçlar / Ürünler (Featured Section)
  3. "Kaos'tan Düzen'e" Bölümü
  4. Finansal Analizi Başlat (Auth-controlled Input)
  5. Manifesto
  6. Blog & Analizler (Remove symbol/icon visual, keep text/cards only)
  7. Özellikler Bölümü (Features Section)
  8. SSS (FAQ)
  9. Sponsorlar
  10. Footer (with Feedback area)

### PHASE 2: ANALYSIS MODAL FIX (UI Bug)
- [ ] Fix modal z-index issue (add z-index: 9999)
- [ ] Add margin-top: 100px or padding-top to modal
- [ ] Ensure modal opens cleanly below Navbar
- [ ] Test close button functionality

### PHASE 3: TRADINGVIEW CLEANUP & TECHNICAL LOGIC (Backend)
- [ ] Remove ALL TradingViewWidget components from Technical, Social, Fundamental tabs
- [ ] Implement Node.js analyze_technical function:
  * Use technicalindicators package for RSI, Volume, MA20/50 calculations
  * Implement negative signal logic (RSI divergence, Volume drop, Price < MA)
  * Return status: NEGATİF / POZİTİF / KARIŞIK with reasons
- [ ] Update frontend to show status card instead of chart

### PHASE 4: SOCIAL MEDIA ANALYSIS (AI Prompt Update)
- [ ] Update social media analysis system_prompt:
  * Require specific recent news/events (last 1 week)
  * Sector-specific keywords (aviation: tourism/oil, defense: orders/geopolitics)
  * Output format: Twitter Nabzı, Forum Tartışmaları
  * Ban generic statements

### PHASE 5: FUNDAMENTAL ANALYSIS (AI Prompt Update)
- [ ] Update fundamental analysis system_prompt:
  * Require Yahoo Finance or KAP data
  * Show actual F/K, PD/DD, Net Profit numbers (or "Veri çekilemedi")
  * Sector-specific metrics (industry: orders, aviation: occupancy, banks: interest margin)
  * Compare to sector average (cheap/expensive)

### PHASE 6: Testing & Verification
- [ ] Test new layout order
- [ ] Test modal UI fix
- [ ] Test technical analysis logic
- [ ] Test AI prompt updates
- [ ] Run all tests (25/25 passing)

### PHASE 7: Deploy & Checkpoint
- [ ] All code clean, TypeScript error-free
- [ ] Dev server running
- [ ] Checkpoint saved


## DATA INTEGRITY & LOGIC FIX (pasted_content_4.txt)

### ADIM 1: Real Data Fetching & Technical Calculation
- [x] Install yahoo-finance2 package
- [x] Install technicalindicators package
- [x] Create stockData.ts helper with getRealStockData function
- [x] Implement RSI calculation using technicalindicators
- [x] Implement MA50 calculation
- [x] Implement technical signal logic (NEGATİF/POZİTİF/NÖTR)
- [x] Fetch real F/K and PD/DD from Yahoo Finance

### ADIM 2: Cache Buster (AI Prompt Timestamp)
- [x] Add timestamp to Gemini prompt in gemini.ts
- [x] Add randomness/uniqueness to prevent cache hits

### ADIM 3: Dynamic UI (Remove Hardcoded Values)
- [x] Find and remove hardcoded F/K values in FinancialGrid
- [x] Find and remove hardcoded RSI values in Technical tab
- [x] Bind backend data to frontend components
- [x] Ensure all metrics display "N/A" when data unavailable


## CONTENT & UI REVISION: Header, Product Funnel, Blog Injection

### FAZ 1: HEADER / HERO METİNLERİ
- [x] Üst Başlık (Eyebrow): "// FİNANSAL VERİMLİLİK İÇİN"
- [x] Ana Başlık (H1): "Hazır Çözümler"
- [x] Alt Metin (Subtitle): "Saatler süren finansal işlemlerinizi dakikalara indiren, test edilmiş dijital ürünler"

### FAZ 2: ÜRÜN KARTLARI (YENİ HUNİ YAPISI)
- [x] Bölüm Alt Başlığı: "100+ hazır AI prompt, finansal metodoloji ve aylık strateji bülteni"
- [x] Tüm butonlardan "↗" (dışarı çıkış) ikonunu kaldır
- [x] KART 1 (En Başa): AI Prompt Kütüphanesi
  * Üst Rozet: "⚡ Hemen Kullan"
  * Yolculuk Etiketi: "BAŞLA" (bg-green-600 text-white text-lg px-4 py-1 rounded-full)
  * Buton: "Prompt'ları Keşfet"
- [x] KART 2 (Ortaya): FİNANS KODU (Kaos İçinde Düzen)
  * Üst Rozet: "🔥 Çok Satan"
  * Yolculuk Etiketi: "DEVAM ET" (bg-blue-600 text-white text-md px-3 py-1 rounded-full)
  * Buton: "Sistemi İncele"
- [x] KART 3 (Sona): PRO BÜLTEN
  * Üst Rozet: "📈 Aylık Sinyal"
  * Yolculuk Etiketi: "İLERLE" (bg-gray-600 text-white text-sm px-2 py-0.5 rounded-full)
  * Buton: "Bültene Katıl"

### FAZ 3: BLOG İÇERİK ENTEGRASYONU
- [x] Blog 1: "Finans Raporu Otomasyonu: Veri Girişinden Stratejik Liderliğe Geçiş"
  * SEO Başlığı, Meta Açıklaması, Anahtar Kelimeler ekle
  * Tarih: Bugünün tarihi
  * İçerik: pasted_content_5.txt
- [x] Blog 2: "Yeni Yılda Finançıların Kullanması Gereken 10 AI Aracı"
  * SEO Başlığı, Meta Açıklaması, Anahtar Kelimeler ekle
  * Tarih: Bugünün tarihi
  * İçerik: pasted_content_6.txt
- [x] Blog 3: "Excel'de AI Devrimi: Finançılar İçin Yapay Zeka Kullanma Rehberi"
  * SEO Başlığı, Meta Açıklaması, Anahtar Kelimeler ekle
  * Tarih: Bugünün tarihi
  * İçerik: pasted_content_7.txt


## MAJOR REFACTOR: UI, Navigation, SEO & Integrations

### FAZ 1: HEADER & MENÜ YAPISI
- [x] Flex yapısını değiştir: Menü Linklerini SOLA, Logoyu SAĞA
- [x] Menüye "Finansal Analiz" linki ekle
- [x] Link yönlendirmesi: `/analiz` rotasına git

### FAZ 2: ANASAYFA & ANALİZ SAYFASI
- [x] Anasayfadan "Finansal Analizi Başlat" bölümünü KALDIR
- [x] Yeni `/analiz` sayfası oluştur (AnalysisPage.js)
- [ ] "Finansal Analizi Başlat" bölümünü yeni sayfaya taşı
- [x] Hero bölümünü 3 sütunlu yapıya çevir:
  * Sol: "Bu Ay Rakamlar" (1200+ Analiz, 500+ Kullanıcı)
  * Orta: Sarp & Vera görseli + başlıklar
  * Sağ: Dönen Kullanıcı Yorumları (Testimonial)

### FAZ 3: BLOG & ASİSTAN DAVRANIŞI
- [ ] Blog kartlarını harici link yerine dahili routing'e çevir: `/blog/[slug]`
- [ ] Blog başlıklarını slugify et
- [x] Sarp & Vera asistan widget'ını varsayılan AÇIK (Expanded) yap

### FAZ 4: SEO & META TEMİZLİĞİ
- [x] Tüm sayfalardan `meta keywords` ve `meta title` etiketlerini SİL
- [x] Clarity script'ini index.html <head>'e ekle (vi6tuxtune)

### FAZ 5: DINAMIK SITEMAP OLUŞTURUCU
- [x] `generate-sitemap.js` script'i oluştur
- [x] Statik rotaları ekle (/, /hakkimizda, /analiz)
- [ ] Blog verilerini oku ve dinamik rotalar oluştur (/blog/[slug])
- [x] Sitemap'i public/sitemap.xml'e yaz
- [x] package.json build komutuna script ekle
- [ ] robots.txt'de sitemap URL'sini doğrula


## BLOG CONTENT FIX: Detailed Content Injection & SEO Optimization

### Issue 1: 3 Blog Posts from Attachments Not Properly Injected
- [ ] Blog 1: "Finans Raporu Otomasyonu" (pasted_content_5.txt) - 154 lines
- [ ] Blog 2: "Yeni Yılda 10 AI Aracı" (pasted_content_6.txt) - 170 lines
- [ ] Blog 3: "Excel'de AI Devrimi" (pasted_content_7.txt) - 134 lines

### Issue 2: Remaining 8 Blog Posts Show "Blog yazısı bulunamadı" Error
- [ ] Generate +2000 word SEO-optimized content for each blog:
  1. "Finansal Okuryazarlık Neden Önemli?"
  2. "Yatırım Stratejileri: Temel Analiz"
  3. "Teknik Analiz Göstergeleri Rehberi"
  4. "Portföy Yönetimi İpuçları"
  5. "Kripto Para ve Blockchain Temelleri"
  6. "Ekonomik Göstergeler ve Piyasa Etkisi"
  7. "Risk Yönetimi Stratejileri"
  8. "Finansal Bağımsızlık Yol Haritası"

### Implementation
- [ ] Update BlogSection.tsx with full content for all 11 blogs
- [ ] Update BlogDetailPage.tsx to handle all blog slugs
- [ ] Ensure SEO meta tags (title, description, keywords) for each blog
- [ ] Test all blog links to verify no "bulunamadı" errors


## FIX & REFACTOR: Sitemap Logic, Chat Personality, Blog Content

### FAZ 1: SITEMAP SCRIPT GÜNCELLEMESİ (Dinamik URL)
- [x] generate-sitemap.js scriptini blogContent.ts'den veri alacak şekilde güncelle
- [x] Blog verilerini import et ve her slug için dinamik URL oluştur
- [x] Sitemap.xml'e hem statik sayfalar hem de tüm blog yazıları eklensin

### FAZ 2: SARP & VERA KONUŞMALARI (Chat Widget)
- [x] Chat widget açıldığında Sarp ve Vera karşılama mesajları otomatik tetiklensin
- [x] useEffect ile isOpen true olduğunda konuşma akışı başlasın
- [x] Mesaj 1 (Sarp): "Hoş geldin! Ben Sarp, veri analitiği tarafındayım..."
- [x] Mesaj 2 (Vera): "Merhaba, ben de Vera. Sarp işin matematiğine bakar..."

### FAZ 3: BLOG İÇERİKLERİNİ DOLDURMA (Content Injection)
- [x] blogContent.ts'deki "İçerik güncelleniyor..." placeholder'larını kaldır
- [x] Öncelikli 3 makale: Tam metinleri eksiksiz işle (pasted_content_5/6/7.txt)
- [x] Diğer 8 makale: AI ile 300-500 kelimelik özgün ve doyurucu içerik oluştur
- [x] Tüm makaleler SEO uyumlu, başlık (H2/H3) ve madde işaretleri içersin


## REVISION: Sitemap Logic, Chat Sales Copy & Auto-TTS

### FAZ 1: DATA-DRIVEN SITEMAP (Dinamik URL Düzeltmesi)
- [x] generate-sitemap.js scriptini blogData.ts'den veri okuyacak şekilde güncelle
- [x] Script çalışırken blog verilerini OKUMALI (require/import)
- [x] Her blog slug'ı için https://finanskodu.com/blog/[slug] formatında URL üret
- [x] Dinamik blog listesini statik sayfalarla birleştir ve public/sitemap.xml'e kaydet
- [x] Script çalıştıktan sonra konsola "X adet blog yazısı sitemap'e eklendi" yaz

#### FAZ 2: SARP & VERA DİYALOGLAR (Satış & Soru Motive Edici)
- [x] ChatWidget.tsx'deki açılış konuşmalarını satış odaklı güncelle
- [x] MESAJ 1 (SARP): Dijital Araçlar koleksiyonunu tanıt, operasyonel yükten kurtulma vurgusu
- [x] MESAJ 2 (VERA): Pro Bülten'i tanıt, strateji ve piyasa öngörüleri vurgusu
- [x] Her iki mesaj da kullanıcıyı soru sormaya teşvik etsin

### FAZ 3: OTOMATİK SESLİLENDİRME (Auto-TTS Logic)
- [x] Chat widget ilk kez açıldığında (mount) TTS otomatik tetiklensin
- [x] speakMessage fonksiyonunu useEffect içinde çağır
- [x] Önce Sarp konuşsun, bitince Vera konuşsun (onEnd event veya timeout)
- [x] Browser autoplay policy engelini try-catch ile yönet (konsola uyarı yaz)

## FEATURE: Chat Widget Product CTA Buttons

### Chat Widget CTA Butonları
- [x] DualPersonaWidget.tsx'e 2 ürün CTA butonu ekle
- [x] "Dijital Araçları Keşfet" butonu → Ürün sayfasına yönlendir
- [x] "Pro Bülten'i İncele" butonu → Ürün sayfasına yönlendir
- [x] Butonlar görsel olarak dikkat çekici olmalı (gradient, icon)
- [x] Butonlar chat mesajlarının altında veya üstünde sabit konumda


## ENHANCEMENT: Smooth Scroll for CTA Buttons

### CTA Butonları Smooth Scroll
- [x] window.location.href yerine smooth scroll kullan
- [x] Widget kapandıktan sonra yumuşak geçiş animasyonu
- [x] #urunler bölümüne smooth scroll


## MAJOR BUG FIX: Sitemap, Assistant Logic, TTS

### FAZ 1: KESİN SITEMAP ÇÖZÜMÜ
- [x] generate-sitemap.js'i fs modülü ile doğrudan dosya okuyacak şekilde güncelle
- [x] Regex veya JSON parse ile slug/id değerlerini çek
- [x] Her slug için https://finanskodu.com/blog/[slug] linkini oluştur
- [x] Statik sayfalarla birleştir ve public/sitemap.xml'e yaz
- [x] Script sonunda "X adet blog yazısı eklendi: [Örnek URL]" logunu bas

### FAZ 2: CİHAZ BAZLI ASİSTAN SEÇİMİ
- [x] useEffect ile window.innerWidth kontrolü ekle
- [x] Desktop (>768px): Sadece SARP aktif, sadece Sarp mesajı ve sesi
- [x] Mobile (<=768px): Sadece VERA aktif, sadece Vera mesajı ve sesi
- [x] İki asistan aynı anda konuşmasın (çakışma önleme)
### FAZ 3: OTOMATİK SES (TTS) & AUTOPLAY FIX
- [x] Bileşen mount olduktan 1 saniye sonra TTS başlat
- [x] window.speechSynthesis.speak() fonksiyonunu try-catch bloğuna al
- [x] NotAllowedError durumunda konsola uyarı yaz
- [x] Fallback: Kullanıcı ilk tıklamada yarım kalan konuşmayı başlat


## CRITICAL FIX: TTS Autoplay Policy & Data-Driven Sitemap

### FAZ 1: SESLİLENDİRME & AUTOPLAY ÇÖZÜMÜ
- [x] Otomatik başlatma denemesi (sayfa yüklenğinde)
- [x] Tarayıcı engeli yönetimi: Ses çıkmıyorsa "Beklemede" durumu
- [x] Window'a tek seferlik click listener ekle
- [x] Kullanıcı herhangi bir yere tıkladığında kuyruktaki konuşmayı başlat
- [x] Görsel senkronizasyon: "Konuşuyor" animasyonu SADECE ses çalarken aktif
- [x] Türkçe ses seçimi (lang: 'tr-TR') doğrulaması

### FAZ 2: SITEMAP SCRIPTİ (Regex ile Veri Okuma)
- [x] generate-sitemap.js dosyasını tamamen sil ve yeniden yaz
- [x] Blog verisi dosyasını fs modülü ile düz metin (utf-8) olarak oku
- [x] Regex ile slug'ları yakala (/slug:\s*["']([^"']+)["']/g)
- [x] Her slug için https://finanskodu.com/blog/[slug] URL'i oluştur
- [x] Statik sayfalar (/, /analiz) + dinamik blog linklerini birleştir
- [x] public/sitemap.xml dosyasına yaz
- [x] Konsola "Sitemap oluşturuldu! Bulunan blog sayısı: X" yazdır


## SEO & BLOG GELİŞTİRME (5 Madde)

### Madde 1: SİTEMAP.XML OTOMASYONU (Build-Time Script)
- [ ] generate-sitemap.js scriptini package.json build komutuna entegre et
- [ ] "prebuild": "node generate-sitemap.js" ekle
- [ ] robots.txt'e "Sitemap: https://finanskodu.com/sitemap.xml" satırını ekle
- [ ] Build sonrası sitemap.xml'in public klasöründe olduğunu doğrula

### Madde 2: BLOG SAYFASI META & SEO (Helmet/Head Yönetimi)
- [ ] react-helmet-async kütüphanesini kur
- [ ] Her blog yazısı için dinamik <head> yönetimi ekle
- [ ] Title: "[Yazı Başlığı] - Finans Kodu"
- [ ] Meta Description: Yazının ilk 160 karakteri veya özet alanı
- [ ] Canonical URL: https://finanskodu.com/blog/[slug]
- [ ] Open Graph (OG) Tags: og:image, og:title, og:description
- [ ] Structured Data: Schema.org Article JSON-LD yapısı
- [ ] "index, follow" meta tag ekle (noindex kaldır)

### Madde 3: BLOG LİSTELEME SAYFASI (/blog)
- [ ] /blog rotası oluştur
- [ ] Tüm yazıları grid yapısında listele
- [ ] Her kartta: Kapak resmi, Başlık, Kısa Özet, Tarih, "Devamını Oku" butonu
- [ ] (Opsiyonel) Sayfalama (Pagination) ekle

### Madde 4: ANA SAYFA GÜNCELLEMESİ
- [ ] Anasayfaya "Son Blog Yazıları" bloğu ekle (Sarp/Vera bölümünün altına)
- [ ] Tarihe göre en yeni 3 yazıyı listele
- [ ] Son 7 gün içinde eklenenlere "YENİ" rozeti ekle
- [ ] "Tümünü Gör" butonu ile /blog sayfasına yönlendir

### Madde 5: NAVİGASYON VE FOOTER
- [ ] Header (Menü) alanına "Blog" linkini ekle
- [ ] Footer alanına "Blog" linkini ekle
- [ ] (Opsiyonel) Footer'a blog kategorilerini listele


## SEO & BLOG GELİŞTİRME (5 Madde) ✅

### Madde 1: SITEMAP.XML OTOMASYONU
- [x] Build-time script (generate-sitemap.js) yaz
- [x] Blog verilerini tara ve slug'ları al
- [x] https://finanskodu.com/blog/[slug] formatında URL'ler oluştur
- [x] public/sitemap.xml'e kaydet
- [x] package.json build komutuna entegre et
- [x] robots.txt'e "Sitemap: https://finanskodu.com/sitemap.xml" ekle

### Madde 2: BLOG SAYFASI META & SEO
- [x] react-helmet-async kur ve HelmetProvider ekle
- [x] Her blog yazısı için dinamik <head> yönetimi
- [x] Title: "[Yazı Başlığı] - Finans Kodu"
- [x] Meta Description: İlk 160 karakter veya özet
- [x] Canonical URL: https://finanskodu.com/blog/[slug]
- [x] Open Graph (OG) Tags: og:image, og:title, og:description
- [x] Structured Data: Schema.org Article JSON-LD
- [x] "index, follow" meta tag (noindex kaldır)

### Madde 3: BLOG LİSTELEME SAYFASI (/blog)
- [x] /blog rotası oluştur
- [x] Tüm yazıları grid (3 sütun) yapısında listele
- [x] Her kartta: Kapak resmi, Başlık, Kısa Özet, Tarih, "Devamını Oku" butonu
- [x] SEO meta tags ekle
- [x] Hover animasyonları ve geçişler

### Madde 4: ANA SAYFA GÜNCELLEMESİ
- [x] Anasayfada "Son Blog Yazıları" bloğu ekle
- [x] Tarihe göre en yeni 3 yazıyı çek
- [x] Son 7 gün içinde eklenenlere "YENİ" rozeti ekle
- [x] "Tümünü Gör" butonu ile /blog sayfasına yönlendir

### Madde 5: NAVİGASYON VE FOOTER
- [x] Header (Menü) ve Footer alanlarına "Blog" linkini ekle
- [x] Navigation: /blog route'a güncellendi
- [x] Footer: /blog route'a güncellendi


## BLOG CATEGORY FILTERING

### Category Filtering Feature
- [x] Extract all unique categories from blog posts
- [x] Add category filter buttons above blog grid
- [x] Implement "Tümü" (All) button to reset filter
- [x] Add active category highlight (border + background)
- [x] Filter blog posts by selected category
- [x] Show post count for each category
- [x] Smooth transition animation when filtering


## CRITICAL FIX: Dynamic Routing & Recursive Sitemap

### FAZ 1: REACT ROUTING & DETAIL PAGE
- [x] Add /blog/:slug route to App.tsx
- [x] Ensure BlogDetailPage uses useParams to get slug from URL
- [x] Verify blog list links use /blog/${post.slug} format
- [x] Test navigation from blog list to detail page

### FAZ 2: DERİNLEMESİNE SITEMAP
- [x] Update generate-sitemap.js to read blog data file with fs.readFileSync
- [x] Use regex to extract all slugs from blog data file
- [x] Generate URLs for all blog posts (https://finanskodu.com/blog/[slug])
- [x] Include both static pages and dynamic blog URLs in sitemap.xml
- [x] Test sitemap generation script


## FINAL REVISION: Audio, Routing, UI, Sitemap

### FAZ 1: SESLENDİRME (Audio Autoplay & Device Detection)
- [ ] Cihaz tespiti: Desktop -> Sarp, Mobile -> Vera
- [ ] Autoplay çözümü: Sayfa yüklendiğinde sesi çalmayı dene
- [ ] Autoplay blocked ise global click listener ekle
- [ ] Kullanıcı ilk tıklamada asistan konuşmaya başlasın
- [ ] Listener'ı kaldır (tek seferlik)

### FAZ 2: BLOG ROUTING & 404 HATASI
- [ ] App.tsx'de /blog/:slug rotasının tanımlı olduğunu doğrula
- [ ] BlogDetailPage'de useParams ile slug'ı al
- [ ] blogData'dan ilgili içeriği bulup ekrana bas
- [ ] Blog kartlarındaki Link to="/blog/slug" formatını doğrula

### FAZ 3: UI TEMİZLİĞİ & GÖRSEL GÜNCELLEME
- [ ] Anasayfadaki mükerrer "Son Blog Yazıları" bölümünü SİL
- [ ] Sadece ana Slider/Grid yapısındaki blog alanı kalsın
- [ ] Ürün görselleri: 3 yeni görseli (pasted_file_*) ürün kartlarına ata

### FAZ 4: TAM KAPSAMLI SITEMAP SCRIPTİ
- [ ] generate-sitemap.js'i regex ile dosya okuma mantığıyla yeniden yaz
- [ ] src/data/blogData.ts'yi fs ile metin olarak oku
- [ ] Regex ile tüm slug'ları çek
- [ ] Statik + dinamik sayfaları içeren XML oluştur
- [ ] public/sitemap.xml'e kaydet
- [ ] Konsola "X adet blog yazısı eklendi" yazdır


## FINAL REVISION: Audio, Routing, UI & Sitemap (COMPLETED)

### FAZ 1: SESLENDİRME (Audio Autoplay Policy & Device Detection)
- [x] Cihaz tespiti: Masaüstü -> Sadece SARP, Mobil -> Sadece VERA
- [x] Autoplay çözümü: Session Interaction mantığı ekle
- [x] Sayfa yüklenğinde sesi çalmayı dene (play())
- [x] Hata verirse global window.addEventListener('click', ...) oluştur
- [x] Kullanıcı ilk tıklamada asistan konuşmaya başlasın ve listener'ı kaldır

### FAZ 2: BLOG ROUTING & 404 HATASI
- [x] App.tsx'de /blog/:slug rotasını tanımla
- [x] BlogDetailPage'de useParams hook'unu kullanarak slug'ı al
- [x] blogData dosyasından ilgili içeriği bulup ekrana bas
- [x] Blog kartlarındaki Link to="..." yapısını /blog/yazi-slug-degeri formatında yap

### FAZ 3: UI TEMİZLİĞİ & GÖRSEL GÜNCELLEME
- [x] Anasayfadaki mükerrer "Son Blog Yazıları" bölümünü SIL
- [x] Sadece ana Slider/Grid yapısındaki blog alanı kalsın
- [x] Ürün görsellerini güncelle: 3 yeni görseli ürün kartlarına ata (S3 CDN)

### FAZ 4: TAM KAPSAMLI SITEMAP SCRIPTİ
- [x] generate-sitemap.js'i Regex ile Dosya Okuma mantığıyla yeniden yaz
- [x] src/data/blogData.ts dosyasını fs modülü ile metin olarak oku
- [x] Dosyadaki tüm slug'ları Regex ile çek
- [x] Statik sayfalar (/, /analiz, /blog) + Dinamik sayfalar (https://finanskodu.com/blog/[slug])
- [x] Geçerli bir XML oluştur ve public/sitemap.xml'e kaydet
- [x] Script çalıştığında konsola "X adet blog yazısı eklendi" yazdır


## GOOGLE ANALYTICS 4 ENTEGRASYONU

### Phase 1: GA4 Script & Environment Setup
- [x] VITE_GA4_MEASUREMENT_ID environment variable ekle
- [x] client/index.html'e GA4 gtag script ekle
- [x] Environment variable ile dynamic measurement ID yapılandırması

### Phase 2: Core Tracking Infrastructure
- [x] client/src/lib/analytics.ts utility dosyası oluştur
- [x] pageview tracking fonksiyonu
- [x] event tracking fonksiyonu
- [x] TypeScript type definitions

### Phase 3: Automatic Pageview Tracking
- [x] React Router ile route değişimlerini izle
- [x] useEffect ile otomatik pageview tracking
- [x] App.tsx veya main.tsx'e entegre et

### Phase 4: Custom Event Tracking
- [x] CTA buton tıklamaları (Hero, Products, Chat Widget)
- [x] Blog okuma event'leri (BlogDetailPage)
- [x] Chat widget açma/kapama
- [ ] TTS kullanım istatistikleri (opsiyonel - gelecek iterasyon)
- [x] Kategori filtreleme kul### Phase 5: Testing & Documentation
- [x] Browser console'da GA4 event'lerini doğrula
- [x] Test senaryoları çalıştır
- [x] Checkpoint kaydet
- [x] Kullanıcıya dokümantasyon sun
- [x] Checkpoint kaydet


## CRITICAL HOTFIX: BLOG LİNKLERİ CRASH & YENİ SEKME DAVRANIŞI

### Faz 1: Sorun Analizi
- [x] BlogSection, BlogListPage ve BlogDetailPage komponentlerini incele
- [x] Blog linklerinin mevcut yapısını ve route tanımlarını kontrol et
- [x] Crash hatasının kaynağını tespit et (veri eşleşmesi, undefined erişim)

### Faz 2: Blog Linklerini Yeni Sekmede Açılacak Şekilde Güncelle
- [x] BlogSection.tsx içindeki blog linklerine target="_blank" rel="noopener noreferrer" ekle
- [x] BlogListPage.tsx içindeki blog linklerine target="_blank" rel="noopener noreferrer" ekle
- [x] Link URL formatının /blog/[slug] şeklinde doğru olduğunu doğrula

### Faz 3: BlogDetailPage Crash Fix
- [x] useParams ile gelen slug değerini güvenli şekilde kontrol et
- [x] Blog verisi bulunamazsa "Yazı bulunamadı" fallback UI göster
- [x] Optional chaining (blog?.title) kullanarak undefined erişim hatalarını önle
- [x] Loading state ekle
- [x] Türkçe tarih formatını ("13 Şubat 2026") ISO 8601'e güvenli parse et

### Faz 4: Routing Kontrolü & Test
- [x] App.tsx içinde /blog/:slug route tanımını kontrol et
- [x] BlogDetailPage'in bağımsız URL olarak çalıştığını test et
- [x] Browser'da blog linklerine tıklayarak yeni sekme davranışını doğrula
- [x] Crash senaryolarını test et (geçersiz slug, veri yok)

### Faz 5: Checkpoint & Dokümantasyon
- [x] Tüm değişiklikleri test et
- [x] Checkpoint kaydet
- [x] Kullanıcıya hotfix raporu sun


## SEO TEKNİK OPTİMİZASYON (4 FAZ)

### Faz 1: Navigasyon Linkleri (Report Issue #5)
- [x] Navigation.tsx komponentini incele
- [x] Header/menüdeki button elementlerini tespit et
- [x] Sayfa içi yönlendirme yapan butonları <a> etiketine çevir
- [x] "Ana Sayfa", "Blog", "Hakkımızda", "Analiz" linklerinin <a> etiketi olduğunu doğrula
- [x] Görsel stilleri (CSS class'ları) koru

### Faz 2: Canonical Çakışması ve Meta Taglar (Report Issue #2 & #3)
- [x] index.html'deki statik canonical etiketini kontrol et ve sil
- [x] App.tsx veya Layout'ta React Helmet yapısını incele
- [x] BlogDetailPage'de dinamik canonical URL ekle (zaten mevcut)
- [x] Anasayfa için varsayılan canonical'ı (https://finanskodu.com) doğrula
- [x] Her sayfanın kendi meta description'ını basmasını sağla

### Faz 3: Schema Markup (Yapısal Veri) (Report Issue #4)
- [x] BlogDetailPage.tsx'e Article şeması ekle (zaten mevcut)
- [x] JSON-LD yapısını blog verileriyle doldur (zaten mevcut)
- [x] Schema'yı Helmet içinde script olarak yerleştir (zaten mevcut)
- [x] headline, image, datePublished, author alanlarını doldur (zaten mevcut)

### Faz 4: Widget Performansı (Report Issue #6)
- [x] DualPersonaWidget komponentini incele
- [x] Widget yüklenme sini lazy load yap (setTimeout 3 saniye)
- [x] useEffect içinde gecikme mekanizması ekle
- [x] Widget başlangıçta kapalı olacak şekilde ayarla (isOpen = false)
- [ ] LCP (Largest Contentful Paint) iyileştirmesini test et

### Faz 5: Test ve Checkpoint
- [x] Tüm değişiklikleri browser'da test et
- [x] Navigasyon linklerinin <a> etiketi olduğunu doğrula
- [x] Canonical URL'in doğru ayarlandığını doğrula
- [x] Widget lazy load'ın çalıştığını doğrula
- [x] Checkpoint kaydet
- [x] Kullanıcıya rapor sun


## FİNANS KODU 2.0 - KAPSAMLI REBRANDİNG

### Faz 1: Güven ve Temizlik (Clean Up)
- [x] SalaryInsights logosunu S3'e yükle
- [x] SponsorshipSection: 8 boş kutuyu kaldır, tek SalaryInsights logosu + açıklama metni ekle
- [x] Header/Hero'dan Sarp & Vera görsel avatarlarını kaldır (sadece Chat Widget'ta kalsın)
- [x] Email adresleri info@finanskodu.com olarak güncellendi (SponsorshipSection)

### Faz 2: Yeni Renk ve Tipografi Sistemi (Design Tokens)
- [x] Zemin renkleri: #050810 (en koyu), #0D1117 (kartlar), #141B24 (hover)
- [x] Action (butonlar): #0EA5E9 (Electric Blue)
- [x] Pozitif: #10B981 (Finans Yeşili)
- [x] Negatif: #EF4444 (Kırmızı)
- [x] Premium: #D4A853 (Altın)
- [x] Cyan rengini azalt, sadece marka vurgularında kullan
- [x] index.css'deki CSS değişkenlerini güncelle
- [x] IBM Plex Sans + IBM Plex Mono fontları eklendi

### Faz 3: Yeni Hero ve Layout (Structure)
- [x] Üstündeki yatay menüyü kaldır, sol tarafta sabit dikey Sidebar Menü tasarla
- [x] Hero başlık: "Kaos Senin İşin Değil. Karar Senin, Gürültüyü Biz Filtreleriz."
- [x] Hero alt başlık güncelle
- [x] Hero'dan StatsColumn ve TestimonialsColumn kaldırıldı (temiz, tek sütun)
- [x] Kaos vs Düzen bölümünü iki sütuna ayır (Kırmızı kaos / Yeşil çözüm)
- [x] Hover efektleri: sol titresin (x:-4), sağ parlasın (scale:1.01)

### Faz 4: Kod Odası (Community Feature)
- [x] /kod-odasi route'u ekle (App.tsx)
- [x] KodOdasi.tsx sayfasını oluştur (kod-odasi.jsx referansıyla)
- [x] Manus Auth entegrasyonu (giriş yapanlar yazabilir, yapmayanlar okuyabilir)
- [x] Giriş yapmayanlar okuyabilir, giriş yapanlar yazabilir
- [x] Ticker band, kategori filtreleme, post paylaşma, reaction sistemi
- [x] Sidebar'a Kod Odası linkini ekle

### Faz 5: Görsel Dil (Aesthetic)
- [x] Blog, Ürün ve Manifesto kartlarını standart Card Component yapısına getir
- [x] Tüm kartlar: #0D1117 zemin, #1E2D3D border, hover:translate-y-[-2px]
- [x] Blog kartları: font-mono etiketler, #0EA5E9 vurgu rengi
- [x] Ürün kartları: journey badge + icon + CTA standartlaştırıldı

### Test ve Checkpoint
- [x] Tüm değişiklikleri browser'da test et
- [x] Checkpoint kaydet
- [x] Kullanıcıya rapor sun


## HOTFIX: ENV VARIABLES & BROKEN LINKS

#### 1. Supabase Bağlantısı Güncelleme
- [x] Mevcut Supabase environment variables'ı kontrol et
- [x] VITE_SUPABASE_URL güncelle (webdev_request_secrets ile)
- [x] VITE_SUPABASE_ANON_KEY güncelle (webdev_request_secrets ile)
- [x] Environment variables Manus sistemi tarafından otomatik inject ediliyor

### 2. Forum → Kod Odası Link Düzeltmesi
- [x] "Foruma Git" butonunu/linkini bul (HeroSection.tsx)
- [x] Metni "Kod Odası'na Git" olarak değiştir
- [x] Linki /kod-odasi rotasına yönlendir
- [x] openForum fonksiyonunu openKodOdasi olarak güncelle

### 3. SalaryInsights Sponsor Link Düzeltmesi
- [x] SponsorshipSection'daki SalaryInsights link'ini bul
- [x] Link URL'ini https://salaryinsights.com.tr/ olarak güncelle (2 yerde)
- [x] target="_blank" özelliği zaten mevcut

### Test ve Checkpoint
- [x] Tüm değişiklikleri browser'da test et
- [x] "Kod Odası'na Git" butonunun /kod-odasi'na yönlendirdiğini doğrula
- [x] SalaryInsights link'inin https://salaryinsights.com.tr/ olduğunu doğrula
- [ ] Checkpoint kaydet
- [ ] Kullanıcıya rapor sun
