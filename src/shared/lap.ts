import { Position } from './score'
import { Race } from '@/types/models'
import { getRelativePosition, getPosition } from './position'

export type Lap = number
export type Streak = number

type LapRule = LapRuleFunction[]
type LapRuleFunction = (e: Position) => number

/**
 * Laps ignore rounds. If a player has 8 laps and a new Round is launched,
 * he will keep his laps, as well as his streak.
 * If one or more Races are played with laps OFF between 2 set of Races with Laps ON
 * then the streak is reset.
 * Race 1 lap ON
 * Race 2 lap ON
 * Race 3 lap ON
 * Race 4 lap OFF <- This reset the streak
 *
 * The rules are the following
 * 2 players
 * - First race ->  6 laps each
 * - Every race ->  1st (relative) get 2 laps
 *                  2nd (relative) get 1 lap
 *
 * 3 players
 * - First race ->  6 laps each
 * - Every race ->  1st (relative) get 3 laps
 *                  2nd (relative) get 2 laps
 *                  3rd (relative) get 1 lap
 *
 * 4 players
 * - First race ->  4 laps each
 * - Every race ->  1st (relative) get 3 laps
 *                  2nd (relative) get 2 laps
 *                  3rd (relative) get 2 laps if 3rd position, otherwise get 1 lap
 *                  4th (relative) get 1 lap
 */

export const nbPlayersLapRuleTable: LapRule[] = [
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

const findLapRule = (nbUsers: number): LapRule | null => {
  const lapRule = nbPlayersLapRuleTable.find((e: LapRuleFunction[]) => e.length === nbUsers)

  return lapRule || null
}

// This gets the number of Laps for the current race
export const getLap = (races: Race[], userId: string, nbUsers: number): Lap => {
  const currentRace = races[races.length - 1]

  // Laps are disabled on this Race
  if (!currentRace.withLap) {
    return 0
  }

  const racesWithLap = getRacesWithLap(races)

  // Laps were never enabled on any Race
  if (racesWithLap === 0) {
    return 0
  }

  // Laps are enabled for the first time
  if (racesWithLap === 1) {
    return getFirstLap(nbUsers)
  }

  const previousRace = races[races.length - 2]

  const position = getPosition(previousRace, userId) || 0
  const relativePosition = getRelativePosition(previousRace, userId)

  const lapRule = findLapRule(nbUsers)

  if (!lapRule) {
    // This should NOT be reached
    return 0
  }

  // Position starts at 1, index starts at 0
  const lapRuleFn = lapRule[relativePosition - 1]

  if (typeof lapRuleFn === 'function') {
    return lapRule[relativePosition - 1](position)
  }

  return 0
}

// Used to return the initial number of laps to add to each player
const getFirstLap = (nbUsers: number): number => {
  if (nbUsers === 4) {
    return 4
  }

  return 6
}

export const getRacesWithLap = (races: Race[]): number => {
  return races.filter((r) => r.withLap).length
}

