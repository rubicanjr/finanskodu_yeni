import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { seoRouter } from "../seo";
import { ttsRouter } from "../tts";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic } from "./vite";

export function createApp() {
  const app = express();

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // Prevent favicon.ico from hitting the API or SSR and throwing 500
  app.get("/favicon.ico", (req, res) => res.status(204).end());
  
  app.use(seoRouter);
  app.use("/api/tts", ttsRouter);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  if (process.env.NODE_ENV !== "development") {
    serveStatic(app);
  }

  // Global Error Handler to catch Unhandled Exceptions preventing hard 500s
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("[Global Error Handler]", err);
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: message });
  });

  return app;
}

export default createApp();
