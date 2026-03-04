import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import compression from "compression";

export async function setupVite(app: Express, server: Server) {
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

export function serveStatic(app: Express) {
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
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Hashed assets (JS/CSS bundles with content hash in filename) → long-lived cache
  // Everything else (index.html, robots.txt, etc.) → no-cache so browsers always
  // fetch the latest HTML and discover new hashed bundles.
  app.use(
    express.static(distPath, {
      setHeaders(res, filePath) {
        const isHashedAsset = /\.[0-9a-f]{8,}\.(js|css|woff2?|ttf|otf|png|jpg|jpeg|svg|ico|webp|avif)$/i.test(
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
          // index.html and other non-hashed files must never be cached
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        }
      },
    })
  );

  // SPA fallback — always serve index.html with no-cache headers
  app.use("*", (_req, res) => {
    res.set({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    });
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
