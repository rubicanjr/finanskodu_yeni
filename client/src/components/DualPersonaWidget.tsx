/**
 * DualPersonaWidget.tsx
 * Device-Based Persona Switch: Sarp (Desktop) & Vera (Mobile)
 * 
 * SARP (Desktop): Quantitative Analyst, Analytical, Skeptical, Data-Driven
 * VERA (Mobile): Macro Strategist, Visionary, Strategic, Calming
 * 
 * UNIVERSAL KNOWLEDGE BASE:
 * - Commodities: Gold, Silver, Palladium, Platinum, Brent Oil, Natural Gas
 * - Crypto: Bitcoin, Ethereum, Altcoins, DeFi, Tokenomics, Stablecoins
 * - Traditional Markets: BIST 100/30, US Indices (Nasdaq, S&P 500), ETFs
 * - Banking & Funds: TEFAS Funds, BES funds, Deposit Interest rates
 * - Advanced Metrics: Volatility (VIX), Correlation, Sharpe Ratio, Beta, RSI, MACD
 * - Macro Data: Fed, TCMB, Inflation (CPI/PPI), Unemployment
 * 
 * SPK/BDDK COMPLIANCE:
 * - Never provide direct "Buy/Sell/Hold" advice
 * - Use "Scenario Analysis" and "Educational Context"
 * - Append disclaimer to every response
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mic, MicOff, Volume2, VolumeX, Send } from "lucide-react";

// ============ PERSONA DEFINITIONS ============
interface Persona {
  name: string;
  title: string;
  archetype: string;
  motto: string;
  avatarUrl: string;
  accentColor: string;
  voiceSettings: {
    searchTerms: string[];
    pitch: number;
    rate: number;
    useNativeDefault: boolean;
  };
  personality: {
    tone: string;
    focus: string[];
    style: string;
  };
}

const SARP: Persona = {
  name: "Sarp",
  title: "Finansal Asistan Sarp",
  archetype: "Quantitative Analyst (Quant) - The Brake",
  motto: "Matematik yalan söylemez, insanlar söyler.",
  avatarUrl: "/images/metaperson_mix_2.gif",
  accentColor: "#00D4FF", // Cyan
  voiceSettings: {
    searchTerms: ["male", "erkek", "cem", "alper", "murat", "google"],
    pitch: 0.9,
    rate: 0.92,
    useNativeDefault: false,
  },
  personality: {
    tone: "Analytical, Skeptical, Data-Driven, Cold, Realistic. Anti-FOMO.",
    focus: ["Technical Analysis", "Risk Calculation", "Anomalies", "Math Models", "Volatility", "Arbitrage"],
    style: "Short, concise, technical. Uses terms like volatility, arbitrage, anomali, makas. No emotional fluff.",
  },
};

const VERA: Persona = {
  name: "Vera",
  title: "Finansal Asistan Vera",
  archetype: "Macro Strategist & Behavioral Psychologist - The Steering Wheel",
  motto: "Fiyatı piyasa belirler, değeri sen belirlersin.",
  avatarUrl: "/images/vera-avatar.png",
  accentColor: "#A855F7", // Purple
  voiceSettings: {
    searchTerms: [], // Use native default
    pitch: 1.0,
    rate: 0.95,
    useNativeDefault: true,
  },
  personality: {
    tone: "Visionary, Strategic, Calming, Educational, Sophisticated.",
    focus: ["Fundamental Analysis", "Macro Trends", "Psychology", "Financial Well-being", "Central Bank Policies"],
    style: "Fluent, empathetic, storytelling style. Explains complex events simply. Connects the dots.",
  },
};

// ============ UNIVERSAL KNOWLEDGE BASE ============
const getResponse = (input: string, persona: Persona): string => {
  const lowerInput = input.toLowerCase();
  
  // ============ SARP RESPONSES (Technical, Data-Driven, Quant) ============
  const sarpResponses: Record<string, string> = {
    // COMMODITIES
    altın: "Ons altın 2000$ direncini 3. kez deniyor. Oynaklık endeksi düşük. Risk/Ödül oranı şu an alım için 1:3 seviyesinde rasyonel durmuyor. Altın, reel faiz oranlarıyla negatif korelasyon gösteriyor. Reel faizler negatifken altın pozitif getiri sağlar, ancak dolar endeksi güçlenirse ters korelasyon devreye girer.",
    gümüş: "Gümüş, altına göre daha yüksek beta değerine sahip. Endüstriyel talep faktörü volatiliteyi artırıyor. Altın/Gümüş oranı tarihsel ortalamanın üzerindeyse gümüş relatif ucuz demektir. Teknik olarak, 50 günlük hareketli ortalama kritik destek.",
    paladyum: "Paladyum, otomotiv sektörü talebiyle hareket ediyor. Elektrikli araç penetrasyonu arttıkça uzun vadeli talep riski var. Arz tarafında Rusya konsantrasyonu jeopolitik risk yaratıyor. Volatilite yüksek, pozisyon boyutunu küçük tutun.",
    platin: "Platin, paladyuma göre iskontolu işlem görüyor. Hidrojen ekonomisi senaryosunda talep artışı bekleniyor ancak bu uzun vadeli bir tez. Kısa vadede momentum zayıf, RSI nötr bölgede.",
    petrol: "Brent petrol OPEC+ kararlarına hassas. Teknik olarak, 70-80$ bandı konsolidasyon bölgesi. Stok verileri ve Çin talebi kritik değişkenler. Contango/backwardation yapısı pozisyon maliyetini etkiliyor.",
    doğalgaz: "Doğalgaz mevsimsellik gösteriyor. Kış aylarında talep artışı fiyatları yukarı iter. Depolama seviyeleri ve hava durumu tahminleri kısa vadeli fiyat belirleyicileri. Volatilite çok yüksek, spekülatif bir enstrüman.",
    
    // CRYPTO
    kripto: "Kripto varlıklar yüksek volatilite gösteriyor. Bitcoin'in 200 günlük hareketli ortalaması kritik destek seviyesi. Risk/ödül oranını hesaplamadan pozisyon açmak istatistiksel olarak kayıp getirir. Sharpe oranı negatife dönmeden portföy ağırlığını %5'in altında tutmanızı öneririm.",
    bitcoin: "Momentum zayıfladı. 200 haftalık ortalamanın altına sarktık. RSI aşırı satımda ama hacim dönüşü onaylamıyor. Stop-loss seviyenize sadık kalın. Bitcoin, direnç seviyesini test ediyor. Hacim desteklerse teknik göstergeler trend devamı işaret ediyor, ancak volatilite yüksek.",
    ethereum: "ETH/BTC oranı kritik. Ethereum, stake getirisi sunuyor ancak bu getiri enflasyonla eritilebilir. Gas fee'leri ve Layer 2 adoption metrikleri izlenmeli. Teknik olarak, merge sonrası arz dinamikleri değişti.",
    altcoin: "Altcoinler Bitcoin'e göre daha yüksek beta taşıyor. Bull market'ta outperform ederler, bear market'ta daha sert düşerler. Likidite riski yüksek, spread'ler geniş. Temel analiz yapmadan altcoin almak kumar.",
    defi: "DeFi protokollerinde TVL (Total Value Locked) kritik metrik. Smart contract riski, impermanent loss ve oracle manipülasyonu riskleri var. APY'ler sürdürülebilir mi analiz edilmeli. Yüksek getiri = yüksek risk.",
    stablecoin: "Stablecoin'ler de risksiz değil. Algoritmik stablecoin'ler çökebilir (Terra/Luna örneği). Fiat-backed olanlar için rezerv şeffaflığı kritik. USDT, USDC, DAI farklı risk profillerine sahip.",
    
    // TRADITIONAL MARKETS
    borsa: "BIST-100 endeksi P/E oranı tarihsel ortalamanın üzerinde. Volatilite endeksi (VIX muadili) yükseliş trendinde. Risk primi hesaplaması yapılmadan hisse senedi almak, kumar oynamakla eşdeğer. Sektörel rotasyon sinyalleri izlenmeli.",
    hisse: "Hisse senedi seçiminde temel ve teknik analiz birlikte kullanılmalı. P/E, P/B, ROE, borç/özkaynak oranları temel metrikler. Teknik olarak, destek/direnç seviyeleri ve hacim analizi kritik.",
    nasdaq: "Nasdaq, teknoloji ağırlıklı. Faiz oranlarına hassas çünkü growth stock'lar yüksek faizde iskonto edilir. VIX yükseldiğinde Nasdaq daha sert düşer. Dolar bazlı yatırım, kur riski taşır.",
    sp500: "S&P 500, ABD ekonomisinin barometresi. Diversifiye bir endeks ama sektör ağırlıkları dengesiz. Teknoloji dominansı risk yaratıyor. Pasif yatırım için uygun ancak timing riski var.",
    etf: "ETF'ler düşük maliyetli diversifikasyon sağlar. Expense ratio kritik. Tracking error'a dikkat. Sentetik vs fiziksel replikasyon farkını anlayın. Likidite ve spread'ler önemli.",
    
    // BANKING & FUNDS
    fon: "Yatırım fonlarının expense ratio'su getiriyi eritiyor. Pasif endeks fonları, aktif yönetilen fonların %80'inden daha iyi performans gösteriyor. Veri bu kadar net. TEFAS üzerinden karşılaştırma yapın.",
    bes: "BES, devlet katkısı avantajı sunuyor (%30). Ancak fon yönetim ücretleri getiriyi eritebilir. Emeklilik yaşına kadar çıkış cezası var. Uzun vadeli düşünün, fon seçiminde expense ratio'ya dikkat.",
    mevduat: "Mevduat faizi, enflasyonun altındaysa reel getiri negatif. Kur korumalı mevduat (KKM) farklı risk profili taşıyor. Vade ve faiz oranı trade-off'unu anlayın. TMSF güvencesi 150.000 TL ile sınırlı.",
    
    // FOREX
    dolar: "USD/TRY teknik analizi: Üst bant direnci test ediliyor. Carry trade pozisyonları riskli. Faiz diferansiyeli daralırsa TL üzerinde baskı artabilir. Hedge stratejisi olmadan döviz pozisyonu taşımak mantıksız.",
    euro: "EUR/TRY, EUR/USD paritesine de bağlı. Çift kur riski var. ECB ve TCMB politikaları belirleyici. Teknik olarak, trend kanalı içinde hareket ediyor.",
    
    // MACRO DATA
    enflasyon: "Enflasyon verileri beklentilerin üzerinde. Reel getiri negatif. Enflasyona endeksli tahviller (TIPS muadili) veya emtia sepeti, matematiksel olarak daha iyi koruma sağlar. TÜFE ve ÜFE farkı izlenmeli.",
    faiz: "Merkez bankası faiz kararı piyasa fiyatlamasının dışında kalırsa volatilite spike'ı beklenir. Faiz futures'ları incelendiğinde piyasa beklentisi okunabilir. Beklentiden sapma durumunda pozisyon yönetimi kritik.",
    fed: "Fed kararları global piyasaları etkiliyor. Dot plot ve FOMC tutanakları forward guidance veriyor. Fed funds rate ile 10 yıllık tahvil getirisi arasındaki spread resesyon sinyali olabilir.",
    tcmb: "TCMB politika faizi ve forward guidance kritik. Enflasyon hedeflemesi rejimi altında, reel faiz pozitif olmalı. Rezerv yeterliliği ve swap anlaşmaları da izlenmeli.",
    
    // ADVANCED METRICS
    volatilite: "Volatilite, riskin ölçüsüdür. VIX 20'nin üzerindeyse piyasa stresli. Implied volatility vs realized volatility farkı opsiyon stratejileri için kritik. Volatilite clustering özelliği gösterir.",
    rsi: "RSI 70 üzeri aşırı alım, 30 altı aşırı satım. Ancak trend piyasalarında RSI uzun süre aşırı bölgelerde kalabilir. Diverjans sinyalleri daha güvenilir.",
    macd: "MACD, trend takip göstergesi. Sinyal çizgisi kesişimleri al/sat sinyali verir ancak gecikmeli. Histogram diverjansı erken uyarı sağlayabilir.",
    fibonacci: "Fibonacci düzeltme seviyeleri (%23.6, %38.2, %50, %61.8) destek/direnç olarak çalışır. Self-fulfilling prophecy etkisi var çünkü herkes aynı seviyeleri izliyor.",
    
    // PANIC/HYPE REACTIONS
    düşüyor: "Fiyat düşüşü tek başına bilgi değil. Hacim, momentum ve temel verilerle birlikte değerlendirilmeli. Panik satışı genellikle yanlış zamanlama. Stop-loss disiplini önemli.",
    yükseliyor: "Fiyat %10 yükseldi ama hacim düşük. Bu bir diverjans. Dikkatli olun. FOMO ile alım yapmak istatistiksel olarak kötü sonuç veriyor.",
    almalı: "Al/sat tavsiyesi vermem. Risk/ödül oranını, pozisyon boyutunu ve stop-loss seviyenizi kendiniz belirlemelisiniz. Matematik yalan söylemez.",
    satmalı: "Satış kararı da alış kadar önemli. Trailing stop kullanın. Kar realizasyonu disiplin gerektirir. Duygusal kararlar portföyü eritir.",
  };

  // ============ VERA RESPONSES (Strategic, Empathetic, Macro) ============
  const veraResponses: Record<string, string> = {
    // COMMODITIES
    altın: "Merkez bankalarının rekor alım yaptığı bir dönemdeyiz. Altın, belirsizlik dönemlerinin sigortasıdır. Portföyünüzde çeşitlilik yaratmak için stratejik bir araçtır. Binlerce yıldır güvenli liman olarak kabul ediliyor çünkü psikolojik bir güven hissi veriyor.",
    gümüş: "Gümüş, hem değerli metal hem de endüstriyel metal özelliği taşıyor. Yeşil enerji dönüşümünde solar panellerde kullanımı artıyor. Uzun vadeli bir hikaye var, ancak kısa vadede altından daha volatil olabilir.",
    paladyum: "Paladyum, otomotiv sektörünün dönüşümüyle ilginç bir kavşakta. Elektrikli araçlara geçiş uzun vadeli talebi etkileyebilir. Stratejik düşünün, bu metal bir geçiş döneminin parçası.",
    platin: "Platin, hidrojen ekonomisinin potansiyel kazananlarından. Uzun vadeli enerji dönüşümü hikayesinin parçası. Sabırlı yatırımcılar için ilginç bir fırsat olabilir.",
    petrol: "Enerji, modern ekonominin can damarı. Petrol fiyatları jeopolitik olaylardan, OPEC kararlarından ve küresel talepten etkileniyor. Enerji geçişi döneminde, petrol hala kritik bir rol oynuyor.",
    doğalgaz: "Doğalgaz, kömürden yenilenebilire geçişte köprü yakıt olarak görülüyor. Avrupa'nın enerji güvenliği endişeleri bu piyasayı şekillendiriyor. Mevsimsellik ve jeopolitik faktörler önemli.",
    
    // CRYPTO
    kripto: "Kripto para dünyası heyecan verici ama aynı zamanda duygusal bir roller coaster. Önemli olan, piyasa dalgalanmalarının sizi yönlendirmesine izin vermemek. Uzun vadeli bir vizyon belirleyin ve o vizyona sadık kalın. Unutmayın, en iyi yatırımcılar sabırlı olanlardır.",
    bitcoin: "Piyasalarda korku hakim. Bu düşüş, kaldıraçlı işlemlerin temizlenmesi olabilir. Projeye ve uzun vadeli vizyona inanıyorsanız, bu gürültü sizi etkilememeli. Bitcoin, dijital çağın altını olarak görülüyor.",
    ethereum: "Ethereum, merkezi olmayan uygulamaların platformu. Web3 vizyonunun temel taşı. Teknolojik gelişmeler ve adoption metrikleri uzun vadeli değeri belirleyecek. Sabırla izleyin.",
    altcoin: "Altcoin dünyası çok geniş ve riskli. Her proje bir hikaye anlatıyor, ancak her hikaye gerçek olmuyor. Temel araştırma yapın, FOMO'ya kapılmayın. Kaybetmeyi göze alabileceğiniz kadar yatırım yapın.",
    defi: "DeFi, finansın demokratikleşmesi vizyonunu taşıyor. Geleneksel aracıları ortadan kaldırma potansiyeli var. Ancak bu yeni bir alan, riskler ve fırsatlar bir arada. Öğrenmeye devam edin.",
    stablecoin: "Stablecoin'ler kripto dünyasının güvenli limanı gibi görünüyor. Ancak her stablecoin aynı değil. Arkasındaki mekanizmayı anlayın. Güven, şeffaflıkla inşa edilir.",
    
    // TRADITIONAL MARKETS
    borsa: "Borsa, ekonominin nabzını tutar. Kısa vadeli dalgalanmalar sizi korkutmasın. Warren Buffett'ın dediği gibi, 'Borsa sabırsızlardan sabırlılara para transferi yapar.' Temel analiz yapın, şirketlerin hikayelerini anlayın.",
    hisse: "Hisse senedi almak, bir şirketin ortağı olmaktır. Şirketin vizyonuna, yönetimine ve sektörüne inanıyor musunuz? Uzun vadeli düşünün, günlük fiyat hareketleri gürültüdür.",
    nasdaq: "Teknoloji, geleceği şekillendiriyor. Nasdaq, bu dönüşümün barometresi. Kısa vadede volatil olabilir ama uzun vadede inovasyon kazanır. Sabırlı olun.",
    sp500: "S&P 500, Amerikan ekonomisinin ve küresel kapitalizmin bir yansıması. Diversifiye bir portföy için temel yapı taşı olabilir. Uzun vadeli bileşik getiri gücünü unutmayın.",
    etf: "ETF'ler, herkes için yatırımı demokratikleştirdi. Düşük maliyetle diversifikasyon sağlıyorlar. Basit tutun, karmaşık stratejiler genellikle basit olanları yenemez.",
    
    // BANKING & FUNDS
    fon: "Yatırım fonları, profesyonel yönetim ve çeşitlendirme sunar. Ancak her fon sizin için uygun değildir. Kendi risk profilinizi, yatırım ufkunuzu ve hedeflerinizi belirleyin. Doğru fon, sizin hikayenize uyan fondur.",
    bes: "BES, geleceğinize yatırım yapmaktır. Devlet katkısı önemli bir avantaj. Emeklilik uzak görünebilir ama zaman hızla geçiyor. Bugünden başlamak, yarın için en büyük hediye.",
    mevduat: "Mevduat, güvenli liman arayanlar için. Ancak enflasyon paranızın satın alma gücünü eritiyor. Finansal okuryazarlığınızı geliştirin, paranızı çalıştırmanın yollarını öğrenin.",
    
    // FOREX
    dolar: "Döviz kurları makroekonomik dengelerin bir yansımasıdır. Dolar yükseldiğinde endişelenmek yerine, bu durumun size ne öğrettiğini düşünün. Çeşitlendirme, döviz riskine karşı en iyi korumadır.",
    euro: "Euro, Avrupa'nın ortak para birimi ve küresel rezerv para statüsünde. Döviz çeşitlendirmesi için düşünülebilir. Ancak kur riski her zaman var, bunu unutmayın.",
    
    // MACRO DATA
    enflasyon: "Enflasyon, paranızın satın alma gücünü eritir. Ancak bu, finansal okuryazarlığınızı geliştirmek için bir motivasyon olmalı. Enflasyonu yenmek için yatırım yapmak, geleceğinize yatırım yapmaktır.",
    faiz: "Faiz oranları ekonominin termometresidir. Yükselen faizler, tasarruf sahipleri için fırsat, borçlular için maliyet demektir. Kendi finansal durumunuzu analiz edin ve faiz ortamına göre stratejinizi uyarlayın.",
    fed: "Fed kararları tüm dünyayı etkiliyor. Küresel likidite koşullarını belirliyor. Büyük resmi görün, Fed ne yaparsa yapsın, uzun vadeli planınıza sadık kalın.",
    tcmb: "Merkez Bankası kararları ekonominin yönünü belirliyor. Faiz, enflasyon, kur dengesi... Karmaşık görünebilir ama temel prensipler basit: Reel getiri pozitif mi?",
    
    // BEHAVIORAL FINANCE
    volatilite: "Volatilite, yatırımın doğal bir parçası. Korkmak yerine, bunu fırsat olarak görmeyi öğrenin. Volatilite, giriş fırsatları yaratır. Sabırlı ve disiplinli olun.",
    rsi: "Teknik göstergeler araçtır, kehanet değil. RSI size piyasanın nabzını söyler ama karar sizin. Göstergeleri rehber olarak kullanın, körü körüne takip etmeyin.",
    macd: "Trend sizin dostunuz. MACD trendi takip etmenize yardımcı olur. Ancak hiçbir gösterge mükemmel değil. Birden fazla kaynaktan bilgi toplayın.",
    fibonacci: "Fibonacci seviyeleri, piyasa psikolojisinin bir yansıması. Herkes aynı seviyeleri izlediğinde, o seviyeler önem kazanır. Piyasalar sonuçta insan davranışının toplamı.",
    
    // PANIC/HYPE REACTIONS
    düşüyor: "Piyasalarda düşüş, panik anlamına gelmez. Volatilite, giriş bedelidir. Temel değere odaklanın, günlük ekrana değil. Bu da geçecek.",
    yükseliyor: "Yükseliş heyecan verici ama FOMO tehlikeli. Herkes alırken almak, kalabalığı takip etmektir. Kendi stratejinize sadık kalın.",
    almalı: "Al/sat kararı çok kişisel. Risk toleransınız, yatırım ufkunuz, finansal hedefleriniz... Bunları düşünün. Doğru cevap sizin içinizde.",
    satmalı: "Satış kararı da bir strateji. Kar realizasyonu kötü bir şey değil. Ama panikle satmak genellikle pişmanlık getirir. Planınıza sadık kalın.",
  };

  const responses = persona.name === "Sarp" ? sarpResponses : veraResponses;

  // Find matching response (check multiple keywords)
  const keywords = Object.keys(responses);
  for (const keyword of keywords) {
    if (lowerInput.includes(keyword)) {
      return responses[keyword];
    }
  }

  // Check for general financial questions
  const generalKeywords = ["yatırım", "para", "finans", "portföy", "risk", "getiri", "kazanç", "kayıp"];
  const isFinancialQuestion = generalKeywords.some(k => lowerInput.includes(k));

  // Default responses based on persona
  if (persona.name === "Sarp") {
    if (isFinancialQuestion) {
      return "Spesifik bir enstrüman veya metrik belirtin. Altın, Bitcoin, borsa, dolar, faiz, enflasyon, RSI, MACD gibi konularda teknik analiz yapabilirim. Genel sorulara genel cevaplar veririm, bu da size yardımcı olmaz.";
    }
    return "Bu konuda yeterli veri olmadan yorum yapmak spekülatif olur. Spesifik bir finansal enstrüman veya metrik sorarsanız, sayısal analiz yapabilirim. Volatilite, korelasyon, risk/ödül oranı gibi konularda size yardımcı olabilirim.";
  } else {
    if (isFinancialQuestion) {
      return "Finansal yolculuğunuzda size yardımcı olmak isterim. Altın, kripto, borsa, döviz, fonlar veya emeklilik planlaması gibi konularda konuşabiliriz. Hangi konu sizi en çok ilgilendiriyor?";
    }
    return "Bu ilginç bir soru. Finansal kararlar sadece rakamlarla değil, kişisel hedefleriniz ve değerlerinizle de ilgilidir. Size daha iyi yardımcı olabilmem için, hangi finansal hedefiniz veya endişeniz hakkında konuşmak istersiniz?";
  }
};

// ============ MAIN COMPONENT ============
export default function DualPersonaWidget() {
  // Device detection
  const [isMobile, setIsMobile] = useState(false);
  const [persona, setPersona] = useState<Persona>(SARP);
  
  // Widget state
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [inputText, setInputText] = useState("");
  const [pulseScale, setPulseScale] = useState(1);
  
  // Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pulseIntervalRef = useRef<number | null>(null);

  // Device detection on mount
  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
    setPersona(checkMobile ? VERA : SARP);
    console.log(`[DualPersona] Device: ${checkMobile ? "Mobile" : "Desktop"}, Persona: ${checkMobile ? "VERA" : "SARP"}`);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Pulse animation
  const startPulseAnimation = useCallback(() => {
    if (pulseIntervalRef.current) return;
    pulseIntervalRef.current = window.setInterval(() => {
      setPulseScale(prev => prev === 1 ? 1.08 : 1);
    }, 300);
  }, []);

  const stopPulseAnimation = useCallback(() => {
    if (pulseIntervalRef.current) {
      clearInterval(pulseIntervalRef.current);
      pulseIntervalRef.current = null;
    }
    setPulseScale(1);
  }, []);

  // Audio unlock (critical for mobile)
  const unlockAudio = useCallback(async () => {
    if (isAudioUnlocked) return;
    
    try {
      // Create AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      
      // Resume if suspended
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }
      
      // Play silent buffer to unlock speakers
      const buffer = audioContextRef.current.createBuffer(1, 1, 22050);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start(0);
      
      setIsAudioUnlocked(true);
      console.log("[DualPersona] Audio unlocked successfully");
    } catch (error) {
      console.error("[DualPersona] Audio unlock failed:", error);
    }
  }, [isAudioUnlocked]);

  // Get voice based on persona with iOS adaptive pitch
  const getVoice = useCallback((): { voice: SpeechSynthesisVoice | null; isNativeMale: boolean } => {
    const voices = window.speechSynthesis.getVoices();
    const turkishVoices = voices.filter(v => v.lang.startsWith("tr") || v.lang === "tr-TR");
    
    console.log(`[DualPersona] Available Turkish voices:`, turkishVoices.map(v => v.name));
    
    if (persona.voiceSettings.useNativeDefault) {
      // VERA: Use native default (female)
      const defaultVoice = turkishVoices[0] || voices.find(v => v.lang.startsWith("tr")) || null;
      console.log(`[DualPersona] VERA using native voice:`, defaultVoice?.name);
      return { voice: defaultVoice, isNativeMale: false };
    }
    
    // SARP: Search for male voice with priority
    const maleKeywords = persona.voiceSettings.searchTerms;
    
    // Priority 1: Explicit male voices (Cem, Alper, Murat)
    for (const keyword of ["cem", "alper", "murat"]) {
      const found = turkishVoices.find(v => v.name.toLowerCase().includes(keyword));
      if (found) {
        console.log(`[DualPersona] SARP found explicit male voice:`, found.name);
        return { voice: found, isNativeMale: true };
      }
    }
    
    // Priority 2: Male/Erkek keyword
    for (const keyword of ["male", "erkek"]) {
      const found = turkishVoices.find(v => v.name.toLowerCase().includes(keyword));
      if (found) {
        console.log(`[DualPersona] SARP found male keyword voice:`, found.name);
        return { voice: found, isNativeMale: true };
      }
    }
    
    // Priority 3: Google voice (often neutral/male on Android)
    const googleVoice = turkishVoices.find(v => v.name.toLowerCase().includes("google"));
    if (googleVoice) {
      console.log(`[DualPersona] SARP using Google voice:`, googleVoice.name);
      return { voice: googleVoice, isNativeMale: true };
    }
    
    // Fallback: Use any Turkish voice with pitch adjustment
    const fallbackVoice = turkishVoices[0] || voices.find(v => v.lang.startsWith("tr")) || null;
    console.log(`[DualPersona] SARP fallback voice (will apply pitch shift):`, fallbackVoice?.name);
    return { voice: fallbackVoice, isNativeMale: false };
  }, [persona]);

  // Text-to-Speech with adaptive pitch for iOS
  const speakText = useCallback((text: string) => {
    if (!isTTSEnabled) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create utterance (WITHOUT disclaimer - it's only in TTS, not in text)
    const utterance = new SpeechSynthesisUtterance(text + " Yatırım tavsiyesi değildir.");
    
    // Get voice and determine if pitch adjustment needed
    const { voice, isNativeMale } = getVoice();
    if (voice) {
      utterance.voice = voice;
    }
    
    // Apply pitch based on persona and voice type
    if (persona.name === "Sarp") {
      if (isNativeMale) {
        // Native male voice: natural settings
        utterance.pitch = 0.95;
        utterance.rate = 0.92;
      } else {
        // Female voice on iOS: aggressive pitch shift to sound male
        utterance.pitch = 0.55;
        utterance.rate = 0.88;
      }
    } else {
      // VERA: natural female voice
      utterance.pitch = 1.0;
      utterance.rate = 0.95;
    }
    
    utterance.lang = "tr-TR";
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      startPulseAnimation();
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      stopPulseAnimation();
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      stopPulseAnimation();
    };
    
    window.speechSynthesis.speak(utterance);
  }, [isTTSEnabled, persona, getVoice, startPulseAnimation, stopPulseAnimation]);

  // Speech recognition
  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("[DualPersona] Speech recognition not supported");
      return;
    }
    
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "tr-TR";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
    
    // Stop TTS if speaking
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      stopPulseAnimation();
    }
    
    setIsListening(true);
    recognitionRef.current.start();
  }, [isSpeaking, stopPulseAnimation]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Handle message sending
  const handleSendMessage = useCallback((text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: messageText }]);
    setInputText("");
    
    // Get AI response
    const response = getResponse(messageText, persona);
    
    // Add assistant message (without disclaimer in text)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      speakText(response);
    }, 500);
  }, [inputText, persona, speakText]);

  // Handle widget open
  const handleOpenWidget = useCallback(async () => {
    await unlockAudio();
    setIsOpen(true);
    
    // Send intro message
    if (messages.length === 0) {
      const introMessage = `Merhaba, ben ${persona.name}. ${persona.motto}`;
      setMessages([{ role: "assistant", content: introMessage }]);
      
      // Delay TTS to ensure audio is unlocked
      setTimeout(() => {
        speakText(introMessage);
      }, 300);
    }
  }, [unlockAudio, messages.length, persona, speakText]);

  // Handle widget close
  const handleCloseWidget = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    stopPulseAnimation();
    setIsOpen(false);
  }, [stopPulseAnimation]);

  return (
    <>
      {/* Floating Avatar Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenWidget}
            className="fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full shadow-2xl overflow-hidden border-2"
            style={{ 
              borderColor: persona.accentColor,
              boxShadow: `0 0 20px ${persona.accentColor}40`
            }}
          >
            <img 
              src={persona.avatarUrl} 
              alt={persona.name}
              className="w-full h-full object-cover"
            />
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: persona.accentColor }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed z-50 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col ${
              isMobile 
                ? "inset-4" 
                : "bottom-5 right-5 w-[380px] h-[550px]"
            }`}
            style={{ borderColor: `${persona.accentColor}30` }}
          >
            {/* Header */}
            <div 
              className="p-4 flex items-center gap-3 border-b"
              style={{ 
                background: `linear-gradient(135deg, ${persona.accentColor}20, transparent)`,
                borderColor: `${persona.accentColor}30`
              }}
            >
              {/* Avatar with pulse */}
              <motion.div 
                animate={{ scale: pulseScale }}
                className="relative w-12 h-12 rounded-full overflow-hidden border-2"
                style={{ 
                  borderColor: persona.accentColor,
                  boxShadow: isSpeaking ? `0 0 15px ${persona.accentColor}` : 'none'
                }}
              >
                <img 
                  src={persona.avatarUrl} 
                  alt={persona.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-white">{persona.title}</h3>
                <p className="text-xs text-gray-400">
                  {isSpeaking ? "Konuşuyor..." : isListening ? "Dinliyor..." : "Çevrimiçi"}
                </p>
              </div>
              
              {/* Controls */}
              <button
                onClick={() => setIsTTSEnabled(!isTTSEnabled)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {isTTSEnabled ? (
                  <Volume2 className="w-5 h-5 text-gray-300" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              <button
                onClick={handleCloseWidget}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gray-700 text-white rounded-br-md"
                        : "text-white rounded-bl-md"
                    }`}
                    style={msg.role === "assistant" ? { 
                      background: `linear-gradient(135deg, ${persona.accentColor}30, ${persona.accentColor}10)` 
                    } : {}}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Disclaimer */}
            <div className="px-4 py-2 text-center">
              <p className="text-[10px] text-gray-500">
                SPK/BDDK Uyarısı: Verilen bilgiler yatırım tavsiyesi değildir.
              </p>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t" style={{ borderColor: `${persona.accentColor}20` }}>
              <div className="flex items-center gap-2">
                {/* Mic Button */}
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`p-3 rounded-full transition-all ${
                    isListening 
                      ? "bg-red-500 animate-pulse" 
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5 text-white" />
                  ) : (
                    <Mic className="w-5 h-5 text-gray-300" />
                  )}
                </button>
                
                {/* Text Input */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={`${persona.name}'a sorun...`}
                  className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2"
                  style={{ outlineColor: persona.accentColor }}
                />
                
                {/* Send Button */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="p-3 rounded-full transition-all disabled:opacity-50"
                  style={{ background: persona.accentColor }}
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
