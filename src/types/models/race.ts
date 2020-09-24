import { Maybe } from '@/api'
import { UserRace } from './user-race'

export interface Race {
  id: string;
  userRaces: UserRace[];
  withLap: boolean;
  raceType: Maybe<RaceType>
}

export interface RaceType {
  id: string;
  name: string;
}
