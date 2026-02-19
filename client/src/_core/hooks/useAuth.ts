import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, AuthError } from '@supabase/supabase-js';

export interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  refresh: () => Promise<void>;
}

/**
 * Supabase Auth hook
 * Replaces Manus Auth with Supabase authentication
 * 
 * @example
 * const { user, isAuthenticated, signIn, signOut } = useAuth();
 * 
 * // Sign in
 * const { error } = await signIn('user@example.com', 'password');
 * 
 * // Sign out
 * await signOut();
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('[Auth] Failed to get session:', error);
        setError(error);
      }
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      setError(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[Auth] Sign in error:', error);
      setError(error);
    } else {
      setUser(data.user);
    }

    setLoading(false);
    return { error };
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      console.error('[Auth] Sign up error:', error);
      setError(error);
    } else {
      setUser(data.user);
      
      // Sync user to public.users table
      if (data.user) {
        await supabase.from('users').insert({
          id: data.user.id,
          name,
          email: data.user.email,
          avatar_url: null,
          role: 'user',
        });
      }
    }

    setLoading(false);
    return { error };
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('[Auth] Sign out error:', error);
      setError(error);
    } else {
      setUser(null);
    }

    setLoading(false);
    return { error };
  };

  const refresh = async () => {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('[Auth] Refresh error:', error);
      setError(error);
    } else {
      setUser(session?.user ?? null);
    }
    
    setLoading(false);
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    refresh,
  };
}
