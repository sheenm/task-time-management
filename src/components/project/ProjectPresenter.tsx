import { Button, ButtonGroup, Card, Collapse, Colors, EditableText, Elevation } from '@blueprintjs/core'
import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { ToggleOpenPresenter } from '../toggles/ToggleOpenPresenter'

const styles = {
  card: {
    display: 'grid',
    gridTemplateColumns: '[text] minmax(100px, 1fr) [actions] auto',
    alignItems: 'center',
    gridColumnGap: '1rem',
    gridRowGap: '.2rem',
    padding: '.5rem',
    backgroundColor: Colors.LIGHT_GRAY5,
    minWidth: 260,
  },
  text: {
    gridColumn: 'text',
  },
  actions: {
    gridColumn: 'actions'
  },
  entries: {
    gridColumn: '1 / -1'
  }
}

interface IProps extends WithSheet<typeof styles, {}> {
  isOpen: boolean
  toggleOpen: () => void

  title: string
  onTitleChanged: (title: string) => void

  addProject: () => void
  addTask: () => void
}

const ProjectPresenterInner: React.FC<IProps> = ({ classes, ...props }) => {

  return <Card elevation={Elevation.ZERO} className={classes.card}>
    <EditableText confirmOnEnterKey onConfirm={props.onTitleChanged} defaultValue={props.title} className={classes.text} />

    <ButtonGroup className={classes.actions} minimal>
      <ToggleOpenPresenter isOpen={props.isOpen} onFoldChanged={props.toggleOpen} contentTitle='tasks' />
      <Button icon='plus' title='add task' onClick={props.addTask} />
      <Button icon='folder-new' title='add subproject' onClick={props.addProject} />
    </ButtonGroup>
    <Collapse isOpen={props.isOpen} className={classes.entries}>
      {props.children || <p>This project has no entries yet</p>}
    </Collapse>
  </Card>
}

export const ProjectPresenter = injectSheet(styles)(ProjectPresenterInner)
