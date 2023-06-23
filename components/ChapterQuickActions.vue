<template>
  <UCard>
    <div>
      <div
        class="flex gap-1 opacity-70 line-clamp-2 text-2xl rtl:text-3xl items-center justify-center flex-col"
        :class="locale === 'ar' ? 'font-quranic text-2xl' : 'font-mono'"
      >
        <div class="text-center" v-if="locale === 'ar'">{{ chapter?.arabicWithTashkeel }}</div>
        <div class="text-center" v-else-if="locale === 'en'">
          {{ chapter?.english }}
        </div>
        <div class="text-sm">{{ chapter.englishTranslated }}</div>
        <div class="text-sm opacity-50">[{{ chapter.number }}]</div>
      </div>
    </div>
    <div class="flex justify-between flex-col gap-1 max-w-sm mx-auto py-4">
      <AudioPlayer
        class="w-full"
        :audio-name="locale === 'ar' ? chapter.arabic : chapter.english"
        :reciter-name="reciterName"
        :full-name="`${reciterName} - ${locale === 'ar' ? chapter.arabic : chapter.english}`"
        :audio-url="audioUrl"
        @audio-toggled="togglePlaying"
      >
      </AudioPlayer>
      <div class="flex justify-center mt-4">
        <UButton
          :to="`/quran/chapter/${chapter.number}`"
          icon="i-heroicons-book-open"
          :ui="{
            rounded: 'rounded-full',
          }"
          class="px-6"
        >
        </UButton>
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

  const { hosari } = useQuranReciters();
  const recitation = hosari(chapter.number);

  const reciterName = computed<string>(() => {
    //@ts-ignore
    return recitation.name?.[lng.value] as string;
  });

  const audioUrl = recitation.url;
  const playing = ref(false);

  const lng = computed<string>(() => {
    return locale.value as string;
  });
  const togglePlaying = (status: boolean) => {
    playing.value = status;
  };
</script>
