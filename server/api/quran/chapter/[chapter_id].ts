import { useChapters } from './../../../../composables/use-chapters';
import { Chapter } from './../../../../types/server-schemas/Chapter.d';
export default defineEventHandler((event: any) => {
  const chapter_id = +event.context.params.chapter_id;
  const chapters = useChapters();
  const chapter = chapters.find((chapter: Chapter) => chapter.number === chapter_id);

  if (!chapter) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Chapter not found',
    });
  } else {
    return chapter;
  }
});
