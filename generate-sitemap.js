/**
 * DYNAMIC SITEMAP GENERATOR
 * 
 * Generates sitemap.xml with:
 * - Static routes (/, /analiz, etc.)
 * - Dynamic blog routes (/blog/[slug]) from blogContent.ts
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
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
];

// Import blog data from blogContent.ts
// Since we can't directly import TS in Node.js, we'll read and parse the file
function getBlogSlugs() {
  const blogContentPath = path.join(__dirname, 'client', 'src', 'data', 'blogContent.ts');
  const content = fs.readFileSync(blogContentPath, 'utf8');
  
  // Extract all id fields using regex
  const idMatches = content.matchAll(/id:\s*["']([^"']+)["']/g);
  const slugs = [];
  
  for (const match of idMatches) {
    slugs.push(match[1]);
  }
  
  return slugs;
}

// Generate XML
function generateSitemap() {
  const now = new Date().toISOString().split('T')[0];
  const blogSlugs = getBlogSlugs();

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

  // Add blog routes (dynamically from blogContent.ts)
  blogSlugs.forEach(slug => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}/blog/${slug}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
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
  
  const blogSlugs = getBlogSlugs();
  console.log(`✅ Sitemap oluşturuldu! Bulunan blog sayısı: ${blogSlugs.length}`);
  console.log(`📊 Total URLs: ${staticRoutes.length + blogSlugs.length}`);
  console.log(`   - Static routes: ${staticRoutes.length}`);
  console.log(`   - Blog posts: ${blogSlugs.length}`);
  console.log(`\n📝 Example blog URLs:`);
  blogSlugs.slice(0, 3).forEach(slug => {
    console.log(`   - ${DOMAIN}/blog/${slug}`);
  });
  console.log(`\n📍 Sitemap location: ${outputPath}`);
}

// Run
writeSitemap();
