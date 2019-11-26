import { Button, EditableText, H2 } from '@blueprintjs/core'
import { AddTaskLink } from 'components/task/AddTaskLink'
import * as React from 'react'
import injectSheet, { WithStyles } from 'react-jss'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  text: {
    flex: 1
  }
}

interface IProps extends WithStyles<typeof styles> {
  projectId: number
  title: string
  onTitleChanged: (title: string) => void
}

const ProjectPresenterInner: React.FC<IProps> = ({ classes, ...props }) => {

  return <section className={classes.container}>
    <H2>
      <EditableText
        confirmOnEnterKey
        onConfirm={props.onTitleChanged}
        defaultValue={props.title}
        multiline
        className={classes.text}
      />
    </H2>
    <AddTaskLink projectId={props.projectId}>
      <Button icon='plus' title='add task' minimal />
    </AddTaskLink>
  </section>
}

export const ProjectPresenter = injectSheet(styles)(ProjectPresenterInner)
