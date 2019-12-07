import { Button, EditableText, H2 } from '@blueprintjs/core'
import { AddTaskLink } from 'components/task/AddTaskLink'
import * as React from 'react'
import styles from './ProjectPresenter.module.scss'

interface IProps {
  projectId: number
  title: string
  onTitleChanged: (title: string) => void
}

export const ProjectPresenter: React.FC<IProps> = (props) => {

  return <section className={styles.container}>
    <H2>
      <EditableText
        confirmOnEnterKey
        value={props.title}
        onChange={props.onTitleChanged}
        multiline
        className={styles.text}
      />
    </H2>
    <AddTaskLink projectId={props.projectId}>
      <Button icon='plus' title='add task' minimal />
    </AddTaskLink>
  </section>
}
