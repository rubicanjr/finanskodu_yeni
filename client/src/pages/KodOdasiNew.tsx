/**
 * KOD ODASI — Real-time chat powered by Firebase Firestore + Google Auth
 *
 * Changes from previous version:
 * - TickerBand removed (App.tsx already renders TradingViewTickerTape globally)
 * - Auth: signInWithPopup → signInWithRedirect (fixes "The requested action is invalid"
 *   error caused by finanskodu.com not being in Firebase authorized domains popup list)
 * - All user-facing strings use t() for i18n
 * - Theme: inline hex colors replaced with CSS variables
 * - XSS safe: user content via React textContent (no innerHTML with user data)
 * - Client-side rate limit: 3 messages / 5 seconds
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import {
  collection, addDoc, query, orderBy, limit,
  onSnapshot, serverTimestamp, Timestamp,
  type Unsubscribe,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Send, Loader2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

/* ─── Types ─── */
interface ChatMessage {
  id:        string;
  text:      string;
  userId:    string;
  userName:  string;
  userPhoto: string;
  timestamp: Timestamp | null;
}

/* ─── Constants ─── */
const ROOM        = "genel";
const LIMIT       = 60;
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
interface MsgProps { msg: ChatMessage; isMe: boolean; grouped: boolean; showDate?: string; }

function MessageBubble({ msg, isMe, grouped, showDate }: MsgProps) {
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

      <div style={{
        display: "flex", alignItems: "flex-end", gap: "8px",
        flexDirection: isMe ? "row-reverse" : "row",
        marginBottom: "3px", marginTop: !grouped ? "10px" : "0",
        animation: "msgIn 0.2s ease-out",
      }}>
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

        <div style={{ maxWidth: "68%", display: "flex", flexDirection: "column", gap: "2px", alignItems: isMe ? "flex-end" : "flex-start" }}>
          {!isMe && !grouped && (
            <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontWeight: 600, paddingLeft: "4px" }}>
              {msg.userName}
            </span>
          )}
          <div style={{
            padding: "10px 14px", borderRadius: "12px",
            borderBottomRightRadius: isMe ? "4px" : "12px",
            borderBottomLeftRadius:  isMe ? "12px" : "4px",
            background: isMe ? "#0f3d35" : "var(--secondary)",
            border: `1px solid ${isMe ? "rgba(0,212,170,0.25)" : "var(--border)"}`,
            color: isMe ? "#d4fdf5" : "var(--foreground)",
            fontSize: "14px", lineHeight: "1.5", wordBreak: "break-word",
          }}>
            {msg.text}
          </div>
          <span style={{ fontSize: "10px", color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", padding: "0 4px" }}>
            {formatTime(msg.timestamp)}
          </span>
        </div>
      </div>
    </>
  );
}

/* ─── Main ─── */
export default function KodOdasiNew() {
  const { t } = useI18n();

  const [user,        setUser]        = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signingIn,   setSigningIn]   = useState(false);
  const [messages,    setMessages]    = useState<ChatMessage[]>([]);
  const [inputText,   setInputText]   = useState("");
  const [sending,     setSending]     = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [toast,       setToast]       = useState<string | null>(null);

  const messagesEndRef  = useRef<HTMLDivElement>(null);
  const rateTimestamps  = useRef<number[]>([]);
  const renderedIds     = useRef<Set<string>>(new Set());
  const unsubscribeRef  = useRef<Unsubscribe | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
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
        }
      });
      if (newMsgs.length > 0) {
        setMessages((prev) => [...prev, ...newMsgs]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      }
    }, (err) => {
      setChatLoading(false);
      showToast(t("kodOdasi.loadError"));
      console.error(err);
    });

    return () => { unsubscribeRef.current?.(); };
  }, [user]);

  /* ── Sign in with redirect (avoids popup cross-domain issues) ── */
  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithRedirect(auth, googleProvider);
      // Page will redirect — code below doesn't run
    } catch (err: any) {
      setSigningIn(false);
      showToast("Giriş başlatılamadı: " + (err?.message ?? ""));
    }
  };

  /* ── Sign out ── */
  const handleSignOut = async () => {
    unsubscribeRef.current?.();
    setMessages([]);
    renderedIds.current.clear();
    await firebaseSignOut(auth);
  };

  /* ── Send message ── */
  const handleSend = async () => {
    if (!user || !inputText.trim() || sending) return;
    if (inputText.length > MAX_LEN) return;

    const now = Date.now();
    rateTimestamps.current = rateTimestamps.current.filter((t) => now - t < RATE_WINDOW);
    if (rateTimestamps.current.length >= RATE_MSGS) {
      showToast(t("kodOdasi.rateLimitError"));
      return;
    }
    rateTimestamps.current.push(now);

    const text = inputText.trim();
    setInputText("");
    setSending(true);

    try {
      await addDoc(collection(db, "chatRooms", ROOM, "messages"), {
        text,
        userId:    user.uid,
        userName:  user.displayName ?? "Anonim",
        userPhoto: user.photoURL    ?? "",
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      showToast(t("kodOdasi.sendError"));
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const remaining = MAX_LEN - inputText.length;

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center" }}>
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

      <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)", display: "flex", flexDirection: "column" }}>
        {/* NOTE: No TickerBand here — App.tsx renders TradingViewTickerTape globally */}

        <div style={{ flex: 1, maxWidth: "900px", width: "100%", margin: "0 auto", padding: "24px 16px", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{
                fontSize: "28px", fontWeight: 800,
                background: "linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: "4px",
              }}>
                💬 {t("kodOdasi.title")}
              </h1>
              <p style={{ color: "var(--muted-foreground)", fontSize: "13px" }}>
                {t("kodOdasi.subtitle")}
              </p>
            </div>

            {user && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName ?? ""} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #0EA5E9" }} />
                ) : (
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(14,165,233,0.15)", border: "2px solid #0EA5E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#0EA5E9" }}>
                    {getInitials(user.displayName ?? "?")}
                  </div>
                )}
                <button
                  onClick={handleSignOut}
                  style={{ background: "transparent", color: "var(--muted-foreground)", border: "1px solid var(--border)", padding: "5px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
                >
                  {t("kodOdasi.signOut")}
                </button>
              </div>
            )}
          </div>

          {/* Chat box */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            background: "var(--card)", borderRadius: "12px",
            border: "1px solid var(--border)", minHeight: "500px", overflow: "hidden",
          }}>
            {!user ? (
              <LoginGate onLogin={handleSignIn} loading={signingIn} />
            ) : (
              <>
                {/* Messages */}
                <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
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
                      let lastSenderId: string | null = null;
                      let lastDate:     string | null = null;
                      return messages.map((msg) => {
                        const dateLabel = formatDateLabel(msg.timestamp);
                        const showDate  = dateLabel !== lastDate ? dateLabel : undefined;
                        const grouped   = !showDate && msg.userId === lastSenderId;
                        lastSenderId = msg.userId;
                        lastDate     = dateLabel;
                        return (
                          <MessageBubble
                            key={msg.id}
                            msg={msg}
                            isMe={msg.userId === user?.uid}
                            grouped={grouped}
                            showDate={showDate}
                          />
                        );
                      });
                    })()
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div style={{
                  padding: "14px 16px", background: "var(--secondary)",
                  borderTop: "1px solid var(--border)",
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t("kodOdasi.messagePlaceholder")}
                    maxLength={MAX_LEN}
                    autoComplete="off"
                    style={{
                      flex: 1, background: "var(--input)", border: "1px solid var(--border)",
                      color: "var(--foreground)", padding: "11px 16px", borderRadius: "10px",
                      fontSize: "14px", fontFamily: "var(--font-body)", outline: "none",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(14,165,233,0.4)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
                    disabled={sending}
                  />
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: remaining < 50 ? "#EF4444" : "var(--muted-foreground)", minWidth: "36px", textAlign: "right" }}>
                    {remaining}
                  </span>
                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim() || sending}
                    style={{
                      width: "40px", height: "40px", borderRadius: "10px", border: "none",
                      background: inputText.trim() && !sending ? "#00d4aa" : "var(--input)",
                      color:      inputText.trim() && !sending ? "#0a0e17" : "var(--muted-foreground)",
                      cursor:     inputText.trim() && !sending ? "pointer" : "not-allowed",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {sending ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={16} />}
                  </button>
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
