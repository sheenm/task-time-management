import { Button } from '@blueprintjs/core'
import React from 'react'

interface IProps {
  isOpen: boolean
  onFoldChanged: () => void
}

export const ToggleTimeStampsPresenter: React.FC<IProps> = (props) => {
  if (props.isOpen)
    return <Button icon='eye-off' onClick={props.onFoldChanged} title='hide timestamps' />
  else
    return <Button icon='eye-open' onClick={props.onFoldChanged} title='show timestamps' />
}
