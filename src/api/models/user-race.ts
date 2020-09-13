import { RawUserRace } from '../routes/types'
import { UserRace } from '@/types/models'

export const normalizeUserRace = (rawUserRace: RawUserRace): UserRace => {
  return {
    id: rawUserRace.id,
    position: rawUserRace.position,
    raceId: rawUserRace.race_id,
    userId: rawUserRace.user_id,
  }
}
