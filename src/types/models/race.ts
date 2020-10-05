import { Maybe } from '@/api'
import { Round } from './round'
import { UserRace } from './user-race'

export interface Race {
  id: string;
  roundId: Round['id']
  userRaces: UserRace[]
  withLap: boolean;
  raceType: Maybe<RaceType>
}

export interface RaceType {
  id: string
  name: string
}
