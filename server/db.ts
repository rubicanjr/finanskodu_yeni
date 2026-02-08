import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, profiles, analysisResults, Profile, InsertProfile, AnalysisResult, InsertAnalysisResult } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get or create user profile
 */
export async function getOrCreateProfile(userId: number): Promise<Profile> {
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
export async function getProfileByUserId(userId: number): Promise<Profile | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Increment daily usage count and check if reset is needed
 */
export async function incrementUsageCount(userId: number): Promise<Profile> {
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

  await db.insert(analysisResults).values(data);
  // Get the most recent analysis result for this user and ticker
  const saved = await db.select().from(analysisResults)
    .where(and(eq(analysisResults.userId, data.userId), eq(analysisResults.ticker, data.ticker)))
    .orderBy(analysisResults.createdAt)
    .limit(1);
  
  if (saved.length === 0) {
    throw new Error("Failed to save analysis result");
  }
  return saved[0];
}

/**
 * Get analysis results by user and ticker
 */
export async function getAnalysisResults(userId: number, ticker: string): Promise<AnalysisResult[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(analysisResults)
    .where(and(eq(analysisResults.userId, userId), eq(analysisResults.ticker, ticker)))
    .orderBy(analysisResults.createdAt);
}

// TODO: add feature queries here as your schema grows.
