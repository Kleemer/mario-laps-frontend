import { ResponseBody } from '@/api/types'
import { Data as RaceData, normalizeRace } from './race'
import { fetchJson } from '@/api'
import routes from '@/api/routes'

export type RaceLapResponse = ResponseBody<RaceData>

export const updateRaceLapSetting = async (raceId: string, input: Record<string, any>) => {
  const { data } = await fetchJson<RaceLapResponse>(
    routes.updateRaceLapSetting.path(raceId),
    {
      method: routes.updateRaceLapSetting.method,
      body: JSON.stringify({ 'with_lap': input.withLap }),
    },
  )

  return normalizeRace(data)
  // @todo do something with response
}

export default updateRaceLapSetting
