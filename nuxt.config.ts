import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// we need the root node modules where packages are hoisted
const nodeModules = fileURLToPath(new URL('../../../node_modules', import.meta.url));

export default defineNuxtConfig({
  css: ['@/assets/css/core.css', '@/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxthq/ui', '@nuxtjs/i18n', 'nuxt-vuefire'],
  i18n: {
    detectBrowserLanguage: {
      useCookie: false,
      fallbackLocale: 'en',
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'ar',
        file: 'ar.json',
      },
    ],
    langDir: 'localizations',
    defaultLocale: 'en',
  },
  vuefire: {
    auth: true,
    admin: {
      serviceAccount: resolve(fileURLToPath(new URL('service-account.json', import.meta.url))),
    },
    config: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    },
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  devtools: { enabled: true },
});
