import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
// Removed: Wiro API no longer used
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getOrCreateProfile, incrementUsageCount, getProfileByUserId, saveAnalysisResult } from "./db";
import { TRPCError } from "@trpc/server";
import { getRealStockPrice, calculateTargetPrice } from "./_core/stockData";
import { getMarketTrend } from "./_core/marketTrend";
import { analyzeStock } from "./_core/gemini";
import { getRealStockData } from "./_core/realStockData";
import { kodOdasiRouter } from "./kodOdasiRouter";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Profile and subscription management
  profile: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      const profile = await getOrCreateProfile(ctx.user.id);
      return profile;
    }),

    upgradeToProTier: protectedProcedure.mutation(async ({ ctx }) => {
      // In a real app, this would verify payment first
      const db = await (await import("./db")).getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const { profiles } = await import("../drizzle/schema");
      const { eq } = await import("drizzle-orm");

      await db.update(profiles)
        .set({ subscriptionTier: "pro" })
        .where(eq(profiles.userId, ctx.user.id));

      return { success: true, message: "Upgraded to Pro tier" };
    }),
  }),

  // Analysis operations
  analysis: router({
    checkQuota: protectedProcedure
      .input(z.object({ ticker: z.string() }))
      .query(async ({ ctx, input }) => {
        const profile = await getOrCreateProfile(ctx.user.id);
        
        // Demo mode bypass for THYAO and EREGL
        const demoTickers = ["THYAO", "EREGL"];
        if (demoTickers.includes(input.ticker.toUpperCase())) {
          return {
            allowed: true,
            isDemoMode: true,
            reason: "Demo ticker",
            remainingAnalyses: -1,
          };
        }

        // Check subscription tier
        if (profile.subscriptionTier === "pro") {
          return {
            allowed: true,
            isDemoMode: false,
            reason: "Pro tier - unlimited",
            remainingAnalyses: -1,
          };
        }

        // Free tier: 1 analysis per day
        if (profile.usageCount >= 1) {
          return {
            allowed: false,
            isDemoMode: false,
            reason: "Daily limit reached",
            remainingAnalyses: 0,
          };
        }

        return {
          allowed: true,
          isDemoMode: false,
          reason: "Free tier - 1 analysis available",
          remainingAnalyses: 1 - profile.usageCount,
        };
      }),

    startAnalysis: protectedProcedure
      .input(z.object({ ticker: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const profile = await getOrCreateProfile(ctx.user.id);
        
        // Demo mode bypass
        const demoTickers = ["THYAO", "EREGL"];
        if (demoTickers.includes(input.ticker.toUpperCase())) {
          return {
            success: true,
            isDemoMode: true,
            sessionId: `demo-${Date.now()}`,
          };
        }

        // Check quota
        if (profile.subscriptionTier === "free" && profile.usageCount >= 1) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Daily limit reached. Upgrade to Pro for unlimited analyses.",
          });
        }

        // Increment usage for free tier
        if (profile.subscriptionTier === "free") {
          await incrementUsageCount(ctx.user.id);
        }

        return {
          success: true,
          isDemoMode: false,
          sessionId: `analysis-${ctx.user.id}-${Date.now()}`,
        };
      }),

    analyzeStock: protectedProcedure
      .input(z.object({ ticker: z.string(), currentPrice: z.number() }))
      .mutation(async ({ ctx, input }) => {
        try {
          const result = await analyzeStock(input.ticker, input.currentPrice);
          return {
            success: true,
            analysis: result.analysis,
            ticker: result.ticker,
            currentPrice: result.currentPrice,
          };
        } catch (error) {
          console.error("Stock analysis error:", error);
          return {
            success: false,
            analysis: "Analiz şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
            ticker: input.ticker,
            currentPrice: input.currentPrice,
          };
        }
      }),

    getRealData: protectedProcedure
      .input(z.object({ ticker: z.string() }))
      .query(async ({ input }) => {
        try {
          const data = await getRealStockData(input.ticker);
          return {
            success: true,
            data,
          };
        } catch (error) {
          console.error("Real stock data error:", error);
          return {
            success: false,
            data: null,
            error: "Veri çekme hatası. Lütfen daha sonra tekrar deneyin.",
          };
        }
      }),


    saveResult: protectedProcedure
      .input(z.object({
        ticker: z.string(),
        resultImageUrl: z.string().optional(),
        analysisData: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await saveAnalysisResult({
          userId: ctx.user.id,
          ticker: input.ticker,
          resultImageUrl: input.resultImageUrl,
          analysisData: input.analysisData,
        });
        return result;
      }),
  }),

  // Kod Odası (Community Forum)
  kodOdasi: kodOdasiRouter,
});

export type AppRouter = typeof appRouter;
