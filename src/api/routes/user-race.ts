import { fetchJson, Maybe } from '@/api'
import routes from '@/api/routes'
import { RawRace } from './types'
import { Race } from '@/types/models'
import { normalizeRace } from '../models/race'

export const createUserRace = async (raceId: string, input: Record<string, any>): Promise<Maybe<Race>> => {
  const { ok, data } = await fetchJson<RawRace>(
    routes.createUserRace.path(raceId),
    {
      method: routes.createUserRace.method,
      body: JSON.stringify({ position: input.position }),
    },
  )

  if (ok && data) {
    return normalizeRace(data)
  }

  // @todo throw error
  return null
}

export default createUserRace
