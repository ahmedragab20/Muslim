<template>
  <div class="text-sm text-gray-700 dark:text-gray-200">
    <template v-if="results?.length">
      <div
        v-for="result in results"
        :key="result.verse_id"
        class="h-auto hover:bg-gray-50 select-none dark:hover:bg-gray-800 hover:border-transparent p-1 hover:rounded-md duration-300 py-1.5 gap-2 relative cursor-pointer border-b dark:border-gray-800"
      >
        <div @click="setClickedAyah(result?.verse_key)" class="font-quranic text-lg text-start">
          <div v-html="result?.highlighted || ayah(result?.words)"></div>
          <div class="my-1 font-mono text-sm">
            <div v-html="result?.translations?.[0]?.text"></div>
          </div>
        </div>

        <div :class="clickedAyah === result?.verse_key ? 'h-auto scale-100' : ' scale-y-0 h-0'">
          <div
            @click.self="setClickedAyah(result?.verse_key)"
            class="flex justify-between items-center flex-wrap gap-1"
          >
            <div>
              <UButton
                @click="copyToClipboard(result?.text || '')"
                variant="link"
                icon="i-heroicons-clipboard"
              />
            </div>
            <div>
              <UButton
                @click="recite(result?.verse_key)"
                :loading="loadingRecitation"
                variant="link"
                :color="audioPlayer?.isPlaying ? 'red' : 'primary'"
                :icon="
                  audioPlayer?.isPlaying ? 'i-heroicons-pause-circle' : 'i-heroicons-play-circle'
                "
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  interface PlayedAyah {
    ayah_key: string;
    audioUrl: string;
  }

  // TODOs:
  // 1. copy ✅
  // 2. recite play+pause
  // 3. see more
  const toast = useToast();
  const { t } = useI18n();

  const {} = defineProps<{
    results: any[];
    total_pages: number;
    current_page: number;
    total_results: number;
  }>();
  const clickedAyah = ref('');
  const setClickedAyah = (ayah: string) => {
    if (ayah === clickedAyah.value) {
      clickedAyah.value = '';
      return;
    }

    clickedAyah.value = ayah;
  };

  const ayah = (words: any[]) => {
    return words
      .map((word) => {
        if (word.highlight) {
          return `<span class="bg-primary-200 dark:bg-primary-500">${word.text}</span>`;
        }
        return word.text;
      })
      .join(' ');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await Generics.copyToClipboard(text).then(() => {
        toast.add({
          title: t('quraanSearch.copiedAya'),
          description: t('quraanSearch.copiedAyaDesc'),
        });
      });
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'error to copy text',
      });
    }
  };
  const audioPlayer = ref();
  const loadingRecitation = ref(false);

  const playedAyat = ref<PlayedAyah[]>([]);
  const recite = async (ayah_key: string) => {
    const isAlreadyPlayed = playedAyat.value.find((ayah) => ayah.ayah_key === ayah_key);
    if (!!isAlreadyPlayed) {
      if (audioPlayer.value.isPlaying) {
        audioPlayer.value.pause();
      } else {
        audioPlayer.value.play();
      }

      // has a bug when you move around the ayat

      return;
    }
    loadingRecitation.value = true;
    const baseURL = 'https://verses.quran.com/';
    const { AYAH_RECITATION_API } = useApis();
    let audioUrl: string;

    try {
      const ayah: any = await $fetch(AYAH_RECITATION_API(ayah_key));
      if (ayah) {
        const key = ayah?.audio_files?.[0]?.url;
        audioUrl = `${baseURL}${key}`;

        audioPlayer.value = new AudioPlayer(audioUrl);

        playedAyat.value.push({
          ayah_key,
          audioUrl,
        });

        audioPlayer.value.play();

        audioPlayer.value.onEnded();

        // TODO: cache the ones you played in an array and check if it's already played before you call the api again
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'error to get audio url',
      });
    } finally {
      loadingRecitation.value = false;
    }
  };
</script>

<style>
  em {
    @apply bg-primary-200 dark:bg-primary-500;
  }
</style>
