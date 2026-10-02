import React from 'react';

export default function Hero({ navigate, setCursorState }) {
  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
        alt="Evasive studio"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-black/40 to-black/20" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:px-12 md:pb-28">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-amber-400">Photographer & Filmmaker</p>
        <h1 className="font-serif-title text-5xl uppercase tracking-[0.2em] text-white md:text-8xl">
          EVASIVE
        </h1>
        <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-gray-300 md:text-base">
          Visual work by Eva Masson — photography and moving image through a contemporary, personal lens.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          onMouseEnter={() => setCursorState({ text: 'View' })}
          onMouseLeave={() => setCursorState({ text: '' })}
          className="mt-10 w-fit border border-white/30 px-8 py-3 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:border-amber-400 hover:text-amber-400"
        >
          Selected Work
        </button>
      </div>
    </section>
  );
}
