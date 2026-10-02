import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectGallery from './components/ProjectGallery';
import Lightbox from './components/Lightbox';
import VideoMedia from './components/VideoMedia';
import AdminModal from './components/AdminModal';
import { INITIAL_PROJECTS, INITIAL_CATEGORIES } from './data/projects';

export default function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('evasive_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [categories] = useState(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentRoute, setCurrentRoute] = useState('/');
  const [activeProject, setActiveProject] = useState(null);
  const [cursorState, setCursorState] = useState({ text: '' });
  const [lightboxState, setLightboxState] = useState({ open: false, index: 0, mediaList: [] });
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('evasive_projects', JSON.stringify(projects));
  }, [projects]);

  const navigate = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentRoute(path);

    if (path.startsWith('/work/')) {
      const slug = path.replace('/work/', '');
      const proj = projects.find((p) => p.slug === slug);
      setActiveProject(proj || null);
    } else {
      setActiveProject(null);
    }
  };

  const filteredProjects = projects.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#E5E7EB] flex flex-col selection:bg-amber-500 selection:text-black">
      <CustomCursor cursorState={cursorState} />

      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <main className="flex-grow">
        {/* HOMEPAGE */}
        {currentRoute === '/' && (
          <>
            <Hero navigate={navigate} setCursorState={setCursorState} />

            {/* Intro */}
            <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center border-b border-white/5">
              <p className="text-xl md:text-3xl font-light text-gray-300 leading-relaxed font-serif-title tracking-wide">
                "Evasive is the visual work of <span className="text-white font-medium">Eva Masson</span>, exploring photography and moving image through a contemporary and personal perspective."
              </p>
            </section>

            {/* Work Section */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <h2 className="text-3xl md:text-5xl font-serif-title tracking-widest text-white uppercase">
                    Selected Work
                  </h2>
                  <p className="text-xs text-amber-400 tracking-[0.3em] uppercase mt-2">Editorial Portfolio</p>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
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
          </>
        )}

        {/* PROJECT DETAIL PAGE */}
        {currentRoute.startsWith('/work/') && activeProject && (
          <article className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
            {/* Hero Media */}
            <div className="w-full h-[60vh] md:h-[80vh] bg-neutral-900 rounded-sm overflow-hidden mb-12">
              {activeProject.heroMedia?.type === 'video' ? (
                <VideoMedia src={activeProject.heroMedia.url} poster={activeProject.heroMedia.poster} />
              ) : (
                <img
                  src={activeProject.coverImage}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Header info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
              <div className="md:col-span-2">
                <h1 className="text-4xl md:text-6xl font-serif-title tracking-widest text-white uppercase mb-4">
                  {activeProject.title}
                </h1>
                <p className="text-gray-300 text-lg max-w-2xl font-light leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 text-xs tracking-widest uppercase text-gray-400 border-l border-white/10 pl-6">
                <div>
                  <span className="text-gray-600 block mb-1">Category</span>
                  <span className="text-white">{activeProject.category}</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-1">Year</span>
                  <span className="text-white">{activeProject.year}</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-1">Client</span>
                  <span className="text-white">{activeProject.client || 'N/A'}</span>
                </div>
              </div>
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
                <h3 className="text-xs tracking-[0.3em] text-amber-400 uppercase mb-6">Credits</h3>
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
          </article>
        )}

        {/* ABOUT PAGE */}
        {currentRoute === '/about' && (
          <section className="pt-36 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[3/4] bg-neutral-900 rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                  alt="Eva Masson"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="flex flex-col gap-6">
                <span className="text-xs tracking-[0.3em] uppercase text-amber-400">About Eva Masson</span>
                <h1 className="text-4xl md:text-5xl font-serif-title tracking-wider text-white">
                  EVASIVE STUDIO
                </h1>
                <p className="text-gray-300 font-light text-lg leading-relaxed">
                  Eva Masson is an international photographer and director specializing in fashion, editorial, automotive, and cinematic art direction.
                </p>
                <p className="text-gray-400 font-light leading-relaxed">
                  Her work balances light, shadow, and silent motion, producing images that linger between documentary honesty and surreal perfection.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT PAGE */}
        {currentRoute === '/contact' && (
          <section className="pt-36 pb-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-amber-400">Initiate Collaboration</span>
            <h1 className="text-4xl md:text-6xl font-serif-title tracking-wider text-white uppercase mt-2 mb-8">
              Let's create together
            </h1>
            <form className="flex flex-col gap-6 text-left max-w-xl mx-auto">
              <input
                type="text"
                placeholder="YOUR NAME"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
              <textarea
                placeholder="PROJECT DETAILS"
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              ></textarea>
              <button
                type="button"
                className="mt-6 w-full py-4 bg-white text-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-amber-400 transition-colors"
              >
                Send Inquiry →
              </button>
            </form>
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