import quran from '~/db/quran.json';
import { Chapter } from '~/types/server-schemas/Chapter';
export const useChapters = () => {
  return quran.chapters as Chapter[];
};
