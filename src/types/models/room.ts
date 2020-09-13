import { User } from './user'

export interface Room {
  id: string;
  hostId: string;
  users: User[]
}
