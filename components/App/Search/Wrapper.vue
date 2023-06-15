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
                @click="searchQuery = ''"
              />
            </div>
          </div>
        </div>

        <div class="pt-10">
          <AppSearchResults />
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
  // const results = ref();
  // const totalResults = ref(0);
  // const currentPage = ref(1);
  // const totalPages = ref(0);

  const searchQuran = async () => {
    //     const { data } = await useFetch(`/api/quran/${searchQuery.value}`, {
    //       transform: searchQuranSchema.parse(data),
    //     });
    //
    //     results.value = data.value;
    //     totalResults.value = data;
  };

  watch(searchQuery, () => {
    if (searchQuery.value.length > 2) {
      searchQuran();
    }
  });
</script>
