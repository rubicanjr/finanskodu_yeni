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
      // HTML dosyalarını SW önbelleğine ALMA — her zaman ağdan çek.
      // JS/CSS zaten içerik hash'iyle gelir, güvenle önbelleğe alınabilir.
      globPatterns: ['**/*.{js,css,ico,png,svg,webp,woff,woff2}'],

      // Yeni SW kurulur kurulmaz eski SW'yi geç, tüm sekmeleri devral.
      // Böylece deploy sonrası kullanıcılar sayfayı yenilemeden yeni sürümü görür.
      skipWaiting: true,
      clientsClaim: true,

      // SPA navigasyonları için HTML'yi ağdan çek (SW önbelleğine alma)
      navigateFallback: null,

      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            }
          }
        }
      ]
    }
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
            // Streamdown + syntax highlighter'lar - sadece chat/blog sayfalarında lazım
            // Bu chunk'lar lazy import sayesinde sadece gerektiğinde yüklenir
            if (id.includes('node_modules/streamdown')) {
              return 'vendor-streamdown';
            }
            // UI ikonları
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-ui';
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
