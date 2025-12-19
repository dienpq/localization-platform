import { AUTH_ENDPOINTS } from './enpoints';
import type {
  GetCurrentUserResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './types';
import api from '~/config/api';

export async function signOut(): Promise<void> {
  await api.post(AUTH_ENDPOINTS.SIGN_OUT);
}

export async function refreshToken(
  data: RefreshTokenRequest,
): Promise<RefreshTokenResponse> {
  const response = await api.post<RefreshTokenResponse>(
    AUTH_ENDPOINTS.REFRESH_TOKEN,
    data,
  );
  return response.data;
}

export async function getCurrentUser(): Promise<GetCurrentUserResponse> {
  const response = await api.get<GetCurrentUserResponse>(AUTH_ENDPOINTS.ME);
  return response.data;
}
