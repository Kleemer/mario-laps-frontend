import { RawUserRace } from './user-race'

export interface RawRace {
  id: string;
  user_races: RawUserRace[] | null;
  with_lap: boolean;
}
