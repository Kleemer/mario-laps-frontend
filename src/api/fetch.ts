import { DEFAULTS } from './constants'
import { JSONResponse } from './types'

export const fetchAny = async (
  request: RequestInfo,
  config?: RequestInit,
): Promise<Response> => {
  const options = Object.assign({}, DEFAULTS, config)
  const response = await fetch(request, options)

  return response
}

export const fetchJson = async <T extends Record<string, any>>(
  request: RequestInfo,
  config?: RequestInit,
): Promise<JSONResponse<T>> => {
  const options = Object.assign({}, DEFAULTS, config)
  const response = await fetchAny(request, options)
  const json = await response.json()

  return {
    data: json.data,
    json,
    request,
  }
}
