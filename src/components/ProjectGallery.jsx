import React from 'react';
import VideoMedia from './VideoMedia';

function buildMediaList(project) {
  const images = (project.images || []).map((url) => ({ type: 'image', url }));
  const videos = (project.videos || []).map((v) => ({
    type: 'video',
    url: v.url,
    poster: v.poster,
  }));
  return [...images, ...videos];
}

export default function ProjectGallery({ project, onOpenLightbox, setCursorState }) {
  const mediaList = buildMediaList(project);
  const layout = project.galleryLayout || 'grid';

  const layoutClass =
    layout === 'masonry'
      ? 'columns-1 gap-4 md:columns-2'
      : layout === 'editorial'
        ? 'grid grid-cols-1 gap-6 md:grid-cols-12'
        : 'grid grid-cols-1 gap-4 md:grid-cols-2';

  return (
    <section className="mt-16">
      <div className={layoutClass}>
        {mediaList.map((media, index) => {
          const editorialSpan =
            layout === 'editorial'
              ? index === 0
                ? 'md:col-span-12'
                : index % 2 === 0
                  ? 'md:col-span-7'
                  : 'md:col-span-5'
              : '';
          const masonryBreak = layout === 'masonry' ? 'mb-4 break-inside-avoid' : '';

          return (
            <button
              key={`${media.url}-${index}`}
              type="button"
              onClick={() => onOpenLightbox(index, mediaList)}
              onMouseEnter={() => setCursorState({ text: 'View' })}
              onMouseLeave={() => setCursorState({ text: '' })}
              className={`overflow-hidden bg-neutral-900 ${editorialSpan} ${masonryBreak}`}
            >
              {media.type === 'video' ? (
                <div className="aspect-video">
                  <VideoMedia src={media.url} poster={media.poster} />
                </div>
              ) : (
                <img src={media.url} alt="" className="h-full w-full object-cover" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
