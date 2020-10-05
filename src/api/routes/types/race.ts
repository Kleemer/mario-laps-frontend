import { RawUserRace } from './user-race'

export interface RawRace {
  id: string
  round_id: string
  user_races: RawUserRace[] | null
  with_lap: boolean
  race_type: RawRaceType | null
}

export interface RawRaceType {
  id: string
  name: string
}
