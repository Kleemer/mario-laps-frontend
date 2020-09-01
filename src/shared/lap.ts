import { Position } from './score'
import { Race } from '@/store/modules/races/types'
import { getRelativePosition, getPosition } from './position'

export type Lap = number

type LapObject = LapObjectFunction[]
type LapObjectFunction = (e: Position) => number

/**
 * The rules are the following PER ROUND
 * 2 players
 * - First race -> 6 laps each
 * - Every race ->  1st (relative) get 2 laps
 *                  2nd (relative) get 1 lap
 *
 * 3 players
 * - First race -> 6 laps each
 * - Every race ->  1st (relative) get 3 laps
 *                  2nd (relative) get 2 laps
 *                  3rd (relative) get 1 lap
 *
 * 4 players
 * - First race -> 4 laps each
 * - Every race ->  1st (relative) get 3 laps
 *                  2nd (relative) get 2 laps
 *                  3rd (relative) get 2 laps if 3rd position, otherwise get 1 lap
 *                  4th (relative) get 1 lap
 */

export const nbPlayersLapTable: LapObject[] = [
  [
    () => 3,
    () => 2,
  ],
  [
    () => 3,
    () => 2,
    () => 1,
  ],
  [
    () => 3,
    () => 2,
    (e: Position) => e === (3 as Position) ? 2 : 1,
    () => 1,
  ],
]

const findLapObject = (nbUsers: number): LapObject | null => {
  const lapObject = nbPlayersLapTable.find((e: LapObjectFunction[]) => e.length === nbUsers)

  if (!lapObject) {
    return null
  }

  return lapObject
}

export const getLap = (races: Race[], userId: string, nbUsers: number): number => {
  if (getLapRace(races) === 0) {
    return 0
  }

  if (getLapRace(races) === 1) {
    return getFirstLap(nbUsers)
  }

  const previousRace = races[races.length - 2]

  if (!previousRace.withLap) {
    return 0
  }

  const position = getPosition(previousRace, userId) || 0
  const relativePosition = getRelativePosition(previousRace, userId)

  const lapObject = findLapObject(nbUsers)

  if (!lapObject) {
    // This should NOT be reached
    return 0
  }

  // Position starts at 1, index starts at 0
  return lapObject[relativePosition - 1](position)
}

const getFirstLap = (nbUsers: number): number => {
  if (nbUsers === 4) {
    return 4
  }

  return 6
}

export const getLapRace = (races: Race[]): number => {
  return races.filter((r) => r.withLap).length
}

