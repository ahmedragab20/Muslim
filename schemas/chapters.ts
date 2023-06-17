import { z } from 'zod';

export const QuranSurahSchema = z.object({
  id: z.number(),
  revelation_place: z.string(),
  revelation_order: z.number(),
  bismillah_pre: z.boolean(),
  name_simple: z.string(),
  name_complex: z.string(),
  name_arabic: z.string(),
  verses_count: z.number(),
  pages: z.array(z.number()),
  translated_name: z.object({
    language_name: z.string(),
    name: z.string(),
  }),
});

export const QuranSurahsSchema = z.array(QuranSurahSchema);
