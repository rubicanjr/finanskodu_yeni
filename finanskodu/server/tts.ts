/**
 * Azure Speech Services TTS Backend Proxy
 * 
 * This module provides a secure backend proxy for Azure Neural TTS.
 * API keys are kept server-side and never exposed to the frontend.
 * 
 * Voices:
 * - Sarp (Desktop): tr-TR-AhmetNeural
 * - Vera (Mobile): tr-TR-EmelNeural
 */

import { Router, Request, Response } from "express";

const ttsRouter = Router();

// Azure Speech Services configuration from environment
const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;

// Validate environment variables
if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
  console.warn("[TTS] Azure Speech Services credentials not configured");
}

/**
 * POST /api/tts
 * 
 * Request body:
 * - text: string - The text to convert to speech
 * - voiceName: string - Azure Neural voice name (e.g., 'tr-TR-AhmetNeural')
 * 
 * Response:
 * - Audio binary (audio/mpeg) on success
 * - JSON error on failure
 */
ttsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { text, voiceName } = req.body;

    // Validate input
    if (!text || typeof text !== "string") {
      res.status(400).json({ error: "Text is required" });
      return;
    }

    if (!voiceName || typeof voiceName !== "string") {
      res.status(400).json({ error: "Voice name is required" });
      return;
    }

    // Validate voice name (only allow Turkish Neural voices)
    const allowedVoices = ["tr-TR-AhmetNeural", "tr-TR-EmelNeural"];
    if (!allowedVoices.includes(voiceName)) {
      res.status(400).json({ error: "Invalid voice name" });
      return;
    }

    // Check Azure credentials
    if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
      res.status(500).json({ error: "TTS service not configured" });
      return;
    }

    // Build SSML (Speech Synthesis Markup Language)
    const ssml = `
      <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='tr-TR'>
        <voice name='${voiceName}'>
          ${escapeXml(text)}
        </voice>
      </speak>
    `.trim();

    // Azure TTS REST API endpoint
    const ttsUrl = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

    // Make request to Azure TTS
    const response = await fetch(ttsUrl, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": AZURE_SPEECH_KEY,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
        "User-Agent": "FinansKodu-TTS/1.0",
      },
      body: ssml,
    });

    // Check for errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[TTS] Azure API error:", response.status, errorText);
      res.status(response.status).json({ 
        error: "TTS generation failed",
        details: response.status === 401 ? "Invalid API key" : "Azure service error"
      });
      return;
    }

    // Get audio data
    const audioBuffer = await response.arrayBuffer();

    // Set response headers for audio streaming
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", audioBuffer.byteLength);
    res.setHeader("Cache-Control", "no-cache");

    // Send audio data
    res.send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error("[TTS] Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Escape XML special characters to prevent injection
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export { ttsRouter };
