import { ResponseBody } from '@/api/types'
import { Data as RaceData } from './race'
import { Data as UserData } from './user'

export type UserRaceResponse = ResponseBody<Data>

export interface Data {
  id: string;
  race_id: RaceData['id'];
  user_id: UserData['id'];
  position: number;
}
