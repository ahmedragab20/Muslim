<template>
  <div class="text-sm text-gray-700 dark:text-gray-200">
    <template v-if="results?.length">
      <div
        v-for="result in results"
        :key="result.verse_id"
        class="font-quranic text-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-transparent p-1 hover:rounded-md duration-300 py-1.5 gap-2 relative cursor-pointer border-b dark:border-gray-800 text-start"
      >
        <div v-html="result?.highlighted || ayah(result?.words)"></div>
        <div class="my-1 font-mono text-sm">
          <div v-html="result?.translations?.[0]?.text"></div>
        </div>
        <div></div>
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

  const ayah = (words: any[]) => {
    console.log('words ran 🎉');

    return words
      .map((word) => {
        if (word.highlight) {
          return `<span class="bg-primary-200 dark:bg-primary-500">${word.text}</span>`;
        }
        return word.text;
      })
      .join(' ');
  };
</script>

<style>
  em {
    @apply bg-primary-200 dark:bg-primary-500;
  }
</style>
