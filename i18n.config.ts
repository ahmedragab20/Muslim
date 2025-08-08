import ar from './localizations/ar.json';
import en from './localizations/en.json';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    ar,
    en,
  },
}));
