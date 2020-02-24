import { ResponseBody } from '@/api/types'
import { fetchJson, fetchAny } from '@/api'
import routes from '@/api/routes'
import { setLoggedInCookie } from '@/shared/auth'

export type AuthResponse = ResponseBody<Data>

export interface Data {
  access_token: string;
  token_type: string;
}

export const login = async (input: Record<string, any>) => {
  try {
    await fetchJson<AuthResponse>(
      routes.login.path,
      {
        method: routes.login.method,
        body: JSON.stringify({
          username: input.username,
          password: 'password',
        }),
      },
    )
    setLoggedInCookie(true)
  } catch (err) {
    setLoggedInCookie(false)
    throw err
  }

  // @todo check if errors
  return
}

export const logout = async () => {
  try {
    await fetchAny(
      routes.logout.path,
      {
        method: routes.logout.method,
      },
    )
  } catch (err) {
    setLoggedInCookie(false)
    throw err
  }

  return
}
