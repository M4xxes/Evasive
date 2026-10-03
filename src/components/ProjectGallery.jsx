import React from 'react';
import VideoMedia from './VideoMedia';
import Photo from './Photo';
import { buildMediaList, orientation } from '../lib/media';

// editorial : paysages / vidéos / médias "fullWidth" en pleine largeur, portraits groupés par deux
// grid      : grille régulière 2 → 3 colonnes, les paysages occupent toute la ligne
// masonry   : colonnes à hauteur libre
function editorialSpans(mediaList) {
  const spans = [];
  let i = 0;
  while (i < mediaList.length) {
    const wide = (m) => m.fullWidth || m.type === 'video' || orientation(m) === 'landscape';
    if (wide(mediaList[i])) {
      spans.push('md:col-span-12');
      i += 1;
    } else if (i + 1 < mediaList.length && !wide(mediaList[i + 1])) {
      spans.push('md:col-span-6', 'md:col-span-6');
      i += 2;
    } else {
      spans.push('md:col-span-6 md:col-start-4');
      i += 1;
    }
  }
  return spans;
}

export default function ProjectGallery({ project, onOpenLightbox, setCursorState }) {
  const mediaList = buildMediaList(project);
  const layout = project.galleryLayout || 'grid';
  if (mediaList.length === 0) return null;

  const layoutClass =
    layout === 'masonry'
      ? 'columns-1 gap-4 md:columns-2 xl:columns-3'
      : layout === 'editorial'
        ? 'grid grid-cols-1 items-start gap-4 md:grid-cols-12 md:gap-6'
        : 'grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3';

  const spans = layout === 'editorial' ? editorialSpans(mediaList) : [];

  return (
    <section className="mt-16">
      <div className={layoutClass}>
        {mediaList.map((media, index) => {
          const isWide = media.fullWidth || media.type === 'video' || orientation(media) === 'landscape';
          const itemClass =
            layout === 'editorial'
              ? spans[index]
              : layout === 'masonry'
                ? 'mb-4 block w-full break-inside-avoid'
                : isWide
                  ? 'sm:col-span-2 lg:col-span-3'
                  : '';
          const sizes =
            layout === 'editorial'
              ? isWide
                ? '(max-width: 767px) 100vw, 1200px'
                : '(max-width: 767px) 100vw, 600px'
              : isWide
                ? '(max-width: 639px) 100vw, 1200px'
                : '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px';
          const label = `${project.title} — ${media.type === 'video' ? 'vidéo' : 'photo'} ${index + 1} sur ${mediaList.length}`;

          return (
            <button
              key={`${media.url}-${index}`}
              type="button"
              onClick={() => onOpenLightbox(index, mediaList)}
              onMouseEnter={() => setCursorState({ text: 'Voir' })}
              onMouseLeave={() => setCursorState({ text: '' })}
              aria-label={`Agrandir : ${label}`}
              className={`group overflow-hidden bg-neutral-900 ${itemClass}`}
            >
              {media.type === 'video' ? (
                <div className="aspect-video">
                  <VideoMedia src={media.url} poster={media.poster} />
                </div>
              ) : (
                <Photo
                  media={media}
                  alt={media.alt || label}
                  sizes={sizes}
                  className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
