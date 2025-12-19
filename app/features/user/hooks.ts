import { getProfile, updateProfile } from './api';
import type { GetProfileResponse, ProfileSchema } from './types';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { queryClient } from '~/lib/query-client';

export const useGetProfile = () => {
  return useQuery<GetProfileResponse>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
};

export const useUpdateProfile = () => {
  return useMutation<unknown, AxiosError, ProfileSchema>({
    mutationFn: (data) => updateProfile(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
      void queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
