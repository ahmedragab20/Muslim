<template>
  <div>
    <AppSearchInput @clicked="toggleSearchModal" />

    <UModal
      dir="auto"
      v-model="searchModal"
      :ui="{
        rounded: 'rounded-xl',
        width: 'w-11/12 sm:w-3/4 lg:w-1/2',
      }"
    >
      <div class="rounded-xl overflow-hidden border dark:border-gray-800">
        <!-- Header -->
        <div class="p-1 sm:p-2">
          <div class="h-10 justify-between flex">
            <div class="flex items-center pointer-events-none justify-center w-10">
              <div
                class="i-heroicons-magnifying-glass-20-solid text-xl text-gray-800 dark:text-gray-400"
              />
            </div>
            <input
              v-model.trim.lazy="searchQuery"
              type="text"
              class="bg-transparent w-full text-gray-800 font-mono dark:text-gray-400 sm:text-lg rounded-xl h-full focus:ring-none focus:outline-none px-3"
              :placeholder="$t('quraanSearch.search')"
              ref="searchInputR"
            />
            <div class="flex items-center justify-center w-10">
              <UButton
                v-if="searchQuery !== ''"
                color="red"
                variant="link"
                icon="i-heroicons-x-mark-20-solid"
                :padded="false"
                @click="clearSearch"
              />
            </div>
          </div>
        </div>

        <div
          class="px-4 max-h-96 overflow-auto relative"
          :class="results?.length ? 'pt-2' : 'pt-10'"
        >
          <template v-if="!!results?.length && !loading">
            <div class="mb-2 border-b dark:border-gray-700 flex gap-1 pb-2">
              <div
                class="text-xs bg-gray-50 dark:bg-gray-800 text-gray-500 py-1 px-2 rounded-full pointer-events-none"
              >
                {{ results.length }} {{ results.length > 1 ? $t('base.ayat') : $t('base.ayah') }}
                {{ $t('base.from') }} {{ totalResults }}
                {{ totalResults > 1 ? $t('base.ayat') : $t('base.ayah') }}
              </div>
            </div>
            <AppSearchResults
              :results="results"
              :total_pages="totalPages"
              :current_page="currentPage"
              :total_results="totalResults"
            />
            <!-- load more -->
            <div class="flex justify-center mt-2 pb-2">
              <UButton
                v-if="currentPage < totalPages"
                color="gray"
                variant="soft"
                :loading="loading"
              >
                {{ $t('base.loadMore') }}...
              </UButton>
            </div>
          </template>
          <template v-else-if="loading">
            <div class="flex justify-center pb-7 absolute inset-0 backdrop-blur-md">
              <AppSpinner />
            </div>
          </template>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
  // import { searchQuranSchema } from '@/schemas/search-quran';

  const searchInputR = ref();
  const searchModal = ref(false);

  const toggleSearchModal = () => {
    searchModal.value = !searchModal.value;

    nextTick(() => {
      if (searchModal.value) {
        (searchInputR.value as HTMLInputElement).focus();
      }
    });
  };

  const searchQuery = ref('');
  const results = ref();
  const totalResults = ref(0);
  const currentPage = ref(1);
  const totalPages = ref(0);
  const loading = ref(false);
  const getQuranByTerm = async () => {
    try {
      loading.value = true;
      const { fetchQuranByTerm } = useFetchApis();

      const res = await fetchQuranByTerm(searchQuery.value);

      return res;
    } catch (error) {
      Debug.error({
        message: 'Error while fetching hijri date',
        data: error,
      });

      throw createError({
        statusCode: 500,
        statusMessage: 'Error while fetching hijri date',
      });
    } finally {
      loading.value = false;
    }
  };
  const loadingMore = ref(false);
  const loadMoreAyat = async () => {};

  const clearSearch = () => {
    searchQuery.value = '';
    results.value = [];
    totalResults.value = 0;
    currentPage.value = 1;
    totalPages.value = 0;
  };

  watch(searchQuery, async (newVal, oldVal) => {
    if (!!newVal && newVal !== oldVal) {
      const res = await getQuranByTerm();

      results.value = res.results;
      totalResults.value = res.total_results;
      currentPage.value = res.current_page;
      totalPages.value = res.total_pages;
    }
  });
</script>
