// will keep this file accessible to everyone, in case someone else wanted to use the endpoints
import { Generics } from '../utils/generics'; // this will be running on the server, that's why i imported it here

export default () => {
  const HIJRI_DATE_API = (date: string) => {
    // date example: DD-MM-YYYY

    return `http://api.aladhan.com/v1/gToH/${date}`;
  };
  const SEARCH_QURAN_BY_TERM_API = (query: string, page?: number, size?: number) => {
    return `https://api.quran.com/api/v4/search?q=${Generics.encodeArabicText(query)}&page=${
      page! || 0
    }&size=${size! || 5}`;
  };
  const AYAH_RECITATION_API = (ayah_key: string) => {
    //TODO: in the future, give the user ability to pick from list of reciters.
    return `https://api.quran.com/api/v4/recitations/2/by_ayah/${ayah_key}`;
  };
  const JUZS_API = () => {
    return `https://api.quran.com/api/v4/juzs`;
  };
  const CHAPTERS_API = () => {
    return `https://api.quran.com/api/v4/chapters`;
  };

  return {
    HIJRI_DATE_API,
    SEARCH_QURAN_BY_TERM_API,
    AYAH_RECITATION_API,
    JUZS_API,
    CHAPTERS_API,
  };
};
