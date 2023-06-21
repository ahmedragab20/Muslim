<template>
  <div class="min-h-[80svh] flex justify-center flex-col gap-3">
    <div class="flex items-center gap-2">
      <div class="mb-1">Theme 1.</div>
      <!-- only toggler -->
      <AudioPlayer
        :audio-url="audioUrl"
        btn-only
        @audio-toggled="togglePlaying"
        @audio-found="foundAudio"
      >
      </AudioPlayer>
    </div>
    <div class="flex items-center gap-2">
      <div class="mb-1">Theme 2.</div>
      <!-- one line audio player -->
      <AudioPlayer
        :audio-name="`Surah ${route.params.id}`"
        :reciter-name="recitation.name.en"
        :audio-url="audioUrl"
        @audio-toggled="togglePlaying"
        @audio-found="foundAudio"
      >
      </AudioPlayer>
    </div>
    <div class="flex items-center gap-2 mt-4">
      <div class="mb-1">Theme 3.</div>
      <!-- expandable audio player -->
      <AudioPlayer
        :audio-name="`Surah ${route.params.id}`"
        :reciter-name="recitation.name.en"
        :full-name="`Surah ${route.params.id} - ${recitation.name.en}`"
        :audio-url="audioUrl"
        expandable
        @audio-toggled="togglePlaying"
        @audio-found="foundAudio"
      >
      </AudioPlayer>
    </div>
    <div class="flex items-center gap-2 mt-4">
      <div class="mb-1">Theme 4.</div>
      <!-- expandable audio player -->
      <AudioPlayer
        :audio-name="`Surah ${route.params.id}`"
        :reciter-name="recitation.name.en"
        :full-name="`Surah ${route.params.id} - ${recitation.name.en}`"
        :audio-url="audioUrl"
        :reciter-poster="recitation.poster"
        play-in-the-background
        expandable
        @audio-toggled="togglePlaying"
        @audio-found="foundAudio"
      >
      </AudioPlayer>
    </div>
    <div class="flex justify-center flex-col gap-2 mb-10">
      <div class="mb-1">Theme 5.</div>
      <!-- fully customizable -->
      <AudioPlayer
        :audio-url="audioUrl"
        @audio-found="foundAudio"
        @audio-toggled="togglePlaying"
        @audio-progress="() => {}"
        @audio-ended="() => {}"
        @audio-downloaded="() => {}"
        @audio-downloading="() => {}"
        @audio-error="() => {}"
        @audio-buffering="() => {}"
      >
        <UButton :icon="playing ? 'i-heroicons-pause' : 'i-heroicons-play'"></UButton>
      </AudioPlayer>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const { afasy } = useQuranReciters();
  const chapterNumber = ref(+route.params.id);
  const recitation = afasy(chapterNumber.value);
  const audioUrl = recitation.url;
  const playing = ref(false);
  const togglePlaying = (status: boolean) => {
    console.log(status);

    playing.value = status;
  };
  const foundAudio = (audio: any) => {
    console.log(audio);
  };
  /**
   * TODO: apply that in the quran index page
   */

  // TODO: make the timer with with minus sign (-12m)

  // TODO: Settings for the reading mode [text-size, list of reciters, tafsir, translation [list of languages], etc.]
  // TODO: Listen the whole chapter or download it [build an audio player for that]
  // TODO: Share button for each ayah
  // TODO: toggle between arabic and english
  // TODO: api call to get the surah:
  // en-> http://api.alquran.cloud/v1/surah/114/en.asad, ar: http://api.alquran.cloud/v1/surah/114
  // TODO: reciter: http://api.alquran.cloud/v1/surah/114/ar.alafasy
  // TODO: individual ayah tafsir: api.quran-tafseer.com/tafseer/{tafseer_id}/{sura_number}/{ayah_number} [on click]
  // TODO: individual page for the chapter tafsir: api.quran-tafseer.com/tafseer/{tafseer_id}/{sura_number}/{ayah_number_from}/{ayah_number_to} [fetch both apis and generate a list out of them]
  // TODO: [delay till firebase integration] add ayah to the bookmark list [localstorage] and give the user hint that you'll only taje advantage of the bookmark if you're using the app on the same device and the same browser
  // ?note: the tafsir is only gonna be available in arabic
  // UX:
  // TODO: click on the ayah to show a tooltip with the options possible for the ayah [tafsir]
  // ayah text api: http://api.alquran.cloud/v1/ayah/2:255/editions/quran-uthmani,en.asad
  // the tafsir displaied autonmatically depending on the selected tafsir and whether the user choosen to have the tafsir or not as well with the translation [ar only, en only, both]
  // TODO: surah container position should be based on the choice of the user [left, right, center] or side by side
</script>
