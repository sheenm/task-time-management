import { Button, Classes, Dialog, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { ITask, WithoutId } from 'app/dto'
import { RepositoryContext } from 'components/repositories/RepositoryContext'
import { TasksContext } from 'components/task/TasksContextProvider'
import React from 'react'

interface IProps {
  closeModal: () => void
  projectId: number
}

export const AddTaskModal: React.FC<IProps> = ({ closeModal, projectId }) => {

  const [taskTitle, setTaskTitle] = React.useState('')
  const { tasksRepo } = React.useContext(RepositoryContext)
  const { dispatch } = React.useContext(TasksContext)

  const onTitleChanged = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    setTaskTitle(e.target.value), [])

  const createTask = React.useCallback(() => {
    const task: WithoutId<ITask> = {
      projectId,
      title: taskTitle
    }

    tasksRepo.add(task)
      .then((id) => {
        dispatch({ type: 'ADD_TASK', task: { ...task, id } })
        closeModal()
      })
  }, [tasksRepo, projectId, taskTitle])

  const onEnterPressed = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      createTask()
  }, [createTask])

  return <Dialog
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
  </Dialog>
}