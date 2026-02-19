import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { LogIn, Send, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

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
  { id: "Tümü", label: "Tümü" },
  { id: "Soru", label: "Soru" },
  { id: "Kaynak", label: "Kaynak" },
  { id: "Tartışma", label: "Tartışma" },
] as const;

/* ─── Helpers ─── */
function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s önce`;
  if (diff < 3600) return `${Math.floor(diff / 60)}dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}sa önce`;
  return `${Math.floor(diff / 86400)}g önce`;
}

/* ─── Sub-components ─── */
function Avatar({ src, size = "md" }: { src: string | null; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "28px", md: "38px", lg: "46px" };
  const fallbackSrc = "https://api.dicebear.com/7.x/avataaars/svg?seed=default";
  return (
    <img
      src={src || fallbackSrc}
      alt="Avatar"
      style={{
        width: sizes[size],
        height: sizes[size],
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  );
}

function TickerBand() {
  return (
    <div style={{
      background: "linear-gradient(90deg, #0D1117 0%, #141B24 50%, #0D1117 100%)",
      borderBottom: "1px solid #1E2D3D",
      overflow: "hidden",
      height: "42px",
      display: "flex",
      alignItems: "center",
    }}>
      <div style={{
        display: "flex",
        gap: "32px",
        animation: "scroll 30s linear infinite",
        whiteSpace: "nowrap",
      }}>
        {[...TICKER_DATA, ...TICKER_DATA].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", fontSize: "13px" }}>
            <span style={{ color: "#8899AA", fontWeight: 600 }}>{item.symbol}</span>
            <span style={{ color: "#FFFFFF" }}>{item.value}</span>
            <span style={{ color: item.change.startsWith("+") ? "#10B981" : "#EF4444" }}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

interface PostCardProps {
  id: string;
  username: string;
  avatar_url: string | null;
  category: string;
  title: string;
  content: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  bookmark_count: number;
}

function PostCard({ id, username, avatar_url, category, title, content, created_at, like_count, comment_count, bookmark_count }: PostCardProps) {
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  const toggleReaction = trpc.kodOdasi.toggleReaction.useMutation({
    onSuccess: () => {
      utils.kodOdasi.getPosts.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleReaction = (reactionType: 'like' | 'bookmark') => {
    if (!isAuthenticated) {
      toast.error("Reaction eklemek için giriş yapmalısınız");
      return;
    }
    toggleReaction.mutate({ postId: id, reactionType });
  };

  return (
    <div style={{
      background: "#0D1117",
      border: "1px solid #1E2D3D",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "16px",
      transition: "all 0.2s ease",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <Avatar src={avatar_url} size="md" />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600 }}>{username}</span>
            <span style={{
              background: "#0EA5E9",
              color: "#FFFFFF",
              fontSize: "10px",
              padding: "2px 8px",
              borderRadius: "4px",
              fontWeight: 600,
            }}>
              {category}
            </span>
          </div>
          <span style={{ color: "#8899AA", fontSize: "12px" }}>{timeAgo(created_at)}</span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        color: "#FFFFFF",
        fontSize: "16px",
        fontWeight: 700,
        marginBottom: "8px",
        lineHeight: "1.4",
      }}>
        {title}
      </h3>

      {/* Content */}
      <p style={{
        color: "#8899AA",
        fontSize: "14px",
        lineHeight: "1.6",
        marginBottom: "16px",
      }}>
        {content}
      </p>

      {/* Actions */}
      <div style={{ display: "flex", gap: "16px", borderTop: "1px solid #1E2D3D", paddingTop: "12px" }}>
        <button
          onClick={() => handleReaction('like')}
          disabled={toggleReaction.isPending}
          style={{
            background: "transparent",
            border: "none",
            color: "#8899AA",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.2s",
          }}
        >
          👍 {like_count}
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "#8899AA",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          💬 {comment_count}
        </button>
        <button
          onClick={() => handleReaction('bookmark')}
          disabled={toggleReaction.isPending}
          style={{
            background: "transparent",
            border: "none",
            color: "#8899AA",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.2s",
          }}
        >
          🔖 {bookmark_count}
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function KodOdasi() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]["id"]>("Tümü");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    category: "Soru" as "Soru" | "Kaynak" | "Tartışma",
    title: "",
    content: "",
  });

  const utils = trpc.useUtils();

  // Fetch posts with optional category filter
  const { data: postsData, isLoading: postsLoading } = trpc.kodOdasi.getPosts.useQuery({
    category: selectedCategory === "Tümü" ? undefined : selectedCategory,
  });

  const createPost = trpc.kodOdasi.createPost.useMutation({
    onSuccess: () => {
      utils.kodOdasi.getPosts.invalidate();
      setShowNewPostModal(false);
      setNewPost({ category: "Soru", title: "", content: "" });
      toast.success("Post başarıyla oluşturuldu!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error("Başlık ve içerik boş olamaz");
      return;
    }
    createPost.mutate(newPost);
  };

  const posts = postsData?.posts || [];

  return (
    <>
      <Helmet>
        <title>Kod Odası - Finans Kodu</title>
        <meta name="description" content="Finans topluluğu - Hisse, döviz, kripto ve makro ekonomi tartışmaları" />
      </Helmet>

      <div style={{
        minHeight: "100vh",
        background: "#050810",
        color: "#FFFFFF",
      }}>
        {/* Ticker Band */}
        <TickerBand />

        {/* Main Container */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 16px" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{
              fontSize: "32px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "8px",
            }}>
              💬 Kod Odası
            </h1>
            <p style={{ color: "#8899AA", fontSize: "14px" }}>
              Finans topluluğu - Gerçek zamanlı piyasa tartışmaları
            </p>
          </div>

          {/* Category Filter */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  background: selectedCategory === cat.id ? "#0EA5E9" : "#141B24",
                  color: selectedCategory === cat.id ? "#FFFFFF" : "#8899AA",
                  border: "1px solid #1E2D3D",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* New Post Button */}
          {isAuthenticated ? (
            <button
              onClick={() => setShowNewPostModal(true)}
              style={{
                background: "#0EA5E9",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Send size={16} />
              Yeni Gönderi
            </button>
          ) : (
            <a
              href={getLoginUrl()}
              style={{
                background: "#141B24",
                color: "#0EA5E9",
                border: "1px solid #1E2D3D",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: "20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <LogIn size={16} />
              Gönderi paylaşmak için giriş yapın
            </a>
          )}

          {/* Posts List */}
          {postsLoading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <Loader2 className="animate-spin" size={32} style={{ color: "#0EA5E9", margin: "0 auto" }} />
              <p style={{ color: "#8899AA", marginTop: "12px" }}>Gönderiler yükleniyor...</p>
            </div>
          ) : posts.length === 0 ? (
            <div style={{
              background: "#0D1117",
              border: "1px solid #1E2D3D",
              borderRadius: "12px",
              padding: "40px",
              textAlign: "center",
            }}>
              <p style={{ color: "#8899AA", fontSize: "14px" }}>
                Henüz gönderi yok. İlk gönderiyi siz paylaşın!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))
          )}
        </div>

        {/* New Post Modal */}
        {showNewPostModal && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}>
            <div style={{
              background: "#0D1117",
              border: "1px solid #1E2D3D",
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "600px",
              width: "100%",
            }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
                Yeni Gönderi
              </h2>

              {/* Category Select */}
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value as any })}
                style={{
                  width: "100%",
                  background: "#141B24",
                  color: "#FFFFFF",
                  border: "1px solid #1E2D3D",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                <option value="Soru">Soru</option>
                <option value="Kaynak">Kaynak</option>
                <option value="Tartışma">Tartışma</option>
              </select>

              {/* Title Input */}
              <input
                type="text"
                placeholder="Başlık (min 5 karakter)"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                style={{
                  width: "100%",
                  background: "#141B24",
                  color: "#FFFFFF",
                  border: "1px solid #1E2D3D",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              />

              {/* Content Textarea */}
              <textarea
                placeholder="İçerik (min 10 karakter)"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={6}
                style={{
                  width: "100%",
                  background: "#141B24",
                  color: "#FFFFFF",
                  border: "1px solid #1E2D3D",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "14px",
                  marginBottom: "16px",
                  resize: "vertical",
                }}
              />

              {/* Actions */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  disabled={createPost.isPending}
                  style={{
                    background: "#141B24",
                    color: "#8899AA",
                    border: "1px solid #1E2D3D",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  İptal
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={createPost.isPending}
                  style={{
                    background: "#0EA5E9",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {createPost.isPending ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Gönder
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
