<template>
  <div class="text-sm text-gray-700 dark:text-gray-200">
    <template v-if="results?.length">
      <div
        v-for="(result, i) in results"
        :key="i"
        class="flex justify-between select-none items-center hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-transparent p-1 hover:rounded-md duration-300 py-1.5 gap-2 relative cursor-pointer border-b dark:border-gray-800 text-start"
      >
        {{ result?.text }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  const {} = defineProps<{
    results: any[];
    total_pages: number;
    current_page: number;
    total_results: number;
  }>();
</script>
