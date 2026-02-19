/*
  KOD ODASI - REAL-TIME CHAT SYSTEM
  Vibe-tr.com style chat interface with Supabase real-time
*/

import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from '@supabase/supabase-js';
import { ENV } from '../../../server/_core/env';

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

/* ─── Types ─── */
interface Message {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  users?: {
    name: string;
    avatar_url: string | null;
  };
}

interface User {
  id: string;
  username: string;
  avatar_url: string | null;
}

/* ─── Ticker Band ─── */
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

/* ─── Message Component ─── */
function MessageBubble({ message, isOwnMessage }: { message: Message; isOwnMessage: boolean }) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <div style={{
      display: "flex",
      gap: "12px",
      marginBottom: "16px",
      flexDirection: isOwnMessage ? "row-reverse" : "row",
      animation: "slideIn 0.3s ease-out",
    }}>
      {/* Avatar */}
      <div style={{
        flexShrink: 0,
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: isOwnMessage ? "#0969DA" : "#1E2D3D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: 600,
        color: "#FFFFFF",
      }}>
        {message.users?.avatar_url ? (
          <img src={message.users.avatar_url} alt="Avatar" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
        ) : (
          getInitials(message.users?.name || "??")
        )}
      </div>

      {/* Message Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: isOwnMessage ? "flex-end" : "flex-start" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: isOwnMessage ? "#58A6FF" : "#8B949E" }}>
            {message.users?.name || "Unknown"}
          </span>
          <span style={{ fontSize: "12px", color: "#8B949E" }}>
            {formatTime(message.created_at)}
          </span>
        </div>
        <div style={{
          background: isOwnMessage ? "#0969DA" : "#1C2128",
          color: isOwnMessage ? "#FFFFFF" : "#E6EDF3",
          padding: "8px 12px",
          borderRadius: "6px",
          maxWidth: "70%",
          wordBreak: "break-word",
          lineHeight: "1.5",
          border: `1px solid ${isOwnMessage ? "#0860CA" : "#1E2D3D"}`,
        }}>
          {message.content}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function KodOdasiNew() {
  const { isAuthenticated, loading: authLoading, user: authUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Check user - use existing Manus Auth users table
  useEffect(() => {
    const checkUser = async () => {
      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user from existing users table (Manus Auth)
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('id, name, email, avatar_url')
          .eq('id', authUser.id)
          .single();

        if (fetchError) {
          console.error('Error fetching user:', fetchError);
          setLoading(false);
          return;
        }

        if (existingUser) {
          setCurrentUser({
            id: existingUser.id,
            username: existingUser.name || existingUser.email?.split('@')[0] || 'User',
            avatar_url: existingUser.avatar_url,
          });
        }
      } catch (error) {
        console.error('Error in checkUser:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [authUser]);

  // Load messages
  useEffect(() => {
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('kod_odasi_messages')
        .select('*, users(name, avatar_url)')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) {
        console.error('Error loading messages:', error);
      } else {
        setMessages(data || []);
        setTimeout(scrollToBottom, 100);
      }
    };

    loadMessages();
  }, []);

  // Real-time subscription
  useEffect(() => {
    const subscription = supabase
      .channel('kod_odasi_messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'kod_odasi_messages' },
        async (payload) => {
          // Fetch user data for new message
          const { data: userData } = await supabase
            .from('users')
            .select('name, avatar_url')
            .eq('id', payload.new.user_id)
            .single();

          const newMsg = {
            ...payload.new,
            users: userData,
          } as Message;

          setMessages(prev => [...prev, newMsg]);
          setTimeout(scrollToBottom, 100);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newMessage.trim() || sending) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('kod_odasi_messages')
        .insert([{
          user_id: currentUser.id,
          content: newMessage.trim(),
        }]);

      if (error) {
        console.error('Error sending message:', error);
        alert('Mesaj gönderilemedi: ' + error.message);
      } else {
        setNewMessage("");
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
    } finally {
      setSending(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  if (loading || authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#050810", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" size={32} style={{ color: "#0EA5E9" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "#050810", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <h2 style={{ color: "#E6EDF3", fontSize: "24px", fontWeight: 700 }}>Kod Odası'na Hoş Geldiniz</h2>
        <p style={{ color: "#8B949E", fontSize: "14px" }}>Sohbete katılmak için giriş yapmalısınız</p>
        <Button onClick={() => window.location.href = '/login'}>Giriş Yap</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Kod Odası - Finans Kodu</title>
        <meta name="description" content="Finans topluluğu - Gerçek zamanlı sohbetler" />
      </Helmet>

      <div style={{ minHeight: "100vh", background: "#050810", color: "#FFFFFF" }}>
        {/* Ticker Band */}
        <TickerBand />

        {/* Main Container */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 16px", display: "flex", flexDirection: "column", height: "calc(100vh - 42px - 44px)" }}>
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
              Finans topluluğu — Gerçek zamanlı sohbetler
            </p>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            background: "#0D1117",
            borderRadius: "8px",
            border: "1px solid #1E2D3D",
            marginBottom: "16px",
          }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#8B949E" }}>
                Henüz mesaj yok. İlk mesajı siz gönderin! 🚀
              </div>
            ) : (
              messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwnMessage={message.user_id === currentUser?.id}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "12px" }}>
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Mesajınızı yazın... (Shift+Enter = yeni satır)"
              style={{
                flex: 1,
                background: "#0D1117",
                border: "1px solid #1E2D3D",
                borderRadius: "6px",
                color: "#E6EDF3",
                padding: "10px 12px",
                fontSize: "14px",
                resize: "none",
                minHeight: "60px",
              }}
              disabled={sending}
            />
            <Button
              type="submit"
              disabled={!newMessage.trim() || sending}
              style={{
                background: "#0969DA",
                color: "#FFFFFF",
                padding: "10px 16px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
              {sending ? "Gönderiliyor..." : "Gönder"}
            </Button>
          </form>
        </div>

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
}
