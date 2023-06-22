import { z } from 'zod';

export const chapterSchema = z.object({
  number: z.number(),
  arabic: z.string(),
  arabicWithTashkeel: z.string(),
  english: z.string(),
  englishTranslated: z.string(),
});

export const chaptersSchema = z.array(chapterSchema);
