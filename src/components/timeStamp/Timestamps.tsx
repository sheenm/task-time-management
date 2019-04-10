import { ITimestamp } from 'app/dto'
import React, { useReducer } from 'react'
import { useLoading } from '../../hooks/useLoading'
import { neverReached } from '../../utils/neverReached'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { Timestamp } from './Timestamp'

interface ILoadTimestampsAction {
  type: 'LOAD_TIMESTAMPS'
  timestamps: ITimestamp[]
}

interface IRemoveTimestampAction {
  type: 'REMOVE_TIMESTAMP'
  id: number
}

interface IRenameTimestampAction {
  type: 'CHANGE_TIMESTAMP_COMMENT'
  id: number
  newComment: string
}

type ActionTypes = ILoadTimestampsAction | IRemoveTimestampAction | IRenameTimestampAction

const reducer = (state: ITimestamp[], action: ActionTypes) => {

  switch (action.type) {
    case 'LOAD_TIMESTAMPS':
      return action.timestamps
    case 'REMOVE_TIMESTAMP':
      const removedIndex = state.findIndex(x => x.id === action.id)
      const removedState = [...state]
      removedState.splice(removedIndex, 1)

      return removedState
    case 'CHANGE_TIMESTAMP_COMMENT':
      const renamedState = [...state]
      const renamedIndex = state.findIndex(x => x.id === action.id)
      renamedState[renamedIndex].comment = action.newComment

      return renamedState
    default:
      return neverReached(action)
  }
}

interface IProps {
  taskId: number
}

export const Timestamps: React.FC<IProps> = ({ taskId }) => {
  const [stateTimestamps, dispatch] = useReducer(reducer, [])
  const { timestampsRepo } = React.useContext(RepositoryContext)
  const isLoading = useLoading(() => timestampsRepo.get(taskId),
    timestamps => dispatch({ type: 'LOAD_TIMESTAMPS', timestamps }))

  const createChangeCommentFn = (id: number) =>
    (newComment: string) => dispatch({ type: 'CHANGE_TIMESTAMP_COMMENT', id, newComment })
  const createRemoveFn = (id: number) =>
    () => dispatch({ type: 'REMOVE_TIMESTAMP', id })

  if (isLoading)
    return <h1>todo loading 10. Data loading trobber</h1>

  return <>
    {stateTimestamps.map(x =>
      <Timestamp
        key={x.id}
        timestamp={x}
        changeComment={createChangeCommentFn(x.id)}
        remove={createRemoveFn(x.id)} />
    )}
  </>
}
