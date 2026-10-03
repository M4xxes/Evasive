import React, { useEffect, useRef, useState } from 'react';

// Vidéo muette en boucle, chargée et lue uniquement lorsqu'elle est visible.
export default function VideoMedia({ src, poster, controls = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '200px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible) {
      setActivated(true);
      el.play?.().catch(() => {});
    } else {
      el.pause?.();
    }
  }, [visible]);

  return (
    <video
      ref={ref}
      src={activated || visible ? src : undefined}
      poster={poster}
      className="h-full w-full object-cover"
      preload="none"
      autoPlay={visible}
      muted
      loop
      playsInline
      controls={controls}
    />
  );
}
