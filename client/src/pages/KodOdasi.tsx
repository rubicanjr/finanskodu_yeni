import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { LogIn } from "lucide-react";

/* ─── Static Data ─── */
const TICKER_DATA = [
  { symbol: "BIST100", value: "9.847,23", change: "+1,24%" },
  { symbol: "USD/TRY", value: "32,84", change: "+0,18%" },
  { symbol: "EUR/TRY", value: "35,61", change: "-0,05%" },
  { symbol: "ALTIN/TRY", value: "2.847,50", change: "+0,92%" },
  { symbol: "BTC/USD", value: "67.432", change: "+3,14%" },
  { symbol: "XAU/USD", value: "2.318,40", change: "+0,47%" },
  { symbol: "THYAO", value: "284,60", change: "+2,30%" },
  { symbol: "SASA", value: "41,22", change: "-1,10%" },
  { symbol: "GARAN", value: "119,50", change: "+0,89%" },
  { symbol: "EREGL", value: "47,80", change: "-0,42%" },
];

const CATEGORIES = [
  { id: "all", label: "Tümü" },
  { id: "hisse", label: "Hisse" },
  { id: "doviz", label: "Döviz" },
  { id: "kripto", label: "Kripto" },
  { id: "makro", label: "Makro" },
  { id: "altin", label: "Altın" },
];

const REACTIONS = ["🔥", "💡", "📊", "⚠️", "✅"];

interface User {
  name: string;
  avatar: string;
  role: string;
}

interface Post {
  id: string;
  user: User;
  category: string;
  content: string;
  timestamp: string;
  reactions: Record<string, number>;
  userReactions: Record<string, boolean>;
}

const MOCK_USERS: User[] = [
  { name: "Sarp K.", avatar: "SK", role: "Analist" },
  { name: "Mert A.", avatar: "MA", role: "Trader" },
  { name: "Zeynep T.", avatar: "ZT", role: "CFO" },
  { name: "Ali R.", avatar: "AR", role: "Portföy Yöneticisi" },
];

const SEED_POSTS: Post[] = [
  {
    id: "1",
    user: MOCK_USERS[0],
    category: "makro",
    content: "Fed'in bugünkü açıklaması piyasalarda volatiliteyi artırdı. 2025 sonu için faiz beklentileri aşağı revize edildi. BIST bu ortamda nasıl konumlanır?",
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    reactions: { "🔥": 12, "💡": 7, "📊": 5, "⚠️": 2, "✅": 3 },
    userReactions: {},
  },
  {
    id: "2",
    user: MOCK_USERS[2],
    category: "altin",
    content: "Altın/TRY paritesinde güçlü momentum devam ediyor. Reel faizler negatif kaldığı sürece bu trendin sürmesini bekliyorum. DXY korelasyonuna bakılırsa 3.000 TL hedefi yakın vadede mümkün.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    reactions: { "🔥": 8, "💡": 14, "📊": 11, "⚠️": 1, "✅": 6 },
    userReactions: {},
  },
  {
    id: "3",
    user: MOCK_USERS[1],
    category: "hisse",
    content: "THYAO teknik olarak kritik direnç seviyesini aştı. 290 TL'nin üzerinde kapanış görürsek trend değişimi teyitlenebilir. Bilanço beklentileri de olumlu tarafta.",
    timestamp: new Date(Date.now() - 1000 * 60 * 47).toISOString(),
    reactions: { "🔥": 19, "💡": 6, "📊": 9, "⚠️": 4, "✅": 8 },
    userReactions: {},
  },
];

/* ─── Helpers ─── */
function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s önce`;
  if (diff < 3600) return `${Math.floor(diff / 60)}dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}sa önce`;
  return `${Math.floor(diff / 86400)}g önce`;
}

/* ─── Sub-components ─── */
function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "28px", md: "38px", lg: "46px" };
  const fontSizes = { sm: "10px", md: "13px", lg: "15px" };
  return (
    <div style={{
      width: sizes[size], height: sizes[size], borderRadius: "50%",
      background: "linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: fontSizes[size], fontWeight: 700, color: "#fff", flexShrink: 0,
      fontFamily: "'IBM Plex Mono', monospace",
    }}>
      {initials}
    </div>
  );
}

function TickerItem({ symbol, value, change }: { symbol: string; value: string; change: string }) {
  const isPositive = change.startsWith("+");
  return (
    <span className="inline-flex items-center gap-2 px-6 whitespace-nowrap" style={{ borderRight: "1px solid #1E2D3D" }}>
      <span className="font-mono text-[11px] tracking-wider" style={{ color: "#8899AA" }}>{symbol}</span>
      <span className="font-mono text-xs font-semibold" style={{ color: "#F0F4F8" }}>{value}</span>
      <span className="font-mono text-[11px]" style={{ color: isPositive ? "#10B981" : "#EF4444" }}>{change}</span>
    </span>
  );
}

const categoryColors: Record<string, string> = {
  hisse: "#10B981", doviz: "#0EA5E9", kripto: "#F59E0B", makro: "#8B5CF6", altin: "#D4A853", all: "#8899AA"
};
const categoryLabels: Record<string, string> = {
  hisse: "HİSSE", doviz: "DÖVİZ", kripto: "KRİPTO", makro: "MAKRO", altin: "ALTIN"
};

function PostCard({ post, onReact }: { post: Post; onReact: (postId: string, emoji: string) => void }) {
  return (
    <div
      className="rounded-[10px] p-5 transition-colors duration-200 hover:border-[#1E3A4A]"
      style={{ background: "#0D1117", border: "1px solid #1E2D3D" }}
    >
      <div className="flex gap-3.5">
        <Avatar initials={post.user.avatar} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-1">
            <span className="text-sm font-semibold" style={{ color: "#F0F4F8" }}>{post.user.name}</span>
            <span className="font-mono text-xs" style={{ color: "#8899AA" }}>{post.user.role}</span>
            <span
              className="font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
              style={{
                background: (categoryColors[post.category] || "#8899AA") + "20",
                color: categoryColors[post.category] || "#8899AA",
              }}
            >
              {categoryLabels[post.category] || post.category.toUpperCase()}
            </span>
            <span className="font-mono text-[11px] ml-auto" style={{ color: "#4A5568" }}>
              {timeAgo(post.timestamp)}
            </span>
          </div>
          <p className="text-sm leading-relaxed my-2" style={{ color: "#C8D6E5" }}>
            {post.content}
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {REACTIONS.map((emoji) => {
              const count = post.reactions[emoji] || 0;
              const reacted = post.userReactions[emoji];
              return (
                <button
                  key={emoji}
                  onClick={() => onReact(post.id, emoji)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-150 hover:border-[#2D4A5A]"
                  style={{
                    background: reacted ? "#1E2D3D" : "transparent",
                    border: `1px solid ${reacted ? "#0EA5E9" : "#1E2D3D"}`,
                    color: reacted ? "#0EA5E9" : "#8899AA",
                  }}
                >
                  <span>{emoji}</span>
                  {count > 0 && <span>{count}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function KodOdasi() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [inputText, setInputText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("makro");
  const [isLoading, setIsLoading] = useState(true);
  const [onlineCount] = useState(() => Math.floor(Math.random() * 40) + 28);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const tickerRef = useRef<HTMLDivElement>(null);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load posts from localStorage (client-side only for now)
  useEffect(() => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem("kododasi-posts");
      if (stored) {
        setPosts(JSON.parse(stored));
      } else {
        setPosts(SEED_POSTS);
        localStorage.setItem("kododasi-posts", JSON.stringify(SEED_POSTS));
      }
    } catch {
      setPosts(SEED_POSTS);
    }
    setIsLoading(false);
  }, []);

  const savePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    try {
      localStorage.setItem("kododasi-posts", JSON.stringify(newPosts));
    } catch { /* ignore */ }
  };

  const handlePost = () => {
    if (!inputText.trim() || inputText.length > 500) return;
    const displayName = user?.name || "Anonim";
    const initials = displayName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    const newPost: Post = {
      id: Date.now().toString(),
      user: { name: displayName, avatar: initials, role: "Üye" },
      category: selectedCategory,
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
      reactions: { "🔥": 0, "💡": 0, "📊": 0, "⚠️": 0, "✅": 0 },
      userReactions: {},
    };
    savePosts([newPost, ...posts]);
    setInputText("");
  };

  const handleReact = (postId: string, emoji: string) => {
    const updated = posts.map((p) => {
      if (p.id !== postId) return p;
      const alreadyReacted = p.userReactions[emoji];
      return {
        ...p,
        reactions: { ...p.reactions, [emoji]: Math.max(0, (p.reactions[emoji] || 0) + (alreadyReacted ? -1 : 1)) },
        userReactions: { ...p.userReactions, [emoji]: !alreadyReacted },
      };
    });
    savePosts(updated);
  };

  const filteredPosts = activeCategory === "all" ? posts : posts.filter((p) => p.category === activeCategory);
  const tickerItems = [...TICKER_DATA, ...TICKER_DATA];

  return (
    <div className="min-h-screen" style={{ background: "#050810", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <Helmet>
        <title>Kod Odası | Finans Kodu</title>
        <meta name="description" content="Finansal piyasaları analiz eden profesyonellerin buluşma noktası. Hisse, döviz, kripto ve makro ekonomi tartışmaları." />
        <link rel="canonical" href="https://finanskodu.com/kod-odasi" />
      </Helmet>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .post-new { animation: fadeSlideIn 0.35s ease forwards; }
        textarea { resize: none; outline: none; }
        textarea::placeholder { color: #4A5568; }
      `}</style>

      {/* TICKER BAND */}
      <div className="overflow-hidden flex items-center h-9" style={{ background: "#0D1117", borderBottom: "1px solid #1E2D3D" }}>
        <div
          ref={tickerRef}
          className="flex items-center w-max"
          style={{ animation: "ticker 40s linear infinite" }}
        >
          {tickerItems.map((item, i) => (
            <TickerItem key={i} {...item} />
          ))}
        </div>
      </div>

      {/* HEADER */}
      <div style={{ borderBottom: "1px solid #1E2D3D", padding: "28px 40px 22px" }}>
        <div className="max-w-[860px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="font-mono text-[11px] tracking-[0.12em] font-medium" style={{ color: "#0EA5E9" }}>
                // TARTIŞMA PLATFORMU
              </span>
              <h1 className="text-[28px] font-bold tracking-tight mt-1" style={{ color: "#F0F4F8" }}>
                KOD <span style={{ color: "#10B981" }}>ODASI</span>
              </h1>
              <p className="font-mono text-[13px] mt-1" style={{ color: "#8899AA" }}>
                Finansal piyasaları analiz eden profesyonellerin buluşma noktası.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px]" style={{ color: "#4A5568" }}>
                {currentTime.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} IST
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981", animation: "pulse 2s infinite" }} />
                <span className="font-mono text-[11px]" style={{ color: "#10B981" }}>{onlineCount} çevrimiçi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[860px] mx-auto px-5 sm:px-10 py-7">

        {/* INPUT PANEL */}
        {isAuthenticated ? (
          <div className="rounded-xl p-5 mb-6" style={{ background: "#0D1117", border: "1px solid #1E2D3D" }}>
            <div className="flex gap-3">
              <Avatar initials={user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "?"} />
              <div className="flex-1">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handlePost(); }}
                  placeholder="Piyasa hakkında görüşün nedir? (Ctrl+Enter ile paylaş)"
                  rows={3}
                  className="w-full bg-transparent border-none text-sm leading-relaxed"
                  style={{ color: "#F0F4F8" }}
                />
                <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid #1E2D3D" }}>
                  <div className="flex gap-1.5 items-center flex-wrap">
                    <span className="font-mono text-[11px] mr-1" style={{ color: "#4A5568" }}>KATEGORİ:</span>
                    {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className="font-mono text-[11px] px-2.5 py-1 rounded transition-all duration-150"
                        style={{
                          background: selectedCategory === cat.id ? "#0EA5E920" : "transparent",
                          border: `1px solid ${selectedCategory === cat.id ? "#0EA5E9" : "#1E2D3D"}`,
                          color: selectedCategory === cat.id ? "#0EA5E9" : "#4A5568",
                        }}
                      >
                        {cat.label.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="font-mono text-[11px]"
                      style={{ color: inputText.length > 400 ? "#EF4444" : "#4A5568" }}
                    >
                      {inputText.length}/500
                    </span>
                    <button
                      onClick={handlePost}
                      disabled={!inputText.trim() || inputText.length > 500}
                      className="px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-150"
                      style={{
                        background: inputText.trim() && inputText.length <= 500 ? "#0EA5E9" : "#1E2D3D",
                        color: inputText.trim() && inputText.length <= 500 ? "#fff" : "#4A5568",
                        cursor: inputText.trim() ? "pointer" : "not-allowed",
                        border: "none",
                      }}
                    >
                      Paylaş →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Login Prompt */
          <div className="rounded-xl p-6 mb-6 text-center" style={{ background: "#0D1117", border: "1px solid #1E2D3D" }}>
            <p className="text-sm mb-4" style={{ color: "#8899AA" }}>
              Görüşlerini paylaşmak için giriş yap. Giriş yapmadan da tartışmaları okuyabilirsin.
            </p>
            <a
              href={getLoginUrl()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: "#0EA5E9", color: "#fff" }}
            >
              <LogIn size={16} />
              Giriş Yap
            </a>
          </div>
        )}

        {/* CATEGORY FILTER */}
        <div className="flex gap-2 mb-5 items-center flex-wrap">
          <span className="font-mono text-[11px]" style={{ color: "#4A5568" }}>FİLTRE:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="font-mono text-xs px-3.5 py-1.5 rounded-md transition-all duration-150"
              style={{
                background: activeCategory === cat.id ? "#141B24" : "transparent",
                border: `1px solid ${activeCategory === cat.id ? "#1E2D3D" : "transparent"}`,
                color: activeCategory === cat.id ? "#F0F4F8" : "#8899AA",
              }}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px]" style={{ color: "#4A5568" }}>
            {filteredPosts.length} GÖNDERİ
          </span>
        </div>

        {/* POSTS FEED */}
        <div className="flex flex-col gap-2.5">
          {isLoading ? (
            <div className="text-center py-16 font-mono text-[13px]" style={{ color: "#4A5568" }}>
              <div className="mb-2" style={{ animation: "pulse 1.5s infinite" }}>▌</div>
              Yükleniyor...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 font-mono text-[13px]" style={{ color: "#4A5568" }}>
              Bu kategoride henüz gönderi yok.<br />
              <span style={{ color: "#0EA5E9" }}>İlk görüşü sen paylaş.</span>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="post-new">
                <PostCard post={post} onReact={handleReact} />
              </div>
            ))
          )}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-10 pt-6 flex justify-between items-center flex-wrap gap-2" style={{ borderTop: "1px solid #1E2D3D" }}>
          <span className="font-mono text-[11px]" style={{ color: "#4A5568" }}>
            KOD ODASI — Finans Kodu Tartışma Platformu
          </span>
          <span className="font-mono text-[11px]" style={{ color: "#4A5568" }}>
            Bu platform yatırım tavsiyesi içermez.
          </span>
        </div>
      </div>
    </div>
  );
}
