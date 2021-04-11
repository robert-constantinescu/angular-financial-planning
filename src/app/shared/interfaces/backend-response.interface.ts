export interface BackendResponse<T> {
  body: T;
  successful: boolean;
  statusCode?: number;
  timestamp?: string;
  path?: string;
}
