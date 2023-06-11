<template>
  <div
    class="initial:w-full initial:h-px initial:bg-gray-50 initial:dark:bg-gray-900"
    :class="props.classes"
  ></div>
</template>
<script setup lang="ts">
  const props = defineProps<{
    classes?: string;
  }>();
</script>
