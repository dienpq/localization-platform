import { USER_ENDPOINTS } from './enpoints';
import type { GetProfileResponse, ProfileSchema } from './types';
import api from '~/config/api';

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api.get<GetProfileResponse>(
    USER_ENDPOINTS.PROFILE.GET,
  );
  return response.data;
}

export async function updateProfile(data: ProfileSchema): Promise<void> {
  await api.put(USER_ENDPOINTS.PROFILE.UPDATE, data);
}
