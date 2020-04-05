export type PositionScoreTuple = [number, number]

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

export const getScore = (position: PositionScoreTuple[0]): number => {
  const score = scoreTable.find((tuple) => tuple[0] === position)

  if (!score) {
    return 0
  }

  return score[1]
}
