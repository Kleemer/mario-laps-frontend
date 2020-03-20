interface User {
  id: string
  username: string
  score?: number
}

export interface RoomState {
  id: string | null
  hostId: string | null
  users: User[]
}
