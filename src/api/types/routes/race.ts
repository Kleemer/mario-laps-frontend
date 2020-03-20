import { ResponseBody } from '@/api/types'
import { Data as UserRaceData } from './user-race'
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
