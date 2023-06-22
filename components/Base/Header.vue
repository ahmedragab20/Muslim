<template>
  <div
    class="flex justify-between w-full flex-col min-h-[8vh] backdrop-blur-md px-1 sm:px-0 z-[1000]"
  >
    <div class="flex items-center justify-between w-full min-h-[8vh]">
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
      <div class="w-[70%] flex justify-center flex-col items-center py-1">
        <NuxtLink to="/" class="text-2xl">
          <span class="font-mono text-primary-500">
            {{ $t('base.appTitle') }}
          </span>
        </NuxtLink>
        <div v-if="player">
          <UButton
            variant="soft"
            size="xs"
            :ui="{
              rounded: 'rounded-full',
            }"
            icon="i-heroicons-play"
            @click="togglePlayerOpened"
          >
            <span class="max-w-[150px] sm:max-w-sm truncate">
              Abdul Basit Abdul Samad <span v-if="!!chapter"> | {{ chapter.english }} </span>
            </span>
          </UButton>
        </div>
      </div>
      <!-- menu -->
      <div class="w-[15%] flex justify-center items-center min-h-full py-1 px-1 sm:px-4">
        <BaseLinks />
      </div>
    </div>
    <!-- ongoing section -->
    <Transition name="slide-down" appear>
      <OngoingMedia v-show="headerPlayerOpened" />
    </Transition>
  </div>
  <!-- settings modal -->
  <UModal v-model="settingsModal" name="settingsModal">
    <BaseSettings @close="onSettingsClose" />
  </UModal>
</template>
<script setup lang="ts">
  import { useAudioPlayerStore } from '~/stores/audio-player';

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
  const player = useState<any>('audio', () => null);
  const playerInfo = computed(() => player.value?.info?.[0]);
  const chapter = ref();
  const getChapter = async () => {
    Debug.log({
      message: 'getChapter',
      data: player.value,
    });
    try {
      const chapterId = player.value?.info?.[0]?.chapterId;
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

  defineShortcuts({
    'meta_.': {
      usingInput: true,
      handler: () => settingsToggler(),
    },
  });
</script>
