import z from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().optional(),
});
