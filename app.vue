<template>
  <div v-if="loaded" id="ragab-app">
    <!-- 🚧 - App Layouts -->
    <NuxtLayout></NuxtLayout>

    <!-- Footer -->
    <div dir="ltr" class="flex items-center justify-center px-4 py-10">
      Made with 💚 by
      <a href="https://github.com/ahmedragab20" target="_blank" class="mx-1 text-primary-500">
        Ragab
      </a>
      <small class="text-gray-400 dark:text-gray-500">&copy; 2023</small>
    </div>

    <!-- 🤷🏻‍♂️ - so global -->
    <!-- Toasts -->
    <UNotifications />
  </div>
  <div v-else class="flex justify-center items-center flex-col h-screen gap-4">
    <div v-for="n in 4" :key="n">
      <div class="flex items-center space-x-4">
        <USkeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </div>
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
