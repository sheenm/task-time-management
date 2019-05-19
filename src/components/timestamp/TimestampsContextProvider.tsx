import { Dictionary, ITimestamp } from 'app/businessObjects'
import React from 'react'
import { neverReached } from 'utils/neverReached'

interface ILoadTimestampsAction {
  type: 'LOAD_TIMESTAMPS'
  timestamps: Dictionary<ITimestamp>
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

const reducer = (state: Dictionary<ITimestamp>, action: ActionTypes) => {

  switch (action.type) {
    case 'LOAD_TIMESTAMPS':
      return action.timestamps
    case 'REMOVE_TIMESTAMP':
      const removedState = new Map(state)
      removedState.delete(action.id)

      return removedState
    case 'CHANGE_TIMESTAMP':
      const changedState = new Map(state)
      changedState.set(action.changedTimestamp.id, action.changedTimestamp)

      return changedState
    case 'CREATE_TIMESTAMP':
      const newState = new Map(state)
      newState.set(action.timestamp.id, action.timestamp)

      return newState
    default:
      return neverReached(action)
  }
}

interface ITimestampsContext {
  stateTimestamps: Dictionary<ITimestamp>
  dispatch: React.Dispatch<ActionTypes>
}

export const TimestampsContext = React.createContext<ITimestampsContext>({
  dispatch: () => {
    throw new Error('Timestamps context is not implemented')
  },
  stateTimestamps: new Map()
})

export const TimestampsContextProvider: React.FC = ({ children }) => {
  const [stateTimestamps, dispatch] = React.useReducer(reducer, new Map())

  return <TimestampsContext.Provider value={{ stateTimestamps, dispatch }}>
    {children}
  </TimestampsContext.Provider>
}
