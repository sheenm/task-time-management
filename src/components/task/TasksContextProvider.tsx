import { Dictionary, ITask } from 'app/dto'
import React from 'react'
import { neverReached } from 'utils/neverReached'

interface ILoadTasksAction {
  type: 'LOAD_TASKS'
  tasks: Dictionary<ITask>
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

const reducer = (state: Dictionary<ITask>, action: ActionTypes) => {

  switch (action.type) {
    case 'LOAD_TASKS':
      return action.tasks
    case 'RENAME_TASK':
      const renamedState = new Map(state)
      const renamedItem = renamedState.get(action.id)
      if (renamedItem === undefined)
        return state

      renamedItem.title = action.newTitle

      return renamedState
    case 'ADD_TASK':
      const addedState = new Map(state)
      addedState.set(action.task.id, action.task)

      return addedState
    default:
      return neverReached(action)
  }
}

interface IProps {
  projectId: number
}

interface ITasksContext {
  stateTasks: Dictionary<ITask>
  dispatch: React.Dispatch<ActionTypes>
}

export const TasksContext = React.createContext<ITasksContext>({
  dispatch: () => {
    throw new Error('Tasks context is not implemented')
  },
  stateTasks: new Map()
})

export const TasksContextProvider: React.FC<IProps> = ({ children, projectId }) => {
  const [stateTasks, dispatch] = React.useReducer(reducer, new Map())

  return <TasksContext.Provider value={{ stateTasks, dispatch }}>
    {children}
  </TasksContext.Provider>
}
