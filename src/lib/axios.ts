import { env } from '@/lib/env'
import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

api.defaults.withCredentials = true

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Substitua com a forma que você armazena o token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (isAxiosError(error) && error?.request && error?.request?.responseText) {
      try {
        const errorMessage = JSON.parse(error.request.responseText).error;
        return Promise.reject(new Error(errorMessage));
      } catch (parseError) {
        return Promise.reject(new Error('Failed to parse error message.'));
      }
    }
    return Promise.reject(error);
  }
);

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(env.VITE_ENABLE_API_DELAY)),
    )

    return config
  })
}
