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
      <div class="flex justify-center gap-2 mt-6">
        <!-- Juzs or chapters -->
        <UButton
          v-for="(btn, i) in buttons"
          :key="btn"
          :variant="i === activeButton ? 'solid' : 'soft'"
          class="px-5"
          @click="setActiveButton(i)"
        >
          {{ btn }}
          <!-- TODO: Add Gsap -->
        </UButton>
      </div>
      <div class="w-full">
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
      </div>
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
            class="cursor-pointer select-none sm:hover:scale-110 w-full h-full duration-300"
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
    </div>
  </div>
</template>

<script setup lang="ts">
  const { locale } = useI18n();
  const getJuzs = () => {
    const { fetchJuzs } = useFetchApis();

    try {
      const juzs = fetchJuzs();

      return juzs;
    } catch (error) {
      Debug.error({
        message: 'Error while fetching Juzs',
        data: error,
      });

      throw createError({
        statusCode: 500,
        statusMessage: 'Error while fetching Juzs',
      });
    }
  };

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

  const buttons = ['Juzs', 'Chapters'];
  const activeButton = ref(0);
  const setActiveButton = (index: number) => {
    activeButton.value = index;
  };

  // get page data
  const [juzs, chapters] = await Promise.all([getJuzs(), getChapters()]);
</script>
