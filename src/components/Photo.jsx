import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { toMedia } from '../lib/media';

// Image responsive : srcset WebP, chargement différé, dimensions intrinsèques (pas de saut de layout)
// et emplacement conservé avec mention explicite si le fichier est manquant.
export default function Photo({ media, alt, sizes = '100vw', priority = false, className = '', style }) {
  const [failed, setFailed] = useState(false);
  const m = toMedia(media);

  if (!m?.url || failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-neutral-900 text-[10px] uppercase tracking-[0.2em] text-gray-500 ${className}`}
        style={{ aspectRatio: m?.width && m?.height ? `${m.width} / ${m.height}` : undefined, ...style }}
        role="img"
        aria-label={`Média indisponible${alt ? ` : ${alt}` : ''}`}
      >
        <ImageOff className="h-5 w-5" />
        Média indisponible
      </div>
    );
  }

  return (
    <img
      src={m.url}
      srcSet={m.srcSet}
      sizes={m.srcSet ? sizes : undefined}
      width={m.width}
      height={m.height}
      alt={alt ?? m.alt ?? ''}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchpriority={priority ? 'high' : undefined}
      onError={() => setFailed(true)}
      className={className}
      style={style}
    />
  );
}
