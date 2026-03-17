import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import * as db from "./db";

/**
 * Kod Odası tRPC Router (Supabase Auth + Drizzle ORM)
 * 
 * Handles community forum operations:
 * - Get posts (with optional category/type filter)
 * - Create new post (auth required)
 * - Toggle like/bookmark (auth required)
 * - Get/add comments (auth required for adding)
 */

export const kodOdasiRouter = router({
  /**
   * Get all posts with optional filtering
   * Public - anyone can view posts
   */
  getPosts: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        postType: z.enum(['question', 'resource', 'discussion']).optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      try {
        console.log('[Kod Odası] Fetching posts:', input);

        const posts = await db.getPosts({
          category: input.category,
          postType: input.postType,
          limit: input.limit,
          offset: input.offset,
        });

        console.log('[Kod Odası] Posts fetched:', posts.length);

        return { success: true, posts };
      } catch (error) {
        console.error('[Kod Odası] Error fetching posts:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch posts',
        });
      }
    }),

  /**
   * Get single post by ID
   * Public - anyone can view
   */
  getPost: publicProcedure
    .input(z.object({ postId: z.string().uuid() }))
    .query(async ({ input }) => {
      try {
        const post = await db.getPostById(input.postId);

        if (!post) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Post not found',
          });
        }

        return { success: true, post };
      } catch (error) {
        console.error('[Kod Odası] Error fetching post:', error);
        throw error;
      }
    }),

  /**
   * Create a new post
   * Protected - requires authentication
   */
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string().min(5, 'Başlık en az 5 karakter olmalı').max(200, 'Başlık en fazla 200 karakter olabilir'),
        content: z.string().min(10, 'İçerik en az 10 karakter olmalı').max(5000, 'İçerik en fazla 5000 karakter olabilir'),
        postType: z.enum(['question', 'resource', 'discussion']),
        category: z.string().min(1, 'Kategori seçilmeli'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log('[Kod Odası] Creating post:', {
          userId: ctx.user.id,
          title: input.title,
          category: input.category,
        });

        const post = await db.createPost({
          userId: ctx.user.id,
          title: input.title,
          content: input.content,
          postType: input.postType,
          category: input.category,
        });

        console.log('[Kod Odası] Post created:', post.id);

        return { success: true, post };
      } catch (error) {
        console.error('[Kod Odası] Error creating post:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create post',
        });
      }
    }),

  /**
   * Update post
   * Protected - only post owner can update
   */
  updatePost: protectedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        title: z.string().min(5).max(200).optional(),
        content: z.string().min(10).max(5000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if user owns the post
        const existingPost = await db.getPostById(input.postId);
        
        if (!existingPost) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Post not found',
          });
        }

        if (existingPost.userId !== ctx.user.id) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You can only edit your own posts',
          });
        }

        const post = await db.updatePost(input.postId, {
          title: input.title,
          content: input.content,
        });

        return { success: true, post };
      } catch (error) {
        console.error('[Kod Odası] Error updating post:', error);
        throw error;
      }
    }),

  /**
   * Delete post
   * Protected - only post owner can delete
   */
  deletePost: protectedProcedure
    .input(z.object({ postId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if user owns the post
        const existingPost = await db.getPostById(input.postId);
        
        if (!existingPost) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Post not found',
          });
        }

        if (existingPost.userId !== ctx.user.id) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You can only delete your own posts',
          });
        }

        await db.deletePost(input.postId);

        return { success: true };
      } catch (error) {
        console.error('[Kod Odası] Error deleting post:', error);
        throw error;
      }
    }),

  /**
   * Toggle like on post
   * Protected - requires authentication
   */
  toggleLike: protectedProcedure
    .input(z.object({ postId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await db.togglePostLike(ctx.user.id, input.postId);

        return { success: true, ...result };
      } catch (error) {
        console.error('[Kod Odası] Error toggling like:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to toggle like',
        });
      }
    }),

  /**
   * Toggle bookmark on post
   * Protected - requires authentication
   */
  toggleBookmark: protectedProcedure
    .input(z.object({ postId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await db.togglePostBookmark(ctx.user.id, input.postId);

        return { success: true, ...result };
      } catch (error) {
        console.error('[Kod Odası] Error toggling bookmark:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to toggle bookmark',
        });
      }
    }),

  /**
   * Get comments for a post
   * Public - anyone can view comments
   */
  getComments: publicProcedure
    .input(z.object({ postId: z.string().uuid() }))
    .query(async ({ input }) => {
      try {
        const comments = await db.getCommentsByPostId(input.postId);

        return { success: true, comments };
      } catch (error) {
        console.error('[Kod Odası] Error fetching comments:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch comments',
        });
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
        parentCommentId: z.string().uuid().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const comment = await db.createComment({
          postId: input.postId,
          userId: ctx.user.id,
          content: input.content,
          parentCommentId: input.parentCommentId,
        });

        return { success: true, comment };
      } catch (error) {
        console.error('[Kod Odası] Error adding comment:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to add comment',
        });
      }
    }),

  /**
   * Get user's bookmarked posts
   * Protected - requires authentication
   */
  getBookmarks: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const posts = await db.getUserBookmarks(ctx.user.id);

        return { success: true, posts };
      } catch (error) {
        console.error('[Kod Odası] Error fetching bookmarks:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch bookmarks',
        });
      }
    }),

  /**
   * Check if user has liked/bookmarked a post
   * Protected - requires authentication
   */
  getUserPostStatus: protectedProcedure
    .input(z.object({ postId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      try {
        const [hasLiked, hasBookmarked] = await Promise.all([
          db.hasUserLikedPost(ctx.user.id, input.postId),
          db.hasUserBookmarkedPost(ctx.user.id, input.postId),
        ]);

        return { 
          success: true, 
          hasLiked, 
          hasBookmarked 
        };
      } catch (error) {
        console.error('[Kod Odası] Error fetching user post status:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch post status',
        });
      }
    }),
});
