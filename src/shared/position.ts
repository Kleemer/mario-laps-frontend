import { Race } from '@/types/models'
import { Position } from './score'

export const getPosition = (race: Race, userId: string): Position | undefined => {
  const user = race
    .userRaces
    .find((e) => e.userId === userId)

  return user?.position
}


export const getRelativePosition = (race: Race, userId: string): Position => {
  const sortedUsers = race
    .userRaces
    .sort((u1, u2) => u1.position - u2.position)

  return sortedUsers.findIndex((u) => u.userId === userId) + 1
}
