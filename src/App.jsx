import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectGallery from './components/ProjectGallery';
import Lightbox from './components/Lightbox';
import VideoMedia from './components/VideoMedia';
import AdminModal from './components/AdminModal';
import ContactForm from './components/ContactForm';
import Photo from './components/Photo';
import { INITIAL_PROJECTS, INITIAL_CATEGORIES, ALL_CATEGORY } from './data/projects';
import { site, about, contact } from './data/site';
import { toMedia, orientation, buildMediaList } from './lib/media';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
// Le CMS local ne sauvegarde que ses modifications (ajouts / suppressions) :
// les fichiers de src/data/projects restent toujours la source de vérité.
const STORAGE_KEY = 'evastre_cms_changes';
const LEGACY_STORAGE_KEY = 'evasive_projects';
// Le CMS local n'est proposé qu'en développement ou via ?admin
const ADMIN_ENABLED =
  import.meta.env.DEV || new URLSearchParams(window.location.search).has('admin');

const readPath = () => window.location.pathname.slice(BASE.length).replace(/\/+$/, '') || '/';

// Anciennes adresses myportfolio (/work, /<projet>) → nouvelles routes
const legacyRedirect = (path) => {
  if (path === '/work') return '/';
  const project = INITIAL_PROJECTS.find((p) => `/${p.slug}` === path);
  return project ? `/work/${project.slug}` : path;
};

const initialPath = () => {
  const path = readPath();
  const target = legacyRedirect(path);
  if (target !== path) window.history.replaceState({}, '', `${BASE}${target}${window.location.search}`);
  return target;
};

const loadProjects = () => {
  try {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    if (!ADMIN_ENABLED) return INITIAL_PROJECTS;
    const { added = [], removed = [] } = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const baseIds = new Set(INITIAL_PROJECTS.map((p) => p.id));
    return [
      ...INITIAL_PROJECTS.filter((p) => !removed.includes(p.id)),
      ...added.filter((p) => !baseIds.has(p.id)),
    ];
  } catch {
    return INITIAL_PROJECTS;
  }
};

export default function App() {
  const [projects, setProjects] = useState(loadProjects);

  const [categories] = useState(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [currentRoute, setCurrentRoute] = useState(initialPath);
  const [cursorState, setCursorState] = useState({ text: '' });
  const [lightboxState, setLightboxState] = useState({ open: false, index: 0, mediaList: [] });
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    if (!ADMIN_ENABLED) return;
    const ids = new Set(projects.map((p) => p.id));
    const baseIds = new Set(INITIAL_PROJECTS.map((p) => p.id));
    const changes = {
      added: projects.filter((p) => !baseIds.has(p.id)),
      removed: INITIAL_PROJECTS.filter((p) => !ids.has(p.id)).map((p) => p.id),
    };
    try {
      if (changes.added.length || changes.removed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(changes));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // stockage indisponible (navigation privée…) : modifications non conservées
    }
  }, [projects]);

  useEffect(() => {
    const onPop = () => setCurrentRoute(readPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((path) => {
    if (path !== readPath()) window.history.pushState({}, '', `${BASE}${path}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentRoute(path);
    setCursorState({ text: '' });
  }, []);

  const activeProject = useMemo(() => {
    if (!currentRoute.startsWith('/work/')) return null;
    const slug = currentRoute.replace('/work/', '');
    return projects.find((p) => p.slug === slug) || null;
  }, [currentRoute, projects]);

  const isKnownRoute =
    currentRoute === '/' || currentRoute === '/about' || currentRoute === '/contact' || activeProject;

  useEffect(() => {
    const titles = { '/': `${site.name} — ${site.tagline}`, '/about': 'À propos', '/contact': 'Contact' };
    const page = activeProject ? activeProject.title : titles[currentRoute] || 'Page introuvable';
    document.title = currentRoute === '/' ? page : `${page} — ${site.name}`;
  }, [currentRoute, activeProject]);

  const filteredProjects = projects.filter(
    (p) => selectedCategory === ALL_CATEGORY || p.category === selectedCategory
  );

  const projectIndex = activeProject ? projects.indexOf(activeProject) : -1;
  const prevProject = projectIndex >= 0 ? projects[(projectIndex - 1 + projects.length) % projects.length] : null;
  const nextProject = projectIndex >= 0 ? projects[(projectIndex + 1) % projects.length] : null;
  const hero = activeProject ? toMedia(activeProject.heroMedia) || toMedia(activeProject.coverImage) : null;
  const heroIsPortrait = hero && orientation(hero) !== 'landscape';
  const mediaCount = activeProject ? buildMediaList(activeProject).length : 0;

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#E5E7EB] flex flex-col selection:bg-amber-500 selection:text-black">
      <CustomCursor cursorState={cursorState} />

      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        onOpenAdmin={() => setAdminOpen(true)}
        showAdmin={ADMIN_ENABLED}
      />

      <main className="flex-grow">
        {/* HOMEPAGE */}
        {currentRoute === '/' && (
          <>
            <Hero navigate={navigate} projects={projects} setCursorState={setCursorState} />

            {/* Intro */}
            <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center border-b border-white/5">
              <p className="text-xl md:text-3xl font-light text-gray-300 leading-relaxed font-serif-title tracking-wide">
                <span className="text-white font-medium">{about.statement}</span> {about.paragraphs[0]}
              </p>
              <p className="mt-8 text-sm md:text-base font-light text-gray-400 leading-relaxed max-w-2xl mx-auto">
                {about.paragraphs[1]}
              </p>
            </section>

            {/* Work Section */}
            <section id="work" className="scroll-mt-20 py-20 px-6 md:px-12 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <h2 className="text-3xl md:text-5xl font-serif-title tracking-widest text-white uppercase">
                    Mon travail
                  </h2>
                  <p className="text-xs text-amber-400 tracking-[0.3em] uppercase mt-2">{site.tagline}</p>
                </div>

                {/* Categories */}
                <div className="-mx-6 flex items-center gap-3 overflow-x-auto no-scrollbar px-6 pb-2 md:mx-0 md:px-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      aria-pressed={selectedCategory === cat}
                      className={`text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                          : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                {filteredProjects.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={idx}
                    navigate={navigate}
                    setCursorState={setCursorState}
                  />
                ))}
              </div>
            </section>

            {/* Call to action */}
            <section className="py-24 px-6 md:px-12 border-t border-white/5 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-amber-400">Contact</span>
              <h2 className="text-3xl md:text-5xl font-serif-title tracking-wider text-white uppercase mt-3">
                {contact.title}
              </h2>
              <p className="mt-6 max-w-xl mx-auto text-gray-400 font-light leading-relaxed">{contact.text}</p>
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="mt-10 border border-white/30 px-8 py-3 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:border-amber-400 hover:text-amber-400"
              >
                Travaillons ensemble
              </button>
            </section>
          </>
        )}

        {/* PROJECT DETAIL PAGE */}
        {activeProject && (
          <article key={activeProject.slug} className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-fade-in">
            {/* Hero Media */}
            <div className="relative w-full h-[60vh] md:h-[80vh] bg-neutral-900 rounded-sm overflow-hidden mb-12">
              {hero?.type === 'video' ? (
                <VideoMedia src={hero.url} poster={hero.poster} />
              ) : heroIsPortrait ? (
                <>
                  {/* Portrait : affiché en entier sur un fond flouté de la même image */}
                  <Photo
                    media={hero}
                    alt=""
                    sizes="640px"
                    priority
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                  />
                  <Photo
                    media={hero}
                    alt={activeProject.title}
                    sizes="(max-width: 767px) 100vw, 60vh"
                    priority
                    className="relative mx-auto h-full w-auto max-w-full object-contain"
                  />
                </>
              ) : (
                <Photo
                  media={hero}
                  alt={activeProject.title}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Header info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
              <div className="md:col-span-2 min-w-0">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif-title tracking-widest text-white uppercase mb-4 break-words">
                  {activeProject.title}
                </h1>
                {activeProject.description && (
                  <p className="text-gray-300 text-lg max-w-2xl font-light leading-relaxed whitespace-pre-line">
                    {activeProject.description}
                  </p>
                )}
              </div>

              <dl className="flex flex-col gap-4 text-xs tracking-widest uppercase text-gray-400 border-l border-white/10 pl-6">
                {[
                  ['Catégorie', activeProject.category],
                  ['Année', activeProject.year],
                  ['Client', activeProject.client],
                  ['Lieu', activeProject.location],
                  ['Médias', `${mediaCount} ${mediaCount > 1 ? 'photos' : 'photo'}`],
                ]
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-gray-600 mb-1">{label}</dt>
                      <dd className="text-white">{value}</dd>
                    </div>
                  ))}
              </dl>
            </div>

            {/* Gallery */}
            <ProjectGallery
              project={activeProject}
              onOpenLightbox={(index, mediaList) => setLightboxState({ open: true, index, mediaList })}
              setCursorState={setCursorState}
            />

            {/* Credits */}
            {activeProject.credits && activeProject.credits.length > 0 && (
              <div className="mt-20 pt-10 border-t border-white/10 max-w-2xl">
                <h3 className="text-xs tracking-[0.3em] text-amber-400 uppercase mb-6">Crédits</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {activeProject.credits.map((c, i) => (
                    <div key={i}>
                      <p className="text-gray-500 text-xs">{c.role}</p>
                      <p className="text-white">{c.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Previous / next project */}
            {projects.length > 1 && (
              <nav className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 gap-6" aria-label="Autres projets">
                {[
                  { project: prevProject, label: 'Projet précédent', Icon: ArrowLeft, align: 'text-left' },
                  { project: nextProject, label: 'Projet suivant', Icon: ArrowRight, align: 'text-right' },
                ].map(({ project, label, Icon, align }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => navigate(`/work/${project.slug}`)}
                    onMouseEnter={() => setCursorState({ text: 'Ouvrir' })}
                    onMouseLeave={() => setCursorState({ text: '' })}
                    className={`group min-w-0 ${align}`}
                  >
                    <span
                      className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gray-500 ${
                        align === 'text-right' ? 'justify-end' : ''
                      }`}
                    >
                      {align === 'text-left' && <Icon className="h-3 w-3" />}
                      {label}
                      {align === 'text-right' && <Icon className="h-3 w-3" />}
                    </span>
                    <span className="mt-2 block font-serif-title text-lg md:text-3xl uppercase tracking-widest text-white transition-colors group-hover:text-amber-400 break-words">
                      {project.title}
                    </span>
                  </button>
                ))}
              </nav>
            )}
          </article>
        )}

        {/* ABOUT PAGE */}
        {currentRoute === '/about' && (
          <section className="pt-36 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <figure>
                <div className="relative aspect-[3/4] bg-neutral-900 rounded-sm overflow-hidden">
                  <Photo
                    media={about.portrait || about.illustration.media}
                    alt={about.portrait ? site.name : ''}
                    sizes="(max-width: 767px) 100vw, 560px"
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                {!about.portrait && (
                  <figcaption className="mt-3 text-[11px] uppercase tracking-[0.2em] text-gray-500">
                    <button
                      type="button"
                      onClick={() => navigate(`/work/${about.illustration.project}`)}
                      className="hover:text-white transition-colors"
                    >
                      Extrait — {projects.find((p) => p.slug === about.illustration.project)?.title}
                    </button>
                  </figcaption>
                )}
              </figure>

              <div className="flex flex-col gap-6">
                <span className="text-xs tracking-[0.3em] uppercase text-amber-400">À propos</span>
                <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-serif-title tracking-wider text-white uppercase break-words">
                  {site.name}
                </h1>
                <p className="text-xs tracking-[0.3em] uppercase text-gray-400">{site.tagline}</p>
                <p className="text-white font-serif-title text-xl md:text-2xl leading-relaxed tracking-wide">
                  {about.statement}
                </p>
                {about.paragraphs.map((text) => (
                  <p key={text} className="text-gray-300 font-light text-lg leading-relaxed">
                    {text}
                  </p>
                ))}
                <ul className="flex flex-wrap gap-3 pt-2">
                  {about.specialties.map((s) => (
                    <li
                      key={s}
                      className="text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-white/10 text-gray-300"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="border border-white/30 px-8 py-3 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:border-amber-400 hover:text-amber-400"
                  >
                    Mon travail
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/contact')}
                    className="bg-white px-8 py-3 text-xs font-bold uppercase tracking-[0.3em] text-black transition-colors hover:bg-amber-400"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT PAGE */}
        {currentRoute === '/contact' && (
          <section className="pt-36 pb-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-amber-400">Contact</span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif-title tracking-wider text-white uppercase mt-2 mb-6">
              {contact.title}
            </h1>
            <p className="mb-10 max-w-xl mx-auto text-gray-400 font-light leading-relaxed">{contact.text}</p>

            {(contact.email || contact.phone || contact.socials.length > 0) && (
              <div className="mb-12 flex flex-wrap justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.2em] text-gray-300">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="normal-case tracking-wider hover:text-amber-400">
                    {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-amber-400">
                    {contact.phone}
                  </a>
                )}
                {contact.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                    {s.label}
                  </a>
                ))}
              </div>
            )}

            <ContactForm />

            <p className="mt-16 text-[11px] uppercase tracking-[0.3em] text-gray-500">{site.tagline}</p>
          </section>
        )}

        {/* NOT FOUND */}
        {!isKnownRoute && (
          <section className="pt-48 pb-32 px-6 text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-amber-400">404</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif-title tracking-wider text-white uppercase">
              Page introuvable
            </h1>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mt-10 border border-white/30 px-8 py-3 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:border-amber-400 hover:text-amber-400"
            >
              Retour à l'accueil
            </button>
          </section>
        )}
      </main>

      <Footer navigate={navigate} />

      {/* Lightbox */}
      {lightboxState.open && (
        <Lightbox
          mediaList={lightboxState.mediaList}
          initialIndex={lightboxState.index}
          onClose={() => setLightboxState({ open: false, index: 0, mediaList: [] })}
        />
      )}

      {/* Admin Panel / CMS */}
      {adminOpen && (
        <AdminModal
          projects={projects}
          setProjects={setProjects}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </div>
  );
}
