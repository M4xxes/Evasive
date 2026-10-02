import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const emptyProject = {
  title: '',
  slug: '',
  category: 'Editorial',
  year: new Date().getFullYear().toString(),
  client: '',
  description: '',
  coverImage: '',
};

export default function AdminModal({ projects, setProjects, onClose }) {
  const [form, setForm] = useState(emptyProject);

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'title' && !prev.slug
        ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }
        : {}),
    }));
  };

  const addProject = (e) => {
    e.preventDefault();
    if (!form.title || !form.coverImage) return;

    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setProjects((prev) => [
      ...prev,
      {
        id: `proj-${Date.now()}`,
        ...form,
        slug,
        featured: false,
        galleryLayout: 'grid',
        order: prev.length + 1,
        images: [form.coverImage],
        heroMedia: { type: 'image', url: form.coverImage },
        credits: [{ role: 'Photographer', name: 'Eva Masson' }],
      },
    ]);
    setForm(emptyProject);
  };

  const removeProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-6 pt-24">
      <div className="w-full max-w-3xl border border-white/10 bg-[#111318] p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400">Studio CMS</p>
            <h2 className="mt-2 font-serif-title text-2xl uppercase tracking-widest text-white">
              Projects
            </h2>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={addProject} className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <input value={form.title} onChange={update('title')} placeholder="Title" className="border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none focus:border-amber-400" />
          <input value={form.slug} onChange={update('slug')} placeholder="Slug" className="border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none focus:border-amber-400" />
          <input value={form.category} onChange={update('category')} placeholder="Category" className="border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none focus:border-amber-400" />
          <input value={form.year} onChange={update('year')} placeholder="Year" className="border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none focus:border-amber-400" />
          <input value={form.client} onChange={update('client')} placeholder="Client" className="border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none focus:border-amber-400" />
          <input value={form.coverImage} onChange={update('coverImage')} placeholder="Cover image URL" className="border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none focus:border-amber-400" />
          <textarea value={form.description} onChange={update('description')} placeholder="Description" rows={3} className="border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none focus:border-amber-400 md:col-span-2" />
          <button type="submit" className="mt-2 flex items-center justify-center gap-2 bg-white py-3 text-xs font-bold uppercase tracking-[0.3em] text-black hover:bg-amber-400 md:col-span-2">
            <Plus className="h-4 w-4" /> Add project
          </button>
        </form>

        <ul className="flex flex-col gap-3">
          {projects.map((project) => (
            <li key={project.id} className="flex items-center justify-between border border-white/10 px-4 py-3">
              <div>
                <p className="text-sm text-white">{project.title}</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  {project.category} · {project.year}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="text-gray-500 hover:text-red-400"
                aria-label={`Delete ${project.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
