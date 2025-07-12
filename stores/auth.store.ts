import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Types
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface DecodedToken {
  exp: number;
}

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  isRefreshing: boolean;
  failedQueue: FailedRequest[];

  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
  refreshAccessToken: () => Promise<string>;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
}

// Config
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
};

const isTokenExpired = (token: string | null) => {
  try {
    if (!token) return true;
    const decoded = jwtDecode<DecodedToken>(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isRefreshing: false,
      failedQueue: [],

      setTokens: (tokens: AuthTokens) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
        if (process.env.NODE_ENV === "development") {
          console.log("[auth] Tokens set.");
        }
      },

      clearTokens: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isRefreshing: false,
          failedQueue: [],
        });
        if (process.env.NODE_ENV === "development") {
          console.log("[auth] Tokens cleared.");
        }
      },

      getAccessToken: () => {
        const token = get().accessToken;
        if (isTokenExpired(token)) {
          if (process.env.NODE_ENV === "development") {
            console.log("[auth] Access token expired.");
          }
          return null;
        }
        return token;
      },

      getRefreshToken: () => get().refreshToken,

      refreshAccessToken: async (): Promise<string> => {
        const state = get();

        if (!state.refreshToken || isTokenExpired(state.refreshToken)) {
          throw new Error("Refresh token is missing or expired");
        }

        if (state.isRefreshing) {
          return new Promise((resolve, reject) => {
            const timeout = setTimeout(
              () => reject(new Error("Timeout waiting for token refresh")),
              10000
            );
            set((s) => ({
              failedQueue: [
                ...s.failedQueue,
                {
                  resolve: (token) => {
                    clearTimeout(timeout);
                    resolve(token);
                  },
                  reject: (err) => {
                    clearTimeout(timeout);
                    reject(err);
                  },
                },
              ],
            }));
          });
        }

        set({ isRefreshing: true });

        try {
          const response = await axios.post<AuthTokens>(
            "/auth/refresh",
            { refreshToken: state.refreshToken },
            { baseURL: API_CONFIG.baseURL }
          );

          const newTokens = response.data;

          set({
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
            isRefreshing: false,
          });

          const currentState = get();
          currentState.failedQueue.forEach(({ resolve }) =>
            resolve(newTokens.accessToken)
          );
          set({ failedQueue: [] });

          if (process.env.NODE_ENV === "development") {
            console.log("[auth] Token refreshed successfully.");
          }

          return newTokens.accessToken;
        } catch (error) {
          const currentState = get();
          currentState.failedQueue.forEach(({ reject }) => reject(error));
          set({
            accessToken: null,
            refreshToken: null,
            isRefreshing: false,
            failedQueue: [],
          });

          if (process.env.NODE_ENV === "development") {
            console.error("[auth] Token refresh failed:", error);
          }

          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage), // Switch to sessionStorage
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

// Hook for React usage
export const useAuth = () => {
  const store = useAuthStore();

  return {
    accessToken: store.getAccessToken(),
    refreshToken: store.getRefreshToken(),
    isRefreshing: store.isRefreshing,
    setTokens: store.setTokens,
    clearTokens: store.clearTokens,
    refreshAccessToken: store.refreshAccessToken,
    getAccessToken: store.getAccessToken,
    getRefreshToken: store.getRefreshToken,
    isAuthenticated: !!store.getAccessToken(),
  };
};

// For external (non-React) use
export const authStore = {
  getAccessToken: () => useAuthStore.getState().getAccessToken(),
  getRefreshToken: () => useAuthStore.getState().getRefreshToken(),
  setTokens: (tokens: AuthTokens) => useAuthStore.getState().setTokens(tokens),
  clearTokens: () => useAuthStore.getState().clearTokens(),
  refreshAccessToken: () => useAuthStore.getState().refreshAccessToken(),
};

export const authTokenManager = authStore;

export type { AuthTokens };
