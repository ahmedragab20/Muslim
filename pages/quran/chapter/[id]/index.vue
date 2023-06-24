<template>
  <div class="min-h-[80svh] flex justify-between flex-wrap sm:flex-nowrap">
    <!-- sidebar -->
    <div class="sm:w-1/3 w-full min-h-full flex-shrink-0 pt-5">
      <div v-if="selectedReciter">
        <AudioPlayer
          :key="audioUrl"
          class="w-full"
          :id="route.params.id?.toString()"
          :audio-name="`${$t('chapter')} ${chapter?.number}`"
          :reciter-name="reciterName"
          :full-name="`${surahName}`"
          :details="getRecitationType(selectedReciter)"
          :audio-url="audioUrl"
          :reciter-poster="selectedReciter!.poster"
          :player-info="{
            chapterId: route.params.id,
            reciterName: reciterName,
            reciterPoster: selectedReciter!.poster,
          }"
          play-in-the-background
          expandable
          fixed
        >
          <template #side-icon>
            <div @click="toggleRecitersModal" class="flex items-center -translate-x-1.5">
              <UIcon name="i-heroicons-microphone" />
              <UKbd class="hidden sm:flex">L</UKbd>
            </div>
          </template>
        </AudioPlayer>
      </div>

      <div>
        <div class="px-0.5">
          {{ $t('text-size') }}
        </div>
        <USelectMenu v-model="selectedTextSize" :options="textSizes.map((i) => i.name)" />
      </div>
    </div>
    <!-- content -->
    <div class="sm:w-3/4 w-full min-h-full sm:px-5 rounded-xl">
      <div class="flex gap-2 items-center pb-2">
        <!-- title -->
        <div class="font-bold text-gray-700 dark:text-gray-300">
          <div v-if="locale === 'ar'" dir="rtl" class="font-quranic text-3xl">
            {{ chapter?.arabicWithTashkeel }}
          </div>
          <div v-else-if="locale === 'en'" dir="ltr" class="font-mono flex items-end gap-1">
            <div class="text-2xl">
              {{ chapter?.english }}
            </div>
            <small class="pb-0.5">
              {{ chapter?.englishTranslated }}
            </small>
          </div>
        </div>
      </div>
      <template v-if="chapterVerses.length">
        <div
          v-for="verse in chapterVerses"
          :key="verse.verse_key"
          class="py-2 border-t border-gray-600 dark:border-gray-500 text-gray-700 dark:text-gray-300"
          :class="menuSelectedTextSize?.value"
        >
          <div v-if="locale === 'en'" dir="ltr">
            {{ verse.verse_english }}
          </div>
          <div dir="rtl" class="font-quranic">
            {{ verse.verse_arabic }}
          </div>
          <div class="mt-1 flex justify-end">
            <!--? I have to roll this back as the both apis (search & chapter verses) don't match. -->
            <!--
            <div>
              <AudioPlayer
                class="w-8 h-8"
                :key="verse?.verse_key"
                :id="verse?.verse_key"
                :audio-url="audioUrl"
                :meta-logic="[
                  {
                    fn: reciteAyah,
                    args: [verse],
                  },
                ]"
                :player-info="[
                  {
                    verse_key: verse?.verse_key,
                  },
                ]"
                btn-only
              >
              </AudioPlayer>
            </div>
            -->
            <div class="flex items-end">
              <div class="bg-gray-100 text-sm dark:bg-gray-800 px-1 rounded-lg shadow-sm">
                {{ verse.verse_key }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex justify-center items-center">
          <AppSpinner />
        </div>
      </template>
    </div>
  </div>
  <UModal v-model="recitersModal">
    <UCard>
      <template #header>
        <div class="text-lg text-start rtl:text-xl">
          {{ $t('reciters') }}
        </div>
      </template>
      <div>
        <template v-if="recitations?.length">
          <div v-for="(recitation, i) in recitations" :key="i">
            <div
              class="mb-3 overflow-auto p-2 rounded-xl cursor-pointer select-none text-start"
              @click="selectReciter(recitation)"
              :class="{
                'bg-gray-100 dark:bg-gray-800':
                  recitation.reciter_id === selectedReciter?.reciter_id,
              }"
            >
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 rounded-full overflow-hidden">
                  <img :src="recitation.poster" alt="reciter poster" />
                </div>
                <div>
                  <div class="font-bold">
                    {{ getReciterName(recitation) }}
                  </div>
                  <div class="text-sm text-gray-500 -mt-1.5">
                    {{ getRecitationType(recitation) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import { Chapter, Reciter, Verse } from '~/types/server-schemas/Chapter';
  interface PlayedAyah {
    ayah_key: string;
    audioUrl: string;
  }

  const { locale, t } = useI18n();
  const route = useRoute();
  const chapterNumber = ref(+route.params.id);

  const audioUrl = ref();
  const lng = computed<string>(() => {
    return locale.value as string;
  });

  const surahName = computed<string>(() => {
    return lng.value === 'ar'
      ? `${chapter.value?.arabic}`
      : `${chapter.value?.english} - ${chapter.value?.englishTranslated}`;
  });
  const chapterVerses = ref<Verse[]>([]);
  const fetchChapterInfo = async () => {
    const { fetchChapterInfo } = useFetchApis();

    const chapterInfo = await fetchChapterInfo(chapterNumber.value);

    chapterVerses.value = chapterInfo as Verse[];
  };
  const chapter = ref<Chapter>();
  const getChapter = async () => {
    try {
      const { fetchChapter } = useFetchApis();
      const res = await fetchChapter(chapterNumber.value);

      chapter.value = res.value as Chapter;
    } catch (error) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Chapter not found',
      });
    }
  };

  const recitations = ref<Reciter[]>();
  const fetchQuranRecitations = async () => {
    try {
      const { fetchQuranRecitations } = useFetchApis();
      const res = await fetchQuranRecitations(chapterNumber.value);

      recitations.value = res as Reciter[];

      if (recitations.value.length) {
        selectReciter(recitations.value[0]);
      }
    } catch (error) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Chapter not found',
      });
    }
  };

  // ongoing recitation
  const player = useState<any>(`audio-${chapterNumber.value}`, () => null);
  const mediaProgressPercentage = useState<any>(
    `mediaProgressPercentage-${chapterNumber.value}`,
    () => 0
  );

  const mediaProgressInSeconds = useState<any>(
    `mediaProgressInSeconds-${chapterNumber.value}`,
    () => 0
  );

  const mediaProgressInMinutes = useState<any>(
    `mediaProgressInMinutes-${chapterNumber.value}`,
    () => 0
  );

  const mediaProgressFormatted = useState<any>(
    `mediaProgressFormatted-${chapterNumber.value}`,
    () => '00:00/00:00'
  );

  const selectedReciter = ref<Reciter>();
  const selectReciter = (reciter: Reciter) => {
    if (!reciter || selectedReciter.value?.reciter_id === reciter.reciter_id) return;

    selectedReciter.value = reciter;
    audioUrl.value = reciter.url;
    recitersModal.value = false;
    if (player.value) {
      player.value.stop();
      player.value = null;
      mediaProgressPercentage.value = 0;
      mediaProgressInSeconds.value = 0;
      mediaProgressInMinutes.value = 0;
      mediaProgressFormatted.value = '00:00/00:00';
    }
  };

  const reciterName = computed<string>(() => {
    // @ts-ignore
    return selectedReciter.value.name?.[lng.value] as string;
  });
  const getReciterName = (reciter: Reciter) => {
    return lng.value === 'ar' ? `${reciter.name?.ar}` : `${reciter.name?.en}`;
  };
  const getRecitationType = (reciter: Reciter) => {
    return lng.value === 'ar' ? `${reciter.type?.ar}` : `${reciter.type?.en}`;
  };
  const playedAyat = ref<PlayedAyah[]>([]);
  const reciteAyah = async (verse: any) => {
    const ayah_key = verse?.verse_key;
    const storedAyah = playedAyat.value.find((ayah) => ayah.ayah_key === ayah_key);
    if (storedAyah) {
      audioUrl.value = storedAyah.audioUrl;
      return;
    }

    const baseURL = 'https://verses.quran.com/';
    const { AYAH_RECITATION_API } = useApis();

    try {
      // Fetch the audio URL for the given ayah_key
      const ayah: any = await $fetch(AYAH_RECITATION_API(ayah_key));

      if (ayah) {
        const key = ayah?.audio_files?.[0]?.url;
        audioUrl.value = `${baseURL}${key}`;
        playedAyat.value.push({
          ayah_key,
          audioUrl: `${baseURL}${key}`,
        });
      }
    } catch (error) {
      // Throw an error if there's an issue getting the audio URL
      throw createError({
        statusCode: 500,
        statusMessage: 'error to get audio url',
      });
    }
  };

  const textSizes = ref([
    {
      name: t('text-sizes.small'),
      value: 'text-sm',
    },
    {
      name: t('text-sizes.medium'),
      value: 'text-lg',
    },
    {
      name: t('text-sizes.large'),
      value: 'text-xl',
    },
    {
      name: t('text-sizes.x-large'),
      value: 'text-2xl',
    },
    {
      name: t('text-sizes.xx-large'),
      value: 'text-3xl',
    },
  ]);

  const selectedTextSize = ref<string>(t('text-sizes.medium'));
  const menuSelectedTextSize = computed(() => {
    return textSizes.value.find((size) => size.name === selectedTextSize.value);
  });

  const recitersModal = ref(false);
  const toggleRecitersModal = () => {
    recitersModal.value = !recitersModal.value;
  };

  Promise.all([fetchChapterInfo(), getChapter(), fetchQuranRecitations()]);

  defineShortcuts({
    L: {
      usingInput: false,
      handler: () => toggleRecitersModal(),
    },
  });
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
