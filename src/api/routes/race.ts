import { fetchJson } from '@/api/fetch'
import routes from '@/api/routes'
import { RawRace } from './types'
import { Race, Round } from '@/types/models'
import { normalizeRace } from '../models/race'
import { Maybe } from '..'

export const createRace = async (roundId: Round['id']): Promise<Maybe<Race>> => {
  const { ok, data } = await fetchJson<RawRace>(
    routes.createRace.path(roundId),
    {
      method: routes.createRace.method,
    },
  )

  if (ok && data) {
    return normalizeRace(data)
  }

  // @todo throw error
  return null
}

export const deleteRace = async (roundId: Round['id'], raceId: Race['id']): Promise<boolean> => {
  const { ok } = await fetchJson<RawRace>(
    routes.deleteRace.path(roundId, raceId),
    {
      method: routes.deleteRace.method,
    },
  )

  return ok
}

export default createRace
