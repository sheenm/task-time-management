import { Button } from '@blueprintjs/core'
import React from 'react'

interface IProps {
  isStarted: boolean
  toggleTaskStart: () => void
}

export const ToggleTaskStartPresenter: React.FC<IProps> = (props) => {
  if (props.isStarted)
    return <Button icon='stop' onClick={props.toggleTaskStart} title='stop task' />
  else
    return <Button icon='play' onClick={props.toggleTaskStart} title='start task' />
}
