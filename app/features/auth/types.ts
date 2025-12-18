import type { User } from '../user';
import { profileSchema } from './schema';
import z from 'zod';

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignOutRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export type GetCurrentUserResponse = User;
export type ProfileSchema = z.infer<typeof profileSchema>;
export type GetProfileResponse = GetCurrentUserResponse;
