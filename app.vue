<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <div>
      <UButton class="rtl:flex-row-reverse" :dir="locale.includes('ar') ? 'rtl' : 'ltr'">
        <UIcon name="i-heroicons-x-circle"></UIcon>
        <div>
          {{ $t('welcome') }}
        </div>
      </UButton>
      <div>
        <form class="mt-3">
          <select
            class="px-5 py-1 rounded-lg invert cursor-pointer bg-primary-50 dark:bg-primary-900"
            v-model="locale"
          >
            <option value="en-US">en</option>
            <option value="ar-SA">ar</option>
          </select>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const { locale } = useI18n();
  console.log(locale.value);
</script>
