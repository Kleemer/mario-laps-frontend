import { Race } from '../races/types'

export interface Round {
  id: string
  races: Array<Race['id']>
}

export interface RoundState {
  rounds: Record<Round['id'], Round>
  roundList: Array<Round['id']>
}
