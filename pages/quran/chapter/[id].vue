<template>
  <div>
    <!-- TODO: Add Gsap -->
    {{ route.params.id }}
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
</script>
