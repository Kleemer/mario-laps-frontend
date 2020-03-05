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
 * @deprecated
 * @see App\Http\Controllers\MarioLapController@index
 */
const createMarioLap: Route = {
  type: 'MarioLapPayload',
  method: 'POST',
  path: toPath('/mario-laps'),
}

/**
 * @see App\Http\Controllers\RoundController@store
 */
const createRound: Route = {
  type: 'RoundPayload',
  method: 'POST',
  path: toPath('/rounds'),
}

/**
 * @see App\Http\Controllers\MarioLapRaceController@store
 */
const createRace: RouteWithParams = {
  type: 'RacePayload',
  method: 'POST',
  path: (roundId: string) => toPath(`/rounds/${roundId}/races`),
}


/**
 * @see App\Http\Controllers\UserRaceController@store
 */
const createUserRace: RouteWithParams = {
  type: 'UserRacePayload',
  method: 'POST',
  path: (raceId: string) => toPath(`/races/${raceId}`),
}


export const routes = {
  createMarioLap,
  createRace,
  createRound,
  createUserRace,
  login,
  logout,
  users,
}

export default routes
