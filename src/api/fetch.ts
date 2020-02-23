import { DEFAULTS } from './constants'
// import { JSONResponse } from './types'
// import mergeWith from 'lodash/fp/mergeWith'

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
): Promise<T> => {
  const options = Object.assign({}, DEFAULTS, config)
  const response = await fetchAny(request, options)
  const data = await response.json() as T

  return data
}
