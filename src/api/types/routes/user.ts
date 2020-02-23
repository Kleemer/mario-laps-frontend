import { ResponseBody } from '@/api/types'
import { fetchJson } from '@/api'
import routes from '@/api/routes'

export type UserResponse = ResponseBody<Data>

export interface Data {
  id: string;
  username: string;
  avatar: string;
}
