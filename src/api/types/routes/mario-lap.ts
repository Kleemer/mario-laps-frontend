import { ResponseBody } from '@/api/types'
import { Data as RoundData, normalizeRound } from './round'
import { fetchJson } from '@/api'
import routes from '@/api/routes'

export type MarioLapResponse = ResponseBody<Data>

export interface Data {
  id: string;
  rounds: RoundData[];
  createdAt: string;
}

export const createMarioLap = async (config?: RequestInit) => {
  const { data } = await fetchJson<MarioLapResponse>(
    routes.createMarioLap.path,
    {
      method: routes.createMarioLap.method,
      ...config,
    },
  )

  return normalizeMarioLap(data)
}

export const normalizeMarioLap = (dataMarioLap: any): Data => {
  return {
    id: dataMarioLap?.id,
    rounds: dataMarioLap?.rounds?.map((dataRound: any) => normalizeRound(dataRound)),
    createdAt: dataMarioLap?.created_at,
  }
}

export default createMarioLap
