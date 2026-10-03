// Helpers médias : les photos sont servies depuis /public/media/<projet>/<nom>-<largeur>.webp
// Les déclinaisons sont générées par scripts/optimize-media.sh (même règle que renditionWidths).

const BASE = `${import.meta.env.BASE_URL}media`;
const STEPS = [640, 1280, 1920];
const MAX_EDGE = 1920;

export function renditionWidths(width, height) {
  const max = Math.min(width, Math.round((width * MAX_EDGE) / Math.max(width, height)));
  return [...STEPS.filter((s) => s < max), max];
}

// Déclare une photo optimisée à partir de ses dimensions d'origine.
export function photo(path, width, height, extra = {}) {
  const widths = renditionWidths(width, height);
  const url = (w) => `${BASE}/${path}-${w}.webp`;
  return {
    type: 'image',
    url: url(widths[widths.length - 1]),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(', '),
    width,
    height,
    alt: '',
    ...extra,
  };
}

// Accepte une URL brute (ancien format / CMS) ou un objet média.
export function toMedia(item) {
  if (!item) return null;
  if (typeof item === 'string') return { type: 'image', url: item };
  return { type: item.type || 'image', ...item };
}

export function orientation(media) {
  if (!media?.width || !media?.height) return 'unknown';
  if (media.width > media.height * 1.05) return 'landscape';
  if (media.height > media.width * 1.05) return 'portrait';
  return 'square';
}

export function buildMediaList(project) {
  const images = (project.images || []).map(toMedia);
  const videos = (project.videos || []).map((v) => ({ type: 'video', ...toMedia(v) }));
  return [...images, ...videos].filter(Boolean);
}
