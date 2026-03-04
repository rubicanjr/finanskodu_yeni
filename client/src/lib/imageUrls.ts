/**
 * Finans Kodu - Optimize Edilmiş Görsel URL'leri
 * Tüm görseller WebP formatında, CDN üzerinden servis edilmektedir.
 * Orijinal boyutlardan %90+ küçültme sağlanmıştır.
 */

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku";

// Avatar görselleri (12KB civarı)
export const SARP_AVATAR = `${CDN}/sarp-avatar_3581df97.webp`;
export const VERA_AVATAR = `${CDN}/vera-avatar_3171c555.webp`;
export const SARP_MOBILE_AVATAR = `${CDN}/sarp-mobile-avatar_7c9f2a4d.webp`;

// Blog görselleri - srcset için iki boyut
export const BLOG_IMAGES = {
  blog1: {
    src: `${CDN}/blog-1-800w_9b90dab8.webp`,
    srcSet: `${CDN}/blog-1-400w_63b174b8.webp 400w, ${CDN}/blog-1-800w_9b90dab8.webp 800w`,
    sizes: "(max-width: 600px) 400px, 800px",
  },
  blog2: {
    src: `${CDN}/blog-2-800w_34874b5b.webp`,
    srcSet: `${CDN}/blog-2-400w_2c62c8f8.webp 400w, ${CDN}/blog-2-800w_34874b5b.webp 800w`,
    sizes: "(max-width: 600px) 400px, 800px",
  },
  blog3: {
    src: `${CDN}/blog-3-800w_929fe132.webp`,
    srcSet: `${CDN}/blog-3-400w_217ab3c9.webp 400w, ${CDN}/blog-3-800w_929fe132.webp 800w`,
    sizes: "(max-width: 600px) 400px, 800px",
  },
};

// Ürün görselleri - srcset için iki boyut
export const PRODUCT_IMAGES = {
  aiPrompt: {
    src: `${CDN}/product-ai-prompt-562w_1a853b57.webp`,
    srcSet: `${CDN}/product-ai-prompt-400w_3bc9f249.webp 400w, ${CDN}/product-ai-prompt-562w_1a853b57.webp 562w`,
    sizes: "(max-width: 600px) 400px, 562px",
  },
  finansKodu: {
    src: `${CDN}/product-finans-kodu-562w_28e65c3f.webp`,
    srcSet: `${CDN}/product-finans-kodu-400w_86726ed6.webp 400w, ${CDN}/product-finans-kodu-562w_28e65c3f.webp 562w`,
    sizes: "(max-width: 600px) 400px, 562px",
  },
  proBulten: {
    src: `${CDN}/product-pro-bulten-565w_c1ddc987.webp`,
    srcSet: `${CDN}/product-pro-bulten-400w_87eb8738.webp 400w, ${CDN}/product-pro-bulten-565w_c1ddc987.webp 565w`,
    sizes: "(max-width: 600px) 400px, 565px",
  },
};

// Arka plan görselleri - srcset için iki boyut
export const BACKGROUND_IMAGES = {
  aboutBg: {
    src: `${CDN}/about-bg-1200w_5c00fe73.webp`,
    srcSet: `${CDN}/about-bg-600w_c9b2ea92.webp 600w, ${CDN}/about-bg-1200w_5c00fe73.webp 1200w`,
    sizes: "(max-width: 768px) 600px, 1200px",
    // CSS background-image için
    mobile: `${CDN}/about-bg-600w_c9b2ea92.webp`,
    desktop: `${CDN}/about-bg-1200w_5c00fe73.webp`,
  },
  manifesto1: {
    src: `${CDN}/manifesto-1-1200w_c29e7b4c.webp`,
    srcSet: `${CDN}/manifesto-1-600w_7a54ea63.webp 600w, ${CDN}/manifesto-1-1200w_c29e7b4c.webp 1200w`,
    sizes: "(max-width: 768px) 600px, 1200px",
    mobile: `${CDN}/manifesto-1-600w_7a54ea63.webp`,
    desktop: `${CDN}/manifesto-1-1200w_c29e7b4c.webp`,
  },
  manifesto2: {
    src: `${CDN}/manifesto-2-1200w_b137ee1d.webp`,
    srcSet: `${CDN}/manifesto-2-600w_ec2b6e00.webp 600w, ${CDN}/manifesto-2-1200w_b137ee1d.webp 1200w`,
    sizes: "(max-width: 768px) 600px, 1200px",
    mobile: `${CDN}/manifesto-2-600w_ec2b6e00.webp`,
    desktop: `${CDN}/manifesto-2-1200w_b137ee1d.webp`,
  },
};
