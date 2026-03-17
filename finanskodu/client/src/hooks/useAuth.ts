import { useState, useEffect, useCallback } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Sayfa yenilendiğinde redirect sonucunu işle
    getRedirectResult(auth).catch((err) => {
      console.error('Redirect result error:', err);
      setError('Giriş tamamlanamadı.');
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (err: any) {
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/network-request-failed') {
        await signInWithRedirect(auth, provider).catch(redirectErr => {
          setError('Giriş başarısız. Tarayıcı ayarlarınızı kontrol edin.');
        });
      } else {
        setError('Giriş yapılamadı. Lütfen tekrar deneyin.');
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      setError('Çıkış yapılamadı.');
    }
  }, []);

  return { user, loading, error, signIn, signOut };
}
