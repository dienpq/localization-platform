import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';
import { ENVIRONMENTS } from '~/config/enviroments';
import { PAGE_ROUTES } from '~/constants/routes';
import { AUTH_ENDPOINTS, type RefreshTokenResponse } from '~/features/auth';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
}

const cookies = new Cookies();

const api = axios.create({
  baseURL: ENVIRONMENTS.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

function toError(err: unknown): Error {
  return err instanceof Error ? err : new Error('Unknown error');
}

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = cookies.get('accessToken') as string | undefined;
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(toError(error)),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== 'undefined'
    ) {
      if (window.location.pathname === PAGE_ROUTES.AUTH.LOGIN) {
        return Promise.reject(toError(error));
      }

      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (!token) throw new Error('No access token');
          originalRequest.headers ??= {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post<RefreshTokenResponse>(
          `${ENVIRONMENTS.API_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`,
          {
            refreshToken: cookies.get('refreshToken') as string | undefined,
          },
        );

        const newAccessToken = refreshResponse.data.accessToken;

        cookies.set('accessToken', newAccessToken);

        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers ??= {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return await api(originalRequest);
      } catch (refreshErr) {
        const safeError = toError(refreshErr);

        processQueue(safeError, null);
        isRefreshing = false;

        cookies.remove('accessToken');
        cookies.remove('refreshToken');

        window.location.href = PAGE_ROUTES.AUTH.LOGIN;

        return Promise.reject(safeError);
      }
    }

    return Promise.reject(toError(error));
  },
);

export default api;
