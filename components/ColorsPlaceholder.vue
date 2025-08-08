<template>
  <div class="initial:p-1">
    <!-- header -->
    <div class="p-1 rounded-full" :style="`background: ${primaryBg}`"></div>
    <!-- body -->
    <div class="w-10/12 p-1 my-1 rounded-full" :style="`background: ${secondaryBg}`"></div>
    <div class="w-3/4 p-1 rounded-full" :style="`background: ${secondaryBg}`"></div>
    <div class="w-5/6 p-1 my-1 rounded-full" :style="`background: ${secondaryBg}`"></div>
    <!-- footer -->
    <div class="w-1/4 p-1 my-1 rounded-full" :style="`background: ${primaryBg}`"></div>
  </div>
</template>
<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      primaryBg: string;
      secondaryBg: string;
    }>(),
    {
      primaryBg: '#4ade80',
      secondaryBg: '#71717a', //TODO: convert that to tailwind color
    }
  );
</script>
