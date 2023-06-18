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
      <div class="overflow-hidden border rounded-xl dark:border-gray-800">
        <!-- Header -->
        <div class="p-1 sm:p-2">
          <div class="flex justify-between h-10">
            <div class="flex items-center justify-center w-10 pointer-events-none">
              <div
                class="text-xl text-gray-800 i-heroicons-magnifying-glass-20-solid dark:text-gray-400"
              />
            </div>
            <input
              v-model.trim.lazy="searchQuery"
              type="text"
              class="w-full h-full px-3 font-mono text-gray-800 bg-transparent dark:text-gray-400 sm:text-lg rounded-xl focus:ring-none focus:outline-none"
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
          class="relative px-4 overflow-auto max-h-96"
          :class="results?.length ? 'pt-2' : 'pt-10'"
        >
          <template v-if="(!!results?.length && !loading) || loadingMore">
            <div class="flex gap-1 pb-2 mb-2 border-b dark:border-gray-700">
              <div
                class="px-2 py-1 text-xs text-gray-500 rounded-full pointer-events-none bg-gray-50 dark:bg-gray-800"
              >
                {{ results.length }} {{ results.length > 1 ? $t('base.ayat') : $t('base.ayah') }}
                {{ $t('base.from') }} {{ totalResults }}
                {{ $t('base.ayah') }}
              </div>
            </div>
            <AppSearchResults
              :key="currentPage"
              :results="results"
              :total_pages="totalPages"
              :current_page="currentPage"
              :total_results="totalResults"
            />
            <!-- load more -->
            <div class="flex justify-center pb-2 mt-2">
              <UButton
                v-if="results.length < totalResults"
                color="gray"
                variant="outline"
                :loading="loadingMore"
                class="!font-mono"
                @click="loadMoreAyat"
              >
                {{ $t('base.loadMore') }}...
              </UButton>
            </div>
          </template>
          <template v-else-if="loading && !loadingMore">
            <div class="flex justify-center pb-7 backdrop-blur-md">
              <AppSpinner />
            </div>
          </template>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
  interface ExposedResultsComponent {
    setClickedAyah: (ayah: any) => void;
    audioPlayer: any;
  }

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
  const pageSize = ref(5);
  const loading = ref(false);

  const getQuranByTerm = async () => {
    try {
      loading.value = true;
      const { fetchQuranByTerm } = useFetchApis();

      const res = await fetchQuranByTerm(searchQuery.value, currentPage.value, pageSize.value);

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
  const loadMoreAyat = async () => {
    try {
      loadingMore.value = true;

      if (pageSize.value + 5 >= totalResults.value) {
        pageSize.value = totalResults.value - results.value?.length;
      }

      currentPage.value + 1 >= totalPages.value
        ? currentPage.value + (totalPages.value - currentPage.value)
        : (currentPage.value += 1);

      // pageSize.value + 5 >= totalResults.value
      //   ? pageSize.value + (totalResults.value - pageSize.value)
      //   : (pageSize.value += 5);
      const res = await getQuranByTerm();

      results.value = [...results.value, ...res.results];
      totalResults.value = res.total_results;
      currentPage.value = res.current_page ? res.current_page : 1;
      totalPages.value = res.total_pages;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Something went wrong while loading more ayat',
      });
    } finally {
      loadingMore.value = false;
    }
  };

  const clearSearch = () => {
    searchQuery.value = '';
    results.value = [];
    totalResults.value = 0;
    currentPage.value = 0;
    totalPages.value = 0;
    pageSize.value = 5;
  };

  watch(searchQuery, async (newVal, oldVal) => {
    if (!!newVal && newVal !== oldVal) {
      currentPage.value = 0;
      pageSize.value = 5;

      const res = await getQuranByTerm();
      results.value = res.results;
      totalResults.value = res.total_results;
      currentPage.value = res.current_page ? res.current_page : 1;
      totalPages.value = res.total_pages;
    }
  });
</script>
