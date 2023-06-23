import { z } from 'zod';

export const chapterSchema = z.object({
  number: z.number(),
  arabic: z.string(),
  arabicWithTashkeel: z.string(),
  english: z.string(),
  englishTranslated: z.string(),
});

export const chaptersSchema = z.array(chapterSchema);

export const Ayah = z.object({
  number: z.number(),
  text: z.string(),
  numberInSurah: z.number(),
  juz: z.number(),
  manzil: z.number(),
  page: z.number(),
  ruku: z.number(),
  hizbQuarter: z.number(),
  sajda: z.boolean(),
});

export const chapterInfoSchema = z.object({
  number: z.number(),
  name: z.string(),
  englishName: z.string(),
  englishNameTranslation: z.string(),
  revelationType: z.string(),
  numberOfAyahs: z.number(),
  ayahs: z.array(Ayah),
});
