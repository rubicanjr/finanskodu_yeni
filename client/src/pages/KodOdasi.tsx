import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/_core/hooks/useAuth";
import { LogIn, Send, Loader2, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  { id: "AI", label: "AI" },
  { id: "Otomasyon", label: "Otomasyon" },
  { id: "Excel", label: "Excel" },
  { id: "Altın", label: "Altın" },
  { id: "Hisse", label: "Hisse" },
  { id: "Kripto", label: "Kripto" },
] as const;

/* ─── Helpers ─── */
function timeAgo(date: Date | string) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
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
    <div className="ticker-band-container" style={{
      position: "sticky",
      top: "44px",
      zIndex: 100,
      background: "#0D1117",  /* Katman 1: Tam opak */
      backdropFilter: "blur(12px)",  /* Katman 2: Backdrop blur */
      WebkitBackdropFilter: "blur(12px)",  /* Safari uyumluğu */
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
        /* Katman 3: Gradient shadow */
        .ticker-band-container {
          position: relative;
        }
        .ticker-band-container::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 0;
          right: 0;
          height: 12px;
          background: linear-gradient(to bottom, #0D1117, transparent);
          pointer-events: none;
          z-index: 101;
        }
      `}</style>
    </div>
  );
}

interface PostCardProps {
  id: string;
  userId: string;
  title: string;
  content: string;
  postType: "question" | "resource" | "discussion";
  category: string;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
}

function PostCard({ id, userId, title, content, category, likesCount, commentsCount, createdAt }: PostCardProps) {
  const { isAuthenticated, user } = useAuth();
  const utils = trpc.useUtils();

  const toggleLike = trpc.kodOdasi.toggleLike.useMutation({
    onSuccess: () => {
      utils.kodOdasi.getPosts.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const toggleBookmark = trpc.kodOdasi.toggleBookmark.useMutation({
    onSuccess: () => {
      utils.kodOdasi.getPosts.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error("Beğenmek için giriş yapmalısınız");
      return;
    }
    toggleLike.mutate({ postId: id });
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      toast.error("Kaydetmek için giriş yapmalısınız");
      return;
    }
    toggleBookmark.mutate({ postId: id });
  };

  // Generate avatar from userId
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
  const username = user?.user_metadata?.name || user?.email?.split('@')[0] || "Anonim";

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
        <Avatar src={avatarUrl} size="md" />
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
          <span style={{ color: "#8899AA", fontSize: "12px" }}>{timeAgo(createdAt)}</span>
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
          onClick={handleLike}
          disabled={toggleLike.isPending}
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
          👍 {likesCount}
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
          💬 {commentsCount}
        </button>
        <button
          onClick={handleBookmark}
          disabled={toggleBookmark.isPending}
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
          🔖
        </button>
      </div>
    </div>
  );
}

/* ─── Auth Modal ─── */
function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Giriş başarılı!");
          onClose();
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Kayıt başarılı! Email adresinizi kontrol edin.");
          onClose();
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
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
      zIndex: 1000,
    }}>
      <div style={{
        background: "#0D1117",
        border: "1px solid #1E2D3D",
        borderRadius: "12px",
        padding: "32px",
        maxWidth: "400px",
        width: "90%",
        position: "relative",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            color: "#8899AA",
            cursor: "pointer",
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
          {mode === "signin" ? "Giriş Yap" : "Kayıt Ol"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {mode === "signup" && (
            <Input
              type="text"
              placeholder="İsim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={16} /> : mode === "signin" ? "Giriş Yap" : "Kayıt Ol"}
          </Button>
        </form>

        <p style={{ color: "#8899AA", fontSize: "14px", marginTop: "16px", textAlign: "center" }}>
          {mode === "signin" ? "Hesabınız yok mu? " : "Zaten hesabınız var mı? "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            style={{
              background: "transparent",
              border: "none",
              color: "#0EA5E9",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {mode === "signin" ? "Kayıt Ol" : "Giriş Yap"}
          </button>
        </p>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function KodOdasi() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newPost, setNewPost] = useState({
    category: "AI",
    postType: "question" as "question" | "resource" | "discussion",
    title: "",
    content: "",
  });

  const utils = trpc.useUtils();

  // Fetch posts with optional category filter
  const { data: postsData, isLoading: postsLoading } = trpc.kodOdasi.getPosts.useQuery({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    limit: 50,
  });

  const createPost = trpc.kodOdasi.createPost.useMutation({
    onSuccess: () => {
      utils.kodOdasi.getPosts.invalidate();
      setShowNewPostModal(false);
      setNewPost({ category: "AI", postType: "question", title: "", content: "" });
      toast.success("Gönderi başarıyla oluşturuldu!");
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

  const handleNewPostClick = () => {
    // Wait for auth to load before deciding
    if (authLoading) {
      toast.info("Yükleniyor, lütfen bekleyin...");
      return;
    }
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowNewPostModal(true);
    }
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
          <button
            onClick={handleNewPostClick}
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
            {isAuthenticated ? "Yeni Gönderi" : "Gönderi Paylaş (Giriş Gerekli)"}
          </button>

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
            zIndex: 1000,
          }}>
            <div style={{
              background: "#0D1117",
              border: "1px solid #1E2D3D",
              borderRadius: "12px",
              padding: "32px",
              maxWidth: "600px",
              width: "90%",
              position: "relative",
            }}>
              <button
                onClick={() => setShowNewPostModal(false)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "transparent",
                  border: "none",
                  color: "#8899AA",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>

              <h2 style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
                Yeni Gönderi Oluştur
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ color: "#8899AA", fontSize: "14px", marginBottom: "8px", display: "block" }}>
                    Kategori
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#141B24",
                      border: "1px solid #1E2D3D",
                      borderRadius: "8px",
                      padding: "12px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                    }}
                  >
                    {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ color: "#8899AA", fontSize: "14px", marginBottom: "8px", display: "block" }}>
                    Tür
                  </label>
                  <select
                    value={newPost.postType}
                    onChange={(e) => setNewPost({ ...newPost, postType: e.target.value as any })}
                    style={{
                      width: "100%",
                      background: "#141B24",
                      border: "1px solid #1E2D3D",
                      borderRadius: "8px",
                      padding: "12px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                    }}
                  >
                    <option value="question">Soru</option>
                    <option value="resource">Kaynak</option>
                    <option value="discussion">Tartışma</option>
                  </select>
                </div>

                <Input
                  type="text"
                  placeholder="Başlık"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />

                <Textarea
                  placeholder="İçerik"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={6}
                />

                <Button
                  onClick={handleCreatePost}
                  disabled={createPost.isPending}
                >
                  {createPost.isPending ? <Loader2 className="animate-spin" size={16} /> : "Gönder"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Auth Modal */}
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>
    </>
  );
}
