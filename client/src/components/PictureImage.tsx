import { useState, useEffect, useRef } from 'react';

interface PictureImageProps {
  /** WebP src (fallback) */
  src: string;
  /** AVIF src (öncelikli, modern tarayıcılar) */
  avifSrc?: string;
  /** WebP srcset (responsive) */
  srcSet?: string;
  /** AVIF srcset (responsive, öncelikli) */
  avifSrcSet?: string;
  /** sizes attribute */
  sizes?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  /** true = above-the-fold (hero), eager loading */
  eager?: boolean;
  /** LQIP: base64 veya düşük kaliteli görsel URL (blur placeholder) */
  lqip?: string;
  /** wrapper div için ek className */
  wrapperClassName?: string;
}

/**
 * PictureImage — AVIF → WebP → JPG format zinciri + LQIP blur-up placeholder
 *
 * Nasıl çalışır:
 * 1. Sayfa yüklenirken LQIP (blur) placeholder gösterilir (1-2KB, çok hızlı)
 * 2. IntersectionObserver ile görsel viewport'a yaklaşınca gerçek src atanır
 * 3. Tarayıcı AVIF destekliyorsa AVIF, desteklemiyorsa WebP yükler
 * 4. Görsel yüklenince blur kaldırılır, smooth fade-in animasyonu oynar
 * 5. decoding="async" ile ana thread bloklanmaz
 */
export default function PictureImage({
  src,
  avifSrc,
  srcSet,
  avifSrcSet,
  sizes,
  alt,
  className = '',
  style,
  width,
  height,
  eager = false,
  lqip,
  wrapperClassName = '',
}: PictureImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (eager) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' } // 300px önceden yüklemeye başla
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={style}
    >
      {/* LQIP Blur Placeholder — görsel yüklenene kadar gösterilir */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: lqip ? `url(${lqip})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: lqip ? 'blur(20px)' : undefined,
            transform: 'scale(1.1)', // blur kenarlarını gizlemek için
            background: !lqip
              ? 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%)'
              : undefined,
          }}
        />
      )}

      {/* <picture> element: AVIF → WebP fallback zinciri */}
      <picture>
        {/* AVIF — en iyi sıkıştırma, Chrome 85+, Firefox 93+, Safari 16+ */}
        {isInView && avifSrc && (
          <source
            srcSet={avifSrcSet || avifSrc}
            sizes={sizes}
            type="image/avif"
          />
        )}

        {/* WebP — iyi sıkıştırma, tüm modern tarayıcılar */}
        {isInView && (
          <source
            srcSet={srcSet || src}
            sizes={sizes}
            type="image/webp"
          />
        )}

        {/* img — evrensel fallback, IntersectionObserver ref noktası */}
        <img
          ref={imgRef}
          src={isInView ? src : undefined}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover ${className}`}
          style={{
            filter: isLoaded ? 'none' : 'blur(8px)',
            transform: isLoaded ? 'scale(1)' : 'scale(1.03)',
            transition: 'filter 0.5s ease-out, transform 0.5s ease-out, opacity 0.5s ease-out',
            opacity: isLoaded ? 1 : (lqip ? 0 : 0.6),
          }}
        />
      </picture>
    </div>
  );
}
