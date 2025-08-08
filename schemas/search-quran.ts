import { z } from 'zod';
export const searchQuranSchema = z.object({
  query: z.string(),
  total_results: z.number(),
  current_page: z.number(),
  total_pages: z.number(),
  results: z.array(z.any()),
});
