import React from 'react';
import Photo from './Photo';

export default function ProjectCard({ project, navigate, setCursorState }) {
  const count = (project.images?.length || 0) + (project.videos?.length || 0);

  return (
    <button
      type="button"
      onClick={() => navigate(`/work/${project.slug}`)}
      onMouseEnter={() => setCursorState({ text: 'Ouvrir' })}
      onMouseLeave={() => setCursorState({ text: '' })}
      className="group animate-fade-in text-left"
    >
      <div className="aspect-[4/5] overflow-hidden bg-neutral-900">
        <Photo
          media={project.coverImage}
          alt={project.title}
          sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif-title text-xl uppercase tracking-widest text-white md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
            {[project.category, project.year].filter(Boolean).join(' — ')}
          </p>
        </div>
        <span className="shrink-0 pt-1 text-xs uppercase tracking-widest text-amber-400/80">
          {project.client || `${count} ${count > 1 ? 'photos' : 'photo'}`}
        </span>
      </div>
    </button>
  );
}
