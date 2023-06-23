import { chapterSchema, chaptersSchema } from '~/schemas/chapters';
import { dateSchema } from '~/schemas/hijir-date';
import { juzsSchema } from '~/schemas/juzs';
import { searchQuranSchema } from '~/schemas/search-quran';
export default () => {
  const fetchHijriDate = () => {
    try {
      const { data: date } = useLazyFetch('/api/hijri-date', {
        transform: (data) => dateSchema.parse(data),
      });

      return date;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Count not fetch data',
      });
    }
  };
  const fetchQuranByTerm = async (term: string, page?: number, size?: number) => {
    try {
      const results = await $fetch(`/api/search-quran`, {
        params: {
          query: term,
          page: page! || 0,
          size: size! || 5,
        },
      });

      return searchQuranSchema.parse(results);
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Count not fetch data',
      });
    }
  };

  const fetchJuzs = async () => {
    try {
      const { data } = await useFetch('/api/quran/juzs', {
        transform: (data) => juzsSchema.parse(data),
      });

      return data.value;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Count not fetch Juz data',
      });
    }
  };

  const fetchChapters = async () => {
    try {
      const { data } = await useFetch('/api/quran/chapters', {
        key: 'chapters',
        transform: (data) => chaptersSchema.parse(data),
      });

      return data.value;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Count not fetch Chapter data',
      });
    }
  };

  const fetchChapter = async (chapter_id: number) => {
    try {
      const { data } = await useFetch(`/api/quran/chapter/${chapter_id}`, {
        key: `chapter-${chapter_id}`,
        transform: (data) => chapterSchema.parse(data),
      });

      return data;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Count not fetch Chapter data',
      });
    }
  };

  return {
    fetchHijriDate,
    fetchQuranByTerm,
    fetchJuzs,
    fetchChapters,
    fetchChapter,
  };
};
