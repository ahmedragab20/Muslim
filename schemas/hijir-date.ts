import { z } from 'zod';

export const dateSchema = z.object({
  day: z.object({
    dayNumber: z.string(),
    en: z.string(),
    ar: z.string(),
  }),
  month: z.object({
    number: z.number(),
    en: z.string(),
    ar: z.string(),
  }),
  year: z.string(),
});
