<template>
  <div class="flex flex-wrap gap-2">
    <UButton :variant="locale.includes('en') ? 'solid' : 'soft'" @click="switchLocale">
      English
    </UButton>
    <UButton :variant="locale.includes('ar') ? 'solid' : 'soft'" @click="switchLocale">
      العربية
    </UButton>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps<{
    locale: string;
  }>();
  const emit = defineEmits<{
    (e: 'locale-updated', newLocale: string): void;
  }>();

  const switchLocale = () => {
    const newLocale: string = props.locale === 'en' ? 'ar' : 'en';
    emit('locale-updated', newLocale);
  };
</script>
