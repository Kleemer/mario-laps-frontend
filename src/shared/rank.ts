export const NO_RANK_CHANGE: number = 0
export const RANK_UP: number = 1
export const RANK_DOWN: number = -1

export const getRankState = (rank: number): string => {
  return rank === RANK_UP
    ? '↗︎' : rank === RANK_DOWN
      ? '↘︎' : '-'
}
