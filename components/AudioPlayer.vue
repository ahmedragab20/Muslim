<template>
  <div
    :style="!btnOnly ? `${hasSlot ? '' : `height: ${containerheight}px`}` : ''"
    class="relative"
    :class="[
      btnOnly ? `${hasSlot ? '' : 'initial:w-10'}` : `${hasSlot ? '' : 'initial:w-[280px]'}`,
      { 'initial:h-10': !hasSlot },
    ]"
    @click="hasSlot && !loading ? toggleAudio() : () => {}"
  >
    <slot />
    <template v-if="!hasSlot">
      <div
        class="absolute z-20 w-full duration-300 initial:rounded-full"
        :class="[
          showList ? ' -translate-y-5 rounded-t-full' : 'rounded-full',
          btnOnly ? 'h-full' : 'h-10',
        ]"
      >
        <A3DCard
          @click.self="!showList ? toggleList() : () => {}"
          :card-class="`${
            showList ? 'rounded-t-xl' : 'rounded-full'
          } bg-gray-50 dark:bg-gray-900 relative duration-300`"
          class="w-full h-full duration-300 cursor-pointer"
          :animation="false"
          :no-voided-wrapper="!showList"
          :key="showList ? 'show-animation' : 'hide-animation'"
        >
          <div class="flex items-center w-full h-full gap-1 duration-300 rounded-full">
            <!-- toggle btn -->
            <div
              :class="[
                showList
                  ? `${
                      audio?.isPlaying
                        ? 'bg-primary-500 dark:bg-primary-600'
                        : 'bg-gray-200 dark:bg-gray-800'
                    }`
                  : 'rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800',
                btnOnly ? 'w-full h-full' : 'w-10 h-10',
              ]"
              class="flex items-center justify-center flex-shrink-0 duration-300"
            >
              <UButton
                :loading="loadingAudio"
                variant="link"
                :ui="{
                  variant: {
                    link: 'hover:!bg-transparent',
                  },
                }"
                :icon="audio?.isPlaying ? 'i-heroicons-pause' : 'i-heroicons-play'"
                @click="toggleAudio"
                class="rtl:rotate-180"
              >
              </UButton>
            </div>

            <!-- info -->
            <div
              v-if="!btnOnly"
              @click="toggleList"
              class="w-[calc(100%-40px)] ltr:pl-2 rtl:pr-2 h-full flex items-center justify-between"
            >
              <div
                class="text-gray-700 dark:text-gray-300 flex flex-col text-sm font-semibold max-w-[calc(100%-50px)]"
              >
                <div class="max-w-full -mb-1 truncate">
                  {{ audioName }}
                </div>
                <div
                  class="max-w-full text-xs font-normal text-gray-500 truncate dark:text-gray-400"
                >
                  {{ reciterName }}
                </div>
              </div>
              <!-- list -->
              <div
                v-if="expandable"
                @click.self="toggleList"
                class="flex items-center justify-center w-10 h-10"
              >
                <i class="text-lg text-gray-500 i-heroicons-queue-list dark:text-gray-700"></i>
              </div>
            </div>
          </div>
          <div
            v-if="audio?.duration && !btnOnly"
            class="absolute bottom-0 z-30 w-full shadow-inner"
          >
            <div
              :style="`width: ${mediaProgressPercentage}%`"
              class="dark:bg-primary-900 bg-primary-700 h-0.5"
            ></div>
            <input
              v-if="showList || !expandable"
              :id="mediaProgressId"
              type="range"
              v-model="mediaProgressPercentage"
              @input="audioProgressHandler($event)"
              class="w-full bg-transparent h-0.5 opacity-0 hover:opacity-100 duration-300 rounded-lg appearance-none cursor-pointer range-xs z-30 absolute bottom-0 left-0 right-0"
            />
          </div>
        </A3DCard>
      </div>
      <Transition name="slideIn-fade">
        <div
          v-if="showList && expandable && !btnOnly"
          :id="listDivID"
          class="w-full min-h-[55px] overflow-auto delay-75 rounded-b-xl duration-300 bg-gray-100 dark:bg-gray-900 absolute z-10 top-0 left-0 right-0"
          :class="{ ' translate-y-5': showList }"
        >
          <div class="w-full absolute inset-0 z-10 min-h-[40px]">
            <div class="flex items-center w-full h-full gap-1">
              <div
                class="flex items-center justify-center flex-shrink-0 w-10 h-full text-2xl text-gray-600"
              >
                <img
                  v-if="reciterPoster"
                  :src="reciterPoster"
                  :alt="`${reciterName} Poster`"
                  class="object-cover w-full h-full"
                />
                <i v-else class="i-heroicons-microphone"></i>
              </div>
              <div class="w-[calc(100%-40px)] px-2">
                <div class="flex justify-between">
                  <div
                    class="w-3/4 text-sm font-semibold text-gray-700 truncate dark:text-gray-300"
                  >
                    {{ fullName }}
                  </div>
                  <UButton
                    v-if="!isCdnUrl"
                    class="px-0.5"
                    variant="link"
                    size="xs"
                    :padded="false"
                    :loading="downloading"
                    :icon="
                      audioDownloaded ? 'i-heroicons-check-badge' : 'i-heroicons-arrow-down-tray'
                    "
                    @click="downloadAudio"
                  >
                  </UButton>
                </div>
                <div
                  class="flex justify-between w-full font-normal text-gray-500 dark:text-gray-400"
                >
                  <small class="w-[50%] truncate"> {{ reciterName }} </small>
                  <small class="w-[50%] flex justify-end truncate">
                    {{ mediaProgressFormatted }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div
            class="absolute inset-0 z-0 max-h-full overflow-hidden opacity-50 pointer-events-none select-none blur-2xl"
          >
            <img
              :src="reciterPoster"
              :alt="`${reciterName} poster`"
              class="pointer-events-none select-none w-full h-full object-fit scale-[1.2]"
            />
          </div>
        </div>
      </Transition>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useAudioPlayerStore } from '~/stores/audio-player';

  interface AudioProp {
    [key: string]: any;
  }
  interface AudioProgressProp {
    duration: number;
    currentTime: number;
    percentage: number;
    formatted: string;
  }
  interface MetaLogic {
    fn: Function;
    args: any[];
  }
  interface LocalPlayerInfo {
    url: string;
    info: any[];
  }

  interface Props {
    audioUrl: string;
    audioName?: string;
    fullName?: string;
    reciterName?: string;
    expandable?: boolean;
    btnOnly?: boolean; // will handle it when needed later
    playInTheBackground?: boolean; // will handle it when needed later
    loading?: boolean;
    metaLogic?: MetaLogic[]; // meta logic is some logic that you wanna get executed right before the audio starts playing [mostly the player will depend on it to get the audio playing properly]
    playerInfo?: any;
    reciterPoster?: string;
    reinitPlayer?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    audioUrl: '',
    audioName: '',
    fullName: '',
    reciterName: '',
    expandable: false,
    btnOnly: false,
    playInTheBackground: false,
    loading: false,
  });
  const emit = defineEmits<{
    'audio-found': [audio: AudioProp];
    'audio-toggled': [status: boolean];
    'audio-progress': [progress: AudioProgressProp];
    'audio-downloaded': [status: boolean];
    'audio-downloading': [status: boolean];
    'audio-buffering': [status: boolean];
    'audio-error': [error: any];
    'audio-ended': [status: boolean];
  }>();
  const slots = useSlots();

  const useAudioPlayer = useAudioPlayerStore();

  const isCdnUrl = computed(() => {
    return isCDNUrl(props.audioUrl);
  });
  const hasSlot = computed(() => {
    return !!slots.default;
  });
  const showList = ref(false);
  const toggleList = () => {
    if (!props.expandable || props.btnOnly) return;

    showList.value = !showList.value;
  };
  const mediaProgressId = ref(Generics.uuid() + '-media-progress');
  const listDivID = ref(Generics.uuid() + '-list');
  const listDiv = ref<HTMLElement | null>(null);
  const containerheight = ref(43); // default value
  const mediaProgressPercentage = props.playInTheBackground
    ? useState<any>('mediaProgressPercentage', () => 0)
    : ref(0);
  const mediaProgressInSeconds = props.playInTheBackground
    ? useState<any>('mediaProgressInSeconds', () => 0)
    : ref(0);
  const mediaProgressInMinutes = props.playInTheBackground
    ? useState<any>('mediaProgressInMinutes', () => 0)
    : ref(0);
  const mediaProgressFormatted = props.playInTheBackground
    ? useState<any>('mediaProgressFormatted', () => '00:00/00:00')
    : ref('00:00/00:00'); // default value
  const audio = props.playInTheBackground ? useState<any>('audio', () => null) : ref<any>();
  const localPlayerInfo = useState('player-info', () => {
    if (!props.playInTheBackground) return;

    return useAudioPlayer.playerInfo;
  });

  const loadingAudio = ref(false);
  const localAudioUrl = ref('');
  const playerInfo = computed<LocalPlayerInfo>(() => {
    let playerInfo: LocalPlayerInfo = {
      url: props.audioUrl,
      info: [],
    };

    if (!props.playerInfo) {
      return playerInfo;
    }

    if (Array.isArray(props.playerInfo)) {
      playerInfo.info = [...props.playerInfo];
    } else {
      playerInfo.info = [props.playerInfo];
    }

    if (props.playInTheBackground) {
      useAudioPlayer.setPlayerInfo(playerInfo);
    }

    return playerInfo;
  });

  const getAudio = async () => {
    if (!props.audioUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Audio url is required',
      });
    }

    try {
      loadingAudio.value = true;

      // check if the player info prop is with type of array
      audio.value = new AudioPlayer(
        localAudioUrl.value || playerInfo.value.url,
        localPlayerInfo.value || playerInfo.value.info
      );

      // listeners
      audio.value?.onEnded(() => {
        emit('audio-ended', true);
        emit('audio-toggled', false);

        if (props.playInTheBackground) {
          useAudioPlayer.setStatus(false);
        }
      });
      audio.value?.onBuffering(() => {
        loadingAudio.value = true;

        emit('audio-buffering', true);
        emit('audio-toggled', false);

        if (props.playInTheBackground) {
          useAudioPlayer.setStatus(false);
        }
      });
      audio.value?.onPlaying(() => {
        loadingAudio.value = false;

        emit('audio-buffering', false);
        emit('audio-toggled', true);

        if (props.playInTheBackground) {
          useAudioPlayer.setStatus(true);
        }
      });

      audio.value?.play();

      let audioInherited = new AudioPlayer(
        localAudioUrl.value || playerInfo.value.url,
        localPlayerInfo.value || playerInfo.value.info
      );

      emit('audio-found', audioInherited);

      if (props.playInTheBackground) {
        useAudioPlayer.setAudio(audioInherited);
      }
    } catch (error) {
      console.error(error);

      emit('audio-error', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Error while playing audio',
      });
    } finally {
      loadingAudio.value = false;
    }
  };

  const toggleAudio = async () => {
    if (!audio.value) {
      // this code will run only once
      if (props.metaLogic?.length) {
        await Promise.all(
          props.metaLogic.map(async (logic: MetaLogic) => {
            await logic?.fn?.(...logic.args);
          })
        );
      }

      await getAudio();
      audioProgressHandler();
      emit('audio-toggled', true);
      return;
    }

    if (audio.value?.isPlaying) {
      audio.value?.pause();
      emit('audio-toggled', false);
    } else {
      audio.value?.play();
      emit('audio-toggled', true);
    }
  };

  const audioProgressHandler = (e?: any) => {
    if (!audio.value) {
      Debug.error({
        message: 'Audio is not found',
        data: {
          audio: audio.value,
        },
      });
      return;
    }

    if (!!mediaProgressPercentage.value && e) {
      audio.value.setCurrentTime(
        Generics.convertPercentageToSeconds(+mediaProgressPercentage.value, audio.value?.duration)
      );
    }
    audio.value?.onTimeUpdate((currentTime: number) => {
      mediaProgressInSeconds.value = currentTime;
      mediaProgressPercentage.value = Generics.calculatePercentage(
        currentTime,
        audio.value?.duration
      );
      mediaProgressInMinutes.value = Generics.convertToMinutes(currentTime);
      mediaProgressFormatted.value = Generics.formatTimeProgress(
        currentTime,
        audio.value?.duration
      );
    });

    emit('audio-progress', {
      duration: audio.value?.duration,
      currentTime: mediaProgressInSeconds.value,
      percentage: mediaProgressPercentage.value,
      formatted: mediaProgressFormatted.value,
    });
  };
  const audioDownloaded = ref(false);
  const downloading = ref(false);
  const downloadAudio = async () => {
    if (!props.audioUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Audio url is required',
      });
    }
    if (isCdnUrl.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'The audio URL is not downloadable',
      });
    }
    try {
      downloading.value = true;
      emit('audio-downloading', true);

      await Generics.downloadFile(props.audioUrl)
        .then(() => {
          setTimeout(() => {
            audioDownloaded.value = false;
            emit('audio-downloaded', false);
          }, 5000);
        })
        .catch((error) => console.error('Error downloading file:', error));
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error while downloading audio',
      });
    } finally {
      downloading.value = false;
      emit('audio-downloading', false);
    }
  };

  const reInitiateTheAudio = async () => {
    if (!props.playInTheBackground || !props.reinitPlayer) return;
    // audio.value = useAudioPlayer.audio;
    // audioProgressHandler(useAudioPlayer.currentTime);
  };

  watch(showList, () => {
    listDivID.value = Generics.uuid() + '-list';
    nextTick(() => {
      containerheight.value = 43;
      listDiv.value = document.getElementById(listDivID.value);

      if (!!listDiv.value) {
        containerheight.value = listDiv.value.clientHeight + 45;
      } else {
        containerheight.value = 43;
      }
    });
  });
  watch(
    () => props.audioUrl,
    () => {
      if (audio.value) {
        if (props.playInTheBackground) {
          return;
        }

        audio.value?.pause();
        audio.value = undefined;
      }
    }
  );
  onMounted(() => {
    if (props.playInTheBackground) {
      reInitiateTheAudio();
    }

    if (props.expandable) {
      toggleList();
    }
  });
  onUnmounted(() => {
    if (!props.playInTheBackground) {
      audio.value?.pause();
      audio.value = undefined;
    }
  });
  onBeforeRouteLeave(() => {
    if (audio.value && !props.playInTheBackground) {
      audio.value?.pause();
    }
  });

  defineExpose({
    toggleAudio,
  });
</script>
<style>
  input[type='range']::-webkit-slider-thumb::after {
    @apply bg-primary-500 dark:bg-primary-600;
  }

  input[type='range']::-moz-range-thumb::after {
    @apply bg-primary-500 dark:bg-primary-600;
  }

  input[type='range']::-ms-thumb::after {
    @apply bg-primary-500 dark:bg-primary-600;
  }
</style>
