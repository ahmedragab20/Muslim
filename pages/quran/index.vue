<template>
  <div class="min-h-[75dvh]">
    <div class="mb-10">
      <div class="font-mono text-2xl text-center text-gray-800 capitalize dark:text-gray-400">
        {{ $t('sectionsList.quraan') }}
      </div>
    </div>
    <div>
      <AppSearchWrapper />
    </div>
    <div>
      <div v-if="chapters?.length" class="w-full flex justify-center flex-wrap mt-6">
        <div
          v-for="chapter in chapters"
          :key="chapter.id"
          class="lg:w-1/5 md:w-1/3 sm:w-1/2 w-full p-1 h-24"
        >
          <A3DCard
            @click="toggleQuickActionsModal(chapter)"
            class="cursor-pointer select-none sm:hover:scale-110 w-full h-full duration-300 active:!scale-95"
          >
            <div class="flex items-center justify-center w-full h-full">
              <div
                class="flex gap-1 opacity-70 max-w-full truncate items-center justify-center flex-col"
                :class="locale === 'ar' ? 'font-quranic text-2xl' : 'font-mono'"
              >
                <div class="text-center" v-if="locale === 'ar'">{{ chapter?.name_arabic }}</div>
                <div class="text-center" v-else-if="locale === 'en'">
                  {{ chapter?.translated_name?.name }}
                </div>
                <div class="text-sm">
                  {{ chapter.name_simple }}
                </div>
                <div class="text-sm">[{{ chapter.id }}]</div>
              </div>
            </div>
          </A3DCard>
        </div>
      </div>
      <div v-else>
        <div class="flex justify-center items-center h-24">
          <AppSpinner />
        </div>
      </div>

      <!-- We will not use Juzs for now, until we find a better api to get the chapters for specific juz'
       <div class="flex justify-center gap-2 mt-6">
        <UButton
          v-for="(btn, i) in buttons"
          :key="btn"
          :variant="i === activeButton ? 'solid' : 'soft'"
          class="px-5 font-mono font-semibold"
          @click="setActiveButton(i)"
        >
          {{ $t(btn) }}
        </UButton>
        </div>

        <div class="w-full">
        <Transition name="slide-fade">
          <div
            v-if="juzs?.length && activeButton === 0"
            class="w-full flex justify-center flex-wrap mt-6"
          >
            <div v-for="juz in juzs" :key="juz.id" class="lg:w-1/4 md:w-1/3 sm:1/2 w-full p-1 h-20">
              <A3DCard
                :to="`quran/juz/${juz.id}`"
                class="cursor-pointer select-none sm:hover:scale-110 w-full h-full duration-300"
              >
                <div class="flex items-center justify-center w-full h-full">
                  <div
                    class="flex gap-1 opacity-70"
                    :class="locale === 'ar' ? 'font-quranic text-2xl' : 'font-mono'"
                  >
                    <div>
                      {{ $t('juz') }}
                    </div>
                    <div class="text-sm">[{{ juz.id }}]</div>
                  </div>
                </div>
              </A3DCard>
            </div>
          </div>
        </Transition>
      </div>
      <Transition name="slideIn-fade">
        <div
          v-if="chapters?.length && activeButton === 1"
          class="w-full flex justify-center flex-wrap mt-6"
        >
          <div
            v-for="chapter in chapters"
            :key="chapter.id"
            class="lg:w-1/4 md:w-1/3 sm:1/2 w-full p-1 h-20"
          >
            <A3DCard
              :to="`quran/chapter/${chapter.id}`"
              class="cursor-pointer select-none sm:hover:scale-110 w-full h-full duration-300 active:!scale-95"
            >
              <div class="flex items-center justify-center w-full h-full">
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
            </A3DCard>
          </div>
        </div>
      </Transition>
    --></div>
  </div>

  <!-- Modals -->
  <UModal v-model="quickActionsModal">
    <ChapterQuickActions
      v-if="!!clickedChapter"
      :chapter="clickedChapter!"
      :loading-chapter-recitation="loadingChapterRecitation"
      :reciting="recitingChapter"
      :downloading="downloadingChapter"
      :downloaded="downloadedChapter"
      v-model:playing="playingChapter"
      @clicked-more="clickedMore"
      @clicked-download="clickedDownload"
    />
  </UModal>
</template>

<script setup lang="ts">
  import { Chapter } from '~/types/server-schemas/Chapter';

  const { locale } = useI18n();

  // we will not use Juzs for now, until we find a better api to get the chapters for specific juz'
  //   const getJuzs = () => {
  //     const { fetchJuzs } = useFetchApis();
  //
  //     try {
  //       const juzs = fetchJuzs();
  //
  //       return juzs;
  //     } catch (error) {
  //       Debug.error({
  //         message: 'Error while fetching Juzs',
  //         data: error,
  //       });
  //
  //       throw createError({
  //         statusCode: 500,
  //         statusMessage: 'Error while fetching Juzs',
  //       });
  //     }
  //   };

  const getChapters = () => {
    const { fetchChapters } = useFetchApis();

    try {
      const chapters = fetchChapters();

      return chapters;
    } catch (error) {
      Debug.error({
        message: 'Error while fetching Chapters',
        data: error,
      });

      throw createError({
        statusCode: 500,
        statusMessage: 'Error while fetching Chapters',
      });
    }
  };

  // const buttons = ['juzs', 'chapters'];
  // const activeButton = useState('active-button', () => 0);
  // const setActiveButton = (index: number) => {
  //   activeButton.value = index;
  // };

  const quickActionsModal = ref(false);
  const clickedChapter = ref<Chapter | null>();
  const toggleQuickActionsModal = (chapter: Chapter) => {
    if (!chapter) return;

    clickedChapter.value = chapter;
    quickActionsModal.value = !quickActionsModal.value;
  };

  watch(
    () => quickActionsModal.value,
    (value) => {
      if (!value) {
        chapterRecitationAudio.value?.pause();
        clickedChapter.value = null;
        loadingChapterRecitation.value = false;
        chapterRecitationAudio.value = null;
        playingChapter.value = false;
      }
    }
  );
  const { CHAPTER_RECITATION_API } = useApis();
  const playingChapter = ref(false);
  const loadingChapterRecitation = ref(false);
  const chapterRecitationAudio = ref();
  const chapterAudios = ref<any>([]);
  const chapterRecitation = computed<string>(
    () =>
      chapterAudios.value?.audio_files?.find(
        (audio: any) => audio.chapter_id === clickedChapter.value?.id
      )?.audio_url
  );
  const reciteChapter = async () => {
    try {
      if (!clickedChapter.value) return;
      loadingChapterRecitation.value = true;

      chapterAudios.value = await $fetch(CHAPTER_RECITATION_API(clickedChapter.value.id));
      if (chapterAudios.value?.audio_files?.length) {
        const audio = new AudioPlayer(chapterRecitation.value);
        chapterRecitationAudio.value = audio;

        chapterRecitationAudio.value.play();
        chapterRecitationAudio.value.onEnded();
      }
    } catch (error) {
      createError({
        statusCode: 500,
        statusMessage: 'Error while reciting Chapter',
      });
    } finally {
      loadingChapterRecitation.value = false;
    }
  };

  const recitingChapter = computed(() => {
    return chapterRecitationAudio.value?.isPlaying;
  });

  watch(
    () => playingChapter.value,
    (value, oldV) => {
      if (value && !oldV) {
        if (!chapterRecitationAudio.value) {
          reciteChapter();
        } else {
          chapterRecitationAudio.value?.play?.();
        }
      } else {
        chapterRecitationAudio.value?.pause?.();
      }
    }
  );

  const clickedMore = (state: boolean) => {
    Debug.log({
      message: 'Clicked More🚀',
      data: state,
    });
  };
  const clickedTafsir = (state: boolean) => {
    Debug.log({
      message: 'Clicked Tafsir🚀',
      data: state,
    });
  };
  const downloadingChapter = ref(false);
  const downloadedChapter = ref(false);
  const clickedDownload = async () => {
    Debug.log({
      message: 'Clicked Download🚀',
    });

    try {
      downloadingChapter.value = true;
      if (!chapterRecitation.value) {
        chapterAudios.value = await $fetch(CHAPTER_RECITATION_API(clickedChapter.value!.id));
      }

      await Generics.downloadFile(chapterRecitation.value)
        .then(() => {
          downloadedChapter.value = true;
        })
        .catch((error) => console.error('Error downloading file:', error));
    } catch (error) {
      Debug.error({
        message: 'Error while downloading Chapter',
        data: error,
      });

      createError({
        statusCode: 500,
        statusMessage: 'Error while downloading Chapter',
      });
    } finally {
      downloadingChapter.value = false;
      setTimeout(() => {
        downloadedChapter.value = false;
      }, 5000);
    }
  };

  // get page data
  const [chapters] = await Promise.all([getChapters()]);
</script>
