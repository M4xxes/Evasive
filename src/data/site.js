// Contenu éditorial du site, repris tel quel de evastrephotographie.myportfolio.com.
// Les champs vides n'existent pas sur le site d'origine : à compléter manuellement.
import { photo } from '../lib/media';

export const site = {
  brand: 'Eva Masson',
  name: 'Eva Masson',
  role: 'Photographe',
  location: 'Lyon',
  tagline: 'Photographe — Lyon',
  logo: `${import.meta.env.BASE_URL}media/site/logo-evastre.webp`,
  sourceUrl: 'https://evastrephotographie.myportfolio.com',
};

export const about = {
  statement: 'Mouvement, corps, lumière, mécanique, regards.',
  paragraphs: [
    "Je cherche avant tout à créer des images qui ont une présence, qu'elles racontent quelque chose ou qu'elles donnent simplement envie de les regarder une seconde fois.",
    'Basée à Lyon, je travaille principalement autour du portrait, de l’événementiel, du sport et de l’univers automobile/moto.',
  ],
  specialties: ['Portrait', 'Événementiel', 'Sport', 'Automobile / Moto'],
  // Aucun portrait de la photographe n'est publié sur le site d'origine.
  // Renseigner ici une photo (ex. photo('site/portrait', 1200, 1600)) pour l'afficher.
  portrait: null,
  // Image d'illustration en attendant : un travail extrait du projet indiqué.
  illustration: { project: 'emmy-shooting', media: photo('emmy-shooting/19', 1920, 2880) },
};

export const contact = {
  title: 'Un projet en tête ?',
  text: "Une idée, un événement, un shooting ou simplement envie d'échanger ? Travaillons ensemble !",
  successMessage: 'Merci !',
  // Le site d'origine ne publie ni email, ni téléphone, ni réseau social :
  // seul un formulaire Adobe Portfolio est proposé. À compléter.
  email: '',
  phone: '',
  // URL d'un service de formulaire (Formspree, Getform, Basin…) acceptant un POST JSON.
  formEndpoint: '',
  socials: [
    // { label: 'Instagram', url: 'https://instagram.com/…' },
  ],
};

// Diaporama de la page d'accueil : image paysage (desktop) + image portrait (mobile).
export const heroSlides = [
  {
    project: 'emmy-shooting',
    desktop: photo('emmy-shooting/01', 1536, 1024),
    mobile: photo('emmy-shooting/21', 3840, 5760),
  },
  {
    project: 'motown-gp-carton-2026',
    desktop: photo('motown-gp-carton-2026/28', 3840, 2560),
    mobile: photo('motown-gp-carton-2026/cover', 1023, 1364),
  },
  {
    project: 'emma-june-shooting',
    desktop: photo('emma-june-shooting/15', 3840, 5760),
    mobile: photo('emma-june-shooting/15', 3840, 5760),
    position: 'center 30%',
  },
];
