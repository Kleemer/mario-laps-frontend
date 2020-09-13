import { Round } from '@/types/models'

export interface RoundState {
  rounds: Record<Round['id'], Round>
  roundList: Array<Round['id']>
}
