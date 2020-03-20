import { ResponseBody } from '@/api/types'
import { Data as RaceData, normalizeRace } from './race'
import { Data as UserData } from './user'
import { fetchJson } from '@/api'
import routes from '@/api/routes'

export type UserRaceResponse = ResponseBody<RaceData>

export interface Data {
  id: string;
  race_id: RaceData['id'];
  user_id: UserData['id'];
  position: number;
}

export const createUserRace = async (raceId: string, input: Record<string, any>): Promise<RaceData> => {
  const { data } = await fetchJson<RaceData>(
    routes.createUserRace.path(raceId),
    {
      method: routes.createUserRace.method,
      body: JSON.stringify({ position: input.position }),
    },
  )

  return normalizeRace(data)
  // @todo do something with response
}

export default createUserRace
