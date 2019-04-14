import React from 'react'

/**
 * Provides state (On/Off) and toggle function to a component
 * @param initialState with which state will it be initialized
 */
export function useToggle(initialState: boolean): [boolean, () => void] {
  const [isOn, setIsOn] = React.useState(initialState)

  const setOn = React.useCallback(() => setIsOn(true), [])
  const setOff = React.useCallback(() => setIsOn(false), [])

  return [isOn, isOn ? setOff : setOn]
}
