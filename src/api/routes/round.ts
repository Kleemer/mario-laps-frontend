import { fetchJson, Maybe } from '@/api'
import routes from '@/api/routes'
import { Round } from '@/types/models'
import { RawRound } from './types'
import { normalizeRound } from '../models/round'

export const createRound = async (marioLapId: string): Promise<Maybe<Round>> => {
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
    return normalizeRound(data)
  }

  // @todo throw error
  return null
}

export default createRound
