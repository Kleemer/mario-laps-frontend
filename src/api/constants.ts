export const REST_API_HOST: string = `${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/api`

export const HEADERS = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
})

export const DEFAULTS: Partial<RequestInit> = {
  credentials: 'include',
  headers: HEADERS,
  method: 'GET',
  // mode: 'same-origin',
}
