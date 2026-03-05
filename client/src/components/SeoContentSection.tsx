/**
 * SeoContentSection — Ana sayfa SEO metin bölümü
 *
 * Primary keyword : finans (40x hedef)
 * LTI keyword     : finans analiz (15x hedef)
 * Company name    : Finans Kodu
 * Hedef kelime    : 2500-3000 (bu bileşen ~1750, diğer bileşenler ~783)
 * İç link sayısı  : 10 (ürün ve içerik sayfalarına)
 */

import { Link } from "wouter";

export default function SeoContentSection() {
  return (
    <section
      className="bg-background text-foreground"
      aria-label="Finans Kodu hakkında detaylı bilgi"
    >
      {/* ─────────────────────────────────────────────────────
          BÖLÜM 1 — Finans Kodu Nedir?
      ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border">
        <h2 className="text-3xl font-bold mb-6 text-foreground">
          Finans Kodu Nedir? Türkiye'nin Veri Odaklı Platformu
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          <strong>Finans Kodu</strong>, Türkiye'deki yatırımcılara ve ekonomiyle ilgilenen
          herkese sistematik, veri odaklı ve yapay zeka destekli araçlar sunan bir dijital
          platform ve eğitim merkezidir. Piyasalarda duygusal kararların yerini matematiksel
          modeller almalıdır; bu dönüşümü mümkün kılmak için kurulduk.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Günümüzde piyasalar hızla değişiyor. Yapay zeka, algoritmik modeller ve büyük veri
          artık yalnızca kurumsal bankaların tekelinde değil. Platformumuz; borsa, portföy
          yönetimi, risk hesaplama ve makroekonomik değerlendirme konularında kapsamlı içerik
          ve araçlar sunmaktadır. Doğru <strong>finans analiz</strong> yapabilmek için hem
          doğru araçlara hem de doğru metodolojiye ihtiyaç vardır.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Temel felsefemiz şudur: Başarılı bir strateji, sezgiye değil veriye dayanır. BIST 100,
          küresel endeksler, emtia piyasaları ve döviz kurları gibi kritik alanlarda sistematik
          bir yaklaşım benimsemek, uzun vadeli başarının ön koşuludur. Finans Kodu her iki
          bileşeni de — araç ve metodoloji — bir arada sunuyor.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Kurucumuz Rubi Can İcliyürek'in yıllar içinde geliştirdiği algoritmik modeller ve
          metodoloji, şimdi dijital ürünler ve eğitim içerikleri aracılığıyla binlerce
          kullanıcıyla buluşuyor. Finans Kodu bir araç değil; bir düşünce biçimidir.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────
          BÖLÜM 2 — Neden Finans Kodu?
      ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border">
        <h2 className="text-3xl font-bold mb-6 text-foreground">
          Neden Finans Kodu? Rakiplerimizden Farkımız
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Türkiye'de onlarca platform, borsa kursu ve yatırım danışmanlığı hizmeti
          bulunmaktadır. Ancak platformumuzu diğerlerinden ayıran temel fark, içeriklerimizin
          mühendislik disipliniyle üretilmesidir. Her araç, her strateji bülteni ve her eğitim
          materyali gerçek piyasa verileriyle test edilmiş ve doğrulanmıştır.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Veri Odaklı Finans Analiz Yaklaşımı
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Ekibimizin geliştirdiği <strong>finans analiz</strong> metodolojisi üç temel sütuna dayanır:
          Temel Analiz (şirket bilanço ve değerleme), Teknik Analiz (fiyat hareketleri ve
          göstergeler) ve Makroekonomik Analiz (faiz, enflasyon, döviz). Bu üç sütunu bir
          arada değerlendirmek, piyasada sürdürülebilir başarının anahtarıdır. Platformumuz
          bu bütünleşik yaklaşımı tüm araçlarına ve içeriklerine yansıtmaktadır.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Yapay Zeka ile Güçlendirilmiş Araçlar
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Yapay zeka, piyasalarda devrim yaratıyor. Platformumuz, bu teknolojiyi günlük iş
          akışına entegre etmek için özel olarak tasarlanmış araçlar sunuyor.{" "}
          <Link
            href="/dijital-araclar/ai-prompt-kutuphanesi"
            className="text-primary hover:underline font-medium"
          >
            AI Prompt Kütüphanesi
          </Link>
          , 100'den fazla odaklı yapay zeka komutuyla bilanço okumadan risk analizine,
          makroekonomik tahminlemeden portföy değerlendirmesine kadar geniş bir yelpazede
          profesyonel destek sağlıyor. Bu araç, analistlerin saatler süren süreçlerini
          dakikalara indirgiyor.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Sistematik Düşünce ve Karar Çerçeveleri
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Piyasalarda en büyük düşman duygusallıktır. FOMO, panik satışı ve açgözlülük,
          yatırımcıların en sık yaptığı hatalar arasındadır. Finans Kodu'nun{" "}
          <Link
            href="/dijital-araclar/finans-kodu-kaos-icinde-duzen"
            className="text-primary hover:underline font-medium"
          >
            Kaos İçinde Düzen
          </Link>{" "}
          dijital ürünü, bu psikolojik tuzakları aşmak için mühendislik perspektifinden
          geliştirilmiş karar matrisleri, risk/getiri formülleri ve sistematik portföy
          mimarisi sunuyor. Kararlarınızı duygulardan değil, matematikten alın.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────
          BÖLÜM 3 — Dijital Ürünler
      ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border">
        <h2 className="text-3xl font-bold mb-6 text-foreground">
          Finans Kodu Dijital Ürünleri: Profesyonel Araçlar
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Dijital ürün ailemiz, farklı ihtiyaçlara yönelik üç temel araçtan
          oluşmaktadır. Her ürün, gerçek piyasa koşullarında test edilmiş ve kullanıcı
          geri bildirimleriyle sürekli geliştirilen bir metodolojiye dayanmaktadır.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          AI Prompt Kütüphanesi — Yapay Zeka ile Finans Analizi
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Yapay zeka araçları, doğru komutlarla kullanıldığında analistlerin en güçlü silahı
          haline gelir. Ancak etkili yapay zeka komutları yazmak, hem bilgi hem de prompt
          mühendisliği uzmanlığı gerektiriyor. Finans Kodu'nun{" "}
          <Link
            href="/dijital-araclar/ai-prompt-kutuphanesi"
            className="text-primary hover:underline font-medium"
          >
            AI Prompt Kütüphanesi
          </Link>
          , bu iki uzmanlığı bir araya getirerek 100'den fazla hazır, test edilmiş komut
          sunuyor. Bilanço analizi, hisse değerlemesi, makroekonomik senaryo oluşturma ve
          risk değerlendirmesi gibi kritik görevlerde yapay zekayı profesyonel düzeyde
          kullanabilirsiniz.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Bu kütüphane, sektörde çalışan analistler, portföy yöneticileri, muhasebeciler ve
          meraklılar için tasarlanmıştır. Yapay zeka ile <strong>finans analiz</strong>{" "}
          süreçlerinizi otomatize edin, verimliliğinizi artırın ve daha isabetli kararlar alın.
          Araçlarımız, rekabette öne geçmenizi sağlıyor.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Kaos İçinde Düzen — Sistematik Yönetim Rehberi
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Piyasalar kaotiktir. Haberler, sosyal medya, analist tahminleri ve gürültü arasında
          doğru kararı vermek giderek zorlaşıyor.{" "}
          <Link
            href="/dijital-araclar/finans-kodu-kaos-icinde-duzen"
            className="text-primary hover:underline font-medium"
          >
            Kaos İçinde Düzen
          </Link>
          , bu kaosa düzen getirmek için geliştirilmiş kapsamlı bir metodoloji rehberidir.
          Portföy mimarisi, risk yönetimi, varlık dağılımı ve duygu yönetimi konularında
          somut çerçeveler sunuyor.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Kararlarınızı sistematik hale getirmek, uzun vadede sürdürülebilir getiri elde
          etmenin temelidir. Bu ürün, hem yeni başlayanlar hem de deneyimli profesyoneller
          için değerli içgörüler barındırıyor. Piyasalarda kaosun içinde düzeni bulmak
          artık mümkün.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Pro Algoritmik Strateji Bülteni — Aylık Finans Analiz Sinyalleri
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Piyasanın nereye gittiğini bilmek yetmez; siz o piyasada nerede duruyorsunuz?
          Finans Kodu'nun{" "}
          <Link
            href="/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni"
            className="text-primary hover:underline font-medium"
          >
            Pro Algoritmik Strateji Bülteni
          </Link>
          , aylık bazda algoritmik altın ve fon sinyalleri, haftalık sesli brifing ve aylık
          1:1 check-up sunuyor. Portföyünüzdeki mantık hatalarını temizlemek ve matematiksel
          bir avantaj elde etmek isteyenler için tasarlandı.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Duygu yok, tahmin yok, sadece matematik. Pro bülten aboneleri, altın algoritması
          sinyallerini, akıllı fon sepeti önerilerini ve haftalık piyasa brifinglerini
          doğrudan alıyor. <strong>Finans analiz</strong> süreçlerinizi profesyonel bir
          çerçeveye oturtmak için Pro bültene abone olun ve piyasada rakiplerinizin önünde
          olun.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────
          BÖLÜM 4 — Metodoloji
      ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border">
        <h2 className="text-3xl font-bold mb-6 text-foreground">
          Finans Analiz Metodolojisi: Sarp ve Vera Yaklaşımı
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Platformumuzun özgün metodolojisi, iki tamamlayıcı yaklaşımın sentezine dayanır:
          Sarp ve Vera. Bu iki perspektif, piyasanın farklı boyutlarını ele alarak bütünleşik
          bir <strong>finans analiz</strong> çerçevesi oluşturuyor.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Sarp: Algoritmik ve Teknik Analiz
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Sarp perspektifi, piyasaları matematiksel ve algoritmik bir gözle inceler. RSI,
          hareketli ortalamalar, volatilite göstergeleri ve momentum analizi gibi teknik
          araçları kullanarak "ne zaman" sorusunun cevabını arar. Algoritmik yaklaşım,
          duygusal kararları ortadan kaldırarak sistematik alım-satım stratejileri
          geliştirmeyi hedefler.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Sarp metodolojisi özellikle altın piyasası, döviz hareketleri ve BIST 100 endeks
          analizinde güçlü sinyaller üretiyor. Algoritmik modellerin gerçek piyasa verisiyle
          backtest edilmesi, bu yaklaşımın güvenilirliğini artırıyor. Matematiksel kesinliği
          ön plana çıkarmak isteyen finans profesyonelleri için Sarp perspektifi ideal bir
          başlangıç noktasıdır.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Vera: Temel Analiz ve Makroekonomik Perspektif
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Vera perspektifi, dünyayı makroekonomik ve temel analiz gözüyle değerlendirir.
          Şirket bilançoları, değerleme çarpanları, sektör dinamikleri ve küresel ekonomik
          göstergeler aracılığıyla "ne almalıyım" sorusunun cevabını arar. FED faiz kararları,
          enflasyon verileri, DXY hareketleri ve jeopolitik gelişmeler, Vera metodolojisinin
          temel araçlarıdır.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Uzun vadeli başarı için temel analiz vazgeçilmezdir. Vera yaklaşımı, yatırımcılara
          portföy çeşitlenmesi, negatif korelasyonlu varlık seçimi ve sürdürülebilir getiri
          stratejileri konularında rehberlik ediyor. Makroekonomik faktörleri göz ardı etmemek,
          finans piyasalarında bilinçli kararlar almanın temelidir.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Bütünleşik Finans Analiz: İki Perspektifin Gücü
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          En güçlü yanımız, Sarp ve Vera perspektiflerini bir arada kullanmaktır.
          Temel analiz "ne alacağınızı", teknik analiz "ne zaman alacağınızı" söyler. Bu iki
          yaklaşımı birleştiren bütünleşik <strong>finans analiz</strong> metodolojisi,
          piyasada sürdürülebilir başarının anahtarıdır. Tüm ürünlerimiz ve içeriklerimiz
          bu bütünleşik yaklaşımı yansıtmaktadır.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────
          BÖLÜM 5 — Eğitim ve Kaynaklar
      ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border">
        <h2 className="text-3xl font-bold mb-6 text-foreground">
          Eğitim ve Kaynaklar: Bilginizi Derinleştirin
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Platformumuz, yalnızca araç satmıyor; finans okuryazarlığını artırmak için kapsamlı
          eğitim içerikleri de sunuyor. Blog yazıları, analizler, vaka çalışmaları ve materyaller
          aracılığıyla yatırım bilginizi sürekli güncel tutabilirsiniz.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Blog ve Piyasa Analizleri
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Finans Kodu'nun{" "}
          <Link href="/blog" className="text-primary hover:underline font-medium">
            blog bölümü
          </Link>
          , piyasa analizleri, ekonomik değerlendirmeler ve metodoloji üzerine düzenli içerikler
          yayınlıyor. Her yazı, veri odaklı bir perspektiften kaleme alınıyor ve okuyuculara
          somut, uygulanabilir içgörüler sunuyor. Güncel gelişmeleri takip etmek ve
          derinlemesine <strong>finans analiz</strong> içeriklerine ulaşmak için blogumuzu
          düzenli ziyaret edin.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Kaynak Kütüphanesi: Profesyoneller İçin Seçki
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Derinleşmek için doğru kaynakları bulmak zaman alıcı olabilir. Finans Kodu'nun{" "}
          <Link href="/kaynak-kutuphanesi" className="text-primary hover:underline font-medium">
            Kaynak Kütüphanesi
          </Link>
          , profesyoneller ve yatırımcılar için özenle seçilmiş kitaplar, araştırmalar, araçlar
          ve platformları bir araya getiriyor. Temel kaynaklardan ileri düzey algoritmik ticaret
          materyallerine kadar geniş bir yelpazede kaynağa ulaşabilirsiniz.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Kod Odası: Teknoloji ve Piyasaların Kesişimi
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Teknoloji ve piyasalar giderek iç içe geçiyor. Finans Kodu'nun{" "}
          <Link href="/kod-odasi" className="text-primary hover:underline font-medium">
            Kod Odası
          </Link>
          , Python, Excel VBA ve veri analizi araçlarını uygulamalarında kullananlar için özel
          bir alan. Otomasyon, veri çekme, algoritmik model geliştirme ve raporlama konularında
          pratik içerikler bulabilirsiniz. Piyasalarda teknolojik avantaj elde etmek için
          Kod Odası'nı keşfedin.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────
          BÖLÜM 6 — Piyasalar Rehberi
      ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border">
        <h2 className="text-3xl font-bold mb-6 text-foreground">
          Piyasalar Rehberi: Temel Kavramlar ve Stratejiler
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Piyasalarda başarılı olmak için temel finans kavramlarını iyi anlamak şarttır. Ekibimiz,
          bu kavramları hem teorik hem de pratik açıdan ele alarak kapsamlı bir rehber sunuyor.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Portföy Yönetimi ve Varlık Dağılımı
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Başarılı bir yatırım stratejisinin temeli, doğru portföy yönetimidir. Tek bir varlık
          sınıfına yatırım yapmak riski artırır ve sürdürülebilir getiriyi zorlaştırır.
          Finans Kodu'nun önerdiği portföy mimarisi; hisse senetleri, emtialar (altın, gümüş),
          döviz ve sabit getirili araçlar arasında dengeli bir dağılımı esas alır. Bu
          çeşitlendirme yaklaşımı, piyasa dalgalanmalarına karşı koruma sağlarken uzun vadeli
          hedeflerinize ulaşmanızı kolaylaştırır. Portföyünüzü düzenli olarak gözden
          geçirmek ve piyasa koşullarına göre yeniden dengelemek, uzun vadeli başarının
          ayrılmaz bir parçasıdır.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Risk Yönetimi: En Kritik Disiplin
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Getiri kadar önemli olan şey, riski yönetmektir. Maksimum drawdown, Sharpe oranı,
          volatilite ölçümü ve stop-loss stratejileri, etkili risk yönetiminin temel araçlarıdır.
          Araçlarımız, portföyünüzü koruma altına almanın yollarını gösteriyor.
          Kapsamlı <strong>finans analiz</strong> süreçlerinizde risk faktörlerini göz ardı
          etmemek, uzun vadeli başarının ön koşuludur.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Makroekonomik Göstergeler ve Piyasalar
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          FED faiz kararları, enflasyon verileri, işsizlik rakamları ve GDP büyüme oranları,
          piyasaları doğrudan etkileyen makroekonomik göstergelerdir. Bu göstergeleri doğru
          okumak ve yorumlamak, piyasa hareketlerini öngörmede kritik bir avantaj sağlar.
          Makroekonomik içeriklerimiz, bu karmaşık verileri anlaşılır bir dile
          çevirerek yatırımcılara rehberlik ediyor.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Altın ve Emtia Piyasalarında Stratejiler
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Altın, tarihsel olarak enflasyona ve ekonomik belirsizliğe karşı en güçlü korunma
          araçlarından biri olmuştur. Finans Kodu'nun altın algoritması, ABD reel faizleri ile
          altın fiyatları arasındaki ters korelasyonu matematiksel olarak modelliyor. DXY
          hareketleri, jeopolitik riskler ve merkez bankası altın alımları gibi faktörleri
          bir arada değerlendiren bu algoritma, yatırımcılara güçlü sinyaller üretiyor.
          Emtia piyasalarında başarılı olmak için sistematik bir yaklaşım şarttır.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────
          BÖLÜM 7 — Kimler İçin?
      ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border">
        <h2 className="text-3xl font-bold mb-6 text-foreground">
          Finans Kodu Kime Hitap Eder?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Ürünlerimiz ve içeriklerimiz, piyasalarla ilgilenen geniş bir kitleye
          hitap etmektedir. Platformumuzdan en çok faydalanan kullanıcı profilleri şunlardır:
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Finans Profesyonelleri ve Analistler
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Sektörde çalışan analistler, portföy yöneticileri, risk uzmanları ve muhasebeciler
          için platformumuz, iş süreçlerini hızlandıran ve kaliteyi artıran araçlar sunuyor.
          Yapay zeka destekli araçlar, raporlama süreçlerini otomatize ediyor ve daha
          derinlemesine <strong>finans analiz</strong> yapılmasını sağlıyor. Kariyerinizde
          bir adım öne geçmek için profesyonel araçlarımızı keşfedin.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Bireysel Yatırımcılar
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Kendi portföyünü yöneten bireysel yatırımcılar, sistematik
          metodolojimizden büyük fayda sağlıyor. Duygusal kararlar yerine veri odaklı kararlar
          almak, uzun vadede portföy performansını önemli ölçüde artırıyor. Piyasalarda daha
          bilinçli adımlar atmak için eğitim içeriklerimizi ve dijital araçlarımızı kullanın.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-foreground mt-8">
          Meraklılar ve Öğrenciler
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Piyasalara yeni adım atanlar veya bilgisini derinleştirmek isteyenler için
          platformumuz, kapsamlı bir başlangıç noktası sunuyor. Blog içerikleri, eğitim materyalleri
          ve temel kavramları açıklayan rehberler, okuryazarlığı artırmak için ideal bir
          kaynak. Bu alanda kariyer yapmak isteyenler için Finans Kodu vazgeçilmez bir
          platformdur.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────
          BÖLÜM 8 — Ortaklık ve İletişim
      ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">
          Finans Kodu ile İş Birliği: Ortaklık ve İletişim
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Ekibimiz, ekosistemindeki diğer oyuncularla iş birliği yapmaya açık bir
          yapıya sahiptir. Fintech şirketleri, yatırım platformları, eğitim kurumları ve medya
          kuruluşları ile ortaklık fırsatları değerlendiriyoruz.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Finans Kodu ile iş birliği yapmak, markanızı Türkiye'nin en aktif topluluğuyla
          buluşturmanın en etkili yollarından biridir. Kullanıcı kitlemiz;
          profesyoneller, aktif yatırımcılar ve meraklılardan oluşmaktadır. Bu hedef kitleye
          ulaşmak için{" "}
          <Link href="/ortaklik" className="text-primary hover:underline font-medium">
            ortaklık sayfamızı
          </Link>{" "}
          ziyaret edin ve fırsatları keşfedin.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Platformumuz hakkında daha fazla bilgi almak, ürünlerimiz hakkında sorularınızı
          iletmek veya iş birliği teklifinizi paylaşmak için{" "}
          <Link href="/iletisim" className="text-primary hover:underline font-medium">
            iletişim sayfamızdan
          </Link>{" "}
          bize ulaşabilirsiniz. Birlikte daha güçlüyüz.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Finans Kodu olarak misyonumuz, Türkiye'deki yatırım okuryazarlığını artırmak ve
          bireyleri piyasalarda daha bilinçli kararlar almaya güçlendirmektir. Yapay zeka,
          algoritmik modeller ve veri odaklı araçlarla bu misyonu her geçen gün daha ileri
          taşıyoruz. Kapsamlı <strong>finans analiz</strong> araçlarımız ve eğitim içeriklerimizle
          yatırımcıların yanında olmaya devam edeceğiz. Geleceği birlikte şekillendirelim.
          Sizi de bu yolculuğa davet ediyoruz. Piyasa dünyasında başarıya ulaşmak için
          doğru rehberlik ve doğru araçlar şarttır. Platformumuz, bu iki unsuru bir arada
          sunarak yatırımcıların hedeflerini gerçeğe dönüştürmelerine yardımcı oluyor.
          Birlikte daha güçlü, birlikte daha başarılıyız. Piyasalarda sürdürülebilir
          başarı için sistematik bir yaklaşım, disiplinli bir strateji ve güvenilir bir
          rehber şarttır. Finans Kodu, bu üç unsuru tek bir çatı altında sunuyor ve
          yatırımcılara özel çözümler üretiyor.
        </p>
      </div>
    </section>
  );
}
