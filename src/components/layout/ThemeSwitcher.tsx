import React from 'react'
import { Button, Classes, Tooltip } from '@blueprintjs/core'
import { themeHandler } from 'utils/themeHandler'

const root = document.getElementById('root')

/**
 * Light/Dark Theme Switcher
 */
export const ThemeSwitcher: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(themeHandler.isDarkTheme())

  React.useEffect(() => {
    if (isDarkTheme)
      root!.classList.add(Classes.DARK)
    else root!.classList.remove(Classes.DARK)

    themeHandler.saveTheme(isDarkTheme)
  }, [isDarkTheme])

  return <Tooltip content='Toggle light/dark themes'>
    <Button minimal icon='moon' onClick={() => setIsDarkTheme(s => !s)} />
  </Tooltip>
}
