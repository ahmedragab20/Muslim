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
          :key="chapter.number"
          class="lg:w-1/5 md:w-1/3 sm:w-1/2 w-full p-1 h-24"
        >
          <A3DCard
            @click="toggleQuickActionsModal(chapter)"
            class="cursor-pointer select-none sm:hover:scale-110 w-full h-full duration-300 active:!scale-95"
            card-class="rounded-lg"
            animation
            no-voided-wrapper
          >
            <div class="flex items-center justify-center w-full h-full">
              <div
                class="flex gap-1 opacity-70 max-w-full truncate items-center justify-center flex-col"
                :class="locale === 'ar' ? 'font-quranic text-2xl' : 'font-mono'"
              >
                <div class="text-center max-w-full truncate" v-if="locale === 'ar'">
                  {{ chapter?.arabicWithTashkeel }}
                </div>
                <div class="text-center max-w-full truncate" v-else-if="locale === 'en'">
                  {{ chapter.english }}
                </div>
                <div class="text-sm max-w-full truncate">
                  {{ chapter.englishTranslated }}
                </div>
                <div class="text-sm max-w-full truncate">[{{ chapter.number }}]</div>
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
    </div>
  </div>

  <!-- Modals -->
  <UModal v-model="quickActionsModal">
    <ChapterQuickActions v-if="!!clickedChapter" :chapter="clickedChapter!" />
  </UModal>
</template>

<script setup lang="ts">
  import { Chapter } from '~/types/server-schemas/Chapter';

  const { locale } = useI18n();
  const router = useRouter();

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

  const quickActionsModal = ref(false);
  const clickedChapter = ref<Chapter | null>();
  const toggleQuickActionsModal = (chapter: Chapter) => {
    if (!chapter) return;

    clickedChapter.value = chapter;
    quickActionsModal.value = !quickActionsModal.value;
  };
  // get page data
  const [chapters] = await Promise.all([getChapters()]);
</script>
