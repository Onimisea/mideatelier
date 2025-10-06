import { env } from "@/lib/env";

const API_BASE = env.NEXT_PUBLIC_API_URL;

export const routes = {
  mylogs: `${API_BASE}/userlogs/my_logs/`,
  getUploadUrl: `${API_BASE}/jobs/questionnaires/upload-url/`,
  auth: {
    login: `${API_BASE}/accounts/login/`,
    register: `${API_BASE}/accounts/register/`,
    verify: `${API_BASE}/accounts/verify/`,
    refreshToken: `${API_BASE}/accounts/refresh-token`,
    forgotPassword: `${API_BASE}/accounts/forgot-password/`,
    resetPassword: `${API_BASE}/accounts/reset-password/`,
    logout: `${API_BASE}/accounts/logout/`,
    resendVerificationEmail: `${API_BASE}/accounts/verify/resend/`,
  },
  users: `${API_BASE}/accounts/users/`,
  agents: {
    dashboard: `${API_BASE}/agents/dashboard/`,
    earnings: `${API_BASE}/agents/earnings/`,
    walletWithdraw: `${API_BASE}/wallets/`,
    walletLogs: `${API_BASE}/agents/wallet-logs/`,
    me: `${API_BASE}/accounts/me/`,
  },
  jobs: {
    all: `${API_BASE}/jobs/`,
    getBySlug: `${API_BASE}/jobs/slug/`,
    create: `${API_BASE}/jobs/`,
    application: {
      get: `${API_BASE}/jobs/applications/`,
      getMine: `${API_BASE}/jobs/applications/my`,
      create: `${API_BASE}/jobs/applications/`,
      update: `${API_BASE}/jobs/applications/`,
    },
    questionaire: {
      getByJobSlug: `${API_BASE}/jobs/questionnaires/js/`,
      create: `${API_BASE}/questionnaires/`,
    },
  },
};
