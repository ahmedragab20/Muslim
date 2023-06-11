<template>
  <div class="initial:p-1">
    <!-- header -->
    <div class="p-1 rounded-full" :class="primaryBg"></div>
    <!-- body -->
    <div class="p-1 rounded-full w-10/12 my-1" :style="`background: ${secondaryBg}`"></div>
    <div class="p-1 rounded-full w-3/4" :style="`background: ${secondaryBg}`"></div>
    <div class="p-1 rounded-full w-5/6 my-1" :style="`background: ${secondaryBg}`"></div>
    <!-- footer -->
    <div class="p-1 rounded-full w-1/4 my-1" :class="primaryBg"></div>
  </div>
</template>
<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      primaryBg: string;
      secondaryBg: string;
    }>(),
    {
      primaryBg: 'bg-primary-500',
      secondaryBg: '#71717a', //TODO: convert that to tailwind color
    }
  );
</script>
