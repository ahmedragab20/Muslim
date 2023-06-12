// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/core.css', '@/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxthq/ui', '@nuxtjs/i18n'],
  i18n: {
    vueI18n: 'i18n.config',
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  devtools: { enabled: true },
});
