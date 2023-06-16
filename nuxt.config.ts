export default defineNuxtConfig({
  css: ['@/assets/css/core.css', '@/assets/css/main.css', '@/assets/css/animation.css'],
  modules: ['@pinia/nuxt', '@nuxthq/ui', '@nuxtjs/i18n'],
  i18n: {
    detectBrowserLanguage: {
      // useCookie: true,
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
  // vuefire: {
  //   /*  We're gonna pause the authentication work until we finish the important parts in the aoo  */
  //   auth: true,
  //   // admin: {
  //   //   serviceAccount: './service-account.json',
  //   // },
  //   config: {
  //     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  //     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  //     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  //     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  //     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  //     appId: import.meta.env.VITE_FIREBASE_APP_ID,
  //     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  //   },
  // },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  devtools: { enabled: true },
});
