import { fetchJson } from '@/api'
import routes from '@/api/routes'
import { Race } from '@/types/models'
import { RawRace } from './types'
import { normalizeRace } from '../models/race'
import { Maybe } from '../index'

export const updateRaceType = async (raceId: string, input: Record<string, any>): Promise<Maybe<Race>> => {
  const { ok, data } = await fetchJson<RawRace>(
    routes.updateRaceType.path(raceId),
    {
      method: routes.updateRaceType.method,
      body: JSON.stringify({ 'race_type_id': input.raceTypeId }),
    },
  )

  if (ok && data) {
    return normalizeRace(data)
  }

  // @todo throw error
  return null
}

export default updateRaceType
