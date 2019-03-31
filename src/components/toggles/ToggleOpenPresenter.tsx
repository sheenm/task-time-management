import { Button } from '@blueprintjs/core'
import React from 'react'

interface IProps {
  isOpen: boolean
  onFoldChanged: () => void
  contentTitle: string
}

export const ToggleOpenPresenter: React.FC<IProps> = (props) => {
  if (props.isOpen)
    return <Button icon='eye-off' onClick={props.onFoldChanged} title={`hide ${props.contentTitle}`} />
  else
    return <Button icon='eye-open' onClick={props.onFoldChanged} title={`show ${props.contentTitle}`} />
}
