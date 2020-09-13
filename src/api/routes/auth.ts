import { AuthResponse } from '@/api/routes/types'
import { fetchJson, fetchAny, Maybe } from '@/api'
import routes from '@/api/routes'
import { setLoggedInCookie } from '@/shared/auth'
import { RawUser } from './types/user'
import { User } from '@/types/models'
import { normalizeUser } from '../models/user'

export const login = async (input: Record<string, any>): Promise<void> => {
    const { ok } = await fetchJson<AuthResponse>(
      routes.login.path,
      {
        method: routes.login.method,
        body: JSON.stringify({
          username: input.username,
          password: 'password',
        }),
      },
    )
    if (ok) {
      setLoggedInCookie(true)
      return
    }

    // @todo throw error
    setLoggedInCookie(false)
}

export const logout = async (): Promise<void> => {
  await fetchAny(
    routes.logout.path,
    {
      method: routes.logout.method,
    },
  )
  setLoggedInCookie(false)
  // @todo clear store
}

export const getMe = async (): Promise<Maybe<User>> => {
  const { ok, data } = await fetchJson<RawUser>(
    routes.me.path,
    {
      method: routes.me.method,
    },
  )

  if (ok && data) {
    return normalizeUser(data)
  }

  return null
}
