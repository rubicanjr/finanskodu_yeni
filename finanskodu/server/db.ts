import { eq, and, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { 
  InsertUser, 
  users, 
  profiles, 
  analysisResults, 
  Profile, 
  InsertProfile, 
  AnalysisResult, 
  InsertAnalysisResult,
  posts,
  comments,
  likes,
  bookmarks,
  Post,
  InsertPost,
  Comment,
  InsertComment,
  Like,
  InsertLike,
  Bookmark,
  InsertBookmark
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _client: ReturnType<typeof postgres> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
// Use SUPABASE_DATABASE_URL for Kod Odası (PostgreSQL)
export async function getDb() {
  if (!_db && ENV.supabaseDatabaseUrl) {
    try {
      _client = postgres(ENV.supabaseDatabaseUrl, {
        max: 20,
        idle_timeout: 30,
        connect_timeout: 10,
      });
      _db = drizzle(_client);
      console.log("[Database] Connected to Supabase PostgreSQL");
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/**
 * Upsert user (for Supabase Auth compatibility)
 * Note: Supabase Auth manages users in auth.users table
 * This function syncs user data to our public.users table
 */
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User id (UUID) is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
      name: user.name ?? null,
      email: user.email ?? null,
      avatarUrl: user.avatarUrl ?? null,
      role: user.role ?? "user",
      lastSignedIn: user.lastSignedIn ?? new Date(),
    };

    // PostgreSQL upsert using ON CONFLICT
    await db
      .insert(users)
      .values(values)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          name: values.name,
          email: values.email,
          avatarUrl: values.avatarUrl,
          lastSignedIn: values.lastSignedIn,
          updatedAt: new Date(),
        },
      });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

/**
 * Get user by UUID (Supabase Auth user ID)
 */
export async function getUserById(userId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get or create user profile
 */
export async function getOrCreateProfile(userId: string): Promise<Profile> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const existing = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  
  if (existing.length > 0) {
    return existing[0];
  }

  // Create new profile with free tier
  const newProfile: InsertProfile = {
    userId,
    subscriptionTier: "free",
    usageCount: 0,
    lastResetDate: new Date(),
  };

  await db.insert(profiles).values(newProfile);
  const created = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  return created[0];
}

/**
 * Get user profile by userId
 */
export async function getProfileByUserId(userId: string): Promise<Profile | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Increment daily usage count and check if reset is needed
 */
export async function incrementUsageCount(userId: string): Promise<Profile> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const profile = await getOrCreateProfile(userId);
  const now = new Date();
  const lastReset = new Date(profile.lastResetDate);
  
  // Reset count if more than 24 hours have passed
  const daysSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24);
  const shouldReset = daysSinceReset >= 1;

  const newCount = shouldReset ? 1 : profile.usageCount + 1;
  const newResetDate = shouldReset ? now : profile.lastResetDate;

  await db.update(profiles)
    .set({
      usageCount: newCount,
      lastResetDate: newResetDate,
    })
    .where(eq(profiles.userId, userId));

  return getOrCreateProfile(userId);
}

/**
 * Save analysis result
 */
export async function saveAnalysisResult(data: InsertAnalysisResult): Promise<AnalysisResult> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const inserted = await db.insert(analysisResults).values(data).returning();
  
  if (inserted.length === 0) {
    throw new Error("Failed to save analysis result");
  }
  return inserted[0];
}

/**
 * Get analysis results by user and ticker
 */
export async function getAnalysisResults(userId: string, ticker: string): Promise<AnalysisResult[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(analysisResults)
    .where(and(eq(analysisResults.userId, userId), eq(analysisResults.ticker, ticker)))
    .orderBy(desc(analysisResults.createdAt));
}

// ============================================
// KOD ODASI DATABASE QUERIES
// ============================================

/**
 * Get all posts with optional filtering
 */
export async function getPosts(options?: {
  category?: string;
  postType?: "question" | "resource" | "discussion";
  limit?: number;
  offset?: number;
}): Promise<Post[]> {
  const db = await getDb();
  if (!db) return [];

  const conditions = [];

  if (options?.category && options.category !== "all") {
    conditions.push(eq(posts.category, options.category));
  }

  if (options?.postType) {
    conditions.push(eq(posts.postType, options.postType));
  }

  let query = db.select().from(posts);

  if (conditions.length > 0) {
    query = query.where(conditions.length === 1 ? conditions[0] : and(...conditions)) as any;
  }

  query = query.orderBy(desc(posts.createdAt)) as any;

  if (options?.limit) {
    query = query.limit(options.limit) as any;
  }

  if (options?.offset) {
    query = query.offset(options.offset) as any;
  }

  return query;
}

/**
 * Get post by ID
 */
export async function getPostById(postId: string): Promise<Post | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create new post
 */
export async function createPost(data: InsertPost): Promise<Post> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const inserted = await db.insert(posts).values(data).returning();
  
  if (inserted.length === 0) {
    throw new Error("Failed to create post");
  }
  return inserted[0];
}

/**
 * Update post
 */
export async function updatePost(postId: string, data: Partial<InsertPost>): Promise<Post> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const updated = await db.update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, postId))
    .returning();
  
  if (updated.length === 0) {
    throw new Error("Post not found");
  }
  return updated[0];
}

/**
 * Delete post
 */
export async function deletePost(postId: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(posts).where(eq(posts.id, postId));
}

/**
 * Get comments for a post
 */
export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(desc(comments.createdAt));
}

/**
 * Create new comment
 */
export async function createComment(data: InsertComment): Promise<Comment> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const inserted = await db.insert(comments).values(data).returning();
  
  if (inserted.length === 0) {
    throw new Error("Failed to create comment");
  }

  // Increment comments count on post
  await db.update(posts)
    .set({ commentsCount: sql`${posts.commentsCount} + 1` })
    .where(eq(posts.id, data.postId));

  return inserted[0];
}

/**
 * Check if user has liked a post
 */
export async function hasUserLikedPost(userId: string, postId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const result = await db.select().from(likes)
    .where(and(eq(likes.userId, userId), eq(likes.postId, postId)))
    .limit(1);

  return result.length > 0;
}

/**
 * Toggle like on post
 */
export async function togglePostLike(userId: string, postId: string): Promise<{ liked: boolean }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const existingLike = await db.select().from(likes)
    .where(and(eq(likes.userId, userId), eq(likes.postId, postId)))
    .limit(1);

  if (existingLike.length > 0) {
    // Unlike
    await db.delete(likes).where(eq(likes.id, existingLike[0].id));
    await db.update(posts)
      .set({ likesCount: sql`GREATEST(0, ${posts.likesCount} - 1)` })
      .where(eq(posts.id, postId));
    return { liked: false };
  } else {
    // Like
    await db.insert(likes).values({ userId, postId });
    await db.update(posts)
      .set({ likesCount: sql`${posts.likesCount} + 1` })
      .where(eq(posts.id, postId));
    return { liked: true };
  }
}

/**
 * Check if user has bookmarked a post
 */
export async function hasUserBookmarkedPost(userId: string, postId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const result = await db.select().from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.postId, postId)))
    .limit(1);

  return result.length > 0;
}

/**
 * Toggle bookmark on post
 */
export async function togglePostBookmark(userId: string, postId: string): Promise<{ bookmarked: boolean }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const existingBookmark = await db.select().from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.postId, postId)))
    .limit(1);

  if (existingBookmark.length > 0) {
    // Remove bookmark
    await db.delete(bookmarks).where(eq(bookmarks.id, existingBookmark[0].id));
    return { bookmarked: false };
  } else {
    // Add bookmark
    await db.insert(bookmarks).values({ userId, postId });
    return { bookmarked: true };
  }
}

/**
 * Get user's bookmarked posts
 */
export async function getUserBookmarks(userId: string): Promise<Post[]> {
  const db = await getDb();
  if (!db) return [];

  const bookmarkedPosts = await db
    .select({ post: posts })
    .from(bookmarks)
    .innerJoin(posts, eq(bookmarks.postId, posts.id))
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));

  return bookmarkedPosts.map(row => row.post);
}
