import type { User } from '../user';

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export type GetCurrentUserResponse = Pick<
  User,
  'id' | 'email' | 'name' | 'avatarUrl'
>;
