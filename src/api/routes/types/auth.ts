import { ResponseBody } from '@/api/routes/types'
export type AuthResponse = ResponseBody<JWT>

export interface JWT {
  access_token: string;
  token_type: string;
}
