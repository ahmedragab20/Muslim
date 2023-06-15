// will keep this file accessible to everyone, in case someone else wanted to use the endpoints
import { Generics } from '../utils/generics'; // this will be running on the server, that's why i imported it here

export default () => {
  const HIJRI_DATE_API = (date: string) => {
    // date example: DD-MM-YYYY

    return `http://api.aladhan.com/v1/gToH/${date}`;
  };
  const SEARCH_QURAN_BY_TERM_API = (query: string) => {
    // query example: surah, ayah, juz, page

    https: return `https://api.quran.com/api/v4/search?q=${
      query || Generics.encodeArabicText(query)
    }&size=${100}&page=0`;
  };

  return {
    HIJRI_DATE_API,
    SEARCH_QURAN_BY_TERM_API,
  };
};
