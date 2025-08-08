import useApis from '../../../../../composables/use-apis';

export default defineEventHandler(async (event: any) => {
  const chapter_id = +event.context.params.chapter_id as number;

  const { CHAPTERS_INFO_API } = useApis();
  const urlAr = CHAPTERS_INFO_API(chapter_id);
  const urlEn = CHAPTERS_INFO_API(chapter_id, true);

  const resAr: any = await $fetch(urlAr);
  const resEn: any = await $fetch(urlEn);

  const res = {
    arabic: resAr.data,
    english: resEn.data,
  };

  const arAyah = res.arabic.ayahs;
  const enAyah = res.english.ayahs;

  // ayah:chapter

  return arAyah.map((ayah: any, index: number) => {
    return {
      verse_key: `${ayah.number}:${ayah.juz}`,
      verse_number: ayah.number,
      verse_arabic: ayah.text,
      verse_english: enAyah[index].text,
      sajda: ayah.sajda,
    };
  });
});
