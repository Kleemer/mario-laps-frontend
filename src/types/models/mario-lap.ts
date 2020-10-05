import { Round } from './round'

export interface MarioLap {
  id: string
  rounds: Round[]
  createdAt: Date
}
