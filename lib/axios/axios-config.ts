import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError, ApiErrorCode, ApiResponse, HttpStatus } from "./types";
import { env } from "../env";
import { useAppStore } from "@/store";

// Create custom Axios instance
const createApiClient = (): AxiosInstance => {
  const baseURL = env.NEXT_PUBLIC_API_URL;

  function getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  }

  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Request interceptor - Add auth token if available
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const csrfToken = getCookie("csrftoken");

      if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
      }

      // Get auth token from Zustand store
      const authToken = useAppStore.getState().authToken;

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;

        // console.log("🔐 API Request - Adding auth token:", {
        //   url: config.url,
        //   method: config.method?.toUpperCase(),
        //   hasToken: true,
        //   timestamp: new Date().toISOString(),
        // });
      } else {
        // console.log("📡 API Request - No auth token:", {
        //   url: config.url,
        //   method: config.method?.toUpperCase(),
        //   hasToken: false,
        //   timestamp: new Date().toISOString(),
        // });
      }

      return config;
    },
    (error: AxiosError) => {
      // console.error("❌ API Request Error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle responses and errors
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // console.log("✅ API Response Success:", {
      //   url: response.config.url,
      //   status: response.status,
      //   method: response.config.method?.toUpperCase(),
      //   timestamp: new Date().toISOString(),
      // });

      return response;
    },
    async (error: AxiosError<ApiResponse>) => {
      const { response } = error;

      // const { response, config } = error;

      // console.error("❌ API Response Error:", {
      //   url: config?.url,
      //   status: response?.status,
      //   method: config?.method?.toUpperCase(),
      //   message: response?.data?.message || error.message,
      //   timestamp: new Date().toISOString(),
      // });

      // Handle different error scenarios
      if (response?.status === HttpStatus.UNAUTHORIZED) {
        // Unauthorized - clear auth state
        // console.log("🚪 API - Unauthorized, clearing auth state");
        // useAppStore.getState().clearAuth();

        // Redirect to login if not already there
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/auth/signin")
        ) {
          window.location.href = "/auth/signin";
        }
      } else if (response?.status === HttpStatus.FORBIDDEN) {
        // Forbidden - user doesn't have permission
        // console.log("🚫 API - Forbidden access");
      } else if (response?.status === HttpStatus.TOO_MANY_REQUESTS) {
        // Rate limited
        // console.log("⏰ API - Rate limited");
      } else if (
        response?.status &&
        response.status >= HttpStatus.INTERNAL_SERVER_ERROR
      ) {
        // Server error
        // console.log("🔥 API - Server error");
      }

      // Transform error to our standard format
      const apiError: ApiError = {
        message:
          response?.data?.message ||
          error.message ||
          "An unexpected error occurred",
        status: response?.status || 0,
        code: response?.data?.error || ApiErrorCode.UNKNOWN_ERROR,
        details: response?.data?.errors || null,
        timestamp: new Date().toISOString(),
        requestId: response?.data?.requestId,
      };

      return Promise.reject(apiError);
    }
  );

  return instance;
};

// Create the API client instance
export const apiClient = createApiClient();

// Retry configuration
export const retryConfig = {
  retries: 3,
  retryDelay: (retryCount: number) => {
    // Exponential backoff: 1s, 2s, 4s
    return Math.pow(2, retryCount) * 1000;
  },
  retryCondition: (error: AxiosError) => {
    // Retry on network errors or 5xx server errors
    return (
      !error.response ||
      (error.response.status >= HttpStatus.INTERNAL_SERVER_ERROR &&
        error.response.status < 600)
    );
  },
};

// Helper function to make requests with retry logic
export const makeRequestWithRetry = async <T = any>(
  requestFn: () => Promise<AxiosResponse<ApiResponse<T>>>,
  retries: number = retryConfig.retries
): Promise<ApiResponse<T>> => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (retries > 0 && retryConfig.retryCondition(axiosError)) {
      const delay = retryConfig.retryDelay(retryConfig.retries - retries);

      // console.log(
      //   `🔄 API - Retrying request in ${delay}ms (${retries} retries left)`
      // );

      await new Promise((resolve) => setTimeout(resolve, delay));
      return makeRequestWithRetry(requestFn, retries - 1);
    }

    throw error;
  }
};

// Request wrapper with automatic retry
export const request = {
  get: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return makeRequestWithRetry(() =>
      apiClient.get<ApiResponse<T>>(url, config)
    );
  },

  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return makeRequestWithRetry(() =>
      apiClient.post<ApiResponse<T>>(url, data, config)
    );
  },

  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return makeRequestWithRetry(() =>
      apiClient.put<ApiResponse<T>>(url, data, config)
    );
  },

  patch: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return makeRequestWithRetry(() =>
      apiClient.patch<ApiResponse<T>>(url, data, config)
    );
  },

  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return makeRequestWithRetry(() =>
      apiClient.delete<ApiResponse<T>>(url, config)
    );
  },
};

// Upload helper for file uploads
export const uploadFile = async (
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  return makeRequestWithRetry(() =>
    apiClient.post<ApiResponse>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    })
  );
};

export default apiClient;
