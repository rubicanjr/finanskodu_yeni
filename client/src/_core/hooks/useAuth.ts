/**
 * Firebase Auth hook — replaces Supabase Auth
 * 
 * Supports:
 *  - Google Sign-In (popup)
 *  - Sign out
 *  - Persistent auth state (Firebase handles token refresh)
 * 
 * @example
 *   const { user, isAuthenticated, signInWithGoogle, signOut } = useAuth();
 */

import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export interface UseAuthReturn {
  user:              User | null;
  loading:           boolean;
  error:             string | null;
  isAuthenticated:   boolean;
  signInWithGoogle:  () => Promise<{ error: string | null }>;
  signOut:           () => Promise<{ error: string | null }>;
}

const googleProvider = new GoogleAuthProvider();

export function useAuth(): UseAuthReturn {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async (): Promise<{ error: string | null }> => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      // Persist/merge user profile in Firestore
      await setDoc(
        doc(db, "users", fbUser.uid),
        {
          name:      fbUser.displayName ?? "Anonim",
          email:     fbUser.email       ?? "",
          photoURL:  fbUser.photoURL    ?? "",
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      return { error: null };
    } catch (err: any) {
      // Ignore user-dismissed popup — not a real error
      if (err?.code === "auth/popup-closed-by-user") return { error: null };
      const msg = err?.message ?? "Giriş yapılamadı.";
      setError(msg);
      return { error: msg };
    }
  };

  const signOut = async (): Promise<{ error: string | null }> => {
    setError(null);
    try {
      await firebaseSignOut(auth);
      return { error: null };
    } catch (err: any) {
      const msg = err?.message ?? "Çıkış yapılamadı.";
      setError(msg);
      return { error: msg };
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signInWithGoogle,
    signOut,
  };
}
