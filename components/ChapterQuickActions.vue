<template>
  <UCard>
    <div>
      <div
        class="flex gap-1 opacity-70 line-clamp-2 text-2xl rtl:text-3xl items-center justify-center flex-col"
        :class="locale === 'ar' ? 'font-quranic text-2xl' : 'font-mono'"
      >
        <div class="text-center" v-if="locale === 'ar'">{{ chapter?.name_arabic }}</div>
        <div class="text-center" v-else-if="locale === 'en'">
          {{ chapter?.translated_name?.name }}
        </div>
        <div class="text-sm">{{ chapter.name_simple }}</div>
        <div class="text-sm opacity-50">[{{ chapter.id }}]</div>
      </div>
    </div>
    <div class="flex justify-evenly gap-1 max-w-sm mx-auto py-4">
      <div>
        <UButton
          tabindex="-1"
          variant="soft"
          :color="reciting ? 'red' : 'primary'"
          class="px-5"
          :ui="{
            rounded: 'rounded-full',
          }"
          :icon="reciting ? 'i-heroicons-pause-circle' : 'i-heroicons-play-circle'"
          @click="emit('update:playing', !playing)"
          :loading="loadingChapterRecitation"
        >
        </UButton>
      </div>
      <div>
        <UButton
          tabindex="-1"
          variant="soft"
          class="px-5"
          icon="i-heroicons-book-open"
          :ui="{
            rounded: 'rounded-full',
          }"
          @click="emit('clicked-tafsir', true)"
        >
          {{ $t('tafsir') }}
        </UButton>
      </div>

      <div>
        <UButton
          tabindex="-1"
          variant="outline"
          class="px-5 font-mono capitalize"
          :ui="{
            rounded: 'rounded-full',
          }"
          @click="emit('clicked-more', true)"
        >
          {{ $t('quraanSearch.more') }}...
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
  import { Chapter } from '~/types/server-schemas/Chapter';
  const { chapter } = defineProps<{
    chapter: Chapter;
    playing: boolean;
    reciting?: boolean;
    loadingChapterRecitation: boolean;
  }>();
  const emit = defineEmits<{
    'clicked-tafsir': [state: boolean];
    'clicked-play': [state: boolean];
    'clicked-more': [state: boolean];
    'update:playing': [state: boolean];
  }>();

  const { locale } = useI18n();
</script>
