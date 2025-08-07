// lib/react-query/useSafeQuery.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryClient,
  DefaultOptions,
} from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import apiClient from "./axios-config";
import { toast } from "react-toastify";

// ---------------------
// 🟩 Safe Query Hook
// ---------------------

type SafeQueryProps<TResponse> = {
  key: string | (string | number)[];
  path: string;
  config?: AxiosRequestConfig;
  options?: UseQueryOptions<TResponse>;
};

export function useSafeQuery<TResponse>({
  key,
  path,
  config,
  options,
}: SafeQueryProps<TResponse>) {
  return useQuery<TResponse>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const res = await apiClient.get<TResponse>(path, config);
      return res.data;
    },
    ...options,
  });
}

// ------------------------
// 🟧 Safe Mutation Hook
// ------------------------

type MutationMethod = "post" | "put" | "patch" | "delete";

type SafeMutationProps<TInput, TResponse> = {
  method: MutationMethod;
  path: string;
  config?: AxiosRequestConfig;
  options?: UseMutationOptions<TResponse, unknown, TInput>;
};

export function useSafeMutation<TInput = unknown, TResponse = unknown>({
  method,
  path,
  config,
  options,
}: SafeMutationProps<TInput, TResponse>) {
  return useMutation<TResponse, unknown, TInput>({
    mutationFn: async (data: TInput) => {
      const res: AxiosResponse<TResponse> = await apiClient[method](
        path,
        data,
        config
      );
      return res.data;
    },
    ...options,
  });
}

const defaultQueryErrorHandler = (error: unknown) => {
  if (error instanceof Error) {
    console.error("React Query Error:", error.message);
    toast.error(error.message);
  }
};

const defaultOptions = {
  queries: {
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    onError: defaultQueryErrorHandler,
  },
  mutations: {
    retry: 0,
    onError: defaultQueryErrorHandler,
  },
} as DefaultOptions;

const queryClient = new QueryClient({ defaultOptions });

export default queryClient;
