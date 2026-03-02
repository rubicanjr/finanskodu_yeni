import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  /** Set to true for above-the-fold images (hero, etc.) — skips lazy loading */
  eager?: boolean;
}

/**
 * LazyImage — Blur-up placeholder + lazy loading
 *
 * How it works:
 * 1. The wrapper div shows a low-contrast shimmer background while the real image loads.
 * 2. Once the <img> fires onLoad, the blur filter is removed with a smooth transition.
 * 3. IntersectionObserver ensures the real src is only set when the element is near the viewport.
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  style,
  width,
  height,
  eager = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (eager) return; // skip observer for above-the-fold images

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before entering viewport
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      aria-label={alt}
    >
      {/* Shimmer placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
            backgroundSize: '200% 100%',
          }}
        />
      )}

      {/* Real image */}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-cover"
        style={{
          filter: isLoaded ? 'none' : 'blur(12px)',
          transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
          transition: 'filter 0.4s ease-in-out, transform 0.4s ease-in-out',
          opacity: isLoaded ? 1 : 0.7,
        }}
      />
    </div>
  );
}
