<template>
  <div v-if="!!chapter" @click.self="toggler" class="h-[100svh] w-full backdrop-blur-sm">
    <div
      @click.self="toggler"
      class="p-3 w-full rounded-b-3xl relative 2xl:min-h-[300px] min-h-[50svh] z-10 flex justify-center items-center"
    >
      <!-- Add overlay -->
      <div
        @click.self="toggler"
        class="container absolute inset-0 z-10 flex items-center justify-center mx-auto"
      >
        <div class="flex flex-col items-center justify-center w-full sm:max-w-[400px]">
          <!-- poster -->
          <div
            class="sm:w-[210px] w-[170px] sm:h-[210px] h-[170px] pointer-events-none select-none"
          >
            <img
              :src="reciterPoster"
              alt="poster"
              class="object-cover w-full h-full pointer-events-none select-none rounded-3xl"
            />
          </div>
          <!-- player -->
          <div class="flex flex-col items-center justify-center max-w-full mt-10">
            <!-- name -->
            <div class="w-full">
              <h3
                class="max-w-full font-mono text-2xl font-bold text-center text-gray-900 truncate opacity-70 dark:text-gray-50"
              >
                {{ reciterName }}
              </h3>
              <div class="flex justify-center">
                <p class="max-w-full text-gray-500 truncate">
                  {{ chapter.english }}
                </p>
              </div>
            </div>
            <!-- timer -->
            <div class="flex justify-center items-center my-2">
              {{ mediaProgressFormatted }}
            </div>
            <!-- toggler -->
            <div class="flex gap-2">
              <UButton
                @click="toggleAudio"
                :icon="player.isPlaying ? 'i-heroicons-pause' : 'i-heroicons-play'"
                size="xl"
                :ui="{
                  rounded: 'rounded-full',
                }"
              ></UButton>
              <!--TODO: support aborting player later
                 <UButton
                @click="abortPlayer"
                icon="i-heroicons-stop"
                size="xl"
                variant="outline"
                :ui="{
                  rounded: 'rounded-full',
                }"
              ></UButton> -->
              <UButton
                :to="`/quran/chapter/${chapter.number}`"
                icon="i-heroicons-book-open"
                size="xl"
                variant="outline"
                :ui="{
                  rounded: 'rounded-full',
                }"
              ></UButton>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute inset-0 z-0 max-h-full overflow-hidden duration-300 opacity-50 pointer-events-none select-none blur-3xl"
      >
        <img
          :src="reciterPoster"
          alt="poster"
          class="w-full h-full scale-125 pointer-events-none select-none object-fit"
        />
        <div class="absolute inset-0 bg-white opacity-50 dark:bg-black"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { toggler } = defineProps<{
    toggler: () => void;
  }>();
  const chapter = useState<any>('ongoing-chapter', () => null);
  const player = useState<any>(`audio-${chapter.value?.number}`, () => null);
  const playerInfo = computed(() => player.value?.info?.[0]);
  const reciterName = computed(() => playerInfo.value?.reciterName);
  const reciterPoster = computed(() => playerInfo.value?.reciterPoster);
  const mediaProgressFormatted = useState<any>(
    `mediaProgressFormatted-${chapter.value?.number}`,
    () => '00:00/00:00'
  );
  //   const mediaProgressPercentage = useState<any>('mediaProgressPercentage', () => 0);
  //
  //   const mediaProgressInSeconds = useState<any>('mediaProgressInSeconds', () => 0);
  //
  //   const mediaProgressInMinutes = useState<any>('mediaProgressInMinutes', () => 0);
  const toggleAudio = () => {
    if (player.value) {
      player.value.toggle();
    }
  };

  /**
   * @todo: it has a bug, will back to support it later
   */
  // const abortPlayer = () => {
  //   if (player.value) {
  //     player.value.stop();
  //     toggleAudio();
  //     mediaProgressFormatted.value = '00:00/00:00';
  //     mediaProgressPercentage.value = 0;
  //     mediaProgressInSeconds.value = 0;
  //     mediaProgressInMinutes.value = 0;
  //   }
  // };
</script>
