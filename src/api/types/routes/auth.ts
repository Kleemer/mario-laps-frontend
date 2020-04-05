import { ResponseBody } from '@/api/types'
import { fetchJson, fetchAny } from '@/api'
import routes from '@/api/routes'
import { setLoggedInCookie } from '@/shared/auth'
import { Data as UserData, UserResponse } from './user'

export type AuthResponse = ResponseBody<Data>

export interface Data {
  access_token: string;
  token_type: string;
}

export const login = async (input: Record<string, any>): Promise<void> => {
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

export const logout = async (): Promise<void> => {
  try {
    await fetchAny(
      routes.logout.path,
      {
        method: routes.logout.method,
      },
    )
    setLoggedInCookie(false)
  } catch (err) {
    throw err
  }

  return
}

export const getMe = async (): Promise<UserData> => {
  try {
    const { data } = await fetchJson<UserData>(
      routes.me.path,
      {
        method: routes.me.method,
      },
    )

    return data
  } catch (err) {
    throw err
  }
}
