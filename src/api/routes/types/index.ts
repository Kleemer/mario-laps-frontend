export * from './auth'
export * from './mario-lap'
export * from './race'
export * from './round'
export * from './user'
export * from './user-race'

export type EmptyResponseBody = ''

export interface ResponseBody<T> {
  data: T;
}

export interface JSONResponse<T = Record<string, any>> {
  data: T | null;
  status: number;
  statusText: string;
  ok: boolean;
  json: ResponseBody<T> | null;
  request: RequestInfo;
}

