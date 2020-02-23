import { toPath } from './utils'

export interface Route {
  type: string;
  method: string;
  path: string;
}

export interface RouteWithParams<T extends Function = (...args: any[]) => string> {
  type: string;
  method: string;
  path: T;
}

/**
 * @see App\Http\Controllers\AuthController@login
 */
const login: Route = {
  type: 'LoginPayload',
  method: 'POST',
  path: toPath('/auth/login'),
}

/**
 * @see App\Http\Controllers\AuthController@logout
 */
const logout: Route = {
  type: 'LogoutPayload',
  method: 'POST',
  path: toPath('/auth/logout'),
}


/**
 * @deprecated
 * @see App\Http\Controllers\UserController@index
 */
const users: Route = {
  type: 'UsersPayload',
  method: 'GET',
  path: toPath('/users'),
}

/**
 * @see App\Http\Controllers\MarioLapController@store
 */
const createMarioLap: Route = {
  type: 'MarioLapPayload',
  method: 'POST',
  path: toPath('/mariolaps'),
}

/**
 * @see App\Http\Controllers\MarioLapRaceController@store
 */
const createRace: RouteWithParams = {
  type: 'MarioLapPayload',
  method: 'POST',
  path: (marioLapId: string) => toPath(`/mariolaps/${marioLapId}/races`),
}


/**
 * @see App\Http\Controllers\UserRaceController@store
 */
const createUserRace: RouteWithParams = {
  type: 'MarioLapPayload',
  method: 'POST',
  path: (raceId: string) => toPath(`/races/${raceId}`),
}


export const routes = {
  createMarioLap,
  createRace,
  createUserRace,
  login,
  logout,
  users,
}
export default routes
