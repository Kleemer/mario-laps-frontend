import { ResponseBody } from '@/api/types'
import { Data as RaceData } from './race'
import { fetchJson } from '@/api'
import routes from '@/api/routes'

export type MarioLapResponse = ResponseBody<Data>

export interface Data {
  id: string;
  races: RaceData[];
}

export const createMarioLap = async (config?: RequestInit) => {
  const response = await fetchJson<MarioLapResponse>(
    routes.createMarioLap.path,
    {
      method: routes.createMarioLap.method,
      ...config,
    },
  )

  // @todo do something with response
}

export default createMarioLap
