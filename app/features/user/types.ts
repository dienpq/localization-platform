import type { profileSchema } from './schema';
import type z from 'zod';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProfileSchema = z.infer<typeof profileSchema>;
export type GetProfileResponse = User;
