import React from 'react'

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
