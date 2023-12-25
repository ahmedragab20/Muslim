<template>
  <div class="relative overflow-hidden">
    <UInput
      class="!cursor-pointer hover:!opacity-90 font-mono text-center duration-300"
      icon="i-heroicons-magnifying-glass-20-solid"
      color="gray"
      variant="outline"
      :placeholder="$t('quraanSearch.search')"
      size="lg"
      disabled
    >
      <template #trailing>
        <div class="hidden md:flex">
          <UKbd>{{ metaSymbol }}</UKbd>
          <UKbd>K</UKbd>
        </div>
      </template>
    </UInput>
    <div class="absolute inset-0 cursor-pointer" @click="onClick"></div>
  </div>
</template>

<script setup lang="ts">
  const { metaSymbol } = useShortcuts();
  const emit = defineEmits<{
    clicked: [state: boolean];
  }>();

  const onClick = () => {
    emit('clicked', true);
  };

  defineShortcuts({
    meta_K: {
      usingInput: true,
      handler: () => onClick(),
    },
  });
</script>
