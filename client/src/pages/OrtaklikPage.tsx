/*
  ORTAKLIK SAYFASI
  UX/UI: pasted_content_11.txt (Cyber Finance estetiği — neon cyan, dark card, progress bar'lar)
  İçerik: pasted_content_10.txt (istatistikler, kitle, farklılaştırıcılar, fırsatlar)
*/

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

/* ─── Yardımcı bileşenler ─── */

function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="font-mono text-[9.5px] font-medium tracking-[.12em] uppercase text-muted-foreground/50">
        // {label}
      </span>
      <span>{icon}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

/* ─── Ana sayfa ─── */

export default function OrtaklikPage() {
  return (
    <>
      <Helmet>
        <title>Ortaklık | Finans Kodu ile İş Birliği Yapın</title>
        <meta
          name="description"
          content="Türkiye'nin Yapay Zeka & Finans alanındaki güvenilir sesi Finans Kodu ile ortak olun. Yatırım kararı veren, finansal araç arayan ve AI'ı işine entegre etmek isteyen Türk finans profesyonellerine ulaşın."
        />
        <link rel="canonical" href="https://finanskodu.com/ortaklik" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 py-14 pb-24"
      >

        {/* ── HERO ── */}
        <div className="text-center mb-16 relative">
          {/* Ambient glow */}
          <div className="absolute inset-0 -top-10 pointer-events-none">
            <div
              className="w-[600px] h-[300px] mx-auto rounded-full opacity-20"
              style={{ background: 'radial-gradient(ellipse,rgba(0,212,255,0.3),transparent 70%)' }}
            />
          </div>

          {/* Eyebrow badge */}
          <div
            className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9.5px] font-mono font-semibold tracking-[.12em] uppercase mb-5"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.16)',
              color: '#00D4FF',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            // Ortaklık Programı
          </div>

          {/* Başlık */}
          <h1
            className="relative font-extrabold text-4xl md:text-5xl leading-tight tracking-tight mb-4 text-foreground"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Türkiye'nin Yapay Zeka<br />
            &amp; Finans Alanındaki<br />
            <span className="text-cyan-400">Güvenilir Sesi</span>
          </h1>

          {/* Alt başlık */}
          <p className="relative text-base text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8">
            Yatırım kararı veren, finansal araç arayan ve AI'ı işine entegre etmek isteyen
            Türk finans profesyonellerine ulaşın.
          </p>

          {/* CTA butonları */}
          <div className="relative flex items-center justify-center gap-3 flex-wrap">
            <a
              href="https://cal.com/rubi-can"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{ background: '#00D4FF', color: '#0D1117' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#00BFE0';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#00D4FF';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Ücretsiz Görüşme Ayarla
            </a>
            <a
              href="#detaylar"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
            >
              Detayları Gör ↓
            </a>
          </div>
        </div>

        {/* ── STATS ── */}
        <div id="detaylar">
          <SectionLabel icon="📊" label="Performansımız" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {[
            { val: '%76', label: 'Ortalama içerik tamamlama oranı' },
            { val: '3dk 51sn', label: 'Ortalama sayfa kalış süresi' },
            { val: '%68', label: 'LinkedIn gönderi etkileşim oranı' },
            { val: '%51', label: 'Blog yazısı okuma oranı' },
          ].map(s => (
            <div
              key={s.val}
              className="group relative bg-card border border-border rounded-2xl p-5 text-center overflow-hidden transition-all hover:border-cyan-500/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            >
              {/* Hover top line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div
                className="font-extrabold text-3xl text-cyan-400 mb-1.5 leading-none"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {s.val}
              </div>
              <div className="text-[11px] text-muted-foreground leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── KİTLEMİZ ── */}
        <SectionLabel icon="🎯" label="Kitlemiz" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">

          {/* Kimler Takip Ediyor */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,212,255,.5)]" />
              <span className="text-sm font-semibold text-foreground">Kimler Takip Ediyor</span>
            </div>
            <ul className="space-y-2.5">
              {[
                ['👤', 'Bireysel yatırımcılar ve portföy yöneticileri'],
                ['📊', 'Finans profesyonelleri ve analistler'],
                ['⚙️', "AI'ı iş süreçlerine entegre etmek isteyen yöneticiler"],
                ['🚀', 'Fintech ve dijital dönüşüm meraklıları'],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5"
                    style={{
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.14)',
                    }}
                  >
                    {icon}
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Erişim + Konum */}
          <div className="flex flex-col gap-3">
            {/* Erişim */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,212,255,.5)]" />
                <span className="text-sm font-semibold text-foreground">Erişim</span>
              </div>
              <div className="space-y-2">
                {[
                  ['Aylık sayfa görüntüleme', '6.770+'],
                  ['Tekil ziyaretçi', '2.430+'],
                  ['Kod Odası topluluğu', 'Aktif'],
                  ['LinkedIn organik kitle', 'Türk finans prof.'],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-background/50"
                  >
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <span className="font-mono text-xs font-semibold text-cyan-400">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Konum Dağılımı */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,212,255,.5)]" />
                <span className="text-sm font-semibold text-foreground">Konum Dağılımı</span>
              </div>
              <div className="space-y-3">
                {[
                  ['Türkiye', '%85', 85, '#00D4FF'],
                  ["Avrupa'daki Türk diasporası", '%10', 10, '#00C896'],
                  ['Diğer', '%5', 5, '#4E5D71'],
                ].map(([name, pct, w, color]) => (
                  <div key={name as string}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-muted-foreground">{name}</span>
                      <span className="font-mono text-[11px] text-muted-foreground/60">{pct}</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${w}%`, background: color as string }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BİZİ FARKLI KILAN ── */}
        <SectionLabel icon="💡" label="Bizi Farklı Kılan" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
          {[
            {
              icon: '🛡️',
              title: 'Güvenilir Otorite',
              desc: "Finans Kodu, Türkiye'de algoritmik yatırım ve AI entegrasyonu alanında öncü ses konumundadır. Kitlemiz okumakla kalmaz, uygular ve satın alır.",
            },
            {
              icon: '🎯',
              title: 'Nitelik Önce Gelir',
              desc: 'Yalnızca finans profesyonellerine ve yatırımcılara gerçekten değer katan araç ve hizmetlerle iş birliği yapıyoruz.',
            },
            {
              icon: '⚡',
              title: 'Gerçek Zamanlı Topluluk',
              desc: 'Kod Odası, piyasaları canlı takip eden aktif bir topluluktur. Ortaklarımız bu topluluğa doğrudan ulaşır.',
            },
            {
              icon: '📈',
              title: 'Kanıtlanmış Büyüme',
              desc: "Ocak 2026'dan bu yana trafik 4 katına çıktı. ABD-İran krizinde tek günde 740 ziyaretçi — organik, nitelikli, finans odaklı.",
            },
          ].map(d => (
            <div
              key={d.title}
              className="bg-card border border-border rounded-2xl p-5 transition-all hover:border-emerald-500/25 hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-3"
                style={{
                  background: 'rgba(0,200,150,0.08)',
                  border: '1px solid rgba(0,200,150,0.16)',
                }}
              >
                {d.icon}
              </div>
              <div className="text-sm font-bold text-foreground mb-1.5">{d.title}</div>
              <div
                className="text-xs text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: d.desc
                    .replace('4 katına', '<strong class="text-emerald-400">4 katına</strong>')
                    .replace('740 ziyaretçi', '<strong class="text-emerald-400">740 ziyaretçi</strong>'),
                }}
              />
            </div>
          ))}
        </div>

        {/* ── ORTAKLIK FIRSATLARI ── */}
        <SectionLabel icon="🤝" label="Ortaklık Fırsatları" />
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Hızlı görünürlükten uzun vadeli stratejik iş birliğine kadar esnek seçenekler sunuyoruz:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-16">
          {[
            ['Sponsorluk & Tanıtım', 'Paylaşım sponsorluğu ve özel tanıtım içerikleri'],
            ['Canlı Seans', "Kod Odası'nda ortak canlı analiz seansları"],
            ['Sosyal Medya', 'LinkedIn ve sosyal medya kampanyaları'],
            ['Video İçerik', 'Ortak sosyal medya video içerikleri'],
            ['Banner & Entegrasyon', 'Web sitesi ve dijital araçlarda banner erişimi'],
            ['Marka Ortaklığı', 'Uzun vadeli stratejik marka ortaklığı programları'],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-card border border-border rounded-xl p-4 flex items-start gap-2.5 transition-colors hover:border-cyan-500/25"
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: 'rgba(0,200,150,0.08)',
                  border: '1px solid rgba(0,200,150,0.18)',
                }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="#00C896"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="2 6 5 9 10 3" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground mb-0.5">{title}</div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA BLOCK ── */}
        <div
          className="relative overflow-hidden rounded-3xl p-10 text-center"
          style={{
            background:
              'linear-gradient(135deg,rgba(0,212,255,0.07),rgba(0,200,150,0.05),rgba(0,212,255,0.04))',
            border: '1px solid rgba(0,212,255,0.18)',
          }}
        >
          {/* Top glow */}
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse,rgba(0,212,255,0.12),transparent 70%)' }}
          />
          {/* Bottom-right glow */}
          <div
            className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(0,200,150,0.09),transparent 70%)' }}
          />

          <h2
            className="relative font-extrabold text-2xl md:text-3xl text-foreground mb-3"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Ortaklık için iletişime geçin
          </h2>
          <p className="relative text-sm text-muted-foreground mb-6">
            Her iş birliği hedeflerinize göre özelleştirilir.
          </p>

          <div className="relative flex items-center justify-center gap-3 flex-wrap">
            {/* Cal.com butonu */}
            <a
              href="https://cal.com/rubi-can"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all"
              style={{ background: '#00D4FF', color: '#0D1117' }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 28px rgba(0,212,255,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Ücretsiz Görüşme Ayarla →
            </a>

            {/* E-posta butonu */}
            <a
              href="mailto:info@finanskodu.com"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
            >
              info@finanskodu.com
            </a>
          </div>

          <p className="relative font-mono text-[10px] text-muted-foreground/50 mt-4">
            Ücretsiz · Bağlayıcı değil · 30 dakika
          </p>
        </div>

      </motion.div>
    </>
  );
}
