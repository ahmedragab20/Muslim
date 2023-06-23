<template>
  <div
    class="flex justify-between w-full flex-col min-h-[8vh] backdrop-blur-md px-1 sm:px-0 z-[1000]"
  >
    <div class="flex items-center justify-between w-full min-h-[8vh]">
      <!-- settings -->
      <div
        :class="{
          'opacity-0 pointer-events-none select-none': headerPlayerOpened,
        }"
        class="w-[15%] min-h-full flex justify-center items-center px-1 py-1 sm:px-1"
      >
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
      <div class="w-[70%] flex justify-center flex-col items-center overflow-auto py-1">
        <NuxtLink to="/" class="text-2xl">
          <span class="font-mono text-primary-500">
            {{ $t('base.appTitle') }}
          </span>
        </NuxtLink>
        <Transition name="island-pop-down">
          <div v-if="player && chapter" class="flex max-w-full">
            <UButton
              variant="soft"
              size="xs"
              :ui="{
                rounded: 'rounded-full',
              }"
              :icon="playerState?.isPlaying ? 'i-heroicons-pause' : 'i-heroicons-play'"
              @click="togglePlayerOpened"
            >
              <div class="max-w-[150px] sm:max-w-sm truncate flex gap-1">
                <div class="max-w-[70%] truncate">{{ reciterName }}</div>
                <span>|</span>
                <div class="max-w-[40%] truncate">
                  {{ chapter.english }}
                </div>
              </div>
            </UButton>
          </div>
        </Transition>
      </div>
      <!-- menu -->
      <div
        :class="{
          'opacity-0 pointer-events-none select-none': headerPlayerOpened,
        }"
        class="w-[15%] flex justify-center items-center min-h-full py-1 px-1 sm:px-4"
      >
        <BaseLinks />
      </div>
    </div>
    <!-- ongoing section -->
    <Transition name="island-pop">
      <OngoingMedia v-if="headerPlayerOpened" :toggler="togglePlayerOpened" />
    </Transition>
  </div>
  <!-- settings modal -->
  <UModal v-model="settingsModal" name="settingsModal">
    <BaseSettings @close="onSettingsClose" />
  </UModal>
</template>
<script setup lang="ts">
  import { useAudioPlayerStore } from '~/stores/audio-player';
  const route = useRoute();
  const { t } = useI18n();
  const { metaSymbol } = useShortcuts();
  const toast = useToast();
  const audioPlayerStore = useAudioPlayerStore();

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
  const chapter = useState<any>('ongoing-chapter', () => null);
  const player = computed(() => audioPlayerStore.audio);
  const playerState = useState<any>(`audio-${chapter.value?.number}`);
  // const storedPlayer = computed(() => audioPlayerStore.audio);
  const playerInfo = computed<any>(() => playerState.value?.info?.[0] || player.value?.info?.[0]);

  const reciterName = computed(() => playerInfo.value?.reciterName);
  const getChapter = async () => {
    try {
      const chapterId = playerInfo.value?.chapterId;
      if (!chapterId) return;

      const { fetchChapter } = useFetchApis();
      const res = await fetchChapter(playerInfo.value?.chapterId);

      chapter.value = res.value;
    } catch (error) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Chapter not found',
      });
    }
  };

  watch(
    () => player.value?.url,
    (newVal) => {
      getChapter();
    }
  );

  const headerPlayerOpened = computed(() => audioPlayerStore.headerPlayerOpened);
  const togglePlayerOpened = () => {
    audioPlayerStore.setHeaderPlayerOpened();
  };

  watch(
    () => route.fullPath,
    () => {
      if (headerPlayerOpened.value) {
        togglePlayerOpened();
      }
    }
  );

  defineShortcuts({
    'meta_.': {
      usingInput: true,
      handler: () => settingsToggler(),
    },
  });
</script>
