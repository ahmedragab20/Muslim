<template>
  <div v-if="loaded" id="ragab-app">
    <!-- 🚧 - App Layouts -->
    <NuxtLayout></NuxtLayout>

    <!-- Footer -->
    <div class="py-10 px-4 flex justify-center items-center">
      Made with ❤️ by
      <a href="https://github.com/ahmedragab20" target="_blank" class="text-primary-500 mx-1">
        Ragab
      </a>
      <small class="text-gray-400 dark:text-gray-500">&copy; 2023</small>
    </div>

    <!-- 🤷🏻‍♂️ - so global -->
    <!-- Toasts -->
    <UNotifications />
  </div>
</template>
<script setup lang="ts">
  const { locale } = useI18n();
  const appConfig = useAppConfig();
  const appSettings = ref();
  const loaded = ref(false);

  const initTheme = () => {
    if (process.client) {
      appSettings.value = localStorage.getItem('appSettings');
      if (!!appSettings.value) {
        const settings = JSON.parse(appSettings.value);

        appConfig.ui.primary = settings.color?.primary || 'green';
        appConfig.ui.gray = settings.color?.secondary || 'cool';
      }
    }
  };

  onMounted(async () => {
    initTheme();
    locale.value.includes('ar') ? (document.dir = 'rtl') : (document.dir = 'rtl');
    loaded.value = true;
  });
</script>
