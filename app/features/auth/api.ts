import { AUTH_ENDPOINTS } from './enpoints';
import type {
  GetCurrentUserResponse,
  GetProfileResponse,
  ProfileSchema,
  RefreshTokenResponse,
  SignInResponse,
} from './types';
import api from '~/config/api';

export async function signInWithGoogle(): Promise<SignInResponse> {
  const response = await api.post<SignInResponse>(AUTH_ENDPOINTS.SIGN_IN);
  return response.data;
}

export async function refreshToken(
  accessToken: string,
): Promise<RefreshTokenResponse> {
  const response = await api.post<RefreshTokenResponse>(
    AUTH_ENDPOINTS.REFRESH_TOKEN,
    {
      accessToken,
    },
  );
  return response.data;
}

export async function getCurrentUser(): Promise<GetCurrentUserResponse> {
  const response = await api.get<GetCurrentUserResponse>(AUTH_ENDPOINTS.ME);
  return response.data;
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api.get<GetProfileResponse>(
    AUTH_ENDPOINTS.PROFILE.GET,
  );
  return response.data;
}

export async function updateProfile(data: ProfileSchema): Promise<void> {
  await api.put(AUTH_ENDPOINTS.PROFILE.UPDATE, data);
}
