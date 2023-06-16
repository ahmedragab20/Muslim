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

    <!-- Modals -->
    <UModal v-model="authStore.authLanded">
      <AuthLand :target="chosenAuthLand" />
    </UModal>
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
  import { useAuthStore } from '~/stores/auth';

  type AuthLand = 'login' | 'register' | 'forgot' | 'reset' | 'verify'; //TODO:: search why it fails to be imported if you added it in types/index.ts
  const authStore = useAuthStore();
  const { locale } = useI18n();
  const appConfig = useAppConfig();
  const appSettings = ref();
  const loaded = ref(false);

  const chosenAuthLand = computed<AuthLand>(() => authStore.chosenAuthLand); // fallback to login

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

  onMounted(() => {
    initTheme();
    loaded.value = true;
  });

  useHead({
    title: 'Muslim - مُسْلِم',
  });
</script>
