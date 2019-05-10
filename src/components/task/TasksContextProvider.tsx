import { ITask } from 'app/dto'
import React from 'react'
import { neverReached } from 'utils/neverReached'

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
  projectId: number
}

interface ITasksContext {
  stateTasks: ITask[]
  dispatch: React.Dispatch<ActionTypes>
}

export const TasksContext = React.createContext<ITasksContext>({
  dispatch: () => {
    throw new Error('Tasks context is not implemented')
  },
  stateTasks: []
})

export const TasksContextProvider: React.FC<IProps> = ({ children, projectId }) => {
  const [stateTasks, dispatch] = React.useReducer(reducer, [])

  return <TasksContext.Provider value={{ stateTasks, dispatch }}>
    {children}
  </TasksContext.Provider>
}
