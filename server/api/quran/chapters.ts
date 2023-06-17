import useApis from '../../../composables/use-apis';

export default defineEventHandler(async (event) => {
  const { CHAPTERS_API } = useApis();
  const url = CHAPTERS_API();
  const res: any = await $fetch(url);

  return res?.chapters;
});
