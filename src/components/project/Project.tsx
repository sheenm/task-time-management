import { IProject, ITask, WithoutId } from 'app/dto'
import React, { useReducer } from 'react'
import { useLoading } from '../../hooks/useLoading'
import { neverReached } from '../../utils/neverReached'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { Task } from '../task/Task'
import { ProjectPresenter } from './ProjectPresenter'

interface ILoadTasksAction {
  type: 'LOAD_TASKS'
  tasks: ITask[]
}

interface IRenameTaskAction {
  type: 'RENAME_TASK'
  id: number,
  newTitle: string
}

interface IAddTaskAction {
  type: 'ADD_TASK',
  task: ITask
}

type ActionTypes = ILoadTasksAction | IRenameTaskAction | IAddTaskAction

const reducer = (state: ITask[], action: ActionTypes) => {

  switch (action.type) {
    case 'LOAD_TASKS':
      return action.tasks
    case 'RENAME_TASK':
      const renamedState = [...state]
      const renamedIndex = state.findIndex(x => x.id === action.id)
      renamedState[renamedIndex].title = action.newTitle

      return renamedState
    case 'ADD_TASK':
      return [...state, action.task]
    default:
      return neverReached(action)
  }
}

interface IProps {
  project: IProject
  rename: (newTitle: string) => void
}

export const Project: React.FC<IProps> = ({ project, rename }) => {
  const [stateTasks, dispatch] = useReducer(reducer, [])
  const { tasksRepo } = React.useContext(RepositoryContext)

  const loadingState = useLoading({
    load: () => tasksRepo.get(project.id),
    then: tasks => dispatch({ type: 'LOAD_TASKS', tasks }),
    dependencies: [project]
  })

  const createRenameFn = React.useCallback((task: ITask) => {
    return (newTitle: string) => {
      const changedTask: ITask = { ...task, title: newTitle }
      tasksRepo.save(changedTask)
        .then(() => dispatch({ type: 'RENAME_TASK', id: task.id, newTitle }))
    }
  }, [tasksRepo])

  const addTask = React.useCallback(() => {
    const task: WithoutId<ITask> = {
      projectId: project.id,
      title: 'Untitled'
    }

    tasksRepo.add(task)
      .then((id) => dispatch({ type: 'ADD_TASK', task: { ...task, id } }))
  }, [tasksRepo, project.id])

  if (loadingState === 'Loading')
    return <h1>todo loading 10. Data loading trobber</h1>

  return <>
    <ProjectPresenter
      title={project.title}
      onTitleChanged={rename}
      projectId={project.id}
    />
    {stateTasks.map(x =>
      <Task key={x.id} task={x} rename={createRenameFn(x)} />
    )}
  </>

}
