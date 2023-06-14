import { z } from 'zod';

export const dateSchema = z.object({
  day: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  month: z.object({
    number: z.number(),
    en: z.string(),
  }),
  year: z.string(),
});

export const hijriSchema = dateSchema;

export const rootSchema = z.object({
  hijri: hijriSchema,
});
