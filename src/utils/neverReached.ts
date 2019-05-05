/**
 * use this function to on type-checking step forbid to execute code there
 * (userfull in switch)
 */
export const neverReached = (never: never) => {
  throw new Error('did not set all actiontypes in reducer')
}
