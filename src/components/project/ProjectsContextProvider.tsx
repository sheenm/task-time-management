import { IProject } from "app/dto"
import React from 'react'
import { neverReached } from "../../utils/neverReached"

interface ILoadProjectsAction {
  type: 'LOAD_PROJECTS'
  projects: IProject[]
}
interface IRenameProjectAction {
  type: 'RENAME_PROJECT'
  id: number
  newTitle: string
}

interface IAddProjectAction {
  type: 'ADD_PROJECT',
  project: IProject
}

type ActionTypes = ILoadProjectsAction | IRenameProjectAction | IAddProjectAction

const reducer = (state: IProject[], action: ActionTypes) => {
  switch (action.type) {
    case 'LOAD_PROJECTS':
      return action.projects
    case 'RENAME_PROJECT':
      const renameIndex = state.findIndex(x => x.id === action.id)
      const renamedState = [...state]
      renamedState[renameIndex].title = action.newTitle

      return renamedState
    case 'ADD_PROJECT':
      return [...state, action.project]
    default:
      return neverReached(action)
  }
}

interface IProjectsContext {
  stateProjects: IProject[]
  dispatch: React.Dispatch<ActionTypes>
}

export const ProjectsContext = React.createContext<IProjectsContext>({
  dispatch: () => {
    throw new Error('Project context is not implemented')
  },
  stateProjects: []
})

export const ProjectsContextProvider: React.FC = ({ children }) => {
  const [stateProjects, dispatch] = React.useReducer(reducer, [])

  return <ProjectsContext.Provider value={{ stateProjects, dispatch }}>
    {children}
  </ProjectsContext.Provider>
}
