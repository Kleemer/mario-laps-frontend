import { RawRace } from '../routes/types'
import { Race } from '@/types/models'
import { normalizeUserRace } from './user-race'

export const normalizeRace = (rawRace: RawRace): Race => {
  return {
    id: rawRace.id,
    roundId: rawRace.round_id,
    userRaces: rawRace.user_races?.map((e) => normalizeUserRace(e)) || [],
    withLap: rawRace.with_lap,
    raceType: rawRace.race_type,
  }
}
