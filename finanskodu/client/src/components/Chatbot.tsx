/*
  DESIGN: Finans Kodu - Vera AI Assistant
  COMPLIANCE: SPK/BDDK mevzuatına uygun
  
  - 3D-like animated avatar "Vera"
  - Advanced financial knowledge base (7 critical scenarios)
  - Voice Input: Web Speech API (SpeechRecognition)
  - Voice Output: Web Speech API (speechSynthesis) with Turkish prosody
  - Lip-sync and idle animations
  - Mouse tracking for eye contact
  - Zero-cost implementation using native browser APIs
*/

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, AlertTriangle, Mic, MicOff, Volume2, VolumeX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import VeraAvatar from "./VeraAvatar";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const DISCLAIMER = "\n\n⚠️ *Vera bir yapay zeka asistanıdır ve yatırım tavsiyesi vermez. Kararlarınızı kendi araştırmanıza dayanarak veriniz.*";
const VOICE_DISCLAIMER = "Hatırlatmak isterim ki, Vera bir yapay zeka asistanıdır ve yatırım tavsiyesi vermez.";

// Enhanced financial responses with 7 critical scenarios
const getFinancialResponse = (query: string): { text: string; isInvestmentRelated: boolean } => {
  const lowerQuery = query.toLowerCase();
  
  // 1. Kriz Yönetimi (Dolar/Enflasyon)
  if (lowerQuery.includes("dolar") && (lowerQuery.includes("yüksel") || lowerQuery.includes("sıçra") || lowerQuery.includes("panik") || lowerQuery.includes("ne yapmalı"))) {
    return {
      text: `**Döviz Dalgalanması ve Varlık Koruma**

Anlıyorum, döviz kurlarındaki ani hareketler endişe verici olabiliyor. Öncelikle sakin kalmak önemli.

**Panikle Satışın Riskleri:**
• Ani kararlar genellikle en kötü fiyatlardan işlem yapmaya yol açar
• Piyasa dalgalanmaları geçici olabilir
• Duygusal kararlar uzun vadeli planları bozar

**Varlık Koruma Stratejileri:**
• Portföy çeşitlendirmesi - tek bir varlığa bağımlı olmamak
• Kademeli pozisyon alma/çıkma stratejisi
• Enflasyona karşı korumalı varlıklar (altın, döviz, enflasyona endeksli tahviller)
• Acil durum fonu ayırma

**Vera'nın Önerisi:**
Panik anında "satıp çıkayım mı?" sorusu yerine, "portföyüm dengeli mi?" sorusunu sormak daha sağlıklıdır. Uzun vadeli stratejinizi gözden geçirin.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 2. Merkez Bankası Haftaları
  if (lowerQuery.includes("faiz") || lowerQuery.includes("merkez bankası") || lowerQuery.includes("tcmb") || lowerQuery.includes("fed")) {
    return {
      text: `**Merkez Bankası Faiz Kararları ve Etkileri**

Faiz kararları finansal piyasaların en önemli göstergelerinden biridir.

**Faiz Artışının Teorik Etkileri:**
• **Mevduat:** Faiz getirileri artar, tasarruf daha cazip hale gelir
• **Borsa:** Genellikle olumsuz etkilenir (borçlanma maliyeti artar, alternatif getiri yükselir)
• **Kredi:** Kredi maliyetleri yükselir, borçlanma zorlaşır
• **Döviz:** Yerli para genellikle değer kazanır

**Faiz İndiriminin Teorik Etkileri:**
• **Mevduat:** Getiriler düşer, alternatif arayışı başlar
• **Borsa:** Genellikle olumlu etkilenir
• **Kredi:** Borçlanma ucuzlar, tüketim artabilir
• **Döviz:** Yerli para baskı altına girebilir

**Vera'nın Notu:**
Faiz kararları tek başına değil, enflasyon beklentileri, küresel koşullar ve ekonomik büyüme ile birlikte değerlendirilmelidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 3. Borsa Volatilitesi (FOMO/Düşüş)
  if ((lowerQuery.includes("borsa") || lowerQuery.includes("hisse")) && (lowerQuery.includes("yüksel") || lowerQuery.includes("ralli") || lowerQuery.includes("düşüş") || lowerQuery.includes("çöktü") || lowerQuery.includes("fomo"))) {
    return {
      text: `**Borsa Volatilitesi ve Strateji Yaklaşımları**

Piyasa hareketleri duygusal tepkilere yol açabilir. İşte farklı senaryolar için düşünce çerçeveleri:

**Ralli Dönemlerinde (FOMO Riski):**
• "Kaçırıyorum" hissi tehlikeli olabilir
• **Kademeli alım** mantığı: Tüm sermayeyi tek seferde değil, zaman dilimlerine yayarak yatırım
• Tepe fiyatlardan alım riski yüksektir
• "Herkes kazanıyor" dönemleri genellikle dikkatli olunması gereken dönemlerdir

**Düşüş Dönemlerinde:**
• Panik satışı genellikle en kötü stratejidir
• **Maliyet düşürme** stratejisi: Düşen fiyatlardan ekleme yaparak ortalama maliyeti düşürme
• Bekleme stratejisi: Uzun vadeli yatırımcılar için dalgalanmalar normaldir
• Portföy gözden geçirme fırsatı

**Vera'nın Hatırlatması:**
Piyasa zamanlaması çok zordur. Disiplinli ve planlı yaklaşım, duygusal kararlardan daha sağlıklı sonuçlar verir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 4. Toplu Para (Life Events)
  if (lowerQuery.includes("eyt") || lowerQuery.includes("miras") || lowerQuery.includes("ev sattım") || lowerQuery.includes("toplu para") || lowerQuery.includes("tazminat") || lowerQuery.includes("emekli")) {
    return {
      text: `**Toplu Para Yönetimi (EYT, Miras, Tazminat)**

Hayatınızda önemli bir finansal olay yaşadığınızı anlıyorum. Toplu para geldiğinde doğru adımlar atmak kritik önem taşır.

**Enflasyona Karşı Koruma Sepeti Mantığı:**
• **Mevduat (%30-40):** Acil ihtiyaçlar ve güvenlik için
• **Altın (%20-30):** Enflasyon koruması ve çeşitlendirme
• **Yatırım Fonları (%20-30):** Profesyonel yönetim ve çeşitlendirme
• **Hisse/Borsa (%10-20):** Uzun vadeli büyüme potansiyeli (risk toleransına göre)

**Kritik Uyarılar:**
• Acele etmeyin - Paranızı anlamak için zaman ayırın
• Tek bir varlığa yatırmayın - Çeşitlendirme şart
• Güvenilir olmayan "fırsatlara" dikkat
• Vergi yükümlülüklerinizi araştırın

**Vera'nın Önerisi:**
İlk 3 ay boyunca paranın tamamını mevduatta tutup, bu sürede finansal okuryazarlığınızı artırmanız mantıklı olabilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 5. Dönemsellik (Yıl sonu, Bilanço)
  if (lowerQuery.includes("yıl sonu") || lowerQuery.includes("vergi") || lowerQuery.includes("bilanço") || lowerQuery.includes("temettü") || lowerQuery.includes("kar payı")) {
    return {
      text: `**Dönemsel Finansal Fırsatlar ve Dikkat Noktaları**

Finansal takvim, yatırımcılar için önemli dönemler içerir.

**Yıl Sonu (Aralık-Ocak):**
• Vergi avantajlı yatırımlar için son fırsatlar
• BES katkı payı limitleri
• Portföy yeniden dengeleme zamanı
• Zarar/kar realizasyonu değerlendirmesi

**Bilanço Dönemleri (Mart, Haziran, Eylül, Aralık):**
• Şirket finansalları açıklanır
• Temettü dağıtım kararları
• Hisse fiyatlarında volatilite artabilir
• Sektör karşılaştırmaları için ideal dönem

**Temettü Sezonu (Genellikle Mart-Mayıs):**
• Yüksek temettü veren şirketler öne çıkar
• "Temettü avcılığı" stratejisi
• Hak ediş tarihleri önemli

**Vera'nın Hatırlatması:**
Dönemsel fırsatları değerlendirirken, uzun vadeli stratejinizi gözden kaçırmayın.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 6. Gümüş Yatırımı (YENİ)
  if (lowerQuery.includes("gümüş") || lowerQuery.includes("gumus") || lowerQuery.includes("silver")) {
    return {
      text: `**Gümüş Yatırımı Analizi**

Gümüş, altından farklı dinamiklere sahip ilginç bir yatırım aracıdır.

**Gümüşün Özellikleri:**
• **Endüstriyel Kullanım:** Elektronik, güneş panelleri, tıbbi cihazlar, fotoğrafçılık
• Altının aksine, gümüşün %50'den fazlası endüstriyel amaçlı kullanılır
• Ekonomik büyüme dönemlerinde talep artabilir

**Altın/Gümüş Rasyosu:**
• Tarihsel ortalama: 60-70 arası
• Rasyo yüksekse (80+): Gümüş görece ucuz sayılabilir
• Rasyo düşükse (50-): Gümüş görece pahalı sayılabilir

**Fırsatlar:**
• Altına göre daha düşük giriş maliyeti
• Endüstriyel talep artışı potansiyeli (yeşil enerji)
• Portföy çeşitlendirmesi

**Riskler:**
• Altına göre **çok daha volatil** (2-3 kat daha fazla dalgalanma)
• Endüstriyel talebe bağımlılık (resesyonda düşebilir)
• Depolama ve saklama maliyetleri (fiziksel için)

**Vera'nın Notu:**
Gümüş, risk toleransı yüksek yatırımcılar için portföyün küçük bir bölümünde değerlendirilebilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // 7. ABD Borsaları (YENİ)
  if (lowerQuery.includes("abd") || lowerQuery.includes("amerika") || lowerQuery.includes("nasdaq") || lowerQuery.includes("s&p") || lowerQuery.includes("dow jones") || lowerQuery.includes("apple") || lowerQuery.includes("tesla") || lowerQuery.includes("nvidia") || lowerQuery.includes("yurt dışı hisse")) {
    return {
      text: `**ABD Borsaları ve Yurt Dışı Hisse Yatırımı**

ABD borsaları, dünyanın en büyük ve en likit piyasalarıdır.

**Erişim Yolları:**
• Türk aracı kurumlar üzerinden yurt dışı hisse alımı
• Yabancı hisse senedi fonları
• ETF'ler (SPY, QQQ vb.)

**Potansiyel Avantajlar:**
• Dolar bazlı getiri
• Küresel şirketlere erişim
• Çeşitlendirme imkanı
• Yüksek likidite

**⚠️ KRİTİK: VERGİLENDİRME UYARISI**
Yurt dışı hisse gelirleri Türkiye'de **beyana tabidir:**
• Temettü gelirleri beyan edilmelidir
• Alım-satım kazançları beyan edilmelidir
• Çifte vergilendirmeyi önleme anlaşmaları incelenmelidir
• Vergi danışmanınıza başvurmanız şiddetle önerilir

**Riskler:**
• Kur riski (TL/USD dalgalanmaları)
• Farklı piyasa saatleri
• Bilgi asimetrisi (şirketleri tanımama)

**Vera'nın Önerisi:**
Yurt dışı yatırım yapmadan önce vergi yükümlülüklerinizi detaylı araştırın ve gerekirse bir mali müşavire danışın.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Altın
  if (lowerQuery.includes("altın") || lowerQuery.includes("altin")) {
    return {
      text: `**Altın Analizi**

Altın, tarih boyunca "güvenli liman" olarak kabul edilen bir yatırım aracıdır.

**Potansiyel Fırsatlar:**
• Enflasyona karşı koruma sağlayabilir
• Ekonomik belirsizlik dönemlerinde değer kazanma eğilimi gösterebilir
• Portföy çeşitlendirmesi için kullanılabilir
• Fiziksel olarak saklanabilir

**Dikkat Edilmesi Gereken Riskler:**
• Faiz oranları yükseldiğinde cazibesini kaybedebilir
• Dolar/TL kuru dalgalanmaları gram altın fiyatını etkiler
• Kısa vadede volatilite gösterebilir
• Getiri sağlamaz (temettü, faiz yok)

Altın yatırımı yapmadan önce, portföyünüzdeki oranını ve yatırım vadenizi belirlemeniz önemlidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Bitcoin / Kripto
  if (lowerQuery.includes("bitcoin") || lowerQuery.includes("kripto") || lowerQuery.includes("btc") || lowerQuery.includes("ethereum") || lowerQuery.includes("eth")) {
    return {
      text: `**Kripto Para Analizi**

Kripto paralar, merkeziyetsiz dijital varlıklar olarak yüksek volatilite ve risk/getiri potansiyeli sunar.

**Potansiyel Fırsatlar:**
• Yüksek getiri potansiyeli (tarihsel performans gelecek garantisi değildir)
• 7/24 işlem yapılabilirlik
• Merkeziyetsiz yapı
• Blockchain teknolojisinin büyüme potansiyeli

**Dikkat Edilmesi Gereken Riskler:**
• Aşırı volatilite - %50+ düşüşler yaşanabilir
• Regülasyon belirsizlikleri
• Siber güvenlik riskleri
• Piyasa manipülasyonuna açıklık
• Türkiye'de ödeme aracı olarak kullanımı yasaktır

Kripto paralara yatırım yaparken, kaybetmeyi göze alabileceğiniz miktarı aşmamanız kritik önem taşır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Hisse Senedi (genel)
  if (lowerQuery.includes("hisse") || lowerQuery.includes("borsa") || lowerQuery.includes("bist") || lowerQuery.includes("pay")) {
    return {
      text: `**Hisse Senedi Analizi**

Hisse senetleri, şirketlerin ortaklık paylarını temsil eden ve uzun vadede enflasyonun üzerinde getiri potansiyeli sunan yatırım araçlarıdır.

**Potansiyel Fırsatlar:**
• Uzun vadede enflasyonun üzerinde getiri potansiyeli
• Temettü geliri imkanı
• Şirket büyümesinden pay alma
• Likidite avantajı

**Dikkat Edilmesi Gereken Riskler:**
• Piyasa riski - genel düşüşlerden etkilenme
• Şirkete özgü riskler (yönetim, sektör, rekabet)
• Kısa vadede yüksek volatilite
• Duygusal kararlar verme riski

Hisse senedi yatırımında temel ve teknik analiz bilgisi, portföy çeşitlendirmesi ve uzun vadeli bakış açısı önemlidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Fon
  if (lowerQuery.includes("fon") || lowerQuery.includes("yatırım fonu") || lowerQuery.includes("emeklilik")) {
    return {
      text: `**Yatırım Fonu Analizi**

Yatırım fonları, profesyonel yönetim altında çeşitlendirilmiş portföy imkanı sunan kolektif yatırım araçlarıdır.

**Potansiyel Fırsatlar:**
• Profesyonel portföy yönetimi
• Küçük tutarlarla çeşitlendirme imkanı
• Farklı risk profillerine uygun seçenekler
• BES fonlarında devlet katkısı avantajı

**Dikkat Edilmesi Gereken Riskler:**
• Yönetim ücreti ve komisyonlar getiriyi azaltır
• Fon yöneticisi performansına bağımlılık
• Bazı fonlarda likidite kısıtlamaları
• Piyasa koşullarından etkilenme

Fon seçerken, yönetim ücretleri, geçmiş performans ve fon stratejisini incelemeniz önerilir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Döviz (genel)
  if (lowerQuery.includes("euro") || lowerQuery.includes("döviz") || lowerQuery.includes("doviz")) {
    return {
      text: `**Döviz Analizi**

Döviz yatırımı, farklı para birimlerinin değer değişimlerinden faydalanmayı hedefleyen bir yatırım stratejisidir.

**Potansiyel Fırsatlar:**
• TL değer kaybına karşı koruma
• Uluslararası çeşitlendirme
• Yüksek likidite
• 7/24 piyasa erişimi (forex)

**Dikkat Edilmesi Gereken Riskler:**
• Kur volatilitesi
• Merkez bankası müdahaleleri
• Faiz oranı farklılıkları
• Kaldıraçlı işlemlerde yüksek kayıp riski

Döviz yatırımı yaparken, makroekonomik göstergeleri ve merkez bankası politikalarını takip etmek önemlidir.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Genel yatırım sorusu
  if (lowerQuery.includes("yatırım") || lowerQuery.includes("ne yapmalı") || lowerQuery.includes("öneri")) {
    return {
      text: `**Yatırım Stratejisi Hakkında**

Doğru yatırım stratejisi, kişisel finansal durumunuza, risk toleransınıza ve yatırım vadenize bağlıdır.

**Temel Prensipler:**
• Risk toleransınızı belirleyin
• Yatırım vadenizi netleştirin
• Portföyünüzü çeşitlendirin
• Duygusal kararlardan kaçının
• Düzenli olarak portföyünüzü gözden geçirin

**Vera'nın Yaklaşımı:**
Ben spesifik "AL" veya "SAT" tavsiyeleri vermiyorum. Bunun yerine, kendi yatırım kararlarınızı verebilmeniz için gerekli analitik çerçeveyi sunuyorum.

Finansal okuryazarlık ve disiplinli bir yaklaşım, uzun vadeli başarının anahtarıdır.${DISCLAIMER}`,
      isInvestmentRelated: true
    };
  }
  
  // Vera/Finans Kodu hakkında
  if (lowerQuery.includes("vera") || lowerQuery.includes("sen kim") || lowerQuery.includes("finans kodu") || lowerQuery.includes("ne yapıyor")) {
    return {
      text: `**Merhaba, Ben Vera! 👋**

Finans Kodu'nun yapay zeka asistanıyım. Size finansal konularda eğitici bilgiler sunmak için buradayım.

**Benim Özelliklerim:**
• Sesli ve yazılı sohbet desteği
• Finansal kavramları anlaşılır şekilde açıklama
• Piyasa dinamikleri hakkında genel bilgi
• Risk ve fırsat analizi çerçevesi sunma

**Finans Kodu Hakkında:**
• AI Prompt Kütüphanesi - Finansal analizler için hazır promptlar
• Otomasyon Araçları - Excel'den algoritmik finansa geçiş
• Eğitim İçerikleri - Dijital dönüşüm rehberleri
• Topluluk - Finans profesyonelleri forumu

**Önemli Not:**
Ben bir yapay zeka asistanıyım ve yatırım tavsiyesi vermiyorum. Amacım eğitici ve analitik bilgi sunmaktır.

Ürünlerimizi incelemek için "Dijital Ürünler" bölümümüzü ziyaret edebilirsiniz!`,
      isInvestmentRelated: false
    };
  }
  
  // Default response
  return {
    text: `Merhaba! Ben **Vera**, Finans Kodu'nun AI asistanıyım. 👋

Size finansal konularda yardımcı olabilirim. İşte konuşabileceğimiz bazı konular:

**Yatırım Araçları:**
• "Altın yatırımı hakkında bilgi ver"
• "Gümüş yatırımı nasıl yapılır?"
• "Bitcoin riskleri neler?"
• "ABD borsalarına nasıl yatırım yapılır?"

**Piyasa Durumları:**
• "Dolar yükselirse ne yapmalıyım?"
• "Faiz kararları piyasayı nasıl etkiler?"
• "Borsa düşüşünde ne yapmalı?"

**Özel Durumlar:**
• "EYT paramı nasıl değerlendirmeliyim?"
• "Miras kaldı, ne yapmalıyım?"

Mikrofon butonuna basarak sesli soru da sorabilirsiniz! 🎤

*Not: Ben yatırım tavsiyesi vermiyorum, amacım eğitici bilgi sunmaktır.*`,
    isInvestmentRelated: false
  };
};

// Process text for better Turkish prosody
const processTextForSpeech = (text: string): string => {
  return text
    .replace(/\*\*/g, "") // Remove bold
    .replace(/\*/g, "") // Remove italic
    .replace(/•/g, "") // Remove bullets
    .replace(/⚠️/g, "") // Remove emoji
    .replace(/👋/g, "") // Remove emoji
    .replace(/🎤/g, "") // Remove emoji
    .replace(/,/g, ", ") // Add pause after comma
    .replace(/\./g, ". ") // Add pause after period
    .replace(/\?/g, "? ") // Add pause after question
    .replace(/:/g, ": ") // Add pause after colon
    .replace(/\n+/g, ". ") // Replace newlines with periods
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Merhaba! Ben Vera, Finans Kodu'nun AI asistanıyım. 👋 Finansal konularda size yardımcı olabilirim. Yazarak veya mikrofon butonuna basarak sesli soru sorabilirsiniz!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [showAvatar, setShowAvatar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Check for Web Speech API support
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasSpeechRecognition = !!SpeechRecognitionAPI;
    const hasSpeechSynthesis = "speechSynthesis" in window;
    
    setSpeechSupported(hasSpeechRecognition && hasSpeechSynthesis);
    
    if (hasSpeechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
    
    if (hasSpeechRecognition) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "tr-TR";
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        let interimTranscript = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setInput(finalTranscript);
        } else if (interimTranscript) {
          setInput(interimTranscript);
        }
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text-to-Speech function with improved Turkish prosody
  const speakText = useCallback((text: string, isInvestmentRelated: boolean) => {
    if (!synthRef.current || !ttsEnabled) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const processedText = processTextForSpeech(text);
    const fullText = isInvestmentRelated 
      ? `${processedText} ${VOICE_DISCLAIMER}`
      : processedText;
    
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "tr-TR";
    utterance.rate = 0.9; // Slightly slower for authority
    utterance.pitch = 0.95; // Slightly lower for trust
    utterance.volume = 1.0;
    
    // Try to find a Turkish voice
    const voices = synthRef.current.getVoices();
    const turkishVoice = voices.find(voice => voice.lang.startsWith("tr"));
    if (turkishVoice) {
      utterance.voice = turkishVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  }, [ttsEnabled]);

  // Toggle microphone
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Cancel any ongoing speech when starting to listen
      if (synthRef.current) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  }, [isListening]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const { text: response, isInvestmentRelated } = getFinancialResponse(currentInput);
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Speak the response
      speakText(response, isInvestmentRelated);
    }, 1000);
  }, [input, messages.length, isListening, speakText]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button - Sticky bottom right */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-primary/30 hover:shadow-xl transition-all flex items-center justify-center group ${isOpen ? "hidden" : ""}`}
        aria-label="Vera'yı aç"
      >
        <div className="relative">
          <Sparkles className="w-6 h-6 absolute -top-1 -right-1 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          <MessageCircle className="w-7 h-7" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-3rem)] h-[700px] max-h-[calc(100vh-6rem)] glass-card rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-primary/20"
          >
            {/* Header with Vera branding */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-secondary/80 to-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/30">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm flex items-center gap-2">
                    Vera
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">AI</span>
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {speechSupported && (
                      <>
                        <Mic className="w-3 h-3" />
                        Sesli Asistan
                      </>
                    )}
                    {!speechSupported && "Finans Kodu Asistan"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Avatar Toggle */}
                <button
                  onClick={() => setShowAvatar(!showAvatar)}
                  className={`p-2 rounded-lg transition-colors ${
                    showAvatar ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                  }`}
                  aria-label={showAvatar ? "Avatarı gizle" : "Avatarı göster"}
                  title={showAvatar ? "Avatarı gizle" : "Avatarı göster"}
                >
                  <Bot className="w-4 h-4" />
                </button>
                {/* TTS Toggle */}
                {speechSupported && (
                  <button
                    onClick={() => {
                      if (isSpeaking) stopSpeaking();
                      setTtsEnabled(!ttsEnabled);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      ttsEnabled ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                    }`}
                    aria-label={ttsEnabled ? "Sesli yanıtı kapat" : "Sesli yanıtı aç"}
                    title={ttsEnabled ? "Sesli yanıt açık" : "Sesli yanıt kapalı"}
                  >
                    {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                )}
                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Vera'yı kapat"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Vera Avatar Section */}
            <AnimatePresence>
              {showAvatar && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 200, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-border bg-gradient-to-b from-secondary/30 to-transparent overflow-hidden"
                >
                  <VeraAvatar 
                    isSpeaking={isSpeaking} 
                    isListening={isListening}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Disclaimer Banner */}
            <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-500/90">
                Vera bir AI asistanıdır ve yatırım tavsiyesi vermez.
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === "user"
                        ? "bg-primary/10"
                        : "bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary text-secondary-foreground rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              {/* Speaking indicator */}
              {isSpeaking && (
                <div className="flex justify-center">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                    <div className="flex gap-0.5">
                      <span className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "100ms" }} />
                      <span className="w-1 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
                      <span className="w-1 h-5 bg-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                      <span className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
                    </div>
                    <span className="text-xs text-primary">Vera konuşuyor...</span>
                    <button
                      onClick={stopSpeaking}
                      className="p-1 hover:bg-primary/20 rounded-full transition-colors"
                      aria-label="Konuşmayı durdur"
                    >
                      <VolumeX className="w-3 h-3 text-primary" />
                    </button>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-secondary/30">
              {/* Listening indicator */}
              {isListening && (
                <div className="flex items-center justify-center gap-2 mb-3 py-2 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="relative">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  </div>
                  <span className="text-xs text-red-400">Vera dinliyor... Konuşmaya başlayın</span>
                </div>
              )}
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? "Konuşun..." : "Vera'ya sorunuzu yazın..."}
                  className="flex-1 px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground text-sm"
                  disabled={isListening}
                />
                
                {/* Microphone Button - Only show if supported */}
                {speechSupported && (
                  <Button
                    onClick={toggleListening}
                    className={`px-4 transition-all ${
                      isListening 
                        ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" 
                        : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                    }`}
                    aria-label={isListening ? "Dinlemeyi durdur" : "Sesli soru sor"}
                    title={isListening ? "Dinlemeyi durdur" : "Sesli soru sor"}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                )}
                
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4"
                  aria-label="Mesaj gönder"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Voice feature hint */}
              {speechSupported && !isListening && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  🎤 Mikrofona basarak Vera'ya sesli soru sorabilirsiniz
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
