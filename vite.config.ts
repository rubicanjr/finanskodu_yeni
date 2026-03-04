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
    // Terser ile agresif minify
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // console.log'ları production'da kaldır
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: true,
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Chunk boyutu uyarı eşiği
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          // Core React - her sayfada gerekli
          'vendor-react': ['react', 'react-dom', 'wouter'],
          'vendor-react-extras': ['react-helmet-async'],
          // Animasyon - lazy load edilebilir
          'vendor-motion': ['framer-motion'],
          // 3D - sadece belirli sayfalarda kullanılıyor, lazy chunk
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Firebase - ayrı chunk, sadece auth/db sayfalarında yüklenir
          'vendor-firebase-core': ['firebase/app', 'firebase/auth'],
          'vendor-firebase-db': ['firebase/firestore', 'firebase/storage'],
          // UI bileşenleri
          'vendor-ui': ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-tabs'],
        },
      },
    },
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
