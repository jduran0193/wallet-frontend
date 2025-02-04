export interface IResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
export enum ErrorCode {
  CLIENT_EXISTS = "CLIENT_EXISTS",
  CLIENT_NOT_FOUND = "CLIENT_NOT_FOUND",
  WALLET_NOT_FOUND = "WALLET_NOT_FOUND",
  INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
  INVALID_TOKEN = "INVALID_TOKEN",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};
