/**
 * KOD ODASI — Real-time chat powered by Firebase Firestore + Google Auth
 *
 * v2 Changes (pasted_content_12):
 * 1. Mesaj görsel sistemi: kendi (sağ, bg-primary), diğer (sol, avatar+isim), sistem (orta, cyan pill)
 * 2. Mesaj gruplama: aynı kullanıcı 2dk içinde ardışık → avatar/isim sadece ilk mesajda
 * 3. Header iyileştirmesi: online sayacı + çıkış butonu
 * 4. Pinned mesaj banner: Firebase'den çek
 * 5. Hover aksiyonları: emoji reaksiyon bar + yanıtla butonu
 * 6. Reaksiyonlar: Firebase reactions field, toggle fonksiyonu
 * 7. Reply sistemi: replyTo state, input üstünde önizleme
 * 8. Input alanı: textarea, auto-resize, yeni tasarım
 * 9. Typing indicator: Firestore tabanlı, 3sn timeout, animasyonlu dots
 * 10. Scroll-to-bottom butonu: yukarı scroll edince "↓ Yeni mesaj" pill
 *
 * Note: Typing indicator & online count use Firestore (no RTDB required)
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import {
  collection, addDoc, query, orderBy, limit,
  onSnapshot, serverTimestamp, Timestamp,
  doc, setDoc, updateDoc, getDoc, deleteDoc,
  type Unsubscribe,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

/* ─── Types ─── */
interface ChatMessage {
  id:        string;
  text:      string;
  userId:    string;
  userName:  string;
  userPhoto: string;
  timestamp: Timestamp | null;
  type?:     "user" | "system";
  reactions?: Record<string, string[]>;
  replyTo?:  { id: string; userName: string; text: string } | null;
}

interface ReplyPreview {
  id: string;
  userName: string;
  text: string;
}

/* ─── Constants ─── */
const ROOM        = "genel";
const LIMIT       = 80;
const MAX_LEN     = 500;
const RATE_MSGS   = 3;
const RATE_WINDOW = 5000;

const googleProvider = new GoogleAuthProvider();

/* ─── Helpers ─── */
function formatTime(ts: Timestamp | null): string {
  if (!ts) return "";
  return ts.toDate().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

function formatDateLabel(ts: Timestamp | null): string {
  if (!ts) return "";
  const d     = ts.toDate();
  const today = new Date();
  const diff  = Math.floor(
    (new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() -
     new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()) /
    86400000
  );
  if (diff === 0) return "Bugün";
  if (diff === 1) return "Dün";
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
}

function getInitials(name: string): string {
  return (name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ─── LoginGate ─── */
function LoginGate({ onLogin, loading }: { onLogin: () => void; loading: boolean }) {
  const { t } = useI18n();
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "24px", padding: "40px", textAlign: "center",
    }}>
      <div style={{
        width: "72px", height: "72px",
        background: "rgba(0,212,170,0.1)",
        border: "1px solid rgba(0,212,170,0.25)",
        borderRadius: "20px", display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: "36px", boxShadow: "0 0 40px rgba(0,212,170,0.12)",
      }}>
        🚀
      </div>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--foreground)", marginBottom: "8px" }}>
          {t("kodOdasi.loginTitle")}
        </h2>
        <p style={{ color: "var(--muted-foreground)", fontSize: "14px", maxWidth: "300px", lineHeight: "1.6" }}>
          {t("kodOdasi.loginDesc")}
        </p>
      </div>
      <button
        onClick={onLogin}
        disabled={loading}
        style={{
          display: "flex", alignItems: "center", gap: "12px",
          background: "white", color: "#1a1a1a", border: "none",
          padding: "13px 28px", borderRadius: "12px", cursor: loading ? "wait" : "pointer",
          fontSize: "15px", fontWeight: 600,
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)", opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        {t("kodOdasi.loginButton")}
      </button>
      <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>
        {t("kodOdasi.loginTerms")}
      </span>
    </div>
  );
}

/* ─── MessageBubble ─── */
interface MsgProps {
  msg: ChatMessage;
  isMe: boolean;
  grouped: boolean;
  showDate?: string;
  currentUserId: string;
  onReaction: (msgId: string, emoji: string) => void;
  onReply: (msg: ChatMessage) => void;
  onDelete: (msgId: string) => void;
}

function MessageBubble({ msg, isMe, grouped, showDate, currentUserId, onReaction, onReply, onDelete }: MsgProps) {
  const isSystem = msg.type === "system";

  return (
    <>
      {showDate && (
        <div style={{ textAlign: "center", margin: "12px 0 8px", position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "var(--border)", transform: "translateY(-50%)" }} />
          <span style={{ position: "relative", background: "var(--background)", padding: "0 12px", fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>
            {showDate}
          </span>
        </div>
      )}

      {/* ── Sistem bildirimi (Yönerge 1) ── */}
      {isSystem ? (
        <div className="flex justify-center my-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 max-w-[80%] text-center">
            <span>📌</span>
            <span>{msg.text}</span>
          </div>
        </div>
      ) : (
        /* ── Kullanıcı mesajı (Yönerge 1 & 2) ── */
        <div
          className="group relative"
          style={{
            display: "flex", alignItems: "flex-end", gap: "8px",
            flexDirection: isMe ? "row-reverse" : "row",
            marginBottom: "3px", marginTop: !grouped ? "10px" : "0",
            animation: "msgIn 0.2s ease-out",
          }}
        >
          {/* Avatar */}
          {!isMe && (
            <div style={{ width: "28px", height: "28px", visibility: grouped ? "hidden" : "visible", flexShrink: 0 }}>
              {msg.userPhoto ? (
                <img src={msg.userPhoto} alt={msg.userName} style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }} />
              ) : (
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                  {getInitials(msg.userName)}
                </div>
              )}
            </div>
          )}

          {/* Bubble + reactions */}
          <div style={{ maxWidth: "68%", display: "flex", flexDirection: "column", gap: "2px", alignItems: isMe ? "flex-end" : "flex-start", position: "relative" }}>
            {!isMe && !grouped && (
              <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontWeight: 600, paddingLeft: "4px" }}>
                {msg.userName}
              </span>
            )}

            {/* Reply preview in bubble */}
            {msg.replyTo && (
              <div style={{
                padding: "6px 10px", borderRadius: "8px",
                background: "var(--muted)", borderLeft: "3px solid #0ea5e9",
                marginBottom: "2px", maxWidth: "100%",
              }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#0ea5e9", marginBottom: "2px" }}>{msg.replyTo.userName}</p>
                <p style={{ fontSize: "11px", color: "var(--muted-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "220px" }}>{msg.replyTo.text}</p>
              </div>
            )}

            {/* Message bubble */}
            <div
              className={`rounded-2xl ${isMe ? "rounded-br-sm" : "rounded-bl-sm"}`}
              style={{
                padding: "10px 14px",
                background: isMe ? "hsl(var(--primary))" : "var(--card)",
                border: isMe ? "1px solid hsl(var(--primary) / 0.4)" : "1px solid var(--border)",
                color: isMe ? "hsl(var(--primary-foreground))" : "var(--foreground)",
                fontSize: "14px", lineHeight: "1.5", wordBreak: "break-word",
              }}
            >
              {msg.text}
            </div>

            {/* Reactions (Yönerge 6) */}
            {msg.reactions && Object.keys(msg.reactions).length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", paddingTop: "2px" }}>
                {Object.entries(msg.reactions).map(([emoji, users]) =>
                  users.length > 0 ? (
                    <button
                      key={emoji}
                      onClick={() => onReaction(msg.id, emoji)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-all ${
                        users.includes(currentUserId)
                          ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400"
                          : "bg-muted border-border text-muted-foreground hover:border-border"
                      }`}
                    >
                      {emoji} <span className="font-mono">{users.length}</span>
                    </button>
                  ) : null
                )}
              </div>
            )}

            <span style={{ fontSize: "10px", color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", padding: "0 4px" }}>
              {formatTime(msg.timestamp)}
            </span>

            {/* Hover action bar (Yönerge 5) */}
            <div className="msg-actions absolute -top-8 right-0 hidden group-hover:flex items-center gap-1 bg-card border border-border rounded-xl px-1.5 py-1 shadow-lg z-10">
              {["👍", "🔥", "💯", "😂"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => onReaction(msg.id, emoji)}
                  className="text-sm hover:scale-125 transition-transform p-0.5"
                >
                  {emoji}
                </button>
              ))}
              <div className="w-px h-4 bg-border mx-0.5" />
              <button
                onClick={() => onReply(msg)}
                className="text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded hover:bg-muted transition-colors"
              >
                ↩ Yanıtla
              </button>
              {isMe && (
                <>
                  <div className="w-px h-4 bg-border mx-0.5" />
                  <button
                    onClick={() => onDelete(msg.id)}
                    className="text-xs text-red-400 hover:text-red-300 px-1.5 py-0.5 rounded hover:bg-red-500/10 transition-colors"
                    title="Mesajı sil"
                  >
                    🗑️ Sil
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Main ─── */
export default function KodOdasiNew() {
  const { t } = useI18n();

  const [user,          setUser]          = useState<User | null>(null);
  const [authLoading,   setAuthLoading]   = useState(true);
  const [signingIn,     setSigningIn]     = useState(false);
  const [messages,      setMessages]      = useState<ChatMessage[]>([]);
  const [inputText,     setInputText]     = useState("");
  const [sending,       setSending]       = useState(false);
  const [chatLoading,   setChatLoading]   = useState(false);
  const [toast,         setToast]         = useState<string | null>(null);
  const [onlineCount,   setOnlineCount]   = useState(0);
  const [pinnedMessage, setPinnedMessage] = useState<string | null>(null);
  const [replyTo,       setReplyTo]       = useState<ReplyPreview | null>(null);
  const [typingUsers,   setTypingUsers]   = useState<string[]>([]);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messagesEndRef   = useRef<HTMLDivElement>(null);
  const messagesAreaRef  = useRef<HTMLDivElement>(null);
  const textareaRef      = useRef<HTMLTextAreaElement>(null);
  const rateTimestamps   = useRef<number[]>([]);
  const renderedIds      = useRef<Set<string>>(new Set());
  const unsubscribeRef   = useRef<Unsubscribe | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollBtn(false);
  }, []);

  /* ── Handle redirect result on mount ── */
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          const fbUser = result.user;
          await setDoc(
            doc(db, "users", fbUser.uid),
            { name: fbUser.displayName ?? "Anonim", email: fbUser.email ?? "", photoURL: fbUser.photoURL ?? "", lastLogin: serverTimestamp() },
            { merge: true }
          );
        }
      })
      .catch((err) => {
        if (err?.code !== "auth/no-auth-event") {
          console.error("Redirect result error:", err);
          showToast("Giriş tamamlanamadı: " + (err?.message ?? "Bilinmeyen hata"));
        }
      })
      .finally(() => setSigningIn(false));
  }, []);

  /* ── Auth state ── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  /* ── Pinned message ── */
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "chatRooms", ROOM),
      (snap) => {
        const data = snap.data();
        setPinnedMessage(data?.pinnedMessage ?? null);
      },
      () => { /* permission-denied: silently ignore */ }
    );
    return unsub;
  }, []);

  /* ── Online count (Firestore presence) ── */
  useEffect(() => {
    if (!user) return;
    const presenceRef = doc(db, "chatRooms", ROOM, "presence", user.uid);
    setDoc(presenceRef, { name: user.displayName ?? "Anonim", online: true, updatedAt: serverTimestamp() }).catch(() => {});

    const countUnsub = onSnapshot(
      collection(db, "chatRooms", ROOM, "presence"),
      (snap) => { setOnlineCount(snap.size); },
      () => { /* permission-denied: silently ignore */ }
    );

    return () => {
      deleteDoc(presenceRef).catch(() => {});
      countUnsub();
    };
  }, [user]);

  /* ── Typing indicator (Firestore) ── */
  useEffect(() => {
    if (!user) return;
    const typingCol = collection(db, "chatRooms", ROOM, "typing");
    const unsub = onSnapshot(
      typingCol,
      (snap) => {
        const names: string[] = [];
        snap.forEach((d) => {
          if (d.id !== user.uid) {
            const data = d.data();
            if (data.typing && data.name) names.push(data.name);
          }
        });
        setTypingUsers(names);
      },
      () => { /* permission-denied: silently ignore */ }
    );
    return unsub;
  }, [user]);

  /* ── Messages subscription ── */
  useEffect(() => {
    if (!user) return;
    setChatLoading(true);
    renderedIds.current.clear();

    const q = query(
      collection(db, "chatRooms", ROOM, "messages"),
      orderBy("timestamp", "asc"),
      limit(LIMIT)
    );

    unsubscribeRef.current = onSnapshot(q, (snapshot) => {
      setChatLoading(false);
      const newMsgs: ChatMessage[] = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const id = change.doc.id;
          if (renderedIds.current.has(id)) return;
          renderedIds.current.add(id);
          newMsgs.push({ id, ...change.doc.data() } as ChatMessage);
        } else if (change.type === "modified") {
          const id = change.doc.id;
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { id, ...change.doc.data() } as ChatMessage : m))
          );
        }
      });
      if (newMsgs.length > 0) {
        setMessages((prev) => [...prev, ...newMsgs]);
        const area = messagesAreaRef.current;
        if (area) {
          const nearBottom = area.scrollHeight - area.scrollTop - area.clientHeight < 120;
          if (nearBottom) {
            setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
          } else {
            setShowScrollBtn(true);
          }
        }
      }
    }, (err) => {
      setChatLoading(false);
      showToast(t("kodOdasi.loadError"));
      console.error(err);
    });

    return () => { unsubscribeRef.current?.(); };
  }, [user]);

  /* ── Scroll detection ── */
  const handleScroll = useCallback(() => {
    const area = messagesAreaRef.current;
    if (!area) return;
    const nearBottom = area.scrollHeight - area.scrollTop - area.clientHeight < 120;
    setShowScrollBtn(!nearBottom);
  }, []);

  /* ── Sign in ── */
  const handleSignIn = async () => {
    if (signingIn) return;
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setSigningIn(false);
    } catch (error: any) {
      if (
        error.code === "auth/popup-blocked" ||
        error.code === "auth/cancelled-popup-request" ||
        error.code === "auth/popup-closed-by-user"
      ) {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError: any) {
          showToast("Giriş başlatılamadı: " + (redirectError?.message ?? ""));
          setSigningIn(false);
        }
      } else {
        showToast("Giriş başlatılamadı: " + (error?.message ?? ""));
        setSigningIn(false);
      }
    }
  };

  /* ── Sign out ── */
  const handleSignOut = async () => {
    unsubscribeRef.current?.();
    if (user) {
      deleteDoc(doc(db, "chatRooms", ROOM, "presence", user.uid)).catch(() => {});
      deleteDoc(doc(db, "chatRooms", ROOM, "typing", user.uid)).catch(() => {});
    }
    setMessages([]);
    renderedIds.current.clear();
    await firebaseSignOut(auth);
  };

  /* ── Typing indicator write ── */
  const handleTyping = useCallback(() => {
    if (!user) return;
    const typingRef = doc(db, "chatRooms", ROOM, "typing", user.uid);
    setDoc(typingRef, { typing: true, name: user.displayName ?? "Anonim", updatedAt: serverTimestamp() });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      deleteDoc(typingRef).catch(() => {});
    }, 3000);
  }, [user]);

  /* ── Auto-resize textarea ── */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    handleTyping();
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 128) + "px";
  };

  /* ── Reaction toggle (Yönerge 6) ── */
  const handleReaction = useCallback(async (msgId: string, emoji: string) => {
    if (!user) return;
    const msgRef = doc(db, "chatRooms", ROOM, "messages", msgId);
    const snap = await getDoc(msgRef);
    if (!snap.exists()) return;
    const data = snap.data();
    const reactions: Record<string, string[]> = { ...(data.reactions ?? {}) };
    const users = reactions[emoji] ?? [];
    if (users.includes(user.uid)) {
      reactions[emoji] = users.filter((u) => u !== user.uid);
    } else {
      reactions[emoji] = [...users, user.uid];
    }
    await updateDoc(msgRef, { reactions });
  }, [user]);

  /* ── Delete message ── */
  const handleDelete = useCallback(async (msgId: string) => {
    if (!user) return;
    if (!window.confirm("Bu mesajı silmek istediğinizden emin misiniz?")) return;
    try {
      await deleteDoc(doc(db, "chatRooms", ROOM, "messages", msgId));
      setMessages((prev) => prev.filter((m) => m.id !== msgId));
    } catch (err) {
      showToast("Mesaj silinemedi.");
    }
  }, [user, showToast]);

  /* ── Send message ── */
  const handleSend = async () => {
    if (!user || !inputText.trim() || sending) return;
    if (inputText.length > MAX_LEN) return;

    const now = Date.now();
    rateTimestamps.current = rateTimestamps.current.filter((ts) => now - ts < RATE_WINDOW);
    if (rateTimestamps.current.length >= RATE_MSGS) {
      showToast(t("kodOdasi.rateLimitError"));
      return;
    }
    rateTimestamps.current.push(now);

    const text = inputText.trim();
    setInputText("");
    setSending(true);

    // Clear typing indicator
    if (user) {
      deleteDoc(doc(db, "chatRooms", ROOM, "typing", user.uid)).catch(() => {});
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      await addDoc(collection(db, "chatRooms", ROOM, "messages"), {
        text,
        userId:    user.uid,
        userName:  user.displayName ?? "Anonim",
        userPhoto: user.photoURL    ?? "",
        timestamp: serverTimestamp(),
        type:      "user",
        reactions: {},
        replyTo:   replyTo ?? null,
      });
      setReplyTo(null);
    } catch (err) {
      showToast(t("kodOdasi.sendError"));
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const remaining = MAX_LEN - inputText.length;

  if (authLoading) {
    return (
      <div style={{ height: "calc(100vh - 46px)", background: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" size={32} style={{ color: "#0EA5E9" }} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("kodOdasi.title")} — Finans Kodu</title>
        <meta name="description" content={t("kodOdasi.subtitle")} />
      </Helmet>

      <div style={{ height: "calc(100vh - 46px)", background: "var(--background)", color: "var(--foreground)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, maxWidth: "900px", width: "100%", margin: "0 auto", padding: "12px 16px", display: "flex", flexDirection: "column", minHeight: 0 }}>

          {/* ── Chat box ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--card)", borderRadius: "12px", border: "1px solid var(--border)", minHeight: 0, overflow: "hidden" }}>

            {!user ? (
              <LoginGate onLogin={handleSignIn} loading={signingIn} />
            ) : (
              <>
                {/* ── Header (Yönerge 3) ── */}
                <div className="flex items-center justify-between px-5 border-b border-border" style={{ height: "56px", flexShrink: 0 }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💬</span>
                    <div>
                      <h1 className="font-bold text-foreground text-sm">Kod Odası</h1>
                      <p className="text-xs text-muted-foreground">Finans topluluğu — Gerçek zamanlı sohbet</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono text-emerald-400">{onlineCount} çevrimiçi</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted"
                    >
                      Çıkış
                    </button>
                  </div>
                </div>

                {/* ── Pinned mesaj banner (Yönerge 4) ── */}
                {pinnedMessage && (
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-amber-500/15 text-sm cursor-pointer hover:bg-amber-500/12 transition-colors" style={{ background: "rgba(245,158,11,0.08)", flexShrink: 0 }}>
                    <span className="text-amber-400 text-xs">📌</span>
                    <span className="text-amber-400 text-xs font-semibold">Sabitlendi</span>
                    <span className="text-muted-foreground text-xs flex-1 truncate">{pinnedMessage}</span>
                  </div>
                )}

                {/* ── Messages (Yönerge 1 & 2) ── */}
                <div
                  ref={messagesAreaRef}
                  onScroll={handleScroll}
                  style={{ flex: 1, overflowY: "auto", padding: "16px 20px", position: "relative" }}
                >
                  {chatLoading ? (
                    <div style={{ textAlign: "center", color: "var(--muted-foreground)", padding: "40px", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                      ⟳ {t("kodOdasi.loading")}
                    </div>
                  ) : messages.length === 0 ? (
                    <div style={{ textAlign: "center", color: "var(--muted-foreground)", padding: "40px", fontSize: "14px" }}>
                      {t("kodOdasi.noMessages")} 🚀
                    </div>
                  ) : (
                    (() => {
                      let lastSenderId:  string | null = null;
                      let lastDate:      string | null = null;
                      let lastTimestamp: number | null = null;
                      return messages.map((msg) => {
                        const dateLabel = formatDateLabel(msg.timestamp);
                        const showDate  = dateLabel !== lastDate ? dateLabel : undefined;
                        const msgTs     = msg.timestamp?.toMillis() ?? null;
                        const isGrouped =
                          !showDate &&
                          msg.userId === lastSenderId &&
                          msgTs !== null &&
                          lastTimestamp !== null &&
                          msgTs - lastTimestamp < 120000;
                        lastSenderId  = msg.userId;
                        lastDate      = dateLabel;
                        lastTimestamp = msgTs;
                        return (
                          <MessageBubble
                            key={msg.id}
                            msg={msg}
                            isMe={msg.userId === user?.uid}
                            grouped={isGrouped}
                            showDate={showDate}
                            currentUserId={user?.uid ?? ""}
                            onReaction={handleReaction}
                            onReply={(m) => setReplyTo({ id: m.id, userName: m.userName, text: m.text })}
                            onDelete={handleDelete}
                          />
                        );
                      });
                    })()
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* ── Scroll to bottom (Yönerge 10) ── */}
                {showScrollBtn && (
                  <div style={{ position: "relative", height: 0 }}>
                    <button
                      onClick={scrollToBottom}
                      className="absolute right-6 flex items-center gap-2 px-3 py-2 bg-cyan-500 text-background text-xs font-semibold rounded-full shadow-lg hover:bg-cyan-400 transition-all"
                      style={{ zIndex: 20, bottom: "8px" }}
                    >
                      ↓ Yeni mesaj
                    </button>
                  </div>
                )}

                {/* ── Typing indicator (Yönerge 9) ── */}
                {typingUsers.length > 0 && (
                  <div className="px-5 py-1 flex items-center gap-2" style={{ flexShrink: 0 }}>
                    <div className="flex gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {typingUsers.join(", ")} yazıyor…
                    </span>
                  </div>
                )}

                {/* ── Reply preview (Yönerge 7) ── */}
                {replyTo && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted border-t border-border" style={{ flexShrink: 0 }}>
                    <div className="w-0.5 h-8 bg-cyan-500 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-cyan-400">{replyTo.userName}</p>
                      <p className="text-xs text-muted-foreground truncate">{replyTo.text}</p>
                    </div>
                    <button onClick={() => setReplyTo(null)} className="text-muted-foreground hover:text-foreground text-lg leading-none">×</button>
                  </div>
                )}

                {/* ── Input (Yönerge 8) ── */}
                <div className="input-area px-4 py-3 border-t border-border bg-background" style={{ flexShrink: 0 }}>
                  <div className="flex items-end gap-2 bg-card border border-border rounded-2xl px-4 py-3 focus-within:border-cyan-500/40 focus-within:ring-2 focus-within:ring-cyan-500/10 transition-all">
                    <textarea
                      ref={textareaRef}
                      value={inputText}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Mesajınızı yazın… (Enter ile gönder)"
                      rows={1}
                      maxLength={MAX_LEN}
                      className="flex-1 bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-muted-foreground max-h-32"
                      style={{ height: "auto" }}
                      disabled={sending}
                    />
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs font-mono ${remaining < 50 ? "text-amber-400" : "text-muted-foreground"}`}>
                        {remaining}
                      </span>
                      <button
                        onClick={handleSend}
                        disabled={!inputText.trim() || sending}
                        className="w-8 h-8 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      >
                        {sending ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#0D1117" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l3.5 1.5L11 4l-5 4.5L7 12l5-10z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div style={{
            position: "fixed", bottom: "24px", right: "24px",
            background: "#EF4444", color: "white",
            padding: "12px 18px", borderRadius: "10px",
            fontSize: "13px", fontFamily: "var(--font-mono)",
            zIndex: 9999, animation: "msgIn 0.3s ease-out",
          }}>
            {toast}
          </div>
        )}
      </div>

      <style>{`
        @keyframes msgIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin   { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      `}</style>
    </>
  );
}
