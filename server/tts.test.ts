import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import express from "express";
import request from "supertest";
import { ttsRouter } from "./tts";

/**
 * Test Azure TTS Backend Proxy
 * Tests the /api/tts endpoint functionality
 */

// Create test app
function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use("/api/tts", ttsRouter);
  return app;
}

describe("TTS Backend Proxy", () => {
  let app: express.Application;

  beforeEach(() => {
    app = createTestApp();
  });

  it("should reject requests without text parameter", async () => {
    const response = await request(app)
      .post("/api/tts")
      .send({ voiceName: "tr-TR-AhmetNeural" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Text is required");
  });

  it("should reject requests without voiceName parameter", async () => {
    const response = await request(app)
      .post("/api/tts")
      .send({ text: "Test message" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Voice name is required");
  });

  it("should reject invalid voice names", async () => {
    const response = await request(app)
      .post("/api/tts")
      .send({ text: "Test message", voiceName: "invalid-voice" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid voice name");
  });

  it("should accept tr-TR-AhmetNeural voice (Sarp)", async () => {
    const response = await request(app)
      .post("/api/tts")
      .send({ text: "Merhaba, ben Sarp.", voiceName: "tr-TR-AhmetNeural" });

    // Should return audio or error from Azure (not validation error)
    expect(response.status).not.toBe(400);
    
    // If Azure credentials are valid, should return audio
    if (response.status === 200) {
      expect(response.headers["content-type"]).toContain("audio");
    }
  });

  it("should accept tr-TR-EmelNeural voice (Vera)", async () => {
    const response = await request(app)
      .post("/api/tts")
      .send({ text: "Merhaba, ben Vera.", voiceName: "tr-TR-EmelNeural" });

    // Should return audio or error from Azure (not validation error)
    expect(response.status).not.toBe(400);
    
    // If Azure credentials are valid, should return audio
    if (response.status === 200) {
      expect(response.headers["content-type"]).toContain("audio");
    }
  });

  it("should generate audio for Sarp with valid credentials", async () => {
    // Skip if credentials not configured
    if (!process.env.AZURE_SPEECH_KEY || !process.env.AZURE_SPEECH_REGION) {
      console.log("Skipping: Azure credentials not configured");
      return;
    }

    const response = await request(app)
      .post("/api/tts")
      .send({ 
        text: "Bu bir test mesajıdır.", 
        voiceName: "tr-TR-AhmetNeural" 
      });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("audio/mpeg");
    expect(response.body).toBeDefined();
  });

  it("should generate audio for Vera with valid credentials", async () => {
    // Skip if credentials not configured
    if (!process.env.AZURE_SPEECH_KEY || !process.env.AZURE_SPEECH_REGION) {
      console.log("Skipping: Azure credentials not configured");
      return;
    }

    const response = await request(app)
      .post("/api/tts")
      .send({ 
        text: "Bu bir test mesajıdır.", 
        voiceName: "tr-TR-EmelNeural" 
      });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("audio/mpeg");
    expect(response.body).toBeDefined();
  });
});
