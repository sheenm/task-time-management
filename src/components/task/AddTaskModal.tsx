import { Button, Classes, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { ITask, WithoutId } from 'app/businessObjects'
import { ThemedDialog } from 'components/layout/ThemedDialog'
import { ProjectsContext } from 'components/project/ProjectsContextProvider'
import { ServiceContext } from 'components/services/ServiceContext'
import { TasksContext } from 'components/task/TasksContextProvider'
import React from 'react'

interface IProps {
  closeModal: () => void
  projectId: number
}

export const AddTaskModal: React.FC<IProps> = ({ closeModal, projectId }) => {

  const [taskTitle, setTaskTitle] = React.useState('')
  const { tasksService } = React.useContext(ServiceContext)
  const { dispatch } = React.useContext(TasksContext)
  const { stateProjects } = React.useContext(ProjectsContext)

  const onTitleChanged = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    setTaskTitle(e.target.value), [])

  const createTask = () => {
    const task: WithoutId<ITask> = {
      projectId,
      title: taskTitle
    }

    tasksService.add(task)
      .then((id) => {
        dispatch({ type: 'ADD_TASK', task: { ...task, id } })
        closeModal()
      })
  }

  const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      createTask()
  }

  // not found or did not load yet
  const project = stateProjects.get(projectId)
  if (project === undefined)
    return <div />

  return <ThemedDialog
    title='Adding a task'
    isOpen={true}
    onClose={closeModal}
  >
    <section className={Classes.DIALOG_BODY}>
      <FormGroup label='Title:' labelFor='addTaskInput'>
        <InputGroup
          id='addTaskInput'
          onChange={onTitleChanged}
          value={taskTitle}
          onKeyDown={onEnterPressed}
          autoFocus />
      </FormGroup>
    </section>

    <section className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={closeModal} title='Close dialog'>Close</Button>
        <Button intent={Intent.PRIMARY} onClick={createTask} title='Add task'>
          Add task
        </Button>
      </div>
    </section>
  </ThemedDialog>
}
