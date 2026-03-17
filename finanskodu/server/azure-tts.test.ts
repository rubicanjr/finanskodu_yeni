import { describe, expect, it } from "vitest";

/**
 * Test Azure Speech Services API credentials
 * This test validates that the AZURE_SPEECH_KEY and AZURE_SPEECH_REGION are valid
 * by making a lightweight request to the Azure TTS API
 */
describe("Azure Speech Services", () => {
  it("should have valid API credentials", async () => {
    const apiKey = process.env.AZURE_SPEECH_KEY;
    const region = process.env.AZURE_SPEECH_REGION;

    // Check that credentials are set
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe("");
    expect(region).toBeDefined();
    expect(region).not.toBe("");

    // Make a lightweight request to validate the API key
    // Using the token endpoint which is faster than full TTS
    const tokenUrl = `https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
    
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey!,
        "Content-Length": "0",
      },
    });

    // If credentials are valid, we should get a 200 response with a token
    expect(response.status).toBe(200);
    
    const token = await response.text();
    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(0);
  });

  it("should generate TTS audio with tr-TR-AhmetNeural voice", async () => {
    const apiKey = process.env.AZURE_SPEECH_KEY;
    const region = process.env.AZURE_SPEECH_REGION;

    const ttsUrl = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
    
    const ssml = `
      <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='tr-TR'>
        <voice name='tr-TR-AhmetNeural'>Test</voice>
      </speak>
    `;

    const response = await fetch(ttsUrl, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey!,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
      },
      body: ssml,
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("audio");
  });
});
