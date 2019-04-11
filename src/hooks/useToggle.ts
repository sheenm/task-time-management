import React from 'react'

export function useToggle(initialState: boolean): [boolean, () => void] {
  const [isOn, setIsOn] = React.useState(initialState)

  const setOn = React.useCallback(() => setIsOn(true), [])
  const setOff = React.useCallback(() => setIsOn(false), [])

  return [isOn, isOn ? setOff : setOn]
}
