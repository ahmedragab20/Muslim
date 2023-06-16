import { z } from 'zod';

export const juz = z.object({
  id: z.number(),
  juz_number: z.number(),
  first_verse_id: z.number(),
  last_verse_id: z.number(),
  verses_count: z.number(),
});

export const juzsSchema = z.array(juz);
