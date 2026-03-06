/*
  KVKK / GİZLİLİK POLİTİKASI SAYFASI
  - KVKK (6698 sayılı Kanun) ve GDPR uyumlu
  - E-E-A-T sinyali için kapsamlı yasal içerik
  - WebPage + BreadcrumbList schema
  - Canonical URL, noindex değil (index edilmeli — E-E-A-T)
*/

import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Shield, Lock, Eye, UserCheck, Mail, ChevronRight } from "lucide-react";

const LAST_UPDATED = "6 Mart 2026";
const COMPANY_NAME = "Finans Kodu";
const COMPANY_EMAIL = "info@finanskodu.com";
const SITE_URL = "https://finanskodu.com";

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Gizlilik Politikası ve KVKK Aydınlatma Metni | Finans Kodu</title>
        <meta
          name="description"
          content="Finans Kodu KVKK aydınlatma metni ve gizlilik politikası. Kişisel verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu öğrenin. Son güncelleme: Mart 2026."
        />
        <link rel="canonical" href={`${SITE_URL}/kvkk`} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gizlilik Politikası ve KVKK Aydınlatma Metni | Finans Kodu" />
        <meta property="og:description" content="Finans Kodu KVKK aydınlatma metni ve gizlilik politikası. Kişisel verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu öğrenin." />
        <meta property="og:url" content={`${SITE_URL}/kvkk`} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

        {/* Schema.org */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/kvkk#webpage`,
              "url": `${SITE_URL}/kvkk`,
              "name": "Gizlilik Politikası ve KVKK Aydınlatma Metni | Finans Kodu",
              "description": "Finans Kodu KVKK aydınlatma metni ve gizlilik politikası.",
              "isPartOf": { "@id": `${SITE_URL}/#website` },
              "about": { "@id": `${SITE_URL}/#organization` },
              "inLanguage": "tr-TR",
              "dateModified": "2026-03-06"
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${SITE_URL}/kvkk#breadcrumb`,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Ana Sayfa",
                  "item": SITE_URL
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Gizlilik Politikası",
                  "item": `${SITE_URL}/kvkk`
                }
              ]
            }
          ]
        })}</script>
      </Helmet>

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Gizlilik Politikası</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">KVKK &amp; Gizlilik</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Gizlilik Politikası ve KVKK Aydınlatma Metni
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Kişisel verilerinizin güvenliği bizim için önceliktir. Bu sayfa, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında haklarınızı ve veri işleme süreçlerimizi açıklamaktadır.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Son güncelleme: <time dateTime="2026-03-06">{LAST_UPDATED}</time>
          </p>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hızlı Özet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-xl border border-border bg-card">
            <Lock className="w-5 h-5 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Güvenli Depolama</h3>
            <p className="text-sm text-muted-foreground">Verileriniz şifreli ve güvenli sunucularda saklanır.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <Eye className="w-5 h-5 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Şeffaf İşleme</h3>
            <p className="text-sm text-muted-foreground">Hangi verileri neden topladığımızı açıkça belirtiriz.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <UserCheck className="w-5 h-5 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Haklarınız Güvende</h3>
            <p className="text-sm text-muted-foreground">Verilerinize erişme, düzeltme ve silme hakkınız vardır.</p>
          </div>
        </div>

        {/* Ana İçerik */}
        <article className="prose prose-invert max-w-none space-y-10">

          {/* 1. Veri Sorumlusu */}
          <section id="veri-sorumlusu">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">01</span>
              Veri Sorumlusu
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla <strong>{COMPANY_NAME}</strong> tarafından aşağıda açıklanan kapsamda işlenmektedir.
            </p>
            <div className="bg-card border border-border rounded-xl p-5 space-y-2 text-sm">
              <div className="flex gap-3">
                <span className="text-muted-foreground w-28 shrink-0">Şirket Adı</span>
                <span className="font-medium">{COMPANY_NAME}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-muted-foreground w-28 shrink-0">Web Sitesi</span>
                <a href={SITE_URL} className="text-primary hover:underline">{SITE_URL}</a>
              </div>
              <div className="flex gap-3">
                <span className="text-muted-foreground w-28 shrink-0">E-posta</span>
                <a href={`mailto:${COMPANY_EMAIL}`} className="text-primary hover:underline">{COMPANY_EMAIL}</a>
              </div>
            </div>
          </section>

          {/* 2. Toplanan Kişisel Veriler */}
          <section id="toplanan-veriler">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">02</span>
              Toplanan Kişisel Veriler
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {COMPANY_NAME} olarak, hizmetlerimizi sunabilmek amacıyla aşağıdaki kişisel verileri toplayabilmekteyiz:
            </p>

            <h3 className="text-lg font-semibold mb-3">2.1 Otomatik Olarak Toplanan Veriler</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>IP Adresi ve Konum Bilgisi:</strong> Sunucu günlükleri aracılığıyla yaklaşık coğrafi konum tespiti için.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Tarayıcı ve Cihaz Bilgisi:</strong> Kullanıcı arayüzünü optimize etmek amacıyla tarayıcı türü, işletim sistemi, ekran çözünürlüğü.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Çerez Verileri:</strong> Oturum yönetimi, tercih hatırlama ve analitik amaçlı çerezler (detaylar için bkz. Bölüm 7).</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Sayfa Görüntüleme ve Tıklama Verileri:</strong> Google Analytics ve Microsoft Clarity aracılığıyla site kullanım istatistikleri.</span></li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">2.2 Kullanıcı Tarafından Sağlanan Veriler</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Hesap Bilgileri:</strong> Manus OAuth ile giriş yapıldığında profil adı ve kullanıcı kimliği.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>İletişim Bilgileri:</strong> İletişim formu veya e-posta aracılığıyla gönüllü olarak iletilen ad, e-posta adresi ve mesaj içeriği.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Satın Alma Bilgileri:</strong> Dijital ürün satın alımlarında ödeme platformu tarafından işlenen fatura bilgileri (ödeme kartı bilgileri tarafımızca saklanmamaktadır).</span></li>
            </ul>
          </section>

          {/* 3. Kişisel Verilerin İşlenme Amaçları */}
          <section id="isleme-amaci">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">03</span>
              Kişisel Verilerin İşlenme Amaçları
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Toplanan kişisel veriler aşağıdaki amaçlarla işlenmektedir:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { title: "Hizmet Sunumu", desc: "Platform özelliklerinin ve dijital ürünlerin kullanıcılara sunulması" },
                { title: "Hesap Yönetimi", desc: "Kullanıcı hesaplarının oluşturulması, güncellenmesi ve güvenliğinin sağlanması" },
                { title: "Müşteri Desteği", desc: "Kullanıcı sorularına ve taleplerine yanıt verilmesi" },
                { title: "Güvenlik", desc: "Yetkisiz erişim, dolandırıcılık ve kötüye kullanımın önlenmesi" },
                { title: "Analitik ve İyileştirme", desc: "Site performansının ölçülmesi ve kullanıcı deneyiminin geliştirilmesi" },
                { title: "Yasal Yükümlülükler", desc: "Vergi, muhasebe ve yasal raporlama gerekliliklerinin karşılanması" },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-lg border border-border bg-card/50">
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Hukuki Dayanak */}
          <section id="hukuki-dayanak">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">04</span>
              Kişisel Verilerin İşlenmesinin Hukuki Dayanağı
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kişisel verileriniz, KVKK'nın 5. ve 6. maddeleri kapsamında aşağıdaki hukuki dayanaklara göre işlenmektedir:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Açık Rıza (KVKK m.5/1):</strong> Analitik çerezler ve pazarlama iletişimi için açık rızanıza dayanılmaktadır.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Sözleşmenin İfası (KVKK m.5/2-c):</strong> Satın alma ve hesap yönetimi işlemleri için sözleşme ilişkisine dayanılmaktadır.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Hukuki Yükümlülük (KVKK m.5/2-ç):</strong> Vergi ve yasal raporlama yükümlülükleri için kanuni zorunluluk bulunmaktadır.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Meşru Menfaat (KVKK m.5/2-f):</strong> Platform güvenliği ve hizmet kalitesinin iyileştirilmesi için meşru menfaate dayanılmaktadır.</span></li>
            </ul>
          </section>

          {/* 5. Verilerin Aktarılması */}
          <section id="veri-aktarimi">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">05</span>
              Kişisel Verilerin Aktarılması
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kişisel verileriniz, aşağıdaki üçüncü taraflarla ve yalnızca belirtilen amaçlar doğrultusunda paylaşılabilmektedir:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-semibold">Alıcı</th>
                    <th className="text-left py-3 pr-4 font-semibold">Amaç</th>
                    <th className="text-left py-3 font-semibold">Konum</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">Google Analytics</td>
                    <td className="py-3 pr-4">Site kullanım istatistikleri</td>
                    <td className="py-3">ABD (SCCs)</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">Microsoft Clarity</td>
                    <td className="py-3 pr-4">Kullanıcı davranış analizi</td>
                    <td className="py-3">ABD (SCCs)</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">Manus Platform</td>
                    <td className="py-3 pr-4">Kimlik doğrulama (OAuth)</td>
                    <td className="py-3">Uluslararası</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">Ödeme Sağlayıcısı</td>
                    <td className="py-3 pr-4">Dijital ürün ödemeleri</td>
                    <td className="py-3">Türkiye</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Yasal Makamlar</td>
                    <td className="py-3 pr-4">Yasal yükümlülük gereği</td>
                    <td className="py-3">Türkiye</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Yurt dışına aktarımlarda KVKK'nın 9. maddesi kapsamında gerekli güvenceler sağlanmaktadır (Standart Sözleşme Maddeleri / SCCs).
            </p>
          </section>

          {/* 6. Saklama Süreleri */}
          <section id="saklama-sureleri">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">06</span>
              Kişisel Verilerin Saklanma Süreleri
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili yasal yükümlülükler çerçevesinde saklanmaktadır:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Hesap Bilgileri:</strong> Hesap aktif olduğu sürece + hesap silme talebinden itibaren 30 gün.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Satın Alma ve Fatura Kayıtları:</strong> Vergi mevzuatı gereği 5 yıl (213 sayılı VUK).</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>İletişim Kayıtları:</strong> Son iletişimden itibaren 2 yıl.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Analitik Veriler:</strong> Anonimleştirilmiş biçimde 26 ay (Google Analytics varsayılan).</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Çerez Verileri:</strong> Çerez türüne göre oturum sonunda veya 12 ay içinde silinir.</span></li>
            </ul>
          </section>

          {/* 7. Çerezler */}
          <section id="cerezler">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">07</span>
              Çerez (Cookie) Politikası
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Web sitemiz, hizmet kalitesini artırmak amacıyla çerezler kullanmaktadır. Çerezler, tarayıcınıza kaydedilen küçük metin dosyalarıdır.
            </p>

            <h3 className="text-lg font-semibold mb-3">Kullandığımız Çerez Türleri</h3>
            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm">Zorunlu Çerezler</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Her Zaman Aktif</span>
                </div>
                <p className="text-xs text-muted-foreground">Oturum yönetimi ve güvenlik için gereklidir. Bu çerezler devre dışı bırakılamaz.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm">Analitik Çerezler</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Onay Gerekli</span>
                </div>
                <p className="text-xs text-muted-foreground">Google Analytics ve Microsoft Clarity tarafından site kullanım istatistiklerini toplamak için kullanılır. Rızanızı çerez banner'ından yönetebilirsiniz.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm">Tercih Çerezleri</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Onay Gerekli</span>
                </div>
                <p className="text-xs text-muted-foreground">Tema (açık/koyu mod) ve dil tercihleri gibi kullanıcı ayarlarını hatırlamak için kullanılır.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı site özelliklerinin çalışmaması söz konusu olabilir.
            </p>
          </section>

          {/* 8. Haklarınız */}
          <section id="haklariniz">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">08</span>
              KVKK Kapsamındaki Haklarınız
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              KVKK'nın 11. maddesi uyarınca kişisel verilerinize ilişkin aşağıdaki haklara sahipsiniz:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { hak: "Bilgi Edinme Hakkı", aciklama: "Kişisel verilerinizin işlenip işlenmediğini öğrenme" },
                { hak: "Erişim Hakkı", aciklama: "İşlenen kişisel verilerinize erişim talep etme" },
                { hak: "Düzeltme Hakkı", aciklama: "Yanlış veya eksik verilerin düzeltilmesini isteme" },
                { hak: "Silme Hakkı", aciklama: "Koşulların oluşması halinde verilerinizin silinmesini talep etme" },
                { hak: "İşlemeyi Kısıtlama", aciklama: "Belirli durumlarda veri işlemenin kısıtlanmasını isteme" },
                { hak: "İtiraz Hakkı", aciklama: "Meşru menfaate dayalı işlemelere itiraz etme" },
                { hak: "Veri Taşınabilirliği", aciklama: "Verilerinizi yapılandırılmış formatta alma veya aktarma" },
                { hak: "Zararın Giderilmesi", aciklama: "Kanuna aykırı işleme nedeniyle oluşan zararın tazminini talep etme" },
              ].map((item) => (
                <div key={item.hak} className="flex gap-3 p-3 rounded-lg border border-border bg-card/30">
                  <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-sm">{item.hak}:</span>
                    <span className="text-sm text-muted-foreground ml-1">{item.aciklama}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-5 rounded-xl border border-primary/20 bg-primary/5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Başvuru Yöntemi</h4>
                  <p className="text-sm text-muted-foreground">
                    Haklarınızı kullanmak için kimliğinizi doğrulayan belgelerle birlikte{" "}
                    <a href={`mailto:${COMPANY_EMAIL}`} className="text-primary hover:underline font-medium">{COMPANY_EMAIL}</a>{" "}
                    adresine e-posta gönderebilirsiniz. Başvurularınız en geç <strong>30 gün</strong> içinde yanıtlanacaktır.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Yanıtımızdan memnun kalmamanız halinde <strong>Kişisel Verileri Koruma Kurumu (KVKK)</strong>'na şikâyette bulunma hakkınız saklıdır.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Güvenlik Önlemleri */}
          <section id="guvenlik">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">09</span>
              Güvenlik Önlemleri
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {COMPANY_NAME}, kişisel verilerinizin güvenliğini sağlamak amacıyla teknik ve idari tedbirler almaktadır:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>SSL/TLS Şifreleme:</strong> Tüm veri iletimi HTTPS protokolüyle şifrelenmektedir.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Erişim Kontrolü:</strong> Kişisel verilere yalnızca yetkili personel erişebilmektedir.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Güvenlik Başlıkları:</strong> CSP, HSTS, X-Frame-Options gibi HTTP güvenlik başlıkları aktiftir.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Düzenli Denetim:</strong> Güvenlik açıkları düzenli aralıklarla taranmakta ve giderilmektedir.</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Veri İhlali Bildirimi:</strong> Olası bir veri ihlali durumunda KVKK ve etkilenen kişiler yasal süreler içinde bilgilendirilecektir.</span></li>
            </ul>
          </section>

          {/* 10. Üçüncü Taraf Linkler */}
          <section id="ucuncu-taraf">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">10</span>
              Üçüncü Taraf Bağlantılar
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik uygulamalarından sorumlu değiliz. Üçüncü taraf siteleri ziyaret etmeden önce kendi gizlilik politikalarını incelemenizi tavsiye ederiz.
            </p>
          </section>

          {/* 11. Politika Güncellemeleri */}
          <section id="guncellemeler">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">11</span>
              Politika Güncellemeleri
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Bu gizlilik politikası, yasal değişiklikler veya hizmet güncellemeleri doğrultusunda zaman zaman revize edilebilir. Önemli değişiklikler site üzerinden duyurulacaktır. Politikanın en güncel versiyonunu her zaman bu sayfada bulabilirsiniz. Son güncelleme tarihi: <time dateTime="2026-03-06"><strong>{LAST_UPDATED}</strong></time>.
            </p>
          </section>

          {/* 12. İletişim */}
          <section id="iletisim">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary text-lg font-mono">12</span>
              İletişim
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bu gizlilik politikasına ilişkin sorularınız veya kişisel veri talepleriniz için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {COMPANY_EMAIL}
              </a>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-primary/50 transition-colors text-sm"
              >
                İletişim Sayfasına Git
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

        </article>

        {/* Hızlı Navigasyon */}
        <nav aria-label="Sayfa içi navigasyon" className="mt-12 p-5 rounded-xl border border-border bg-card/30">
          <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">İçindekiler</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {[
              { href: "#veri-sorumlusu", label: "Veri Sorumlusu" },
              { href: "#toplanan-veriler", label: "Toplanan Veriler" },
              { href: "#isleme-amaci", label: "İşleme Amaçları" },
              { href: "#hukuki-dayanak", label: "Hukuki Dayanak" },
              { href: "#veri-aktarimi", label: "Veri Aktarımı" },
              { href: "#saklama-sureleri", label: "Saklama Süreleri" },
              { href: "#cerezler", label: "Çerez Politikası" },
              { href: "#haklariniz", label: "Haklarınız" },
              { href: "#guvenlik", label: "Güvenlik" },
              { href: "#ucuncu-taraf", label: "Üçüncü Taraf" },
              { href: "#guncellemeler", label: "Güncellemeler" },
              { href: "#iletisim", label: "İletişim" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors py-1"
              >
                <ChevronRight className="w-3 h-3" />
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
