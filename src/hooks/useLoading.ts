import React from 'react'

export enum LoadingStastes {
  Initial,
  Loading,
  Success,
  Error
}

interface IUseLoadingProps<T> {
  load: () => Promise<T>
  dependencies?: ReadonlyArray<unknown>
  then: (info: T) => void
  error?: (message: string) => void
}

/**
 * React hook which loads data and provides isLoading state value
 * @param load what to await before component is loaded
 * @param dependencies will only activate if item from dependencies changes
 */
export function useLoading<T>({ load, dependencies = [], then, error }: IUseLoadingProps<T>) {

  const [loadingState, setState] = React.useState(LoadingStastes.Initial)

  React.useEffect(() => {
    let didCancel = false

    setState(LoadingStastes.Loading)
    load()
      .then(info => {
        if (didCancel)
          return

        setState(LoadingStastes.Success)
        then(info)
      })
      .catch((message: string) => {
        setState(LoadingStastes.Error)
        if (error !== undefined)
          error(message)
      }
      )

    return () => { didCancel = true }
  }, [...dependencies])

  return loadingState
}
