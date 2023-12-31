import { z } from 'zod';
import {
  chapterRecitationSchema,
  chapterSchema,
  chaptersSchema,
  verseSchema,
} from '~/schemas/chapters';
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

  /**
   * @todo: play verse audio
   * @todo: copy verse
   */

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

  const fetchChapterInfo = async (chapter_id: number) => {
    try {
      const { data } = await useFetch(`/api/quran/chapter/chapter_verses/${chapter_id}`, {
        key: `chapter-info-${chapter_id}`,
        transform: (data) => z.array(verseSchema).parse(data),
      });

      return data.value;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Count not fetch Chapter info',
      });
    }
  };
  const fetchQuranRecitations = async (chapter_id: number) => {
    try {
      const { data } = await useFetch(`/api/quran/chapter/recitations/${chapter_id}`, {
        key: `recitation-${chapter_id}`,
        transform: (data) => z.array(chapterRecitationSchema).parse(data),
      });

      return data.value;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Count not fetch Chapter info',
      });
    }
  };

  return {
    fetchHijriDate,
    fetchQuranByTerm,
    fetchJuzs,
    fetchChapters,
    fetchChapter,
    fetchChapterInfo,
    fetchQuranRecitations,
  };
};
