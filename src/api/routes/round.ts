import { fetchJson, Maybe } from '@/api'
import routes from '@/api/routes'
import { Race, Round } from '@/types/models'
import { RawRound } from './types'
import { normalizeRound } from '../models/round'
import { normalizeRace } from '../models/race'

export interface RoundAndRace {
  round: Round,
  race: Race,
}

export const createRound = async (marioLapId: string): Promise<Maybe<RoundAndRace>> => {
  const { ok, data } = await fetchJson<RawRound>(
    routes.createRound.path,
    {
      method: routes.createRound.method,
      body: JSON.stringify({
        mario_lap_id: marioLapId,
      }),
    },
  )

  if (ok && data) {
    return {
      round: normalizeRound(data),
      race: normalizeRace(data.races![0]),
     }
  }

  // @todo throw error
  return null
}

export default createRound
