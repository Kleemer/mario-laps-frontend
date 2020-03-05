import { ResponseBody } from '@/api/types'
import { Data as RoundData } from './round'
import { fetchJson } from '@/api'
import routes from '@/api/routes'

export type MarioLapResponse = ResponseBody<Data>

export interface Data {
  id: string;
  rounds: RoundData[];
  created_at: string;
}

export const createMarioLap = async (config?: RequestInit) => {
  const { data } = await fetchJson<MarioLapResponse>(
    routes.createMarioLap.path,
    {
      method: routes.createMarioLap.method,
      ...config,
    },
  )

  return data
  // @todo do something with response
}

export default createMarioLap
