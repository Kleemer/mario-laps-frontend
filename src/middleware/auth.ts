import { NavigationGuard, Route } from 'vue-router'
import { getLoggedInCookie } from '@/shared/auth'
import { getPlayerUsername } from '@/shared/user'
import { Store } from 'vuex'
import { RootState } from '@/store/types'

const loginRedirect = (next: Function, to: Route): void => next({
  name: 'login',
  params: { nextUrl: to.fullPath },
})

const authMiddleware = (store: Store<RootState>): NavigationGuard => async (to, _, next): Promise<void> => {
  // Always set username if available
  const username = getPlayerUsername()
  if (username) {
    store.dispatch('setPlayerUsername', getPlayerUsername())
  }

  // If we are not logged in and a route requires it, redirect to login.
  const routeRequiresAuthentication = to.matched.some((record) => !record.meta?.anonymous)
  if (routeRequiresAuthentication && (!getLoggedInCookie() || !username)) {
    return loginRedirect(next, to)
  }

  // All Good! The route either does not require permissions or we fulfill all the auth requirements
  return next()
}

export default authMiddleware
