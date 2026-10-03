import { photo } from '../../lib/media';

const slug = 'la-mornantaise';
const p = (name, width, height) => photo(`${slug}/${name}`, width, height);
const cover = p('cover', 988, 1316);

export default {
  id: slug,
  title: 'La Mornantaise',
  slug,
  category: 'Sport',
  year: '2026',
  client: '',
  location: '',
  description: '',
  sourceUrl: 'https://evastrephotographie.myportfolio.com/la-mornantaise',
  featured: true,
  order: 1,
  galleryLayout: 'editorial',
  coverImage: cover,
  heroMedia: cover,
  images: [
    // La page d'origine ne contient aucune galerie : seule la couverture est publiée.
    p('cover', 988, 1316),
  ],
  videos: [],
  credits: [],
};
