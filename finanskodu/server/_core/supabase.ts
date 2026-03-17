import { createClient } from '@supabase/supabase-js';
import { ENV } from './env';

/**
 * Supabase Client for Kod Odası Backend
 * 
 * Uses environment variables from Manus system:
 * - VITE_SUPABASE_URL: Your Supabase project URL
 * - VITE_SUPABASE_ANON_KEY: Your Supabase anon/public key
 */

const supabaseUrl = ENV.supabaseUrl;
const supabaseAnonKey = ENV.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Management UI Secrets panel.'
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false, // Server-side doesn't need session persistence
    },
  }
);

/**
 * Database Types for Kod Odası
 */
export interface Post {
  id: string;
  user_id: string;
  username: string;
  avatar_url: string | null;
  category: 'Soru' | 'Kaynak' | 'Tartışma';
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Reaction {
  id: string;
  post_id: string;
  user_id: string;
  reaction_type: 'like' | 'bookmark';
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  username: string;
  avatar_url: string | null;
  content: string;
  created_at: string;
}

export interface PostWithStats extends Post {
  like_count: number;
  bookmark_count: number;
  comment_count: number;
}
