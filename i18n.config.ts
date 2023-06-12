import ar from '@/localizations/ar-SA.json';
import en from '@/localizations/en-US.json';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en-US',
  messages: {
    en,
    ar,
  },
}));
