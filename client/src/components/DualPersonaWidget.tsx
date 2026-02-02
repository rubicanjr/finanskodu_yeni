/**
 * DualPersonaWidget.tsx
 * Device-Based Persona Switch: Sarp (Desktop) & Vera (Mobile)
 * 
 * CRITICAL CONSTRAINTS (from Strategy Document):
 * 1. NO REAL-TIME DATA: Never guess current prices, rates, or specific dates
 * 2. METHODOLOGY OVER VALUES: Instead of "RSI is 70", say "If RSI is above 70..."
 * 3. SPK/BDDK COMPLIANCE: No "Buy/Sell/Hold" advice, only educational guidance
 * 
 * SARP (Desktop): Technical Analyst, Risk Manager - THE QUANT
 * - Focus: Formulas, Indicators, Mathematical Models
 * - Tone: Cold, Analytical, Concise, Skeptical
 * - Keywords: Arbitrage, Standard Deviation, Support/Resistance, Volume Profile, Breakout, Fakeout
 * 
 * VERA (Mobile): Macro Strategist, Behavioral Psychologist - THE STRATEGIST
 * - Focus: Cause-and-Effect, Psychology, Macro Trends
 * - Tone: Warm, Educational, Visionary, Calming
 * - Keywords: Macro Trends, Fed/Central Banks, Investor Sentiment, FOMO, FUD
 * 
 * UNIVERSAL KNOWLEDGE BASE:
 * - Precious Metals: Gold, Silver, Palladium, Platinum
 * - Crypto Assets: BTC, ETH, Altcoins (Tokenomics, Halving, DeFi, Staking)
 * - Traditional Markets: Stocks (BIST, Nasdaq), ETFs, Mutual Funds (TEFAS), Bonds
 * - Pension & Savings: BES, Deposit Accounts, Inflation Hedging
 * - Advanced Metrics: Volatility (VIX), Correlation (Beta), Sharpe Ratio, Risk/Reward, Drawdown, Arbitrage, Stop-Loss
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, MicOff, Volume2, VolumeX, Send } from "lucide-react";
import { audioManager } from "@/utils/AudioManager";

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
    keywords: string[];
  };
}

const SARP: Persona = {
  name: "Sarp",
  title: "Teknik Analist Sarp",
  archetype: "Quantitative Analyst (Quant) - THE BRAKE",
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
    tone: "Cold, Analytical, Concise, Skeptical. Anti-FOMO.",
    focus: ["Technical Analysis", "Risk Calculation", "Mathematical Models", "Indicators", "Formulas"],
    style: "Short, concise, technical. No emotional fluff. Focus on methodology, not values.",
    keywords: ["Arbitraj", "Standart Sapma", "Destek/Direnç", "Hacim Profili", "Breakout", "Fakeout", "Volatilite", "Beta", "Sharpe Oranı"],
  },
};

const VERA: Persona = {
  name: "Vera",
  title: "Makro Stratejist Vera",
  archetype: "Macro Strategist & Behavioral Psychologist - THE STEERING WHEEL",
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
    tone: "Warm, Educational, Visionary, Calming.",
    focus: ["Macro Trends", "Psychology", "Cause-and-Effect", "Central Bank Policies", "Financial Well-being"],
    style: "Fluent, empathetic, storytelling. Explains complex events simply. Connects the dots.",
    keywords: ["Makro Trendler", "Fed", "Merkez Bankaları", "Yatırımcı Duyarlılığı", "FOMO", "FUD", "Finansal Refah"],
  },
};

// ============ METHODOLOGY-BASED KNOWLEDGE BASE (NO REAL-TIME DATA) ============
const getResponse = (input: string, persona: Persona): string => {
  const lowerInput = input.toLowerCase();
  
  // ============ SARP RESPONSES (Technical, Methodology-Focused, Quant) ============
  // RULE: Focus on FORMULAS and INDICATORS, never specific values
  const sarpResponses: Record<string, string> = {
    // PRECIOUS METALS
    altın: "Altın analizi için reel faiz oranlarına bakın. Eğer reel faizler negatifse, altın matematiksel olarak cazip hale gelir. Teknik olarak, 200 günlük hareketli ortalama kritik destek seviyesidir. Fiyat bu ortalamanın üzerindeyse trend yukarı, altındaysa trend aşağı olarak değerlendirilir. Bollinger Bantları genişliyorsa volatilite artıyor demektir.",
    gümüş: "Gümüş, Altın'a göre betası daha yüksek bir varlıktır, yani daha volatildir. Portföyünüzdeki oynaklığı artırır. Alım kararı için Altın/Gümüş rasyosuna bakın; rasyo tarihsel ortalamanın üzerindeyse gümüş matematiksel olarak ucuz kalmış olabilir. RSI aşırı satım bölgesindeyse ve hacim artıyorsa momentum dönüşü sinyali olabilir.",
    paladyum: "Paladyum, otomotiv sektörü talebiyle korelasyon gösterir. Elektrikli araç penetrasyonu arttıkça uzun vadeli talep riski oluşur. Teknik analiz için, fiyat 50 günlük ortalamanın altına düşerse kısa vadeli trend zayıflamış demektir. Pozisyon boyutunu volatiliteye göre ayarlayın; ATR (Average True Range) yüksekse pozisyon küçük tutulmalı.",
    platin: "Platin/Paladyum rasyosu tarihsel olarak analiz edilmeli. Eğer platin iskontolu işlem görüyorsa, rasyo ortalamanın altındadır. Hidrojen ekonomisi senaryoları uzun vadeli talep artışı yaratabilir. Teknik olarak, MACD sinyal çizgisini yukarı keserse momentum pozitife dönmüş demektir.",
    
    // CRYPTO ASSETS
    kripto: "Kripto varlıklarda fiyat hareketinden ziyade hacme odaklanın. Eğer fiyat yükselirken hacim düşüyorsa, bu bir 'Negatif Uyuşmazlık'tır ve trendin zayıfladığını gösterir. Teknik indikatörler aşırı alım bölgesindeyse düzeltme riski matematiksel olarak artar. Risk/ödül oranı hesaplanmadan pozisyon açmak istatistiksel olarak kayıp getirir.",
    bitcoin: "Bitcoin'in fiyat hareketinden ziyade hacmine odaklanın. Eğer fiyat yükselirken hacim düşüyorsa, bu bir 'Negatif Uyuşmazlık'tır ve trendin zayıfladığını gösterir. 200 günlük hareketli ortalama kritik destek seviyesidir. RSI 70'in üzerindeyse aşırı alım, 30'un altındaysa aşırı satım bölgesindedir. Halving döngüleri arz dinamiklerini etkiler.",
    ethereum: "ETH/BTC oranı kritik bir göstergedir. Bu oran yükseliyorsa Ethereum Bitcoin'e göre güçleniyor demektir. Stake getirisi analiz edilirken enflasyon oranıyla karşılaştırılmalı. Gas fee'leri ve Layer 2 adoption metrikleri temel analiz için önemlidir. Merge sonrası arz dinamikleri değişti; bu tokenomics'i etkiler.",
    altcoin: "Altcoinler Bitcoin'e göre daha yüksek beta taşır. Bull market'ta outperform ederler, bear market'ta daha sert düşerler. Likidite riski yüksektir; spread'ler geniş olabilir. Piyasa değeri küçük coinlerde slippage hesaba katılmalı. Temel analiz yapmadan altcoin almak matematiksel olarak kumardır.",
    defi: "DeFi protokollerinde TVL (Total Value Locked) kritik metriktir. Smart contract riski, impermanent loss ve oracle manipülasyonu riskleri vardır. APY'lerin sürdürülebilirliği analiz edilmeli; yüksek APY genellikle yüksek risk demektir. Protokolün audit raporları ve TVL trendleri incelenmelidir.",
    staking: "Staking getirisi analiz edilirken, token enflasyonu hesaba katılmalıdır. Eğer staking APY'si token enflasyonunun altındaysa, reel getiri negatiftir. Lock-up süreleri likidite riskini artırır. Validator seçiminde slashing riski değerlendirilmelidir.",
    halving: "Halving döngüleri, Bitcoin'in arz dinamiklerini belirler. Tarihsel olarak, halving sonrası arz şoku fiyat üzerinde etkili olmuştur. Ancak bu bir garanti değil, bir korelasyondur. Stock-to-Flow modeli bu ilişkiyi matematiksel olarak ifade eder.",
    tokenomics: "Tokenomics analizi için şunlara bakın: Toplam arz, dolaşımdaki arz, enflasyon oranı, token dağılımı (takım, yatırımcılar, topluluk), vesting schedule. Eğer büyük bir unlock yaklaşıyorsa, arz baskısı oluşabilir.",
    
    // TRADITIONAL MARKETS
    borsa: "Borsa analizi için P/E oranını tarihsel ortalamayla karşılaştırın. Eğer P/E tarihsel ortalamanın üzerindeyse, piyasa pahalı olabilir. Volatilite endeksi (VIX muadili) yükseliş trendindeyse risk primi artıyor demektir. Sektörel rotasyon sinyalleri için sektör ETF'lerinin göreceli performansını izleyin.",
    hisse: "Hisse senedi seçiminde temel ve teknik analiz birlikte kullanılmalı. Temel metrikler: P/E, P/B, ROE, borç/özkaynak oranı. Teknik olarak, destek/direnç seviyeleri ve hacim analizi kritiktir. Fiyat destek seviyesini hacimle kırarsa trend dönüşü sinyalidir.",
    nasdaq: "Nasdaq teknoloji ağırlıklı bir endekstir ve faiz oranlarına hassastır. Growth stock'lar yüksek faiz ortamında daha fazla iskonto edilir. VIX yükseldiğinde Nasdaq genellikle daha sert düşer. Dolar bazlı yatırım yapıyorsanız kur riski hesaba katılmalıdır.",
    sp500: "S&P 500 diversifiye bir endekstir ancak sektör ağırlıkları dengesiz olabilir. Teknoloji dominansı konsantrasyon riski yaratır. Pasif yatırım için uygundur ancak timing riski vardır. 200 günlük ortalama uzun vadeli trend göstergesidir.",
    etf: "ETF seçiminde expense ratio kritiktir; düşük expense ratio uzun vadede getiriyi artırır. Tracking error'a dikkat edin; endeksten sapma olmamalı. Sentetik vs fiziksel replikasyon farkını anlayın. Likidite ve spread'ler işlem maliyetini etkiler.",
    tahvil: "Tahvil fiyatları faiz oranlarıyla ters korelasyon gösterir. Faizler yükseldiğinde tahvil fiyatları düşer. Duration, faiz hassasiyetini ölçer; yüksek duration daha fazla fiyat oynaklığı demektir. Kredi spreadi, temerrüt riskini yansıtır.",
    
    // BANKING & FUNDS
    fon: "Yatırım fonlarının expense ratio'su uzun vadede getiriyi eritir. Araştırmalar gösteriyor ki pasif endeks fonları, aktif yönetilen fonların büyük çoğunluğundan daha iyi performans gösterir. TEFAS üzerinden fonları karşılaştırırken Sharpe oranına ve maksimum drawdown'a bakın.",
    tefas: "TEFAS fonlarını karşılaştırırken şu metriklere bakın: Sharpe oranı (risk-adjusted getiri), maksimum drawdown (en kötü dönem kaybı), expense ratio (yönetim ücreti), benchmark'a göre performans. Yüksek getiri tek başına yeterli değil, risk-adjusted getiri önemli.",
    bes: "BES'te devlet katkısı avantajı matematiksel olarak önemlidir. Ancak fon yönetim ücretleri getiriyi eritebilir. Emeklilik yaşına kadar çıkış cezası likidite riskidir. Fon seçiminde expense ratio'ya dikkat edin. Uzun vadeli bileşik getiri hesabı yapın.",
    mevduat: "Mevduat faizi enflasyonla karşılaştırılmalıdır. Eğer nominal faiz enflasyonun altındaysa, reel getiri negatiftir. Vade ve faiz oranı arasında trade-off vardır. TMSF güvencesi limiti bilinmelidir. Kur korumalı mevduat farklı risk profili taşır.",
    
    // FOREX
    dolar: "Döviz analizi için faiz diferansiyeline bakın. Eğer iki ülke arasındaki faiz farkı daralıyorsa, carry trade pozisyonları riskli hale gelir. Teknik olarak, trend kanalları ve hareketli ortalamalar kullanılır. Hedge stratejisi olmadan döviz pozisyonu taşımak kur riskine açık olmak demektir.",
    euro: "EUR/TRY analizi için hem EUR/USD hem de USD/TRY paritelerini izleyin. Çift kur riski vardır. ECB ve TCMB politikaları belirleyicidir. Teknik olarak, destek/direnç seviyeleri ve trend kanalları kullanılır.",
    kur: "Kur analizi için Satın Alma Gücü Paritesi (PPP) teorisi kullanılabilir. Eğer kur PPP'nin üzerindeyse aşırı değerli, altındaysa düşük değerli olabilir. Ancak kısa vadede kurlar PPP'den sapabilir. Faiz diferansiyeli ve cari açık kritik makro değişkenlerdir.",
    
    // MACRO DATA
    enflasyon: "Enflasyon ortamında reel getiri hesaplaması kritiktir. Nominal getiri eksi enflasyon eşittir reel getiri. Eğer reel getiri negatifse, paranızın satın alma gücü eriyor demektir. Enflasyona endeksli varlıklar (emtia, TIPS muadili tahviller) matematiksel olarak koruma sağlar.",
    faiz: "Merkez bankası faiz kararları piyasa beklentisiyle karşılaştırılmalıdır. Eğer karar beklentinin dışında kalırsa volatilite spike'ı beklenir. Faiz futures'ları piyasa beklentisini gösterir. Yield curve (getiri eğrisi) eğimi ekonomik beklentileri yansıtır; ters eğri resesyon sinyali olabilir.",
    fed: "Fed kararları global piyasaları etkiler. Dot plot ve FOMC tutanakları forward guidance verir. Fed funds rate ile 10 yıllık tahvil getirisi arasındaki spread izlenmelidir. Negatif spread tarihsel olarak resesyon öncüsü olmuştur.",
    tcmb: "TCMB politika faizi ve forward guidance kritiktir. Enflasyon hedeflemesi rejiminde reel faiz pozitif olmalıdır. Eğer politika faizi enflasyonun altındaysa, reel faiz negatiftir. Rezerv yeterliliği ve swap anlaşmaları döviz kuru stabilitesini etkiler.",
    
    // ADVANCED METRICS
    volatilite: "Volatilite riskin ölçüsüdür. VIX 20'nin üzerindeyse piyasa stresli kabul edilir. Implied volatility vs realized volatility farkı opsiyon stratejileri için kritiktir. Volatilite clustering özelliği gösterir; yüksek volatilite dönemleri kümelenir.",
    beta: "Beta, bir varlığın piyasaya göre oynaklığını ölçer. Beta 1'den büyükse varlık piyasadan daha volatil, küçükse daha az volatildir. Portföy beta'sı, portföyün sistematik riskini gösterir. Düşük beta varlıklar savunmacı, yüksek beta varlıklar agresif kabul edilir.",
    sharpe: "Sharpe oranı, risk-adjusted getiriyi ölçer. Formül: (Getiri - Risksiz Faiz) / Standart Sapma. Yüksek Sharpe oranı, birim risk başına daha fazla getiri demektir. Sharpe oranı 1'in üzerindeyse iyi, 2'nin üzerindeyse çok iyi kabul edilir.",
    drawdown: "Maksimum drawdown, bir varlığın zirve-dip arasındaki en büyük düşüşüdür. Risk yönetimi için kritik bir metriktir. Yüksek drawdown, psikolojik olarak taşınması zor pozisyonlar yaratır. Drawdown recovery süresi de önemlidir.",
    rsi: "RSI 70'in üzerindeyse aşırı alım, 30'un altındaysa aşırı satım bölgesidir. Ancak trend piyasalarında RSI uzun süre aşırı bölgelerde kalabilir. RSI diverjansı daha güvenilir sinyal verir; fiyat yeni zirve yaparken RSI yapmıyorsa negatif diverjans.",
    macd: "MACD trend takip göstergesidir. MACD çizgisi sinyal çizgisini yukarı keserse alım, aşağı keserse satım sinyalidir. Ancak bu sinyaller gecikmeli olabilir. Histogram diverjansı erken uyarı sağlayabilir.",
    bollinger: "Bollinger Bantları volatiliteyi ölçer. Bantlar genişliyorsa volatilite artıyor, daralıyorsa azalıyor demektir. Fiyat üst banda yaklaşırsa aşırı alım, alt banda yaklaşırsa aşırı satım sinyali olabilir. Band squeeze sonrası genellikle sert hareket gelir.",
    fibonacci: "Fibonacci düzeltme seviyeleri (%23.6, %38.2, %50, %61.8) destek/direnç olarak çalışır. Self-fulfilling prophecy etkisi vardır çünkü birçok trader aynı seviyeleri izler. Golden ratio (%61.8) en kritik seviye kabul edilir.",
    stoploss: "Stop-loss, risk yönetiminin temelidir. Rasyonel stop-loss seviyesi, teknik destek seviyelerinin altına veya ATR'nin katlarına göre belirlenir. Trailing stop, karı korumak için kullanılır. Stop-loss olmadan pozisyon taşımak, sınırsız risk almak demektir.",
    arbitraj: "Arbitraj, aynı varlığın farklı piyasalardaki fiyat farkından kar elde etmektir. Teoride risksiz kar sağlar ancak pratikte işlem maliyetleri, slippage ve execution riski vardır. Kripto piyasalarında exchange'ler arası arbitraj fırsatları olabilir.",
    
    // PRODUCT KNOWLEDGE BASE
    "finans kodu": "FİNANS KODU: Kaos İçinde Düzen - Teknik bir Excel eğitimi değil, finansal kararların 'Anayasası'dır. Endüstri Mühendisi ve CIO perspektifiyle yazılmıştır. Felsefe: Sisteminizi kurun, duygularınızı devreden çıkarın. Matematikte 'umarım' diye bir değişken yoktur. Özellikleri: Mühendislik Perspektifi (finansı girdi-çıktı optimizasyon problemi olarak görür), Duygu-Bozucu Algoritmalar, Risk/Getiri Mühendisliği, Sürdürülebilir Varlık Döngüsü, Karar Matrisleri, Gürültü Filtreleme.",
    "kaos içinde düzen": "FİNANS KODU: Kaos İçinde Düzen - Finansal Özgürlük ve Sürdürülebilirlik İçin 'Sistemin Kaynak Kodları'. Teknik bir Excel eğitimi değil, finansal kararların 'Anayasası'dır. 10-20 yıllık bileşik getiri odaklı portföy mimarisi sunar. Yatırım kararları için sübjektif değil, objektif kriterler sağlar.",
    "prompt kütüphanesi": "AI Prompt Kütüphanesi - 'Yapay zeka ile sohbet etmeyi bırakın, ona emretmeyi öğrenin.' Finansal analiz için optimize edilmiş, test edilmiş 100+ akıllı komut. Özellikleri: 100+ Profesyonel Komut (analiz, raporlama, strateji odaklı), Sanal Analist (AI'ı kıdemli analiste dönüştüren kurgular), Hız ve Verimlilik, Tam Kapsam (bilanço, Excel formülleri, risk analizi), Kopyala-Yapıştır hazır şablonlar, AI Okuryazarlığı.",
    "ai prompt": "AI Prompt Kütüphanesi - Finansal analiz için optimize edilmiş 100+ akıllı komut. Saatler süren işleri saniyelere düşüren mühendislik promptları. Sıfır teknik bilgi gereksinimi, kopyala-yapıştır hazır şablonlar.",
    "algoritmik bülten": "Pro - Algoritmik Strateji ve Analiz Bülteni - 'Veriyi sağlıyoruz, stratejinizi denetliyoruz. Hata şansını sıfıra indirin.' Hizmet: Algoritmik Veri Akışı (1 Ay) + Birebir Check-Up Seansı (45 dk). Felsefe: Duygu yok, tahmin yok. Sadece matematik var. Özellikleri: Altın Algoritması, Akıllı Fon Sepetleri, Haftalık Sesli Brifing, Kanıtlanmış Model (%30 büyüme), %99 teknik veri isabeti, 1:1 Finansal Check-Up, Kişisel Reçete, VIP İletişim Hattı.",
    "pro bülten": "Pro - Algoritmik Strateji ve Analiz Bülteni - Altın Algoritması (Ons, Gram, Sertifika için trend ve yön analizi), Akıllı Fon Sepetleri (matematiksel modellerle seçilmiş TEFAS fon sepetleri), Haftalık Sesli Brifing, 1:1 Finansal Check-Up seansı dahil.",
    "ürün": "Dijital ürünlerimiz: 1) FİNANS KODU: Kaos İçinde Düzen - Finansal kararların 'Anayasası'. 2) AI Prompt Kütüphanesi - 100+ finansal analiz promptu. 3) Pro - Algoritmik Strateji ve Analiz Bülteni - Veri akışı + birebir check-up. Hangi ürün hakkında detaylı bilgi istersiniz?",
    
    // PANIC/HYPE REACTIONS
    düşüyor: "Fiyat düşüşü tek başına bilgi değildir. Hacim, momentum ve temel verilerle birlikte değerlendirilmelidir. Eğer fiyat düşerken hacim artıyorsa, satış baskısı güçlü demektir. RSI aşırı satım bölgesindeyse ve hacim azalıyorsa, satış baskısı tükenmiş olabilir.",
    yükseliyor: "Fiyat yükselişi tek başına alım sinyali değildir. Eğer fiyat yükselirken hacim düşüyorsa, bu negatif diverjans ve trendin zayıfladığı anlamına gelir. RSI aşırı alım bölgesindeyse düzeltme riski matematiksel olarak artar. FOMO ile alım yapmak istatistiksel olarak kötü sonuç verir.",
    almalı: "Al/sat tavsiyesi vermek SPK mevzuatına aykırıdır. Ancak metodoloji paylaşabilirim: Risk/ödül oranını hesaplayın. Potansiyel kar, potansiyel zararın en az 2 katı olmalı. Pozisyon boyutunu portföyünüzün %1-2'si ile sınırlayın. Stop-loss seviyenizi önceden belirleyin.",
    satmalı: "Satış kararı da alış kadar önemlidir. Trailing stop kullanarak karı koruyun. Eğer varlık temel tezinizi bozacak şekilde değiştiyse, pozisyonu gözden geçirin. Duygusal kararlar yerine önceden belirlenen kurallara sadık kalın.",
    ne_olur: "Fiyat tahmini yapmak spekülatiftir ve SPK mevzuatına aykırıdır. Bunun yerine senaryo analizi yapın: Eğer X gerçekleşirse Y olabilir. Teknik göstergeleri ve makro koşulları analiz edin. Risk/ödül oranını hesaplayın.",
    
    // DEFAULT
    default: "Spesifik bir enstrüman veya metrik belirtin. Altın, Bitcoin, borsa, dolar, faiz, RSI, MACD, Bollinger, Fibonacci gibi konularda metodoloji paylaşabilirim. Fiyat tahmini yapmam; bunun yerine analiz araçlarını ve formülleri açıklarım."
  };

  // ============ VERA RESPONSES (Strategic, Psychology-Focused, Macro) ============
  // RULE: Focus on CAUSE-AND-EFFECT and PSYCHOLOGY, never specific values
  const veraResponses: Record<string, string> = {
    // PRECIOUS METALS
    altın: "Altın, insanlık tarihinin en eski değer saklama aracıdır. Belirsizlik dönemlerinde psikolojik bir güvenli liman işlevi görür. Merkez bankalarının altın alımları, küresel para sistemine olan güvensizliği yansıtır. Portföyünüzde altın bulundurmak, belirsizliğe karşı bir sigorta poliçesidir.",
    gümüş: "Gümüş hem bir yatırım aracı hem de sanayi metalidir. Yeşil enerji dönüşümü, özellikle güneş panellerinde kullanımı nedeniyle sanayi talebini canlı tutar. Psikolojik olarak sert fiyat hareketlerine hazırlıklı olmalısınız; gümüş altından daha volatildir. Sabırlı yatırımcılar için uzun vadeli potansiyel taşır.",
    paladyum: "Paladyum, otomotiv sektörünün dönüşümüyle ilginç bir kavşakta. Elektrikli araçlara geçiş uzun vadeli talebi etkileyebilir. Stratejik düşünün: Bu metal bir geçiş döneminin parçası. Jeopolitik faktörler (Rusya arz konsantrasyonu) fiyatı etkileyebilir.",
    platin: "Platin, hidrojen ekonomisinin potansiyel kazananlarından biri. Uzun vadeli enerji dönüşümü hikayesinin parçası. Sabırlı yatırımcılar için ilginç bir fırsat olabilir. Ancak bu uzun vadeli bir tez; kısa vadeli dalgalanmalara hazırlıklı olun.",
    
    // CRYPTO ASSETS
    kripto: "Kripto para dünyası heyecan verici ama aynı zamanda duygusal bir roller coaster. Önemli olan, piyasa dalgalanmalarının sizi yönlendirmesine izin vermemek. Uzun vadeli bir vizyon belirleyin ve o vizyona sadık kalın. FOMO ve FUD, yatırımcıların en büyük düşmanlarıdır.",
    bitcoin: "Bitcoin, küresel likidite koşullarına en hızlı tepki veren varlıklardan biridir. Merkez bankalarının parasal genişleme dönemlerinde risk iştahı artar. Fiyata değil, blokzincirin benimsenme oranına ve teknolojinin değerine odaklanmalısınız. Halving döngüleri arz dinamiklerini belirler.",
    ethereum: "Ethereum, merkezi olmayan uygulamaların platformu ve Web3 vizyonunun temel taşı. Teknolojik gelişmeler ve adoption metrikleri uzun vadeli değeri belirleyecek. Stake mekanizması pasif gelir sağlar ancak lock-up riskleri vardır. Sabırla izleyin ve temel hikayeye odaklanın.",
    altcoin: "Altcoin dünyası çok geniş ve riskli. Her proje bir hikaye anlatıyor, ancak her hikaye gerçek olmuyor. Temel araştırma yapın, FOMO'ya kapılmayın. Kaybetmeyi göze alabileceğiniz kadar yatırım yapın. Çoğu altcoin uzun vadede değer kaybeder; seçici olun.",
    defi: "DeFi, finansın demokratikleşmesi vizyonunu taşıyor. Geleneksel aracıları ortadan kaldırma potansiyeli var. Ancak bu yeni bir alan; riskler ve fırsatlar bir arada. Öğrenmeye devam edin, küçük miktarlarla başlayın. Yüksek APY vaatleri genellikle yüksek risk taşır.",
    staking: "Staking, kripto varlıklarınızı çalıştırmanın bir yoludur. Pasif gelir sağlar ancak lock-up dönemleri likidite riskinizi artırır. Stake ettiğiniz protokolün güvenilirliğini araştırın. Yüksek APY her zaman iyi değildir; sürdürülebilirliği sorgulayın.",
    halving: "Halving, Bitcoin'in programlanmış arz azaltma mekanizmasıdır. Tarihsel olarak halving sonrası dönemler ilginç fiyat hareketleri göstermiştir. Ancak geçmiş performans gelecek garantisi değildir. Uzun vadeli bir perspektifle yaklaşın.",
    tokenomics: "Tokenomics, bir kripto projesinin ekonomik modelidir. Token dağılımı, enflasyon oranı ve kullanım alanları projenin sürdürülebilirliğini belirler. İyi tokenomics, uzun vadeli değer yaratır. Takımın ve erken yatırımcıların token payına dikkat edin.",
    
    // TRADITIONAL MARKETS
    borsa: "Borsa, ekonominin nabzını tutar. Kısa vadeli dalgalanmalar sizi korkutmasın. Warren Buffett'ın dediği gibi, 'Borsa sabırsızlardan sabırlılara para transferi yapar.' Temel analiz yapın, şirketlerin hikayelerini anlayın. Uzun vadeli düşünün.",
    hisse: "Hisse senedi almak, bir şirketin ortağı olmaktır. Şirketin vizyonuna, yönetimine ve sektörüne inanıyor musunuz? Uzun vadeli düşünün, günlük fiyat hareketleri gürültüdür. Temettü ödeyen şirketler pasif gelir sağlar.",
    nasdaq: "Teknoloji, geleceği şekillendiriyor. Nasdaq, bu dönüşümün barometresi. Kısa vadede volatil olabilir ama uzun vadede inovasyon kazanır. Faiz oranları yükseldiğinde teknoloji hisseleri baskı altına girebilir; bu dönemlerde sabırlı olun.",
    sp500: "S&P 500, Amerikan ekonomisinin ve küresel kapitalizmin bir yansıması. Diversifiye bir portföy için temel yapı taşı olabilir. Uzun vadeli bileşik getiri gücünü unutmayın. Düzenli yatırım (DCA) psikolojik olarak daha kolay uygulanır.",
    etf: "ETF'ler, herkes için yatırımı demokratikleştirdi. Düşük maliyetle diversifikasyon sağlıyorlar. Basit tutun; karmaşık stratejiler genellikle basit olanları yenemez. Pasif yatırım, çoğu aktif yöneticiden daha iyi performans gösterir.",
    tahvil: "Tahviller, portföyünüzün dengeleyicisidir. Hisse senetleri düştüğünde genellikle tahviller yükselir. Yaşınız ilerledikçe tahvil ağırlığını artırmak geleneksel bir stratejidir. Faiz ortamı tahvil fiyatlarını etkiler; yükselen faizlerde tahvil fiyatları düşer.",
    
    // BANKING & FUNDS
    fon: "Yatırım fonları, profesyonel yönetim ve çeşitlendirme sunar. Ancak her fon sizin için uygun değildir. Kendi risk profilinizi, yatırım ufkunuzu ve hedeflerinizi belirleyin. Doğru fon, sizin hikayenize uyan fondur. Yönetim ücretlerine dikkat edin.",
    tefas: "TEFAS, Türkiye'deki tüm yatırım fonlarını tek platformda sunar. Fonları karşılaştırırken sadece getiriye değil, riske de bakın. Geçmiş performans gelecek garantisi değildir. Kendi risk toleransınıza uygun fonları seçin.",
    bes: "BES, geleceğinize yatırım yapmaktır. Devlet katkısı önemli bir avantaj. Emeklilik uzak görünebilir ama zaman hızla geçiyor. Bugünden başlamak, yarın için en büyük hediye. Bileşik getirinin gücünü hafife almayın.",
    mevduat: "Mevduat, güvenli liman arayanlar için. Ancak yüksek enflasyon ortamında paranızın satın alma gücü erir. Finansal okuryazarlığınızı geliştirin, paranızı çalıştırmanın yollarını öğrenin. Mevduat tek başına yeterli olmayabilir.",
    
    // FOREX
    dolar: "Döviz kurları makroekonomik dengelerin bir yansımasıdır. Dolar yükseldiğinde endişelenmek yerine, bu durumun size ne öğrettiğini düşünün. Çeşitlendirme, döviz riskine karşı en iyi korumadır. Tek para birimine bağımlı olmayın.",
    euro: "Euro, Avrupa'nın ortak para birimi ve küresel rezerv para statüsünde. Döviz çeşitlendirmesi için düşünülebilir. Ancak kur riski her zaman var; bunu unutmayın. ECB politikaları Euro'nun değerini etkiler.",
    kur: "Kur hareketleri, ülkeler arasındaki ekonomik dengeleri yansıtır. Enflasyon farkları, faiz farkları ve cari denge kur üzerinde etkilidir. Uzun vadede kurlar ekonomik temellere yakınsar. Kısa vadeli spekülasyon risklidir.",
    
    // MACRO DATA
    enflasyon: "Yüksek enflasyon ortamında nakit tutmak, satın alma gücü kaybını garanti eder. Emtia, gayrimenkul ve hisse senetleri tarihsel olarak enflasyona karşı koruma sağlamıştır. Finansal okuryazarlığınızı geliştirmek, enflasyonla mücadelenin ilk adımıdır.",
    faiz: "Faiz oranları ekonominin termometresidir. Yükselen faizler, tasarruf sahipleri için fırsat, borçlular için maliyet demektir. Kendi finansal durumunuzu analiz edin ve faiz ortamına göre stratejinizi uyarlayın. Borçlarınızı yönetin.",
    fed: "Fed kararları tüm dünyayı etkiliyor. Küresel likidite koşullarını belirliyor. Büyük resmi görün; Fed ne yaparsa yapsın, uzun vadeli planınıza sadık kalın. Panik kararları genellikle yanlış kararlardır.",
    tcmb: "Merkez Bankası kararları ekonominin yönünü belirliyor. Faiz, enflasyon, kur dengesi... Karmaşık görünebilir ama temel prensipler basit: Reel getiri pozitif mi? Paranızın değeri korunuyor mu? Bu soruları sorun.",
    
    // BEHAVIORAL FINANCE
    volatilite: "Volatilite, yatırımın doğal bir parçası. Korkmak yerine, bunu fırsat olarak görmeyi öğrenin. Volatilite, giriş fırsatları yaratır. Sabırlı ve disiplinli olun. Piyasa düştüğünde panik yapmayın; bu dönemler uzun vadeli yatırımcılar için fırsattır.",
    fomo: "FOMO (Fear of Missing Out), yatırımcıların en büyük düşmanlarından biri. Herkes alırken almak, kalabalığı takip etmektir. Kendi stratejinize sadık kalın. Kaçırdığınız fırsatlar için üzülmeyin; piyasalar her zaman yeni fırsatlar sunar.",
    fud: "FUD (Fear, Uncertainty, Doubt), piyasaları manipüle etmek için kullanılan bir taktiktir. Korku anlarında soğukkanlı kalın. Temel tezinizi gözden geçirin: Değişen bir şey var mı? Yoksa sadece gürültü mü? Panik satışı genellikle dipte olur.",
    psikoloji: "Yatırım psikolojisi, başarının anahtarıdır. Açgözlülük ve korku, yatırımcıların en büyük düşmanları. Duygusal kararlar yerine kurallara dayalı bir sistem oluşturun. Kayıpları kabul etmek, kazançları korumak kadar önemli.",
    
    // PRODUCT KNOWLEDGE BASE
    "finans kodu": "FİNANS KODU: Kaos İçinde Düzen - Finansal Özgürlük ve Sürdürülebilirlik İçin 'Sistemin Kaynak Kodları'. Teknik bir Excel eğitimi değil, finansal kararların 'Anayasası'dır. Duygularınızı değil, sisteminizi yönetmeyi öğretin. Uzun vadeli düşünmeyi, sabrı ve disiplini öğretiyor.",
    "kaos içinde düzen": "FİNANS KODU: Kaos İçinde Düzen - 10-20 yıllık bileşik getiri odaklı portföy mimarisi. Finansal kararlarınızı duygudan arındırın. Yatırım bir maraton, sprint değil. Bu kitap size o maratonu nasıl koşacağınızı öğretiyor.",
    "prompt kütüphanesi": "AI Prompt Kütüphanesi - Yapay zeka ile sohbet etmeyi bırakın, ona emretmeyi öğrenin. 100+ finansal analiz promptu. AI'ı kişisel finans asistanınıza dönüştürün. Zamanınızı değerli işlere ayırın.",
    "ai prompt": "AI Prompt Kütüphanesi - Finansal analiz için optimize edilmiş 100+ akıllı komut. Saatler süren işleri saniyelere düşüren mühendislik promptları. Teknoloji korkusu yerine, teknolojiyi kendi lehinize kullanın.",
    "algoritmik bülten": "Pro - Algoritmik Strateji ve Analiz Bülteni - Veriyi sağlıyoruz, stratejinizi denetliyoruz. 1 aylık algoritmik veri akışı + 45 dakikalık birebir check-up seansı. Yalnız değilsiniz; yanınızdayız.",
    "pro bülten": "Pro - Algoritmik Strateji ve Analiz Bülteni - Altın Algoritması, Akıllı Fon Sepetleri, Haftalık Sesli Brifing ve 1:1 Finansal Check-Up. Kişisel bir finans koçu gibi düşünün.",
    "ürün": "Dijital ürünlerimiz finansal yolculuğunuzda size rehberlik ediyor: 1) FİNANS KODU: Kaos İçinde Düzen - Finansal anayasanız. 2) AI Prompt Kütüphanesi - Yapay zekayı finans asistanınıza dönüştürün. 3) Pro Bülten - Kişisel finans koçunuz. Hangi ürün hakkında konuşmak istersiniz?",
    
    // PANIC/HYPE REACTIONS
    düşüyor: "Piyasalarda düşüş, panik anlamına gelmez. Volatilite, giriş bedelidir. Temel değere odaklanın, günlük ekrana değil. 'Bu da geçecek' diye düşünün. Tarihsel olarak, piyasalar her krizden sonra toparlanmıştır.",
    yükseliyor: "Yükseliş heyecan verici ama FOMO tehlikeli. Herkes alırken almak, kalabalığı takip etmektir. Kendi stratejinize sadık kalın. Yükselişte kar realizasyonu yapmak da bir stratejidir.",
    almalı: "Al/sat kararı çok kişisel. Risk toleransınız, yatırım ufkunuz, finansal hedefleriniz... Bunları düşünün. Doğru cevap sizin içinizde. Başkalarının ne yaptığına değil, kendi durumunuza odaklanın.",
    satmalı: "Satış kararı da bir strateji. Kar realizasyonu kötü bir şey değil. Ama panikle satmak genellikle pişmanlık getirir. Planınıza sadık kalın. Neden aldığınızı hatırlayın; o neden hala geçerli mi?",
    ne_olur: "Geleceği kimse bilemez. Bunun yerine senaryolar düşünün: İyi senaryo, kötü senaryo, en olası senaryo. Her senaryoya hazırlıklı olun. Diversifikasyon, belirsizliğe karşı en iyi korumadır.",
    
    // DEFAULT
    default: "Finansal yolculuğunuzda size yardımcı olmak isterim. Altın, kripto, borsa, döviz, fonlar, emeklilik planlaması, yatırımcı psikolojisi gibi konularda konuşabiliriz. Hangi konu sizi en çok ilgilendiriyor? Birlikte düşünelim."
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
  const generalKeywords = ["yatırım", "para", "finans", "portföy", "risk", "getiri", "kazanç", "kayıp", "nasıl", "nedir", "ne zaman"];
  const isFinancialQuestion = generalKeywords.some(k => lowerInput.includes(k));

  // Default responses based on persona
  if (persona.name === "Sarp") {
    if (isFinancialQuestion) {
      return responses.default;
    }
    return "Bu konuda metodoloji paylaşabilmem için daha spesifik olmanız gerekiyor. Hangi enstrümanı veya metriği analiz etmek istiyorsunuz? Altın, Bitcoin, borsa, RSI, MACD, Bollinger gibi konularda teknik analiz yapabilirim.";
  } else {
    if (isFinancialQuestion) {
      return responses.default;
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
  const [isTTSLoading, setIsTTSLoading] = useState(false);
  
  // Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pulseIntervalRef = useRef<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null); // For mobile audio control

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

  // ENHANCED Audio unlock using AudioManager (critical for mobile iOS/Android)
  // This must be called IMMEDIATELY in a user gesture handler (touchstart/click)
  const unlockAudio = useCallback(async () => {
    if (isAudioUnlocked) return;
    
    try {
      console.log("[DualPersona] Starting audio unlock via AudioManager...");
      await audioManager.unlockAudio();
      setIsAudioUnlocked(true);
      console.log("[DualPersona] Audio unlock completed successfully");
    } catch (error) {
      console.error("[DualPersona] Audio unlock failed:", error);
      // Still mark as unlocked to allow retry
      setIsAudioUnlocked(true);
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

  // Fallback Web Speech API TTS (in case Azure fails)
  // MUST be defined before speakText to avoid hoisting issues
  const fallbackWebSpeechTTS = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text + " Yatırım tavsiyesi değildir.");
    
    const voices = window.speechSynthesis.getVoices();
    const turkishVoice = voices.find(v => v.lang.startsWith("tr"));
    if (turkishVoice) {
      utterance.voice = turkishVoice;
    }
    
    utterance.lang = "tr-TR";
    utterance.pitch = persona.name === "Sarp" ? 0.9 : 1.0;
    utterance.rate = 0.92;
    
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
  }, [persona, startPulseAnimation, stopPulseAnimation]);

  // Azure Neural TTS - High-Fidelity Voice Synthesis
  // Sarp: tr-TR-AhmetNeural (Male)
  // Vera: tr-TR-EmelNeural (Female)
  // ENHANCED for mobile iOS/Android compatibility
  const speakText = useCallback(async (text: string) => {
    if (!isTTSEnabled) return;
    
    // Cancel any ongoing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    window.speechSynthesis.cancel();
    
    // Determine voice based on persona
    const voiceName = persona.name === "Sarp" 
      ? "tr-TR-AhmetNeural"  // Male voice for Sarp
      : "tr-TR-EmelNeural";  // Female voice for Vera
    
    // Add disclaimer to TTS text (not shown in UI)
    const ttsText = text + " Yatırım tavsiyesi değildir.";
    
    try {
      setIsTTSLoading(true);
      console.log("[DualPersona] Fetching TTS audio for:", voiceName);
      
      // Call backend TTS proxy
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: ttsText,
          voiceName: voiceName,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }
      
      // Get audio blob
      const audioBlob = await response.blob();
      console.log("[DualPersona] Audio blob received, size:", audioBlob.size);
      
      // Use AudioManager for better mobile compatibility
      setIsTTSLoading(false);
      setIsSpeaking(true);
      startPulseAnimation();
      
      try {
        console.log("[DualPersona] Playing audio via AudioManager...");
        await audioManager.playAudioBlob(audioBlob);
        console.log("[DualPersona] Audio playback completed");
      } catch (playError: any) {
        console.error("[DualPersona] AudioManager playback failed:", playError);
        // Fallback to Web Speech API
        fallbackWebSpeechTTS(text);
      } finally {
        setIsSpeaking(false);
        stopPulseAnimation();
      }
      
    } catch (error) {
      console.error("[DualPersona] Azure TTS error:", error);
      setIsTTSLoading(false);
      
      // Fallback to Web Speech API if Azure fails
      console.log("[DualPersona] Falling back to Web Speech API");
      fallbackWebSpeechTTS(text);
    }
  }, [isTTSEnabled, persona, startPulseAnimation, stopPulseAnimation, fallbackWebSpeechTTS]);

  // Handle message sending - MUST be defined before startListening
  const handleSendMessage = useCallback((text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: messageText }]);
    setInputText("");
    
    // Get AI response (without disclaimer in text - it's only in TTS)
    const response = getResponse(messageText, persona);
    
    // Add assistant message
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      speakText(response);
    }, 500);
  }, [inputText, persona, speakText]);

  // ENHANCED Speech recognition for iOS/Android
  // Uses webkitSpeechRecognition for iOS Safari compatibility
  const startListening = useCallback(async () => {
    console.log("[DualPersona] Starting speech recognition...");
    
    // CRITICAL: Unlock audio FIRST on user gesture
    await unlockAudio();
    
    // Get the correct SpeechRecognition constructor (iOS uses webkit prefix)
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("[DualPersona] Speech recognition not supported on this device");
      return;
    }
    
    // Stop any ongoing audio playback
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      stopPulseAnimation();
    }
    
    // Create new recognition instance each time for mobile reliability
    try {
      // Abort previous instance if exists
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore abort errors
        }
      }
      
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "tr-TR";
      recognitionRef.current.continuous = false; // CRITICAL for mobile - one-shot mode
      recognitionRef.current.interimResults = false; // Only final results
      recognitionRef.current.maxAlternatives = 1;
      
      recognitionRef.current.onstart = () => {
        console.log("[DualPersona] Speech recognition started");
        setIsListening(true);
      };
      
      recognitionRef.current.onresult = (event: any) => {
        console.log("[DualPersona] Speech recognition result received");
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        console.log(`[DualPersona] Transcript: "${transcript}" (confidence: ${confidence})`);
        setInputText(transcript);
        // Immediately trigger send after recognition ends
      };
      
      recognitionRef.current.onend = () => {
        console.log("[DualPersona] Speech recognition ended");
        setIsListening(false);
        // If we have input text, send the message
        const currentInput = (document.querySelector('input[placeholder*="sorun"]') as HTMLInputElement)?.value;
        if (currentInput && currentInput.trim()) {
          handleSendMessage(currentInput);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error("[DualPersona] Speech recognition error:", event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onspeechend = () => {
        console.log("[DualPersona] Speech ended, stopping recognition");
        // Recognition will auto-stop due to continuous=false
      };
      
      // Start recognition
      recognitionRef.current.start();
      setIsListening(true);
      
    } catch (error) {
      console.error("[DualPersona] Failed to start speech recognition:", error);
      setIsListening(false);
    }
  }, [isSpeaking, stopPulseAnimation, unlockAudio, handleSendMessage]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Handle widget open
  const handleOpenWidget = useCallback(async () => {
    await unlockAudio();
    setIsOpen(true);
    
    // Send intro message based on persona
    if (messages.length === 0) {
      const introMessage = persona.name === "Sarp" 
        ? `Merhaba, ben Sarp. Veri işleme, optimizasyon ve analitik hesaplamalar benim işim. FİNANS KODU: Kaos İçinde Düzen, AI Prompt Kütüphanesi ve Pro - Algoritmik Strateji ve Analiz Bülteni dijital ürünlerimize göz atmanızı öneririm. Bu dijital ürünler ile ilgili kafanızda soru işareti varsa cevaplayabilirim. Dilerseniz bir yatırım enstrümanını yorumlayabiliriz. Hangi konuda konuşmak istersiniz? Söyleyeceklerim yatırım tavsiyesi değildir.`
        : `Merhaba, ben Vera. Yatırımda mimari ve psikoloji benim işim. FİNANS KODU: Kaos İçinde Düzen, AI Prompt Kütüphanesi ve Pro - Algoritmik Strateji ve Analiz Bülteni dijital ürünlerimize göz atmanızı öneririm. Bu dijital ürünler ile ilgili kafanızda soru işareti varsa cevaplayabilirim. Dilerseniz bir yatırım enstrümanını yorumlayabiliriz. Hangi konuda konuşmak istersiniz? Söyleyeceklerim yatırım tavsiyesi değildir.`;
      
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

  // Listen for custom event to open widget (from Hero CTA button)
  useEffect(() => {
    const handleOpenEvent = () => {
      handleOpenWidget();
    };
    window.addEventListener('openDualPersonaWidget', handleOpenEvent);
    return () => {
      window.removeEventListener('openDualPersonaWidget', handleOpenEvent);
    };
  }, [handleOpenWidget]);

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
                  {isTTSLoading ? "Ses oluşturuluyor..." : isSpeaking ? "Konuşuyor..." : isListening ? "Dinliyor..." : "Çevrimiçi"}
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
                {/* Mic Button - with touch/mouse handlers for audio unlock */}
                <button
                  onClick={isListening ? stopListening : startListening}
                  onTouchStart={async (e) => {
                    e.preventDefault();
                    await audioManager.unlockAudio();
                  }}
                  onMouseDown={async () => {
                    await audioManager.unlockAudio();
                  }}
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
