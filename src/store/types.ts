import { User } from '@/types'

export interface RootState {
  player: User | Record<string, any>
}
