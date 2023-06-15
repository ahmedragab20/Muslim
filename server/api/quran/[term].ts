import useApis from '../../../composables/use-apis';
interface Params {
  term: string;
}

export default defineEventHandler((event) => {
  //@ts-ignore
  const { term } = event.context.params as Params;

  const { SEARCH_QURAN_BY_TERM_API } = useApis();

  const url = SEARCH_QURAN_BY_TERM_API(term);

  return $fetch(url);
});
