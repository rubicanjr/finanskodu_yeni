import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { VitePWA } from 'vite-plugin-pwa';


const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  vitePluginManusRuntime(),
  VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    // Precache: ana sayfa, kritik CSS/JS, logo ve temel görseller
    includeAssets: ['favicon.ico', 'logo.png', 'robots.txt'],
    manifest: {
      name: 'Finans Kodu',
      short_name: 'Finans Kodu',
      description: 'Yapay zeka destekli finansal mühendislik, algoritmik ticaret ve Excel otomasyon çözümleri',
      theme_color: '#00D4FF',
      background_color: '#0a0d12',
      display: 'standalone',
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      // ── Precache ────────────────────────────────────────────────────────────
      // HTML dosyalarını SW önbelleğine ALMA — her zaman ağdan çek.
      // JS/CSS zaten içerik hash'iyle gelir, güvenle önbelleğe alınabilir.
      globPatterns: ['**/*.{js,css,ico,png,svg,webp,avif,woff,woff2}'],

      // Yeni SW kurulur kurulmaz eski SW'yi geç, tüm sekmeleri devral.
      // Böylece deploy sonrası kullanıcılar sayfayı yenilemeden yeni sürümü görür.
      skipWaiting: true,
      clientsClaim: true,

      // SPA navigasyonları için HTML'yi ağdan çek (SW önbelleğine alma)
      navigateFallback: null,

      // ── Cache Cleanup ────────────────────────────────────────────────────────
      // Eski önbellekleri temizle (yeni SW devreye girince otomatik)
      cleanupOutdatedCaches: true,

      // ── Runtime Cache Stratejileri ───────────────────────────────────────────
      runtimeCaching: [
        // ── 1. Google Fonts CSS — Cache First (1 yıl) ─────────────────────────
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-stylesheets',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 yıl
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },

        // ── 2. Google Fonts Dosyaları — Cache First (1 yıl) ───────────────────
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 yıl
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },

        // ── 3. CDN Görselleri (AVIF + WebP) — Cache First (1 yıl) ────────────
        // CloudFront CDN'den gelen tüm görseller — içerik hash'li URL'ler
        {
          urlPattern: /^https:\/\/d2xsxph8kpxj0f\.cloudfront\.net\/.*\.(?:avif|webp|png|jpg|jpeg|svg|gif)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cdn-images-v1',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 yıl — CDN URL'leri hash'li
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },

        // ── 4. Yerel Görseller — Cache First (30 gün) ─────────────────────────
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'local-images-v1',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 gün
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },

        // ── 5. JS/CSS Chunk'ları — Stale While Revalidate (1 ay) ─────────────
        // Hash'li asset'ler için SWR: önce cache'den sun, arka planda güncelle
        {
          urlPattern: /\.(?:js|css)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-assets-v1',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 1 ay
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },

        // ── 6. Web Fontları (woff/woff2) — Cache First (1 yıl) ───────────────
        {
          urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'font-files-v1',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 yıl
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },

        // ── 7. API Çağrıları — Network First (güncel data) ────────────────────
        // tRPC ve diğer API endpoint'leri: önce ağdan dene, hata olursa cache
        {
          urlPattern: /^\/api\/.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache-v1',
            networkTimeoutSeconds: 5, // 5 saniye sonra cache'e düş
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 5, // 5 dakika — API yanıtları kısa süreli
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },

        // ── 8. Harici API'ler (borsa fiyatları vb.) — Network First ──────────
        {
          urlPattern: /^https:\/\/(?:query1\.finance\.yahoo\.com|api\.exchangerate|finnhub\.io)\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'external-api-v1',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 2, // 2 dakika — finansal veriler çok güncel olmalı
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },

        // ── 9. Sayfa Navigasyonu — Network First (SPA) ────────────────────────
        // Kullanıcı gezindikçe sayfaları cache'le, offline çalışma imkanı
        {
          urlPattern: /^https?:\/\/[^/]+\/((?!api)[^?#]*)$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache-v1',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24, // 1 gün
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
  })
];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // esbuild: terser'a göre çok daha az bellek kullanır, deployment OOM (exit 137) önler
    minify: 'esbuild',
    // ES2020 hedef: modern tarayıcılar için optimize, daha küçük çıktı
    target: 'es2020',
    // CSS code splitting - her sayfa sadece kendi CSS'ini yükler
    cssCodeSplit: true,
    // CSS minification - esbuild ile hızlı ve bellek dostu
    cssMinify: 'esbuild',
    // Chunk boyutu uyarı eşiği
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
          manualChunks(id) {
            // Core vendor - her sayfada gerekli
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor';
            }
            // Router + helmet - hafif
            if (id.includes('node_modules/wouter') || id.includes('node_modules/react-helmet-async')) {
              return 'vendor-router';
            }
            // Animasyon - büyük, ayrı chunk
            if (id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
            // Firebase - ayrı chunk (sadece /kod-odasi ve /kaynak-kutuphanesi'nde lazım)
            if (id.includes('node_modules/firebase/')) {
              return 'vendor-firebase';
            }
            // Supabase - ayrı chunk (auth için, lazy yüklenir)
            if (id.includes('node_modules/@supabase/')) {
              return 'vendor-supabase';
            }
            // tRPC + TanStack Query - ayrı chunk (API katmanı)
            if (id.includes('node_modules/@trpc/') || id.includes('node_modules/@tanstack/react-query')) {
              return 'vendor-trpc';
            }
            // superjson - küçük, trpc ile birlikte
            if (id.includes('node_modules/superjson')) {
              return 'vendor-trpc';
            }
            // Streamdown + syntax highlighter'lar - sadece chat/blog sayfalarında lazım
            // Bu chunk'lar lazy import sayesinde sadece gerektiğinde yüklenir
            if (id.includes('node_modules/streamdown')) {
              return 'vendor-streamdown';
            }
            // UI ikonları
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-ui';
            }
            // Radix UI bileşenleri — ağır, ayrı chunk
            if (id.includes('node_modules/@radix-ui/')) {
              return 'vendor-radix';
            }
            // Recharts — sadece analiz sayfasında lazim
            if (id.includes('node_modules/recharts')) {
              return 'vendor-charts';
            }
            // Three.js — sadece 3D avatar bileşenlerinde
            if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
              return 'vendor-three';
            }
          },
      },
    },
  },
  // esbuild tree-shaking
  esbuild: {
    treeShaking: true,
    // Production'da console.log'ları kaldır
    drop: ['console', 'debugger'],
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    hmr: {
      // Use the same host as the dev server for WebSocket connections
      clientPort: 443, // Manus proxy uses HTTPS (port 443)
      protocol: 'wss', // Use secure WebSocket
    },
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
