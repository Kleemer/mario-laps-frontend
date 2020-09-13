import { fetchJson } from '@/api/fetch'
import routes from '@/api/routes'
import { RawRace } from './types'
import { Race } from '@/types/models'
import { normalizeRace } from '../models/race'
import { Maybe } from '..'

export const createRace = async (roundId: string): Promise<Maybe<Race>> => {
  const { ok, data } = await fetchJson<RawRace>(
    routes.createRace.path(roundId),
    {
      method: routes.createRound.method,
    },
  )

  if (ok && data) {
    return normalizeRace(data)
  }

  // @todo throw error
  return null
}

export default createRace
