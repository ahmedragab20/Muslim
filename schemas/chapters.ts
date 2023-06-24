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
  reciter_id: z.string(),
  number: z.number(),
  name: z.string(),
  englishName: z.string(),
  englishNameTranslation: z.string(),
  revelationType: z.string(),
  numberOfAyahs: z.number(),
  ayahs: z.array(Ayah),
});

export const verseSchema = z.object({
  verse_key: z.string(),
  verse_number: z.number(),
  verse_arabic: z.string(),
  verse_english: z.string(),
  sajda: z.boolean(),
});

export const chapterRecitationSchema = z.object({
  name: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  type: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  url: z.string(),
  poster: z.string(),
  reciter_id: z.string(),
});
