import React from 'react'
import { Dialog, IDialogProps, Classes } from '@blueprintjs/core'
import { themeHandler } from 'utils/themeHandler'

/**
 * Dialog with ability to change appearance based on theme (light/dark)
 */
export const ThemedDialog: React.FC<IDialogProps> = (props) => {
  const darkClassName = themeHandler.isDarkTheme() ? Classes.DARK : ''
  return <Dialog {...props} className={darkClassName} />
}
