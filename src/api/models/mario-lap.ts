import { MarioLap } from '@/types/models'
import { RawMarioLap } from '../routes/types'
import { normalizeRound } from './round'

export const normalizeMarioLap = (rawMarioLap: RawMarioLap): MarioLap => {
  return {
    id: rawMarioLap.id,
    rounds: rawMarioLap?.rounds?.map((dataRound: any) => normalizeRound(dataRound)) || [],
    createdAt: rawMarioLap.created_at,
  }
}
