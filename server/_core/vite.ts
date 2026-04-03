import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import compression from "compression";

export async function setupVite(app: Express, server: Server) {
  const [{ createServer: createViteServer }, { default: viteConfig }] = await Promise.all([
    import("vite"),
    import("../../vite.config"),
  ]);

  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

/**
 * Güvenlik HTTP Header'ları
 * Production ortamında tüm yanıtlara eklenir.
 * CSP: XSS saldırılarına karşı koruma
 * HSTS: HTTPS zorunluluğu
 * X-Frame-Options: Clickjacking koruması
 * X-Content-Type-Options: MIME sniffing koruması
 */
function setSecurityHeaders(res: express.Response) {
  // Content Security Policy
  // - default-src 'self': Sadece kendi domain'den kaynak yükle
  // - script-src: GA4, Clarity, Umami, Vite HMR için izin
  // - style-src: Google Fonts ve inline style için
  // - img-src: CDN, data URI ve harici görseller için
  // - connect-src: API ve analitik endpoint'leri için
  // - font-src: Google Fonts için
  // - frame-src: TradingView widget için
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://static.clarity.ms https://scripts.clarity.ms https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https: http:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https://google-analytics.com https://www.google-analytics.com https://analytics.google.com https://www.clarity.ms https://api.manus.im https://supabase.co https://*.supabase.co wss://*.supabase.co https://d2xsxph8kpxj0f.cloudfront.net https://api.coingecko.com https://cdn.jsdelivr.net",
    "frame-src 'self' https://s.tradingview.com https://www.tradingview.com",
    "media-src 'self' blob: https:",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);

  // HSTS: HTTPS'i 1 yıl boyunca zorla (includeSubDomains + preload)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Clickjacking koruması
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // MIME sniffing koruması
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Referrer Policy: Gizlilik için
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy: Gereksiz tarayıcı özelliklerini kapat
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(self), geolocation=(), payment=()');

  // SEO: Arama motorlarina sayfanin indekslenmesi gerektigini bildir
  res.setHeader('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
}

export function serveStatic(app: Express) {
  // Manifest dosyaları için X-Robots-Tag: noindex
  // SEO tarayıcıları manifest JSON dosyalarını HTML gibi tarıyor, noindex ile engelle
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const url = req.path;
    if (url.endsWith('.webmanifest') || url.endsWith('manifest.json') || url.endsWith('site.webmanifest')) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }
    next();
  });

  // Service Worker ve workbox dosyaları için kesinlikle önbellekleme yapılmamalı.
  // Tarayıcı her zaman en güncel SW'yi çekmeli ki yeni deploy'lar aninda algılansın.
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const url = req.path;
    const isServiceWorker = url === '/sw.js' || url.startsWith('/workbox-') || url === '/registerSW.js';
    if (isServiceWorker) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Service-Worker-Allowed', '/');
    }
    next();
  });

  // Brotli/Gzip sıkıştırma — tüm text/html, text/css, application/js yanıtlarını sıkıştır
  app.use(compression({
    level: 6,          // 1-9 arası; 6 hız/boyut dengesi için optimal
    threshold: 1024,   // 1KB altı yanıtları sıkıştırma
    filter: (req: express.Request, res: express.Response) => {
      // Zaten sıkıştırılmış görseller/fontlar için atla
      const contentType = res.getHeader('Content-Type') as string || '';
      if (/image\/(png|jpg|jpeg|webp|gif|ico)|font\/(woff|woff2)/.test(contentType)) {
        return false;
      }
      return compression.filter(req, res);
    }
  }));
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // ╔══════════════════════════════════════════════════════════════════════════════╗
  // ║ STALE CHUNK GUARD                                                          ║
  // ║ /assets/* altındaki bir dosya diskten bulunamazsa (eski build hash'i),    ║
  // ║ SPA fallback devreye girip index.html döndürür — bu da tarayıcıda        ║
  // ║ "text/html MIME type" hatasına yol açar. Bu guard bunu engeller.          ║
  // ╚══════════════════════════════════════════════════════════════════════════════╝
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const url = req.path;
    // /assets/ altındaki tüm statik dosya isteklerini yakala
    if (url.startsWith('/assets/')) {
      const filePath = path.join(distPath, url);
      if (!fs.existsSync(filePath)) {
        // Dosya diskten bulunamadı — eski hash. SPA fallback'e düşmesine izin verme.
        res.status(404).set({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        }).json({
          error: 'Asset not found. This chunk belongs to an older build. Please hard-refresh (Ctrl+Shift+R).',
          path: url,
        });
        return;
      }
    }
    next();
  });

  // Hashed assets (JS/CSS bundles with content hash in filename) → long-lived cache
  // Everything else (index.html, robots.txt, etc.) → no-cache so browsers always
  // fetch the latest HTML and discover new hashed bundles.
  app.use(
    express.static(distPath, {
      // ETag kapat: no-cache ile birlikte kullanıldığında tarayıcı 304 yanıtıyla
      // eski index.html'i kullanmaya devam edebilir. Tamamen devre dışı bırak.
      etag: false,
      lastModified: false,
      setHeaders(res, filePath) {
        const basename = path.basename(filePath);

        // ╔════════════════════════════════════════════════════════════════════════════╗
        // ║ SW / WORKBOX DOSYALARI — KESİNLİKLE ÖNBELLEKLEME                         ║
        // ║ Tarayıcı her zaman en güncel sw.js'i çekmeli ki yeni deploy'lar       ║
        // ║ anında algılansın. Service-Worker-Allowed: / zorunlu.                ║
        // ╚════════════════════════════════════════════════════════════════════════════╝
        const isServiceWorkerFile =
          basename === 'sw.js' ||
          basename === 'registerSW.js' ||
          basename.startsWith('workbox-');

        if (isServiceWorkerFile) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
          res.setHeader('Service-Worker-Allowed', '/');
          return; // Diğer setHeaders mantığını atla
        }

        // Vite hash formatı: -[A-Za-z0-9]{8}.ext (base64url, büyük+küçük harf karışık)
        // Örnek: AIPromptLibraryPage-DNc1ZCea.js, index-BVFbWmJo.js
        const isHashedAsset = /-[A-Za-z0-9]{8,}\.(js|css|woff2?|ttf|otf|png|jpg|jpeg|svg|ico|webp|avif)$/i.test(
          filePath
        );
        // AVIF MIME type (Express doesn't know it by default)
        if (filePath.endsWith('.avif')) {
          res.setHeader('Content-Type', 'image/avif');
        }
        if (isHashedAsset) {
          // Immutable: safe to cache for 1 year because filename changes on every build
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else {
          // index.html and other non-hashed files must NEVER be cached.
          // ETag/Last-Modified kapalı olduğundan 304 yanıtı da gelmez.
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
          // Güvenlik header'larını HTML yanıtlarına ekle
          setSecurityHeaders(res);
        }
      },
    })
  );

  // SPA fallback — /assets/ dışındaki tüm rotalar için index.html döndür
  // Not: /assets/* guard'u yukarıda olduğundan buraya eski chunk istekleri ulaşamaz.
  app.use("*", (req: express.Request, res: express.Response) => {
    // /assets/ altında bilinmeyen bir istek gelirse (guard'dan kaçarsa) 404 dön
    if (req.path.startsWith('/assets/')) {
      res.status(404).set('Content-Type', 'application/json').json({
        error: 'Asset not found.',
        path: req.path,
      });
      return;
    }
    res.set({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    });
    setSecurityHeaders(res);
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
