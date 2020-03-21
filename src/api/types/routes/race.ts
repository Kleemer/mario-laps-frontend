import { ResponseBody } from '@/api/types'
import { Data as UserRaceData } from './user-race'
import { fetchJson } from '@/api/fetch'
import routes from '@/api/routes'
export type RaceResponse = ResponseBody<Data>

export interface Data {
  id: string;
  users: UserRaceData[];
  withLap: boolean;
}

export const normalizeRace = (dataRace: any): Data => {
  return {
    id: dataRace?.id,
    users: dataRace?.users,
    withLap: dataRace?.with_lap,
  }
}

export const createRace = async (roundId: string): Promise<Data> => {
  const { data } = await fetchJson<RaceResponse>(
    routes.createRace.path(roundId),
    {
      method: routes.createRound.method,
    },
  )

  return normalizeRace(data)
}

export default createRace
