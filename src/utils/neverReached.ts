/**
 * use this function to on type-checking step forbid to execute code there
 * (useful in switch)
 */
export const neverReached = (never: never) => {
  throw new Error('did not set all action types in reducer')
}
