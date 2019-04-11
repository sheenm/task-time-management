import React from 'react'

export function useToggle(initialState: boolean): [boolean, () => void] {
  const [isOn, setIsOn] = React.useState(initialState)

  return [isOn, () => setIsOn(!isOn)]
}
