<template>
  <div v-if="loaded" id="ragab-app">
    <!-- 🚧 - App Layouts -->
    <NuxtLayout></NuxtLayout>

    <!-- Footer -->
    <div class="flex items-center justify-center px-4 py-10">
      Made with ❤️ by
      <a href="https://github.com/ahmedragab20" target="_blank" class="mx-1 text-primary-500">
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
        locale.value = settings.language || 'en';
        locale.value?.includes('ar') ? (document.dir = 'rtl') : (document.dir = 'ltr');
      }
    }
  };

  onMounted(async () => {
    initTheme();
    loaded.value = true;
  });
</script>
