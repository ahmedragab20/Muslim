<template>
  <div
    :dir="appDir"
    class="overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 dark:bg-gray-900"
  >
    <!-- Header -->
    <div class="flex px-4 py-5 sm:px-6 rtl:justify-start ltr:justify-end">
      <slot name="header"></slot>
    </div>
    <!-- content -->
    <div class="px-4 py-5 sm:p-6">
      <slot />
    </div>
    <!-- Footer -->
    <div class="px-4 py-4 sm:px-6">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  const { appDir } = useAppInfo();

  onMounted(() => {
    console.log(appDir.value);
  });
</script>
