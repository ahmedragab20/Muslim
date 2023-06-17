<template>
  <UCard>
    <div>
      <div
        class="flex gap-1 opacity-70 line-clamp-2 items-center justify-center flex-col"
        :class="locale === 'ar' ? 'font-quranic text-2xl' : 'font-mono'"
      >
        <div class="text-center" v-if="locale === 'ar'">{{ chapter?.name_arabic }}</div>
        <div class="text-center" v-else-if="locale === 'en'">
          {{ chapter?.translated_name?.name }}
        </div>
        <div class="text-sm">[{{ chapter.id }}]</div>
      </div>
    </div>
    <div class="flex justify-between max-w-sm mx-auto py-4">
      <div>
        <UButton tabindex="-1" block> Listen </UButton>
      </div>

      <div>
        <UButton tabindex="-1" block> More </UButton>
      </div>

      <div>
        <UButton tabindex="-1" block> Tafsir </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
  import { Chapter } from '~/types/server-schemas/Chapter';
  const { chapter } = defineProps<{
    chapter: Chapter;
  }>();

  const { locale } = useI18n();
</script>
