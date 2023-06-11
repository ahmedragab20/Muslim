<template>
  <div
    class="initial:w-full initial:h-px initial:bg-slate-100 initial:dark:bg-slate-800"
    :class="props.classes"
  ></div>
</template>
<script setup lang="ts">
  const props = defineProps<{
    classes?: string;
  }>();
</script>
