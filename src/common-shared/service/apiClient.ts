import axios from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/web";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  success?: boolean;
  message?: string;
  accessToken?: string;
};

export type AuthMeResponse = {
  message?: string;
  role?: string;
};

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let accessToken: string | null = null;
let refreshRequest: Promise<AuthResponse> | null = null;

const setAccessToken = (token?: string) => {
  accessToken = token || null;
};

const getAccessToken = () => accessToken;

const clearAccessToken = () => {
  accessToken = null;
};

const requestRefreshToken = async () => {
  const response = await client.get<AuthResponse>("/auth/refresh");
  return response.data;
};

client.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const statusCode = error.response?.status;
    const requestUrl = originalRequest?.url || "";
    const isAuthRequest =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/refresh") ||
      requestUrl.includes("/auth/logout");

    if (!originalRequest || statusCode !== 401 || originalRequest._retry || isAuthRequest) {
      throw error;
    }

    originalRequest._retry = true;

    try {
      if (!refreshRequest) {
        refreshRequest = requestRefreshToken().finally(() => {
          refreshRequest = null;
        });
      }

      const refreshed = await refreshRequest;
      setAccessToken(refreshed.accessToken);

      return client(originalRequest);
    } catch (refreshError) {
      clearAccessToken();
      throw refreshError;
    }
  },
);

export const login = async (payload: LoginPayload, config?: AxiosRequestConfig) => {
  const response = await client.post<AuthResponse>("/auth/login", payload, config);
  setAccessToken(response.data?.accessToken);
  return response.data;
};

export const isAuthenticated = () => client.get("/auth/is-autheticated");

export const getCurrentUser = () => client.get<AuthMeResponse>("/auth/me");

export const refreshToken = async () => {
  const data = await requestRefreshToken();
  setAccessToken(data.accessToken);
  return data;
};

export const logout = async () => {
  await client.post("/auth/logout");
  clearAccessToken();
};

export const api = {
  get: (endpoint: string, queryParams?: Record<string, any>, config?: AxiosRequestConfig) =>
    client.get(endpoint, { params: queryParams, ...config }),

  post: (endpoint: string, body?: any, config?: AxiosRequestConfig) =>
    client.post(endpoint, body, config),

  patch: (endpoint: string, body?: any, config?: AxiosRequestConfig) =>
    client.patch(endpoint, body, config),

  delete: (endpoint: string, body?: any, config?: AxiosRequestConfig) =>
    client.delete(endpoint, { data: body, ...config }),
};

export { clearAccessToken, getAccessToken, setAccessToken };