import { Race } from '@/types/models'

export interface RaceState {
  races: Record<Race['id'], Race>
  raceList: Array<Array<Race['id']>>
}
