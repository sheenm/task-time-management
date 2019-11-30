import { ButtonGroup, Card, Collapse, EditableText, Elevation } from '@blueprintjs/core'
import { ToggleTaskStartPresenter } from 'components/task/ToggleTaskStartPresenter'
import { ITimestampPresenterProps } from 'components/timestamp/TimestampPresenter'
import { ToggleOpenPresenter } from 'components/toggles/ToggleOpenPresenter'
import * as React from 'react'
import styles from './TaskPresenter.module.scss'

interface IProps {
  title: string
  changeTitle: (newTitle: string) => void
  isOpen: boolean
  toggleOpen: () => void
  isStarted: boolean
  toggleTaskStart: () => void
  children?: Array<React.ReactElement<ITimestampPresenterProps>> | React.ReactElement<ITimestampPresenterProps>
}

export const TaskPresenter: React.FC<IProps> = (props) => {

  return (
    <Card elevation={Elevation.ZERO} className={styles.card}>
      <EditableText confirmOnEnterKey onConfirm={props.changeTitle} defaultValue={props.title} className={styles.text} />
      <ButtonGroup className={styles.actions} minimal>
        <ToggleOpenPresenter isOpen={props.isOpen} onFoldChanged={props.toggleOpen} contentTitle='timestamps' />
        <ToggleTaskStartPresenter isStarted={props.isStarted} toggleTaskStart={props.toggleTaskStart} />
      </ButtonGroup>
      <Collapse isOpen={props.isOpen} className={styles.timestamps}>
        {props.children || <p>This task has no entries yet</p>}
      </Collapse>
    </Card>
  )
}
