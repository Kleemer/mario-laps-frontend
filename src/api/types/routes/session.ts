import { ResponseBody } from '@/api/types'
import { Data as MarioLapData } from './mario-lap'
import { fetchJson } from '@/api'
import routes from '@/api/routes'

export type SessionResponse = ResponseBody<Data>

export interface Data {
  id: string;
  marioLaps: MarioLapData[];
  created_at: string;
}

export const activeSessions = async (config?: RequestInit) => {
  const { data } = await fetchJson<SessionResponse>(
    routes.activeSessions.path,
    {
      method: routes.activeSessions.method,
      ...config,
    },
  )

  console.log('activeSessions', data)

  // @todo do something with response
}

export default activeSessions
