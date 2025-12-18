import {
  getCurrentUser,
  getProfile,
  refreshToken,
  signInWithGoogle,
  updateProfile,
} from './api';
import type {
  GetCurrentUserResponse,
  GetProfileResponse,
  ProfileSchema,
  RefreshTokenResponse,
  SignInResponse,
} from './types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { queryClient } from '~/lib/query-client';

export const useSignInWithGoogle = () => {
  return useMutation<SignInResponse, AxiosError>({
    mutationFn: () => signInWithGoogle(),
  });
};

export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, AxiosError, { accessToken: string }>(
    {
      mutationFn: (data) => refreshToken(data.accessToken),
    },
  );
};

export const useGetCurrentUser = () => {
  return useQuery<GetCurrentUserResponse>({
    queryKey: ['current-user'],
    queryFn: () => getCurrentUser(),
    enabled: false,
  });
};

export const useGetProfile = () => {
  return useQuery<GetProfileResponse>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
};

export const useUpdateProfile = () => {
  return useMutation<unknown, AxiosError, ProfileSchema>({
    mutationFn: (data: ProfileSchema) => updateProfile(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
      void queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
