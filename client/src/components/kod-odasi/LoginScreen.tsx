import { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/* ─── Types ─── */
interface LoginScreenProps {
  onSignIn: () => void;
}

interface LiveMessage {
  id: string;
  userName: string;
  userPhoto: string;
  text: string;
  timestamp: { toMillis: () => number } | null;
}

/* ─── Helpers ─── */
function formatTime(ts: { toMillis: () => number } | null): string {
  if (!ts) return '';
  const d = new Date(ts.toMillis());
  return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/* ─── Avatar ─── */
function Avatar({ photo, name, size = 32 }: { photo: string; name: string; size?: number }) {
  const [err, setErr] = useState(false);
  const colors = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
  const color = colors[name.charCodeAt(0) % colors.length];

  if (photo && !err) {
    return (
      <img
        src={photo}
        alt={name}
        onError={() => setErr(true)}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          border: `1.5px solid ${color}55`,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color + '22',
        border: `1.5px solid ${color}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 700,
        color,
        flexShrink: 0,
        fontFamily: 'Space Grotesk, sans-serif',
      }}
    >
      {getInitials(name)}
    </div>
  );
}

/* ─── Main Component ─── */
export default function LoginScreen({ onSignIn }: LoginScreenProps) {
  const [liveMessages, setLiveMessages] = useState<LiveMessage[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [memberCount] = useState<number>(1000);
  const [activeDiscussions] = useState<number>(7);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const onlineIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Mount animation trigger ── */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  /* ── Live messages from Firebase ── */
  useEffect(() => {
    const q = query(
      collection(db, 'chatRooms', 'genel', 'messages'),
      orderBy('timestamp', 'desc'),
      limit(4)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const msgs: LiveMessage[] = snap.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<LiveMessage, 'id'>) }))
          .filter((m) => (m as any).type !== 'system')
          .reverse();
        setLiveMessages(msgs);
      },
      () => {
        // permission-denied: silently ignore
      }
    );
    return () => unsub();
  }, []);

  /* ── Online count from Firebase presence ── */
  useEffect(() => {
    const q = query(collection(db, 'chatRooms', 'genel', 'presence'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const now = Date.now();
        const active = snap.docs.filter((d) => {
          const data = d.data();
          return data.lastSeen && now - data.lastSeen < 60000;
        });
        setOnlineCount(active.length || Math.floor(Math.random() * 15) + 30);
      },
      () => {
        setOnlineCount(Math.floor(Math.random() * 15) + 30);
      }
    );
    return () => unsub();
  }, []);

  const handleSignIn = () => {
    setLoading(true);
    onSignIn();
  };

  /* ─── Animation styles ─── */
  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
  });

  const slideIn = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateX(0)' : 'translateX(-16px)',
    transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        overflow: 'hidden',
        background: 'var(--background)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* ══════════════════════════════════════
          LEFT PANEL — Brand & Live Activity
          ══════════════════════════════════════ */}
      <div
        className="login-left-panel"
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px 48px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }}
        />

        {/* Top-left glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-60px',
            width: '380px',
            height: '380px',
            background: 'radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Bottom-right glow blob */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-40px',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── TOP: Logo ── */}
        <div style={{ position: 'relative', zIndex: 1, ...fadeUp(0) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                fontWeight: 800,
                color: '#0D1117',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.5px',
                flexShrink: 0,
              }}
            >
              fk
            </div>
            <span
              style={{
                fontSize: '17px',
                fontWeight: 700,
                color: 'var(--foreground)',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.3px',
              }}
            >
              finanskodu
            </span>
          </div>
        </div>

        {/* ── MIDDLE: Main content ── */}
        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '24px', paddingBottom: '24px' }}>
          {/* Eyebrow badge */}
          <div style={{ marginBottom: '20px', ...fadeUp(80) }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                color: '#00d4ff',
                fontFamily: 'JetBrains Mono, monospace',
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.20)',
                padding: '4px 10px',
                borderRadius: '20px',
              }}
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00d4ff', display: 'inline-block' }} />
              // Canlı Finans Topluluğu
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: 'clamp(30px, 3.8vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.12,
              margin: '0 0 20px',
              fontFamily: 'Space Grotesk, sans-serif',
              color: 'var(--foreground)',
              ...fadeUp(160),
            }}
          >
            Piyasaları{' '}
            <br />
            <span style={{ color: '#00d4ff' }}>birlikte</span>{' '}
            <br />
            <span style={{ color: '#00d4ff' }}>anlayan</span> bir
            <br />
            topluluk
            <br />
            <span style={{ color: '#10b981' }}>burada.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'var(--muted-foreground)',
              marginBottom: '28px',
              maxWidth: '380px',
              ...fadeUp(240),
            }}
          >
            Gerçek zamanlı sohbet, finansal analiz ve algoritmik strateji tartışmaları.
            Katıl, öğren, paylaş.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '28px',
              marginBottom: '32px',
              ...fadeUp(320),
            }}
          >
            {[
              { value: `${memberCount.toLocaleString('tr-TR')}+`, label: 'Üye' },
              { value: `${onlineCount || '—'}`, label: 'Şu an çevrimiçi' },
              { value: `${activeDiscussions}/24`, label: 'Aktif tartışma' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#00d4ff',
                    fontFamily: 'Space Grotesk, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Live activity feed */}
          <div style={{ ...fadeUp(400) }}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                color: 'var(--muted-foreground)',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  display: 'inline-block',
                  animation: 'fk-pulse 1.5s ease-in-out infinite',
                }}
              />
              Kod Odası — Canlı Aktivite
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              {liveMessages.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '13px' }}>
                  Henüz mesaj yok — ilk sen yaz! 🚀
                </div>
              ) : (
                liveMessages.map((msg, i) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '10px 14px',
                      borderBottom: i < liveMessages.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      ...slideIn(480 + i * 80),
                    }}
                  >
                    <Avatar photo={msg.userPhoto} name={msg.userName} size={28} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--foreground)' }}>
                          {msg.userName}
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--muted-foreground)',
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          lineHeight: 1.5,
                        }}
                      >
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Trust chips ── */}
        <div style={{ position: 'relative', zIndex: 1, ...fadeUp(700) }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '16px' }}>
            {['• Ücretsiz giriş', '• Reklam yok', '• Finanskodu topluluğu'].map((chip) => (
              <span
                key={chip}
                style={{
                  fontSize: '11px',
                  color: 'var(--muted-foreground)',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT PANEL — Login Form
          ══════════════════════════════════════ */}
      <div
        className="login-right-panel"
        style={{
          width: '520px',
          flexShrink: 0,
          background: 'var(--background)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 44px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top glow */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '280px',
            height: '180px',
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Back link */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            ...fadeUp(0),
          }}
        >
          <a
            href="/"
            style={{
              fontSize: '12px',
              color: 'var(--muted-foreground)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
          >
            ← Ana Sayfa
          </a>
        </div>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '380px', textAlign: 'center' }}>
          {/* Chat icon with float animation */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', ...fadeUp(100) }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(0,180,130,0.08))',
                border: '1px solid rgba(0,212,255,0.20)',
                borderRadius: '18px',
                boxShadow: '0 0 0 8px rgba(0,212,255,0.04), 0 8px 32px rgba(0,212,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                animation: 'fk-float 3.5s ease-in-out infinite',
              }}
            >
              💬
            </div>
          </div>

          {/* Online badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.22)',
              borderRadius: '20px',
              marginBottom: '20px',
              ...fadeUp(180),
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10b981',
                animation: 'fk-pulse 2s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 500 }}>
              {onlineCount > 0 ? `${onlineCount} kişi şu an aktif` : 'Topluluk aktif'}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: 'var(--foreground)',
              marginBottom: '8px',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-0.5px',
              ...fadeUp(240),
            }}
          >
            Kod Odası'na Giriş
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--muted-foreground)',
              lineHeight: 1.6,
              marginBottom: '28px',
              ...fadeUp(300),
            }}
          >
            Finans topluluğuna katılmak için
            <br />
            Google hesabınla devam et.
          </p>

          {/* Feature list */}
          <div
            style={{
              background: 'rgba(0,212,255,0.04)',
              border: '1px solid rgba(0,212,255,0.14)',
              borderRadius: '12px',
              padding: '18px 20px',
              marginBottom: '28px',
              textAlign: 'left',
              ...fadeUp(360),
            }}
          >
            {[
              { icon: '⚡', text: 'Gerçek zamanlı piyasa tartışmaları' },
              { icon: '📊', text: 'Finansal analiz ve strateji paylaşımı' },
              { icon: '🔔', text: 'Anlık piyasa uyarıları' },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 0',
                  fontSize: '13px',
                  color: 'var(--muted-foreground)',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '7px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    flexShrink: 0,
                    background: 'rgba(0,212,255,0.10)',
                  }}
                >
                  {item.icon}
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              ...fadeUp(400),
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', letterSpacing: '1px', textTransform: 'uppercase' as const }}>
              Giriş Yöntemi
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Google sign-in button */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 20px',
              background: '#fff',
              color: '#1f2937',
              border: '1px solid rgba(0,0,0,0.10)',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              marginBottom: '16px',
              ...fadeUp(440),
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.4)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            {loading ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ animation: 'spin 1s linear infinite' }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Yönlendiriliyor…
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google ile Giriş Yap
              </>
            )}
          </button>

          {/* Terms */}
          <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', lineHeight: 1.6, ...fadeUp(500) }}>
            Giriş yaparak{' '}
            <a href="#" style={{ color: '#00d4ff', textDecoration: 'none', fontWeight: 500 }}>Kullanım Şartları</a>
            {'\'nı ve '}
            <a href="#" style={{ color: '#00d4ff', textDecoration: 'none', fontWeight: 500 }}>Gizlilik Politikası</a>
            {'\'nı kabul etmiş olursunuz.'}
          </p>
        </div>
      </div>

      {/* ─── Global styles ─── */}
      <style>{`
        @keyframes fk-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes fk-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .login-left-panel {
          display: flex;
        }
        .login-right-panel {
          width: 520px;
          overflow-y: auto;
        }
        @media (max-width: 900px) {
          .login-left-panel {
            display: none !important;
          }
          .login-right-panel {
            width: 100% !important;
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
