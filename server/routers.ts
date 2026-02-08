import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getOrCreateProfile, incrementUsageCount, getProfileByUserId, saveAnalysisResult } from "./db";
import { TRPCError } from "@trpc/server";
import { generateImage } from "./_core/imageGeneration";

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

    generateVisuals: protectedProcedure
      .input(z.object({ ticker: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const ticker = input.ticker.toUpperCase();
        const magicWords = "High fidelity UI dashboard, cyberpunk finance interface, detailed candlesticks, numeric y-axis, sidebar with news text, glowing neon data visualization, 4k render.";

        // Prompt 1: Technical Dashboard
        const technicalPrompt = `A professional Bloomberg Terminal style dashboard for stock ${ticker}. Split screen: Left side shows a detailed candlestick chart with moving averages and random financial indicators. Right side shows a News Feed list, Analyst Rating: BUY, and Target Price boxes. Dark mode, neon cyan accents. ${magicWords}`;

        // Prompt 2: Social Sentiment
        const socialPrompt = `A Social Media Analytics Dashboard for ${ticker}. Large center gauge showing Twitter Sentiment Score: High/Positive. Lists of Trending Hashtags and Influencer Mentions. Glassmorphism style cards. ${magicWords}`;

        // Prompt 3: Fundamental Report
        const fundamentalPrompt = `A Financial Report Card for ${ticker}. Letter grade A+ in a glowing circle. Progress bars for Cash Flow, Profitability, and Debt Ratio. Clean, structured data visualization. ${magicWords}`;

        // Note: prompts are used by Wiro API but not returned to frontend

        // Generate images using Wiro API
        let technicalImageUrl: string | undefined;
        let socialImageUrl: string | undefined;
        let fundamentalImageUrl: string | undefined;

        try {
          const technicalResult = await generateImage({ prompt: technicalPrompt });
          technicalImageUrl = technicalResult.url;
        } catch (error) {
          console.error("Failed to generate technical visual:", error);
        }

        try {
          const socialResult = await generateImage({ prompt: socialPrompt });
          socialImageUrl = socialResult.url;
        } catch (error) {
          console.error("Failed to generate social visual:", error);
        }

        try {
          const fundamentalResult = await generateImage({ prompt: fundamentalPrompt });
          fundamentalImageUrl = fundamentalResult.url;
        } catch (error) {
          console.error("Failed to generate fundamental visual:", error);
        }

        return {
          success: true,
          visuals: [
            {
              type: "technical" as const,
              title: "📈 Teknik Görünüm",
              imageUrl: technicalImageUrl ?? undefined,
            },
            {
              type: "social" as const,
              title: "🐦 Sosyal Medya",
              imageUrl: socialImageUrl ?? undefined,
              analysisText: "Son 24 saatte sosyal medyada boğa piyasası beklentisi hakim.",
            },
            {
              type: "fundamental" as const,
              title: "📊 Temel Analiz",
              imageUrl: fundamentalImageUrl ?? undefined,
            },
          ],
        };
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
});

export type AppRouter = typeof appRouter;
