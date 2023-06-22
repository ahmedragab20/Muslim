<template>
  <div class="h-[100svh] w-full backdrop-blur-sm">
    <div
      class="p-3 w-full rounded-b-3xl relative 2xl:min-h-[300px] min-h-[50svh] z-10 flex justify-center items-center"
    >
      <!-- Add overlay -->
      <div class="container absolute inset-0 z-10 flex items-center justify-center mx-auto">
        <div class="flex flex-col items-center justify-center w-full sm:max-w-[400px]">
          <!-- poster -->
          <div
            class="sm:w-[210px] w-[170px] sm:h-[210px] h-[170px] pointer-events-none select-none"
          >
            <img
              src="/reciters/Abdelbasset-abdessamad.jpeg"
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
                Abdul Basit Abdul Samad
              </h3>
              <div class="flex justify-center mb-2">
                <p class="max-w-full text-gray-500 truncate">Al-Fātiĥah</p>
              </div>
            </div>
            <!-- toggler -->
            <div class="flex gap-2">
              <UButton
                icon="i-heroicons-play"
                size="xl"
                :ui="{
                  rounded: 'rounded-full',
                }"
              ></UButton>
              <UButton
                icon="i-heroicons-book-open"
                size="xl"
                variant="soft"
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
          src="/reciters/Abdelbasset-abdessamad.jpeg"
          alt="poster"
          class="w-full h-full scale-125 pointer-events-none select-none object-fit"
        />
        <div class="absolute inset-0 bg-white opacity-50 dark:bg-black"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  /**
   * @todo add audio player store
   * @todo add toggler prop
   */
</script>
