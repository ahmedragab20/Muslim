<template>
  <div @click.capture="onClick">
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
        <UKbd>{{ metaSymbol }}</UKbd>
        <UKbd>K</UKbd>
      </template>
    </UInput>
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
