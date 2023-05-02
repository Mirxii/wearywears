import { z } from 'zod';

export const listingSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10).max(255),
  price: z.number().min(1),
  location: z.string().min(3).max(255),
  category: z.string().min(3).max(255),
  image: z.string().min(3).max(255),
  postedById: z.string().min(3).max(255),
});
