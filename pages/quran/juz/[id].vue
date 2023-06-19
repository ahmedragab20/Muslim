<template>
  <div>
    <h1>Juz {{ route.params.id }}</h1>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();

  definePageMeta({
    middleware: [
      function (to, from) {
        return '/quran';
      },
    ],
  });
</script>
