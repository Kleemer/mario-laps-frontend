import { RawUser } from '../routes/types'
import { User } from '@/types/models'

export const normalizeUser = (rawUser: RawUser): User => {
  return {
    id: rawUser.id,
    username: rawUser.username,
    avatar: rawUser?.avatar,
  }
}
