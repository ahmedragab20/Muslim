import useQuranReciters from '../../../../../composables/use-quran-reciters';
export default defineEventHandler((event: any) => {
  const chapter_id = +event.context.params.chapter_id;
  const recitations: any = useQuranReciters();

  return Object.keys(recitations).map((reciter: any) => {
    return recitations[reciter](chapter_id);
  });
});
