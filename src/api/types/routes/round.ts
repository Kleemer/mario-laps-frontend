import { ResponseBody } from '@/api/types'
import { Data as RaceData } from './race'
import { Data as MarioLapData } from './mario-lap'
import { fetchJson } from '@/api'
import routes from '@/api/routes'

export type RoundResponse = ResponseBody<Data>

export interface Data {
  id: string;
  mario_lap_id: MarioLapData['id'];
  races: RaceData[];
}

export const createRound = async (config?: RequestInit): Promise<RoundResponse> => {
  const { data } = await fetchJson<RoundResponse>(
    routes.createRound.path,
    {
      method: routes.createRound.method,
      ...config,
    },
  )

  return data
}

export default createRound
