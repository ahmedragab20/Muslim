<template>
  <div>
    <UButton variant="soft" icon="i-heroicons-globe-alt" @click="switchLocale">
      {{ locale === 'en' ? 'عربى' : 'English' }}
    </UButton>
  </div>
</template>
<script setup lang="ts">
  const { locale } = useI18n();

  const switchLocale = () => {
    locale.value === 'en' ? (locale.value = 'ar') : (locale.value = 'en');
  };

  watch(
    () => locale.value,
    (val) => {
      locale.value.includes('ar') ? (document.dir = 'rtl') : (document.dir = 'ltr');
    }
  );
</script>
