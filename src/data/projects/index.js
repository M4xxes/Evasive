// Pour ajouter un projet : créer un fichier dans ce dossier puis l'ajouter à la liste ci-dessous.
// Ordre d'origine du portfolio (evastrephotographie.myportfolio.com/work).
import laMornantaise from './la-mornantaise';
import mornantxpress from './mornantxpress';
import emmyShooting from './emmy-shooting';
import emmaJuneShooting from './emma-june-shooting';
import broridersShooting from './broriders-shooting';
import motownGpCarton from './motown-gp-carton-2026';

export const ALL_CATEGORY = 'Tout';

export const INITIAL_PROJECTS = [
  laMornantaise,
  mornantxpress,
  emmyShooting,
  emmaJuneShooting,
  broridersShooting,
  motownGpCarton,
].sort((a, b) => a.order - b.order);

export const INITIAL_CATEGORIES = [
  ALL_CATEGORY,
  ...new Set(INITIAL_PROJECTS.map((p) => p.category).filter(Boolean)),
];
