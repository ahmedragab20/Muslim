<template>
  <!-- TODO:: add play on the background functionality - with the style you've seen on twitter - like dynamic island -->
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
            <div class="flex gap-2">
              <div>
                <UButton
                  @click="copyToClipboard(result?.text || '')"
                  variant="link"
                  icon="i-heroicons-clipboard"
                />
              </div>
              <div>
                <AudioPlayer
                  :audio-url="audioUrl"
                  @audio-found="foundAudio"
                  @audio-toggled="togglePlaying"
                  :loading="loadingRecitation"
                  :meta-logic="[
                    {
                      fn: recite,
                      args: [result],
                    },
                  ]"
                  :player-info="[
                    {
                      verse_key: result?.verse_key,
                    },
                  ]"
                >
                  <UButton
                    variant="link"
                    :loading="loadingRecitation"
                    :color="
                      playingAyah && playerInfo?.verse_key === result?.verse_key ? 'red' : 'primary'
                    "
                    :icon="
                      playingAyah && playerInfo?.verse_key === result?.verse_key
                        ? 'i-heroicons-pause-circle'
                        : 'i-heroicons-play-circle'
                    "
                  />
                </AudioPlayer>
              </div>
            </div>
            <div>
              <UButton
                v-if="result.verse_id"
                :to="`quran/verse/${result.verse_id}`"
                variant="outline"
                class="px-4 font-mono capitalize"
                :ui="{
                  rounded: 'rounded-full',
                }"
                size="xs"
              >
                {{ $t('quraanSearch.more') }}...
              </UButton>
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
  const audioUrl = ref('');
  const playedAyat = ref<PlayedAyah[]>([]);
  const playingAyah = ref(false);
  const foundAudio = (audio: any) => {
    audioPlayer.value = audio;
  };
  //watch audioPlayer
  const playerInfo = computed(() => {
    return audioPlayer.value?.info?.[0];
  });

  const togglePlaying = (state: boolean) => {
    playingAyah.value = state;
  };

  const recite = async (verse: any) => {
    loadingRecitation.value = true;

    const ayah_key = verse?.verse_key;
    const storedAyah = playedAyat.value.find((ayah) => ayah.ayah_key === ayah_key);
    if (storedAyah) {
      audioUrl.value = storedAyah.audioUrl;
      return;
    }

    const baseURL = 'https://verses.quran.com/';
    const { AYAH_RECITATION_API } = useApis();

    try {
      // Fetch the audio URL for the given ayah_key
      const ayah: any = await $fetch(AYAH_RECITATION_API(ayah_key));

      if (ayah) {
        const key = ayah?.audio_files?.[0]?.url;
        audioUrl.value = `${baseURL}${key}`;
        playedAyat.value.push({
          ayah_key,
          audioUrl: `${baseURL}${key}`,
        });
      }
    } catch (error) {
      // Throw an error if there's an issue getting the audio URL
      throw createError({
        statusCode: 500,
        statusMessage: 'error to get audio url',
      });
    } finally {
      loadingRecitation.value = false;
    }
  };

  onUnmounted(() => {
    audioPlayer.value = null;
    clickedAyah.value = '';
  });
</script>

<style>
  em {
    @apply bg-primary-200 dark:bg-primary-500;
  }
</style>
