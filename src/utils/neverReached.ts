export const neverReached = (never: never) => {
  throw new Error('did not set all actiontypes in reducer')
}
