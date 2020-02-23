import { ResponseBody } from '@/api/types'
import { fetchJson, fetchAny } from '@/api'
import routes from '@/api/routes'

export type AuthResponse = ResponseBody<Data>

export interface Data {
  access_token: string;
  token_type: string;
}

export const login = async (input: Record<string, any>) => {
  const response = await fetchJson<AuthResponse>(
    routes.login.path,
    {
      method: routes.login.method,
      body: JSON.stringify({
        username: input.username,
        password: 'password',
      }),
    },
  )

  // @todo check if errors
  return
}

export const logout = async () => {
  const response = await fetchAny(
    routes.logout.path,
    {
      method: routes.logout.method,
    },
  )

  return
}
