<template>
  <div>
    <!-- app story -->
    <div class="flex h-[75dvh] flex-col items-center justify-center">
      <div
        class="relative flex h-32 w-32 rounded-full bg-gray-50 dark:bg-gray-900 shadow shadow-red-200 duration-300 hover:blur-lg"
      >
        <div class="absolute inset-0 flex items-center justify-center text-xl"></div>
        <div
          class="absolute rtl:right-0 ltr:left-0 h-full w-1/2 rounded-s-full bg-gray-600 dark:bg-gray-900 shadow-2xl shadow-primary-600 backdrop- duration-300 hover:opacity-50"
        ></div>
        <div
          class="absolute ltr:right-0 rtl:left-0 h-full w-1/2 rounded-e-full bg-gray-600 dark:bg-gray-900 shadow-2xl shadow-red-600 backdrop-blur-lg duration-300 hover:opacity-50"
        ></div>
      </div>

      <div class="flex justify-center items-center flex-col">
        <h2 class="mt-16 font-mono text-4xl opacity-30">
          {{ $t('base.appTitle') }}
        </h2>
        <p class="max-w-2xl p-5 text-center font-mono">
          {{ $t('base.introAyah') }}
        </p>
        <p class="font-mono opacity-30">
          {{ $t('base.introAyahNumber') }}
        </p>
      </div>

      <div class="mt-10">
        <UButton :label="`${$t('explore')} ${$t('sections')}`" icon="i-heroicons-rectangle-stack" />
      </div>
    </div>
  </div>
</template>
