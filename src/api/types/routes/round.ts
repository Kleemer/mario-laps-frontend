import { ResponseBody } from '@/api/types'
import { Data as RaceData, normalizeRace } from './race'
import { Data as MarioLapData } from './mario-lap'
import { fetchJson } from '@/api'
import routes from '@/api/routes'

export type RoundResponse = ResponseBody<Data>

export interface Data {
  id: string;
  marioLapId: MarioLapData['id'];
  races: RaceData[];
}

export const normalizeRound = (dataRound: any): Data => {
  return {
    id: dataRound?.id,
    marioLapId: dataRound?.mario_lap_id,
    races: dataRound?.races?.map((dataRace: any) => normalizeRace(dataRace)),
  }
}

export const createRound = async (marioLapId: string): Promise<Data> => {
  const { data } = await fetchJson<RoundResponse>(
    routes.createRound.path,
    {
      method: routes.createRound.method,
      body: JSON.stringify({
        mario_lap_id: marioLapId,
      }),
    },
  )

  return normalizeRound(data)
}

export default createRound
