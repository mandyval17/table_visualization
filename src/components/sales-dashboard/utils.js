import { z } from 'zod';

export const saleSchema = z.object({
  date: z.date(),
  region: z.string().min(1),
  product: z.string().min(1),
  sales: z.number().min(0)
});