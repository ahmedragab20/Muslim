import useApis from '../../../composables/use-apis';
interface Params {
  term: string;
}

export default defineEventHandler(async (event) => {
  //@ts-ignore
  const { term } = event.context.params as Params;

  const { SEARCH_QURAN_BY_TERM_API } = useApis();

  const url = SEARCH_QURAN_BY_TERM_API(term);
  const response = await $fetch(url);

  console.log(response);

  //@ts-ignore
  return response.search || [];
});
