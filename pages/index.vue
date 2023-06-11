<template>
  <div>
    <!-- landing screen -->
    <div>
      <!-- app story -->
      <div>
        <h2 class="text-center text-gray-700 dark:text-gray-300">
          {{ $t('base.appStory') }}
        </h2>
      </div>
      <div class="text-center bg-gray-50 p-3 rounded-lg dark:bg-gray-900">
        <h2
          class="text-xl sm:text-2xl text-gray-700 dark:text-gray-300"
          :class="{ 'font-quranic': locale === 'ar' }"
        >
          {{ $t('base.introAyah') }}
        </h2>
        <div class="mt-4 text-gray-400">
          {{ $t('base.introAyahNumber') }}
        </div>
      </div>
    </div>
    <AppDivider classes="my-10" />
    <div>
      <h3 class="text-xl text-center capitalize text-primary-500">
        {{ $t('tools') }}
      </h3>
      <p class="text-center">
        {{ $t('toolsDescription') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { locale } = useI18n();
</script>
