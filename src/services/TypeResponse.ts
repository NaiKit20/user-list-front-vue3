export interface TypeResponse<T> {
  data?: T;
  message: string;
  error?: string;
  statusCode: number;
}
