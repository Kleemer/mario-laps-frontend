import { RawRace } from './race'

export interface RawRound {
  id: string;
  mario_lap_id: string;
  races: RawRace[] | null;
  created_at: Date;
}
