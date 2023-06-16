<template>
  <div class="min-h-[75dvh]">
    <div class="mb-10 font-mono text-2xl text-center text-gray-800 capitalize dark:text-gray-400">
      {{ $t('sectionsList.quraan') }}
    </div>
    <div>
      <AppSearchWrapper />
    </div>
    <div class="flex justify-center gap-2 flex-wrap mt-6">
      <div
        v-for="juz in juzs"
        :key="juz.id"
        class="flex items-center justify-center w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-900 shadow shadow-red-200 duration-300 hover:blur-lg"
      >
        Juz {{ juz.juz_number }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
