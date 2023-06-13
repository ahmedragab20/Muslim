<template>
  <div class="max-w-lg flex flex-wrap">
    <div
      class="cursor-pointer hover:bg-primary-50 active:scale-90 dark:hover:bg-gray-800 w-1/2 h-32 border dark:border-gray-800 rounded-md flex justify-center items-center duration-300 hover:border-transparent"
    >
      <div>
        <img src="/visuals/quran.svg" alt="not found" class="w-10 dark:invert" />
      </div>

      <h4 class="text-lg uppercase font-mono">
        {{ $t('sectionsList.quraan') }}
      </h4>
    </div>
    <div
      class="cursor-pointer hover:bg-primary-50 active:scale-90 dark:hover:bg-gray-800 w-1/2 h-32 border dark:border-gray-800 rounded-md flex justify-center items-center duration-300 hover:border-transparent"
    >
      <div>
        <img src="/visuals/matt.svg" alt="not found" class="w-10 dark:invert" />
      </div>

      <h4 class="text-lg uppercase font-mono">
        {{ $t('sectionsList.duaa') }}
      </h4>
    </div>
    <div
      class="cursor-pointer hover:bg-primary-50 active:scale-90 dark:hover:bg-gray-800 w-1/2 h-32 border dark:border-gray-800 rounded-md flex justify-center items-center duration-300 hover:border-transparent"
    >
      <div>
        <img src="/visuals/azkar.svg" alt="not found" class="w-10 dark:invert" />
      </div>

      <h4 class="text-lg uppercase font-mono">
        {{ $t('sectionsList.azkaar') }}
      </h4>
    </div>
    <div
      class="cursor-pointer hover:bg-primary-50 active:scale-90 dark:hover:bg-gray-800 w-1/2 h-32 border dark:border-gray-800 rounded-md flex justify-center items-center duration-300 hover:border-transparent"
    >
      <h4 class="text-lg uppercase font-mono">
        {{ $t('sectionsList.nation') }}
      </h4>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
