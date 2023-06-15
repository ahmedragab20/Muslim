<template>
  <div v-if="!pending">
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
              v-model.trim="searchQuery"
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
  <div v-else>
    <div class="flex justify-center items-center h-10">
      <AppSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
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

  const { data: results, pending } = await useFetch('/api/quran/الله');
</script>
