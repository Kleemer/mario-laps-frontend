import Cookies from 'js-cookie'

export const COOKIE_IS_LOGGED_IN = 'isLoggedIn'

export const setLoggedInCookie = (value: boolean): void => {
  Cookies.set(COOKIE_IS_LOGGED_IN, `${value}`)
}

export const getLoggedInCookie = (): boolean => {
  const isLoggedInCookie = Cookies.get(COOKIE_IS_LOGGED_IN) || ''
  return /true/.test(isLoggedInCookie)
}
