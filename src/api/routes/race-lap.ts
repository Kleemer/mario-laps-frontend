import { fetchJson } from '@/api'
import routes from '@/api/routes'
import { Race } from '@/types/models'
import { RawRace } from './types'
import { normalizeRace } from '../models/race'
import { Maybe } from '../index'

export const updateRaceLapSetting = async (raceId: string, input: Record<string, any>): Promise<Maybe<Race>> => {
  const { ok, data } = await fetchJson<RawRace>(
    routes.updateRaceLapSetting.path(raceId),
    {
      method: routes.updateRaceLapSetting.method,
      body: JSON.stringify({ 'with_lap': input.withLap }),
    },
  )

  if (ok && data) {
    return normalizeRace(data)
  }

  // @todo throw error
  return null
}

export default updateRaceLapSetting
