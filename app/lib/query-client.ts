import { QueryClient } from '@tanstack/react-query';
import axios, { type AxiosResponse } from 'axios';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const { data } = error.response as AxiosResponse<{
            message: string;
          }>;

          if (data.message) {
            toast.error(data.message);
          } else {
            toast.error('Something went wrong');
          }
        } else {
          toast.error('Something went wrong');
        }
      },
    },
  },
});
