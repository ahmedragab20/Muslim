<template>
  <div class="fixed bottom-0 w-full z-50 p-2 min-h-[230px] shadow-inner sm:p-5 backdrop-blur-lg">
    <div class="flex absolute z-20 inset-0 flex-col items-center justify-center gap-3 py-5">
      <!-- headline -->
      <div class="text-center">
        <h3 class="text-2xl sm:text-3xl font-headline">
          You're using <span class="text-primary-500">guest mode</span>, my friend!!
        </h3>
        <p class="px-5 my-2 sm:text-lg sm:px-0">
          login or register to get the most out of the app. let's go!
        </p>
      </div>
      <!-- actions -->
      <div class="flex gap-2">
        <UButton @click="selectType('login')" size="lg"> Login </UButton>
        <UButton @click="selectType('register')" size="lg" variant="soft"> Register </UButton>
      </div>
    </div>
    <div class="absolute inset-0 z-10 dark:bg-gray-700 bg-gray-100 opacity-50"></div>
  </div>
</template>
<script setup lang="ts">
  const emit = defineEmits<{
    selectType: [type: string];
  }>();

  const selectType = (type: string) => {
    emit('selectType', type);
  };
</script>
