import React, { useEffect, useState } from 'react';
import { site, about, heroSlides } from '../data/site';

const SLIDE_DURATION = 6000;

export default function Hero({ navigate, projects, setCursorState }) {
  const [active, setActive] = useState(0);
  // Les images suivantes ne sont chargées qu'après la première (preload limité à l'essentiel).
  const [loaded, setLoaded] = useState([0]);

  useEffect(() => {
    if (heroSlides.length < 2) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;
    const id = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % heroSlides.length;
        setLoaded((l) => (l.includes(next) ? l : [...l, next]));
        return next;
      });
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  const current = heroSlides[active];
  const currentProject = projects.find((p) => p.slug === current?.project);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden">
      {heroSlides.map((slide, i) =>
        loaded.includes(i) ? (
          <picture key={slide.project + i}>
            <source media="(max-width: 767px)" srcSet={slide.mobile.srcSet} sizes="100vw" />
            <img
              src={slide.desktop.url}
              srcSet={slide.desktop.srcSet}
              sizes="100vw"
              alt=""
              fetchpriority={i === 0 ? 'high' : undefined}
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1600ms] ease-out ${
                i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
              style={{ objectPosition: slide.position || 'center' }}
            />
          </picture>
        ) : null
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-black/40 to-black/20" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-amber-400">{site.tagline}</p>
        <h1 className="sr-only">{site.name}</h1>
        <img
          src={site.logo}
          alt=""
          width="1400"
          height="658"
          className="w-[min(78vw,560px)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)]"
        />
        <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-gray-300 md:text-base">
          {about.statement}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
          <button
            type="button"
            onClick={scrollToWork}
            onMouseEnter={() => setCursorState({ text: 'Voir' })}
            onMouseLeave={() => setCursorState({ text: '' })}
            className="w-fit border border-white/30 px-8 py-3 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:border-amber-400 hover:text-amber-400"
          >
            Mon travail
          </button>

          {currentProject && (
            <button
              type="button"
              onClick={() => navigate(`/work/${currentProject.slug}`)}
              className="group flex items-center gap-3 text-left text-[11px] uppercase tracking-[0.25em] text-gray-400 transition-colors hover:text-white"
            >
              <span className="flex gap-1.5" aria-hidden="true">
                {heroSlides.map((s, i) => (
                  <span
                    key={s.project + i}
                    className={`h-px w-6 transition-colors duration-700 ${i === active ? 'bg-amber-400' : 'bg-white/25'}`}
                  />
                ))}
              </span>
              <span key={currentProject.slug} className="animate-fade-in">
                {currentProject.title}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
