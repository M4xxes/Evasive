import { photo } from '../../lib/media';

const slug = 'broriders-shooting';
const p = (name, width, height) => photo(`${slug}/${name}`, width, height);
const cover = p('cover', 3133, 4177);

export default {
  id: slug,
  title: 'BroRiders Shooting',
  slug,
  category: 'Auto / Moto',
  year: '2026',
  client: '',
  location: '',
  description: '',
  sourceUrl: 'https://evastrephotographie.myportfolio.com/broriders-shooting',
  featured: true,
  order: 5,
  galleryLayout: 'grid',
  coverImage: cover,
  heroMedia: cover,
  images: [
    p('01', 1920, 2880),
    p('02', 3840, 5760),
    p('03', 3840, 5760),
    p('04', 3840, 5760),
    p('05', 1920, 2880),
    p('06', 1920, 2881),
    p('07', 3840, 5760),
    p('08', 3840, 5760),
    p('09', 1920, 2880),
    p('10', 1920, 2880),
    p('11', 1920, 2880),
    p('12', 1920, 2880),
    p('13', 1920, 2880),
    p('14', 3840, 5760),
    p('15', 1920, 2880),
    p('16', 1920, 2880),
    p('17', 1920, 2880),
    p('18', 3840, 5760),
    p('19', 3840, 5760),
    p('20', 1920, 2880),
    p('21', 3840, 5760),
  ],
  videos: [],
  credits: [],
};
