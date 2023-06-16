import useApis from '../../../composables/use-apis';
export default defineEventHandler(async (event) => {
  const { JUZS_API } = useApis();
  const url = JUZS_API();
  const res: any = await $fetch(url);

  return res.juzs.map((juz: any) => {
    const { verse_mapping, ...rest } = juz;
    return rest;
  });
});
