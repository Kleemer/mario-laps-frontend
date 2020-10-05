import { RawRound, RawRace } from '../routes/types'
import { Round } from '@/types/models'
import { normalizeRace } from './race'

export const normalizeRound = (rawRound: RawRound): Round => {
  return {
    id: rawRound.id,
    marioLapId: rawRound.mario_lap_id,
    raceIds: rawRound.races?.map((rawRace: RawRace) => normalizeRace(rawRace).id) || [],
    createdAt: rawRound.created_at,
  }
}
