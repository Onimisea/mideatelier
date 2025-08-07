// Base API Response structure
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]> | string[];
  timestamp: string;
  requestId?: string;
}

// API Error structure
export interface ApiError {
  message: string;
  status: number;
  code: string;
  details?: Record<string, string[]> | string[] | null;
  timestamp: string;
  requestId?: string;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Search and filter types
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
}

// Common response types
export interface MessageResponse {
  message: string;
}

export interface StatusResponse {
  status: string;
  message: string;
}

// Error handling types
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationErrorResponse {
  message: string;
  errors: ValidationError[];
}

// Request/Response wrapper types
export interface RequestOptions {
  retries?: number;
  timeout?: number;
  signal?: AbortSignal;
}

export interface RequestWithRetry<T = any> {
  data: T;
  retryCount: number;
  totalRetries: number;
}

// HTTP Status codes enum
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

// API Error codes enum
export enum ApiErrorCode {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  RATE_LIMITED = "RATE_LIMITED",
  SERVER_ERROR = "SERVER_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  INVALID_TOKEN = "INVALID_TOKEN",
  EXPIRED_TOKEN = "EXPIRED_TOKEN",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
  ACCOUNT_NOT_VERIFIED = "ACCOUNT_NOT_VERIFIED",
}

// Type guards
export const isApiError = (error: any): error is ApiError => {
  return (
    error &&
    typeof error === "object" &&
    "message" in error &&
    "status" in error &&
    "code" in error &&
    "timestamp" in error
  );
};

export const isApiResponse = <T = any>(
  response: any
): response is ApiResponse<T> => {
  return (
    response &&
    typeof response === "object" &&
    "success" in response &&
    "message" in response &&
    "timestamp" in response
  );
};

// Utility types
export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiEndpoint = string;

export type ApiHeaders = Record<string, string>;

export type ApiParams = Record<string, any>;

// Export all types for easier importing
export type {
  // // Re-export commonly used types
  // User as ApiUser,
  // AuthTokens as ApiAuthTokens,
  // LoginRequest as ApiLoginRequest,
  // LoginResponse as ApiLoginResponse,
  // RegisterRequest as ApiRegisterRequest,
  // RegisterResponse as ApiRegisterResponse,
};
