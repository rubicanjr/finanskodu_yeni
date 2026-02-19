import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { createClient } from '@supabase/supabase-js';
import { ENV } from './env';

const supabaseUrl = ENV.supabaseUrl;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[Context] Missing Supabase credentials. Auth will not work.');
}

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
  supabase: ReturnType<typeof createClient> | null;
};

/**
 * Create tRPC context with Supabase Auth
 * Extracts user from Authorization header (Bearer token)
 */
export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  if (supabase) {
    try {
      // Get token from Authorization header
      const authHeader = opts.req.headers.authorization;
      const token = authHeader?.replace('Bearer ', '');

      if (token) {
        // Verify token and get user
        const { data: { user: supabaseUser }, error } = await supabase.auth.getUser(token);

        if (!error && supabaseUser) {
          // Map Supabase user to our User type
          user = {
            id: supabaseUser.id,
            name: supabaseUser.user_metadata?.name || null,
            email: supabaseUser.email || null,
            avatarUrl: supabaseUser.user_metadata?.avatar_url || null,
            role: supabaseUser.user_metadata?.role || 'user',
            createdAt: new Date(supabaseUser.created_at),
            updatedAt: new Date(),
            lastSignedIn: new Date(),
          };
        }
      }
    } catch (error) {
      console.error('[Context] Auth error:', error);
      user = null;
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
    supabase,
  };
}
