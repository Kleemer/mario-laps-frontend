export interface User {
  id: string
  position: number
}

export interface Race {
  id: string
  users: User[]
  withLap: boolean
  order: number
}

export interface RaceState {
  races: Record<Race['id'], Race>,
  raceList: Array<Array<Race['id']>>
}
