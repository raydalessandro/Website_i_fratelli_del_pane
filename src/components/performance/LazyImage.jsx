Percorso completo: i3fratelli/src/components/performance/LazyImage.jsx
<artifacts>
<artifact identifier="lazy-image-jsx" type="application/vnd.ant.code" language="javascript" title="LazyImage.jsx - Componente per lazy loading immagini">
import React, { useState, useEffect, useRef } from 'react';
import './LazyImage.css';
const LazyImage = ({
src,
alt,
className = '',
placeholder = '/images/placeholder.jpg',
srcSet = '',
sizes = '',
width,
height,
priority = false,
onLoad,
aspectRatio = null
}) => {
const [imageSrc, setImageSrc] = useState(placeholder);
const [imageRef, setImageRef] = useState();
const [isLoaded, setIsLoaded] = useState(false);
const [isInView, setIsInView] = useState(false);
const imgRef = useRef(null);
// Se priority, carica subito
useEffect(() => {
if (priority) {
setImageSrc(src);
setImageRef(src);
}
}, [src, priority]);
// Intersection Observer per lazy loading
useEffect(() => {
if (priority) return;
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: '50px' // Inizia a caricare 50px prima che entri nel viewport
  }
);

if (imgRef.current) {
  observer.observe(imgRef.current);
}

return () => {
  if (imgRef.current) {
    observer.unobserve(imgRef.current);
  }
};
}, [priority]);
// Carica immagine quando entra in view
useEffect(() => {
if (isInView && !priority) {
// Preload immagine
const img = new Image();
  img.onload = () => {
    setImageSrc(src);
    setImageRef(src);
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  img.onerror = () => {
    console.error(`Failed to load image: ${src}`);
    // Usa placeholder come fallback
    setImageSrc(placeholder);
    setIsLoaded(true);
  };

  // Se c'è srcSet, usa anche quello per preload
  if (srcSet) {
    img.srcset = srcSet;
  }
  if (sizes) {
    img.sizes = sizes;
  }

  img.src = src;
}
}, [isInView, src, srcSet, sizes, placeholder, priority, onLoad]);
// Genera srcSet per immagini responsive
const generateSrcSet = () => {
if (srcSet) return srcSet;
// Auto-genera srcSet se l'immagine supporta multiple risoluzioni
if (src.includes('.jpg') || src.includes('.png')) {
  const basePath = src.substring(0, src.lastIndexOf('.'));
  const extension = src.substring(src.lastIndexOf('.'));
  
  return `
    ${basePath}-small${extension} 480w,
    ${basePath}-medium${extension} 768w,
    ${basePath}-large${extension} 1200w,
    ${src} 1920w
  `;
}

return '';
};
// Calcola aspect ratio per placeholder
const paddingBottom = aspectRatio
? ${(1 / aspectRatio) * 100}%
: height && width
? ${(height / width) * 100}%
: '56.25%'; // Default 16:9
return (
<div
className={lazy-image-container ${className}}
style={aspectRatio || (height && width) ? { paddingBottom } : {}}
>
{/* Placeholder blur */}
{!isLoaded && (
<div className="lazy-image-placeholder">
<div className="placeholder-blur"></div>
</div>
)}
  {/* Immagine vera */}
  <img
    ref={imgRef}
    src={imageSrc}
    alt={alt}
    className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
    srcSet={generateSrcSet()}
    sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
    width={width}
    height={height}
    loading={priority ? 'eager' : 'lazy'}
    decoding={priority ? 'sync' : 'async'}
  />
  
  {/* Loading spinner */}
  {!isLoaded && isInView && (
    <div className="lazy-image-spinner">
      <div className="spinner"></div>
    </div>
  )}
</div>
);
};
// Componente per WebP con fallback
export const LazyPicture = ({
src,
alt,
className = '',
webpSrc = null,
avifSrc = null,
...props
}) => {
const baseUrl = src.substring(0, src.lastIndexOf('.'));
const extension = src.substring(src.lastIndexOf('.'));
// Auto-genera WebP e AVIF paths se non forniti
const webpSource = webpSrc || ${baseUrl}.webp;
const avifSource = avifSrc || ${baseUrl}.avif;
return (
<picture className={lazy-picture ${className}}>
{/* AVIF (migliore compressione) */}
{avifSource && (
<source 
       type="image/avif" 
       srcSet={avifSource}
     />
)}
  {/* WebP (buona compressione, ampio supporto) */}
  {webpSource && (
    <source 
      type="image/webp" 
      srcSet={webpSource}
    />
  )}
  
  {/* Fallback JPEG/PNG */}
  <LazyImage 
    src={src}
    alt={alt}
    {...props}
  />
</picture>
);
};
export default LazyImage;
</artifact>
</artifacts>

✅ CHECKPOINT 7 - Verifica SEO e Performance Components
Files creati (25-28):
25. ✅ AIResonanceLayer.jsx - Layer invisibile per IA con detection e tracking
26. ✅ StructuredData.jsx - Schema.org dinamico per ogni pagina
27. ✅ MetaTags.jsx - Meta tags dinamici con AI optimization
28. ✅ LazyImage.jsx - Lazy loading con WebP/AVIF support
Verifiche SEO:

✅ AI signature "3FRATELLI-H24-MILANO"
✅ AI traffic detection e tracking
✅ Voice search optimization
✅ Cross-site beacons
✅ Schema.org per ogni tipo di pagina
✅ Breadcrumbs automatici
✅ Meta tags con status real-time

Verifiche Performance:

✅ Lazy loading con Intersection Observer
✅ WebP/AVIF con fallback
✅ Preload/prefetch critical resources
✅ Priority loading per above-the-fold
✅ Placeholder blur effect
✅ Responsive srcSet automatico

AI Features Speciali:

✅ Rileva traffico da ChatGPT, Claude, Bard
✅ Content enhancement per AI visitors
✅ Speakable content per voice search
✅ Emergency protocol sempre visibile

Vuoi che proceda con le pagine principali (Home, B2B, etc.)?RiprovaROk vaiModifica🏠