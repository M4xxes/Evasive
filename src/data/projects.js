export const INITIAL_CATEGORIES = [
  "All",
  "Photography",
  "Film",
  "Commercial",
  "Editorial",
  "Fashion",
  "Portrait",
  "Architecture",
  "Personal"
];

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "SILENCE",
    slug: "silence",
    category: "Editorial",
    year: "2026",
    client: "Vogue Italia",
    description: "An exploration of stillness, ambient shadows, and quiet strength in high fashion portraiture.",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=85" },
    featured: true,
    galleryLayout: "editorial",
    order: 1,
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
    ],
    credits: [
      { role: "Creative Direction & Photography", name: "Eva Masson" },
      { role: "Styling", name: "Camille Dupont" },
      { role: "Model", name: "Elena Rostova" }
    ]
  },
  {
    id: "proj-2",
    title: "AFTER DARK",
    slug: "after-dark",
    category: "Film",
    year: "2026",
    client: "Saint Laurent",
    description: "Cinematic short film capturing neon accents, nocturnal energy, and urban isolation.",
    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
    heroMedia: { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-woman-walking-on-a-street-with-neon-lights-41381-large.mp4", poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1800&q=85" },
    featured: true,
    galleryLayout: "masonry",
    order: 2,
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=85"
    ],
    videos: [
      { url: "https://assets.mixkit.co/videos/preview/mixkit-woman-walking-on-a-street-with-neon-lights-41381-large.mp4", poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85" }
    ],
    credits: [
      { role: "Director & Cinematographer", name: "Eva Masson" },
      { role: "Colorist", name: "Studio Noir" }
    ]
  },
  {
    id: "proj-3",
    title: "MOTION",
    slug: "motion",
    category: "Commercial",
    year: "2025",
    client: "Porsche Design",
    description: "Speed, sculpture, and light interplay on minimalist automotive forms.",
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85" },
    featured: true,
    galleryLayout: "grid",
    order: 3,
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85"
    ],
    credits: [
      { role: "Director & Photographer", name: "Eva Masson" },
      { role: "Production", name: "Evasive Studio" }
    ]
  },
  {
    id: "proj-4",
    title: "FRAGMENTS",
    slug: "fragments",
    category: "Portrait",
    year: "2025",
    client: "Self-Initiated",
    description: "An intimate series focusing on human emotion, raw skin textures, and natural daylight.",
    coverImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=85",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1800&q=85" },
    featured: true,
    galleryLayout: "editorial",
    order: 4,
    images: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85"
    ],
    credits: [
      { role: "Photographer", name: "Eva Masson" }
    ]
  }
];
