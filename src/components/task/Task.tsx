import { ITask, ITimestamp } from 'app/dto'
import React, { useReducer } from 'react'
import { LoadingStastes, useLoading } from '../../hooks/useLoading'
import { useToggle } from '../../hooks/useToggle'
import { neverReached } from '../../utils/neverReached'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { Timestamp } from '../timestamp/Timestamp'
import { TaskPresenter } from './TaskPresenter'

interface ILoadTimestampsAction {
  type: 'LOAD_TIMESTAMPS'
  timestamps: ITimestamp[]
}

interface IRemoveTimestampAction {
  type: 'REMOVE_TIMESTAMP'
  id: number
}

interface IChangeTimestampAction {
  type: 'CHANGE_TIMESTAMP'
  changedTimestamp: ITimestamp
}

interface ICreateTimestampAction {
  type: 'CREATE_TIMESTAMP',
  timestamp: ITimestamp
}

type ActionTypes = ILoadTimestampsAction |
  IRemoveTimestampAction |
  IChangeTimestampAction |
  ICreateTimestampAction

const reducer = (state: ITimestamp[], action: ActionTypes) => {

  switch (action.type) {
    case 'LOAD_TIMESTAMPS':
      return action.timestamps
    case 'REMOVE_TIMESTAMP':
      const removedIndex = state.findIndex(x => x.id === action.id)
      const removedState = [...state]
      removedState.splice(removedIndex, 1)

      return removedState
    case 'CHANGE_TIMESTAMP':
      const changedState = [...state]
      const changedIndex = state.findIndex(x => x.id === action.changedTimestamp.id)
      changedState.splice(changedIndex, 1, action.changedTimestamp)

      return changedState
    case 'CREATE_TIMESTAMP':
      return [...state, action.timestamp]
    default:
      return neverReached(action)
  }
}

interface IProps {
  task: ITask
  rename: (newTitle: string) => void
}

export const Task: React.FC<IProps> = ({ task, rename }) => {
  const [isOpen, toggleOpen] = useToggle(false)
  const [stateTimestamps, dispatch] = useReducer(reducer, [])
  const { timestampsRepo } = React.useContext(RepositoryContext)

  const loadingState = useLoading(() => timestampsRepo.get(task.id))
    (timestamps => dispatch({ type: 'LOAD_TIMESTAMPS', timestamps }))

  const createChangeCommentFn = (timestamp: ITimestamp) =>
    (newComment: string) => {
      const changedTimestamp: ITimestamp = { ...timestamp, comment: newComment }
      timestampsRepo.save(changedTimestamp)
        .then(() => dispatch({ type: 'CHANGE_TIMESTAMP', changedTimestamp }))
    }

  const createRemoveFn = (id: number) =>
    () => timestampsRepo.delete(id)
      .then(() => dispatch({ type: 'REMOVE_TIMESTAMP', id }))

  const toggleTaskStart = React.useCallback(() =>
    console.log('todo 2: Can Start and Stop tasks'), [])

  if (loadingState === LoadingStastes.Loading)
    return <h1>todo loading 10. Data loading trobber</h1>

  return <TaskPresenter
    title={task.title}
    changeTitle={rename}
    isOpen={isOpen}
    toggleOpen={toggleOpen}
    isStarted={false}
    toggleTaskStart={toggleTaskStart}
  >
    {stateTimestamps.map(x =>
      <Timestamp
        key={x.id}
        timestamp={x}
        changeComment={createChangeCommentFn(x)}
        remove={createRemoveFn(x.id)} />
    )}
  </TaskPresenter>
}
