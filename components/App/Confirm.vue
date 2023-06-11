<template>
  <div>
    <div v-if="defaultSlotExists" class="flex flex-col p-3 sm:p-5">
      <div>
        <h3
          class="initial:mb-2 initial:text-xl initial:font-headline initial:font-semibold"
          :class="labelClass"
        >
          {{ label }}
        </h3>
        <!-- content -->
        <div>
          <slot />
        </div>
      </div>
      <div class="flex mt-3">
        <div class="flex gap-1">
          <UButton
            :ui="
              btnUI || {
                rounded: 'rounded-full',
              }
            "
            :variant="submitVariant"
            :icon="submitIcon"
            :label="submitLabel"
            :color="submitColor"
            :disabled="disabled"
            :loading="loading"
            @click="submit"
          />
          <UButton
            :ui="
              btnUI || {
                rounded: 'rounded-full',
              }
            "
            :icon="cancelIcon"
            :label="cancelLabel"
            :variant="cancelVariant"
            :disabled="loading"
            :color="cancelColor"
            @click="cancel"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  interface UI {
    [key: string]: string;
    rounded: string;
  }

  const props = withDefaults(
    defineProps<{
      label?: string;
      labelClass?: string;
      submit: (...args: any[]) => any;
      cancel: (...args: any[]) => any;
      submitIcon?: string;
      cancelIcon?: string;
      submitLabel?: string;
      cancelLabel?: string;
      submitVariant?: string;
      cancelVariant?: string;
      btnUI?: Partial<UI>;
      submitColor?: string;
      cancelColor?: string;
      disabled?: boolean;
      loading?: boolean;
    }>(),
    {
      label: 'confirming with you!',
      submitLabel: 'Submit',
      cancelLabel: 'Cancel',
      submitIcon: '',
      cancelIcon: '',
      submitVariant: 'soft',
      cancelVariant: 'soft',
    }
  );

  const slots = useSlots();

  const defaultSlotExists = computed(() => {
    return Object.keys(slots).includes('default');
  });

  onMounted(() => {
    if (!defaultSlotExists) {
      alert('Confirm component requires a default slot');
      throw new Error('Confirm component requires a default slot');
    }
  });
</script>
