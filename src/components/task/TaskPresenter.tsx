import { ButtonGroup, Card, Collapse, Colors, EditableText, Elevation } from '@blueprintjs/core'
import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { ITimeStampPresenterProps } from '../timeStamp/TimeStampPresenter'
import { ToggleOpenPresenter } from '../toggles/ToggleOpenPresenter'
import { ToggleTaskStartPresenter } from './ToggleTaskStartPresenter'

const styles = {
  card: {
    display: 'grid',
    gridTemplateColumns: '[text] minmax(100px, 1fr) [actions] auto',
    alignItems: 'center',
    gridColumnGap: '1rem',
    gridRowGap: '.5rem',
    padding: '.5rem',
    backgroundColor: Colors.LIGHT_GRAY3
  },
  text: {
    gridColumn: 'text',
  },
  actions: {
    gridColumn: 'actions'
  },
  timeStamps: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridRowGap: '0.5rem',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'auto-fit'
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
        <ToggleOpenPresenter isOpen={props.isOpen} onFoldChanged={props.onOpenChanged} contentTitle='timestamps' />
        <ToggleTaskStartPresenter isStarted={props.isStarted} toggleTaskStart={props.toggleTaskStart} />
      </ButtonGroup>
      <Collapse isOpen={props.isOpen} className={classes.timeStamps}>
        {props.children || <p>This task has no entries yet</p>}
      </Collapse>
    </Card>
  )
}

export const TaskPresenter = injectSheet(styles)(TaskPresenterInner)
