<template>
  <div class="min-h-[80svh] flex justify-between">
    <!-- sidebar -->
    <div class="sm:w-1/3 w-full min-h-full flex-shrink-0 pt-5">
      <div>
        <AudioPlayer
          class="w-full"
          :id="route.params.id?.toString()"
          :audio-name="`${$t('chapter')} ${chapter?.number}`"
          :reciter-name="reciterName"
          :full-name="`${surahName}`"
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
          <template #side-icon>
            <UIcon @click="toggleRecitersModal" name="i-heroicons-microphone" />
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
          <div class="bg-gray-100 text-sm dark:bg-gray-800 px-1 rounded-lg shadow-sm">
            {{ verse.verse_key }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <UModal v-model="recitersModal">
    <UCard>
      <template #header>
        <div class="text-lg">
          {{ $t('reciters') }}
        </div>
      </template>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, perspiciatis, ipsum nihil
      veritatis aliquam dolorem blanditiis id a sit dolorum inventore nostrum pariatur corporis iste
      dolores! Exercitationem impedit corrupti architecto!
      <template #footer>
        <div>
          <UButton @click="toggleRecitersModal" variant="soft" class="px-5">
            {{ $t('settings.apply') }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import { useAudioPlayerStore } from '~/stores/audio-player';
  import { Chapter, Verse } from '~/types/server-schemas/Chapter';
  const { locale, t } = useI18n();
  const route = useRoute();
  const useAudioPlayer = useAudioPlayerStore();

  const { hosari } = useQuranReciters();
  const chapterNumber = ref(+route.params.id);
  const recitation = hosari(chapterNumber.value);

  const reciterName = computed<string>(() => {
    // @ts-ignore
    return recitation.name?.[lng.value] as string;
  });

  const audioUrl = recitation.url;

  const lng = computed<string>(() => {
    return locale.value as string;
  });

  const surahName = computed<string>(() => {
    return lng.value === 'ar'
      ? `${chapter.value?.arabic}`
      : `${chapter.value?.english} - ${chapter.value?.englishTranslated}`;
  });
  const reinitPlayer = ref(false);
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

  onBeforeMount(() => {
    if (useAudioPlayer.audio) {
      Debug.log({}, '👀audio player is already playing');
      reinitPlayer.value = true;
    }
  });

  Promise.all([fetchChapterInfo(), getChapter()]);

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
