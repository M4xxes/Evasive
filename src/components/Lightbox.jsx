import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoMedia from './VideoMedia';

export default function Lightbox({ mediaList, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex || 0);
  const current = mediaList[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % mediaList.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + mediaList.length) % mediaList.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mediaList.length, onClose]);

  if (!current) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 text-white/70 hover:text-white"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {mediaList.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + mediaList.length) % mediaList.length)}
            className="absolute left-4 text-white/70 hover:text-white md:left-8"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % mediaList.length)}
            className="absolute right-4 text-white/70 hover:text-white md:right-8"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      <div className="max-h-[85vh] max-w-[90vw]">
        {current.type === 'video' ? (
          <div className="aspect-video w-[80vw] max-w-5xl">
            <VideoMedia src={current.url} poster={current.poster} />
          </div>
        ) : (
          <img src={current.url} alt="" className="max-h-[85vh] max-w-[90vw] object-contain" />
        )}
      </div>
    </div>
  );
}
