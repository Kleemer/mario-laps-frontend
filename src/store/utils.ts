import { ResetMixin } from './types'

/**
 * Reset Mixin is used for modules that need to be reset on logout.
 * It is spread over mutation object in your particular module.
 */
export const resetMixin = <T extends Record<string, any>>(initialState: () => T): ResetMixin<T> => ({
  reset(currentState: T, keep?: ReadonlyArray<string & keyof T>): void {
    const state = initialState()
    const keepItems = keep || []

    Object.entries(currentState).forEach(([ key, value ]) => {
      const keepCurrentState = keepItems.some((keepKey) => keepKey === key)
      const resetValue = keepCurrentState ? value : state[key]
      currentState[key as keyof T] = typeof resetValue === 'undefined' ? value : resetValue
    })
  },
})
