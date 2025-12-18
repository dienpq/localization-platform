/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { ENVIRONMENTS } from '~/config/enviroments';
import { PAGE_ROUTES } from '~/constants/routes';
import { AUTH_ENDPOINTS, type RefreshTokenResponse } from '~/features/auth';

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
let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = cookies.get('accessToken');
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== 'undefined'
    ) {
      if (window.location.pathname === PAGE_ROUTES.AUTH.LOGIN) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err: unknown) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post<RefreshTokenResponse>(
          `${ENVIRONMENTS.API_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`,
          {
            refreshToken: cookies.get('refreshToken'),
          },
        );

        const { accessToken: newAccessToken } = refreshResponse.data;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        cookies.set('accessToken', newAccessToken);

        processQueue(null, newAccessToken);
        isRefreshing = false;

        return await api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        cookies.remove('accessToken');
        cookies.remove('refreshToken');

        if (window.location.pathname !== PAGE_ROUTES.AUTH.LOGIN) {
          window.location.href = PAGE_ROUTES.AUTH.LOGIN;
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
