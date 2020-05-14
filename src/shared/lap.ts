import { Race } from '@/store/modules/races/types'
import { Position } from './score'

export const WINNING_STREAK = 3

export type NbUser = number
export type Lap = number
export type NumberUserFirstLapTuple = [ NbUser, Lap ]

export const firstLapTable: NumberUserFirstLapTuple[] = [
  [ 2, 6 ],
  [ 3, 6 ],
  [ 4, 4 ],
]

export const getFirstLap = (nbUsers: NbUser): Lap => {
  if (nbUsers < 2 || nbUsers > 4) {
    return 0
  }

  const firstLapTuple = firstLapTable.find(
    (lapTuple: NumberUserFirstLapTuple) => nbUsers === lapTuple[0]
  )

  return firstLapTuple![1]
}

export type NumberUserLapTuple = [ NbUser, Lap[] ]

export const lapTable: NumberUserLapTuple[] = [
  [ 2, [ 3, 2 ] ],
  [ 3, [ 3, 2, 1 ] ],
  [ 4, [ 3, 2, 2, 1 ] ],
]

export const getLap = (
  nbUsers: NbUser,
  positionOrder: number,
  position: Position,
): Lap => {
  if (nbUsers < 2 || nbUsers > 4) {
    return 0
  }

  const lapTuple = firstLapTable.find(
    (lapTuple: NumberUserFirstLapTuple) => nbUsers === lapTuple[0],
  )

  const lap = lapTuple![positionOrder - 1]

  if (nbUsers === 4 && positionOrder === 3 && position === 3) {
    return lap + 1
  }

  return lap
}

export const isFirstRaceWithLap = (races: Race[]): boolean => {
  return races.filter((race: Race) => race.withLap).length === 1
}

export const getUserLap = (
  races: Race[],
  userId: string,
  nbUsers: NbUser,
): Lap => {
  if (isFirstRaceWithLap(races)) {
    return getFirstLap(nbUsers)
  }

  if (races.length < WINNING_STREAK) {
    return
  }
}
