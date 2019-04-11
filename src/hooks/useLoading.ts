import React from 'react'

/**
 * React hook which loads data and provides isLoading state value
 * @param load what to await before component is loaded
 * @param then what to do when the component is loaded
 */
export function useLoading<T>(load: () => Promise<T>, then: (info: T) => void) {
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    let didCancel = false

    setIsLoading(true)
    load()
      .then(info => {
        if (didCancel)
          return

        setIsLoading(false)
        then(info)
      })

    return () => { didCancel = true }
  }, [])

  return isLoading
}
