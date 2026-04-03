import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  collection, query, orderBy, limit, onSnapshot, 
  addDoc, serverTimestamp, Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhoto: string;
  timestamp: Timestamp | null;
}

const ROOM = 'genel';
const MESSAGE_LIMIT = 100;

export function useChat(userId: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'chatRooms', ROOM, 'messages'),
      orderBy('timestamp', 'asc'),
      limit(MESSAGE_LIMIT)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages: ChatMessage[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ChatMessage));
      setMessages(fetchedMessages);
      setLoading(false);
    }, (err) => {
      console.error('Chat error:', err);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const sendMessage = useCallback(async (text: string, user: any) => {
    if (!text.trim() || !user) return;

    await addDoc(collection(db, 'chatRooms', ROOM, 'messages'), {
      text: text.trim(),
      userId: user.uid,
      userName: user.displayName || 'Anonim',
      userPhoto: user.photoURL || '',
      timestamp: serverTimestamp(),
    });
  }, []);

  return { messages, loading, sendMessage };
}
