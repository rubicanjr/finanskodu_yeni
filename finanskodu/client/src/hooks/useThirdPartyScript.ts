import { useEffect } from 'react';

/**
 * Hook to load third-party scripts with requestIdleCallback for better performance
 * @param src - Script URL to load
 * @param options - Optional configuration
 */
export const useThirdPartyScript = (
  src: string,
  options?: {
    async?: boolean;
    defer?: boolean;
    timeout?: number;
  }
) => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) return;

    const loadScript = () => {
      const script = document.createElement('script');
      script.src = src;
      script.async = options?.async ?? true;
      if (options?.defer) script.defer = true;
      // Silently handle blocked scripts (AdBlock / ERR_BLOCKED_BY_CLIENT)
      script.onerror = () => {};
      document.body.appendChild(script);
    };

    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadScript, { timeout: options?.timeout ?? 3000 });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(loadScript, 1000);
    }

    // Cleanup: Remove script on unmount (optional, usually not needed for analytics)
    return () => {
      const script = document.querySelector(`script[src="${src}"]`);
      if (script) script.remove();
    };
  }, [src, options?.async, options?.defer, options?.timeout]);
};
