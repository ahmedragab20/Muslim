<template>
  <UCard>
    <template #header>
      <div>
        <h3 class="text-2xl font-semibold text-primary-500 text-start">
          {{ $t('base.settings') }}
        </h3>
      </div>
    </template>

    <!-- body -->
    <div>
      <!-- colors -->
      <div>
        <!-- primary -->
        <div>
          <h5 class="mb-1 text-gray-500 text-start">
            {{ $t('settings.primaryColor') }}
          </h5>
          <div class="flex w-full gap-2 px-1 py-2 overflow-x-auto">
            <div
              v-for="color in primaryColorsSorted"
              :key="color"
              class="min-w-[90px] cursor-pointer duration-300 hover:scale-105 max-w-[90px] max-h-[180px] m-1 rounded-md shadow-sm"
              :class="
                primaryColor === color
                  ? `ring ring-${color}-500 dark:ring-${color}-600`
                  : `ring ring-transparent`
              "
              @click="selectPrimaryColor(color)"
            >
              <ColorsPlaceholder
                :primary-bg="`dark:bg-${color}-500 bg-${color}-600`"
                :secondary-bg="getSecondaryColor(secondaryColor)"
              />
            </div>
          </div>
        </div>
        <!-- secondary -->
        <div>
          <h5 class="my-1 text-gray-500 text-start">
            {{ $t('settings.secondaryColor') }}
          </h5>

          <div class="flex w-full gap-2 px-1 py-2 overflow-x-auto">
            <div
              v-for="color in secondaryColorsSorted"
              :key="color"
              class="min-w-[90px] cursor-pointer duration-300 hover:scale-105 max-w-[90px] max-h-[180px] m-1 rounded-md shadow-sm"
              :class="
                secondaryColor === color
                  ? `ring ring-gray-400 dark:ring-gray-500`
                  : `ring ring-transparent`
              "
              @click="selectSecondaryColor(color)"
            >
              <ColorsPlaceholder
                :primary-bg="`bg-${primaryColor}-500`"
                :secondary-bg="getSecondaryColor(color)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Toggle languages -->
      <div>
        <h5 class="mb-1 text-gray-500 text-start">
          {{ $t('settings.language') }}
        </h5>
        <AppLanguageToggle class="mt-3" @locale-updated="localeUpdated" :locale="componentLocale" />
      </div>

      <!-- modes -->
      <div class="flex mt-4">
        <div
          class="flex justify-between gap-1 p-1 border rounded-lg border-slate-200 dark:border-slate-700"
          :class="[
            { 'bg-slate-100 dark:bg-slate-800': isModeBtnActive('light') },
            { 'bg-stone-200 dark:bg-stone-700': isModeBtnActive('sepia') },
            { 'bg-slate-300 dark:bg-slate-600': isModeBtnActive('dark') },
          ]"
        >
          <ClientOnly>
            <ClientOnly>
              <UButton
                :icon="'i-heroicons-computer-desktop'"
                :color="isModeBtnActive('system') ? appConfig.ui.primary : 'gray'"
                variant="ghost"
                aria-label="Theme"
                @click="changeAppTheme('system')"
              />

              <template #fallback>
                <div class="w-8 h-8" />
              </template>
            </ClientOnly>

            <UButton
              :icon="'i-heroicons-sun'"
              :color="isModeBtnActive('light') ? appConfig.ui.primary : 'gray'"
              variant="ghost"
              aria-label="Theme"
              @click="changeAppTheme('light')"
            />

            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
          <ClientOnly>
            <UButton
              :icon="'i-heroicons-moon'"
              :color="isModeBtnActive('dark') ? appConfig.ui.primary : 'gray'"
              variant="ghost"
              aria-label="Theme"
              @click="changeAppTheme('dark')"
            />

            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between">
        <div>
          <UButton
            :ui="{
              rounded: 'rounded-full',
            }"
            icon="i-heroicons-check-20-solid"
            :label="$t('settings.apply')"
            @click="applyChanges"
          />
        </div>
        <div class="flex items-center">
          <UTooltip class="hidden md:flex" :text="$t('settings.rememberSettings')">
            <AppToggle v-model="rememberChanges" />
          </UTooltip>

          <div class="md:hidden">
            <AppToggle v-model="rememberChanges" :label="$t('settings.rememberSettings')" />
          </div>
        </div>
      </div>
    </template>
  </UCard>
</template>
<script setup lang="ts">
  import colors from '#tailwind-config/theme/colors';
  const emit = defineEmits<{
    (e: 'close', haveDataChanged?: boolean): void;
  }>();

  const { locale } = useI18n();
  const colorMode = useColorMode();
  const appConfig = useAppConfig();

  const componentLocale = ref(locale.value);
  const localeUpdated = (newLocale: string): void => {
    componentLocale.value = newLocale;
  };
  const submitLocaleUpdate = (): void => {
    locale.value = componentLocale.value;
    locale.value?.includes('ar') ? (document.dir = 'rtl') : (document.dir = 'ltr');
  };

  const primaryColorsSorted = computed<string[]>(() => {
    const blockedColors = ['black', 'white', 'transparent', 'red', 'rose', 'primary'];

    return appConfig.ui.colors
      .sort((a: string, b: string) => {
        if (a === appConfig.ui.primary) {
          return -1;
        } else if (b === appConfig.ui.primary) {
          return 1;
        } else {
          return 0;
        }
      })
      ?.filter((color: string) => !blockedColors.includes(color));
  });
  const secondaryColorsSorted = computed<string[]>(() => {
    return appConfig.ui.grayColors.sort((a: string, b: string) => {
      if (a === appConfig.ui.gray) {
        return -1;
      } else if (b === appConfig.ui.gray) {
        return 1;
      } else {
        return 0;
      }
    });
  });

  const primaryColor = ref<string>('green'); // fallback to green
  const secondaryColor = ref<string>('cool'); // fallback to cool

  const selectPrimaryColor = (color: string) => {
    if (!color) return;

    primaryColor.value = color;
  };
  const selectSecondaryColor = (color: string) => {
    if (!color) return;

    secondaryColor.value = color;
  };

  const getSecondaryColor = (color: string): string => {
    if (!color) {
      throw new Error("Color can't be empty");
    }

    return (colors as any)?.[color][colorMode.value === 'dark' ? 400 : 500];
  };

  const getColorScheme = () => {
    const w: any = window;

    // @ts-ignore
    function prefersColorScheme(suffix) {
      return w.matchMedia('(prefers-color-scheme' + suffix + ')');
    }
    if (w.matchMedia && prefersColorScheme('').media !== 'not all') {
      // @ts-ignore
      for (const colorScheme of knownColorSchemes) {
        if (prefersColorScheme(':' + colorScheme).matches) {
          return colorScheme;
        }
      }
    }

    //?? the function inspired by the source code detecting system them function the color-mode repo on github, you can look it up: https://github.com/nuxt-modules/color-mode/blob/master/src/script.ts#L61
  };

  const selectedTheme = ref<string>('system'); // fallback to system

  const isModeBtnActive = (mode: string) => {
    return selectedTheme.value === mode;
  };

  const changeAppTheme = (mode: string) => {
    if (!mode) return;

    selectedTheme.value = mode;
  };

  const colorModeChanged = computed<boolean>(() => {
    const de = document.documentElement;
    const deThemeClass = de.className;

    const colorScheme = getColorScheme();
    const currentTheme = selectedTheme.value === 'system' ? colorScheme : selectedTheme.value;

    return currentTheme !== deThemeClass;
  });

  const haveDataChanged = computed<boolean>(() => {
    return (
      locale.value !== componentLocale.value ||
      primaryColor.value !== appConfig.ui.primary ||
      secondaryColor.value !== appConfig.ui.gray ||
      colorModeChanged.value
    );
  });

  const rememberChanges = ref<boolean>(true);

  const appSettings = computed(() => {
    return {
      language: componentLocale.value,
      mode: selectedTheme.value,
      color: {
        primary: primaryColor.value,
        secondary: secondaryColor.value,
      },
    };
  });

  const updateThemeLocally = () => {
    // that helps when we don't wanna remember the changes
    const de = document.documentElement;

    if (selectedTheme.value !== 'system') {
      de.className = selectedTheme.value;

      return;
    }

    const colorScheme = getColorScheme();

    de.className = colorScheme ? colorScheme : 'light';
  };

  const applyChanges = () => {
    if (!haveDataChanged.value) {
      emit('close', false);

      return;
    }

    appConfig.ui.primary = primaryColor.value;
    appConfig.ui.gray = secondaryColor.value;

    if (rememberChanges.value) {
      const settings = JSON.stringify(appSettings.value);
      localStorage.setItem('appSettings', settings);

      if (colorModeChanged.value) {
        colorMode.value = selectedTheme.value;
        colorMode.preference = selectedTheme.value;
      }
    }
    submitLocaleUpdate();
    updateThemeLocally();
    emit('close', true);
  };

  onMounted(() => {
    // locale.value?.includes('ar') ? (document.dir = 'rtl') : (document.dir = 'rtl');
    primaryColor.value = appConfig.ui.primary;
    secondaryColor.value = appConfig.ui.gray;

    selectedTheme.value = colorMode.preference;
  });
</script>
