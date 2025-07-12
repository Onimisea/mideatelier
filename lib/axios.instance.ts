import { authStore } from "@/stores/auth.store";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// Types
interface StandardError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

interface ErrorResponse {
  message: string;
  statusCode?: number;
  code?: string;
  details?: any;
}

// Configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 30000,
  maxRetries: 3,
  retryDelay: 1000,
};

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Retry mechanism
const requestRetryMap = new Map<string, number>();

const generateRequestKey = (config: AxiosRequestConfig): string => {
  // Create a more reliable request key
  const method = config.method?.toUpperCase() || "GET";
  const url = config.url || "";
  const params = config.params
    ? JSON.stringify(config.params, Object.keys(config.params).sort())
    : "";
  return `${method}:${url}:${params}`;
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = authStore.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
        {
          headers: config.headers,
          data: config.data,
        }
      );
    }

    return config;
  },
  (error: AxiosError) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[API Request Error]", error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Clear retry counter on successful request
    const requestKey = generateRequestKey(response.config);
    requestRetryMap.delete(requestKey);

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[API Response] ${
          response.status
        } ${response.config.method?.toUpperCase()} ${response.config.url}`,
        response.data
      );
    }

    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config;

    if (process.env.NODE_ENV === "development") {
      console.error("[API Response Error]", {
        status: error.response?.status,
        message: error.response?.data?.message,
        url: originalRequest?.url,
      });
    }

    if (!originalRequest) {
      return Promise.reject(createStandardError(error));
    }

    const requestKey = generateRequestKey(originalRequest);

    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401) {
      const retryCount = requestRetryMap.get(requestKey) || 0;

      if (retryCount < API_CONFIG.maxRetries) {
        requestRetryMap.set(requestKey, retryCount + 1);

        try {
          // Attempt to refresh token using Zustand store
          const newToken = await authStore.refreshAccessToken();

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Token refresh failed - clear tokens and redirect to login
          requestRetryMap.delete(requestKey);
          authStore.clearTokens();

          if (process.env.NODE_ENV === "development") {
            console.error("[Token Refresh Failed]", refreshError);
          }

          // Emit logout event for the application to handle
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("auth:logout", {
                detail: { reason: "token_refresh_failed", error: refreshError },
              })
            );
          }

          return Promise.reject(createStandardError(error));
        }
      }
    }

    // Handle other retryable errors (network errors, 5xx errors)
    if (shouldRetryRequest(error)) {
      const retryCount = requestRetryMap.get(requestKey) || 0;

      if (retryCount < API_CONFIG.maxRetries) {
        requestRetryMap.set(requestKey, retryCount + 1);

        // Exponential backoff
        const delay = API_CONFIG.retryDelay * Math.pow(2, retryCount);
        await sleep(delay);

        return axiosInstance(originalRequest);
      }
    }

    // Clear retry counter and reject
    requestRetryMap.delete(requestKey);
    return Promise.reject(createStandardError(error));
  }
);

// Helper functions
const shouldRetryRequest = (error: AxiosError): boolean => {
  // Retry on network errors or 5xx server errors
  if (!error.response) return true; // Network error
  if (error.response.status >= 500) return true; // Server error
  if (error.response.status === 408) return true; // Request timeout
  if (error.response.status === 429) return true; // Rate limit
  return false;
};

const createStandardError = (
  error: AxiosError<ErrorResponse>
): StandardError => {
  if (error.response) {
    return {
      message:
        error.response.data?.message ||
        error.message ||
        "Server error occurred",
      status: error.response.status,
      code: error.response.data?.code,
      details: error.response.data?.details,
    };
  }

  if (error.request) {
    return {
      message: "Network error - unable to reach server",
      status: 0,
      code: "NETWORK_ERROR",
    };
  }

  return {
    message: error.message || "An unexpected error occurred",
    status: 0,
    code: "UNKNOWN_ERROR",
  };
};

// Export enhanced API methods with proper typing
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.get<T>(url, config).then((response) => response.data);
  },

  post: <T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosInstance
      .post<T>(url, data, config)
      .then((response) => response.data);
  },

  put: <T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosInstance
      .put<T>(url, data, config)
      .then((response) => response.data);
  },

  patch: <T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosInstance
      .patch<T>(url, data, config)
      .then((response) => response.data);
  },

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance
      .delete<T>(url, config)
      .then((response) => response.data);
  },
};

// Export types
export type { StandardError };

// Export axios instance for direct use if needed
export default axiosInstance;
