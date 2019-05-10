import { ButtonGroup, Card, Collapse, EditableText, Elevation } from '@blueprintjs/core'
import { ToggleTaskStartPresenter } from 'components/task/ToggleTaskStartPresenter'
import { ITimestampPresenterProps } from 'components/timestamp/TimestampPresenter'
import { ToggleOpenPresenter } from 'components/toggles/ToggleOpenPresenter'
import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'

const styles = {
  card: {
    display: 'grid',
    gridTemplateColumns: '[text] minmax(100px, 1fr) [actions] auto',
    alignItems: 'center',
    gridColumnGap: '1rem',
    gridRowGap: '.5rem',
    padding: '.5rem'
  },
  text: {
    gridColumn: 'text',
  },
  actions: {
    gridColumn: 'actions'
  },
  timestamps: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridRowGap: '0.5rem',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'auto-fit'
  }
}

interface IProps extends WithSheet<typeof styles, {}> {
  title: string
  changeTitle: (newTitle: string) => void
  isOpen: boolean
  toggleOpen: () => void
  isStarted: boolean
  toggleTaskStart: () => void
  children?: Array<React.ReactElement<ITimestampPresenterProps>> | React.ReactElement<ITimestampPresenterProps>
}

const TaskPresenterInner: React.FC<IProps> = ({ classes, ...props }) => {

  return (
    <Card elevation={Elevation.ZERO} className={classes.card}>
      <EditableText confirmOnEnterKey onConfirm={props.changeTitle} defaultValue={props.title} className={classes.text} />
      <ButtonGroup className={classes.actions} minimal>
        <ToggleOpenPresenter isOpen={props.isOpen} onFoldChanged={props.toggleOpen} contentTitle='timestamps' />
        <ToggleTaskStartPresenter isStarted={props.isStarted} toggleTaskStart={props.toggleTaskStart} />
      </ButtonGroup>
      <Collapse isOpen={props.isOpen} className={classes.timestamps}>
        {props.children || <p>This task has no entries yet</p>}
      </Collapse>
    </Card>
  )
}

export const TaskPresenter = injectSheet(styles)(TaskPresenterInner)
