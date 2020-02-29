export const NO_RANK_CHANGE = 0
export const RANK_UP = 1
export const RANK_DOWN = -1

export const getRankState = (rank: number) => {
  return rank === RANK_UP
    ? '↗︎' : rank === RANK_DOWN
      ? '↘︎' : '-'
}
