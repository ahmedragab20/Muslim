<template>
  <div class="min-h-[75dvh]">
    <div class="mb-10 font-mono text-2xl text-center text-gray-800 capitalize dark:text-gray-400">
      {{ $t('sectionsList.quraan') }}
    </div>
    <div>
      <AppSearchWrapper />
    </div>
    <div class="flex justify-center flex-wrap mt-6 w-full">
      <div v-for="juz in juzs" :key="juz.id" class="lg:w-1/4 md:w-1/3 sm:1/2 w-full p-1 h-20">
        <A3DCard class="cursor-pointer sm:hover:scale-110 w-full h-full duration-300">
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

  // get page data
  const [juzs] = await Promise.all([getJuzs()]);
</script>
