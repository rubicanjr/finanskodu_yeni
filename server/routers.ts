import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getOrCreateProfile, incrementUsageCount, getProfileByUserId, saveAnalysisResult } from "./db";
import { TRPCError } from "@trpc/server";
import { generateImage } from "./_core/imageGeneration";
import { getRealStockPrice, calculateTargetPrice } from "./_core/stockData";
import { getMarketTrend } from "./_core/marketTrend";

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
        
        // Fetch market trend data (includes jpMorganNote)
        const { getMarketTrend } = await import("./_core/marketTrend");
        const marketTrend = await getMarketTrend(ticker);
        const currentPrice = marketTrend.currentPrice;
        const jpMorganNote = marketTrend.jpMorganNote;
        const targetPrice = calculateTargetPrice(currentPrice);
        const turkishRule = "CRITICAL: RENDER TEXT IN HIGH RESOLUTION. The generated dashboard image must contain ONLY TURKISH text. Use labels: AL, SAT, HEDEF, ANALİZ. Do not use English words like Buy, Sell, Rating. Ensure correct Turkish output for characters: İ, Ş, Ğ, Ü, Ö, Ç. If rendering fails, replace difficult labels with uppercase standard font.";
        const magicWords = "High fidelity UI dashboard, cyberpunk finance interface, detailed candlesticks, numeric y-axis, sidebar with news text, glowing neon data visualization, 4k render. Aspect ratio: 16:9 landscape.";

        // Prompt 1: Technical Dashboard (Turkish)
        const technicalPrompt = `Abstract cyberpunk stock market visualization for ${ticker}. Dashboard with neon green and cyan colors. Show Current Price: ${currentPrice} TL. Turkish labels: AL (Buy), SAT (Sell), HEDEF (Target), ANALİZ (Analysis). RENDER TEXT ACCURATELY IN TURKISH LANGUAGE. Handle characters 'İ, Ş, Ğ, Ü, Ö, Ç' correctly. Do not use English terminology. ${turkishRule} ${magicWords}`;

        // Prompt 2: Social Sentiment (Turkish)
        const socialPrompt = `Abstract social sentiment visualization for ${ticker}. Flowing waves in neon colors. Show Current Price: ${currentPrice} TL. Turkish labels: AL, SAT, HEDEF, ANALİZ. RENDER TEXT ACCURATELY IN TURKISH LANGUAGE. Handle characters 'İ, Ş, Ğ, Ü, Ö, Ç' correctly. Pure artistic representation. ${turkishRule} ${magicWords}`;

        // Prompt 3: Fundamental Report (Turkish)
        const fundamentalPrompt = `Abstract fundamental analysis visualization for ${ticker}. Geometric shapes and gradients. Show Current Price: ${currentPrice} TL. Turkish labels: AL, SAT, HEDEF, ANALİZ. RENDER TEXT ACCURATELY IN TURKISH LANGUAGE. Handle characters 'İ, Ş, Ğ, Ü, Ö, Ç' correctly. Pure graphic art. ${turkishRule} ${magicWords}`;

        // Note: prompts are used by Wiro API but not returned to frontend

        // Generate images using Wiro API in PARALLEL with Promise.all
        let technicalImageUrl: string | undefined;
        let socialImageUrl: string | undefined;
        let fundamentalImageUrl: string | undefined;

        const results = await Promise.all([
          generateImage({ prompt: technicalPrompt }, ticker, jpMorganNote || undefined)
            .then((r) => r.url)
            .catch((error) => {
              console.error("Failed to generate technical visual:", error);
              return undefined;
            }),
          generateImage({ prompt: socialPrompt }, ticker, jpMorganNote)
            .then((r) => r.url)
            .catch((error) => {
              console.error("Failed to generate social visual:", error);
              return undefined;
            }),
          generateImage({ prompt: fundamentalPrompt }, ticker, jpMorganNote)
            .then((r) => r.url)
            .catch((error) => {
              console.error("Failed to generate fundamental visual:", error);
              return undefined;
            }),
        ]);

        technicalImageUrl = results[0];
        socialImageUrl = results[1];
        fundamentalImageUrl = results[2];

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
