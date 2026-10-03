import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { site } from '../data/site';

export default function Navbar({ currentRoute, navigate, onOpenAdmin, showAdmin = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'MON TRAVAIL', route: '/' },
    { label: 'À PROPOS', route: '/about' },
    { label: 'CONTACT', route: '/contact' }
  ];

  const isActive = (route) =>
    route === '/' ? currentRoute === '/' || currentRoute.startsWith('/work/') : currentRoute === route;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              navigate('/');
              setMobileMenuOpen(false);
            }}
            className="text-xl md:text-2xl font-serif-title tracking-[0.25em] font-bold text-white hover:opacity-70 transition-opacity uppercase"
            aria-label={`${site.name} — accueil`}
          >
            {site.brand}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.route)}
                aria-current={isActive(link.route) ? 'page' : undefined}
                className={`text-xs tracking-[0.2em] font-medium transition-colors ${
                  isActive(link.route) ? 'text-amber-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}

            {showAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2 text-gray-400 hover:text-amber-400 transition-colors rounded-full hover:bg-white/5"
                title="Ouvrir le Studio Admin (CMS)"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            {showAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2 text-gray-400 hover:text-amber-400"
                aria-label="Ouvrir le Studio Admin (CMS)"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0B0C0E] flex flex-col justify-between p-8 pt-28 md:hidden">
          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  navigate(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-3xl font-serif-title tracking-widest ${
                  isActive(link.route) ? 'text-amber-400' : 'text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-white/10 pt-6 flex flex-col gap-2 text-xs text-gray-400 tracking-wider">
            <p className="uppercase">{site.name}</p>
            <p className="text-gray-500">{site.tagline}</p>
          </div>
        </div>
      )}
    </>
  );
}