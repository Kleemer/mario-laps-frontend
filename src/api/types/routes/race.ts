import { ResponseBody } from '@/api/types'
import { Data as UserRaceData } from './user-race'
export type RaceResponse = ResponseBody<Data>

export interface Data {
  id: string;
  users: UserRaceData[];
}
