<template>
  <div>
    tafsir page for the chapter:
    {{ route.params.tafsir_chapter_id }}
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
</script>
