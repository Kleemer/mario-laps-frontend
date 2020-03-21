import { ResetMixin } from './types'

/**
 * Reset Mixin is used for modules that need to be reset on logout.
 * It is spread over mutation object in your particular module.
 */
export const resetMixin = <T>(initialState: () => T): ResetMixin<T> => ({
  reset(currentState: T): void {
    Object.assign(currentState, initialState())
  },
})
