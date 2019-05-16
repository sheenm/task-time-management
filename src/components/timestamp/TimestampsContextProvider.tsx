import { ITimestamp } from 'app/dto'
import React from 'react'
import { neverReached } from 'utils/neverReached'

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

interface ITimestampsContext {
  stateTimestamps: ITimestamp[]
  dispatch: React.Dispatch<ActionTypes>
}

export const TimestampsContext = React.createContext<ITimestampsContext>({
  dispatch: () => {
    throw new Error('Timestamps context is not implemented')
  },
  stateTimestamps: []
})

export const TimestampsContextProvider: React.FC = ({ children }) => {
  const [stateTimestamps, dispatch] = React.useReducer(reducer, [])

  return <TimestampsContext.Provider value={{ stateTimestamps, dispatch }}>
    {children}
  </TimestampsContext.Provider>
}
