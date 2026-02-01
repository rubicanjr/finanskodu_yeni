import { Router } from "express";

export const seoRouter = Router();

// Dynamic /robots.txt route
seoRouter.get("/robots.txt", (_req, res) => {
  const robotsTxt = `User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /
Disallow: /api/*

Sitemap: https://finanskodu.com/sitemap.xml`;

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "public, max-age=86400"); // 24 hour cache
  res.send(robotsTxt);
});

// Dynamic /sitemap.xml route
seoRouter.get("/sitemap.xml", (_req, res) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://finanskodu.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://finanskodu.com/#products</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://finanskodu.com/#manifesto</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://finanskodu.com/#contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, max-age=86400"); // 24 hour cache
  res.send(sitemapXml);
});
