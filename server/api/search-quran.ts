import useApis from '../../composables/use-apis';

export default defineEventHandler(async (event) => {
  const searchParams = new URLSearchParams(event.req.url);

  // const q = searchParams.get('query');
  const pageNumber = searchParams.get('page');
  const pageSize = searchParams.get('size');
  // Extract the query string from the URL
  const queryString = event.req.url?.split('?')[1];

  // Split the query string into an array of key-value pairs
  const queryParams = queryString?.split('&');

  // Initialize a variable to store the value of the "q" parameter
  let qValue = null;

  // Iterate through the query parameters
  for (const param of queryParams!) {
    const [key, value] = param.split('=');

    // Check if the parameter key is "q"
    if (key === 'query') {
      qValue = value;
      break;
    }
  }

  const { SEARCH_QURAN_BY_TERM_API } = useApis();

  const url = SEARCH_QURAN_BY_TERM_API(qValue!, +pageNumber!, +pageSize!);
  const response = await $fetch(url);

  //@ts-ignore
  return response.search || [];
});
