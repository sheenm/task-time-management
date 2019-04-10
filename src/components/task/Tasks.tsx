import { ITask } from 'app/dto'
import React, { useReducer } from 'react'
import { useLoading } from '../../hooks/useLoading'
import { neverReached } from '../../utils/neverReached'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { Task } from './Task'

interface ILoadTasksAction {
  type: 'LOAD_TASKS'
  tasks: ITask[]
}

interface IRenameTaskAction {
  type: 'RENAME_TASK'
  id: number,
  newTitle: string
}

type ActionTypes = ILoadTasksAction | IRenameTaskAction

const reducer = (state: ITask[], action: ActionTypes) => {

  switch (action.type) {
    case 'LOAD_TASKS':
      return action.tasks
    case 'RENAME_TASK':
      const renamedState = [...state]
      const renamedIndex = state.findIndex(x => x.id === action.id)
      renamedState[renamedIndex].title = action.newTitle

      return renamedState
    default:
      return neverReached(action)
  }
}

interface IProps {
  projectId: number
}

export const Tasks: React.FC<IProps> = ({ projectId }) => {
  const [stateTasks, dispatch] = useReducer(reducer, [])
  const { tasksRepo } = React.useContext(RepositoryContext)
  const isLoading = useLoading(() => tasksRepo.get(projectId),
    tasks => dispatch({ type: 'LOAD_TASKS', tasks }))

  const createRenameFn = (id: number) =>
    (newTitle: string) => dispatch({ type: 'RENAME_TASK', id, newTitle })

  if (isLoading)
    return <h1>todo loading 10. Data loading trobber</h1>

  return <>
    {stateTasks.map(x =>
      <Task key={x.id} task={x} rename={createRenameFn(x.id)} />
    )}
  </>
}
