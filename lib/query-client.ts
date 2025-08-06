import { authStore } from "@/stores/auth.store";
import {
  QueryClient,
  useQuery,
  UseQueryOptions,
  QueryKey,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import type { AxiosRequestConfig } from "axios";
import axiosInstance, { StandardError } from "./axios.instance";

// Create and configure the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds that data stays fresh
      staleTime: 1000 * 60 * 5, // 5 minutes

      // Time in milliseconds that unused data stays in cache
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)

      // Retry failed requests 3 times
      retry: (failureCount, error: any) => {
        // Don't retry on auth errors
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },

      // Delay between retries (exponential backoff)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Don't refetch on window focus by default
      refetchOnWindowFocus: false,

      // Refetch on reconnect
      refetchOnReconnect: true,

      // Don't refetch on mount if data exists and is not stale
      refetchOnMount: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: (failureCount, error: any) => {
        // Don't retry on auth errors or client errors
        if (
          error?.status === 401 ||
          error?.status === 403 ||
          error?.status < 500
        ) {
          return false;
        }
        return failureCount < 1;
      },

      // Retry delay for mutations
      retryDelay: 1000,

      // Global mutation error handler
      onError: (error: any) => {
        if (error?.status === 401) {
          authStore.clearTokens();
        }
      },
    },
  },
});

export default queryClient;

interface ApiQueryOptions<TData, TError = StandardError>
  extends Omit<UseQueryOptions<TData, TError>, "queryFn" | "queryKey"> {
  queryKey: QueryKey;
  config: AxiosRequestConfig;
}

export const useApiQuery = <TData = unknown, TError = StandardError>({
  queryKey,
  config,
  ...options
}: ApiQueryOptions<TData, TError>) => {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      const response = await axiosInstance.request<TData>(config);
      return response.data;
    },
    ...options,
  });
};

interface ApiMutationOptions<TData, TError, TVariables>
  extends Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn"> {
  getConfig: (variables: TVariables) => AxiosRequestConfig;
}

export const useApiMutation = <
  TData = unknown,
  TError = StandardError,
  TVariables = unknown
>({
  getConfig,
  ...options
}: ApiMutationOptions<TData, TError, TVariables>) => {
  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables) => {
      const config = getConfig(variables);
      const response = await axiosInstance.request<TData>(config);
      return response.data;
    },
    ...options,
  });
};
