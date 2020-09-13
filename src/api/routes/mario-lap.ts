import { fetchJson, Maybe } from '@/api'
import routes from '@/api/routes'
import { RawMarioLap } from './types'
import { normalizeMarioLap } from '../models/mario-lap'
import { MarioLap } from '@/types/models'

export const createMarioLap = async (): Promise<Maybe<MarioLap>> => {
  const { ok, data } = await fetchJson<RawMarioLap>(
    routes.createMarioLap.path,
    {
      method: routes.createMarioLap.method,
    },
  )

  if (ok && data) {
    return normalizeMarioLap(data)
  }

  // @todo throw error
  return null
}

export default createMarioLap
