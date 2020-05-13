import { REST_API_HOST } from './constants'

export const toPath = (path?: string | null): string => {
  let apiUrl = '/api'
  if (process.env.NODE_ENV === 'production') {
    apiUrl = REST_API_HOST
  }

  return apiUrl + (path ? path.replace(/^(\w)/, '/$1') : '')
}
