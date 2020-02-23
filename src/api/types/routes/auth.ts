import { ResponseBody } from '@/api/types'
import { fetchJson } from '@/api'
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
  // @todo store response access_token? Cookie is better
}
