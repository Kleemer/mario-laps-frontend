import { User } from '@/types'

export interface RootState {
  user: User | Record<string, any>
  socketId: String | null
}

export interface ResetMixin<T> {
  reset: (currentState: T) => void;
}
