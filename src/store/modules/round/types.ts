import { Race } from '@/store/modules/race/types'

export interface Round {
  id: string
  races: Record<string, Race>
  order: number
}

export interface RoundState {
  rounds: Record<string, Round>
}
