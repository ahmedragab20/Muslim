<template>
  <div>
    <!-- TODO: don't forget to add option to download the surah -->
    {{ route.params.id }}
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
</script>
