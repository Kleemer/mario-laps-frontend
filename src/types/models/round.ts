import { Race } from './race'
import { MarioLap } from './mario-lap';

export interface Round {
  id: string
  marioLapId: MarioLap['id']
  raceIds: Array<Race['id']>
  createdAt: Date
}
