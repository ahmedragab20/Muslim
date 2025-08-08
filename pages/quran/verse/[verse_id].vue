<template>
  <div class="flex min-h-[75dvh] justify-center items-center">
    <div class="text-center">
      verse_id:
      {{ route.params.verse_id }}
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
</script>
