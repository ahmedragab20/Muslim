import ar from '~/localizations/ar-SA';
import en from '~/localizations/en-US';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en-US',
  messages: {
    en,
    ar,
  },
}));
