/**
 * Two-stage image generation:
 * 1. Gemini: Generate clean background (NO TEXT)
 * 2. Sharp: Overlay Turkish text and labels
 */
import sharp from "sharp";
import { storagePut } from "server/storage";
import { ENV } from "./env";

export type GenerateImageOptions = {
  prompt: string;
  originalImages?: Array<{
    url?: string;
    b64Json?: string;
    mimeType?: string;
  }>;
};

export type GenerateImageResponse = {
  url?: string;
};

/**
 * STAGE 1: Generate background image using Gemini (NO TEXT)
 */
async function generateBackgroundImage(
  backgroundPrompt: string
): Promise<Buffer> {
  if (!ENV.forgeApiUrl) {
    throw new Error("BUILT_IN_FORGE_API_URL is not configured");
  }
  if (!ENV.forgeApiKey) {
    throw new Error("BUILT_IN_FORGE_API_KEY is not configured");
  }

  const baseUrl = ENV.forgeApiUrl.endsWith("/")
    ? ENV.forgeApiUrl
    : `${ENV.forgeApiUrl}/`;
  const fullUrl = new URL(
    "images.v1.ImageService/GenerateImage",
    baseUrl
  ).toString();

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "connect-protocol-version": "1",
      authorization: `Bearer ${ENV.forgeApiKey}`,
    },
    body: JSON.stringify({
      prompt: backgroundPrompt,
      original_images: [],
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Background image generation failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
    );
  }

  const result = (await response.json()) as {
    image: {
      b64Json: string;
      mimeType: string;
    };
  };

  const base64Data = result.image.b64Json;
  return Buffer.from(base64Data, "base64");
}

/**
 * STAGE 2: Add Turkish text overlay using Sharp
 */
async function addTurkishTextOverlay(
  baseImageBuffer: Buffer,
  ticker: string,
  jpEstimate: string | null
): Promise<Buffer> {
  // SVG overlay with Turkish text
  const svgOverlay = `
    <svg width="1600" height="1200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .ticker { fill: white; font-size: 96px; font-family: Arial, sans-serif; font-weight: bold; }
          .label { fill: #00ff88; font-size: 56px; font-family: Arial, sans-serif; }
          .note { fill: #888888; font-size: 36px; font-family: Arial, sans-serif; }
        </style>
      </defs>
      
      <!-- Ticker symbol -->
      <text x="100" y="160" class="ticker">${ticker}</text>
      
      <!-- JP Morgan estimate or fallback message -->
      ${
        jpEstimate
          ? `<text x="100" y="500" class="label">JP Morgan Tahmini: ${jpEstimate} TL</text>`
          : `<text x="100" y="500" class="note">JP Morgan'ın bu hisse için tahmini yok</text>`
      }
      
      <!-- Footer -->
      <text x="100" y="1100" class="note">Veri: Finans Kodu Analiz Motoru</text>
    </svg>
  `;

  // Composite SVG overlay onto base image
  const finalImage = await sharp(baseImageBuffer)
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  return finalImage;
}

/**
 * Main function: Two-stage image generation
 */
export async function generateImage(
  options: GenerateImageOptions,
  ticker?: string,
  jpEstimate?: string | null
): Promise<GenerateImageResponse> {
  try {
    // STAGE 1: Generate clean background (NO TEXT)
    const backgroundPrompt = `
      A professional financial dashboard background with:
      - Dark navy blue to deep purple gradient (#0a0e27 to #1a1a3e)
      - Subtle holographic UI panels (semi-transparent)
      - Glowing cyan accent lines
      - Stock market aesthetic
      CRITICAL: NO TEXT, NO NUMBERS, NO LABELS
      Just clean background elements
      Style: Modern fintech UI, similar to Bloomberg Terminal
      Aspect ratio: 16:9 landscape
    `;

    const bgImageBuffer = await generateBackgroundImage(backgroundPrompt);

    // STAGE 2: Add Turkish text overlay using Sharp
    const ticker_safe = ticker || "TICKER";
    const finalImageBuffer = await addTurkishTextOverlay(
      bgImageBuffer,
      ticker_safe,
      jpEstimate || null
    );

    // Save to S3
    const { url } = await storagePut(
      `generated/${Date.now()}.png`,
      finalImageBuffer,
      "image/png"
    );

    return {
      url,
    };
  } catch (error) {
    console.error("Error in two-stage image generation:", error);
    throw error;
  }
}
