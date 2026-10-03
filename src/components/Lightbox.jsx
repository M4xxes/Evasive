import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoMedia from './VideoMedia';
import Photo from './Photo';

export default function Lightbox({ mediaList, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex || 0);
  const touchStart = useRef(null);
  const current = mediaList[index];
  const count = mediaList.length;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [count, onClose]);

  // Précharge l'image suivante pour une navigation fluide.
  useEffect(() => {
    const upcoming = mediaList[(index + 1) % count];
    if (upcoming?.type === 'image' && upcoming.url) {
      const img = new Image();
      img.sizes = '90vw';
      if (upcoming.srcSet) img.srcset = upcoming.srcSet;
      img.src = upcoming.url;
    }
  }, [index, count, mediaList]);

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStart.current = null;
  };

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 p-2 text-white/70 hover:text-white md:right-6 md:top-6"
        aria-label="Fermer"
      >
        <X className="h-6 w-6" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 z-10 hidden p-2 text-white/70 hover:text-white sm:block md:left-8"
            aria-label="Précédent"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 z-10 hidden p-2 text-white/70 hover:text-white sm:block md:right-8"
            aria-label="Suivant"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-white/50">
            {index + 1} / {count}
          </p>
        </>
      )}

      <div className="flex max-h-[85vh] max-w-[92vw] items-center justify-center sm:max-w-[80vw]">
        {current.type === 'video' ? (
          <div className="aspect-video w-[92vw] max-w-5xl sm:w-[80vw]">
            <VideoMedia src={current.url} poster={current.poster} controls />
          </div>
        ) : (
          <Photo
            key={current.url}
            media={current}
            alt={current.alt}
            sizes="(max-width: 640px) 92vw, 80vw"
            priority
            className="h-auto max-h-[85vh] w-auto max-w-[92vw] animate-fade-in object-contain sm:max-w-[80vw]"
          />
        )}
      </div>
    </div>
  );
}
