import apiClient from "./axios/axios-config";
import { env } from "./env";

export const getCSRFToken = async (): Promise<void> => {
  await apiClient.get(`${env.NEXT_PUBLIC_API_URL}/csrf/`);
};
