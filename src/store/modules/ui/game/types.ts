import { Lap } from '@/shared/lap'
import { Position } from '@/shared/score'

export interface GameState {
  laps: Lap
  position: Position
  submitted: boolean
}
