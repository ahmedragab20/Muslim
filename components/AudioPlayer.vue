<template>
  <div :style="`height: ${containerheight}px`" class="w-[280px] relative initial:h-10">
    <div
      class="w-full h-10 absolute z-20 duration-300 initial:rounded-full"
      :class="showList ? ' -translate-y-5 rounded-t-full' : 'rounded-full'"
    >
      <A3DCard
        @click.self="!showList ? toggleList() : () => {}"
        :card-class="`${
          showList ? 'rounded-t-xl' : 'rounded-full'
        } bg-gray-50 dark:bg-gray-900 relative duration-300`"
        class="w-full h-full cursor-pointer duration-300"
        :animation="false"
        :no-voided-wrapper="!showList"
        :key="showList ? 'show-animation' : 'hide-animation'"
      >
        <div class="w-full h-full flex items-center duration-300 gap-1 rounded-full">
          <!-- toggle btn -->
          <div
            :class="
              showList
                ? `${
                    audio?.isPlaying
                      ? 'bg-primary-500 dark:bg-primary-600'
                      : 'bg-gray-200 dark:bg-gray-800'
                  }`
                : 'rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800'
            "
            class="w-10 flex items-center justify-center h-10 flex-shrink-0 duration-300"
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
            >
            </UButton>
          </div>

          <!-- info -->
          <div
            @click="toggleList"
            class="w-[calc(100%-40px)] h-full flex items-center justify-between"
          >
            <div
              class="text-gray-700 dark:text-gray-300 flex flex-col text-sm font-semibold max-w-[calc(100%-50px)]"
            >
              <div class="-mb-1 max-w-full truncate">
                {{ audioName }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 font-normal max-w-full truncate">
                {{ reciterName }}
              </div>
            </div>

            <!-- list -->
            <div
              v-if="expandable"
              @click.self="toggleList"
              class="w-10 h-10 flex justify-center items-center"
            >
              <i class="i-heroicons-queue-list text-lg text-gray-500 dark:text-gray-700"></i>
            </div>
          </div>
        </div>
        <div v-if="audio?.duration" class="absolute z-30 bottom-0 w-full shadow-inner">
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
        v-if="showList"
        :id="listDivID"
        class="w-full min-h-[55px] overflow-hidden delay-75 rounded-b-xl duration-300 bg-gray-100 dark:bg-gray-900 absolute z-10 top-0 left-0 right-0"
        :class="{ ' translate-y-5': showList }"
      >
        <div
          class="my-1 bg-gray-200 w-full flex px-2 items-center gap-1 dark:bg-gray-800 min-h-[40px]"
        >
          <div class="text-2xl w-8 flex-shrink-0 text-gray-600">
            <i class="i-heroicons-microphone"></i>
          </div>
          <div class="w-[calc(100%-40px)]">
            <div class="flex justify-between">
              <div class="text-sm text-gray-700 dark:text-gray-300 w-3/4 truncate font-semibold">
                {{ fullName }}
              </div>
              <UButton
                v-if="!isCdnUrl"
                variant="link"
                :loading="downloading"
                @click="downloadAudio"
              >
                <i
                  :class="
                    audioDownloaded ? 'i-heroicons-check-badge' : 'i-heroicons-arrow-down-tray'
                  "
                ></i>
              </UButton>
            </div>
            <div class="flex justify-between w-full text-gray-500 dark:text-gray-400 font-normal">
              <small class="w-[50%] truncate"> {{ reciterName }} </small>
              <small class="w-[50%] flex justify-end truncate">
                {{ mediaProgressFormatted }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  const { audioUrl, expandable, playOnTheBackground } = defineProps<{
    audioUrl: string;
    audioName?: string;
    fullName?: string;
    reciterName?: string;
    expandable?: boolean;
    btnOnly?: boolean; // will handle it when needed later
    playOnTheBackground?: boolean; // will handle it when needed later
  }>();

  const isCdnUrl = computed(() => {
    return isCDNUrl(audioUrl);
  });

  const showList = ref(false);
  const toggleList = () => {
    if (!expandable) return;

    showList.value = !showList.value;
  };
  const mediaProgressId = ref(Generics.uuid() + '-media-progress');
  const listDivID = ref(Generics.uuid() + '-list');
  const listDiv = ref<HTMLElement | null>(null);
  const containerheight = ref(43); // default value
  const mediaProgressPercentage = ref(0);
  const mediaProgressInSeconds = ref(0);
  const mediaProgressInMinutes = ref(0);
  const mediaProgressFormatted = ref('00:00');
  const audio = ref();
  const loadingAudio = ref(false);
  const getAudio = async () => {
    if (!audioUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Audio url is required',
      });
    }

    try {
      loadingAudio.value = true;
      audio.value = new AudioPlayer(audioUrl);
      audio.value?.play();
      audio.value?.onEnded();
      audio.value?.onBuffering(() => {
        loadingAudio.value = true;
      });
      audio.value?.onPlaying(() => {
        loadingAudio.value = false;
      });
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error while playing audio',
      });
    } finally {
      loadingAudio.value = false;
    }
  };

  const toggleAudio = () => {
    if (!audio.value) {
      getAudio();
      audioProgressHandler();

      return;
    }

    if (audio.value?.isPlaying) {
      audio.value?.pause();
    } else {
      audio.value?.play();
    }
  };

  const audioProgressHandler = (e?: any) => {
    if (!audio.value) {
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
      mediaProgressFormatted.value = `${Generics.formatTimeProgress(
        currentTime
      )}/${Generics.formatTimeProgress(audio.value?.duration)}`;
    });
  };
  const audioDownloaded = ref(false);
  const downloading = ref(false);
  const downloadAudio = async () => {
    if (!audioUrl) {
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
      await Generics.downloadFile(audioUrl)
        .then(() => {
          audioDownloaded.value = true;
        })
        .catch((error) => console.error('Error downloading file:', error));
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error while downloading audio',
      });
    } finally {
      downloading.value = false;

      setTimeout(() => {
        audioDownloaded.value = false;
      }, 5000);
    }
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
  onBeforeRouteLeave(() => {
    if (audio.value && !playOnTheBackground) {
      audio.value?.pause();
    }
  });
</script>
<style scoped>
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
