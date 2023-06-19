<template>
  <pre v-if="audio">
    {{
      `{
        "audioUrl": "${audioUrl}",
        "containerheight": "${containerheight}",
        "duration": "${audio.audio.duration}",
        "mediaProgressPercentage": "${mediaProgressPercentage}",
        "mediaProgressInMinutes": "${mediaProgressInMinutes}",
        "mediaProgressInSeconds": "${mediaProgressInSeconds}",
        "showList": "${showList}",
        "audio": "${audio}"
      }`
    }}
  </pre>
  <br />
  <div class="flex flex-col justify-center items-center rounded-lg w-full p-6">
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
          :animation="!showList"
          :no-voided-wrapper="!showList"
          :key="showList ? 'show-animation' : 'hide-animation'"
        >
          <div class="w-full h-full flex items-center duration-300 gap-1 rounded-full">
            <!-- toggle btn -->
            <div @click="toggleAudio" class="w-10 h-10 flex-shrink-0 duration-300">
              <div
                class="w-full h-full duration-300 flex justify-center items-center"
                :class="
                  showList
                    ? `${
                        audio?.isPlaying
                          ? 'bg-primary-500 dark:bg-primary-600'
                          : 'bg-gray-200 dark:bg-gray-800'
                      }`
                    : 'rounded-full bg-gray-50 dark:bg-gray-900'
                "
              >
                <i
                  :class="[
                    audio?.isPlaying
                      ? `i-heroicons-pause ${
                          showList ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                        }}`
                      : 'i-heroicons-play text-gray-500 dark:text-gray-400',
                  ]"
                ></i>
              </div>
            </div>
            <!-- info -->
            <div
              @click="toggleList"
              class="w-[calc(100%-40px)] h-full flex items-center justify-between"
            >
              <div
                class="text-gray-700 dark:text-gray-300 flex flex-col text-sm font-semibold max-w-[calc(100%-50px)]"
              >
                <div class="-mb-1 max-w-full truncate">Surah Al-Fatihah</div>
                <div
                  class="text-xs text-gray-500 dark:text-gray-400 font-normal max-w-full truncate"
                >
                  Abdul Basit
                </div>
              </div>

              <!-- list -->
              <div @click.self="toggleList" class="w-10 h-10 flex justify-center items-center">
                <i class="i-heroicons-queue-list text-lg text-gray-500 dark:text-gray-700"></i>
              </div>
            </div>
          </div>
          <div class="absolute z-30 bottom-0 w-full shadow-inner">
            <div :style="`width: ${mediaProgressPercentage}%`" class="bg-primary-900 h-0.5"></div>
            <input
              v-if="showList"
              :id="mediaProgressId"
              type="range"
              v-model="mediaProgressPercentage"
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
            <div class="text-2xl w-10 flex-shrink-0 text-gray-600">
              <i class="i-heroicons-microphone"></i>
            </div>
            <div class="w-[calc(100%-40px)]">
              <div class="text-sm text-gray-700 dark:text-gray-300 w-full truncate font-semibold">
                Surah Al-Fatihah
              </div>
              <div class="flex justify-between w-full text-gray-500 dark:text-gray-400 font-normal">
                <small class="w-[50%] truncate">Abdul Basit </small>
                <small class="w-[50%] flex justify-end truncate">12:23 / 102:41</small>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { audioUrl } = defineProps<{
    audioUrl: string;
  }>();

  const showList = ref(false);
  const toggleList = () => (showList.value = !showList.value);
  const mediaProgressId = ref(Generics.uuid() + '-media-progress');
  const listDivID = ref(Generics.uuid() + '-list');
  const listDiv = ref<HTMLElement | null>(null);
  const containerheight = ref(43); // default value
  const mediaProgressPercentage = ref(0);
  const mediaProgressInSeconds = ref(0);
  const mediaProgressInMinutes = ref(0);
  const mediaProgressFormatted = ref('00:00');
  const audio = ref();
  const getAudio = async () => {
    if (!audioUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Audio url is required',
      });
    }

    try {
      audio.value = new AudioPlayer(audioUrl);
      audio.value?.play();
      audio.value?.onEnded();
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error while playing audio',
      });
    }
  };

  const toggleAudio = () => {
    console.log('toggle audio');

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

  const audioProgressHandler = () => {
    if (!audio.value) {
      return;
    }

    const audioPlayer = audio.value?.audio; // the audio object inside the audio player

    // const playerAudio = audio.value?.audio; // the audio object inside the audio player
    audio.value?.onTimeUpdate((currentTime: number) => {
      mediaProgressInSeconds.value = currentTime;
      mediaProgressPercentage.value = Generics.calculatePercentage(
        currentTime,
        audioPlayer?.duration
      );
      mediaProgressInMinutes.value = Generics.convertToMinutes(currentTime);
      mediaProgressFormatted.value = Generics.formatTimeProgress(currentTime);
    });
  };

  const updateCurrentTime = () => {
    if (!audio.value) {
      return;
    }
    const audioPlayer = audio.value?.audio;
    // const newTime = Generics.convertPercentageToSeconds(newValue, audioPlayer?.duration);

    // audio.value.setCurrentTime(newTime);
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
