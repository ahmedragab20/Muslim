<template>
  <div class="flex justify-between w-full min-h-[8vh] backdrop-blur-md px-1 sm:px-0 z-[1000]">
    <!-- settings -->
    <div class="w-[15%] min-h-full flex justify-center items-center px-1 py-1 sm:px-1">
      <UTooltip text="app settings" :shortcuts="[metaSymbol, '.']">
        <UButton
          @click="settingsToggler"
          icon="i-heroicons-cog"
          variant="soft"
          :ui="presetButton"
        />
      </UTooltip>
    </div>
    <!-- Logo -->
    <div class="w-[70%] flex justify-center items-center py-1">
      <NuxtLink to="/" class="text-2xl rtl:text-3xl font-quranic">
        <span class="text-primary-500">
          {{ $t('base.appTitle') }}
        </span>
      </NuxtLink>
    </div>
    <!-- menu -->
    <div class="w-[15%] flex justify-center items-center min-h-full py-1 px-1 sm:px-4">
      <BaseLinks />
    </div>
  </div>
  <!-- settings modal -->
  <UModal v-model="settingsModal" name="settingsModal">
    <BaseSettings @close="onSettingsClose" />
  </UModal>
</template>
<script setup lang="ts">
  const { t } = useI18n();
  const { metaSymbol } = useShortcuts();
  const toast = useToast();

  const presetButton = {
    rounded: 'rounded-full',
  };

  const settingsModal = ref(false);

  const settingsToggler = () => {
    settingsModal.value = !settingsModal.value;
  };

  const onSettingsClose = (haveDataChanged?: boolean) => {
    settingsModal.value = false;

    if (haveDataChanged) toast.add({ title: t('settings.updatedToast') });
  };

  defineShortcuts({
    'meta_.': {
      usingInput: false,
      handler: () => settingsToggler(),
    },
  });
</script>
