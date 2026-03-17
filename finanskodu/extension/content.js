/**
 * Content Script
 * Injected into matching pages. Uses a robust message wrapper.
 */

// Exponential backoff configuration
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 100; // ms

/**
 * A safe wrapper around chrome.runtime.sendMessage that implements:
 * 1. Checks if the extension context is still valid.
 * 2. Retries if the background script is waking up and drops the message.
 * 3. Prevents "Receiving end does not exist" from terminating the thread.
 */
async function safeSendMessage(message, retries = 0) {
  // 1. Context validation (prevents "Extension context invalidated" error on reload)
  if (!chrome.runtime?.id) {
    throw new Error("Extension context is no longer valid. Please refresh the page.");
  }

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      // 2. Error handling and retry logic
      const lastError = chrome.runtime.lastError;
      
      if (lastError) {
        // Typical error when background service worker is asleep and fails to wake fast enough
        const isConnectionError = lastError.message.includes("Could not establish connection") || 
                                  lastError.message.includes("Receiving end does not exist");
                                  
        if (isConnectionError && retries < MAX_RETRIES) {
          const delay = INITIAL_RETRY_DELAY * Math.pow(2, retries);
          console.warn(`[Content] Background SW disconnected. Retrying in ${delay}ms... (Attempt ${retries + 1}/${MAX_RETRIES})`);
          
          setTimeout(() => {
            resolve(safeSendMessage(message, retries + 1));
          }, delay);
          return;
        }

        return reject(new Error(lastError.message));
      }

      // Success
      resolve(response);
    });
  });
}

// ----------------------------------------------------------------------------
// APPLICATION LOGIC
// ----------------------------------------------------------------------------

/**
 * Ping the background to wake it up or check connection.
 */
async function ensureConnection() {
  try {
    const pong = await safeSendMessage({ type: "PING" });
    console.log("[Content] Connection verified:", pong);
  } catch (err) {
    console.error(`[Content] Failed to ensure connection: ${err.message}`);
  }
}

/**
 * Simulates analyzing the DOM and sending results to the background.
 */
async function runAnalysis() {
  console.log("[Content] Starting page analysis...");
  
  // Dummy analysis payload
  const pageData = {
    title: document.title,
    url: window.location.href,
    timestamp: Date.now(),
    h1Count: document.querySelectorAll("h1").length
  };

  try {
    const result = await safeSendMessage({ 
      type: "SAVE_ANALYSIS", 
      payload: pageData 
    });
    
    // Original success log explicitly asked for in analysis
    if (result && result.success) {
      console.log("content.js:1 Analiz sonuçları storage'da saklandı");
    }
  } catch (error) {
    console.error(`[Content] Error during analysis dispatch:`, error.message);
  }
}

// Listen for document load and execute our logic
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

async function init() {
  // First ensure the channel is alive
  await ensureConnection();
  
  // Then execute business logic
  await runAnalysis();
}
