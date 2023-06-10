// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/core.css', '@/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxthq/ui'],
  googleFonts: {
    families: {
      'Headland One': true,
      Poppins: true,
    },
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  devtools: { enabled: true },
});
