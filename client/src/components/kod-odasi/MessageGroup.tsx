import { Timestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhoto: string;
  timestamp: Timestamp | null;
}

interface MessageGroupProps {
  messages: Message[];
  userName: string;
  userPhoto: string;
}

export default function MessageGroup({ messages, userName, userPhoto }: MessageGroupProps) {
  if (messages.length === 0) return null;

  const firstMessage = messages[0];
  const timestamp = firstMessage.timestamp?.toDate();

  return (
    <div className="flex gap-3 p-4 hover:bg-secondary/50 transition-colors">
      <img
        src={userPhoto || '/assets/default-avatar.png'}
        alt={userName}
        className="w-10 h-10 rounded-full flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-foreground">{userName}</span>
          {timestamp && (
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(timestamp, { addSuffix: true, locale: tr })}
            </span>
          )}
        </div>
        <div className="space-y-1">
          {messages.map((msg) => (
            <p key={msg.id} className="text-foreground break-words">
              {msg.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
