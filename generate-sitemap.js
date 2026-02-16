/**
 * DYNAMIC SITEMAP GENERATOR
 * 
 * Generates sitemap.xml with:
 * - Static routes (/, /analiz, etc.)
 * - Dynamic blog routes (/blog/[slug])
 * 
 * Run: node generate-sitemap.js
 * Output: client/public/sitemap.xml
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://finanskodu.com';

// Static routes
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/analiz', priority: '0.8', changefreq: 'weekly' },
];

// Blog posts (sync with BlogSection.tsx)
const blogPosts = [
  { id: 'finans-raporu-otomasyonu', date: '2026-02-13' },
  { id: 'yeni-yilda-finanscilarin-10-ai-araci', date: '2026-02-13' },
  { id: 'excelde-ai-devrimi-finanscilar-icin-rehber', date: '2026-02-13' },
  { id: 'altin-abd-reel-faizleri', date: '2025-01-25' },
  { id: 'finansal-ozgurluk-gizli-raporlar', date: '2025-01-22' },
  { id: 'manuel-takip-7-isaret', date: '2025-01-20' },
  { id: 'hisse-analizi-ai-prompts', date: '2025-01-18' },
  { id: 'finansal-analiz-excel-ai', date: '2025-01-15' },
  { id: 'borsa-psikolojisi-davranis-finans', date: '2025-01-12' },
  { id: 'portfoy-yonetimi-risk-analizi', date: '2025-01-10' },
  { id: 'teknik-analiz-gostergeler', date: '2025-01-08' },
];

// Generate XML
function generateSitemap() {
  const now = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static routes
  staticRoutes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${route.path}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Add blog routes
  blogPosts.forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}/blog/${post.id}</loc>\n`;
    xml += `    <lastmod>${post.date}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Write sitemap.xml
function writeSitemap() {
  const xml = generateSitemap();
  const outputPath = path.join(__dirname, 'client', 'public', 'sitemap.xml');

  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✅ Sitemap generated: ${outputPath}`);
  console.log(`📊 Total URLs: ${staticRoutes.length + blogPosts.length}`);
}

// Run
writeSitemap();
