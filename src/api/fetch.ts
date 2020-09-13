import { DEFAULTS } from './constants'
import { JSONResponse } from './routes/types'

export const fetchAny = async (
  request: RequestInfo,
  config?: RequestInit,
): Promise<Response> => {
  const options = Object.assign({}, DEFAULTS, config)
  const response = await fetch(request, options)

  return response
}

export const fetchJson = async <T>(
  request: RequestInfo,
  config?: RequestInit,
): Promise<JSONResponse<T>> => {
  let response
  try {
    response = await fetchAny(request, config)
    const json = await response.json()
    const {
      status, statusText, ok,
    } = response

    return {
      data: json.data,
      status,
      statusText,
      ok,
      json,
      request,
    }
  } catch (err) {
    return {
      data: null,
      status: response?.status || 500,
      statusText: response?.statusText || 'Unexpected error',
      ok: false,
      json: null,
      request,
    }
  }
}
