/**
 * Background Service Worker
 * Manifest V3 requires background scripts to be resilient to termination.
 */

// Keep-alive mechanism for Service Worker
let heartbeatInterval;

async function runHeartbeat() {
  await chrome.storage.local.set({ 'last-heartbeat': new Date().getTime() });
}

async function startHeartbeat() {
  runHeartbeat().then(() => {
    heartbeatInterval = setInterval(runHeartbeat, 20 * 1000); // 20 seconds
  });
}

async function stopHeartbeat() {
  clearInterval(heartbeatInterval);
}

// Ensure the SW starts a heartbeat immediately
startHeartbeat();

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("[Background] Received message:", request);

  if (request.type === "PING") {
    // Pure keep-alive / connection check
    sendResponse({ status: "PONG", timestamp: Date.now() });
    return true; // Keep channel open for async response
  }

  if (request.type === "SAVE_ANALYSIS") {
    // Mimicking actual work such as saving to storage or calling Backend
    chrome.storage.local.set({ analysisData: request.payload }, () => {
      // Return a successful response to the sender so the promise resolves
      sendResponse({ success: true, message: "Storage saved" });
    });
    return true; // Important: indicate we will send response asynchronously
  }

  // Fallback response for unknown types
  sendResponse({ error: "Unknown request type" });
  return true;
});

// Re-inject content scripts after extension update/reload
// This prevents "Could not establish connection" on already-open tabs
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install" || details.reason === "update") {
    const tabs = await chrome.tabs.query({ url: "<all_urls>" });
    for (const tab of tabs) {
      if (tab.id && tab.url && !tab.url.startsWith("chrome://")) {
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"],
          });
        } catch {
          // Tab may not be scriptable (e.g. Chrome Web Store pages)
        }
      }
    }
  }
});

// Self-healing: if SW suspends, re-bind listeners on start
chrome.runtime.onStartup.addListener(() => {
  console.log("[Background] Started");
  startHeartbeat();
});

chrome.runtime.onSuspend.addListener(() => {
  console.log("[Background] Suspending...");
  stopHeartbeat();
});
