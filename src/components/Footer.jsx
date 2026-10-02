import React from 'react';

export default function Footer({ navigate }) {
  return (
    <footer className="mt-auto border-t border-white/10 px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="font-serif-title text-xl uppercase tracking-[0.25em] text-white"
          >
            EVASIVE
          </button>
          <p className="mt-3 text-xs tracking-wider text-gray-500">
            Eva Masson — Photographer & Filmmaker
          </p>
        </div>

        <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-gray-400">
          <button type="button" onClick={() => navigate('/')} className="hover:text-white">
            Work
          </button>
          <button type="button" onClick={() => navigate('/about')} className="hover:text-white">
            About
          </button>
          <button type="button" onClick={() => navigate('/contact')} className="hover:text-white">
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}
