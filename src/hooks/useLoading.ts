import React from 'react'

export enum LoadingStastes {
  Initial,
  Loading,
  Success,
  Error
}

/**
 * React hook which loads data and provides isLoading state value
 * @param load what to await before component is loaded
 * @param then what to do when the component is loaded
 */
export function useLoading<T>(load: () => Promise<T>) {
  return (then: (info: T) => void, error?: (message: string) => void) => {

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
    }, [])

    return loadingState
  }
}
