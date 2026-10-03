import React from 'react';
import { site, contact } from '../data/site';

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
            {site.brand}
          </button>
          <p className="mt-3 text-xs tracking-wider text-gray-500">
            {site.name} — {site.tagline}
          </p>
          <p className="mt-1 text-[11px] tracking-wider text-gray-600">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs uppercase tracking-[0.2em] text-gray-400">
          <button type="button" onClick={() => navigate('/')} className="hover:text-white">
            Mon travail
          </button>
          <button type="button" onClick={() => navigate('/about')} className="hover:text-white">
            À propos
          </button>
          <button type="button" onClick={() => navigate('/contact')} className="hover:text-white">
            Contact
          </button>
          {contact.socials.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
