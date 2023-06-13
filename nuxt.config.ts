// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/core.css', '@/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxthq/ui', '@nuxtjs/i18n'],
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
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  devtools: { enabled: true },
});
