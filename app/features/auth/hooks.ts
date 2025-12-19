import { getCurrentUser, refreshToken, signOut } from './api';
import type {
  GetCurrentUserResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, AxiosError, RefreshTokenRequest>({
    mutationFn: (data) => refreshToken(data),
  });
};

export const useGetCurrentUser = () => {
  return useQuery<GetCurrentUserResponse>({
    queryKey: ['current-user'],
    queryFn: () => getCurrentUser(),
    enabled: false,
  });
};
