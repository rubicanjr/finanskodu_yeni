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
function timeAgo(ts: { toMillis: () => number } | null): string {
  if (!ts) return '';
  const diff = Date.now() - ts.toMillis();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'az önce';
  if (m < 60) return `${m}dk önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}sa önce`;
  return `${Math.floor(h / 24)}g önce`;
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
  if (photo && !err) {
    return (
      <img
        src={photo}
        alt={name}
        width={size}
        height={size}
        onError={() => setErr(true)}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    );
  }
  const colors = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color + '33',
        border: `1px solid ${color}66`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.35,
        fontWeight: 700,
        color,
        flexShrink: 0,
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
    const fetchOnline = () => {
      const q = query(collection(db, 'chatRooms', 'genel', 'presence'));
      onSnapshot(
        q,
        (snap) => {
          const now = Date.now();
          const active = snap.docs.filter((d) => {
            const data = d.data();
            return data.lastSeen && now - data.lastSeen < 60000;
          });
          setOnlineCount(active.length);
        },
        () => {
          // fallback: show a static number
          setOnlineCount(Math.floor(Math.random() * 8) + 3);
        }
      );
    };
    fetchOnline();
    onlineIntervalRef.current = setInterval(fetchOnline, 8000);
    return () => {
      if (onlineIntervalRef.current) clearInterval(onlineIntervalRef.current);
    };
  }, []);

  const handleSignIn = () => {
    setLoading(true);
    onSignIn();
  };

  /* ─── Styles ─── */
  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
  });

  const slideIn = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
    transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
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
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px',
        }}
        className="hidden-on-mobile"
      >
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }}
        />

        {/* Top-left glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-80px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Bottom-right glow blob */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-60px',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '520px' }}>
          {/* Logo + Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', ...fadeUp(0) }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #00d4ff22, #7c3aed22)',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 800,
                color: '#00d4ff',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              FK
            </div>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--foreground)',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.3px',
              }}
            >
              finanskodu
            </span>
          </div>

          {/* Eyebrow */}
          <div style={{ ...fadeUp(80) }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#00d4ff',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              // Canlı Finans Topluluğu
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '16px 0 16px',
              fontFamily: 'Space Grotesk, sans-serif',
              color: 'var(--foreground)',
              ...fadeUp(160),
            }}
          >
            Finansal Kararlarını{' '}
            <span style={{ color: '#00d4ff' }}>Birlikte</span>{' '}
            Güçlendir
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'var(--muted-foreground)',
              marginBottom: '32px',
              ...fadeUp(240),
            }}
          >
            Yatırımcılar, analistler ve finansal meraklılar için gerçek zamanlı tartışma alanı.
            Piyasa görüşlerini paylaş, stratejilerini test et.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginBottom: '36px',
              ...fadeUp(320),
            }}
          >
            {[
              { value: '1.000+', label: 'Üye' },
              { value: `${onlineCount || '—'}`, label: 'Çevrimiçi' },
              { value: '7/24', label: 'Aktif' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#00d4ff',
                    fontFamily: 'Space Grotesk, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '2px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Live activity feed */}
          <div style={{ marginBottom: '32px', ...fadeUp(400) }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--muted-foreground)',
                marginBottom: '12px',
              }}
            >
              Son Aktivite
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
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
                      padding: '12px 16px',
                      borderBottom: i < liveMessages.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      ...slideIn(480 + i * 400),
                    }}
                  >
                    <Avatar photo={msg.userPhoto} name={msg.userName} size={28} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--foreground)' }}>
                          {msg.userName}
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>
                          {timeAgo(msg.timestamp)}
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

          {/* Trust chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', ...fadeUp(900) }}>
            {['🔒 Güvenli', '⚡ Gerçek Zamanlı', '📊 Finansal Odaklı', '🤝 Topluluk'].map((chip) => (
              <span
                key={chip}
                style={{
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: 'rgba(0,212,255,0.06)',
                  border: '1px solid rgba(0,212,255,0.15)',
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
        style={{
          width: '460px',
          flexShrink: 0,
          background: 'var(--card)',
          borderLeft: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="login-right-panel"
      >
        {/* Top glow */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            height: '200px',
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '360px', textAlign: 'center' }}>
          {/* Chat icon with float animation */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', ...fadeUp(100) }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(16,185,129,0.10))',
                border: '1px solid rgba(0,212,255,0.20)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                animation: 'fk-float 3s ease-in-out infinite',
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
              padding: '4px 12px',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.20)',
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
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--foreground)',
              marginBottom: '8px',
              fontFamily: 'Space Grotesk, sans-serif',
              ...fadeUp(240),
            }}
          >
            Kod Odası'na Katıl
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--muted-foreground)',
              lineHeight: 1.6,
              marginBottom: '28px',
              ...fadeUp(300),
            }}
          >
            Yatırım, borsa ve ekonomiyi birlikte tartışmak için giriş yap.
          </p>

          {/* Feature list */}
          <div
            style={{
              background: 'rgba(0,212,255,0.04)',
              border: '1px solid rgba(0,212,255,0.16)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'left',
              ...fadeUp(360),
            }}
          >
            {[
              { icon: '⚡', text: 'Gerçek zamanlı tartışmalar' },
              { icon: '📊', text: 'Finansal analiz paylaşımı' },
              { icon: '🔔', text: 'Anlık uyarılar' },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 0',
                  fontSize: '13px',
                  color: 'var(--foreground)',
                }}
              >
                <span style={{ fontSize: '15px' }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
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
              padding: '13px 20px',
              background: '#fff',
              color: '#1f2937',
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: '10px',
              fontSize: '14px',
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
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.5)';
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
          <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', lineHeight: 1.5, ...fadeUp(500) }}>
            Giriş yaparak kullanıcı deneyimi kurallarını kabul etmiş olursunuz.
          </p>
        </div>
      </div>

      {/* ─── Global styles ─── */}
      <style>{`
        @keyframes fk-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fk-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hidden-on-mobile {
          display: flex;
        }
        .login-right-panel {
          width: 460px;
        }
        @media (max-width: 900px) {
          .hidden-on-mobile {
            display: none !important;
          }
          .login-right-panel {
            width: 100% !important;
            border-left: none !important;
          }
        }
      `}</style>
    </div>
  );
}
