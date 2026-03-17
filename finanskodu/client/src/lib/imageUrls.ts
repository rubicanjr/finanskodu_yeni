/**
 * Finans Kodu - Optimize Edilmiş Görsel URL'leri
 *
 * Format öncelik sırası (tarayıcı desteğine göre):
 *   1. AVIF  — en iyi sıkıştırma (%40-60 WebP'den küçük), Chrome 85+, Firefox 93+
 *   2. WebP  — iyi sıkıştırma, tüm modern tarayıcılar
 *   3. JPG   — evrensel fallback (CDN'de yok, gerekirse eklenebilir)
 *
 * Tüm görseller CloudFront CDN üzerinden servis edilmektedir.
 */

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663094430864/kUgdQwjoJVBUMRt45Jb2ku";

// ── Avatar görselleri ────────────────────────────────────────────────────────
export const SARP_AVATAR = `${CDN}/sarp-avatar_3581df97.webp`;
export const VERA_AVATAR = `${CDN}/vera-avatar_3171c555.webp`;
export const SARP_MOBILE_AVATAR = `${CDN}/sarp-mobile-avatar_7c9f2a4d.webp`;

// AVIF versiyonları
export const SARP_AVATAR_AVIF = `${CDN}/sarp-avatar_a7818dcf.avif`;
export const VERA_AVATAR_AVIF = `${CDN}/vera-avatar_cba5d38f.avif`;
export const SARP_MOBILE_AVATAR_AVIF = `${CDN}/sarp-mobile-avatar_fcd9e1e7.avif`;

// ── Blog görselleri ──────────────────────────────────────────────────────────
export const BLOG_IMAGES = {
  blog1: {
    // WebP (fallback)
    src: `${CDN}/blog-1-800w_9b90dab8.webp`,
    srcSet: `${CDN}/blog-1-400w_63b174b8.webp 400w, ${CDN}/blog-1-800w_9b90dab8.webp 800w`,
    // AVIF (öncelikli)
    avifSrc: `${CDN}/blog-1-800w_6e1b35fd.avif`,
    avifSrcSet: `${CDN}/blog-1-400w_e74c4bcf.avif 400w, ${CDN}/blog-1-800w_6e1b35fd.avif 800w`,
    sizes: "(max-width: 600px) 400px, 800px",
  },
  blog2: {
    src: `${CDN}/blog-2-800w_34874b5b.webp`,
    srcSet: `${CDN}/blog-2-400w_2c62c8f8.webp 400w, ${CDN}/blog-2-800w_34874b5b.webp 800w`,
    avifSrc: `${CDN}/blog-2-800w_512fddba.avif`,
    avifSrcSet: `${CDN}/blog-2-400w_d38f5907.avif 400w, ${CDN}/blog-2-800w_512fddba.avif 800w`,
    sizes: "(max-width: 600px) 400px, 800px",
  },
  blog3: {
    src: `${CDN}/blog-3-800w_929fe132.webp`,
    srcSet: `${CDN}/blog-3-400w_217ab3c9.webp 400w, ${CDN}/blog-3-800w_929fe132.webp 800w`,
    avifSrc: `${CDN}/blog-3-800w_d6ee2936.avif`,
    avifSrcSet: `${CDN}/blog-3-400w_4e8d6b17.avif 400w, ${CDN}/blog-3-800w_d6ee2936.avif 800w`,
    sizes: "(max-width: 600px) 400px, 800px",
  },
};

// ── Ürün görselleri ──────────────────────────────────────────────────────────
export const PRODUCT_IMAGES = {
  aiPrompt: {
    src: `${CDN}/product-ai-prompt-562w_1a853b57.webp`,
    srcSet: `${CDN}/product-ai-prompt-400w_3bc9f249.webp 400w, ${CDN}/product-ai-prompt-562w_1a853b57.webp 562w`,
    avifSrc: `${CDN}/product-ai-prompt-562w_1ed62be2.avif`,
    avifSrcSet: `${CDN}/product-ai-prompt-400w_01f1113e.avif 400w, ${CDN}/product-ai-prompt-562w_1ed62be2.avif 562w`,
    sizes: "(max-width: 600px) 400px, 562px",
  },
  finansKodu: {
    src: `${CDN}/product-finans-kodu-562w_28e65c3f.webp`,
    srcSet: `${CDN}/product-finans-kodu-400w_86726ed6.webp 400w, ${CDN}/product-finans-kodu-562w_28e65c3f.webp 562w`,
    avifSrc: `${CDN}/product-finans-kodu-562w_eee8781b.avif`,
    avifSrcSet: `${CDN}/product-finans-kodu-400w_cf2ae91c.avif 400w, ${CDN}/product-finans-kodu-562w_eee8781b.avif 562w`,
    sizes: "(max-width: 600px) 400px, 562px",
  },
  proBulten: {
    src: `${CDN}/product-pro-bulten-565w_c1ddc987.webp`,
    srcSet: `${CDN}/product-pro-bulten-400w_87eb8738.webp 400w, ${CDN}/product-pro-bulten-565w_c1ddc987.webp 565w`,
    avifSrc: `${CDN}/product-pro-bulten-565w_60a9a35f.avif`,
    avifSrcSet: `${CDN}/product-pro-bulten-400w_584d7ab3.avif 400w, ${CDN}/product-pro-bulten-565w_60a9a35f.avif 565w`,
    sizes: "(max-width: 600px) 400px, 565px",
  },
};

// ── Arka plan görselleri ─────────────────────────────────────────────────────
export const BACKGROUND_IMAGES = {
  aboutBg: {
    src: `${CDN}/about-bg-1200w_5c00fe73.webp`,
    srcSet: `${CDN}/about-bg-600w_c9b2ea92.webp 600w, ${CDN}/about-bg-1200w_5c00fe73.webp 1200w`,
    avifSrc: `${CDN}/about-bg-1200w_02fbc9a3.avif`,
    avifSrcSet: `${CDN}/about-bg-600w_5e36f32d.avif 600w, ${CDN}/about-bg-1200w_02fbc9a3.avif 1200w`,
    sizes: "(max-width: 768px) 600px, 1200px",
    // CSS background-image için (WebP fallback)
    mobile: `${CDN}/about-bg-600w_c9b2ea92.webp`,
    desktop: `${CDN}/about-bg-1200w_5c00fe73.webp`,
  },
  manifesto1: {
    src: `${CDN}/manifesto-1-1200w_c29e7b4c.webp`,
    srcSet: `${CDN}/manifesto-1-600w_7a54ea63.webp 600w, ${CDN}/manifesto-1-1200w_c29e7b4c.webp 1200w`,
    avifSrc: `${CDN}/manifesto-1-1200w_6d81ab13.avif`,
    avifSrcSet: `${CDN}/manifesto-1-600w_88ce6ce3.avif 600w, ${CDN}/manifesto-1-1200w_6d81ab13.avif 1200w`,
    sizes: "(max-width: 768px) 600px, 1200px",
    mobile: `${CDN}/manifesto-1-600w_7a54ea63.webp`,
    desktop: `${CDN}/manifesto-1-1200w_c29e7b4c.webp`,
  },
  manifesto2: {
    src: `${CDN}/manifesto-2-1200w_b137ee1d.webp`,
    srcSet: `${CDN}/manifesto-2-600w_ec2b6e00.webp 600w, ${CDN}/manifesto-2-1200w_b137ee1d.webp 1200w`,
    avifSrc: `${CDN}/manifesto-2-1200w_1f13f039.avif`,
    avifSrcSet: `${CDN}/manifesto-2-600w_604ebe82.avif 600w, ${CDN}/manifesto-2-1200w_1f13f039.avif 1200w`,
    sizes: "(max-width: 768px) 600px, 1200px",
    mobile: `${CDN}/manifesto-2-600w_ec2b6e00.webp`,
    desktop: `${CDN}/manifesto-2-1200w_b137ee1d.webp`,
  },
};

// ── Sponsorluk arka planı ────────────────────────────────────────────────────
export const SPONSORSHIP_BG = {
  src: `${CDN}/sponsorship-bg_57a443f2.webp`,
  avifSrc: `${CDN}/sponsorship-bg_ad151dae.avif`,
};
