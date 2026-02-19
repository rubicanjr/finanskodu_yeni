import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { supabase, type Post, type PostWithStats } from "./_core/supabase";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";

/**
 * Kod Odası tRPC Router
 * 
 * Handles community forum operations:
 * - Get posts (with optional category filter)
 * - Create new post (auth required)
 * - Add/remove reactions (auth required)
 * - Get/add comments (auth required for adding)
 */

export const kodOdasiRouter = router({
  /**
   * Get all posts with stats (like count, comment count, bookmark count)
   * Public - anyone can view posts
   */
  getPosts: publicProcedure
    .input(
      z.object({
        category: z.enum(['Tümü', 'Soru', 'Kaynak', 'Tartışma']).optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        let query = supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        // Filter by category if specified (exclude 'Tümü')
        if (input.category && input.category !== 'Tümü') {
          query = query.eq('category', input.category);
        }

        const { data: posts, error } = await query;

        if (error) {
          console.error('[Kod Odası] Error fetching posts:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch posts',
          });
        }

        // Fetch reaction counts for each post
        const postsWithStats: PostWithStats[] = await Promise.all(
          (posts || []).map(async (post) => {
            const { data: reactions } = await supabase
              .from('reactions')
              .select('reaction_type')
              .eq('post_id', post.id);

            const { data: comments } = await supabase
              .from('comments')
              .select('id')
              .eq('post_id', post.id);

            const like_count = reactions?.filter(r => r.reaction_type === 'like').length || 0;
            const bookmark_count = reactions?.filter(r => r.reaction_type === 'bookmark').length || 0;
            const comment_count = comments?.length || 0;

            return {
              ...post,
              like_count,
              bookmark_count,
              comment_count,
            };
          })
        );

        return { success: true, posts: postsWithStats };
      } catch (error) {
        console.error('[Kod Odası] Unexpected error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        });
      }
    }),

  /**
   * Create a new post
   * Protected - requires authentication
   */
  createPost: protectedProcedure
    .input(
      z.object({
        category: z.enum(['Soru', 'Kaynak', 'Tartışma']),
        title: z.string().min(5, 'Başlık en az 5 karakter olmalı').max(200, 'Başlık en fazla 200 karakter olabilir'),
        content: z.string().min(10, 'İçerik en az 10 karakter olmalı').max(5000, 'İçerik en fazla 5000 karakter olabilir'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log('[Kod Odası] Creating post with user:', {
          openId: ctx.user.openId,
          name: ctx.user.name,
          category: input.category,
          title: input.title,
        });

        const { data, error } = await supabase
          .from('posts')
          .insert({
            user_id: ctx.user.openId,
            username: ctx.user.name,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${ctx.user.name}`,
            category: input.category,
            title: input.title,
            content: input.content,
          })
          .select()
          .single();

        if (error) {
          console.error('[Kod Odası] Supabase error creating post:', {
            error,
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
          });
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Supabase error: ${error.message}`,
          });
        }

        console.log('[Kod Odası] Post created successfully:', data.id);

        return { success: true, post: data };
      } catch (error) {
        console.error('[Kod Odası] Unexpected error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        });
      }
    }),

  /**
   * Add or remove a reaction (like/bookmark)
   * Protected - requires authentication
   */
  toggleReaction: protectedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        reactionType: z.enum(['like', 'bookmark']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if reaction already exists
        const { data: existing } = await supabase
          .from('reactions')
          .select('id')
          .eq('post_id', input.postId)
          .eq('user_id', ctx.user.openId)
          .eq('reaction_type', input.reactionType)
          .single();

        if (existing) {
          // Remove reaction if it exists
          const { error } = await supabase
            .from('reactions')
            .delete()
            .eq('id', existing.id);

          if (error) {
            console.error('[Kod Odası] Error removing reaction:', error);
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to remove reaction',
            });
          }

          return { success: true, action: 'removed' };
        } else {
          // Add reaction if it doesn't exist
          const { error } = await supabase
            .from('reactions')
            .insert({
              post_id: input.postId,
              user_id: ctx.user.openId,
              reaction_type: input.reactionType,
            });

          if (error) {
            console.error('[Kod Odası] Error adding reaction:', error);
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to add reaction',
            });
          }

          return { success: true, action: 'added' };
        }
      } catch (error) {
        console.error('[Kod Odası] Unexpected error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        });
      }
    }),

  /**
   * Get comments for a post
   * Public - anyone can view comments
   */
  getComments: publicProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { data: comments, error } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', input.postId)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('[Kod Odası] Error fetching comments:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch comments',
          });
        }

        return { success: true, comments: comments || [] };
      } catch (error) {
        console.error('[Kod Odası] Unexpected error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        });
      }
    }),

  /**
   * Test Supabase connection and credentials
   * Public - for debugging
   */
  testConnection: publicProcedure
    .query(async () => {
      try {
        console.log('[Kod Odası] Testing Supabase connection...');
        console.log('[Kod Odası] ENV.supabaseUrl:', ENV.supabaseUrl ? 'SET' : 'MISSING');
        console.log('[Kod Odası] ENV.supabaseAnonKey:', ENV.supabaseAnonKey ? 'SET (length: ' + ENV.supabaseAnonKey.length + ')' : 'MISSING');

        // Test simple query
        const { data, error } = await supabase
          .from('posts')
          .select('count')
          .limit(1);

        if (error) {
          console.error('[Kod Odası] Supabase connection test FAILED:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
          });
          return {
            success: false,
            error: error.message,
            details: error.details,
            hint: error.hint,
          };
        }

        console.log('[Kod Odası] Supabase connection test SUCCESS');
        return {
          success: true,
          message: 'Supabase connection working',
          postsCount: data?.length || 0,
        };
      } catch (error: any) {
        console.error('[Kod Odası] Test connection unexpected error:', error);
        return {
          success: false,
          error: error.message || 'Unknown error',
        };
      }
    }),

  /**
   * Add a comment to a post
   * Protected - requires authentication
   */
  addComment: protectedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        content: z.string().min(1, 'Yorum boş olamaz').max(1000, 'Yorum en fazla 1000 karakter olabilir'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .insert({
            post_id: input.postId,
            user_id: ctx.user.openId,
            username: ctx.user.name,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${ctx.user.name}`,
            content: input.content,
          })
          .select()
          .single();

        if (error) {
          console.error('[Kod Odası] Error adding comment:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to add comment',
          });
        }

        return { success: true, comment: data };
      } catch (error) {
        console.error('[Kod Odası] Unexpected error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        });
      }
    }),
});
