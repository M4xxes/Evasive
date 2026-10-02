import React from 'react';

export default function ProjectCard({ project, navigate, setCursorState }) {
  return (
    <button
      type="button"
      onClick={() => navigate(`/work/${project.slug}`)}
      onMouseEnter={() => setCursorState({ text: 'Open' })}
      onMouseLeave={() => setCursorState({ text: '' })}
      className="group animate-fade-in text-left"
    >
      <div className="aspect-[4/5] overflow-hidden bg-neutral-900">
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif-title text-2xl uppercase tracking-widest text-white">
            {project.title}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
            {project.category} — {project.year}
          </p>
        </div>
        <span className="text-xs uppercase tracking-widest text-amber-400/80">{project.client}</span>
      </div>
    </button>
  );
}
