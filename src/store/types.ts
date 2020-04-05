import { User } from '@/types'

export interface RootState {
  player: User | Record<string, any>
  socketId: String | null
}

export interface ResetMixin<T> {
  reset: (currentState: T) => void;
}
