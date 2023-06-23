<template>
  <div class="min-h-[80svh] flex justify-between">
    <!-- sidebar -->
    <div class="w-1/3 min-h-full border border-red-500 flex-shrink-0 pt-5">
      <AudioPlayer
        class="w-full"
        :id="route.params.id?.toString()"
        :audio-name="`Surah ${route.params.id}`"
        :reciter-name="recitation.name.en"
        :full-name="`Surah ${route.params.id} - ${recitation.name.en}`"
        :audio-url="audioUrl"
        :reciter-poster="recitation.poster"
        :player-info="{
          chapterId: route.params.id,
          reciterName: reciterName,
          reciterPoster: recitation.poster,
        }"
        play-in-the-background
        expandable
        fixed
      >
      </AudioPlayer>

      0. settings <br />
      1. play the whole chapter <br />
      2. play ayah by ayah (or in tooltip on click) <br />
      3. show the tafsir of the ayah
    </div>
    <!-- content -->
    <div class="w-3/4 min-h-full border-2 border-purple-300">
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAudioPlayerStore } from '~/stores/audio-player';
  const { locale } = useI18n();
  const route = useRoute();
  const useAudioPlayer = useAudioPlayerStore();

  const { hosari } = useQuranReciters();
  const chapterNumber = ref(+route.params.id);
  const recitation = hosari(chapterNumber.value);

  const reciterName = computed<string>(() => {
    //@ts-ignore
    return recitation.name?.[lng.value] as string;
  });

  const audioUrl = recitation.url;
  const playing = ref(false);

  const lng = computed<string>(() => {
    return locale.value as string;
  });

  const togglePlaying = (status: boolean) => {
    playing.value = status;
  };
  const foundAudio = (audio: any) => {
    console.log(audio);
  };
  const reinitPlayer = ref(false);

  onBeforeMount(() => {
    if (useAudioPlayer.audio) {
      Debug.log({}, '👀audio player is already playing');
      reinitPlayer.value = true;
    }
  });
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
