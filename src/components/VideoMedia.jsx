import React from 'react';

export default function VideoMedia({ src, poster }) {
  return (
    <video
      src={src}
      poster={poster}
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
    />
  );
}
