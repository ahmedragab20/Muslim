import { useChapters } from './../../../composables/use-chapters';
export default defineEventHandler(async (event) => {
  const chapters = useChapters();

  if (!chapters) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Chapters not found',
    });
  } else {
    return chapters;
  }
});
