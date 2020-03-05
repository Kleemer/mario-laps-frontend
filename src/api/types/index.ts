export type EmptyResponseBody = ''

export interface ResponseBody<T> {
  data: T;
}

export interface JSONResponse<T = Record<string, any>> {
  data: T;
  json: { data: T };
  request: RequestInfo;
}

// @deprecated
export interface JWT {
  exp?: Date;
  ttl?: number;
  iat?: Date;
}
