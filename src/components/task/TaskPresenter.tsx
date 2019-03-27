import { ButtonGroup, Card, Collapse, EditableText, Elevation } from '@blueprintjs/core'
import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { ITimeStampPresenterProps } from '../timeStamp/TimeStampPresenter'
import { ToggleTaskStartPresenter } from './ToggleTaskStartPresenter'
import { ToggleTimeStampsPresenter } from './ToggleTimeStampsPresenter'

const styles = {
  card: {
    display: 'grid',
    gridTemplateColumns: '[text] minmax(100px, 1fr) [actions] minmax(70px, auto)',
    alignItems: 'center',
    gridColumnGap: '1rem',
    gridRowGap: '1rem',
    padding: '.5rem',
  },
  text: {
    gridColumn: 'text',
  },
  actions: {
    gridColumn: 'actions'
  },
  timeStamps: {
    gridColumn: '1 / -1'
  }
}

interface IProps extends WithSheet<typeof styles, {}> {
  title: string
  onTitleChanged: (newTitle: string) => void
  isOpen: boolean
  onOpenChanged: () => void
  isStarted: boolean
  toggleTaskStart: () => void
  children?: Array<React.ReactElement<ITimeStampPresenterProps>> | React.ReactElement<ITimeStampPresenterProps>
}

const TaskPresenterInner: React.FC<IProps> = ({ classes, ...props }) => {

  return (
    <Card elevation={Elevation.ZERO} className={classes.card}>
      <EditableText confirmOnEnterKey onConfirm={props.onTitleChanged} defaultValue={props.title} className={classes.text} />
      <ButtonGroup className={classes.actions} minimal>
        <ToggleTimeStampsPresenter isOpen={props.isOpen} onFoldChanged={props.onOpenChanged} />
        <ToggleTaskStartPresenter isStarted={props.isStarted} toggleTaskStart={props.toggleTaskStart} />
      </ButtonGroup>
      <Collapse isOpen={props.isOpen} className={classes.timeStamps} >
        {props.children || <p>This task has no entries yet</p>}
      </Collapse>
    </Card>
  )
}

export const TaskPresenter = injectSheet(styles)(TaskPresenterInner)
