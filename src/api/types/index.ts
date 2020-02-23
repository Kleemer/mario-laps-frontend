export type EmptyResponseBody = ''

export interface ResponseBody<T> {
  data: T;
}

export interface JSONResponse<T = Record<string, any>> {
  data: T | null;
  status: number;
  statusText: string;
  ok: boolean;
  json: { data: T } | null;
  request: RequestInfo;
}

// @deprecated
export interface JWT {
  exp?: Date;
  ttl?: number;
  iat?: Date;
}
