import { useEffect, useRef } from 'react';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import MessageGroup from './MessageGroup';
import ChatInput from './ChatInput';

interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhoto: string;
  timestamp: Timestamp | null;
}

interface ChatLayoutProps {
  user: User;
  messages: ChatMessage[];
  loading: boolean;
  onSendMessage: (text: string) => void;
}

export default function ChatLayout({ user, messages, loading, onSendMessage }: ChatLayoutProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Group messages by user (consecutive messages from same user)
  const groupedMessages: Array<{ userId: string; userName: string; userPhoto: string; messages: ChatMessage[] }> = [];
  
  messages.forEach((msg) => {
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.userId === msg.userId) {
      lastGroup.messages.push(msg);
    } else {
      groupedMessages.push({
        userId: msg.userId,
        userName: msg.userName,
        userPhoto: msg.userPhoto,
        messages: [msg],
      });
    }
  });

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">#</span> genel
        </h1>
        <p className="text-sm text-muted-foreground">Finans topluluğu — Gerçek zamanlı sohbet</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Mesajlar yükleniyor...</p>
          </div>
        ) : groupedMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Henüz mesaj yok. İlk mesajı siz gönderin!</p>
          </div>
        ) : (
          <div>
            {groupedMessages.map((group, index) => (
              <MessageGroup
                key={`${group.userId}-${index}`}
                messages={group.messages}
                userName={group.userName}
                userPhoto={group.userPhoto}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={onSendMessage} disabled={loading} />
    </div>
  );
}
