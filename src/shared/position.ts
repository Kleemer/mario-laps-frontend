import { Race } from '@/store/modules/races/types'
import { Position } from './score'

export const getPosition = (race: Race, userId: string): Position | undefined => {
  const user = race
    .users
    .find((e) => e.user_id === userId)

  return user?.position
}


export const getRelativePosition = (race: Race, userId: string): Position => {
  const sortedUsers = race
    .users
    .sort((u1, u2) => u1.position - u2.position)

  return sortedUsers.findIndex((u) => u.user_id === userId) + 1
}
