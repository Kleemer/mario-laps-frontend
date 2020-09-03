import { Race } from '@/store/modules/races/types'

export type Position = number
export type Score = number
export type PositionScoreTuple = [Position, Score]

export const scoreTable: PositionScoreTuple[] = [
  [ 1, 15 ],
  [ 2, 12 ],
  [ 3, 10 ],
  [ 4, 9 ],
  [ 5, 8 ],
  [ 6, 7 ],
  [ 7, 6 ],
  [ 8, 5 ],
  [ 9, 4 ],
  [ 10, 3 ],
  [ 11, 2 ],
  [ 12, 1 ],
]

export const getScore = (position: Position): Score => {
  const score = scoreTable.find((tuple) => tuple[0] === position)

  if (!score) {
    return 0
  }

  return score[1]
}

export const getRaceScore = (race: Race, userId: string): Score => {
  const user = race.users.find((e) => e.user_id === userId)

  if (!user) {
    return 0
  }

  return getScore(user.position)
}

export const getUserScore = (races: Race[], userId: string): Score => {
  return races.reduce((result, race) => {
    return result + getRaceScore(race, userId)
  }, 0)
}
