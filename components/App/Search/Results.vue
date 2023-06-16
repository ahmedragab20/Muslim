<template>
  <div class="text-sm text-gray-700 dark:text-gray-200">
    <template v-if="results?.length">
      <div
        v-for="result in results"
        :key="result.verse_id"
        class="h-auto hover:bg-gray-50 select-none dark:hover:bg-gray-800 hover:border-transparent p-1 hover:rounded-md duration-300 py-1.5 gap-2 relative cursor-pointer border-b dark:border-gray-800"
      >
        <div @click="setClickedAyah(result?.verse_key)" class="font-quranic text-lg text-start">
          <div v-html="result?.highlighted || ayah(result?.words)"></div>
          <div class="my-1 font-mono text-sm">
            <div v-html="result?.translations?.[0]?.text"></div>
          </div>
        </div>

        <div :class="clickedAyah === result?.verse_key ? 'h-auto scale-100' : ' scale-y-0 h-0'">
          <div
            @click.self="setClickedAyah(result?.verse_key)"
            class="flex justify-between items-center flex-wrap gap-1"
          >
            <div>
              <UButton
                @click="copyToClipboard(result?.text || '')"
                variant="link"
                icon="i-heroicons-clipboard"
              />
            </div>
            <div>
              <UButton variant="link" icon="i-heroicons-play" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  // TODOs:
  // 1. copy ✅
  // 2. recite play+pause
  // 3. see more
  const toast = useToast();

  const {} = defineProps<{
    results: any[];
    total_pages: number;
    current_page: number;
    total_results: number;
  }>();
  const clickedAyah = ref('');
  const setClickedAyah = (ayah: string) => {
    if (ayah === clickedAyah.value) {
      clickedAyah.value = '';
      return;
    }

    clickedAyah.value = ayah;
  };

  const ayah = (words: any[]) => {
    return words
      .map((word) => {
        if (word.highlight) {
          return `<span class="bg-primary-200 dark:bg-primary-500">${word.text}</span>`;
        }
        return word.text;
      })
      .join(' ');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await Generics.copyToClipboard(text).then(() => {
        toast.add({
          title: 'Ayah has been copied to your clipboard!',
          description: 'You can paste it anywhere you want.🎉',
        });
      });
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'error to copy text',
      });
    }
  };
</script>

<style>
  em {
    @apply bg-primary-200 dark:bg-primary-500;
  }
</style>
