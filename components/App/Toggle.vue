<template>
  <div class="flex items-center gap-2">
    <label
      v-if="sizeProp === 'sm'"
      class="relative inline-flex items-center cursor-pointer"
      :class="{ 'opacity-50 !cursor-not-allowed': disabled }"
    >
      <input
        class="sr-only peer"
        type="checkbox"
        :id="`change-${sizeProp}`"
        :disabled="disabled"
        :value="modelValue"
        :checked="modelValue"
        @change="emit('update:modelValue', !modelValue)"
      />
      <div
        class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"
      ></div>
    </label>

    <label
      v-else-if="sizeProp === 'md'"
      class="relative inline-flex items-center cursor-pointer"
      :class="{ 'opacity-50 !cursor-not-allowed': disabled }"
    >
      <input
        class="sr-only peer"
        type="checkbox"
        :id="`change-${sizeProp}`"
        :disabled="disabled"
        :value="modelValue"
        :checked="modelValue"
        @change="emit('update:modelValue', !modelValue)"
      />
      <div
        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"
      ></div>
    </label>

    <label
      v-else-if="sizeProp === 'lg'"
      class="relative inline-flex items-center cursor-pointer"
      :class="{ 'opacity-50 !cursor-not-allowed': disabled }"
    >
      <input
        type="checkbox"
        class="sr-only peer"
        :id="`change-${sizeProp}`"
        :disabled="disabled"
        :value="modelValue"
        :checked="modelValue"
        @change="emit('update:modelValue', !modelValue)"
      />
      <div
        class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"
      ></div>
    </label>
    <!-- label -->
    <label
      v-if="label"
      :for="`change-${sizeProp}`"
      class="inline-block text-sm text-gray-500 cursor-pointer select-none dark:text-gray-400"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
  type Size = 'sm' | 'md' | 'lg';
  const { size = 'sm' } = defineProps<{
    label?: string;
    disabled?: boolean;
    size?: Size;
    modelValue: boolean;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [status: boolean];
  }>();

  const sizeProp = computed(() => size);
</script>
