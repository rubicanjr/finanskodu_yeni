/**
 * Kaynak Kütüphanesi — /kaynak-kutuphanesi
 *
 * Akış:
 *  1. 20 dosya kartı grid halinde listelenir.
 *  2. "İndir" butonuna basıldığında backdrop-blur modal açılır.
 *  3. Kullanıcı Ad Soyad + E-posta girer, "Kaydet ve İndir" butonuna basar.
 *  4. Bilgiler Firebase Firestore > kaynak_indirenler koleksiyonuna kaydedilir.
 *  5. Firebase Storage'dan dosyanın download URL'si çekilir ve indirme başlatılır.
 */

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Library, Download, X, FileText, FileSpreadsheet, Loader2, CheckCircle2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

// ─── Dosya listesi ────────────────────────────────────────────────────────────
interface Dosya {
  id: number;
  baslik: string;
  aciklama: string;
  storageFileName: string;
  tur: "pdf" | "xlsx";
}

const dosyalar: Dosya[] = [
  {
    id: 1,
    baslik: "Finansal Analiz Prompt Şablonları",
    aciklama: "Finansal analiz için hazır AI prompt şablonları. Bilanço okuma, nakit akışı yorumlama ve sektör karşılaştırması için kullanıma hazır promptlar.",
    storageFileName: "1_Finansal_Analiz_Prompt_Sablonlari.pdf",
    tur: "pdf",
  },
  {
    id: 2,
    baslik: "AI ile Hisse Analizi Rehberi",
    aciklama: "Yapay zeka araçlarını kullanarak hisse senedi analizi yapmanın adım adım rehberi. Temel ve teknik analizi AI ile nasıl birleştireceğinizi öğrenin.",
    storageFileName: "2_AI_ile_Hisse_Analizi_Rehberi.pdf",
    tur: "pdf",
  },
  {
    id: 3,
    baslik: "Finansal Rapor Okuma Prompt Kılavuzu",
    aciklama: "Şirket finansal raporlarını (10-K, bilanço, gelir tablosu) AI yardımıyla hızlı ve doğru okumak için prompt kılavuzu.",
    storageFileName: "3_Finansal_Rapor_Okuma_Prompt_Kilavuzu.pdf",
    tur: "pdf",
  },
  {
    id: 4,
    baslik: "Gürültü Filtresi Haber Analiz Şablonu",
    aciklama: "Finansal haberleri sinyal ve gürültü olarak ayırt eden, piyasa etkisini ölçen sistematik haber analiz şablonu.",
    storageFileName: "4_Gurultu_Filtresi_Haber_Analiz_Sablonu.pdf",
    tur: "pdf",
  },
  {
    id: 5,
    baslik: "Kişisel Portföy Takip Şablonu",
    aciklama: "Tüm varlıklarınızı tek bir Excel dosyasında takip edin. Otomatik getiri hesaplama, ağırlık dağılımı ve performans grafikleri dahil.",
    storageFileName: "5_Kisisel_Portfoy_Takip_Sablonu.xlsx",
    tur: "xlsx",
  },
  {
    id: 6,
    baslik: "Risk/Getiri Hesaplama Aracı",
    aciklama: "Sharpe oranı, maksimum düşüş (max drawdown) ve volatilite hesaplamalarını otomatik yapan Excel aracı.",
    storageFileName: "6_Risk_Getiri_Hesaplama_Araci.xlsx",
    tur: "xlsx",
  },
  {
    id: 7,
    baslik: "Duygusal Yatırım Hataları Kontrol Listesi",
    aciklama: "FOMO, panik satışı ve aşırı güven gibi 20+ bilişsel hatayı tanımlayan ve önlemenize yardımcı olan kontrol listesi.",
    storageFileName: "7_Duygusal_Yatirim_Hatalari_Kontrol_Listesi.pdf",
    tur: "pdf",
  },
  {
    id: 8,
    baslik: "Karar Matrisi Şablonu",
    aciklama: "Yatırım kararlarını duygudan bağımsız, sistematik biçimde değerlendiren ağırlıklı karar matrisi şablonu.",
    storageFileName: "8_Karar_Matrisi_Sablonu.pdf",
    tur: "pdf",
  },
  {
    id: 9,
    baslik: "Bileşik Getiri Hesaplayıcı",
    aciklama: "Farklı yatırım senaryolarında bileşik faizin uzun vadeli etkisini görselleştiren interaktif Excel hesaplayıcı.",
    storageFileName: "9_Bilesik_Getiri_Hesaplayici.xlsx",
    tur: "xlsx",
  },
  {
    id: 10,
    baslik: "Varlık Dağılımı Şablonu",
    aciklama: "Hisse, tahvil, emtia ve alternatif varlıklar arasında optimal dağılımı hesaplayan ve görselleştiren Excel şablonu.",
    storageFileName: "10_Varlik_Dagilimi_Sablonu.xlsx",
    tur: "xlsx",
  },
  {
    id: 11,
    baslik: "BIST100 Temel Analiz Şablonu",
    aciklama: "BIST100 hisselerini F/K, PD/DD, EV/EBITDA gibi temel göstergelerle karşılaştırmalı analiz eden PDF rehberi.",
    storageFileName: "11_BIST100_Temel_Analiz_Sablonu.pdf",
    tur: "pdf",
  },
  {
    id: 12,
    baslik: "Altın Takip Aracı",
    aciklama: "Gram altın, ons altın ve altın/dolar paritesini takip eden, alım-satım noktalarını işaretleyen Excel aracı.",
    storageFileName: "12_Altin_Takip_Araci.xlsx",
    tur: "xlsx",
  },
  {
    id: 13,
    baslik: "TEFAS Fon Karşılaştırma Rehberi",
    aciklama: "TEFAS'taki yatırım fonlarını getiri, risk ve maliyet açısından sistematik biçimde karşılaştırma rehberi.",
    storageFileName: "13_TEFAS_Fon_Karsilastirma_Rehberi.pdf",
    tur: "pdf",
  },
  {
    id: 14,
    baslik: "Makroekonomik Gösterge Takip Listesi",
    aciklama: "Enflasyon, faiz, işsizlik ve büyüme gibi kritik makroekonomik göstergeleri takip etmek için sistematik liste.",
    storageFileName: "14_Makroekonomik_Gosterge_Takip_Listesi.pdf",
    tur: "pdf",
  },
  {
    id: 15,
    baslik: "Finansal Terimler Sözlüğü",
    aciklama: "200+ finansal terimi sade Türkçe ile açıklayan, yatırımcılar için hazırlanmış kapsamlı sözlük.",
    storageFileName: "15_Finansal_Terimler_Sozlugu.pdf",
    tur: "pdf",
  },
  {
    id: 16,
    baslik: "Yeni Başlayanlar İçin Yatırım Kontrol Listesi",
    aciklama: "Yatırıma yeni başlayanların yapması gereken 30 adımı sıralayan, öncelik sırasına göre düzenlenmiş kontrol listesi.",
    storageFileName: "16_Yeni_Baslayanlar_Icin_Yatirim_Kontrol_Listesi.pdf",
    tur: "pdf",
  },
  {
    id: 17,
    baslik: "Enflasyona Karşı Birikim Rehberi",
    aciklama: "Yüksek enflasyon ortamında satın alma gücünü korumanın yollarını anlatan pratik birikim rehberi.",
    storageFileName: "17_Enflasyona_Karsi_Birikim_Rehberi.pdf",
    tur: "pdf",
  },
  {
    id: 18,
    baslik: "Finans Kodu Excel Kısayolları",
    aciklama: "Finansal analizde en çok kullanılan Excel kısayolları ve formülleri. Verimliliğinizi artıracak pratik rehber.",
    storageFileName: "18_Finans_Kodu_Excel_Kisayollari.pdf",
    tur: "pdf",
  },
  {
    id: 19,
    baslik: "Aylık Bütçe Şablonu",
    aciklama: "Gelir, gider ve tasarruf hedeflerini takip eden, aylık bütçe planlaması için hazır Excel şablonu.",
    storageFileName: "19_Aylik_Butce_Sablonu.xlsx",
    tur: "xlsx",
  },
  {
    id: 20,
    baslik: "Finansal Hedef Planlama Tablosu",
    aciklama: "Kısa, orta ve uzun vadeli finansal hedefleri belirleyip takip etmek için yapılandırılmış planlama tablosu.",
    storageFileName: "20_Finansal_Hedef_Planlama_Tablosu.xlsx",
    tur: "xlsx",
  },
];

// ─── Modal bileşeni ───────────────────────────────────────────────────────────
interface ModalProps {
  dosya: Dosya;
  onClose: () => void;
}

function IndirmeModal({ dosya, onClose }: ModalProps) {
  const [adSoyad, setAdSoyad] = useState("");
  const [email, setEmail] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [basarili, setBasarili] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!adSoyad.trim() || !email.trim()) {
      setHata("Lütfen tüm alanları doldurun.");
      return;
    }
    setHata(null);
    setYukleniyor(true);

    try {
      // 1. Firestore'a kaydet
      try {
        await addDoc(collection(db, "kaynak_indirenler"), {
          ad_soyad: adSoyad.trim(),
          email: email.trim().toLowerCase(),
          dosya_adi: dosya.storageFileName,
          dosya_basligi: dosya.baslik,
          tarih: serverTimestamp(),
        });
      } catch (firestoreErr: unknown) {
        // Firestore hatası indirmeyi durdurmasın — logluyoruz ama devam ediyoruz
        console.warn("Firestore kayıt hatası (indirme devam ediyor):", firestoreErr);
      }

      // 2. Firebase Storage'dan download URL çek
      const fileRef = ref(storage, dosya.storageFileName);
      const downloadURL = await getDownloadURL(fileRef);

      // 3. İndirmeyi başlat — window.open daha güvenilir (popup blocker'a takılmaz)
      window.open(downloadURL, "_blank", "noopener,noreferrer");

      setBasarili(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: unknown) {
      console.error("İndirme hatası:", err);
      // Firebase hata kodunu kullanıcıya göster
      const firebaseErr = err as { code?: string; message?: string };
      const code = firebaseErr?.code ?? "";
      const msg = firebaseErr?.message ?? "";

      if (code.includes("object-not-found") || msg.includes("object-not-found")) {
        setHata("İndirmek istediğiniz dosya henüz yüklenmemiş. Lütfen daha sonra tekrar deneyin.");
      } else if (code.includes("unauthorized") || code.includes("permission-denied") || msg.includes("permission")) {
        setHata("Erişim izni hatası. Lütfen bizimle iletişime geçin: info@finanskodu.com");
      } else if (code.includes("unauthenticated")) {
        setHata("Kimlik doğrulama hatası. Lütfen sayfayı yenileyip tekrar deneyin.");
      } else if (msg.includes("CORS") || msg.includes("cors") || msg.includes("network")) {
        setHata("Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.");
      } else {
        // Tam hata kodunu göster - debug için
        setHata(`Hata: ${code || msg || "Bilinmeyen hata"} — Lütfen info@finanskodu.com adresine bildirin.`);
      }
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(12px)", background: "rgba(10,13,18,0.75)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md rounded-2xl p-6"
        style={{
          background: "var(--card)",
          border: "1px solid rgba(0,212,255,0.2)",
          boxShadow: "0 0 40px rgba(0,212,255,0.08)",
        }}
      >
        {/* Kapat */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors hover:bg-white/10"
          aria-label="Kapat"
        >
          <X size={18} style={{ color: "var(--muted-foreground)" }} />
        </button>

        {/* Başarı durumu */}
        {basarili ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle2 size={48} style={{ color: "#00D4FF" }} />
            <p className="font-semibold text-lg" style={{ color: "var(--foreground)" }}>
              İndirme başladı!
            </p>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Dosya tarayıcınıza indiriliyor.
            </p>
          </div>
        ) : (
          <>
            {/* Başlık */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs tracking-widest" style={{ color: "#00D4FF" }}>
                  // ÜCRETSİZ İNDİR
                </span>
              </div>
              <h2
                className="font-bold text-lg leading-snug"
                style={{ color: "var(--foreground)", fontFamily: "var(--font-syne)" }}
              >
                {dosya.baslik}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="adSoyad"
                  className="text-xs font-medium"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Ad Soyad
                </label>
                <input
                  id="adSoyad"
                  type="text"
                  value={adSoyad}
                  onChange={(e) => setAdSoyad(e.target.value)}
                  placeholder="Rubi Can İçliyürek"
                  required
                  className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  E-posta
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  required
                  className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              {hata && (
                <p className="text-xs rounded-lg px-3 py-2" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>
                  {hata}
                </p>
              )}

              <button
                type="submit"
                disabled={yukleniyor}
                className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-sm transition-all"
                style={{
                  background: yukleniyor ? "rgba(0,212,255,0.5)" : "#00D4FF",
                  color: "#0a0d12",
                  cursor: yukleniyor ? "not-allowed" : "pointer",
                }}
              >
                {yukleniyor ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Kaydet ve İndir
                  </>
                )}
              </button>

              <p className="text-center text-xs" style={{ color: "var(--muted-foreground)" }}>
                Bilgileriniz yalnızca Finans Kodu topluluğu ile paylaşılır, üçüncü taraflara verilmez.
              </p>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

// ─── Ana sayfa ────────────────────────────────────────────────────────────────
export default function KaynakKutuphanesiPage() {
  const [secilenDosya, setSecilenDosya] = useState<Dosya | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Kaynak Kütüphanesi | Ücretsiz Finans Araçları | Finans Kodu</title>
        <meta
          name="description"
          content="Finans Kodu kaynak kütüphanesi: 20 ücretsiz finansal araç, Excel şablonu ve PDF rehberi. Portföy takibi, risk hesaplama, AI prompt şablonları ve daha fazlası."
        />
        <meta
          name="keywords"
          content="ücretsiz finans şablonu, portföy takip excel, risk getiri hesaplama, finansal analiz araçları, BIST100 analiz"
        />
        <link rel="canonical" href="https://finanskodu.com/kaynak-kutuphanesi" />
        <meta property="og:title" content="Kaynak Kütüphanesi | Finans Kodu" />
        <meta property="og:description" content="20 ücretsiz finansal araç, Excel şablonu ve PDF rehberi. Algoritmik yatırım için kapsamlı kaynak merkezi." />
        <meta property="og:url" content="https://finanskodu.com/kaynak-kutuphanesi" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finanskodu.com" },
            { "@type": "ListItem", "position": 2, "name": "Kaynak Kütüphanesi", "item": "https://finanskodu.com/kaynak-kutuphanesi" },
          ],
        })}</script>
      </Helmet>

      {/* Arka plan grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 py-16 px-4">
        <div className="container max-w-6xl mx-auto">

          {/* ── Başlık ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Library size={20} style={{ color: "var(--fk-cyan)" }} />
              <span
                className="font-mono text-xs tracking-[0.15em]"
                style={{ color: "var(--fk-cyan)" }}
              >
                // KAYNAK KÜTÜPHANESİ
              </span>
            </div>
            <h1
              className="mb-4 leading-tight"
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(28px, 4.5vw, 48px)",
                color: "var(--foreground)",
              }}
            >
              Ücretsiz <span style={{ color: "var(--fk-cyan)" }}>Finansal Araçlar</span>
            </h1>
            <p
              className="mx-auto"
              style={{
                fontSize: "clamp(15px, 2vw, 17px)",
                color: "var(--muted-foreground)",
                maxWidth: "560px",
                fontFamily: "var(--font-figtree)",
              }}
            >
              20 Excel şablonu ve PDF rehberi — algoritmik yatırım yolculuğunuzda ihtiyaç duyacağınız tüm araçlar, ücretsiz.
            </p>

            {/* Sayaç rozeti */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={16} style={{ color: "#00C896" }} />
                <span className="text-sm font-mono" style={{ color: "#00C896" }}>
                  7 Excel Şablonu
                </span>
              </div>
              <div className="w-px h-4" style={{ background: "var(--border)" }} />
              <div className="flex items-center gap-2">
                <FileText size={16} style={{ color: "#00D4FF" }} />
                <span className="text-sm font-mono" style={{ color: "#00D4FF" }}>
                  13 PDF Rehberi
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Dosya Kartları Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {dosyalar.map((dosya, idx) => {
              const isXlsx = dosya.tur === "xlsx";
              const accentColor = isXlsx ? "#00C896" : "#00D4FF";
              const Icon = isXlsx ? FileSpreadsheet : FileText;

              return (
                <motion.div
                  key={dosya.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  className="group flex flex-col rounded-xl p-5 transition-all duration-200"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${accentColor}10`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Üst: ikon + tür rozeti */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${accentColor}15` }}
                    >
                      <Icon size={18} style={{ color: accentColor }} />
                    </div>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded-full"
                      style={{
                        background: `${accentColor}15`,
                        color: accentColor,
                        border: `1px solid ${accentColor}30`,
                      }}
                    >
                      {dosya.tur.toUpperCase()}
                    </span>
                  </div>

                  {/* Başlık */}
                  <h3
                    className="font-semibold text-sm leading-snug mb-2 flex-1"
                    style={{ color: "var(--foreground)", fontFamily: "var(--font-figtree)" }}
                  >
                    {dosya.baslik}
                  </h3>

                  {/* Açıklama */}
                  <p
                    className="text-xs leading-relaxed mb-4"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {dosya.aciklama}
                  </p>

                  {/* İndir butonu */}
                  <button
                    onClick={() => setSecilenDosya(dosya)}
                    className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all duration-200"
                    style={{
                      background: `${accentColor}15`,
                      color: accentColor,
                      border: `1px solid ${accentColor}30`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = accentColor;
                      (e.currentTarget as HTMLElement).style.color = "#0a0d12";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${accentColor}15`;
                      (e.currentTarget as HTMLElement).style.color = accentColor;
                    }}
                  >
                    <Download size={13} />
                    Ücretsiz İndir
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {secilenDosya && (
          <IndirmeModal
            dosya={secilenDosya}
            onClose={() => setSecilenDosya(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
