<template>
  <!-- The Wrapper of the pages -->
  <div>
    <!-- header -->
    <div class="fixed top-0 w-full left-0 z-50">
      <BaseHeader />
    </div>
    <!-- content -->
    <div class="md:w-[70%] sm:w-11/12 w-full px-3 mx-auto pt-[10vh]">
      <Suspense>
        <NuxtPage />

        <template v-slot:fallback>
          <p>No content found...</p>
        </template>
      </Suspense>
    </div>
  </div>
</template>
<script setup lang="ts">
  //
</script>
